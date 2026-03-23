import { useState } from 'react';

export type CounterProps = {
  /** Valeur initiale du compteur (défaut : 0) */
  initialValue?: number;
  /** Pas d'incrémentation/décrémentation (défaut : 1) */
  step?: number;
  /** Valeur minimale autorisée */
  min?: number;
  /** Valeur maximale autorisée */
  max?: number;
};

export function Counter({ initialValue = 0, step = 1, min, max }: CounterProps) {
  const [count, setCount] = useState(initialValue);

  const canDecrement = min === undefined || count - step >= min;
  const canIncrement = max === undefined || count + step <= max;

  function decrement() {
    if (canDecrement) setCount((c) => c - step);
  }

  function increment() {
    if (canIncrement) setCount((c) => c + step);
  }

  return (
    <div className="flex items-center gap-4 rounded-2xl bg-white p-6 shadow-md shadow-slate-200">
      <button
        onClick={decrement}
        disabled={!canDecrement}
        aria-label="Décrémenter"
        className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-100 text-xl font-bold text-indigo-700 transition hover:bg-indigo-200 disabled:cursor-not-allowed disabled:opacity-40"
      >
        −
      </button>

      <span
        aria-live="polite"
        className="w-16 text-center text-3xl font-semibold tabular-nums text-slate-800"
      >
        {count}
      </span>

      <button
        onClick={increment}
        disabled={!canIncrement}
        aria-label="Incrémenter"
        className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-100 text-xl font-bold text-indigo-700 transition hover:bg-indigo-200 disabled:cursor-not-allowed disabled:opacity-40"
      >
        +
      </button>
    </div>
  );
}
