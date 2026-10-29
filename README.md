# MealApp — vernieuwde dag- en weekplanner

Een statische Nederlandstalige maaltijdplanner voor GitHub Pages. Open `index.html` met een lokale HTTP-server, bijvoorbeeld `python3 -m http.server 8000`, of publiceer deze bestanden in de root van je GitHub Pages-repository.

## Functies

- Weekplanning met echte datums, dagkaarten en weekkalender, navigatie tussen weken, 'uit eten', restjes, geen maaltijd, verplaatsen en onderling wisselen.
- Alle 98 originele recepten uit de `index.html` van 29 oktober 2026, met stabiele IDs, categorieën, favorieten, zoeken, filteren, detailweergave, eigen recepten en optionele HTTPS-fotolink.
- Automatisch invullen van **alleen lege dagen** en overslaan van uitgesloten ingrediënten.
- Boodschappen per geselecteerde dagen, gegroepeerd per afdeling, samenvoegen, handmatig aanvullen, afvinken en voorraadmarkering.
- Export/import als JSON; automatische eenmalige migratie van `wm1` naar `mealapp-v2`, zonder `wm1` te wissen.
- Dark mode, responsive vormgeving, HTML-escaping van gebruikersgegevens.

## Bewuste beperkingen

- **Aanbiedingen zijn uitgeschakeld**. De oorspronkelijke `deals.json` bevat aantoonbaar verkeerde koppelingen (bijv. Ajax allesreiniger als rijst), dus deze nieuwe versie claimt geen actuele kortingen. De indicatieve kosten zijn de oude, grove ingrediëntschattingen. Voor betrouwbare prijsmatching is een apart productvalidatieproces nodig.
- Er zijn geen verzonnen bereidingsstappen of afbeeldingen toegevoegd. Eigen recepten kunnen die gegevens wel bevatten. De illustraties zijn categorie-emoji's totdat echte foto's beschikbaar zijn.
- Bij een nieuw, zelf toegevoegd ingrediënt is de standaardhoeveelheid onbekend (0), dus de boodschappenlijst toont **naar smaak**. Later is een editor voor hoeveelheid per persoon nodig.
- De browseropslag synchroniseert niet tussen apparaten. Maak regelmatig een back-up.
- Zonder echte browserautomatisering is alleen een syntax- en basale datatest uitgevoerd, geen volledige end-to-endtest op mobiel of desktop.

## Update in GitHub

Maak een backup van de huidige repository of een branch. Upload `index.html`, `styles.css`, `data.js`, `app.js` en `README.md` naar de root. Je kunt je bestaande `scripts/` en `.github/` behouden, maar de prijskoppeling is niet actief in deze versie. Activeer GitHub Pages met `Settings → Pages → Deploy from a branch → main / root`.
