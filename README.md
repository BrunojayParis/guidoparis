# Portfolio Guido Paris (Next.js 14, App Router)

Portfolio bilingue (IT/EN) per Guido Paris, ingegnere meccanico. Stack: Next.js 14 App Router, TypeScript, TailwindCSS, API per progetti collegata a Google Sheets con account di servizio.

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
GOOGLE_SHEETS_SHEET_ID=...
GOOGLE_SHEETS_CLIENT_EMAIL=...@...gserviceaccount.com
GOOGLE_SHEETS_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
GOOGLE_SHEETS_RANGE="Projects!A2:K200"
```

Nota: mantieni le `\n` nella chiave o usa la stringa su più righe; nel codice viene sostituita automaticamente.

## Creare l'account di servizio e collegare il foglio

1. In Google Cloud Console, crea un progetto e abilita **Google Sheets API**.
2. Crea una **Service Account**. Nella sezione Keys, genera una chiave JSON: copia `client_email` e `private_key`.
3. Condividi il foglio Google Sheets con l'email della service account con permesso di lettura.
4. Imposta l'ID del foglio (dall'URL) in `GOOGLE_SHEETS_SHEET_ID`. Se usi un tab diverso da "Projects", aggiorna `GOOGLE_SHEETS_RANGE`.

## Struttura del foglio Google Sheets (esempio)

Colonne **esattamente**: `id | order | visible | title_it | description_it | title_en | description_en | tags | link | image_url`

| id                 | order | visible | title_it             | description_it                     | title_en          | description_en                  | tags                 | link                          | image_url                                                                                     |
| ------------------ | ----- | ------- | -------------------- | ---------------------------------- | ----------------- | ------------------------------- | -------------------- | ----------------------------- | --------------------------------------------------------------------------------------------- |
| pressa-lamiera     | 1     | TRUE    | Pressa compatta      | Ridisegno telaio per DFM           | Compact press     | Frame redesign for DFM          | automazione,dfm      | https://example.com/pressa    | https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?auto=format&fit=crop&w=1200&q=60 |
| bracket-ev         | 2     | TRUE    | Staffa EV            | Ottimizzazione FEM NVH             | EV bracket        | FEM + NVH optimization          | fem,nvh,ev           | https://example.com/ev        | https://images.unsplash.com/photo-1489515217757-5fd1be406fef?auto=format&fit=crop&w=1200&q=60 |
| scambiatore        | 3     | TRUE    | Scambiatore modulare | Layout modulare termofluidi        | Modular exchanger | Thermofluids modular layout     | energia,termico      | https://example.com/exchanger | https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=60 |
| linea-assemblaggio | 4     | TRUE    | Linea assemblaggio   | Bilanciamento stazioni e takt time | Assembly line     | Station balancing and takt time | operations,kaizen    | https://example.com/linea     | https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=1200&q=60 |
| audit-qualita      | 5     | FALSE   | Audit qualità        | Tenere FALSE per nascondere        | Quality audit     | Keep FALSE to hide              | qualità,audit        | https://example.com/audit     | https://images.unsplash.com/photo-1529429617124-aee1f1650a5c?auto=format&fit=crop&w=1200&q=60 |
| retrofit-pompa     | 6     | TRUE    | Retrofit pompa       | Migliorata efficienza +7%          | Pump retrofit     | Efficiency improved +7%         | manutenzione,energia | https://example.com/pump      | https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=1200&q=60 |

`visible` controlla la pubblicazione; `order` ordina in modo crescente; `tags` separati da virgola.

## Pubblicazione

- Imposta le variabili su Vercel (o altra piattaforma). Assicurati di usare la chiave privata con le `\n`.
- `npm run build` per verificare in locale.
- Abilita l'ambiente di produzione (SITE_URL deve puntare al dominio finale).

## Note tecniche

- App Router, componenti server per impostazione predefinita; Language Switcher è client.
- Cache API progetti con header `s-maxage` (circa 15 minuti + SWR).
- Accessibilità: focus visibile, nav con anchor, alt testi obbligatori.
