import React, { useState } from 'react';
import { AuthUser } from '../data/authStorage.ts';

export type ScreenType =
  | 'blog'
  | 'hypertension'
  | 'diabete'
  | 'aines'
  | 'conseils-pratiques'
  | 'apropos'
  | 'admin';

interface HeaderProps {
  currentScreen: ScreenType;
  isAuthenticated: boolean;
  currentUser: AuthUser | null;
  onNavigate: (screen: ScreenType) => void;
  onOpenWhatsApp: () => void;
  onFocusSearch: () => void;
  onOpenLogin: () => void;
  onLogout: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentScreen,
  isAuthenticated,
  currentUser,
  onNavigate,
  onOpenWhatsApp,
  onFocusSearch,
  onOpenLogin,
  onLogout,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems: { id: ScreenType; label: string; icon: string }[] = [
    { id: 'blog', label: 'Tous les Conseils', icon: 'auto_stories' },
    { id: 'hypertension', label: 'Hypertension & Cœur', icon: 'favorite' },
    { id: 'diabete', label: 'Diabète & Nutrition', icon: 'nutrition' },
    { id: 'aines', label: 'Santé des Aînés', icon: 'elderly' },
    { id: 'conseils-pratiques', label: 'Simulateur Santé', icon: 'health_and_safety' },
    { id: 'apropos', label: 'À Propos', icon: 'medical_services' },
  ];

