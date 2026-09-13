import React, { useState, useEffect, useRef } from 'react';
import { Header, ScreenType } from './components/Header.tsx';
import { Footer } from './components/Footer.tsx';
import { ArticleModal } from './components/ArticleModal.tsx';
import { WhatsAppModal } from './components/WhatsAppModal.tsx';

import { BlogScreen } from './screens/BlogScreen.tsx';
import { InteractiveAdviceScreen } from './screens/InteractiveAdviceScreen.tsx';
import { AboutScreen } from './screens/AboutScreen.tsx';
import { AdminScreen } from './screens/AdminScreen.tsx';
import { getInitialArticles } from './data/articleStorage.ts';

import { Article } from './types.ts';

export const App: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState<ScreenType>('blog');
  const [articles, setArticles] = useState<Article[]>(() => getInitialArticles());
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [isWhatsAppOpen, setIsWhatsAppOpen] = useState(false);
  const searchInputRef = useRef<HTMLInputElement | null>(null);

  // Scroll to top on screen change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentScreen]);

  const handleOpenWhatsApp = () => {
    setIsWhatsAppOpen(true);
  };

  const handleFocusSearch = () => {
    if (currentScreen !== 'blog') {
      setCurrentScreen('blog');
      setTimeout(() => {
        searchInputRef.current?.focus();
        searchInputRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 150);
    } else {
      searchInputRef.current?.focus();
      searchInputRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f8f9ff] text-[#121c28] font-body selection:bg-[#003fb1] selection:text-white">
      {/* Navigation Header */}
      <Header
        currentScreen={currentScreen}
        onNavigate={(screen) => setCurrentScreen(screen)}
        onOpenWhatsApp={handleOpenWhatsApp}
        onFocusSearch={handleFocusSearch}
      />

      {/* Main View Router - 100% Focused on Epiqure Health Advice */}
      <main className="flex-1 w-full flex flex-col pt-20">
        {currentScreen === 'blog' && (
          <BlogScreen
            initialCategory="all"
            articles={articles}
            onSelectArticle={(art) => setSelectedArticle(art)}
            onOpenWhatsApp={handleOpenWhatsApp}
            onNavigateToSimulator={() => setCurrentScreen('conseils-pratiques')}
            searchRef={searchInputRef}
          />
        )}

        {currentScreen === 'hypertension' && (
          <BlogScreen
            key="hypertension"
            initialCategory="hypertension"
            articles={articles}
            onSelectArticle={(art) => setSelectedArticle(art)}
            onOpenWhatsApp={handleOpenWhatsApp}
            onNavigateToSimulator={() => setCurrentScreen('conseils-pratiques')}
            searchRef={searchInputRef}
          />
        )}

        {currentScreen === 'diabete' && (
          <BlogScreen
            key="diabete"
            initialCategory="diabete"
            articles={articles}
            onSelectArticle={(art) => setSelectedArticle(art)}
            onOpenWhatsApp={handleOpenWhatsApp}
            onNavigateToSimulator={() => setCurrentScreen('conseils-pratiques')}
            searchRef={searchInputRef}
          />
        )}

        {currentScreen === 'aines' && (
          <BlogScreen
            key="aines"
            initialCategory="aines"
            articles={articles}
            onSelectArticle={(art) => setSelectedArticle(art)}
            onOpenWhatsApp={handleOpenWhatsApp}
            onNavigateToSimulator={() => setCurrentScreen('conseils-pratiques')}
            searchRef={searchInputRef}
          />
        )}

        {currentScreen === 'conseils-pratiques' && (
          <InteractiveAdviceScreen
            onOpenWhatsApp={handleOpenWhatsApp}
            onNavigateToCategory={(cat) => {
              if (cat === 'hypertension' || cat === 'diabete' || cat === 'aines') {
                setCurrentScreen(cat as ScreenType);
              } else {
                setCurrentScreen('blog');
              }
            }}
          />
        )}

        {currentScreen === 'apropos' && (
          <AboutScreen
            onOpenWhatsApp={handleOpenWhatsApp}
            onNavigateToBlog={() => setCurrentScreen('blog')}
          />
        )}

        {currentScreen === 'admin' && (
          <AdminScreen
            articles={articles}
            onArticlesChange={(updated) => setArticles(updated)}
            onNavigateToPublic={() => setCurrentScreen('blog')}
            onPreviewArticle={(art) => setSelectedArticle(art)}
          />
        )}
      </main>

      {/* Floating Action WhatsApp Button for Asking Advice / Writing to Doctors */}
      <div className="fixed bottom-5 right-5 z-40 flex items-center">
        <button
          onClick={handleOpenWhatsApp}
          className="group flex items-center gap-2.5 h-13 pl-4 pr-5 rounded-full bg-[#006c4a] text-white shadow-xl hover:bg-[#005137] hover:scale-105 active:scale-95 transition-all duration-200 border-2 border-white/40"
          title="Poser une question de santé aux soignants d'Epiqure sur WhatsApp"
          aria-label="Poser une question aux rédacteurs d'Epiqure"
        >
          <span className="material-symbols-outlined text-[24px]">chat</span>
          <div className="flex flex-col text-left leading-tight">
            <span className="text-[11px] text-[#82f5c1] font-semibold uppercase tracking-wider">
              Une question ?
            </span>
            <span className="text-[13px] font-bold">Rédaction Epiqure</span>
          </div>
        </button>
      </div>

      {/* Footer */}
      <Footer
        onNavigate={(screen) => setCurrentScreen(screen)}
        onOpenWhatsApp={handleOpenWhatsApp}
      />

      {/* Article Detail Modal */}
      {selectedArticle && (
        <ArticleModal
          article={selectedArticle}
          onClose={() => setSelectedArticle(null)}
          onOpenWhatsApp={handleOpenWhatsApp}
        />
      )}

      {/* Question to editorial team Modal */}
      <WhatsAppModal
        isOpen={isWhatsAppOpen}
        onClose={() => setIsWhatsAppOpen(false)}
      />
    </div>
  );
};

export default App;
