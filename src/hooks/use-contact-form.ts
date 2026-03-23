import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { contactSchema, ContactFormData } from '../lib/validation';

const SUBMIT_DELAY_MS = 1500;

export function useContactForm() {
  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: { nom: '', email: '', message: '' },
  });

  const submitContactForm = async (data: ContactFormData): Promise<void> => {
    await new Promise<void>((resolve) => setTimeout(resolve, SUBMIT_DELAY_MS));
    console.log('Form submitted:', data);
  };

  return { ...form, submitContactForm };
}
