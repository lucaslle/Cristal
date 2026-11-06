'use client';
import SearchDialog from '@/components/search';
import { RootProvider } from 'fumadocs-ui/provider/next';
import { type ReactNode } from 'react';

const translations = {
  'Back to Home': "Retour à l'accueil",
  'Hide Sidebar': 'Masquer le menu',
  'Next Page': 'Page suivante',
  'No Headings': 'Aucun titre',
  'On this page': 'Sur cette page',
  'Page Not Found': 'Page introuvable',
  'Previous Page': 'Page précédente',
  Search: 'Rechercher',
  'Show Sidebar': 'Afficher le menu',
  'Skip to Content': 'Aller au contenu',
  'Table of Contents': 'Sommaire',
  'The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.':
    "La page que vous cherchez a peut-être été supprimée ou renommée, ou n'est pas disponible pour le moment.",
};

export function Provider({ children }: { children: ReactNode }) {
  return (
    <RootProvider search={{ SearchDialog }} i18n={{ locale: 'fr', translations }}>
      {children}
    </RootProvider>
  );
}
