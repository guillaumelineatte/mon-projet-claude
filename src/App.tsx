import { Counter } from './components/counter';
import { HelloWorld } from './components/HelloWorld';
import { ContactForm } from './components/contact-form';

export default function App() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50 to-purple-50 p-8">
      <div className="mx-auto max-w-xl space-y-6">
        <HelloWorld />
        <Counter min={0} max={20} step={1} storageKey="counter-main" />
        <ContactForm />
      </div>
    </main>
  );
}
