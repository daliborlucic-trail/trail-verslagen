# Trail Verslagen — publiceren op Netlify

Deze map is een complete website: een openbare voorpagina (`index.html`) en een
beveiligd beheerpaneel op `/admin/` waarmee je verslagen kunt toevoegen, bewerken
en verwijderen — inclusief foto's. Alles wat je via `/admin/` opslaat, wordt als
bestand weggeschreven in je eigen GitHub-repository, waarna Netlify de site
automatisch opnieuw bouwt.

## Stap 1 — Zet de bestanden in een GitHub-repository
1. Maak een nieuwe (lege) repository aan op github.com, bijvoorbeeld `trail-verslagen`.
2. Upload alle bestanden uit deze map naar die repository (via de GitHub-website
   ("Add file" → "Upload files") of via git op je computer).

## Stap 2 — Koppel de repository aan Netlify
1. Ga naar app.netlify.com → **Add new site → Import an existing project**.
2. Kies GitHub en selecteer je nieuwe repository.
3. Netlify herkent automatisch de instellingen uit `netlify.toml`
   (build-commando en publicatiemap) — je hoeft niets aan te passen.
4. Klik **Deploy**. Na ongeveer een minuut is je site live op een
   `*.netlify.app`-adres (later kun je hier een eigen domein aan koppelen).

## Stap 3 — Zet inloggen aan (Netlify Identity)
1. Ga in je Netlify-site naar **Site configuration → Identity** en klik op
   **Enable Identity**.
2. Ga naar **Identity → Registration** en zet dit op **Invite only**, zodat
   niemand anders zelf een account kan aanmaken.
3. Ga naar **Identity → Services** en klik **Enable Git Gateway**. Dit is wat
   het beheerpaneel toestemming geeft om namens jou wijzigingen in de
   GitHub-repository op te slaan.

## Stap 4 — Nodig jezelf uit als beheerder
1. Ga naar het tabblad **Identity** van je site en klik **Invite users**.
2. Vul je eigen e-mailadres in en verstuur de uitnodiging.
3. Je ontvangt een e-mail — klik op de link. Je komt op je site terecht en
   krijgt een venstertje waarin je zelf een wachtwoord kiest.
4. Dat e-mailadres + zelfgekozen wachtwoord is voortaan je admin-login.
   (Wil je meer mensen toegang geven, bijvoorbeeld je partner? Herhaal deze
   stap met hun e-mailadres.)

## Stap 5 — Verslagen toevoegen
Ga naar `jouwsite.netlify.app/admin/`, log in, en gebruik het paneel om
verslagen aan te maken, foto's te uploaden en de teksten van de hoofdpagina
(titel, ondertitel, sitenaam) aan te passen. Elke wijziging duurt ongeveer
30–60 seconden voordat hij live staat, omdat Netlify de site opnieuw bouwt.

## Hoe het onder de motorkap werkt
- Elk verslag is een los `.md`-bestand in `content/reports/`.
- Foto's komen in `images/uploads/` terecht.
- Bij elke wijziging draait `build.js`, dat alle verslagen samenvoegt tot
  `reports.json`. De voorpagina (`index.html`) leest dat bestand uit om de
  kaarten en het detailoverzicht te tonen.
- De site-instellingen (titel, ondertitel, sitenaam) staan in
  `content/settings.json`, ook bewerkbaar via `/admin/`.

## Zelf lokaal testen (optioneel)
Wil je eerst lokaal kijken hoe de voorpagina eruitziet? Installeer Node.js,
draai `npm install && npm run build` in deze map, en open `index.html` via
een lokale server (bijv. `npx serve .`). Het beheerpaneel zelf (`/admin/`)
werkt alleen op de echte, gepubliceerde Netlify-site, omdat Identity en
Git Gateway daar draaien.
