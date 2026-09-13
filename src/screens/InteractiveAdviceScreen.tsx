import React, { useState } from 'react';
import { HealthAdviceResult } from '../types.ts';

interface InteractiveAdviceScreenProps {
  onOpenWhatsApp: () => void;
  onNavigateToCategory: (category: string) => void;
}

export const InteractiveAdviceScreen: React.FC<InteractiveAdviceScreenProps> = ({
  onOpenWhatsApp,
  onNavigateToCategory,
}) => {
  // Tool 1: Tension calculator
  const [systolic, setSystolic] = useState<number>(12);
  const [diastolic, setDiastolic] = useState<number>(8);
  const [hasCalculated, setHasCalculated] = useState<boolean>(true);

  // Tool 2: Spice matcher for traditional dishes
  const [dish, setDish] = useState<string>('kedjenou');

  // Compute Blood Pressure advice
  const getBPEvaluation = (sys: number, dia: number): HealthAdviceResult => {
    // Normalised: sys typically 10-20 (or 100-200), dia 6-12 (or 60-120)
    const s = sys > 40 ? sys / 10 : sys;
    const d = dia > 40 ? dia / 10 : dia;

    if (s <= 12 && d <= 8) {
      return {
        title: `Tension ${s.toFixed(1)} / ${d.toFixed(1)} : Optimale & Protectrice`,
        status: 'optimal',
        statusLabel: 'Pression Idéale',
        statusColor: 'bg-[#82f5c1] text-[#004b33]',
        summary:
          'Votre pression artérielle est exemplaire. Vos artères ne subissent aucune contrainte anormale.',
        recommendations: [
          'Continuez votre routine d’activité physique régulière (30 minutes de marche par jour).',
          'Conservez une cuisine riche en légumes, herbes fraîches et modérée en sel.',
          'Surveillez votre tension une fois par an en contrôle de routine.',
        ],
      };
    } else if (s <= 13.9 && d <= 8.9) {
      return {
        title: `Tension ${s.toFixed(1)} / ${d.toFixed(1)} : Légèrement Élevée (Pré-hypertension)`,
        status: 'attention',
        statusLabel: 'À surveiller',
        statusColor: 'bg-[#ffdcc2] text-[#833800]',
        summary:
          'Votre pression est dans la zone limite haute. C’est le moment charnière où les changements d’habitudes alimentaires ont le plus d’impact pour éviter les médicaments.',
        recommendations: [
          'Supprimez impérativement les bouillons industriels au profit du soumara, de l’ail et de l’akpi.',
          'Réduisez la consommation d’alcool et évitez les aliments ultra-transformés.',
          'Reprenez vos mesures selon la règle des 3 (matin et soir pendant 3 jours consécutifs).',
        ],
      };
    } else {
      return {
        title: `Tension ${s.toFixed(1)} / ${d.toFixed(1)} : Zone d'Hypertension`,
        status: 'alerte',
        statusLabel: 'Consultation requise',
        statusColor: 'bg-[#ffdad6] text-[#ba1a1a]',
        summary:
          'Cette valeur dépasse les recommandations cardiologiques de repos (< 14/9). Une prise en charge médicale est nécessaire pour préserver vos reins et vos vaisseaux cérébraux.',
        recommendations: [
          'Prenez rendez-vous chez votre médecin traitant sans tarder pour confirmer cette mesure au cabinet.',
          'Ne commencez ni n’arrêtez aucun traitement médicamenteux sans avis médical préalable.',
          'Évitez les efforts physiques violents tant que la tension n’est pas stabilisée.',
        ],
      };
    }
  };

  const bpResult = getBPEvaluation(systolic, diastolic);

  const dishAlternatives: Record<
    string,
    { name: string; problem: string; healthyIngredients: string[]; chefTip: string }
  > = {
    kedjenou: {
      name: 'Kédjénou de Poulet ou Pintade',
      problem: 'Souvent trop salé à cause des cubes industriels ajoutés en début de cuisson à l’étouffée.',
      healthyIngredients: [
        'Ail frais écrasé et oignons rouges coupés en gros quartiers',
        'Gingembre frais râpé et piment entier (sans le percer pour le parfum)',
        'Graines d’akpi torréfiées et pilées pour la liaison onctueuse',
        'Feuilles de basilic local (akpatin) et tomates fraîches mondées',
      ],
      chefTip:
        'L’étouffée concentre naturellement les sucs de la viande. N’ajoutez aucun bouillon : les oignons et les tomates créent un jus savoureux et cardioprotecteur.',
    },
    sauce_graine: {
      name: 'Sauce Graine Traditionnelle',
      problem: 'Grasse et parfois sursalée par l’ajout de poisson fumé salé + cubes.',
      healthyIngredients: [
        'Égouttage soigné pour retirer l’excès d’huile de palme flottante en fin de cuisson',
        'Gombos frais entiers ajoutés pour leurs fibres régulatrices du cholestérol',
        'Champignons séchés et soumara pour la richesse umami',
        'Poisson frais grillé plutôt que séché très salé',
      ],
      chefTip:
        'Faites tremper votre poisson fumé dans de l’eau tiède 30 minutes avant cuisson pour le dessaler naturellement.',
    },
    poisson_braise: {
      name: 'Poisson Braisé & Attiéke',
      problem: 'Marinades commerciales trop chargées en sel et glutamate de sodium.',
      healthyIngredients: [
        'Marinade maison : jus de citron vert pur, ail pilé, persil frais et une goutte d’huile végétale',
        'Poudre de poivre blanc de Penja et graines de coriandre moulues',
        'Portion contrôlée d’attiéké (un bol moyen) associée à des crudités croquantes',
      ],
      chefTip:
        'Le citron vert apporte l’acidité qui trompe positivement le palais en rehaussant la saveur sans avoir besoin de saler.',
    },
  };

  const currentDish = dishAlternatives[dish];

  return (
    <div className="flex flex-col w-full pb-16">
      {/* Header */}
      <section className="relative w-full bg-gradient-to-b from-[#eef4ff] via-[#f8f9ff] to-[#f8f9ff] py-12">
        <div className="max-w-[1200px] mx-auto px-4 md:px-8 lg:px-12 flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#82f5c1] text-[#00714e] text-[12px] uppercase tracking-wider font-semibold">
              <span className="material-symbols-outlined text-[14px]">tune</span>
              Outils & Simulateurs Gratuits
            </span>
            <span className="text-[#c3c5d7] text-[12px]">/</span>
            <span className="text-[12px] text-[#434654]">Epiqure Santé</span>
          </div>

          <h1 className="font-heading font-bold text-[30px] md:text-[40px] text-[#003fb1] tracking-tight max-w-3xl leading-tight">
            Simulateur de Tension & Guides Pratiques Personnalisés
          </h1>
          <p className="text-[16px] md:text-[18px] text-[#434654] max-w-2xl leading-relaxed">
            Testez vos chiffres de pression artérielle et découvrez les astuces culinaires rédigées par
            nos médecins pour adapter vos recettes traditionnelles sans renoncer au goût.
          </p>
        </div>
      </section>

      <div className="max-w-[1200px] mx-auto px-4 md:px-8 lg:px-12 pt-6 flex flex-col gap-12">
        {/* OUTIL 1 : Évaluateur de Tension */}
        <div className="bg-white rounded-3xl p-6 md:p-10 border border-[#e5eeff] shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-2xl bg-[#ffdad6] text-[#ba1a1a] flex items-center justify-center">
              <span className="material-symbols-outlined text-[26px]">favorite</span>
            </div>
            <div>
              <h2 className="font-heading font-bold text-[22px] md:text-[26px] text-[#121c28]">
                1. Évaluateur Instantané de Tension Artérielle
              </h2>
              <p className="text-[14px] text-[#434654]">
                Entrez vos chiffres de mesure au repos (en cmHg ou mmHg) pour obtenir l'analyse clinique Epiqure.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Input Controls */}
            <div className="lg:col-span-5 flex flex-col gap-6 bg-[#f8f9ff] p-6 rounded-2xl border border-[#e5eeff]">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-[14px] font-semibold text-[#121c28]">
                    Systolique (Maximal) : <strong className="text-[#003fb1]">{systolic}</strong>
                  </label>
                  <span className="text-[12px] text-[#737686]">Normal : 11 à 13</span>
                </div>
                <input
                  type="range"
                  min="9"
                  max="20"
                  step="0.1"
                  value={systolic}
                  onChange={(e) => {
                    setSystolic(parseFloat(e.target.value));
                    setHasCalculated(true);
                  }}
                  className="w-full accent-[#003fb1] cursor-pointer"
                />
                <div className="flex justify-between text-[11px] text-[#737686] mt-1">
                  <span>9 (Faible)</span>
                  <span>12 (Idéal)</span>
                  <span>16+ (Élevé)</span>
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-[14px] font-semibold text-[#121c28]">
                    Diastolique (Minimal) : <strong className="text-[#003fb1]">{diastolic}</strong>
                  </label>
                  <span className="text-[12px] text-[#737686]">Normal : 7 à 8.5</span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="13"
                  step="0.1"
                  value={diastolic}
                  onChange={(e) => {
                    setDiastolic(parseFloat(e.target.value));
                    setHasCalculated(true);
                  }}
                  className="w-full accent-[#003fb1] cursor-pointer"
                />
                <div className="flex justify-between text-[11px] text-[#737686] mt-1">
                  <span>5 (Bas)</span>
                  <span>8 (Idéal)</span>
                  <span>10+ (Élevé)</span>
                </div>
              </div>

              <div className="text-[12px] text-[#434654] bg-white p-3.5 rounded-xl border border-[#dfe9fa]">
                <strong className="text-[#121c28]">Rappel soignant :</strong> Mesurez toujours votre
                tension après 5 minutes de calme absolu, assis sans parler.
              </div>
            </div>

            {/* Diagnostic Output Card */}
            <div className="lg:col-span-7 flex flex-col gap-4">
              <div className="p-6 rounded-2xl bg-white border border-[#e5eeff] shadow-xs">
                <div className="flex items-center justify-between gap-3 mb-3">
                  <span className="text-[12px] font-bold text-[#737686] uppercase tracking-wider">
                    Diagnostic Préventif
                  </span>
                  <span className={`px-3 py-1 rounded-full text-[12px] font-bold ${bpResult.statusColor}`}>
                    {bpResult.statusLabel}
                  </span>
                </div>

                <h3 className="font-heading font-bold text-[20px] md:text-[24px] text-[#121c28] mb-2">
                  {bpResult.title}
                </h3>

                <p className="text-[15px] text-[#434654] leading-relaxed mb-4">
                  {bpResult.summary}
                </p>

                <div className="space-y-2.5 pt-3 border-t border-[#f8f9ff]">
                  <span className="text-[13px] font-bold text-[#121c28] block">
                    Nos conseils d'experts :
                  </span>
                  {bpResult.recommendations.map((rec, i) => (
                    <div key={i} className="flex items-start gap-2.5 text-[13.5px] text-[#121c28]">
                      <span className="material-symbols-outlined text-[18px] text-[#006c4a] shrink-0 mt-0.5">
                        check_circle
                      </span>
                      <span>{rec}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-6 pt-4 border-t border-[#e5eeff] flex flex-wrap items-center justify-between gap-3">
                  <button
                    onClick={() => onNavigateToCategory('hypertension')}
                    className="text-[#003fb1] font-semibold text-[13.5px] hover:underline flex items-center gap-1"
                  >
                    <span>Lire notre guide complet sur l'hypertension</span>
                    <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                  </button>

                  <button
                    onClick={onOpenWhatsApp}
                    className="px-4 py-2 rounded-xl bg-[#006c4a] text-white text-[13px] font-medium hover:bg-[#005137] flex items-center gap-1.5"
                  >
                    <span className="material-symbols-outlined text-[16px]">chat</span>
                    <span>Poser une question</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* OUTIL 2 : Recettes Traditionnelles Sans Cubes */}
        <div className="bg-white rounded-3xl p-6 md:p-10 border border-[#e5eeff] shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-2xl bg-[#82f5c1]/50 text-[#00714e] flex items-center justify-center">
              <span className="material-symbols-outlined text-[26px]">restaurant</span>
            </div>
            <div>
              <h2 className="font-heading font-bold text-[22px] md:text-[26px] text-[#121c28]">
                2. Cuisiner Local Sans Sel Caché : Le Substitut Idéal
              </h2>
              <p className="text-[14px] text-[#434654]">
                Sélectionnez un plat de notre terroir pour découvrir comment sublimer ses arômes sans cube industriel.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mb-6">
            {[
              { id: 'kedjenou', label: 'Kédjénou de Poulet' },
              { id: 'sauce_graine', label: 'Sauce Graine' },
              { id: 'poisson_braise', label: 'Poisson Braisé & Attiéké' },
            ].map((p) => (
              <button
                key={p.id}
                onClick={() => setDish(p.id)}
                className={`px-4 py-2 rounded-xl text-[14px] font-medium transition-all ${
                  dish === p.id
                    ? 'bg-[#003fb1] text-white shadow-xs font-semibold'
                    : 'bg-[#f8f9ff] text-[#434654] hover:bg-[#eef4ff]'
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 bg-[#f8f9ff] p-6 rounded-2xl border border-[#e5eeff]">
            <div className="md:col-span-6 flex flex-col gap-3">
              <div className="flex items-center gap-2 text-[#ba1a1a] text-[13px] font-semibold">
                <span className="material-symbols-outlined text-[18px]">warning</span>
                <span>Le piège classique :</span>
              </div>
              <p className="text-[14px] text-[#434654] bg-white p-3.5 rounded-xl border border-[#ffdcc2]">
                {currentDish.problem}
              </p>

              <div className="pt-2">
                <span className="text-[14px] font-bold text-[#006c4a] block mb-2">
                  La combinaison d'arômes naturels recommandée :
                </span>
                <ul className="space-y-2">
                  {currentDish.healthyIngredients.map((ing, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-[13.5px] text-[#121c28]">
                      <span className="material-symbols-outlined text-[16px] text-[#006c4a] shrink-0 mt-0.5">
                        eco
                      </span>
                      <span>{ing}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="md:col-span-6 bg-white p-6 rounded-2xl border border-[#dfe9fa] flex flex-col justify-between gap-4">
              <div>
                <span className="text-[12px] font-bold text-[#003fb1] uppercase tracking-wider block mb-1">
                  L'Astuce du Médecin Nutritionniste :
                </span>
                <p className="text-[14px] text-[#121c28] leading-relaxed italic">
                  « {currentDish.chefTip} »
                </p>
              </div>

              <div className="pt-4 border-t border-[#f8f9ff] flex items-center justify-between">
                <span className="text-[12px] text-[#737686]">Gain tension estimé : -4 mmHg</span>
                <button
                  onClick={() => onNavigateToCategory('nutrition')}
                  className="text-[13px] font-semibold text-[#003fb1] hover:underline flex items-center gap-1"
                >
                  <span>Tous les articles nutrition</span>
                  <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
