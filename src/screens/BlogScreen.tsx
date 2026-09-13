import React, { useState, useMemo } from 'react';
import { Article, ArticleCategory } from '../types.ts';
import { ContactForm } from '../components/ContactForm.tsx';
import { getInitialArticles } from '../data/articleStorage.ts';

interface BlogScreenProps {
  initialCategory?: string;
  articles?: Article[];
  onSelectArticle: (article: Article) => void;
  onOpenWhatsApp: () => void;
  onNavigateToSimulator: () => void;
  searchRef?: React.RefObject<HTMLInputElement | null>;
}

export const BlogScreen: React.FC<BlogScreenProps> = ({
  initialCategory = 'all',
  articles,
  onSelectArticle,
  onOpenWhatsApp,
  onNavigateToSimulator,
  searchRef,
}) => {
  const [activeCategory, setActiveCategory] = useState<string>(initialCategory);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [newsletterContact, setNewsletterContact] = useState<string>('');
  const [newsletterConsent, setNewsletterConsent] = useState<boolean>(true);
  const [newsletterSuccess, setNewsletterSuccess] = useState<boolean>(false);

  const categories = [
    { id: 'all', label: 'Tous les conseils', icon: 'auto_stories' },
    { id: 'hypertension', label: 'Hypertension & Cœur', icon: 'favorite', iconColor: 'text-[#ba1a1a]' },
    { id: 'diabete', label: 'Diabète & Alimentation', icon: 'nutrition', iconColor: 'text-[#006c4a]' },
    { id: 'aines', label: 'Santé des Aînés', icon: 'elderly', iconColor: 'text-[#003fb1]' },
    { id: 'nutrition', label: 'Nutrition & Saveurs', icon: 'restaurant', iconColor: 'text-[#ff7900]' },
    { id: 'saisonnier', label: 'Prévention Saisonnière', icon: 'rainy', iconColor: 'text-[#006c4a]' },
    { id: 'quotidien', label: 'Bien-être au Quotidien', icon: 'self_improvement', iconColor: 'text-[#3d4b5b]' },
  ];

  const allArticlesList = useMemo(() => {
    return articles !== undefined ? articles : getInitialArticles();
  }, [articles]);

  const publishedArticles = useMemo(() => {
    return allArticlesList.filter((a) => a.status !== 'draft');
  }, [allArticlesList]);

  const featuredArticle = useMemo(() => {
    const rec = publishedArticles.find((a) => a.recommended);
    return rec || publishedArticles[0] || null;
  }, [publishedArticles]);

  const otherArticles = useMemo(() => {
    if (!featuredArticle) return [];
    return publishedArticles.filter((a) => a.id !== featuredArticle.id);
  }, [publishedArticles, featuredArticle]);

  const filteredArticles = useMemo(() => {
    return otherArticles.filter((article) => {
      const matchesCategory =
        activeCategory === 'all' || article.category === activeCategory;
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !query ||
        article.title.toLowerCase().includes(query) ||
        article.summary.toLowerCase().includes(query) ||
        article.categoryLabel.toLowerCase().includes(query);

      return matchesCategory && matchesSearch;
    });
  }, [otherArticles, activeCategory, searchQuery]);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterContact.trim()) {
      setNewsletterSuccess(true);
      setTimeout(() => {
        setNewsletterSuccess(false);
        setNewsletterContact('');
      }, 4000);
    }
  };

  const handleShareArticle = (article: Article, e: React.MouseEvent) => {
    e.stopPropagation();
    const text = `Epiqure : "${article.title}" - Découvrez les conseils de santé de nos soignants.`;
    const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="flex flex-col w-full">
      {/* SECTION HEADER & FILTRES */}
      <section className="relative w-full bg-gradient-to-b from-[#eef4ff] via-[#f8f9ff] to-[#f8f9ff] pb-10 pt-6">
        <div className="max-w-[1200px] mx-auto px-4 md:px-8 lg:px-12 flex flex-col gap-6">
          {/* Overline */}
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#82f5c1] text-[#00714e] text-[12px] uppercase tracking-wider font-semibold">
              <span className="material-symbols-outlined text-[14px]">local_hospital</span>
              Epiqure • Le Blog Santé
            </span>
            <span className="text-[#c3c5d7] text-[12px]">/</span>
            <span className="text-[12px] text-[#434654]">Conseils & Prévention Médicale</span>
          </div>

          {/* Main Titles */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div className="max-w-2xl flex flex-col gap-2">
              <h1 className="font-heading font-bold text-[28px] md:text-[38px] text-[#003fb1] tracking-tight leading-tight">
                Conseils Médicaux, Nutrition & Santé Préventive
              </h1>
              <p className="text-[16px] md:text-[18px] text-[#434654] leading-relaxed">
                Des recommandations pratiques rédigées par des soignants et médecins pour protéger
                votre cœur, stabiliser votre glycémie et accompagner sereinement vos aînés au quotidien.
              </p>
            </div>

            {/* Micro Stats Pill (Trust Marker) */}
            <div className="flex items-center gap-4 bg-white p-4 rounded-2xl shadow-xs self-start lg:self-auto shrink-0 border border-[#e5eeff]">
              <div className="w-12 h-12 rounded-xl bg-[#dbe1ff] flex items-center justify-center text-[#003fb1]">
                <span className="material-symbols-outlined text-[26px]">medical_services</span>
              </div>
              <div className="flex flex-col">
                <span className="font-heading font-bold text-[22px] text-[#003fb1] leading-tight">
                  100% Validé
                </span>
                <span className="text-[12px] text-[#434654]">Par notre comité médical</span>
              </div>
            </div>
          </div>

          {/* Barre de recherche & Filtres */}
          <div className="flex flex-col gap-3 pt-2">
            <div className="relative w-full">
              <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-[#003fb1] text-[22px]">
                search
              </span>
              <input
                ref={searchRef as any}
                id="article-search"
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Rechercher un conseil : tension, diabète, sel, hydratation des aînés, sommeil..."
                className="w-full h-14 pl-12 pr-28 bg-white text-[#121c28] placeholder:text-[#737686] rounded-xl shadow-xs border border-[#dfe9fa] focus:outline-none focus:ring-2 focus:ring-[#003fb1] text-[15px]"
              />
              {searchQuery ? (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 h-9 px-3 rounded-lg text-[#737686] hover:text-[#121c28] text-[13px] font-medium"
                >
                  Effacer
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => document.getElementById('article-search')?.focus()}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 h-10 px-4 rounded-lg bg-[#003fb1] text-white text-[14px] font-medium hover:bg-[#1a56db] transition-colors flex items-center gap-1.5 shadow-xs"
                >
                  <span className="material-symbols-outlined text-[16px]">tune</span>
                  <span className="hidden sm:inline">Chercher</span>
                </button>
              )}
            </div>

            {/* Filtres thématiques interactifs */}
            <div className="flex items-center gap-2 overflow-x-auto py-1 no-scrollbar" id="categories-container">
              {categories.map((cat) => {
                const isActive = activeCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    type="button"
                    className={`category-chip shrink-0 px-4 py-2 rounded-xl text-[13.5px] font-medium transition-all flex items-center gap-1.5 ${
                      isActive
                        ? 'bg-[#003fb1] text-white shadow-xs font-semibold'
                        : 'bg-white text-[#434654] hover:text-[#003fb1] hover:bg-[#e5eeff] border border-[#e5eeff]'
                    }`}
                  >
                    <span
                      className={`material-symbols-outlined text-[16px] ${
                        isActive ? 'text-white' : cat.iconColor || 'text-[#434654]'
                      }`}
                    >
                      {cat.icon}
                    </span>
                    <span>{cat.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ARTICLE À LA UNE (FEATURED HERO CARD) */}
      {featuredArticle ? (
        <section className="w-full py-2">
          <div className="max-w-[1200px] mx-auto px-4 md:px-8 lg:px-12">
            <div className="relative bg-white rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.06)] border border-[#e5eeff] overflow-hidden grid grid-cols-1 lg:grid-cols-12 gap-0 group">
              {/* Image de couverture */}
              <div className="lg:col-span-7 relative h-72 lg:h-[480px] overflow-hidden bg-[#e5eeff]">
                <img
                  src={featuredArticle.imageUrl}
                  alt={featuredArticle.imageAlt}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent lg:hidden"></div>

                {/* Badges flottants */}
                <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                  <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#ba1a1a] text-white text-[12px] shadow-md uppercase tracking-wider font-semibold">
                    <span className="material-symbols-outlined text-[15px]">verified</span>
                    Recommandé par Epiqure
                  </span>
                  <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-md text-[#121c28] text-[12px] shadow-xs">
                    <span className="material-symbols-outlined text-[14px] text-[#003fb1]">alarm</span>
                    Lecture {featuredArticle.readTime}
                  </span>
                </div>

                {/* Micro Dataviz: Constante ou impact santé */}
                {featuredArticle.idealVital && (
                  <div className="absolute bottom-4 left-4 right-4 lg:bottom-6 lg:left-6 lg:right-auto bg-white/95 backdrop-blur-md p-3.5 rounded-xl shadow-md border border-[#e5eeff] flex items-center gap-4 max-w-sm">
                    <div className="w-10 h-10 rounded-lg bg-[#ffdad6] text-[#ba1a1a] flex items-center justify-center shrink-0">
                      <span className="material-symbols-outlined text-[22px]">health_and_safety</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[14px] text-[#121c28] font-semibold">
                        {featuredArticle.idealVital.label}
                      </span>
                      <span className="text-[12px] text-[#434654]">
                        {featuredArticle.idealVital.sublabel}
                      </span>
                    </div>
                  </div>
                )}
              </div>

              {/* Contenu rédactionnel */}
              <div className="lg:col-span-5 p-6 lg:p-8 flex flex-col justify-between bg-white">
                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-2">
                    <span className={`px-2.5 py-1 rounded text-[12px] font-semibold ${featuredArticle.categoryBadgeClass}`}>
                      {featuredArticle.categoryLabel}
                    </span>
                    <span className="text-[12px] text-[#434654]">• Dossier Spécial</span>
                  </div>
                  <h2
                    onClick={() => onSelectArticle(featuredArticle)}
                    className="font-heading font-semibold text-[22px] lg:text-[26px] text-[#121c28] group-hover:text-[#003fb1] transition-colors leading-tight cursor-pointer"
                  >
                    {featuredArticle.title}
                  </h2>
                  <p className="text-[15px] text-[#434654] line-clamp-4 leading-relaxed">
                    {featuredArticle.summary}
                  </p>
                </div>

                {/* Auteur + Bouton CTA */}
                <div className="pt-6 mt-4 flex flex-col gap-4 border-t border-[#e5eeff]">
                  <div className="flex items-center gap-3.5">
                    {featuredArticle.author.avatarUrl ? (
                      <img
                        src={featuredArticle.author.avatarUrl}
                        alt={featuredArticle.author.name}
                        className="w-12 h-12 rounded-full object-cover shadow-xs ring-2 ring-[#003fb1]/20"
                      />
                    ) : (
                      <div className="w-12 h-12 rounded-full bg-[#003fb1] text-white flex items-center justify-center font-bold text-[14px]">
                        {featuredArticle.author.initials || featuredArticle.author.name.substring(0, 2).toUpperCase()}
                      </div>
                    )}
                    <div className="flex flex-col">
                      <span className="text-[14px] text-[#121c28] font-semibold">
                        {featuredArticle.author.name}
                      </span>
                      <span className="text-[12px] text-[#434654]">
                        {featuredArticle.author.role}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <button
                      onClick={() => onSelectArticle(featuredArticle)}
                      className="inline-flex items-center gap-2 h-11 px-6 rounded-xl bg-[#003fb1] text-white text-[14px] font-medium hover:bg-[#1a56db] transition-all shadow-xs group/btn cursor-pointer"
                    >
                      <span>Lire le guide complet</span>
                      <span className="material-symbols-outlined text-[18px] transition-transform group-hover/btn:translate-x-1">
                        arrow_forward
                      </span>
                    </button>

                    <button
                      type="button"
                      onClick={(e) => handleShareArticle(featuredArticle, e)}
                      className="w-11 h-11 rounded-xl bg-[#eef4ff] hover:bg-[#82f5c1]/40 hover:text-[#00714e] text-[#006c4a] flex items-center justify-center transition-colors cursor-pointer"
                      title="Partager à ma famille sur WhatsApp"
                      aria-label="Partager sur WhatsApp"
                    >
                      <span className="material-symbols-outlined text-[20px]">share</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      ) : (
        <section className="w-full py-12">
          <div className="max-w-[1200px] mx-auto px-4 md:px-8 lg:px-12">
            <div className="bg-white rounded-3xl p-10 md:p-14 text-center border border-[#e5eeff] shadow-xs flex flex-col items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-[#e5eeff] text-[#003fb1] flex items-center justify-center">
                <span className="material-symbols-outlined text-[32px]">menu_book</span>
              </div>
              <h2 className="font-heading font-bold text-[22px] text-[#121c28]">
                Bienvenue sur Epiqure
              </h2>
              <p className="text-[15px] text-[#434654] max-w-lg leading-relaxed">
                Aucun article de santé n’est encore publié sur le blog. Rendez-vous dans l’espace rédaction (accessible via « Connexion ») pour ajouter vos praticiens rédacteurs et publier vos premiers conseils médicaux.
              </p>
            </div>
          </div>
        </section>
      )}

      {/* SECTION ARTICLES RÉCENTS (GRILLE 3 COLONNES) */}
      {featuredArticle && otherArticles.length > 0 && (
      <section className="w-full py-12">
        <div className="max-w-[1200px] mx-auto px-4 md:px-8 lg:px-12 flex flex-col gap-8">
          {/* Titre de section */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
            <div>
              <span className="text-[12px] text-[#006c4a] font-semibold uppercase tracking-wider">
                Conseils Rédactionnels
              </span>
              <h2 className="font-heading font-semibold text-[24px] md:text-[28px] text-[#121c28] tracking-tight">
                Derniers articles publiés sur Epiqure
              </h2>
            </div>
            <div className="flex items-center gap-2 text-[#434654] text-[14px]">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#006c4a]"></span>
                {filteredArticles.length} conseil{filteredArticles.length > 1 ? 's' : ''} disponible{filteredArticles.length > 1 ? 's' : ''}
              </span>
            </div>
          </div>

          {/* Grille des articles */}
          {filteredArticles.length === 0 ? (
            <div className="p-12 text-center bg-white rounded-2xl border border-[#e5eeff]">
              <span className="material-symbols-outlined text-[48px] text-[#737686]">search_off</span>
              <h3 className="font-heading font-semibold text-[18px] text-[#121c28] mt-2">
                Aucun conseil ne correspond à votre recherche
              </h3>
              <p className="text-[14px] text-[#434654] mt-1">
                Essayez un autre mot-clé ou réinitialisez le filtre de catégorie.
              </p>
              <button
                onClick={() => {
                  setActiveCategory('all');
                  setSearchQuery('');
                }}
                className="mt-4 px-5 py-2.5 rounded-xl bg-[#003fb1] text-white text-[13px] font-medium"
              >
                Voir tous les conseils
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" id="articles-grid">
              {filteredArticles.map((art) => (
                <article
                  key={art.id}
                  onClick={() => onSelectArticle(art)}
                  className="flex flex-col bg-white rounded-2xl overflow-hidden shadow-[0_2px_12px_rgba(0,0,0,0.04)] border border-[#e5eeff] hover:shadow-md hover:border-[#b5c4ff] transition-all duration-300 group cursor-pointer"
                >
                  <div className="relative h-48 w-full overflow-hidden bg-[#e5eeff]">
                    <img
                      src={art.imageUrl}
                      alt={art.imageAlt}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <span
                      className={`absolute top-3 left-3 px-2.5 py-1 rounded-md text-[11px] font-medium shadow-xs ${art.categoryBadgeClass}`}
                    >
                      {art.categoryLabel}
                    </span>
                    <span className="absolute bottom-3 right-3 px-2 py-0.5 rounded bg-black/60 backdrop-blur-sm text-white text-[11px]">
                      {art.readTime}
                    </span>
                  </div>

                  <div className="p-5 flex flex-col flex-grow justify-between gap-4">
                    <div className="flex flex-col gap-2">
                      <h3 className="font-heading font-semibold text-[18px] leading-snug text-[#121c28] group-hover:text-[#003fb1] transition-colors line-clamp-2">
                        {art.title}
                      </h3>
                      <p className="text-[14px] text-[#434654] line-clamp-3 leading-relaxed">
                        {art.summary}
                      </p>
                    </div>

                    <div className="pt-3 flex items-center justify-between border-t border-[#f8f9ff]">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-[#dfe9fa] flex items-center justify-center text-[#003fb1] font-bold text-[11px]">
                          {art.author.initials || 'EP'}
                        </div>
                        <span className="text-[13px] font-medium text-[#121c28]">
                          {art.author.name}
                        </span>
                      </div>

                      <span className="inline-flex items-center gap-1 text-[13px] font-semibold text-[#003fb1] group-hover:underline">
                        <span>Lire</span>
                        <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                      </span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
      )}

      {/* ENCADRÉ INTERACTIF : SIMULATEUR & QUESTION AUX MÉDECINS */}
      <section className="w-full py-6">
        <div className="max-w-[1200px] mx-auto px-4 md:px-8 lg:px-12">
          <div className="relative rounded-3xl bg-gradient-to-br from-[#003fb1] to-[#1a56db] text-white overflow-hidden shadow-xl p-7 md:p-10">
            <div className="absolute -right-16 -bottom-16 w-80 h-80 rounded-full bg-white/10 blur-3xl pointer-events-none"></div>
            <div className="absolute -left-16 -top-16 w-72 h-72 rounded-full bg-[#82f5c1]/15 blur-2xl pointer-events-none"></div>

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-8 flex flex-col gap-3.5">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 backdrop-blur-sm self-start text-white text-[12px] uppercase tracking-wider font-semibold">
                  <span className="material-symbols-outlined text-[16px] text-[#82f5c1]">health_and_safety</span>
                  Espace Conseils Pratiques
                </div>
                <h2 className="font-heading font-bold text-[24px] md:text-[32px] text-white leading-tight">
                  Évaluez vos repères de santé avec notre simulateur de prévention
                </h2>
                <p className="text-[15px] md:text-[17px] text-[#d4dcff] max-w-2xl leading-relaxed">
                  Tension artérielle, consommation de sel, hydratation des aînés : obtenez une analyse
                  immédiate et les fiches conseils adaptées conçues par le Dr. Kouamé.
                </p>

                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <button
                    onClick={onNavigateToSimulator}
                    className="h-12 px-6 rounded-xl bg-white text-[#003fb1] text-[14.5px] font-semibold hover:bg-[#eef4ff] transition-all shadow-sm flex items-center gap-2"
                  >
                    <span className="material-symbols-outlined text-[20px]">tune</span>
                    <span>Tester le simulateur de tension & santé</span>
                  </button>

                  <button
                    onClick={onOpenWhatsApp}
                    className="h-12 px-6 rounded-xl bg-[#006c4a] hover:bg-[#005137] text-white transition-all text-[14.5px] font-medium flex items-center gap-2"
                  >
                    <span className="material-symbols-outlined text-[20px]">chat</span>
                    <span>Poser une question à la rédaction</span>
                  </button>
                </div>
              </div>

              {/* Repères Clés */}
              <div className="lg:col-span-4 flex flex-col gap-3 bg-white/10 backdrop-blur-md p-5 rounded-2xl border border-white/20">
                <span className="text-[13px] font-bold text-[#82f5c1] uppercase tracking-wider">
                  Les 4 Repères d'Epiqure :
                </span>
                <ul className="space-y-2 text-[13.5px] text-white/95">
                  <li className="flex items-start gap-2">
                    <span className="material-symbols-outlined text-[18px] text-[#82f5c1] shrink-0 mt-0.5">check</span>
                    <span>Tension cible : &lt; 14/9 (idéal 12/8)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="material-symbols-outlined text-[18px] text-[#82f5c1] shrink-0 mt-0.5">check</span>
                    <span>Glycémie à jeun : 0.70 - 1.10 g/L</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="material-symbols-outlined text-[18px] text-[#82f5c1] shrink-0 mt-0.5">check</span>
                    <span>Marche quotidienne : 25 à 30 minutes</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="material-symbols-outlined text-[18px] text-[#82f5c1] shrink-0 mt-0.5">check</span>
                    <span>Sel : max 1 cuillère à café par jour</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* BLOC NEWSLETTER PRÉVENTION D'EPIQURE */}
      <section id="newsletter-section" className="w-full py-12">
        <div className="max-w-[1200px] mx-auto px-4 md:px-8 lg:px-12">
          <div className="bg-[#eef4ff] rounded-3xl p-6 md:p-10 flex flex-col lg:flex-row items-center justify-between gap-8 border border-[#dfe9fa]">
            <div className="max-w-xl flex flex-col gap-3">
              <div className="w-12 h-12 rounded-xl bg-[#003fb1] flex items-center justify-center text-white shadow-xs">
                <span className="material-symbols-outlined text-[28px]">mark_email_read</span>
              </div>
              <h2 className="font-heading font-semibold text-[24px] md:text-[30px] text-[#121c28]">
                Recevez les conseils santé d'Epiqure chaque semaine
              </h2>
              <p className="text-[15px] text-[#434654] leading-relaxed">
                Une synthèse bimensuelle claire et pratique : alertes saisonnières, recettes saines
                pour adapter notre cuisine sans excès de sel, et fiches mémo pour préserver vos proches.
              </p>
              <div className="flex flex-wrap items-center gap-4 text-[#006c4a] text-[13px] font-medium pt-1">
                <span className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-[16px]">check_circle</span>
                  100% Gratuit
                </span>
                <span className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-[16px]">check_circle</span>
                  Zéro publicité
                </span>
                <span className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-[16px]">check_circle</span>
                  Rédigé par des soignants
                </span>
              </div>
            </div>

            {/* Formulaire d'inscription rapide */}
            <div className="w-full lg:max-w-md bg-white p-6 rounded-2xl shadow-xs border border-[#e5eeff] flex flex-col gap-3">
              <span className="text-[15px] text-[#121c28] font-semibold">
                Rejoindre plus de 2 400 lecteurs fidèles
              </span>

              {newsletterSuccess ? (
                <div className="p-4 rounded-xl bg-[#82f5c1]/30 text-[#00714e] text-[13px] flex items-center gap-2">
                  <span className="material-symbols-outlined text-[22px]">done_all</span>
                  <span>Merci ! Vous recevrez nos prochains conseils de santé directement.</span>
                </div>
              ) : (
                <form onSubmit={handleNewsletterSubmit} className="flex flex-col gap-3">
                  <div>
                    <label
                      htmlFor="contact-input"
                      className="block text-[12px] font-medium text-[#434654] mb-1"
                    >
                      Numéro WhatsApp (+225) ou Adresse e-mail
                    </label>
                    <div className="relative">
                      <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#737686] text-[20px]">
                        contact_mail
                      </span>
                      <input
                        id="contact-input"
                        type="text"
                        required
                        value={newsletterContact}
                        onChange={(e) => setNewsletterContact(e.target.value)}
                        placeholder="07 XX XX XX XX ou email@domaine.ci"
                        className="w-full h-12 pl-10 pr-3 rounded-xl bg-white text-[#121c28] placeholder:text-[#737686] text-[14px] border border-[#c3c5d7] focus:outline-none focus:ring-2 focus:ring-[#003fb1]"
                      />
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <input
                      id="consent"
                      type="checkbox"
                      checked={newsletterConsent}
                      onChange={(e) => setNewsletterConsent(e.target.checked)}
                      required
                      className="w-4 h-4 rounded text-[#003fb1] focus:ring-[#003fb1]"
                    />
                    <label htmlFor="consent" className="text-[12px] text-[#434654]">
                      J'accepte de recevoir les alertes santé et conseils d'Epiqure.
                    </label>
                  </div>

                  <button
                    type="submit"
                    className="w-full h-12 rounded-xl bg-[#003fb1] text-white font-medium text-[14px] hover:bg-[#1a56db] transition-all flex items-center justify-center gap-2 shadow-xs"
                  >
                    <span className="material-symbols-outlined text-[18px]">send</span>
                    <span>S'inscrire gratuitement</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION CONTACT & QUESTIONS À LA RÉDACTION (FORMSPREE) */}
      <section id="contact-redaction-section" className="w-full pb-12">
        <div className="max-w-[1200px] mx-auto px-4 md:px-8 lg:px-12">
          <ContactForm
            title="Une question médicale ou une suggestion d'article ?"
            subtitle="Nos soignants et médecins rédacteurs vous répondent. Partagez votre question, votre retour d'expérience ou proposez une thématique de santé."
          />
        </div>
      </section>
    </div>
  );
};
