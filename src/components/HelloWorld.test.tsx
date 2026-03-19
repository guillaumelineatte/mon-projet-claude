import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { HelloWorld } from './HelloWorld';

describe('HelloWorld', () => {
  it('affiche un message par défaut', () => {
    render(<HelloWorld />);
    expect(screen.getByText('Hello, World!')).toBeInTheDocument();
  });

  it('permet de personnaliser le nom', () => {
    render(<HelloWorld name="Claude" />);
    expect(screen.getByText('Hello, Claude!')).toBeInTheDocument();
  });
});
