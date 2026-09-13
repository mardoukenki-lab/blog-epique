import { Article, ArticleCategory } from '../types.ts';
import { FEATURED_ARTICLE, ARTICLES_LIST } from './mockData.ts';

const STORAGE_KEY = 'epiqure_articles_v1';

export const CATEGORY_META: Record<
  ArticleCategory,
  { label: string; badgeClass: string; icon: string; iconColor: string }
> = {
  hypertension: {
    label: 'Hypertension & Cœur',
    badgeClass: 'bg-[#ffdad6] text-[#ba1a1a]',
    icon: 'favorite',
    iconColor: 'text-[#ba1a1a]',
  },
  diabete: {
    label: 'Diabète & Alimentation',
    badgeClass: 'bg-[#006c4a] text-white',
    icon: 'nutrition',
    iconColor: 'text-[#006c4a]',
  },
  aines: {
    label: 'Santé des Aînés',
    badgeClass: 'bg-[#003fb1] text-white',
    icon: 'elderly',
    iconColor: 'text-[#003fb1]',
  },
  nutrition: {
    label: 'Nutrition & Saveurs',
    badgeClass: 'bg-[#ffdad6] text-[#ba1a1a]',
    icon: 'restaurant',
    iconColor: 'text-[#ff7900]',
  },
  saisonnier: {
    label: 'Prévention Saisonnière',
    badgeClass: 'bg-[#006c4a] text-white',
    icon: 'rainy',
    iconColor: 'text-[#006c4a]',
  },
  quotidien: {
    label: 'Bien-être au Quotidien',
    badgeClass: 'bg-[#3d4b5b] text-white',
    icon: 'self_improvement',
    iconColor: 'text-[#3d4b5b]',
  },
};

export const DEFAULT_AUTHORS = [
  {
    name: 'Dr. Kouamé',
    role: 'Médecin Cardiologue Référent • Rédaction Epiqure',
    avatarUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDKzgNmOdUkB0jxqE8qX6VDNLpKLivRTWW0PYBKkOOGWYf-Rf6lpYzVSqnYiVDJr7fBik-cBpTqvVpquX8NWDaSdheYuMN2_vK4xVT4kt3lnRWlRyI7t2pjEmqCJMDoHdSFvrqyCOiKFLu-nengq9wP5NqJ5Y5k2p8KlHle12P6U4XxyMzSe6B4LNFbh1rq1Xy7DOD9iigHMqaEzTsuTyZ05yuwuyAVHA7mKL-JqD6EyHA8wKTcKN_T',
    bio: 'Spécialiste de l’hypertension artérielle et de l’alimentation saine en Afrique de l’Ouest.',
  },
  {
    name: 'Inf. Bamba',
    role: 'Infirmier Clinicien • Équipe Epiqure',
    initials: 'IB',
    bio: 'Spécialiste de la surveillance glycémique, de la tension et de l’accompagnement de terrain.',
  },
  {
    name: 'Mme Estelle Sess',
    role: 'Consultante en Gérontologie • Epiqure',
    initials: 'ES',
    bio: 'Experte du maintien de l’hydratation et de l’autonomie des personnes âgées à domicile.',
  },
];

export function getInitialArticles(): Article[] {
  if (typeof window === 'undefined') {
    return [FEATURED_ARTICLE, ...ARTICLES_LIST];
  }

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw !== null) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) {
        return parsed;
      }
    }
  } catch (e) {
    console.error('Error loading articles from localStorage', e);
  }

  // First time seed only if key has never been set
  const initial = [
    { ...FEATURED_ARTICLE, status: 'published' as const },
    ...ARTICLES_LIST.map((a) => ({ ...a, status: 'published' as const })),
  ];
  saveAllArticles(initial);
  return initial;
}

export function clearAllArticles(): Article[] {
  saveAllArticles([]);
  return [];
}

export function saveAllArticles(articles: Article[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(articles));
  } catch (e) {
    console.error('Error saving articles to localStorage', e);
  }
}

export function saveSingleArticle(article: Article): Article[] {
  const current = getInitialArticles();
  const index = current.findIndex((a) => a.id === article.id);

  let updated: Article[];
  if (index >= 0) {
    updated = [...current];
    updated[index] = article;
  } else {
    updated = [article, ...current];
  }

  saveAllArticles(updated);
  return updated;
}

export function deleteArticleById(id: string): Article[] {
  const current = getInitialArticles();
  const updated = current.filter((a) => a.id !== id);
  saveAllArticles(updated);
  return updated;
}

export function resetArticlesToDefault(): Article[] {
  const initial = [
    { ...FEATURED_ARTICLE, status: 'published' as const },
    ...ARTICLES_LIST.map((a) => ({ ...a, status: 'published' as const })),
  ];
  saveAllArticles(initial);
  return initial;
}
