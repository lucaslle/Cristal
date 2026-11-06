import Link from 'next/link';
import { CrButton, CrCard, CrCheckbox, CrInput, CrSelect } from '@cristal/react/ssr';

const features = [
  ['Accessible', 'Éléments natifs sous le capot, libellés obligatoires, audit axe WCAG 2.1 AA à chaque modification.'],
  ['Rendu serveur', 'Avec Next.js, les composants arrivent déjà dessinés dans le HTML, sans flash au chargement.'],
  ['Personnalisable', 'Couleurs, espacements et rayons en variables CSS : un fichier suffit pour votre identité visuelle.'],
  ['Formulaires natifs', 'Les champs envoient leur valeur, se valident et se réinitialisent comme des champs HTML.'],
];

export default function HomePage() {
  return (
    <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-16 px-6 py-16">
      <section className="grid items-center gap-12 lg:grid-cols-2">
        <div className="flex flex-col gap-6">
          <h1 className="text-5xl font-bold tracking-tight">Cristal</h1>
          <p className="text-xl text-fd-muted-foreground">
            Des composants d&apos;interface accessibles, écrits une fois en Web Components et prêts pour React et Next.js.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link href="/docs/installation" className="rounded-lg bg-fd-primary px-5 py-3 font-medium text-fd-primary-foreground">
              Commencer
            </Link>
            <Link href="/docs/composants/bouton" className="rounded-lg border px-5 py-3 font-medium">
              Voir les composants
            </Link>
          </div>
        </div>

        <div className="rounded-2xl border bg-white p-6 text-neutral-900" style={{ colorScheme: 'light' }}>
          <CrCard>
            <h2 slot="header" className="text-lg font-semibold">
              Créer un compte
            </h2>
            <div className="flex flex-col gap-4">
              <CrInput label="E-mail" type="email" hint="Format : nom@domaine.fr" />
              <CrSelect label="Pays" placeholder="Choisir un pays">
                <option value="fr">France</option>
                <option value="be">Belgique</option>
              </CrSelect>
              <CrCheckbox label="Recevoir la newsletter" />
            </div>
            <CrButton slot="footer">Créer le compte</CrButton>
            <CrButton slot="footer" variant="secondary">
              Annuler
            </CrButton>
          </CrCard>
        </div>
      </section>

      <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {features.map(([title, text]) => (
          <div key={title} className="rounded-xl border p-5">
            <h2 className="mb-2 font-semibold">{title}</h2>
            <p className="text-sm text-fd-muted-foreground">{text}</p>
          </div>
        ))}
      </section>
    </main>
  );
}
