import React, { useState } from 'react';
import { Article, ArticleCategory, ArticleAuthor, Redacteur } from '../types.ts';
import {
  CATEGORY_META,
  saveSingleArticle,
  deleteArticleById,
  resetArticlesToDefault,
  clearAllArticles,
} from '../data/articleStorage.ts';
import {
  getInitialRedacteurs,
  saveSingleRedacteur,
  deleteRedacteurById,
  resetRedacteursToDefault,
} from '../data/redacteurStorage.ts';

interface AdminScreenProps {
  articles: Article[];
  onArticlesChange: (articles: Article[]) => void;
  onNavigateToPublic: () => void;
  onPreviewArticle: (article: Article) => void;
}

const PRESET_IMAGES = [
  {
    label: 'Consultation & Tension',
    url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDaBQA9wHwsQo96Rcb3crC4pPuJSUq_8KnPVcVQkcViBYbYkKADZn96fWT6DgAtJKsCQ4mZ-T3lYYmlT08a_xIZJvRIVWTdRAwJ1fkr9hTNrAuPY_k1ZF9UUjebQRzbYQ06zLt_LHzFmn_Wf0_NKgU3Tvmp5elgiqFjYI2jRI3ESvHwoJJ0opB75zOObDGevfxXTPFeNEDXWcmf5KzFhmzSD4T_4gSTMTNNbLO4XSA7wS2FpghbZbQ2',
  },
  {
    label: 'Assiette équilibrée & Nutrition',
    url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCN-7biKqYPE5Rf7bKJc7kzgwkov-spTeryRE8dHidQHGRnFCaj55GWAndTMYMhbupiC9M5MIXUp9VlpSW2k7zy1wQ4kx5TR1R3El_xGjO7x1k3OA8TRsUqz5YT-vhzFWREny7wVvvkqfJ7AuE77Wb5b1uI1z7ae8p3apf82KZunpBy6Ybx2Bts-IJlD0pEqGQQIfIC51NRp_hdsMpRLcQfArBWKwwIDjHklxYkNwMlXuCbR66IfGwx',
  },
  {
    label: 'Soin des Aînés & Hydratation',
    url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDYhYgS7E0X3-p9tE4_B4X7X_0fA8_R2P2B6_F4W6U0M6D0Q5L4_P6Q7W0_E4M5O0Q7K4L3Y8S1X2M5O0_B6A8P0Q7K4L3Y8S1X2M5O0_B6A8P0Q7K4L3Y8S1X2M5O0_B6A8P0Q7K4L3Y8S1X2M5O0_B6A8P0Q7K4L3Y8S1X2M5O0_B6A8P0Q7K4L3Y8S1X2M5O0_B6A8P0Q7K4L3Y8S1X2M5O0_B6A8P0Q7K4L3Y8S1X',
  },
];

const PRESET_AVATARS = [
  {
    label: 'Homme Médecin (Stéthoscope)',
    url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDKzgNmOdUkB0jxqE8qX6VDNLpKLivRTWW0PYBKkOOGWYf-Rf6lpYzVSqnYiVDJr7fBik-cBpTqvVpquX8NWDaSdheYuMN2_vK4xVT4kt3lnRWlRyI7t2pjEmqCJMDoHdSFvrqyCOiKFLu-nengq9wP5NqJ5Y5k2p8KlHle12P6U4XxyMzSe6B4LNFbh1rq1Xy7DOD9iigHMqaEzTsuTyZ05yuwuyAVHA7mKL-JqD6EyHA8wKTcKN_T',
  },
  {
    label: 'Femme Médecin / Spécialiste',
    url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDrJ7r0-pZ7t_4A8_R2P2B6_F4W6U0M6D0Q5L4_P6Q7W0_E4M5O0Q7K4L3Y8S1X2M5O0_B6A8P0Q7K4L3Y8S1X2M5O0_B6A8P0Q7K4L3Y8S1X2M5O0_B6A8P0Q7K4L3Y8S1X2M5O0_B6A8P0Q7K4L3Y8S1X2M5O0_B6A8P0Q7K4L3Y8S1X2M5O0_B6A8P0Q7K4L3Y8S1X2M5O0_B6A8',
  },
];

