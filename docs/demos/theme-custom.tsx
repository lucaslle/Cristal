import { CrButton, CrInput } from '@cristal/react';
import type { CSSProperties } from 'react';

const theme = {
  '--cr-color-primary': '#000000',
  '--cr-color-primary-hover': '#333333',
  '--cr-color-primary-subtle': '#e2e8f0',
  '--cr-color-primary-subtle-hover': '#cbd5e0',
  '--cr-color-focus': '#000000',
  '--cr-radius-m': '0px',
} as CSSProperties;

export default function ThemeCustom() {
  return (
    <div style={{ ...theme, display: 'flex', gap: 'var(--cr-spacing-sm)', alignItems: 'flex-end' }}>
      <CrInput label="Recherche" type="search" />
      <CrButton>Rechercher</CrButton>
      <CrButton variant="secondary">Annuler</CrButton>
    </div>
  );
}
