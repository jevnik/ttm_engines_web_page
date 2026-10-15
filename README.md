# TTM Engines – web stranica

Statična stranica (HTML + CSS + JS, bez builda). Otvara se dvoklikom na `index.html` ili se objavi na GitHub Pages.

## Datoteke
- Stranice (hrvatski tekst je u njima):
  - `index.html` – početna: kratki pregled s poveznicama na ostale stranice
  - `strojevi.html` – Naši strojevi
  - `usluge.html` – Usluge i Kako radimo
  - `proizvodi.html` – Proizvodi (samo slike)
  - `o-nama.html` – O nama i galerija
  - `kontakt.html` – Kontakt
- Zaglavlje (izbornik) i podnožje su kopirani u svaku stranicu: ako ih mijenjate, promijenite ih u svih šest datoteka.
- `css/style.css` – izgled; boje i fontovi su na vrhu (`--blue`, `--navy`, `--yellow`), preuzeti iz logotipa i obrasca
- `js/prijevodi.js` – jezici (`LANGS`) i prijevodi EN/IT/DE (`T`), isti ključevi kao `data-t` u stranicama; naslovi kartica su ključevi `title_*`
- `js/main.js` – `CONFIG` na vrhu: hero fotografija, popis slika galerije i proizvoda
- `slike/` – logo, zastave, `galerija/` za fotografije

## Česte izmjene
- **Tekst**: promijenite hrvatski u odgovarajućoj `.html` stranici, a isti ključ u `js/prijevodi.js` za ostale jezike.
- **Galerija**: stavite sliku u `slike/galerija/` (oko 1200 px širine) i dodajte red u `CONFIG.gallery`.
- **Hero fotografija**: `CONFIG.heroImage = "slike/hero.jpg"` (oko 2000 px širine).
- Žuto označeni tekstovi (klasa `todo`) čekaju sadržaj sa starog weba; obrišite oznaku kad je tekst pravi.

## GitHub Pages
Uploadajte sadržaj ove mape u repozitorij (datoteka `.nojekyll` neka ostane), pa Settings → Pages → Deploy from branch → `main` / root.