export const AdminScreen: React.FC<AdminScreenProps> = ({
  articles,
  onArticlesChange,
  onNavigateToPublic,
  onPreviewArticle,
}) => {
  const [activeTab, setActiveTab] = useState<'list' | 'editor' | 'redacteurs'>('list');
  const [editingArticleId, setEditingArticleId] = useState<string | null>(null);
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [notification, setNotification] = useState<string | null>(null);

  // Redacteurs State
  const [redacteurs, setRedacteurs] = useState<Redacteur[]>(() => getInitialRedacteurs());
  const [isRedacteurModalOpen, setIsRedacteurModalOpen] = useState(false);
  const [editingRedacteurId, setEditingRedacteurId] = useState<string | null>(null);
  const [redacteurName, setRedacteurName] = useState('');
  const [redacteurRole, setRedacteurRole] = useState('');
  const [redacteurSpeciality, setRedacteurSpeciality] = useState('');
  const [redacteurEmail, setRedacteurEmail] = useState('');
  const [redacteurBio, setRedacteurBio] = useState('');
  const [redacteurAvatar, setRedacteurAvatar] = useState('');

  // Article Form State
  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [category, setCategory] = useState<ArticleCategory>('hypertension');
  const [readTime, setReadTime] = useState('4 min');
  const [status, setStatus] = useState<'published' | 'draft'>('published');
  const [recommended, setRecommended] = useState(false);
  const [imageUrl, setImageUrl] = useState(PRESET_IMAGES[0].url);
  const [imageAlt, setImageAlt] = useState('');

  // Author State (defaults to first rédacteur if exists)
  const [authorName, setAuthorName] = useState(() => redacteurs[0]?.name || 'Dr. Kouamé');
  const [authorRole, setAuthorRole] = useState(
    () => redacteurs[0]?.role || 'Médecin Cardiologue Référent'
  );

  // Ideal Vital (optional)
  const [vitalLabel, setVitalLabel] = useState('');
  const [vitalSublabel, setVitalSublabel] = useState('');

  // Editorial Content
  const [introduction, setIntroduction] = useState('');
  const [keyPoints, setKeyPoints] = useState<
    { title: string; text: string; actionTip?: string }[]
  >([
    {
      title: '1. Conseil principal',
      text: 'Explication médicale claire et accessible...',
      actionTip: 'Astuce d’action concrète à appliquer dès aujourd’hui',
    },
  ]);
  const [localAdvice, setLocalAdvice] = useState('');
  const [scientificFact, setScientificFact] = useState('');
  const [conclusion, setConclusion] = useState('');

  const showNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => {
      setNotification(null);
    }, 4000);
  };

  // Open New Article
  const handleOpenNewArticle = () => {
    setEditingArticleId(null);
    setTitle('');
    setSummary('');
    setCategory('hypertension');
    setReadTime('4 min');
    setStatus('published');
    setRecommended(false);
    setImageUrl(PRESET_IMAGES[0].url);
    setImageAlt('');
    if (redacteurs.length > 0) {
      setAuthorName(redacteurs[0].name);
      setAuthorRole(redacteurs[0].role);
    }
    setVitalLabel('');
    setVitalSublabel('');
    setIntroduction('');
    setKeyPoints([
      {
        title: '1. Règle fondamentale',
        text: 'Détaillez ici la recommandation avec pédagogie...',
        actionTip: 'Geste d’action rapide à faire en famille',
      },
    ]);
    setLocalAdvice('');
    setScientificFact('');
    setConclusion('');
    setActiveTab('editor');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleEditArticle = (art: Article) => {
    setEditingArticleId(art.id);
    setTitle(art.title);
    setSummary(art.summary);
    setCategory(art.category);
    setReadTime(art.readTime);
    setStatus(art.status || 'published');
    setRecommended(art.recommended || false);
    setImageUrl(art.imageUrl);
    setImageAlt(art.imageAlt);
    setAuthorName(art.author.name);
    setAuthorRole(art.author.role);
    setVitalLabel(art.idealVital?.label || '');
    setVitalSublabel(art.idealVital?.sublabel || '');
    setIntroduction(art.content?.introduction || '');
    setKeyPoints(
      art.content?.keyPoints || [
        {
          title: '1. Point essentiel',
          text: art.summary,
        },
      ]
    );
    setLocalAdvice(art.content?.localAdvice || '');
    setScientificFact(art.content?.scientificFact || '');
    setConclusion(art.content?.conclusion || '');
    setActiveTab('editor');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDeleteArticle = (id: string, artTitle: string) => {
    if (window.confirm(`Confirmez-vous la suppression de l'article "${artTitle}" ?`)) {
      const updated = deleteArticleById(id);
      onArticlesChange(updated);
      showNotification(`Article "${artTitle}" supprimé avec succès.`);
    }
  };

  const handleToggleStatus = (art: Article) => {
    const nextStatus = art.status === 'draft' ? 'published' : 'draft';
    const updated = saveSingleArticle({ ...art, status: nextStatus });
    onArticlesChange(updated);
    showNotification(
      `Statut de "${art.title}" passé à ${nextStatus === 'published' ? 'Publié' : 'Brouillon'}.`
    );
  };

  const handleResetDefaults = () => {
    if (
      window.confirm(
        'Voulez-vous réinitialiser les articles avec les articles d’exemple par défaut ?'
      )
    ) {
      const def = resetArticlesToDefault();
      onArticlesChange(def);
      showNotification('Articles d’exemple réinitialisés avec succès.');
    }
  };

  // Purge / Delete all mock data
  const handleClearMockData = () => {
    if (
      window.confirm(
        'Êtes-vous sûr de vouloir supprimer tous les articles d’exemple ? Votre blog sera entièrement vierge pour accueillir vos véritables publications.'
      )
    ) {
      const empty = clearAllArticles();
      onArticlesChange(empty);
      showNotification(
        'Toutes les données factices ont été supprimées. Le blog est prêt pour vos articles réels !'
      );
    }
  };

  // Keypoints in Article Form
  const handleAddKeyPoint = () => {
    setKeyPoints([
      ...keyPoints,
      {
        title: `${keyPoints.length + 1}. Nouveau conseil`,
        text: '',
        actionTip: '',
      },
    ]);
  };

  const handleRemoveKeyPoint = (index: number) => {
    if (keyPoints.length <= 1) return;
    setKeyPoints(keyPoints.filter((_, i) => i !== index));
  };

  const handleKeyPointChange = (
    index: number,
    field: 'title' | 'text' | 'actionTip',
    val: string
  ) => {
    const updated = [...keyPoints];
    updated[index] = { ...updated[index], [field]: val };
    setKeyPoints(updated);
  };

  // Save Article
  const handleSaveArticle = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !summary.trim()) {
      alert('Veuillez remplir au moins le titre et le résumé de l’article.');
      return;
    }

    const catMeta = CATEGORY_META[category];
    const now = new Date();
    const dateStr = `${String(now.getDate()).padStart(2, '0')}/${String(now.getMonth() + 1).padStart(2, '0')}/${now.getFullYear()}`;

    const matchedRedacteur = redacteurs.find((r) => r.name === authorName);
    const authorObj: ArticleAuthor = {
      name: authorName,
      role: authorRole,
      avatarUrl: matchedRedacteur?.avatarUrl || undefined,
      initials: matchedRedacteur?.initials || undefined,
      bio: matchedRedacteur?.bio || undefined,
    };

    const articleToSave: Article = {
      id: editingArticleId || `art-${Date.now()}`,
      title: title.trim(),
      summary: summary.trim(),
      category,
      categoryLabel: catMeta.label,
      categoryBadgeClass: catMeta.badgeClass,
      readTime: readTime.trim() || '4 min',
      status,
      recommended,
      imageUrl: imageUrl || PRESET_IMAGES[0].url,
      imageAlt: imageAlt.trim() || title.trim(),
      author: authorObj,
      date: dateStr,
      idealVital: vitalLabel.trim()
        ? {
            label: vitalLabel.trim(),
            sublabel: vitalSublabel.trim() || 'Repère médical',
          }
        : undefined,
      content: {
        introduction: introduction.trim() || summary.trim(),
        keyPoints: keyPoints.map((kp) => ({
          title: kp.title.trim(),
          text: kp.text.trim(),
          actionTip: kp.actionTip?.trim() || undefined,
        })),
        localAdvice: localAdvice.trim() || undefined,
        scientificFact: scientificFact.trim() || undefined,
        conclusion:
          conclusion.trim() ||
          'Prenez soin de votre santé au quotidien avec les conseils Epiqure.',
      },
    };

    const updated = saveSingleArticle(articleToSave);
    onArticlesChange(updated);
    showNotification(
      editingArticleId
        ? `Article "${articleToSave.title}" mis à jour avec succès !`
        : `Nouvel article publié avec succès sur le blog Epiqure !`
    );
    setActiveTab('list');
  };

  // REDACTEURS MANAGEMENT
  const handleOpenAddRedacteur = () => {
    setEditingRedacteurId(null);
    setRedacteurName('');
    setRedacteurRole('Médecin Généraliste');
    setRedacteurSpeciality('');
    setRedacteurEmail('');
    setRedacteurBio('');
    setRedacteurAvatar('');
    setIsRedacteurModalOpen(true);
  };

  const handleOpenEditRedacteur = (r: Redacteur) => {
    setEditingRedacteurId(r.id);
    setRedacteurName(r.name);
    setRedacteurRole(r.role);
    setRedacteurSpeciality(r.speciality || '');
    setRedacteurEmail(r.email || '');
    setRedacteurBio(r.bio || '');
    setRedacteurAvatar(r.avatarUrl || '');
    setIsRedacteurModalOpen(true);
  };

  const handleSaveRedacteur = (e: React.FormEvent) => {
    e.preventDefault();
    if (!redacteurName.trim() || !redacteurRole.trim()) {
      alert('Veuillez renseigner le nom et le titre du praticien rédacteur.');
      return;
    }

    const now = new Date();
    const dateStr = `${String(now.getDate()).padStart(2, '0')}/${String(now.getMonth() + 1).padStart(2, '0')}/${now.getFullYear()}`;

    const newRedacteur: Redacteur = {
      id: editingRedacteurId || `redacteur-${Date.now()}`,
      name: redacteurName.trim(),
      role: redacteurRole.trim(),
      speciality: redacteurSpeciality.trim() || undefined,
      email: redacteurEmail.trim() || undefined,
      bio: redacteurBio.trim() || undefined,
      avatarUrl: redacteurAvatar.trim() || undefined,
      initials: redacteurName
        .trim()
        .split(' ')
        .map((p) => p[0])
        .join('')
        .toUpperCase()
        .slice(0, 2),
      dateAdded: dateStr,
    };

    const updatedList = saveSingleRedacteur(newRedacteur);
    setRedacteurs(updatedList);
    setIsRedacteurModalOpen(false);
    showNotification(
      editingRedacteurId
        ? `Rédacteur "${newRedacteur.name}" modifié avec succès !`
        : `Nouveau rédacteur "${newRedacteur.name}" ajouté à l'équipe !`
    );
  };

  const handleDeleteRedacteur = (id: string, name: string) => {
    if (window.confirm(`Confirmez-vous le retrait du rédacteur "${name}" ?`)) {
      const updated = deleteRedacteurById(id);
      setRedacteurs(updated);
      showNotification(`Rédacteur "${name}" retiré de l'équipe.`);
    }
  };

  // Filtered Articles for Table
  const filteredList = articles.filter((art) => {
    const matchesCat = filterCategory === 'all' || art.category === filterCategory;
    const q = searchQuery.toLowerCase().trim();
    const matchesQ =
      !q || art.title.toLowerCase().includes(q) || art.author.name.toLowerCase().includes(q);
    return matchesCat && matchesQ;
  });

  const publishedCount = articles.filter((a) => a.status !== 'draft').length;
  const draftCount = articles.filter((a) => a.status === 'draft').length;

  return (
    <div className="flex flex-col w-full pb-20">
      {/* Toast Notification */}
      {notification && (
        <div className="fixed top-24 right-6 z-50 p-4 rounded-xl bg-[#006c4a] text-white shadow-xl flex items-center gap-3 animate-in slide-in-from-top-4 duration-200">
          <span className="material-symbols-outlined text-[22px]">check_circle</span>
          <span className="text-[14px] font-medium">{notification}</span>
        </div>
      )}

      {/* Top Admin Bar */}
      <section className="bg-white border-b border-[#e5eeff] py-6 shadow-xs">
        <div className="max-w-[1200px] mx-auto px-4 md:px-8 lg:px-12 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#003fb1] to-[#1a56db] text-white flex items-center justify-center shadow-xs">
              <span className="material-symbols-outlined text-[24px]">dashboard</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-heading font-bold text-[22px] md:text-[24px] text-[#121c28]">
                  Espace Administration & Rédaction
                </h1>
                <span className="px-2 py-0.5 rounded-full bg-[#e5eeff] text-[#003fb1] text-[11px] font-bold uppercase tracking-wider">
                  Epiqure CMS
                </span>
              </div>
              <p className="text-[13px] text-[#434654]">
                Publiez vos conseils médicaux, gérez l’équipe de rédacteurs et modérez le blog.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={onNavigateToPublic}
              className="h-10 px-4 rounded-xl border border-[#c3c5d7] text-[#434654] hover:text-[#003fb1] hover:bg-[#f8f9ff] text-[13.5px] font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-[18px]">visibility</span>
              <span>Voir le blog public</span>
            </button>

            <button
              onClick={handleOpenNewArticle}
              className="h-10 px-4 rounded-xl bg-[#003fb1] text-white hover:bg-[#1a56db] text-[13.5px] font-semibold flex items-center gap-1.5 shadow-xs transition-all cursor-pointer"
            >
              <span className="material-symbols-outlined text-[18px]">add_circle</span>
              <span>Rédiger un article</span>
            </button>
          </div>
        </div>
      </section>

      {/* KPI Stats Bar */}
      <div className="max-w-[1200px] mx-auto px-4 md:px-8 lg:px-12 pt-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-4.5 rounded-2xl border border-[#e5eeff] shadow-xs flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#e5eeff] text-[#003fb1] flex items-center justify-center">
              <span className="material-symbols-outlined text-[22px]">auto_stories</span>
            </div>
            <div>
              <span className="text-[12px] text-[#737686] block">Total Articles</span>
              <span className="font-heading font-bold text-[20px] text-[#121c28]">
                {articles.length}
              </span>
            </div>
          </div>

          <div className="bg-white p-4.5 rounded-2xl border border-[#e5eeff] shadow-xs flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#82f5c1]/30 text-[#006c4a] flex items-center justify-center">
              <span className="material-symbols-outlined text-[22px]">check_circle</span>
            </div>
            <div>
              <span className="text-[12px] text-[#737686] block">En ligne (Publiés)</span>
              <span className="font-heading font-bold text-[20px] text-[#006c4a]">
                {publishedCount}
              </span>
            </div>
          </div>

          <div className="bg-white p-4.5 rounded-2xl border border-[#e5eeff] shadow-xs flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#ffdcc2] text-[#833800] flex items-center justify-center">
              <span className="material-symbols-outlined text-[22px]">edit_document</span>
            </div>
            <div>
              <span className="text-[12px] text-[#737686] block">Brouillons</span>
              <span className="font-heading font-bold text-[20px] text-[#833800]">
                {draftCount}
              </span>
            </div>
          </div>

          <div
            onClick={() => setActiveTab('redacteurs')}
            className="bg-white p-4.5 rounded-2xl border border-[#e5eeff] shadow-xs flex items-center gap-3 cursor-pointer hover:border-[#003fb1] transition-colors"
          >
            <div className="w-10 h-10 rounded-xl bg-[#eef4ff] text-[#003fb1] flex items-center justify-center">
              <span className="material-symbols-outlined text-[22px]">medical_services</span>
            </div>
            <div>
              <span className="text-[12px] text-[#737686] block">Rédacteurs & Soignants</span>
              <span className="font-heading font-bold text-[20px] text-[#003fb1]">
                {redacteurs.length}
              </span>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-[#e5eeff] gap-2 sm:gap-4 mb-6 overflow-x-auto">
          <button
            onClick={() => setActiveTab('list')}
            className={`py-3 px-4 text-[14px] sm:text-[15px] font-semibold flex items-center gap-2 border-b-2 whitespace-nowrap transition-all cursor-pointer ${
              activeTab === 'list'
                ? 'border-[#003fb1] text-[#003fb1]'
                : 'border-transparent text-[#737686] hover:text-[#121c28]'
            }`}
          >
            <span className="material-symbols-outlined text-[20px]">list_alt</span>
            <span>Tous les articles ({articles.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('editor')}
            className={`py-3 px-4 text-[14px] sm:text-[15px] font-semibold flex items-center gap-2 border-b-2 whitespace-nowrap transition-all cursor-pointer ${
              activeTab === 'editor'
                ? 'border-[#003fb1] text-[#003fb1]'
                : 'border-transparent text-[#737686] hover:text-[#121c28]'
            }`}
          >
            <span className="material-symbols-outlined text-[20px]">
              {editingArticleId ? 'edit' : 'post_add'}
            </span>
            <span>
              {editingArticleId ? 'Modifier l’article en cours' : 'Nouvel Article / Conseil'}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('redacteurs')}
            className={`py-3 px-4 text-[14px] sm:text-[15px] font-semibold flex items-center gap-2 border-b-2 whitespace-nowrap transition-all cursor-pointer ${
              activeTab === 'redacteurs'
                ? 'border-[#003fb1] text-[#003fb1]'
                : 'border-transparent text-[#737686] hover:text-[#121c28]'
            }`}
          >
            <span className="material-symbols-outlined text-[20px]">group</span>
            <span>Rédacteurs & Praticiens ({redacteurs.length})</span>
          </button>
        </div>

        {/* ========================================================================= */}
        {/* TAB 1 : LIST OF ARTICLES */}
        {/* ========================================================================= */}
        {activeTab === 'list' && (
          <div className="flex flex-col gap-6">
            {/* Filters Bar */}
            <div className="bg-white p-4 rounded-2xl border border-[#e5eeff] shadow-xs flex flex-col md:flex-row gap-4 items-center justify-between">
              <div className="relative w-full md:w-80">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#737686] text-[18px]">
                  search
                </span>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Rechercher par titre ou auteur..."
                  className="w-full h-10 pl-9 pr-3 rounded-xl border border-[#c3c5d7] text-[13px] bg-[#f8f9ff] focus:outline-none focus:ring-2 focus:ring-[#003fb1]"
                />
              </div>

              <div className="flex flex-wrap items-center gap-2 w-full md:w-auto justify-end">
                <select
                  value={filterCategory}
                  onChange={(e) => setFilterCategory(e.target.value)}
                  className="h-10 px-3 rounded-xl border border-[#c3c5d7] text-[13px] bg-[#f8f9ff] focus:outline-none focus:ring-2 focus:ring-[#003fb1]"
                >
                  <option value="all">Toutes les rubriques</option>
                  <option value="hypertension">Hypertension & Cœur</option>
                  <option value="diabete">Diabète & Alimentation</option>
                  <option value="aines">Santé des Aînés</option>
                  <option value="nutrition">Nutrition & Saveurs</option>
                  <option value="saisonnier">Prévention Saisonnière</option>
                  <option value="quotidien">Bien-être Quotidien</option>
                </select>

                {/* Purger les données factices */}
                {articles.length > 0 && (
                  <button
                    onClick={handleClearMockData}
                    className="h-10 px-3 text-[12.5px] text-[#ba1a1a] hover:bg-[#ffdad6]/40 border border-[#ffdad6] rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer"
                    title="Supprimer tous les articles factices pour démarrer avec un blog propre"
                  >
                    <span className="material-symbols-outlined text-[17px]">delete_sweep</span>
                    <span>Purger les données factices</span>
                  </button>
                )}

                <button
                  onClick={handleResetDefaults}
                  className="h-10 px-3 text-[12.5px] text-[#737686] hover:text-[#003fb1] hover:bg-[#e5eeff] rounded-xl transition-colors cursor-pointer"
                  title="Restaurer des articles modèles si besoin"
                >
                  Restaurer exemples
                </button>
              </div>
            </div>

            {/* Articles Table */}
            <div className="bg-white rounded-2xl border border-[#e5eeff] shadow-xs overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-[14px]">
                  <thead>
                    <tr className="bg-[#f8f9ff] border-b border-[#e5eeff] text-[#434654] text-[12px] font-semibold uppercase tracking-wider">
                      <th className="py-3.5 px-4">Article</th>
                      <th className="py-3.5 px-4">Rubrique</th>
                      <th className="py-3.5 px-4">Auteur</th>
                      <th className="py-3.5 px-4">Date</th>
                      <th className="py-3.5 px-4">Statut</th>
                      <th className="py-3.5 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#e5eeff]">
                    {filteredList.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="text-center py-12 px-4">
                          <div className="max-w-md mx-auto flex flex-col items-center gap-3">
                            <div className="w-14 h-14 rounded-2xl bg-[#e5eeff] text-[#003fb1] flex items-center justify-center">
                              <span className="material-symbols-outlined text-[30px]">post_add</span>
                            </div>
                            <h3 className="font-heading font-semibold text-[17px] text-[#121c28]">
                              {articles.length === 0
                                ? 'Aucun article publié pour le moment'
                                : 'Aucun article ne correspond à votre filtre'}
                            </h3>
                            <p className="text-[13px] text-[#434654] leading-relaxed">
                              {articles.length === 0
                                ? 'Votre blog est propre et sans données factices. Vous pouvez dès maintenant rédiger votre premier conseil de santé ou ajouter un rédacteur.'
                                : 'Essayez d’élargir vos critères de recherche ou de réinitialiser le filtre de rubrique.'}
                            </p>
                            <div className="flex items-center gap-3 pt-2">
                              <button
                                onClick={handleOpenNewArticle}
                                className="h-10 px-4 rounded-xl bg-[#003fb1] text-white text-[13px] font-medium flex items-center gap-2 hover:bg-[#1a56db] transition-colors cursor-pointer"
                              >
                                <span className="material-symbols-outlined text-[18px]">add</span>
                                <span>Rédiger le 1er article</span>
                              </button>
                              <button
                                onClick={() => setActiveTab('redacteurs')}
                                className="h-10 px-4 rounded-xl border border-[#c3c5d7] text-[#434654] hover:bg-[#f8f9ff] text-[13px] font-medium flex items-center gap-2 transition-colors cursor-pointer"
                              >
                                <span className="material-symbols-outlined text-[18px]">person_add</span>
                                <span>Ajouter un rédacteur</span>
                              </button>
                            </div>
                          </div>
                        </td>
                      </tr>
                    ) : (
                      filteredList.map((art) => (
                        <tr
                          key={art.id}
                          className="hover:bg-[#f8f9ff]/60 transition-colors group"
                        >
                          <td className="py-3.5 px-4 max-w-xs">
                            <div className="flex items-center gap-3">
                              <img
                                src={art.imageUrl}
                                alt={art.title}
                                className="w-12 h-10 rounded-lg object-cover bg-[#e5eeff] shrink-0"
                              />
                              <div className="flex flex-col">
                                <span className="font-semibold text-[#121c28] group-hover:text-[#003fb1] line-clamp-1">
                                  {art.title}
                                </span>
                                <span className="text-[12px] text-[#737686] line-clamp-1">
                                  {art.summary}
                                </span>
                              </div>
                            </div>
                          </td>

                          <td className="py-3.5 px-4 whitespace-nowrap">
                            <span
                              className={`px-2.5 py-1 rounded-md text-[11px] font-medium ${art.categoryBadgeClass}`}
                            >
                              {art.categoryLabel}
                            </span>
                          </td>

                          <td className="py-3.5 px-4 whitespace-nowrap">
                            <span className="font-medium text-[#121c28]">
                              {art.author.name}
                            </span>
                          </td>

                          <td className="py-3.5 px-4 whitespace-nowrap text-[#737686] text-[13px]">
                            {art.date}
                          </td>

                          <td className="py-3.5 px-4 whitespace-nowrap">
                            <button
                              onClick={() => handleToggleStatus(art)}
                              className={`px-2.5 py-1 rounded-full text-[11px] font-bold transition-all cursor-pointer ${
                                art.status === 'draft'
                                  ? 'bg-[#ffdcc2] text-[#833800] hover:bg-[#ffcba4]'
                                  : 'bg-[#82f5c1] text-[#004b33] hover:bg-[#6be4b0]'
                              }`}
                              title="Cliquer pour changer de statut"
                            >
                              {art.status === 'draft' ? 'Brouillon' : 'Publié'}
                            </button>
                          </td>

                          <td className="py-3.5 px-4 whitespace-nowrap text-right">
                            <div className="flex items-center justify-end gap-1">
                              <button
                                onClick={() => onPreviewArticle(art)}
                                className="p-1.5 rounded-lg text-[#003fb1] hover:bg-[#e5eeff] transition-colors cursor-pointer"
                                title="Lire l'article sur le blog"
                              >
                                <span className="material-symbols-outlined text-[18px]">
                                  visibility
                                </span>
                              </button>

                              <button
                                onClick={() => handleEditArticle(art)}
                                className="p-1.5 rounded-lg text-[#006c4a] hover:bg-[#82f5c1]/30 transition-colors cursor-pointer"
                                title="Modifier"
                              >
                                <span className="material-symbols-outlined text-[18px]">
                                  edit
                                </span>
                              </button>

                              <button
                                onClick={() => handleDeleteArticle(art.id, art.title)}
                                className="p-1.5 rounded-lg text-[#ba1a1a] hover:bg-[#ffdad6] transition-colors cursor-pointer"
                                title="Supprimer"
                              >
                                <span className="material-symbols-outlined text-[18px]">
                                  delete
                                </span>
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 2 : POST & EDIT ARTICLE FORM */}
        {/* ========================================================================= */}
        {activeTab === 'editor' && (
          <form
            onSubmit={handleSaveArticle}
            className="bg-white rounded-3xl p-6 md:p-10 border border-[#e5eeff] shadow-sm flex flex-col gap-8"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#e5eeff]">
              <div>
                <h2 className="font-heading font-bold text-[22px] text-[#121c28]">
                  {editingArticleId ? 'Modifier l’article médical' : 'Rédiger un nouvel article'}
                </h2>
                <p className="text-[13.5px] text-[#434654]">
                  Veillez à respecter la rigueur médicale et la clarté pédagogique d’Epiqure.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setActiveTab('list')}
                  className="h-10 px-4 rounded-xl border border-[#c3c5d7] text-[#434654] hover:bg-[#f8f9ff] text-[13.5px] font-medium transition-colors cursor-pointer"
                >
                  Annuler
                </button>

                <button
                  type="submit"
                  className="h-10 px-5 rounded-xl bg-[#003fb1] hover:bg-[#1a56db] text-white text-[13.5px] font-semibold flex items-center gap-2 shadow-xs transition-all cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[18px]">save</span>
                  <span>{editingArticleId ? 'Enregistrer les modifications' : 'Publier l’article'}</span>
                </button>
              </div>
            </div>

            {/* Section 1 : Informations principales */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
              <div className="md:col-span-8 flex flex-col gap-5">
                <div>
                  <label className="block text-[13.5px] font-semibold text-[#121c28] mb-1.5">
                    Titre de l’article <span className="text-[#ba1a1a]">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Ex: Hypertension artérielle : 5 gestes quotidiens pour préserver son cœur"
                    className="w-full h-12 px-3.5 rounded-xl border border-[#c3c5d7] text-[15px] font-medium focus:outline-none focus:ring-2 focus:ring-[#003fb1] bg-[#f8f9ff]"
                  />
                </div>

                <div>
                  <label className="block text-[13.5px] font-semibold text-[#121c28] mb-1.5">
                    Chapeau / Résumé d’accroche (visible sur la carte) <span className="text-[#ba1a1a]">*</span>
                  </label>
                  <textarea
                    rows={3}
                    required
                    value={summary}
                    onChange={(e) => setSummary(e.target.value)}
                    placeholder="Une synthèse de 2 à 4 phrases résumant l'enjeu médical et la solution concrète..."
                    className="w-full p-3.5 rounded-xl border border-[#c3c5d7] text-[14px] focus:outline-none focus:ring-2 focus:ring-[#003fb1] bg-[#f8f9ff]"
                  />
                </div>
              </div>

              <div className="md:col-span-4 flex flex-col gap-4 bg-[#f8f9ff] p-5 rounded-2xl border border-[#e5eeff]">
                <div>
                  <label className="block text-[13px] font-semibold text-[#121c28] mb-1">
                    Rubrique / Thématique <span className="text-[#ba1a1a]">*</span>
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as ArticleCategory)}
                    className="w-full h-11 px-3 rounded-xl border border-[#c3c5d7] text-[13.5px] bg-white focus:outline-none focus:ring-2 focus:ring-[#003fb1]"
                  >
                    <option value="hypertension">Hypertension & Cœur</option>
                    <option value="diabete">Diabète & Alimentation</option>
                    <option value="aines">Santé des Aînés</option>
                    <option value="nutrition">Nutrition & Saveurs</option>
                    <option value="saisonnier">Prévention Saisonnière</option>
                    <option value="quotidien">Bien-être Quotidien</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[13px] font-semibold text-[#121c28] mb-1">
                    Temps de lecture estimé
                  </label>
                  <input
                    type="text"
                    value={readTime}
                    onChange={(e) => setReadTime(e.target.value)}
                    placeholder="Ex: 4 min"
                    className="w-full h-11 px-3 rounded-xl border border-[#c3c5d7] text-[13.5px] bg-white focus:outline-none focus:ring-2 focus:ring-[#003fb1]"
                  />
                </div>

                <div>
                  <label className="block text-[13px] font-semibold text-[#121c28] mb-1">
                    Statut de publication
                  </label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value as 'published' | 'draft')}
                    className="w-full h-11 px-3 rounded-xl border border-[#c3c5d7] text-[13.5px] bg-white focus:outline-none focus:ring-2 focus:ring-[#003fb1]"
                  >
                    <option value="published">Publié (immédiatement visible)</option>
                    <option value="draft">Brouillon (non affiché sur le blog)</option>
                  </select>
                </div>

                <div className="flex items-center gap-2 pt-1">
                  <input
                    type="checkbox"
                    id="rec-check"
                    checked={recommended}
                    onChange={(e) => setRecommended(e.target.checked)}
                    className="w-4 h-4 rounded text-[#003fb1] focus:ring-[#003fb1]"
                  />
                  <label htmlFor="rec-check" className="text-[13px] text-[#121c28] cursor-pointer">
                    Mettre à la Une (Recommandé par Epiqure)
                  </label>
                </div>
              </div>
            </div>

            {/* Section 2 : Image d'illustration et Auteur Référent */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 pt-4 border-t border-[#e5eeff]">
              {/* Image */}
              <div className="md:col-span-6 flex flex-col gap-3">
                <label className="block text-[13.5px] font-semibold text-[#121c28]">
                  Image de couverture (URL ou préréglage)
                </label>
                <div className="flex gap-2">
                  <input
                    type="url"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    placeholder="https://..."
                    className="w-full h-11 px-3 rounded-xl border border-[#c3c5d7] text-[13px] bg-[#f8f9ff] focus:outline-none focus:ring-2 focus:ring-[#003fb1]"
                  />
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-[12px] text-[#737686]">Préréglages HD :</span>
                  {PRESET_IMAGES.map((preset, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setImageUrl(preset.url)}
                      className={`text-[11px] px-2.5 py-1 rounded-md border transition-all cursor-pointer ${
                        imageUrl === preset.url
                          ? 'bg-[#003fb1] text-white border-[#003fb1]'
                          : 'bg-white text-[#434654] border-[#c3c5d7] hover:bg-[#f8f9ff]'
                      }`}
                    >
                      {preset.label}
                    </button>
                  ))}
                </div>
                {imageUrl && (
                  <div className="w-full h-36 rounded-xl overflow-hidden bg-[#e5eeff] border border-[#e5eeff]">
                    <img
                      src={imageUrl}
                      alt="Aperçu"
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
              </div>

              {/* Auteur Référent chargé depuis redacteurs */}
              <div className="md:col-span-6 flex flex-col gap-4">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="block text-[13.5px] font-semibold text-[#121c28]">
                      Praticien ou Rédacteur Référent
                    </label>
                    <button
                      type="button"
                      onClick={handleOpenAddRedacteur}
                      className="text-[12px] text-[#003fb1] hover:underline font-semibold flex items-center gap-1 cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-[14px]">person_add</span>
                      <span>+ Ajouter un rédacteur</span>
                    </button>
                  </div>

                  {redacteurs.length === 0 ? (
                    <div className="p-3 bg-[#fff4e5] border border-[#ffdcc2] rounded-xl text-[13px] text-[#833800] flex items-center justify-between">
                      <span>Aucun rédacteur enregistré.</span>
                      <button
                        type="button"
                        onClick={handleOpenAddRedacteur}
                        className="font-bold underline"
                      >
                        En ajouter un
                      </button>
                    </div>
                  ) : (
                    <select
                      value={authorName}
                      onChange={(e) => {
                        const selected = redacteurs.find((r) => r.name === e.target.value);
                        if (selected) {
                          setAuthorName(selected.name);
                          setAuthorRole(selected.role);
                        } else {
                          setAuthorName(e.target.value);
                        }
                      }}
                      className="w-full h-11 px-3 rounded-xl border border-[#c3c5d7] text-[13.5px] bg-[#f8f9ff] focus:outline-none focus:ring-2 focus:ring-[#003fb1]"
                    >
                      {redacteurs.map((r) => (
                        <option key={r.id} value={r.name}>
                          {r.name} — {r.role} {r.speciality ? `(${r.speciality})` : ''}
                        </option>
                      ))}
                    </select>
                  )}
                </div>

                <div className="p-4 rounded-2xl bg-[#eef4ff] border border-[#dfe9fa] flex flex-col gap-2.5">
                  <span className="text-[12px] font-bold text-[#003fb1] uppercase tracking-wider">
                    Repère de Constante Médicale (Optionnel)
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <input
                      type="text"
                      value={vitalLabel}
                      onChange={(e) => setVitalLabel(e.target.value)}
                      placeholder="Ex: < 130/80 mmHg"
                      className="h-10 px-3 rounded-lg border border-[#dfe9fa] bg-white text-[13px]"
                    />
                    <input
                      type="text"
                      value={vitalSublabel}
                      onChange={(e) => setVitalSublabel(e.target.value)}
                      placeholder="Ex: Cible tensionnelle au repos"
                      className="h-10 px-3 rounded-lg border border-[#dfe9fa] bg-white text-[13px]"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Section 3 : Contenu Médical & Conseils d'action */}
            <div className="flex flex-col gap-5 pt-4 border-t border-[#e5eeff]">
              <div>
                <label className="block text-[13.5px] font-semibold text-[#121c28] mb-1.5">
                  Introduction médicale
                </label>
                <textarea
                  rows={3}
                  value={introduction}
                  onChange={(e) => setIntroduction(e.target.value)}
                  placeholder="Posez le décor : pourquoi ce thème est crucial pour la santé..."
                  className="w-full p-3.5 rounded-xl border border-[#c3c5d7] text-[14px] bg-[#f8f9ff]"
                />
              </div>

              {/* Key Points */}
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <label className="text-[14px] font-bold text-[#121c28]">
                    Recommandations & Points clés ({keyPoints.length})
                  </label>
                  <button
                    type="button"
                    onClick={handleAddKeyPoint}
                    className="h-8 px-3 rounded-lg bg-[#e5eeff] text-[#003fb1] hover:bg-[#d4dcff] text-[12.5px] font-semibold flex items-center gap-1 cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[16px]">add</span>
                    <span>Ajouter un conseil</span>
                  </button>
                </div>

                {keyPoints.map((kp, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-2xl bg-[#f8f9ff] border border-[#e5eeff] flex flex-col gap-3 relative"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[12px] font-bold text-[#003fb1] uppercase tracking-wider">
                        Point clé #{idx + 1}
                      </span>
                      {keyPoints.length > 1 && (
                        <button
                          type="button"
                          onClick={() => handleRemoveKeyPoint(idx)}
                          className="text-[#ba1a1a] hover:text-[#93000a] text-[12px] flex items-center gap-0.5 cursor-pointer"
                        >
                          <span className="material-symbols-outlined text-[16px]">delete</span>
                          <span>Supprimer</span>
                        </button>
                      )}
                    </div>

                    <input
                      type="text"
                      value={kp.title}
                      onChange={(e) => handleKeyPointChange(idx, 'title', e.target.value)}
                      placeholder="Titre du point clé (ex: 1. Privilégier les épices au sel blanc)"
                      className="w-full h-10 px-3 rounded-lg border border-[#c3c5d7] text-[13.5px] font-semibold bg-white"
                    />

                    <textarea
                      rows={2}
                      value={kp.text}
                      onChange={(e) => handleKeyPointChange(idx, 'text', e.target.value)}
                      placeholder="Explication détaillée du geste médical..."
                      className="w-full p-3 rounded-lg border border-[#c3c5d7] text-[13px] bg-white"
                    />

                    <input
                      type="text"
                      value={kp.actionTip || ''}
                      onChange={(e) => handleKeyPointChange(idx, 'actionTip', e.target.value)}
                      placeholder="Astuce pratique (ex: Règle d'or : ne salez jamais avant de goûter)"
                      className="w-full h-9 px-3 rounded-lg border border-[#82f5c1] text-[13px] text-[#004b33] bg-[#82f5c1]/15"
                    />
                  </div>
                ))}
              </div>

              {/* Local culinary & Scientific Fact */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[13px] font-semibold text-[#006c4a] mb-1">
                    L'astuce culinaire locale Epiqure (Optionnel)
                  </label>
                  <textarea
                    rows={3}
                    value={localAdvice}
                    onChange={(e) => setLocalAdvice(e.target.value)}
                    placeholder="Astuce liée à l'attiéké, aux sauces feuilles, aux herbes du terroir..."
                    className="w-full p-3 rounded-xl border border-[#82f5c1] text-[13.5px] bg-[#82f5c1]/10"
                  />
                </div>

                <div>
                  <label className="block text-[13px] font-semibold text-[#003fb1] mb-1">
                    Fait scientifique ou chiffre OMS (Optionnel)
                  </label>
                  <textarea
                    rows={3}
                    value={scientificFact}
                    onChange={(e) => setScientificFact(e.target.value)}
                    placeholder="Ex: Selon l'OMS, réduire l'apport en sel évite 1,7 million de décès par an..."
                    className="w-full p-3 rounded-xl border border-[#dfe9fa] text-[13.5px] bg-[#eef4ff]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[13.5px] font-semibold text-[#121c28] mb-1.5">
                  Conclusion & Message de bienveillance
                </label>
                <textarea
                  rows={2}
                  value={conclusion}
                  onChange={(e) => setConclusion(e.target.value)}
                  placeholder="Phrase de conclusion chaleureuse pour inciter au dialogue familial..."
                  className="w-full p-3.5 rounded-xl border border-[#c3c5d7] text-[14px] bg-[#f8f9ff]"
                />
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-[#e5eeff]">
              <button
                type="button"
                onClick={() => setActiveTab('list')}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl border border-[#c3c5d7] text-[#434654] hover:bg-[#f8f9ff] text-[14px] cursor-pointer"
              >
                Retour à la liste des articles
              </button>

              <div className="flex items-center gap-3 w-full sm:w-auto">
                <button
                  type="submit"
                  onClick={() => setStatus('draft')}
                  className="flex-1 sm:flex-none px-5 py-2.5 rounded-xl border border-[#003fb1] text-[#003fb1] hover:bg-[#eef4ff] text-[14px] font-medium transition-colors cursor-pointer"
                >
                  Sauvegarder en brouillon
                </button>

                <button
                  type="submit"
                  onClick={() => setStatus('published')}
                  className="flex-1 sm:flex-none px-6 py-2.5 rounded-xl bg-[#003fb1] text-white hover:bg-[#1a56db] text-[14px] font-semibold flex items-center justify-center gap-2 shadow-xs transition-all cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[18px]">publish</span>
                  <span>Publier sur Epiqure</span>
                </button>
              </div>
            </div>
          </form>
        )}

        {/* ========================================================================= */}
        {/* TAB 3 : GESTION DES RÉDACTEURS & SOIGNANTS */}
        {/* ========================================================================= */}
        {activeTab === 'redacteurs' && (
          <div className="flex flex-col gap-6">
            {/* Header section with add button */}
            <div className="bg-white p-6 rounded-2xl border border-[#e5eeff] shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="font-heading font-bold text-[20px] text-[#121c28]">
                  Équipe Rédactionnelle & Praticiens Médicaux
                </h2>
                <p className="text-[13.5px] text-[#434654] mt-0.5">
                  Gérez les médecins, soignants et experts qui signent les articles sur le blog Epiqure.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleOpenAddRedacteur}
                  className="h-11 px-5 rounded-xl bg-[#003fb1] hover:bg-[#1a56db] text-white text-[13.5px] font-semibold flex items-center gap-2 shadow-xs transition-all cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[20px]">person_add</span>
                  <span>Ajouter un rédacteur</span>
                </button>
              </div>
            </div>

            {/* List of Redacteurs */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {redacteurs.map((redacteur) => (
                <div
                  key={redacteur.id}
                  className="bg-white rounded-2xl border border-[#e5eeff] shadow-xs p-6 flex flex-col justify-between hover:shadow-md hover:border-[#b5c4ff] transition-all"
                >
                  <div className="flex flex-col gap-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        {redacteur.avatarUrl ? (
                          <img
                            src={redacteur.avatarUrl}
                            alt={redacteur.name}
                            className="w-14 h-14 rounded-full object-cover border-2 border-[#003fb1]/20"
                          />
                        ) : (
                          <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#003fb1] to-[#1a56db] text-white font-heading font-bold text-[18px] flex items-center justify-center shadow-xs">
                            {redacteur.initials || redacteur.name.slice(0, 2).toUpperCase()}
                          </div>
                        )}
                        <div>
                          <h3 className="font-heading font-semibold text-[17px] text-[#121c28]">
                            {redacteur.name}
                          </h3>
                          <span className="text-[12.5px] font-medium text-[#003fb1] block">
                            {redacteur.role}
                          </span>
                        </div>
                      </div>
                    </div>

                    {redacteur.speciality && (
                      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#eef4ff] text-[#003fb1] text-[12px] font-medium w-fit">
                        <span className="material-symbols-outlined text-[15px]">medical_information</span>
                        <span>{redacteur.speciality}</span>
                      </div>
                    )}

                    {redacteur.email && (
                      <div className="flex items-center gap-1.5 text-[12.5px] text-[#737686]">
                        <span className="material-symbols-outlined text-[16px]">mail</span>
                        <span>{redacteur.email}</span>
                      </div>
                    )}

                    {redacteur.bio && (
                      <p className="text-[13px] text-[#434654] leading-relaxed line-clamp-3">
                        {redacteur.bio}
                      </p>
                    )}
                  </div>

                  <div className="pt-4 mt-4 border-t border-[#e5eeff] flex items-center justify-between">
                    <span className="text-[11px] text-[#737686]">
                      {redacteur.dateAdded ? `Ajouté le ${redacteur.dateAdded}` : 'Rédacteur officiel'}
                    </span>

                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => handleOpenEditRedacteur(redacteur)}
                        className="p-1.5 rounded-lg text-[#003fb1] hover:bg-[#e5eeff] transition-colors cursor-pointer"
                        title="Modifier"
                      >
                        <span className="material-symbols-outlined text-[18px]">edit</span>
                      </button>
                      <button
                        onClick={() => handleDeleteRedacteur(redacteur.id, redacteur.name)}
                        className="p-1.5 rounded-lg text-[#ba1a1a] hover:bg-[#ffdad6] transition-colors cursor-pointer"
                        title="Retirer ce rédacteur"
                      >
                        <span className="material-symbols-outlined text-[18px]">delete</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* ========================================================================= */}
      {/* MODAL AJOUT / MODIFICATION D'UN RÉDACTEUR */}
      {/* ========================================================================= */}
      {isRedacteurModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
          <div className="relative w-full max-w-lg my-8 bg-white rounded-2xl shadow-2xl overflow-hidden border border-[#e5eeff] animate-in fade-in zoom-in-95 duration-200">
            {/* Header */}
            <div className="bg-gradient-to-r from-[#003fb1] to-[#121c28] text-white p-5 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-xl bg-white/15 flex items-center justify-center">
                  <span className="material-symbols-outlined text-[22px]">person_add</span>
                </div>
                <div>
                  <h3 className="font-heading font-semibold text-[18px]">
                    {editingRedacteurId ? 'Modifier le rédacteur' : 'Ajouter un nouveau rédacteur'}
                  </h3>
                  <p className="text-[12px] text-[#dbe1ff]">
                    Praticien ou spécialiste intervenant sur Epiqure
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsRedacteurModalOpen(false)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors cursor-pointer"
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSaveRedacteur} className="p-6 flex flex-col gap-4">
              <div>
                <label className="block text-[13px] font-semibold text-[#121c28] mb-1">
                  Nom complet & Civilité <span className="text-[#ba1a1a]">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={redacteurName}
                  onChange={(e) => setRedacteurName(e.target.value)}
                  placeholder="Ex: Dr. Aminata Diallo ou Inf. Diop"
                  className="w-full h-11 px-3 rounded-xl border border-[#c3c5d7] text-[14px] focus:outline-none focus:ring-2 focus:ring-[#003fb1] bg-[#f8f9ff]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[13px] font-semibold text-[#121c28] mb-1">
                    Titre ou Fonction <span className="text-[#ba1a1a]">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={redacteurRole}
                    onChange={(e) => setRedacteurRole(e.target.value)}
                    placeholder="Ex: Médecin Généraliste & Diabétologue"
                    className="w-full h-11 px-3 rounded-xl border border-[#c3c5d7] text-[13.5px] focus:outline-none focus:ring-2 focus:ring-[#003fb1] bg-[#f8f9ff]"
                  />
                </div>

                <div>
                  <label className="block text-[13px] font-semibold text-[#121c28] mb-1">
                    Spécialité médicale
                  </label>
                  <input
                    type="text"
                    value={redacteurSpeciality}
                    onChange={(e) => setRedacteurSpeciality(e.target.value)}
                    placeholder="Ex: Cardiologie, Nutrition, Gériatrie..."
                    className="w-full h-11 px-3 rounded-xl border border-[#c3c5d7] text-[13.5px] focus:outline-none focus:ring-2 focus:ring-[#003fb1] bg-[#f8f9ff]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[13px] font-semibold text-[#121c28] mb-1">
                  Adresse e-mail professionnelle (Optionnel)
                </label>
                <input
                  type="email"
                  value={redacteurEmail}
                  onChange={(e) => setRedacteurEmail(e.target.value)}
                  placeholder="Ex: a.diallo@epiqure.org"
                  className="w-full h-11 px-3 rounded-xl border border-[#c3c5d7] text-[13.5px] focus:outline-none focus:ring-2 focus:ring-[#003fb1] bg-[#f8f9ff]"
                />
              </div>

              <div>
                <label className="block text-[13px] font-semibold text-[#121c28] mb-1">
                  Photo de profil / Avatar (URL)
                </label>
                <input
                  type="url"
                  value={redacteurAvatar}
                  onChange={(e) => setRedacteurAvatar(e.target.value)}
                  placeholder="https://... (ou laissez vide pour initiales automatiques)"
                  className="w-full h-11 px-3 rounded-xl border border-[#c3c5d7] text-[13px] focus:outline-none focus:ring-2 focus:ring-[#003fb1] bg-[#f8f9ff]"
                />
                <div className="flex flex-wrap items-center gap-2 mt-2">
                  <span className="text-[11px] text-[#737686]">Suggestions de portraits :</span>
                  {PRESET_AVATARS.map((p, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setRedacteurAvatar(p.url)}
                      className={`text-[11px] px-2 py-0.5 rounded border transition-colors cursor-pointer ${
                        redacteurAvatar === p.url
                          ? 'bg-[#003fb1] text-white border-[#003fb1]'
                          : 'bg-white text-[#434654] border-[#c3c5d7]'
                      }`}
                    >
                      {p.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-[13px] font-semibold text-[#121c28] mb-1">
                  Biographie succincte / Engagement médical
                </label>
                <textarea
                  rows={3}
                  value={redacteurBio}
                  onChange={(e) => setRedacteurBio(e.target.value)}
                  placeholder="Ex: Praticienne hospitalière engagée dans la sensibilisation à la santé cardiovasculaire et à la cuisine saine..."
                  className="w-full p-3 rounded-xl border border-[#c3c5d7] text-[13px] focus:outline-none focus:ring-2 focus:ring-[#003fb1] bg-[#f8f9ff]"
                />
              </div>

              <div className="pt-3 flex items-center justify-end gap-3 border-t border-[#e5eeff]">
                <button
                  type="button"
                  onClick={() => setIsRedacteurModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl border border-[#c3c5d7] text-[#434654] hover:bg-[#f8f9ff] text-[13.5px] font-medium cursor-pointer"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-[#003fb1] hover:bg-[#1a56db] text-white text-[13.5px] font-semibold flex items-center gap-2 shadow-xs transition-all cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[18px]">save</span>
                  <span>{editingRedacteurId ? 'Enregistrer' : 'Ajouter le rédacteur'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
