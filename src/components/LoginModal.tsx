import React, { useState } from 'react';
import { AuthUser, saveAuth } from '../data/authStorage.ts';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (user: AuthUser) => void;
}

export const LoginModal: React.FC<LoginModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess,
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email.trim() || !password.trim()) {
      setError('Veuillez renseigner votre identifiant et votre mot de passe.');
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      // Allow administrator / redacteur access
      const user: AuthUser = {
        email: email.trim().toLowerCase(),
        name: email.toLowerCase().includes('kouame') ? 'Dr. Kouamé' : 'Administrateur Rédaction',
        role: 'Rédacteur en Chef',
      };
      saveAuth(user);
      setIsLoading(false);
      onLoginSuccess(user);
      onClose();
    }, 400);
  };

  const handleQuickDemoFill = () => {
    setEmail('admin@epiqure.org');
    setPassword('epiqure2024');
    setError('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-md my-8 bg-white rounded-2xl shadow-2xl overflow-hidden border border-[#e5eeff] animate-in fade-in zoom-in-95 duration-200">
        {/* En-tête */}
        <div className="bg-gradient-to-r from-[#003fb1] to-[#121c28] text-white p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-white/15 flex items-center justify-center">
                <span className="material-symbols-outlined text-[22px]">lock</span>
              </div>
              <div>
                <h3 className="font-heading font-semibold text-[18px] leading-tight">
                  Espace Rédaction
                </h3>
                <p className="text-[12px] text-[#dbe1ff]">
                  Accès réservé à l'équipe éditoriale & médicale
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors text-white"
            >
              <span className="material-symbols-outlined text-[18px]">close</span>
            </button>
          </div>
        </div>

        {/* Corps du formulaire */}
        <form onSubmit={handleSubmit} className="p-6 flex flex-col gap-4">
          {error && (
            <div className="p-3 rounded-xl bg-[#ffdad6] text-[#ba1a1a] text-[13px] flex items-center gap-2">
              <span className="material-symbols-outlined text-[18px] shrink-0">error</span>
              <span>{error}</span>
            </div>
          )}

          <div>
            <label className="block text-[13px] font-semibold text-[#121c28] mb-1.5">
              Adresse e-mail professionnelle
            </label>
            <div className="relative">
              <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-[#737686] text-[20px]">
                mail
              </span>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Ex: redaction@epiqure.org"
                required
                className="w-full h-11 pl-11 pr-3 rounded-xl border border-[#c3c5d7] text-[14px] focus:outline-none focus:ring-2 focus:ring-[#003fb1] focus:border-transparent transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-[13px] font-semibold text-[#121c28] mb-1.5">
              Mot de passe
            </label>
            <div className="relative">
              <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-[#737686] text-[20px]">
                key
              </span>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full h-11 pl-11 pr-3 rounded-xl border border-[#c3c5d7] text-[14px] focus:outline-none focus:ring-2 focus:ring-[#003fb1] focus:border-transparent transition-all"
              />
            </div>
          </div>

          {/* Raccourci pour tester facilement */}
          <div className="pt-1 flex items-center justify-between text-[12px]">
            <button
              type="button"
              onClick={handleQuickDemoFill}
              className="text-[#003fb1] hover:underline font-medium flex items-center gap-1"
            >
              <span className="material-symbols-outlined text-[14px]">bolt</span>
              <span>Remplir pour tester l'accès</span>
            </button>
            <span className="text-[#737686]">Accès sécurisé</span>
          </div>

          <div className="pt-3 flex flex-col gap-2">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full h-11 rounded-xl bg-[#003fb1] hover:bg-[#1a56db] active:scale-[0.99] text-white font-medium text-[14px] flex items-center justify-center gap-2 shadow-xs transition-all disabled:opacity-50 cursor-pointer"
            >
              {isLoading ? (
                <>
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                  <span>Vérification...</span>
                </>
              ) : (
                <>
                  <span className="material-symbols-outlined text-[18px]">login</span>
                  <span>Se connecter</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={onClose}
              className="w-full h-10 rounded-xl text-[#434654] hover:bg-[#f8f9ff] text-[13px] font-medium transition-colors"
            >
              Retourner au blog
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
