export interface AuthUser {
  email: string;
  name: string;
  role: string;
}

const AUTH_KEY = 'epiqure_auth_user_v1';

export function getStoredAuth(): AuthUser | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(AUTH_KEY);
    if (raw) {
      return JSON.parse(raw);
    }
  } catch (e) {
    console.error('Erreur lecture auth', e);
  }
  return null;
}

export function saveAuth(user: AuthUser): void {
  try {
    localStorage.setItem(AUTH_KEY, JSON.stringify(user));
  } catch (e) {
    console.error('Erreur sauvegarde auth', e);
  }
}

export function clearAuth(): void {
  try {
    localStorage.removeItem(AUTH_KEY);
  } catch (e) {
    console.error('Erreur suppression auth', e);
  }
}
