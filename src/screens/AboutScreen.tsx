import React, { useState } from 'react';
import { ContactForm } from '../components/ContactForm.tsx';
import { getInitialRedacteurs } from '../data/redacteurStorage.ts';

interface AboutScreenProps {
  onOpenWhatsApp: () => void;
  onNavigateToBlog: () => void;
}

export const AboutScreen: React.FC<AboutScreenProps> = ({
  onOpenWhatsApp,
  onNavigateToBlog,
}) => {
  const [team] = useState(() => getInitialRedacteurs());

  return (
    <div className="flex flex-col w-full pb-16">
      {/* Hero Header */}
      <section className="relative w-full bg-gradient-to-b from-[#eef4ff] via-[#f8f9ff] to-[#f8f9ff] py-12">
        <div className="max-w-[1200px] mx-auto px-4 md:px-8 lg:px-12 flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#82f5c1] text-[#00714e] text-[12px] uppercase tracking-wider font-semibold">
              <span className="material-symbols-outlined text-[14px]">verified</span>
              Ligne Éditoriale
            </span>
            <span className="text-[#c3c5d7] text-[12px]">/</span>
            <span className="text-[12px] text-[#434654]">Epiqure</span>
          </div>

          <h1 className="font-heading font-bold text-[30px] md:text-[42px] text-[#003fb1] tracking-tight max-w-3xl leading-tight">
            Pourquoi le blog Epiqure ? Rendre le savoir médical accessible et bienveillant.
          </h1>
          <p className="text-[16px] md:text-[19px] text-[#434654] max-w-2xl leading-relaxed">
            Epiqure est né d’un constat simple : la plupart des accidents vasculaires cérébraux et des
            complications du diabète peuvent être évités grâce à des conseils de bon sens, clairs et
            adaptés à notre gastronomie locale.
          </p>
        </div>
      </section>

      <div className="max-w-[1200px] mx-auto px-4 md:px-8 lg:px-12 pt-6 flex flex-col gap-12">
        {/* Nos 3 Engagements */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-[#e5eeff] shadow-xs flex flex-col gap-3">
            <div className="w-12 h-12 rounded-xl bg-[#e5eeff] text-[#003fb1] flex items-center justify-center">
              <span className="material-symbols-outlined text-[26px]">science</span>
            </div>
            <h3 className="font-heading font-bold text-[18px] text-[#121c28]">
              Rigueur Médicale
            </h3>
            <p className="text-[14px] text-[#434654] leading-relaxed">
              Chaque conseil, astuce et chiffre publié sur Epiqure est vérifié par nos professionnels
              de santé selon les référentiels de la Société Médicale et de l’OMS.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-[#e5eeff] shadow-xs flex flex-col gap-3">
            <div className="w-12 h-12 rounded-xl bg-[#82f5c1]/30 text-[#006c4a] flex items-center justify-center">
              <span className="material-symbols-outlined text-[26px]">restaurant</span>
            </div>
            <h3 className="font-heading font-bold text-[18px] text-[#121c28]">
              Ancrage Culinaire Local
            </h3>
            <p className="text-[14px] text-[#434654] leading-relaxed">
              Pas de régimes occidentaux irréalistes : nous travaillons avec nos ingrédients du terroir
              (attiéké, sauces graines, soumara, akpi, fruits locaux) pour régaler vos papilles sainement.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-[#e5eeff] shadow-xs flex flex-col gap-3">
            <div className="w-12 h-12 rounded-xl bg-[#ffdcc2] text-[#833800] flex items-center justify-center">
              <span className="material-symbols-outlined text-[26px]">diversity_3</span>
            </div>
            <h3 className="font-heading font-bold text-[18px] text-[#121c28]">
              Transmission Familiale
            </h3>
            <p className="text-[14px] text-[#434654] leading-relaxed">
              Tous nos articles sont conçus pour être facilement partagés sur WhatsApp avec vos parents,
              grands-parents et proches vivant en ville ou au village.
            </p>
          </div>
        </div>

        {/* L'Équipe Médicale */}
        <div className="bg-white rounded-3xl p-6 md:p-10 border border-[#e5eeff] shadow-sm">
          <div className="mb-8">
            <span className="text-[12px] text-[#006c4a] font-semibold uppercase tracking-wider">
              Les Signatures
            </span>
            <h2 className="font-heading font-bold text-[24px] md:text-[28px] text-[#121c28] mt-1">
              Les praticiens et soignants qui écrivent sur Epiqure
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, i) => (
              <div key={i} className="flex flex-col gap-3 bg-[#f8f9ff] p-5 rounded-2xl border border-[#e5eeff]">
                <div className="flex items-center gap-3">
                  {member.avatarUrl ? (
                    <img
                      src={member.avatarUrl}
                      alt={member.name}
                      className="w-14 h-14 rounded-full object-cover ring-2 ring-[#003fb1]/20 shadow-xs"
                    />
                  ) : (
                    <div className="w-14 h-14 rounded-full bg-[#003fb1] text-white flex items-center justify-center font-bold text-[16px] shadow-xs">
                      {member.initials}
                    </div>
                  )}
                  <div>
                    <h4 className="font-heading font-bold text-[16px] text-[#121c28]">
                      {member.name}
                    </h4>
                    <p className="text-[12px] text-[#003fb1] font-medium leading-snug">
                      {member.role}
                    </p>
                  </div>
                </div>
                <p className="text-[13.5px] text-[#434654] leading-relaxed mt-1">
                  {member.bio}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Formulaire de Contact Formspree */}
        <div id="contact-form-section">
          <ContactForm
            title="Poser une question à la Rédaction d’Epiqure"
            subtitle="Vous souhaitez suggérer un sujet d’article, réagir à un conseil ou poser une question à nos soignants ? Envoyez-nous un message directement via ce formulaire."
          />
        </div>

        {/* Action Bottom */}
        <div className="bg-gradient-to-br from-[#003fb1] to-[#1a56db] text-white p-8 rounded-3xl flex flex-col md:flex-row items-center justify-between gap-6 shadow-md">
          <div>
            <h3 className="font-heading font-bold text-[22px] md:text-[26px]">
              Vous avez une idée de sujet de santé pour le blog ?
            </h3>
            <p className="text-[14px] text-[#d4dcff] max-w-xl mt-1">
              La rédaction d'Epiqure lit tous vos messages et consacre régulièrement des fiches conseils
              aux interrogations posées par nos lecteurs.
            </p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={onOpenWhatsApp}
              className="h-12 px-6 rounded-xl bg-[#006c4a] hover:bg-[#005137] text-white font-medium text-[14px] flex items-center gap-2 shadow-xs"
            >
              <span className="material-symbols-outlined text-[18px]">chat</span>
              <span>Proposer un sujet</span>
            </button>
            <button
              onClick={onNavigateToBlog}
              className="h-12 px-6 rounded-xl bg-white text-[#003fb1] font-semibold text-[14px] hover:bg-[#eef4ff] transition-colors"
            >
              Découvrir les articles
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
