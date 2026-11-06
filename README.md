# Cristal

Bibliothèque de Web Components (Stencil) utilisable dans React et Next.js, préfixe `cr-`.

## Installation

```bash
npm install @cristal/react @cristal/tokens
```

Importer les tokens une seule fois, à la racine de l'application (`app/layout.tsx` avec Next, `main.tsx` avec React) :

```tsx
import '@cristal/tokens/tokens.css';
```

## Utilisation

### React

```tsx
import { CrButton } from '@cristal/react';

<CrButton onClick={save}>Enregistrer</CrButton>
```

### Next.js

Dans un composant serveur, importer depuis `@cristal/react/ssr` : le composant est rendu côté serveur, sans flash au chargement.

```tsx
import { CrButton } from '@cristal/react/ssr';
```

Dans un composant client (`'use client'`), importer depuis `@cristal/react`.

## Composants

### `cr-button`

| Propriété | Valeurs | Défaut |
|---|---|---|
| `variant` | `primary`, `secondary`, `outline`, `link` | `primary` |
| `size` | `xs` (30px), `s` (36px), `m` (40px), `l` (48px) | `m` |
| `type` | `button`, `submit`, `reset` | `button` |
| `disabled` | booléen | `false` |
| `loading` | booléen | `false` |
| `fullWidth` | booléen | `false` |

Icônes : `slot="start"` (avant le texte) et `slot="end"` (après le texte).

## Développement

```bash
pnpm install
pnpm build
pnpm --filter playground-next start
pnpm --filter playground-next test:e2e
```
