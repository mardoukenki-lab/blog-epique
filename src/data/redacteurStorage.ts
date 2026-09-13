import { Redacteur } from '../types.ts';

const REDACTEURS_STORAGE_KEY = 'epiqure_redacteurs_v1';

export const INITIAL_REDACTEURS: Redacteur[] = [
  {
    id: 'redacteur-dr-kouame',
    name: 'Dr. Kouamé',
    role: 'Médecin Cardiologue Référent',
    speciality: 'Cardiologie & Prévention HTA',
    avatarUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDKzgNmOdUkB0jxqE8qX6VDNLpKLivRTWW0PYBKkOOGWYf-Rf6lpYzVSqnYiVDJr7fBik-cBpTqvVpquX8NWDaSdheYuMN2_vK4xVT4kt3lnRWlRyI7t2pjEmqCJMDoHdSFvrqyCOiKFLu-nengq9wP5NqJ5Y5k2p8KlHle12P6U4XxyMzSe6B4LNFbh1rq1Xy7DOD9iigHMqaEzTsuTyZ05yuwuyAVHA7mKL-JqD6EyHA8wKTcKN_T',
    bio: 'Praticien hospitalier engagé dans la sensibilisation à la santé cardiovasculaire et la réduction du sel dans l’alimentation quotidienne.',
    email: 'kouame@epiqure.org',
    dateAdded: '01/01/2024',
  },
  {
    id: 'redacteur-inf-bamba',
    name: 'Inf. Bamba',
    role: 'Infirmier Clinicien & Éducateur Diabète',
    speciality: 'Diabétologie & Éducation Thérapeutique',
    initials: 'IB',
    bio: 'Spécialiste de la surveillance glycémique, de la tension et de l’accompagnement au changement des habitudes de vie.',
    email: 'bamba@epiqure.org',
    dateAdded: '15/01/2024',
  },
  {
    id: 'redacteur-estelle-sess',
    name: 'Mme Estelle Sess',
    role: 'Consultante en Gérontologie & Nutrition',
    speciality: 'Santé des Aînés & Nutrition',
    initials: 'ES',
    bio: 'Experte du maintien de l’autonomie, de l’hydratation et de la prévention chez les personnes âgées.',
    email: 'estelle.sess@epiqure.org',
    dateAdded: '01/02/2024',
  },
];

export function getInitialRedacteurs(): Redacteur[] {
  if (typeof window === 'undefined') {
    return INITIAL_REDACTEURS;
  }

  try {
    const raw = localStorage.getItem(REDACTEURS_STORAGE_KEY);
    if (raw !== null) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) {
        return parsed;
      }
    }
  } catch (e) {
    console.error('Erreur lecture rédacteurs localStorage', e);
  }

  // Initial seed
  saveAllRedacteurs(INITIAL_REDACTEURS);
  return INITIAL_REDACTEURS;
}

export function saveAllRedacteurs(redacteurs: Redacteur[]): void {
  try {
    localStorage.setItem(REDACTEURS_STORAGE_KEY, JSON.stringify(redacteurs));
  } catch (e) {
    console.error('Erreur sauvegarde rédacteurs localStorage', e);
  }
}

export function saveSingleRedacteur(redacteur: Redacteur): Redacteur[] {
  const current = getInitialRedacteurs();
  const index = current.findIndex((r) => r.id === redacteur.id);

  let updated: Redacteur[];
  if (index >= 0) {
    updated = [...current];
    updated[index] = redacteur;
  } else {
    updated = [redacteur, ...current];
  }

  saveAllRedacteurs(updated);
  return updated;
}

export function deleteRedacteurById(id: string): Redacteur[] {
  const current = getInitialRedacteurs();
  const updated = current.filter((r) => r.id !== id);
  saveAllRedacteurs(updated);
  return updated;
}

export function resetRedacteursToDefault(): Redacteur[] {
  saveAllRedacteurs(INITIAL_REDACTEURS);
  return INITIAL_REDACTEURS;
}
