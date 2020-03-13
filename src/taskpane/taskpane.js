/*
 * Copyright (c) Microsoft Corporation. All rights reserved. Licensed under the MIT license.
 * See LICENSE in the project root for license information.
 */

/* global document, Office */

/**
 * A Google Directions API elérési kulcsa
 * @type {string}
 */
var key = "AIzaSyBxVmOWNoFSIm2Yqx-b0vnTguHXpAx-CA0";
/**
 * Tároló, amiben megtalálható a Helykeresés gombra való reakció
 * @type {HTMLElement}
 */
var isu = document.getElementById('item-subject');
/**
 * Sikertelen helykeresés esetén használt tároló
 * @type {HTMLElement}
 */
var info = document.getElementById('item-data');

Office.onReady(info => {
  if (info.host === Office.HostType.Outlook) {
    document.getElementById("sideload-msg").style.display = "none";
    document.getElementById("app-body").style.display = "block";
    document.getElementById("app-body").style.width = "500px";
    document.getElementById("run").onclick = run;
  }
});

/**
 * Kapcsolatot létesített egy megadott URL-lal, majd visszaküldi az információt egy funkciónak.
 * 
 * @param {string} url Az URL elérhetősége, amin XMLHttp kapcsolatot szeretnénk futtatni.
 * @param {function} callback A funkció ami lefut a kapcsolat létesítése után.
 */
var getJSON = function(url, callback) {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', url);
  xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
  xhr.onreadystatechange = function() {
      var status = xhr.status;
      callback(status, xhr.response);
  };
  xhr.send();
};

/**
 * Egy elem után rakja a másik elemet.
 * 
 * @param {HTMLElement} newChild Az elem, amit elakarunk helyezni
 * @param {HTMLElement} refChild Az elem, ami után elakarunk helyezni valamit
 */
var insertAfter = function(newChild, refChild) {
  refChild.parentNode.insertBefore(newChild, refChild.nextSibling);
}

/**
 * Lefuttatja a helynek a keresését. Amennyiben nem találja, manuálisan kell beírni a helyet.
 */
function placeSearch() {
  if(navigator.geolocation) {
    document.getElementById("run").style.display = "none";
    isu.innerHTML = "Hely keresése...";
    navigator.geolocation.getCurrentPosition(function () {}, function () {}, {});
    navigator.geolocation.getCurrentPosition(function(posi) {
      isu.innerHTML = "LA: " + posi.coords.latitude + " | LO: " + posi.coords.longitude;
    }, function(err) {
      isu.innerHTML = err;
    }, {enableHighAccuracy: true, maximumAge: 50000}); 
    setTimeout(function() {
      var el = document.createElement("input");
      var bu = document.createElement("div");
      var sp = document.createElement("span");
      isu.innerHTML = "A helykeresés nem sikerült! Add meg manuálisan a kiindulási helyet!";
      el.setAttribute("type", "text");
      el.setAttribute("id", "place-from");
      el.classList.add("ms-Input");
      insertAfter(el, isu);
      bu.setAttribute("role", "button");
      bu.setAttribute("id", "send");
      bu.classList.add("ms-welcome__action"); bu.classList.add("ms-Button"); bu.classList.add("ms-Button--hero"); bu.classList.add("ms-font-xl"); bu.classList.add("ms-send");
      bu.onclick = send;
      sp.classList.add("ms-Button-label");
      sp.appendChild(document.createTextNode("Rendben"));
      bu.appendChild(sp);
      insertAfter(bu, el);
    }, 1000);
  } else {
    info.innerHTML = "Helykeresés nincs a böngésződ által támogatva.";
  }
}

/**
 * Lekérdezi a Google Directions API segítségével a két helyszín közötti út hosszát. Megadja az információt percben és másodpercben.
 * 
 * @param {string} from A hely, ahonnan elindul az ember
 * @param {string} to A hely, ahova elmegy az ember
 */
function getData(from, to) {
  var proxyurl = "https://cors-anywhere.herokuapp.com/";
  var from2 = encodeURIComponent(from);
  var to2 = encodeURIComponent(to);
  var url = "https://maps.googleapis.com/maps/api/directions/json?origin="+ from2 +"&destination="+ to2 + "&key="+key;
  var nurl = proxyurl + url;
  getJSON(nurl, function(err, data) {
      var out = JSON.parse(data);
      var outv = out.routes[0].legs[0].duration.value;
      var outv_m = Math.floor(outv / 60);
      var outv_s = outv % 60;
      info.innerHTML = outv_m + ' perc ' + outv_s + ' másodperc az út autóval a megadott helyszín és az esemény helyszíne között.';
      isu.style.display = "none";
  });
}

/**
 * Amint megnyomjuk a Helykeresés gombot, lefuttatja a keresési funkciót.
 */
export async function run() {
  placeSearch();
}

/**
 * Elvégzi a keresést ha jól adtunk meg helyszínt. 
 */
export async function send() {
  if(document.getElementById('place-from').value.length == 0) {
    info.innerHTML = "Nem adtál meg címet!";
  } else {
    if(typeof(Office.context.mailbox.item.location) === "undefined") {
      info.innerHTML = "Nincs végpont (esemény helyszín) megadva!";
    } else {
      var start = document.getElementById("place-from").value;
      var end = Office.context.mailbox.item.location;
      var regex = /(\d{4}) ([A-ZÁÉÚŐÓÜÖÍa-záéúőóüöí]{3,20}) ([A-ZÁÉÚŐÓÜÖÍa-záéúőóüöí ]{3,100}) (\d{1,3})/;
      if(start.match(regex) && end.match(regex)) {
        getData(start, end);
      } else {
        info.innerHTML = "Nem jó címet adtál meg! (Formátum: 0000 Város Utca neve 0)";
      }  
    }
  }
}