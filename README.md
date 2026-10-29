# MealApp v3 – slim weekmenu

Upload de bestanden naar de root van je GitHub Pages-repository, met behoud van de map `.github/workflows` en `scripts`. Deze versie gebruikt nog steeds de opslag `mealapp-v2`, zodat je bestaande planning niet wordt gewist. Maak voor de zekerheid eerst via Profiel een back-up.

## Nieuw
- Een startvraag per week: eigen ideeën opschrijven, aanbiedingen laden, aanbevelingen bekijken en alleen lege dagen laten aanvullen.
- Een aanbevelingsscore met favorieten, variatie, geldige AH-acties en hergebruik van eerder gebruikte verse ingrediënten. Het is een heuristiek, geen bewezen optimalisatie van kosten of houdbaarheid.
- Een voorraad- en verpakkingenformulier in Boodschappen. Bij een bekende verpakkingsgrootte en prijs toont de app benodigde aantallen en kassatotaal voor die producten. Onbekende prijzen worden expliciet als onbekend weergegeven. De gebruiker vult deze in; er worden **geen actuele AH-standaardprijzen opgehaald**.
- Bestaande week-/dagweergaven, recepten en boodschappen blijven beschikbaar.

## Belangrijk
- De knop 'Laad aanbiedingen' leest `ah-offers.json` opnieuw. Voor nieuwe data moet de bestaande GitHub Actions workflow eerst draaien. Gedateerde aanbiedingen worden uitsluitend gebruikt als geldig op de geplande datum.
- Prijs- en verpakkingsgegevens zijn per apparaat opgeslagen. Ingevulde voorraad wordt niet automatisch afgeboekt na het koken; pas deze zelf aan.
- Verse combinaties zijn suggesties op basis van gedeelde ingrediënten. De app kent nog geen werkelijke vervaldatums of bewaartemperaturen. Gebruik geen bewaarrichtlijnen afgeleid uit het algoritme.
- Het voorbeeld-aanbod in `ah-offers.json` kan verlopen zijn. De gegenereerde gerechten kunnen zonder aanbiedingen worden gekozen.
