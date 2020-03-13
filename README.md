# Utazásidő

Az utazásidő egy Microsoft Outlook 2019 bővítmény. Az a feladata, hogy az eseményes e-maileknél megadja azt, hogy mennyi idő autóval eljutni a felhasználó helyéről / a felhasználó által megadott helyről az esemény helyszínére. A bővítmény a Microsoft által létrehozott "[Yo Office Generator](https://github.com/OfficeDev/generator-office)" segítségével készült.

# Működést segítette

A Yeoman generátor mellett a bővítmény elkészítéséhez még az alábbi dolgok lettek használva:
+ [Cors Anywhere](https://cors-anywhere.herokuapp.com/)
+ Google Maps Direction API

# Időhasználat

A program három nap alatt készült el.

| Első nap                                            | Idő     |
| --------------------------------------------------- |:-------:|
| Office telepítés                                    |  5 perc |
| Yeoman betöltés                                     | 10 perc |
| Szerver elindításával szenvedés                     | 10 perc |
| Add-in fejlesztés dokumentáció megtekintése elsőnek | 30 perc |
| Alapok megírása, mégtöbb keresés                    |  1 óra  |

| Második nap                                                          | Idő     |
| -------------------------------------------------------------------- |:-------:|
| Próbálkozás MapQuest-tel Google Directions helyett                   | 30 perc |
| Google Directions API beüzemeltetése, Google Maps Platform gyakorlás | 1 óra   |
| Eljutni odáig, hogy elérje a Google Directions API-ból az adatokat   | 1,5 óra |

| Harmadik nap                                                                 | Idő     |
| ---------------------------------------------------------------------------- |:-------:|
| Tesztelés                                                                    | 30 perc |
| Próbálkozás a Javascript Geolocation API-val (sikertelen)                    | 1 óra   |
| Keresés az UWP-s megoldás Javascriptre viteléhez / IP megoldás               | 30 perc |
| Tesztszövegek kivétele, formázás, mégtöbb tesztelés                          | 1 óra   |
| Az eseménnyel való összekapcsolás manuális beírás helyett / ennek tesztelése | 1 óra   |

# Működése videón

[![Videó](http://img.youtube.com/vi/FPLbW6iR6mU/0.jpg)](http://www.youtube.com/watch?v=FPLbW6iR6mU)
