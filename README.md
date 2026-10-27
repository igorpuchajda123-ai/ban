# OBEX Atelier – motyw Shopify (PL / IT / DK)

Motyw Online Store 2.0 dla sklepu OBEX (skórzane buty barefoot dla dzieci), przygotowany pod trzy rynki
Shopify Markets: **Polska (PLN, pl)**, **Włochy (EUR, it)**, **Dania (DKK, da)** i aplikację **Translate & Adapt**.

## Jak działa tłumaczenie

1. **Teksty wbudowane (pl / it / da)** – wszystkie przyciski, komunikaty, FAQ, opisy materiałów, opinie,
   treści podstron (O nas, Rozmiary, Pielęgnacja, Ciekawostki) są w `locales/*.json`. Po instalacji motywu
   wszystko jest od razu po polsku, włosku i duńsku – bez ręcznego tłumaczenia sekcji.
2. **Pola w edytorze motywu** – jeśli pole sekcji jest puste, motyw pokazuje tekst wbudowany. Gdy wpiszesz
   własny tekst, przetłumacz go w *Translate & Adapt → Motyw*.
3. **Produkty, kolekcje, strony, menu, metapola** – tłumaczysz jak dotąd w Translate & Adapt (nie zależą od motywu).
4. **Adapt (rynek)** – w Translate & Adapt możesz nadpisać tekst dla konkretnego rynku. Dodatkowo motyw ma
   ustawienia per rynek: próg darmowej dostawy (PLN / EUR / DKK) i czas dostawy (*Ustawienia motywu → Rynki*),
   a komunikaty w pasku ogłoszeń mogą być pokazywane tylko w wybranym kraju.

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
