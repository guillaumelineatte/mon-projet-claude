import { HelloWorld } from './components/HelloWorld';

export default function App() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50 to-purple-50 p-8">
      <div className="mx-auto max-w-xl">
        <HelloWorld />
      </div>
    </main>
  );
}
