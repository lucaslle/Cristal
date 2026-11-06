'use client';

import { useState } from 'react';
import { CrButton } from '@cristal/react';

export function FormDemo() {
  const [clicks, setClicks] = useState(0);
  const [submitted, setSubmitted] = useState('');

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        setSubmitted(String(new FormData(event.currentTarget).get('email')));
      }}
    >
      <label htmlFor="email">E-mail</label>
      <input id="email" name="email" defaultValue="lucas@example.com" />
      <CrButton type="submit">Envoyer</CrButton>
      <CrButton type="reset" variant="secondary">Réinitialiser</CrButton>
      <CrButton variant="outline" onClick={() => setClicks((count) => count + 1)}>
        Compter
      </CrButton>
      <p data-testid="clicks">Clics : {clicks}</p>
      <p data-testid="submitted">Envoyé : {submitted}</p>
    </form>
  );
}
