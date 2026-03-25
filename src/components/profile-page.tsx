import { useState } from 'react';
import { useProfile } from '../hooks/use-profile';

const DEFAULT_AVATAR =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%236366f1'%3E%3Cpath d='M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z'/%3E%3C/svg%3E";

export function ProfilePage() {
  const { profile, setProfile } = useProfile();
  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState(profile);

  function handleEdit() {
    setDraft(profile);
    setIsEditing(true);
  }

  function handleSave() {
    setProfile(draft);
    setIsEditing(false);
  }

  function handleCancel() {
    setIsEditing(false);
  }

  const avatarSrc = profile.avatarUrl || DEFAULT_AVATAR;

  return (
    <section
      aria-label="Profil utilisateur"
      className="rounded-2xl bg-white p-8 shadow-md shadow-slate-200"
    >
      <div className="flex flex-col items-center gap-6">
        <img
          src={avatarSrc}
          alt="Avatar"
          className="h-24 w-24 rounded-full bg-indigo-50 object-cover ring-4 ring-indigo-100"
        />

        {isEditing ? (
          <div className="w-full space-y-4">
            <div>
              <label
                className="mb-1 block text-sm font-medium text-slate-700"
                htmlFor="profile-name"
              >
                Nom
              </label>
              <input
                id="profile-name"
                type="text"
                value={draft.name}
                onChange={(e) => setDraft((d) => ({ ...d, name: e.target.value }))}
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-800 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label
                className="mb-1 block text-sm font-medium text-slate-700"
                htmlFor="profile-email"
              >
                Email
              </label>
              <input
                id="profile-email"
                type="email"
                value={draft.email}
                onChange={(e) => setDraft((d) => ({ ...d, email: e.target.value }))}
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-800 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label
                className="mb-1 block text-sm font-medium text-slate-700"
                htmlFor="profile-avatar"
              >
                URL Avatar
              </label>
              <input
                id="profile-avatar"
                type="url"
                value={draft.avatarUrl}
                onChange={(e) => setDraft((d) => ({ ...d, avatarUrl: e.target.value }))}
                placeholder="https://..."
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-800 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              />
            </div>

            <div className="flex gap-3 pt-2">
              <button
                onClick={handleSave}
                className="flex-1 rounded-lg bg-indigo-600 px-4 py-2 font-medium text-white transition hover:bg-indigo-700"
              >
                Enregistrer
              </button>
              <button
                onClick={handleCancel}
                className="flex-1 rounded-lg border border-slate-300 px-4 py-2 font-medium text-slate-700 transition hover:bg-slate-50"
              >
                Annuler
              </button>
            </div>
          </div>
        ) : (
          <div className="w-full space-y-2 text-center">
            <h2 className="text-2xl font-semibold text-slate-800">
              {profile.name || 'Nom non défini'}
            </h2>
            <p className="text-slate-500">{profile.email || 'Email non défini'}</p>
            <div className="pt-2">
              <button
                onClick={handleEdit}
                className="rounded-lg bg-indigo-600 px-6 py-2 font-medium text-white transition hover:bg-indigo-700"
              >
                Modifier le profil
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
