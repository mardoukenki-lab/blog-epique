import React, { useState } from 'react';
import { Article } from '../types.ts';

interface ArticleModalProps {
  article: Article | null;
  onClose: () => void;
  onOpenWhatsApp: () => void;
}

export const ArticleModal: React.FC<ArticleModalProps> = ({
  article,
  onClose,
  onOpenWhatsApp,
}) => {
  const [fontSize, setFontSize] = useState<'normal' | 'large'>('normal');
  const [copied, setCopied] = useState(false);

  if (!article) return null;

  const handleShare = () => {
    const text = `Conseil Santé Epiqure : "${article.title}" - Découvrez les recommandations médicales de nos soignants.`;
    const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-3xl my-8 bg-white rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Top Sticky Bar */}
        <div className="sticky top-0 z-20 flex items-center justify-between px-6 py-3.5 bg-white/95 backdrop-blur-md border-b border-[#e5eeff]">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[12px] font-semibold bg-[#e5eeff] text-[#003fb1]">
              <span className="material-symbols-outlined text-[14px]">local_hospital</span>
              Epiqure Conseil
            </span>
            <span className="text-[12px] text-[#737686] hidden sm:inline">• {article.readTime} de lecture</span>
          </div>

          <div className="flex items-center gap-2">
            {/* Text size toggle for seniors */}
            <button
              onClick={() => setFontSize(fontSize === 'normal' ? 'large' : 'normal')}
              className="px-2.5 py-1 rounded-md border border-[#c3c5d7] text-[12px] font-medium text-[#434654] hover:bg-[#f8f9ff]"
              title="Ajuster la taille de police pour un meilleur confort de lecture"
            >
              {fontSize === 'normal' ? 'A+' : 'A-'}
            </button>
            {/* Share WhatsApp */}
            <button
              onClick={handleShare}
              className="p-1.5 rounded-lg bg-[#82f5c1]/30 text-[#006c4a] hover:bg-[#82f5c1]/50 transition-colors"
              title="Partager sur WhatsApp"
            >
              <span className="material-symbols-outlined text-[18px]">share</span>
            </button>
            {/* Close */}
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-[#f8f9ff] text-[#434654] hover:bg-[#e5eeff] hover:text-[#121c28] flex items-center justify-center transition-colors"
              aria-label="Fermer"
            >
              <span className="material-symbols-outlined text-[20px]">close</span>
            </button>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="max-h-[80vh] overflow-y-auto p-6 md:p-8">
          {/* Header Info */}
          <div className="flex flex-col gap-4 mb-6">
            <div className="flex flex-wrap items-center gap-2">
              <span className={`px-3 py-1 rounded-md text-[12px] font-semibold ${article.categoryBadgeClass}`}>
                {article.categoryLabel}
              </span>
              <span className="text-[13px] text-[#737686]">Publié le {article.date}</span>
            </div>

            <h1 className="font-heading text-[24px] md:text-[30px] font-bold text-[#121c28] leading-tight">
              {article.title}
            </h1>

            {/* Author bar */}
            <div className="flex items-center gap-3 py-3 border-y border-[#e5eeff]">
              {article.author.avatarUrl ? (
                <img
                  src={article.author.avatarUrl}
                  alt={article.author.name}
                  className="w-11 h-11 rounded-full object-cover ring-2 ring-[#003fb1]/20"
                />
              ) : (
                <div className="w-11 h-11 rounded-full bg-[#003fb1] text-white flex items-center justify-center font-bold text-[14px]">
                  {article.author.initials || 'EP'}
                </div>
              )}
              <div className="flex flex-col">
                <span className="font-semibold text-[15px] text-[#121c28]">
                  {article.author.name}
                </span>
                <span className="text-[12px] text-[#737686]">
                  {article.author.role} {article.author.bio ? `• ${article.author.bio}` : ''}
                </span>
              </div>
            </div>
          </div>

          {/* Featured Image */}
          <div className="relative rounded-xl overflow-hidden bg-[#e5eeff] mb-8 shadow-sm">
            <img
              src={article.imageUrl}
              alt={article.imageAlt}
              className="w-full h-64 md:h-80 object-cover"
            />
            {article.idealVital && (
              <div className="absolute bottom-3 left-3 right-3 sm:right-auto bg-white/95 backdrop-blur-md p-3 rounded-lg shadow-md flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-[#ffdad6] text-[#ba1a1a] flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-[20px]">favorite</span>
                </div>
                <div>
                  <div className="text-[13px] font-semibold text-[#121c28]">
                    {article.idealVital.label}
                  </div>
                  <div className="text-[11px] text-[#737686]">
                    {article.idealVital.sublabel}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Editorial Content */}
          <div className={`space-y-6 text-[#121c28] ${fontSize === 'large' ? 'text-[18px] leading-relaxed' : 'text-[16px] leading-relaxed'}`}>
            <p className="font-medium text-[#434654] text-[17px] bg-[#f8f9ff] p-4 rounded-xl border-l-4 border-[#003fb1]">
              {article.summary}
            </p>

            {article.content ? (
              <>
                <p>{article.content.introduction}</p>

                <div className="space-y-4 my-6">
                  {article.content.keyPoints.map((point, index) => (
                    <div
                      key={index}
                      className="bg-white p-4.5 rounded-xl border border-[#e5eeff] shadow-xs"
                    >
                      <h3 className="font-heading font-semibold text-[16px] md:text-[18px] text-[#003fb1] mb-2 flex items-center gap-2">
                        <span className="w-6 h-6 rounded-full bg-[#dfe9fa] text-[#003fb1] text-[12px] font-bold flex items-center justify-center shrink-0">
                          {index + 1}
                        </span>
                        {point.title}
                      </h3>
                      <p className="text-[#434654] text-[15px]">{point.text}</p>
                      {point.actionTip && (
                        <div className="mt-2.5 pt-2 border-t border-[#f8f9ff] flex items-center gap-2 text-[13px] text-[#006c4a] font-medium">
                          <span className="material-symbols-outlined text-[16px]">lightbulb</span>
                          <span>{point.actionTip}</span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {article.content.localAdvice && (
                  <div className="bg-[#82f5c1]/20 border border-[#82f5c1] p-4.5 rounded-xl">
                    <div className="flex items-center gap-2 font-semibold text-[#006c4a] mb-1">
                      <span className="material-symbols-outlined text-[20px]">eco</span>
                      <span>L'astuce pratique de terrain d'Epiqure</span>
                    </div>
                    <p className="text-[14px] text-[#005137] leading-relaxed">
                      {article.content.localAdvice}
                    </p>
                  </div>
                )}

                {article.content.scientificFact && (
                  <div className="bg-[#eef4ff] border border-[#dfe9fa] p-4 rounded-xl flex items-start gap-3">
                    <span className="material-symbols-outlined text-[#003fb1] text-[22px] mt-0.5 shrink-0">
                      science
                    </span>
                    <div className="text-[13px] text-[#434654]">
                      <strong className="text-[#003fb1] block mb-0.5">Le repère scientifique :</strong>
                      {article.content.scientificFact}
                    </div>
                  </div>
                )}

                <p className="text-[15px] text-[#434654] italic">
                  {article.content.conclusion}
                </p>
              </>
            ) : (
              <p>{article.summary}</p>
            )}
          </div>

          {/* Action Box inside Article */}
          <div className="mt-8 p-6 bg-gradient-to-br from-[#003fb1] to-[#1a56db] text-white rounded-2xl flex flex-col md:flex-row items-center justify-between gap-6 shadow-md">
            <div className="flex flex-col gap-1.5 text-center md:text-left">
              <span className="text-[13px] font-semibold text-[#82f5c1] uppercase tracking-wider">
                Transmission & Prévention
              </span>
              <h4 className="font-heading text-[18px] md:text-[20px] font-bold">
                Transmettez ce conseil de santé à un proche
              </h4>
              <p className="text-[13px] text-[#d4dcff] max-w-md">
                Un geste simple peut prévenir une complication silencieuse chez un membre de votre famille.
              </p>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <button
                onClick={handleShare}
                className="h-11 px-5 rounded-lg bg-[#006c4a] text-white font-semibold text-[14px] hover:bg-[#005137] transition-all flex items-center gap-2 shadow-xs"
              >
                <span className="material-symbols-outlined text-[18px]">chat</span>
                <span>Partager sur WhatsApp</span>
              </button>
              <button
                onClick={onOpenWhatsApp}
                className="h-11 px-4 rounded-lg bg-white text-[#003fb1] font-medium text-[14px] hover:bg-[#eef4ff] transition-all"
              >
                Question aux rédacteurs
              </button>
            </div>
          </div>

          {/* Share footer */}
          <div className="mt-6 pt-4 border-t border-[#e5eeff] flex items-center justify-between text-[13px] text-[#737686]">
            <span>Partager cet article Epiqure :</span>
            <div className="flex items-center gap-2">
              <button
                onClick={handleShare}
                className="px-3 py-1.5 rounded-lg bg-[#006c4a] text-white flex items-center gap-1 hover:bg-[#005137]"
              >
                <span className="material-symbols-outlined text-[16px]">chat</span>
                <span>WhatsApp</span>
              </button>
              <button
                onClick={handleCopyLink}
                className="px-3 py-1.5 rounded-lg border border-[#c3c5d7] text-[#434654] hover:bg-[#f8f9ff]"
              >
                {copied ? 'Lien copié !' : 'Copier le lien'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