  const handleNav = (screen: ScreenType) => {
    onNavigate(screen);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#f8f9ff]/95 backdrop-blur-xl shadow-[0_1px_10px_rgba(0,0,0,0.04)] border-b border-[#e5eeff]">
      <div className="h-20 max-w-[1200px] mx-auto px-4 md:px-8 lg:px-12 flex items-center justify-between gap-4">
        {/* Logo Epiqure */}
        <button
          onClick={() => handleNav('blog')}
          className="flex items-center gap-3 text-left group focus:outline-none"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#003fb1] to-[#1a56db] flex items-center justify-center text-white shadow-sm group-hover:scale-105 transition-transform">
            <span className="material-symbols-outlined text-[24px]">local_hospital</span>
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="font-heading font-bold text-[22px] tracking-tight text-[#003fb1] leading-none">
                Epiqure
              </span>
              <span className="px-1.5 py-0.5 rounded bg-[#82f5c1] text-[#004b33] text-[10px] font-bold uppercase tracking-wider">
                Blog
              </span>
            </div>
            <span className="text-[11px] text-[#434654] font-medium tracking-wide mt-0.5">
              Conseils Médicaux & Santé Préventive
            </span>
          </div>
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-1 p-1 bg-white/80 backdrop-blur-sm rounded-xl border border-[#e5eeff]">
          {navItems.map((item) => {
            const isActive = currentScreen === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNav(item.id)}
                className={`px-3 py-2 text-[13.5px] font-medium rounded-lg transition-all flex items-center gap-1.5 ${
                  isActive
                    ? 'text-[#003fb1] font-semibold bg-[#e5eeff] shadow-xs'
                    : 'text-[#434654] hover:text-[#121c28] hover:bg-[#f8f9ff]'
                }`}
              >
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Quick Search Shortcut */}
          <button
            onClick={onFocusSearch}
            className="w-10 h-10 rounded-xl bg-white border border-[#dfe9fa] text-[#434654] hover:text-[#003fb1] hover:border-[#b5c4ff] flex items-center justify-center transition-colors shadow-xs"
            title="Rechercher un conseil de santé"
            aria-label="Rechercher"
          >
            <span className="material-symbols-outlined text-[20px]">search</span>
          </button>

          {/* Écrire à la rédaction (Contact / Formulaire Formspree / WhatsApp) */}
          <button
            onClick={onOpenWhatsApp}
            className="hidden sm:inline-flex items-center gap-2 h-10 px-4 rounded-xl bg-[#006c4a] text-white text-[13.5px] font-medium hover:bg-[#005137] transition-all shadow-sm active:scale-95"
            title="Écrire à la rédaction d'Epiqure (formulaire en ligne ou WhatsApp)"
          >
            <span className="material-symbols-outlined text-[18px]">edit_note</span>
            <span>Écrire à la rédaction</span>
          </button>

          {/* Connexion / Espace Rédaction Button */}
          {!isAuthenticated ? (
            <button
              onClick={onOpenLogin}
              className="inline-flex items-center gap-1.5 h-10 px-3.5 rounded-xl bg-white border border-[#c3c5d7] text-[#121c28] hover:border-[#003fb1] hover:text-[#003fb1] text-[13.5px] font-medium transition-all shadow-xs cursor-pointer"
              title="Connexion à l'espace rédaction"
            >
              <span className="material-symbols-outlined text-[19px] text-[#003fb1]">login</span>
              <span>Connexion</span>
            </button>
          ) : (
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => handleNav('admin')}
                className={`inline-flex items-center gap-1.5 h-10 px-3.5 rounded-xl text-[13px] font-semibold transition-all shadow-xs cursor-pointer ${
                  currentScreen === 'admin'
                    ? 'bg-[#003fb1] text-white shadow-xs'
                    : 'bg-[#eef4ff] text-[#003fb1] hover:bg-[#dbe1ff]'
                }`}
                title="Accéder à l'espace rédaction"
              >
                <span className="material-symbols-outlined text-[18px]">edit_square</span>
                <span className="hidden sm:inline">Espace Rédaction</span>
              </button>
              <button
                onClick={onLogout}
                className="w-10 h-10 rounded-xl bg-white border border-[#c3c5d7] hover:border-[#ba1a1a] hover:bg-[#ffdad6]/30 text-[#434654] hover:text-[#ba1a1a] flex items-center justify-center transition-colors cursor-pointer"
                title="Se déconnecter de la rédaction"
                aria-label="Déconnexion"
              >
                <span className="material-symbols-outlined text-[18px]">logout</span>
              </button>
            </div>
          )}

          {/* Newsletter direct button */}
          <button
            onClick={() => {
              if (currentScreen !== 'blog') {
                handleNav('blog');
                setTimeout(() => {
                  document.getElementById('newsletter-section')?.scrollIntoView({ behavior: 'smooth' });
                }, 100);
              } else {
                document.getElementById('newsletter-section')?.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            className="inline-flex items-center gap-1.5 h-10 px-3.5 rounded-xl bg-[#003fb1] text-white text-[13.5px] font-medium hover:bg-[#1a56db] transition-all shadow-xs"
          >
            <span className="material-symbols-outlined text-[17px]">mail</span>
            <span className="hidden md:inline">Newsletter</span>
          </button>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden w-10 h-10 rounded-xl bg-[#e5eeff] text-[#003fb1] flex items-center justify-center"
            aria-label="Ouvrir le menu"
          >
            <span className="material-symbols-outlined text-[24px]">
              {mobileMenuOpen ? 'close' : 'menu'}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-[#e5eeff] px-4 py-4 shadow-xl animate-in slide-in-from-top-2 duration-150">
          <div className="flex flex-col gap-1">
            {navItems.map((item) => {
              const isActive = currentScreen === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNav(item.id)}
                  className={`text-left px-4 py-2.5 rounded-lg text-[15px] font-medium flex items-center gap-3 transition-colors ${
                    isActive
                      ? 'bg-[#e5eeff] text-[#003fb1] font-semibold'
                      : 'text-[#434654] hover:bg-[#f8f9ff] hover:text-[#121c28]'
                  }`}
                >
                  <span className="material-symbols-outlined text-[20px] text-[#003fb1]">
                    {item.icon}
                  </span>
                  <span>{item.label}</span>
                </button>
              );
            })}

            {/* Connexion / Espace Rédaction in mobile menu */}
            {!isAuthenticated ? (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenLogin();
                }}
                className="text-left px-4 py-2.5 rounded-lg text-[15px] font-medium flex items-center gap-3 text-[#121c28] hover:bg-[#f8f9ff] transition-colors"
              >
                <span className="material-symbols-outlined text-[20px] text-[#003fb1]">
                  login
                </span>
                <span>Connexion</span>
              </button>
            ) : (
              <>
                <button
                  onClick={() => handleNav('admin')}
                  className={`text-left px-4 py-2.5 rounded-lg text-[15px] font-medium flex items-center gap-3 transition-colors ${
                    currentScreen === 'admin'
                      ? 'bg-[#003fb1] text-white font-semibold'
                      : 'text-[#121c28] hover:bg-[#f8f9ff] font-semibold'
                  }`}
                >
                  <span className="material-symbols-outlined text-[20px]">
                    edit_square
                  </span>
                  <span>Espace Rédaction (Connecté)</span>
                </button>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onLogout();
                  }}
                  className="text-left px-4 py-2 rounded-lg text-[14px] text-[#ba1a1a] hover:bg-[#ffdad6]/20 flex items-center gap-3 transition-colors"
                >
                  <span className="material-symbols-outlined text-[18px]">
                    logout
                  </span>
                  <span>Déconnexion</span>
                </button>
              </>
            )}

            <div className="pt-3 border-t border-[#e5eeff] flex gap-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenWhatsApp();
                }}
                className="flex-1 h-11 rounded-lg bg-[#006c4a] text-white font-medium text-[14px] flex items-center justify-center gap-2"
              >
                <span className="material-symbols-outlined text-[18px]">chat</span>
                <span>Poser une question</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
