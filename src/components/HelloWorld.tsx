import type { ReactNode } from 'react';

export type HelloWorldProps = {
  /** Affiche un nom personnalisé dans le message */
  name?: string;
  /** Contenu optionnel à afficher sous le message principal */
  children?: ReactNode;
};

export function HelloWorld({ name = 'World', children }: HelloWorldProps) {
  return (
    <section className="rounded-2xl bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 p-6 text-white shadow-lg shadow-indigo-500/20">
      <h1 className="text-3xl font-semibold tracking-tight">Hello, {name}!</h1>
      <p className="mt-2 text-sm opacity-90">
        Ceci est un composant React TypeScript stylé avec Tailwind.
      </p>
      {children ? <div className="mt-4 text-sm opacity-80">{children}</div> : null}
    </section>
  );
}
