# Checkout w barwach OBEX – instrukcja krok po kroku

Sklep jest na planie **Basic**, więc wygląd kasy ustawia się ręcznie w edytorze checkoutu (API do tego jest tylko w Shopify Plus). Zajmie to ok. 10 minut.
Nazwy przycisków w panelu mogą się trochę różnić od tych poniżej – Shopify co jakiś czas je zmienia.

## 1. Otwórz edytor
1. Panel Shopify → **Ustawienia** (lewy dół) → **Checkout** (Kasa).
2. Przy konfiguracji kasy kliknij **Dostosuj** (Customize). Otworzy się podgląd kasy.
3. W lewym pasku kliknij ikonę **pędzla / „Ustawienia”** (Settings) – tam są logo, kolory i czcionki.

## 2. Logo
- **Logo:** wgraj to samo logo, co na stronie (`IMG_4364.png` – jest już w Plikach).
- **Rozmiar:** mały lub średni (logo ma ok. 140 px szerokości, nie może być większe niż na stronie).
- **Pozycja:** do lewej (na telefonie i tak będzie na środku).

## 3. Kolory
| Pole w edytorze | Wartość | Po co |
|---|---|---|
| Tło głównej części (Main area / Background) | `#F6F4F0` | jasne, ciepłe tło – jak na stronie |
| Tło podsumowania zamówienia (Order summary) | `#E8EDF2` | jasnoniebieskie tło sekcji ze strony |
| Akcent (Accent – linki, zaznaczenia) | `#1F3B5C` | granat OBEX |
| Przyciski (Buttons) | `#1F3B5C` | „Zapłać teraz” w kolorze marki |
| Błędy (Errors) | `#B4532A` | ciepła czerwień, ta sama co w koszyku |

## 4. Czcionki (Typography)
- **Nagłówki:** `Jost` – ta sama czcionka co na stronie (jeśli nie ma jej na liście, wybierz `Futura` albo `Montserrat`).
- **Tekst:** `Jost` – jeśli nie ma, wybierz `Inter`.

## 5. Zaokrąglenia i tło (jeśli edytor je pokazuje)
- **Zaokrąglenie rogów (Corner radius):** duże / pełne – przyciski na stronie są owalne.
- **Obraz w tle:** zostaw pusty – kasa ma być spokojna i czytelna.

## 6. Zapisz i sprawdź
1. Kliknij **Zapisz** (prawy górny róg).
2. Dodaj dowolne buty do koszyka na stronie i przejdź do kasy – sprawdź na telefonie i komputerze.
3. Wpisz kod **OBEX5** w polu rabatu w kasie – powinien odjąć 5%.

---

# Jutro – publikacja nowego motywu (lista kontrolna)

**Przed publikacją**
1. **Swym:** nie jest zainstalowany (sprawdzone 29.10) – nic nie trzeba robić. Nowy motyw ma własne „Ulubione” (serduszka), a stara strona `/pages/swym-wishlist` przekierowuje na `/pages/ulubione`.
2. Panel → **Sklep internetowy → Motywy** → przy „OBEX Atelier (PL/IT/DK)” kliknij **Opublikuj**. Stary motyw zostaje w bibliotece – w razie problemu można do niego wrócić jednym kliknięciem.

**Zaraz po publikacji – w edytorze motywu (Dostosuj → ikona aplikacji „Osadzone aplikacje / App embeds”)**
3. Włącz osadzenia aplikacji, które były w starym motywie: **Loox** (opinie), **Forms** (newsletter/pop-up), **Messaging / Inbox** (czat), **Geolocation**. Bez tego te aplikacje nie pokażą się na nowej stronie.
4. Google & YouTube oraz Facebook & Instagram mierzą konwersje przez piksele klienta – działają niezależnie od motywu, ale sprawdź w aplikacji Google & YouTube, czy status konwersji jest „aktywny”.

**Sprawdzenie na telefonie (obaj)**
5. obexshoes.com (PL), obexshoes.it (IT), obexshoes.dk (DK): strona główna → kolekcja → produkt → wybór rozmiaru → koszyk → kasa (bez płacenia).
6. Kod **OBEX5** w koszyku, serduszko → strona „Ulubione” → dodanie do koszyka.
7. Zapis do newslettera w stopce (po zapisie powinien pokazać się kod OBEX5).
