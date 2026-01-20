# Portfolio Guido Paris (Next.js 14, App Router)

Portfolio bilingue (IT/EN) per Guido Paris, ingegnere meccanico. Stack: Next.js 14 App Router, TypeScript, TailwindCSS, API per progetti collegata a Google Drive con account di servizio.

## Requisitos

- Node.js 18+
- pnpm / npm / yarn (usa il gestore che preferisci)

## Iniziare in locale

```bash
npm install
npm run dev
# visita http://localhost:3000 (redirige a /it)
```

## Variabili d'ambiente

Crea un file `.env.local` con:

```
SITE_URL=https://tu-dominio.example
GOOGLE_DRIVE_ROOT_FOLDER_ID=...
GOOGLE_DRIVE_CLIENT_EMAIL=...@...gserviceaccount.com
GOOGLE_DRIVE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
```

Nota: mantieni le `\n` nella chiave o usa la stringa su più righe; nel codice viene sostituita automaticamente.

## Creare l'account di servizio e collegare Google Drive

1. In Google Cloud Console, crea un progetto e abilita **Google Drive API**.
2. Crea una **Service Account**. Nella sezione Keys, genera una chiave JSON: copia `client_email` e `private_key`.
3. Crea una cartella root su Google Drive (es. "Portfolio Projects") e condividila con l'email della service account con permesso di lettura.
4. Imposta l'ID della cartella root (dall'URL) in `GOOGLE_DRIVE_ROOT_FOLDER_ID`.

## Struttura Google Drive (esempio)

Cartella root: `Portfolio Projects`

All'interno, una cartella per ogni progetto. Ogni cartella progetto contiene:
- una o più immagini `.jpg` (la prima in ordine alfabetico viene usata come cover)
- un file `description.txt` con la descrizione del progetto

Esempio:
```
Portfolio Projects/
  Pressa compatta/
    cover.jpg
    dettaglio-01.jpg
    description.txt
  Staffa EV/
    hero.jpg
    description.txt
```

## Pubblicazione

- Imposta le variabili su Vercel (o altra piattaforma). Assicurati di usare la chiave privata con le `\n`.
- `npm run build` per verificare in locale.
- Abilita l'ambiente di produzione (SITE_URL deve puntare al dominio finale).

## Note tecniche

- App Router, componenti server per impostazione predefinita; Language Switcher è client.
- Cache API progetti con header `s-maxage` (circa 15 minuti + SWR).
- Accessibilità: focus visibile, nav con anchor, alt testi obbligatori.
