import { useCallback, useState } from 'react';

export type UserProfile = {
  name: string;
  email: string;
  avatarUrl: string;
};

const STORAGE_KEY = 'user-profile';

const DEFAULT_PROFILE: UserProfile = {
  name: '',
  email: '',
  avatarUrl: '',
};

function readProfile(): UserProfile {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_PROFILE;
    return { ...DEFAULT_PROFILE, ...JSON.parse(raw) };
  } catch {
    return DEFAULT_PROFILE;
  }
}

function writeProfile(profile: UserProfile): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
  } catch {
    // localStorage indisponible
  }
}

export function useProfile() {
  const [profile, setProfileState] = useState<UserProfile>(readProfile);

  const setProfile = useCallback((updates: Partial<UserProfile>) => {
    setProfileState((prev) => {
      const next = { ...prev, ...updates };
      writeProfile(next);
      return next;
    });
  }, []);

  return { profile, setProfile };
}
