import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ContactForm } from './contact-form';

vi.mock('sonner', () => ({
  toast: { success: vi.fn(), error: vi.fn() },
  Toaster: () => null,
}));

import { toast } from 'sonner';

describe('ContactForm', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  // ── Rendu ──────────────────────────────────────────────────────────────────

  it('affiche tous les champs et le bouton de soumission', () => {
    render(<ContactForm />);

    expect(screen.getByLabelText(/nom/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/message/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /envoyer/i })).toBeInTheDocument();
  });

  // ── Validation : champ Nom ─────────────────────────────────────────────────

  it('affiche une erreur si le nom est vide', async () => {
    render(<ContactForm />);
    await userEvent.click(screen.getByRole('button', { name: /envoyer/i }));

    expect(
      await screen.findByText('Le nom doit contenir au moins 2 caractères'),
    ).toBeInTheDocument();
  });

  it('affiche une erreur si le nom est trop court (1 char)', async () => {
    render(<ContactForm />);
    await userEvent.type(screen.getByLabelText(/nom/i), 'A');
    await userEvent.click(screen.getByRole('button', { name: /envoyer/i }));

    expect(
      await screen.findByText('Le nom doit contenir au moins 2 caractères'),
    ).toBeInTheDocument();
  });

  // ── Validation : champ Email ───────────────────────────────────────────────

  it("affiche une erreur si l'email est invalide", async () => {
    render(<ContactForm />);
    await userEvent.type(screen.getByLabelText(/email/i), 'pas-un-email');
    await userEvent.click(screen.getByRole('button', { name: /envoyer/i }));

    expect(await screen.findByText('Adresse email invalide')).toBeInTheDocument();
  });

  // ── Validation : champ Message ─────────────────────────────────────────────

  it('affiche une erreur si le message est trop court', async () => {
    render(<ContactForm />);
    await userEvent.type(screen.getByLabelText(/message/i), 'Court');
    await userEvent.click(screen.getByRole('button', { name: /envoyer/i }));

    expect(
      await screen.findByText('Le message doit contenir au moins 10 caractères'),
    ).toBeInTheDocument();
  });

  // ── Submit valide ──────────────────────────────────────────────────────────

  it('affiche le spinner pendant le submit', async () => {
    render(<ContactForm />);

    await userEvent.type(screen.getByLabelText(/nom/i), 'Jean Dupont');
    await userEvent.type(screen.getByLabelText(/email/i), 'jean@exemple.fr');
    await userEvent.type(screen.getByLabelText(/message/i), 'Un message suffisamment long.');

    await userEvent.click(screen.getByRole('button', { name: /envoyer/i }));

    expect(await screen.findByText(/envoi en cours/i)).toBeInTheDocument();
  });

  it('affiche un toast de succès après soumission valide', async () => {
    render(<ContactForm />);

    await userEvent.type(screen.getByLabelText(/nom/i), 'Jean Dupont');
    await userEvent.type(screen.getByLabelText(/email/i), 'jean@exemple.fr');
    await userEvent.type(screen.getByLabelText(/message/i), 'Un message suffisamment long.');

    await userEvent.click(screen.getByRole('button', { name: /envoyer/i }));

    await waitFor(() => expect(toast.success).toHaveBeenCalledWith('Message envoyé avec succès !'), {
      timeout: 3000,
    });
  });

  it('réinitialise le formulaire après soumission réussie', async () => {
    render(<ContactForm />);

    const nomInput = screen.getByLabelText(/nom/i) as HTMLInputElement;

    await userEvent.type(nomInput, 'Jean Dupont');
    await userEvent.type(screen.getByLabelText(/email/i), 'jean@exemple.fr');
    await userEvent.type(screen.getByLabelText(/message/i), 'Un message suffisamment long.');

    await userEvent.click(screen.getByRole('button', { name: /envoyer/i }));

    await waitFor(() => expect(nomInput.value).toBe(''), { timeout: 3000 });
  });

  // ── Submit invalide ────────────────────────────────────────────────────────

  it("n'appelle pas le toast si des champs sont invalides", async () => {
    render(<ContactForm />);
    await userEvent.click(screen.getByRole('button', { name: /envoyer/i }));

    await screen.findByText('Le nom doit contenir au moins 2 caractères');
    expect(toast.success).not.toHaveBeenCalled();
    expect(toast.error).not.toHaveBeenCalled();
  });
});
