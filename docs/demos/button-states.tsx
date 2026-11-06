import { CrButton } from '@cristal/react';

export default function ButtonStates() {
  return (
    <>
      <CrButton disabled>Désactivé</CrButton>
      <CrButton loading>Enregistrement</CrButton>
    </>
  );
}
