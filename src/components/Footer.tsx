import React, { useState } from 'react';
import { ScreenType } from './Header.tsx';

interface FooterProps {
  onNavigate: (screen: ScreenType) => void;
  onOpenWhatsApp: () => void;
  isAuthenticated?: boolean;
  onOpenLogin?: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigate,
  onOpenWhatsApp,
  isAuthenticated = false,
  onOpenLogin,
}) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setTimeout(() => {
        setEmail('');
      }, 3500);
    }
  };

  const handleNav = (screen: ScreenType) => {
    onNavigate(screen);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="w-full bg-[#eef4ff] border-t border-[#dfe9fa] mt-16">
      <div className="max-w-[1200px] mx-auto px-4 md:px-8 lg:px-12 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Col 1 : Brand & Mission */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#003fb1] to-[#1a56db] flex items-center justify-center text-white shadow-xs">
                <span className="material-symbols-outlined text-[20px]">local_hospital</span>
              </div>
              <div className="flex flex-col">
                <span className="font-heading font-bold text-[20px] text-[#003fb1] leading-none">
                  Epiqure
                </span>
                <span className="text-[11px] text-[#006c4a] font-semibold tracking-wider uppercase mt-0.5">
                  Le Blog Santé & Conseils
                </span>
              </div>
            </div>
            <p className="text-[14px] leading-relaxed text-[#434654]">
              Votre média de référence pour comprendre sa santé, prévenir les maladies chroniques
              (hypertension, diabète) et adopter les bons réflexes nutritionnels au quotidien.
            </p>
            <div className="flex items-center gap-2 text-[#006c4a] font-medium text-[13px] pt-1">
              <span className="material-symbols-outlined text-[18px]">verified</span>
              <span>Comité de relecture médicale indépendante</span>
            </div>
          </div>

          {/* Col 2 : Rubriques & Thématiques */}
          <div className="flex flex-col gap-2.5">
            <span className="font-heading font-semibold text-[17px] text-[#121c28]">
              Rubriques Santé
            </span>
            <button
              onClick={() => handleNav('blog')}
              className="text-left text-[14px] text-[#434654] hover:text-[#003fb1] transition-colors"
            >
              Tous les conseils & articles
            </button>
            <button
              onClick={() => handleNav('hypertension')}
              className="text-left text-[14px] text-[#434654] hover:text-[#003fb1] transition-colors"
            >
              Hypertension & Cœur
            </button>
            <button
              onClick={() => handleNav('diabete')}
              className="text-left text-[14px] text-[#434654] hover:text-[#003fb1] transition-colors"
            >
              Diabète & Alimentation
            </button>
            <button
              onClick={() => handleNav('aines')}
              className="text-left text-[14px] text-[#434654] hover:text-[#003fb1] transition-colors"
            >
              Santé & Bien-être des Aînés
            </button>
            <button
              onClick={() => handleNav('conseils-pratiques')}
              className="text-left text-[14px] text-[#434654] hover:text-[#003fb1] transition-colors"
            >
              Simulateur & Conseils Pratiques
            </button>
            <button
              onClick={() => handleNav('apropos')}
              className="text-left text-[14px] text-[#434654] hover:text-[#003fb1] transition-colors"
            >
              Ligne Éditoriale & Équipe Médicale
            </button>
            <button
              onClick={() => {
                if (isAuthenticated) {
                  handleNav('admin');
                } else if (onOpenLogin) {
                  onOpenLogin();
                } else {
                  handleNav('admin');
                }
              }}
              className="text-left text-[14px] text-[#003fb1] font-medium hover:underline transition-colors flex items-center gap-1.5 pt-1"
            >
              <span className="material-symbols-outlined text-[16px]">lock</span>
              <span>{isAuthenticated ? 'Espace Rédaction' : 'Connexion Rédaction'}</span>
            </button>
          </div>

          {/* Col 3 : Rédaction & Écoute */}
          <div className="flex flex-col gap-2.5">
            <span className="font-heading font-semibold text-[17px] text-[#121c28]">
              Écrire à la Rédaction
            </span>
            <p className="text-[13.5px] text-[#434654] leading-relaxed">
              Une question sur un article, une suggestion de sujet médical à traiter ou un témoignage à partager ?
            </p>
            <div className="flex items-center gap-2 text-[14px] text-[#434654]">
              <span className="material-symbols-outlined text-[#003fb1] text-[18px] shrink-0">
                contact_mail
              </span>
              <button
                onClick={onOpenWhatsApp}
                className="hover:underline text-[#003fb1] font-medium text-left"
              >
                Formulaire de contact direct
              </button>
            </div>
            <div className="flex items-center gap-2 text-[14px] text-[#434654]">
              <span className="material-symbols-outlined text-[#006c4a] text-[18px] shrink-0">
                send
              </span>
              <button
                onClick={onOpenWhatsApp}
                className="hover:underline text-[#006c4a] font-medium text-left"
              >
                Poser une question aux rédacteurs
              </button>
            </div>
            <div className="flex items-center gap-2 text-[14px] text-[#434654] pt-1">
              <span className="material-symbols-outlined text-[#737686] text-[18px] shrink-0">
                school
              </span>
              <span className="text-[13px] text-[#737686]">
                Sous la direction du Dr. Kouamé
              </span>
            </div>
          </div>

          {/* Col 4 : Newsletter de Prévention */}
          <div className="flex flex-col gap-3">
            <span className="font-heading font-semibold text-[17px] text-[#121c28]">
              La Lettre Hebdo d'Epiqure
            </span>
            <p className="text-[13px] text-[#434654] leading-relaxed">
              Recevez chaque dimanche un conseil médical clair, des astuces pour cuisiner sainement et des fiches pratiques de prévention.
            </p>
            {subscribed ? (
              <div className="p-3 rounded-lg bg-[#82f5c1]/40 text-[#00714e] text-[13px] font-medium flex items-center gap-1.5 animate-fadeIn">
                <span className="material-symbols-outlined text-[16px]">check_circle</span>
                <span>Merci ! Vous êtes bien inscrit(e) aux conseils d'Epiqure.</span>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Votre adresse e-mail"
                  required
                  className="w-full h-10 px-3 rounded-lg bg-white text-[#121c28] text-[14px] placeholder:text-[#737686] border border-[#c3c5d7] focus:outline-none focus:ring-2 focus:ring-[#003fb1] shadow-xs"
                />
                <button
                  type="submit"
                  className="w-full h-10 rounded-lg bg-[#003fb1] text-white text-[13px] font-medium hover:bg-[#1a56db] transition-all flex items-center justify-center gap-2 shadow-xs"
                >
                  <span className="material-symbols-outlined text-[17px]">mark_email_read</span>
                  <span>S'abonner gratuitement</span>
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-[#dfe9fa] flex flex-col md:flex-row items-center justify-between gap-4 text-[#434654] text-[13px]">
          <div>
            © 2024 Epiqure. Le blog de conseils médicaux et de santé préventive. Tous droits réservés.
          </div>
          <div className="flex items-center gap-6">
            <span className="text-[12px] text-[#737686]">
              Avertissement : Les articles d'Epiqure sont informatifs et ne remplacent pas une consultation médicale.
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
