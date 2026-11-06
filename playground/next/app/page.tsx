import { CrButton } from '@cristal/react/ssr';
import { FormDemo } from './form-demo';

const row = { display: 'flex', gap: 'var(--cr-spacing-sm)', alignItems: 'center', marginBottom: 'var(--cr-spacing-lg)' };

export default function Page() {
  return (
    <main>
      <h1>cr-button</h1>

      <h2>Variantes</h2>
      <div style={row}>
        <CrButton>Principal</CrButton>
        <CrButton variant="secondary">Secondaire</CrButton>
        <CrButton variant="outline">Contour</CrButton>
        <CrButton variant="link">Lien</CrButton>
      </div>

      <h2>Tailles</h2>
      <div style={row}>
        <CrButton size="xs">XS</CrButton>
        <CrButton size="s">S</CrButton>
        <CrButton size="m">M</CrButton>
        <CrButton size="l">L</CrButton>
      </div>

      <h2>États</h2>
      <div style={row}>
        <CrButton disabled>Désactivé</CrButton>
        <CrButton loading>Chargement</CrButton>
      </div>

      <h2>Formulaire</h2>
      <FormDemo />
    </main>
  );
}
