# OBEX Atelier – motyw Shopify (PL / IT / DK)

Motyw Online Store 2.0 dla sklepu OBEX (skórzane buty barefoot dla dzieci), przygotowany pod trzy rynki
Shopify Markets: **Polska (PLN, pl)**, **Włochy (EUR, it)**, **Dania (DKK, da)** i aplikację **Translate & Adapt**.

## Jak działa tłumaczenie (Translate & Adapt)

1. **Treści sekcji** (nagłówki, opisy, FAQ, opinie, materiały, teksty podstron) są zapisane w ustawieniach
   sekcji po polsku. Wersje włoska i duńska są wpisane w **Translate & Adapt → Motyw OBEX Atelier** –
   tam je poprawiasz, zmieniasz albo tłumaczysz automatycznie nowe pola.
2. **Wspólne sekcje strony produktu** (filozofia barefoot, materiały, opinie, FAQ, polecane) są w jednej
   grupie sekcji `sections/product-extras.json` – edytujesz i tłumaczysz je raz dla wszystkich produktów.
3. **Teksty interfejsu** (przyciski, koszyk, filtry, tabela rozmiarów) są w `locales/pl.default.json`,
   `it.json`, `da.json`; w Translate & Adapt widać je jako „Domyślna zawartość motywu” i też można je nadpisać.
4. **Produkty, kolekcje, strony, menu, metapola** – tłumaczysz jak dotąd w Translate & Adapt.
5. **Adapt (rynek)** – w Translate & Adapt możesz nadpisać tekst dla konkretnego rynku. Motyw ma też
   ustawienia per rynek: próg darmowej dostawy (PLN / EUR / DKK) i czas dostawy (*Ustawienia motywu → Rynki*).

Opinie klientów w wersjach IT/DA są tłumaczeniami prawdziwych recenzji – zachowują oryginalnych autorów
i mają dopisek „przetłumaczono z polskiego”.

## SEO

- `lang` z aktywnego języka, kanoniczne URL, hreflang dodawany automatycznie przez Shopify Markets.
- Jeden `<h1>` na stronę, okruszki z `BreadcrumbList`, `Product` przez filtr `structured_data`,
  `Organization` + `WebSite` (wyszukiwarka) na stronie głównej, `FAQPage`, `Article`, `CollectionPage`.
- Open Graph / Twitter, responsywne obrazy (`srcset`), lazy-loading, preload fontów, brak zewnętrznych bibliotek.

## Metapola produktu wykorzystywane przez motyw

| Metapole | Zastosowanie |
| --- | --- |
| `custom.rodzina_produktow` (kolekcja) | przełącznik kolorów na karcie produktu i miniatury na kartach |
| `custom.kolory_produktu` (lista produktów) | alternatywa dla powyższego (ma pierwszeństwo) |
| `custom.specyfikacja_obuwia` (rich text) | zakładka „Szczegóły i materiały” |
| `reviews.rating` / `reviews.rating_count` | gwiazdki przy tytule (gdy uzupełnione przez aplikację opinii) |

## Struktura

- `layout/` – `theme.liquid`, `password.liquid`
- `sections/` – sekcje (hero, kafle kolekcji, materiały, filozofia barefoot, opinie, FAQ, kalkulator rozmiarów…)
- `snippets/` – karta produktu, cena, ikony, formularz kraju/języka, tabela rozmiarów, dane strukturalne
- `templates/` – w tym szablony produktów i stron o tych samych nazwach co w obecnym motywie
  (`product.helis`, `page.o-nas`, `page.jak-dobrac-rozmiar`…), więc przypisania produktów i stron działają bez zmian.
- `assets/obex.css`, `assets/obex.js` – cały styl i skrypty (bez zależności).
