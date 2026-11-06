import { CrButton } from '@cristal/react';

export default function ButtonVariants() {
  return (
    <>
      <CrButton>Principal</CrButton>
      <CrButton variant="secondary">Secondaire</CrButton>
      <CrButton variant="outline">Contour</CrButton>
      <CrButton variant="link">Lien</CrButton>
    </>
  );
}
