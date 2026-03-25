import { useState } from 'react';
import { ContactForm } from './components/contact-form';
import { Counter } from './components/counter';
import { HelloWorld } from './components/HelloWorld';
import { ProfilePage } from './components/profile-page';

type View = 'home' | 'profile';

export default function App() {
  const [view, setView] = useState<View>('home');

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50 to-purple-50 p-8">
      <nav className="mx-auto mb-6 flex max-w-xl gap-2">
        <button
          onClick={() => setView('home')}
          className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
            view === 'home'
              ? 'bg-indigo-600 text-white'
              : 'text-slate-600 hover:bg-white hover:text-slate-800'
          }`}
        >
          Accueil
        </button>
        <button
          onClick={() => setView('profile')}
          className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
            view === 'profile'
              ? 'bg-indigo-600 text-white'
              : 'text-slate-600 hover:bg-white hover:text-slate-800'
          }`}
        >
          Profil
        </button>
      </nav>

      <div className="mx-auto max-w-xl space-y-6">
        {view === 'home' ? (
          <>
            <HelloWorld />
            <Counter min={0} max={20} step={1} storageKey="counter-main" />
            <ContactForm />
          </>
        ) : (
          <ProfilePage />
        )}
      </div>
    </main>
  );
}
