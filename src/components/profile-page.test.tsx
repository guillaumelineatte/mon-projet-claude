import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it } from 'vitest';
import { ProfilePage } from './profile-page';

describe('ProfilePage', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("affiche les valeurs par défaut quand localStorage est vide", () => {
    render(<ProfilePage />);
    expect(screen.getByText('Nom non défini')).toBeInTheDocument();
    expect(screen.getByText('Email non défini')).toBeInTheDocument();
  });

  it('affiche le bouton "Modifier le profil"', () => {
    render(<ProfilePage />);
    expect(screen.getByRole('button', { name: /modifier le profil/i })).toBeInTheDocument();
  });

  it('affiche un avatar', () => {
    render(<ProfilePage />);
    expect(screen.getByRole('img', { name: /avatar/i })).toBeInTheDocument();
  });

  it('passe en mode édition au clic sur "Modifier le profil"', async () => {
    render(<ProfilePage />);
    await userEvent.click(screen.getByRole('button', { name: /modifier le profil/i }));
    expect(screen.getByLabelText('Nom')).toBeInTheDocument();
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByLabelText('URL Avatar')).toBeInTheDocument();
  });

  it('enregistre les modifications et les persiste dans localStorage', async () => {
    render(<ProfilePage />);
    await userEvent.click(screen.getByRole('button', { name: /modifier le profil/i }));

    await userEvent.clear(screen.getByLabelText('Nom'));
    await userEvent.type(screen.getByLabelText('Nom'), 'Alice');
    await userEvent.clear(screen.getByLabelText('Email'));
    await userEvent.type(screen.getByLabelText('Email'), 'alice@example.com');

    await userEvent.click(screen.getByRole('button', { name: /enregistrer/i }));

    expect(screen.getByText('Alice')).toBeInTheDocument();
    expect(screen.getByText('alice@example.com')).toBeInTheDocument();

    const stored = JSON.parse(localStorage.getItem('user-profile') ?? '{}');
    expect(stored.name).toBe('Alice');
    expect(stored.email).toBe('alice@example.com');
  });

  it('annule sans sauvegarder', async () => {
    render(<ProfilePage />);
    await userEvent.click(screen.getByRole('button', { name: /modifier le profil/i }));
    await userEvent.type(screen.getByLabelText('Nom'), 'Bob');
    await userEvent.click(screen.getByRole('button', { name: /annuler/i }));

    expect(screen.getByText('Nom non défini')).toBeInTheDocument();
    expect(localStorage.getItem('user-profile')).toBeNull();
  });

  it('restaure le profil depuis localStorage au montage', () => {
    localStorage.setItem(
      'user-profile',
      JSON.stringify({ name: 'Charlie', email: 'charlie@test.com', avatarUrl: '' }),
    );
    render(<ProfilePage />);
    expect(screen.getByText('Charlie')).toBeInTheDocument();
    expect(screen.getByText('charlie@test.com')).toBeInTheDocument();
  });

  it('utilise avatarUrl depuis localStorage comme src de l\'avatar', () => {
    const url = 'https://example.com/avatar.png';
    localStorage.setItem(
      'user-profile',
      JSON.stringify({ name: 'Dana', email: 'dana@test.com', avatarUrl: url }),
    );
    render(<ProfilePage />);
    expect(screen.getByRole('img', { name: /avatar/i })).toHaveAttribute('src', url);
  });

  it('quitte le mode édition après enregistrement', async () => {
    render(<ProfilePage />);
    await userEvent.click(screen.getByRole('button', { name: /modifier le profil/i }));
    await userEvent.click(screen.getByRole('button', { name: /enregistrer/i }));
    expect(screen.getByRole('button', { name: /modifier le profil/i })).toBeInTheDocument();
    expect(screen.queryByLabelText('Nom')).not.toBeInTheDocument();
  });
});
