export type ArticleCategory =
  | 'hypertension'
  | 'diabete'
  | 'aines'
  | 'nutrition'
  | 'saisonnier'
  | 'quotidien';

export interface ArticleAuthor {
  name: string;
  role: string;
  avatarUrl?: string;
  initials?: string;
  bio?: string;
}

export interface Redacteur {
  id: string;
  name: string;
  role: string;
  speciality?: string;
  avatarUrl?: string;
  initials?: string;
  bio?: string;
  email?: string;
  dateAdded?: string;
}

export interface ArticleContent {
  introduction: string;
  keyPoints: {
    title: string;
    text: string;
    actionTip?: string;
  }[];
  localAdvice?: string;
  scientificFact?: string;
  conclusion: string;
}

export interface Article {
  id: string;
  title: string;
  summary: string;
  category: ArticleCategory;
  categoryLabel: string;
  categoryBadgeClass: string;
  readTime: string;
  imageUrl: string;
  imageAlt: string;
  author: ArticleAuthor;
  date: string;
  recommended?: boolean;
  status?: 'published' | 'draft';
  idealVital?: {
    label: string;
    sublabel: string;
  };
  content?: ArticleContent;
}

export interface HealthAdviceResult {
  title: string;
  status: 'optimal' | 'attention' | 'alerte';
  statusLabel: string;
  statusColor: string;
  summary: string;
  recommendations: string[];
}
