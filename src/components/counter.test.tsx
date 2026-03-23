import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import { Counter } from './counter';

describe('Counter', () => {
  it('affiche la valeur initiale par défaut (0)', () => {
    render(<Counter />);
    expect(screen.getByText('0')).toBeInTheDocument();
  });

  it('affiche une valeur initiale personnalisée', () => {
    render(<Counter initialValue={42} />);
    expect(screen.getByText('42')).toBeInTheDocument();
  });

  it('incrémente de 1 par défaut', async () => {
    render(<Counter />);
    await userEvent.click(screen.getByLabelText('Incrémenter'));
    expect(screen.getByText('1')).toBeInTheDocument();
  });

  it('décrémente de 1 par défaut', async () => {
    render(<Counter initialValue={5} />);
    await userEvent.click(screen.getByLabelText('Décrémenter'));
    expect(screen.getByText('4')).toBeInTheDocument();
  });

  it('respecte le pas personnalisé', async () => {
    render(<Counter step={5} />);
    await userEvent.click(screen.getByLabelText('Incrémenter'));
    expect(screen.getByText('5')).toBeInTheDocument();
  });

  it('ne dépasse pas le maximum', async () => {
    render(<Counter initialValue={9} max={10} />);
    await userEvent.click(screen.getByLabelText('Incrémenter'));
    expect(screen.getByText('10')).toBeInTheDocument();
    await userEvent.click(screen.getByLabelText('Incrémenter'));
    expect(screen.getByText('10')).toBeInTheDocument();
  });

  it('ne descend pas sous le minimum', async () => {
    render(<Counter initialValue={1} min={0} />);
    await userEvent.click(screen.getByLabelText('Décrémenter'));
    expect(screen.getByText('0')).toBeInTheDocument();
    await userEvent.click(screen.getByLabelText('Décrémenter'));
    expect(screen.getByText('0')).toBeInTheDocument();
  });

  it('désactive le bouton − quand la valeur min est atteinte', () => {
    render(<Counter initialValue={0} min={0} />);
    expect(screen.getByLabelText('Décrémenter')).toBeDisabled();
  });

  it('désactive le bouton + quand la valeur max est atteinte', () => {
    render(<Counter initialValue={10} max={10} />);
    expect(screen.getByLabelText('Incrémenter')).toBeDisabled();
  });
});
