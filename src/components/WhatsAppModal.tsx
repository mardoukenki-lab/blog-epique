import React from 'react';
import { ContactForm } from './ContactForm.tsx';

interface WhatsAppModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultTab?: 'form' | 'whatsapp';
}

export const WhatsAppModal: React.FC<WhatsAppModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-xl my-6 bg-white rounded-2xl shadow-2xl overflow-hidden border border-[#e5eeff] animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#003fb1] to-[#1a56db] text-white p-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
              <span className="material-symbols-outlined text-[24px]">contact_mail</span>
            </div>
            <div>
              <h3 className="font-heading font-semibold text-[18px]">
                Écrire à la Rédaction d'Epiqure
              </h3>
              <p className="text-[12px] text-[#d4dcff] flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-[#82f5c1] animate-pulse"></span>
                Équipe éditoriale à votre écoute
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-black/20 text-white hover:bg-black/30 flex items-center justify-center transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        {/* Real Formspree Contact Form */}
        <div className="p-5 sm:p-6 max-h-[80vh] overflow-y-auto">
          <ContactForm
            className="border-0 !p-0 shadow-none"
            title=""
            subtitle="Une question sur un article, une suggestion de sujet médical à traiter ou un témoignage ? Envoyez votre message directement aux rédacteurs d'Epiqure."
            onSuccess={() => {
              setTimeout(() => {
                onClose();
              }, 2500);
            }}
          />
        </div>
      </div>
    </div>
  );
};

