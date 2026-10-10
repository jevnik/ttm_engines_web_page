# TTM Engines – web stranica

Statična stranica (HTML + CSS + JS, bez builda). Otvara se dvoklikom na `index.html` ili se objavi na GitHub Pages.

## Datoteke
- `index.html` – sav hrvatski tekst i raspored sekcija (O nama, Usluge, Kako radimo, Galerija, Kontakt)
- `css/style.css` – izgled; boje i fontovi su na vrhu (`--blue`, `--navy`, `--yellow`), preuzeti iz logotipa i obrasca
- `js/prijevodi.js` – jezici (`LANGS`) i prijevodi EN/IT/DE (`T`), isti ključevi kao `data-t` u index.html
- `js/main.js` – `CONFIG` na vrhu: adresa obrasca, hero fotografija, popis slika galerije
- `slike/` – logo, zastave, `galerija/` za fotografije

## Česte izmjene
- **Tekst**: promijenite hrvatski u `index.html`, a isti ključ u `js/prijevodi.js` za ostale jezike.
- **Galerija**: stavite sliku u `slike/galerija/` (oko 1200 px širine) i dodajte red u `CONFIG.gallery`.
- **Hero fotografija**: `CONFIG.heroImage = "slike/hero.jpg"` (oko 2000 px širine).
- Žuto označeni tekstovi (klasa `todo`) čekaju sadržaj sa starog weba; obrišite oznaku kad je tekst pravi.

## GitHub Pages
Uploadajte sadržaj ove mape u repozitorij (datoteka `.nojekyll` neka ostane), pa Settings → Pages → Deploy from branch → `main` / root.
