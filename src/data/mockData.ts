import { Article } from '../types.ts';

export const FEATURED_ARTICLE: Article = {
  id: 'featured-hypertension-coeur',
  title: 'Hypertension artérielle : 5 gestes simples et quotidiens pour préserver son cœur',
  summary:
    "L'hypertension artérielle demeure le danger le plus insidieux chez l'adulte et nos aînés. De la modération du sel et des cubes d'assaisonnement industriels à l'introduction d'une marche quotidienne active, découvrez les gestes fondamentaux validés par les cardiologues pour protéger vos artères et stabiliser durablement votre tension.",
  category: 'hypertension',
  categoryLabel: 'Hypertension & Cœur',
  categoryBadgeClass: 'bg-[#ffdad6] text-[#ba1a1a]',
  readTime: '5 min',
  imageUrl:
    'https://lh3.googleusercontent.com/aida-public/AB6AXuDaBQA9wHwsQo96Rcb3crC4pPuJSUq_8KnPVcVQkcViBYbYkKADZn96fWT6DgAtJKsCQ4mZ-T3lYYmlT08a_xIZJvRIVWTdRAwJ1fkr9hTNrAuPY_k1ZF9UUjebQRzbYQ06zLt_LHzFmn_Wf0_NKgU3Tvmp5elgiqFjYI2jRI3ESvHwoJJ0opB75zOObDGevfxXTPFeNEDXWcmf5KzFhmzSD4T_4gSTMTNNbLO4XSA7wS2FpghbZbQ2',
  imageAlt:
    "Un soignant souriant en blouse médicale prenant la tension artérielle d'une patiente âgée assise dans un salon lumineux.",
  author: {
    name: 'Dr. Kouamé',
    role: 'Médecin Cardiologue Référent • Rédaction Epiqure',
    avatarUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDKzgNmOdUkB0jxqE8qX6VDNLpKLivRTWW0PYBKkOOGWYf-Rf6lpYzVSqnYiVDJr7fBik-cBpTqvVpquX8NWDaSdheYuMN2_vK4xVT4kt3lnRWlRyI7t2pjEmqCJMDoHdSFvrqyCOiKFLu-nengq9wP5NqJ5Y5k2p8KlHle12P6U4XxyMzSe6B4LNFbh1rq1Xy7DOD9iigHMqaEzTsuTyZ05yuwuyAVHA7mKL-JqD6EyHA8wKTcKN_T',
    bio: 'Praticien hospitalier et consultant en prévention cardiovasculaire en milieu tropical.',
  },
  date: '14 Nov. 2024',
  recommended: true,
  idealVital: {
    label: 'Tension idéale : 12 / 8',
    sublabel: 'Prise matinale recommandée au repos avant le premier repas',
  },
  content: {
    introduction:
      "L'hypertension artérielle (HTA) constitue la première cause d'accidents vasculaires cérébraux (AVC) et d'insuffisance rénale évitables. Parce qu'elle n'engendre la plupart du temps aucune douleur ni signe avant-coureur, on la surnomme la 'tueuse silencieuse'. Pourtant, quelques réflexes simples adoptés au quotidien permettent d'éviter les complications graves.",
    keyPoints: [
      {
        title: "1. Diviser par deux le sel d'ajout et supprimer les cubes industriels",
        text: "Les bouillons industriels contiennent jusqu'à 60% de chlorure de sodium pur. Privilégiez les aromates naturels riches en antioxydants : ail frais écrasé, graines d'akpi torréfiées, soumara fermenté, feuilles de basilic frais, gingembre et oignons revenus à feu doux.",
        actionTip: "Règle d'or : Ne rajoutez jamais de sel à table avant d'avoir goûté votre plat.",
      },
      {
        title: "2. Adopter la méthode d'automesure selon la 'règle des trois'",
        text: "Pour obtenir un chiffre fiable : asseyez-vous confortablement 5 minutes sans parler ni croiser les jambes. Prenez 3 mesures espacées d'une minute le matin avant le déjeuner, et 3 mesures le soir avant le coucher, pendant 3 jours consécutifs. La moyenne calculée reflète votre vraie pression artérielle.",
        actionTip: "Un brassard de bras est toujours plus précis qu'un tensiomètre de poignet.",
      },
      {
        title: '3. 30 minutes de marche quotidienne sans essoufflement',
        text: "La sédentarité raidit les artères. Une marche modérée et régulière assouplit les parois vasculaires et permet de réduire spontanément la pression systolique de 5 à 8 mmHg, soit l'équivalent de l'action d'un médicament débutant.",
        actionTip: "Marchez le matin à la fraîcheur ou en fin d'après-midi.",
      },
      {
        title: '4. Ne jamais interrompre un traitement sous prétexte qu’on se sent bien',
        text: "L'erreur la plus fréquente constatée par les soignants est d'arrêter son médicament antihypertenseur dès que les maux de tête disparaissent. L'antihypertenseur ne 'guérit' pas l'hypertension définitivement, il la maintient sous contrôle. L'arrêt brutal expose à un rebond hypertensif violent.",
        actionTip: "Utilisez un pilulier hebdomadaire pour sécuriser chaque prise.",
      },
      {
        title: '5. Surveiller conjointement sa fonction rénale et sa glycémie',
        text: "Cœur, rein et vaisseaux forment un trio indissociable. Un bilan sanguin annuel avec dosage de la créatinine et de la glycémie à jeun permet de vérifier que vos organes cibles ne souffrent pas silencieusement.",
        actionTip: "Consultez un médecin traitant au moins une fois par semestre.",
      },
    ],
    localAdvice:
      "Astuce culinaire Epiqure : Pour assaisonner vos poissons et viandes sans sel superflu, réalisez une marinade maison avec jus de citron vert pressé, ail frais, piment doux, un filet d'huile d'olive et des herbes aromatiques. Vos papilles seront régalées et vos artères préservées !",
    scientificFact:
      "Selon l'Organisation Mondiale de la Santé (OMS), réduire l'apport en sel de 5 grammes par jour permet d'éviter 1,7 million de décès cardiovasculaires chaque année dans le monde.",
    conclusion:
      "Prendre soin de son cœur est un engagement accessible à chacun. Parlez-en à votre médecin traitant et partagez ces conseils de bon sens avec vos proches.",
  },
};

export const ARTICLES_LIST: Article[] = [
  {
    id: 'comprendre-sa-glycemie',
    title: "Comprendre sa glycémie : quand s'inquiéter et comment adapter son alimentation locale ?",
    summary:
      "Manioc, attiéké, sauces graines ou feuilles : comment concilier le plaisir de nos plats traditionnels avec l'équilibre glycémique ? Les repères essentiels de nos soignants.",
    category: 'diabete',
    categoryLabel: 'Diabète & Nutrition',
    categoryBadgeClass: 'bg-[#006c4a] text-white',
    readTime: '4 min',
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCN-7biKqYPE5Rf7bKJc7kzgwkov-spTeryRE8dHidQHGRnFCaj55GWAndTMYMhbupiC9M5MIXUp9VlpSW2k7zy1wQ4kx5TR1R3El_xGjO7x1k3OA8TRsUqz5YT-vhzFWREny7wVvvkqfJ7AuE77Wb5b1uI1z7ae8p3apf82KZunpBy6Ybx2Bts-IJlD0pEqGQQIfIC51NRp_hdsMpRLcQfArBWKwwIDjHklxYkNwMlXuCbR66IfGwx',
    imageAlt:
      'Assiette équilibrée et glucomètre affichant un résultat médical sain.',
    author: {
      name: 'Inf. Bamba',
      role: 'Infirmier Clinicien • Équipe Epiqure',
      initials: 'IB',
    },
    date: '10 Nov. 2024',
    content: {
      introduction:
        "La glycémie désigne le taux de glucose (sucre) circulant dans le sang. Lorsque ce taux reste durablement au-dessus des normales (à jeun > 1.26 g/L à deux reprises), on parle de diabète. Comment adapter notre cuisine sans renoncer à nos mets traditionnels ?",
      keyPoints: [
        {
          title: '1. Reconnaître les seuils de référence',
          text: "À jeun, la glycémie normale est comprise entre 0.70 et 1.10 g/L. Deux heures après le début d'un repas, elle doit rester inférieure à 1.40 g/L.",
        },
        {
          title: "2. Maîtriser les portions de féculents (manioc, igname, riz)",
          text: "Les tubercules et féculents ne sont pas interdits, mais doivent occuper au maximum un quart de l'assiette. La moitié de l'assiette doit être constituée de légumes verts et de crudités.",
        },
        {
          title: "3. Privilégier les cuissons douces et les fibres",
          text: "Les fibres solubles contenues dans les feuilles de gombo, d'épinards locaux et les légumes ralentissent l'absorption des glucides et évitent les pics brutaux d'insuline.",
        },
      ],
      localAdvice:
        "Lorsque vous mangez de l'attiéké, accompagnez-le d'une belle portion de poisson braisé riche en oméga-3 et d'une sauce tomate-oignon sans sucre ajouté.",
      conclusion:
        "Le diabète n'est pas une fatalité. Une alimentation diversifiée et une activité physique quotidienne permettent de vivre longtemps en excellente santé.",
    },
  },
  {
    id: 'hydratation-aines-climat-chaud',
    title: "Chaleur et hydratation : pourquoi nos aînés ne ressentent plus la soif et comment les aider ?",
    summary:
      "Avec l'âge, les capteurs cérébraux de la soif s'émoussent. Nos conseils concrets pour prévenir la déshydratation, la confusion mentale et les baisses de tension chez nos aînés.",
    category: 'aines',
    categoryLabel: 'Santé des Aînés',
    categoryBadgeClass: 'bg-[#003fb1] text-white',
    readTime: '3 min',
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBq8x_0GqX2H_aO2Z5sR87G9v5u5fG70B3yT6j0pW9o6k0q7X-8p7xGZg4D9xG3yT6j0pW9o6k0q7X-8p7xGZg4D9xG3yT6j0pW9o6k0q7X-8p7xGZg4D9xG3yT6j0pW9o6k0q7X-8p7xGZg4D9xG3yT6j0pW9o6k0q7X-8p7xGZg4D9xG3yT6j0pW9o6k0q7X-8p7xGZg4D9xG',
    imageAlt:
      "Une carafe d'eau fraîche avec rondelles de citron et verre d'eau posé sur une table en bois.",
    author: {
      name: 'Mme Estelle Sess',
      role: 'Consultante en Gérontologie • Epiqure',
      initials: 'ES',
    },
    date: '08 Nov. 2024',
    content: {
      introduction:
        "En climat tropical chaud et humide, la déshydratation chez la personne âgée peut survenir en moins de 24 heures. Le danger principal réside dans la disparition de la sensation de soif.",
      keyPoints: [
        {
          title: "1. La règle d'un verre d'eau toutes les 2 heures",
          text: "N'attendez pas que le parent réclame à boire. Établissez une routine d'un verre d'eau ou d'infusion tiède à chaque moment clé de la journée.",
        },
        {
          title: "2. Les tisanes locales rafraîchissantes et bienfaisantes",
          text: "Les infusions de kinkeliba léger, de citronnelle fraîche ou d'hibiscus (bissap sans sucre ajouté) sont d'excellentes alternatives pour stimuler l'envie de boire.",
        },
        {
          title: "3. Repérer les signes d'alerte discrets",
          text: "Une somnolence inhabituelle, des lèvres sèches, une peau qui garde le pli, ou des urines foncées doivent immédiatement vous alerter.",
        },
      ],
      localAdvice:
        "Proposez également des fruits gorgés d'eau de saison : papaye mûre, pastèque ou tranches d'oranges fraîches en collation.",
      conclusion:
        "Une hydratation soignée préserve la vigilance intellectuelle et protège la fonction rénale de nos aînés.",
    },
  },
  {
    id: 'bouillons-industriels-alternatives-locales',
    title: 'Bouillons industriels et santé : par quoi les remplacer pour sauver vos artères ?',
    summary:
      "Enquête nutritionnelle : composition cachée des cubes, impact direct sur l'élasticité artérielle et répertoire d'épices naturelles pour sublimer vos sauces sans sel ajouté.",
    category: 'nutrition',
    categoryLabel: 'Nutrition & Saveurs',
    categoryBadgeClass: 'bg-[#ffdad6] text-[#ba1a1a]',
    readTime: '6 min',
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuD-4h1kQ9Z3vX5eG7b-9w8u2t1r0s9f8g7h6j5k4l3m2n1o0p9q8r7s6t5u4v3w2x1y0z9a8b7c6d5e4f3g2h1i0j9k8l7m6n5o4p3q2r1s0t9u8v7w6x5y4z3a2b1c0d9e8f7g6h5i4j3k2l1m0n9o8p7q6r5s4t3u2v1w0x9y8z7a6b5c4d3e2f1g0',
    imageAlt:
      'Assortiment coloré d’épices saines : akpi, soumara, gingembre frais, ail et herbes aromatiques.',
    author: {
      name: 'Dr. Kouamé',
      role: 'Médecin Cardiologue Référent • Rédaction Epiqure',
      avatarUrl:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuDKzgNmOdUkB0jxqE8qX6VDNLpKLivRTWW0PYBKkOOGWYf-Rf6lpYzVSqnYiVDJr7fBik-cBpTqvVpquX8NWDaSdheYuMN2_vK4xVT4kt3lnRWlRyI7t2pjEmqCJMDoHdSFvrqyCOiKFLu-nengq9wP5NqJ5Y5k2p8KlHle12P6U4XxyMzSe6B4LNFbh1rq1Xy7DOD9iigHMqaEzTsuTyZ05yuwuyAVHA7mKL-JqD6EyHA8wKTcKN_T',
    },
    date: '03 Nov. 2024',
    content: {
      introduction:
        "Les cubes d'assaisonnement sont devenus omniprésents dans les cuisines familiales. Pourtant, leur concentration extrême en glutamate de sodium et en sel raffiné perturbe la tension et favorise la rétention d'eau.",
      keyPoints: [
        {
          title: "1. Ce que contient réellement un cube d'assaisonnement",
          text: "Plus de 50 à 60% de sel de table pur, du glutamate monosodique qui altère la perception naturelle des saveurs, des graisses hydrogénées et des arômes de synthèse.",
        },
        {
          title: '2. Le soumara traditionnel : le super-condiment fermenté',
          text: "Issu de la fermentation des graines de néré, le soumara apporte une richesse umami incomparable tout en contenant des probiotiques naturels et zéro gramme de sel de synthèse.",
        },
        {
          title: "3. La poudre d'akpi et de djéssang",
          text: "Ces graines oléagineuses torréfiées apportent du corps, de la texture et un parfum toasté raffiné à vos sauces, sans faire monter la tension d'un millimètre.",
        },
      ],
      localAdvice:
        "Broyez ensemble ail, gingembre, oignons grillés et graines d'akpi séchées. Conservez cette pâte dans un bocal en verre avec une cuillère d'huile au frais : c'est votre cube magique 100% santé !",
      conclusion:
        "Réapprendre à cuisiner avec les vraies épices de notre terroir est le plus beau cadeau que vous puissiez faire à votre cœur.",
    },
  },
  {
    id: 'prevention-paludisme-saison-pluies',
    title: 'Paludisme et saison des pluies : les réflexes de protection des soignants',
    summary:
      "Gîtes larvaires, utilisation rigoureuse des moustiquaires imprégnées, reconnaissance des signes d'alerte et conduite à tenir en cas de fièvre brutale.",
    category: 'saisonnier',
    categoryLabel: 'Prévention Saisonnière',
    categoryBadgeClass: 'bg-[#006c4a] text-white',
    readTime: '4 min',
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDaBQA9wHwsQo96Rcb3crC4pPuJSUq_8KnPVcVQkcViBYbYkKADZn96fWT6DgAtJKsCQ4mZ-T3lYYmlT08a_xIZJvRIVWTdRAwJ1fkr9hTNrAuPY_k1ZF9UUjebQRzbYQ06zLt_LHzFmn_Wf0_NKgU3Tvmp5elgiqFjYI2jRI3ESvHwoJJ0opB75zOObDGevfxXTPFeNEDXWcmf5KzFhmzSD4T_4gSTMTNNbLO4XSA7wS2FpghbZbQ2',
    imageAlt: 'Chambre bien aérée avec moustiquaire imprégnée soigneusement bordée.',
    author: {
      name: 'Inf. Bamba',
      role: 'Infirmier Clinicien • Équipe Epiqure',
      initials: 'IB',
    },
    date: '28 Oct. 2024',
    content: {
      introduction:
        "Le paludisme reste la première cause de consultation médicale. Dès l'apparition de pluies abondantes, la prolifération des anophèles nécessite une vigilance accrue.",
      keyPoints: [
        {
          title: "1. Éliminer chaque flaque et récipient d'eau stagnante",
          text: "Un fond de boîte de conserve, un pneu usagé ou une soucoupe de plante suffisent pour héberger des centaines de larves de moustiques à proximité de votre habitation.",
        },
        {
          title: '2. Border méticuleusement la moustiquaire imprégnée',
          text: "Dormir sous moustiquaire est efficace à 100% si celle-ci est bordée sous le matelas avant la tombée de la nuit et exempte de déchirures.",
        },
        {
          title: "3. Réaliser un TDR (Test de Diagnostic Rapide) dès la première fièvre",
          text: "Ne prenez jamais d'antibiotiques sans diagnostic. Un simple test en goutte épaisse ou bandelette confirme en 15 minutes la présence du parasite.",
        },
      ],
      localAdvice:
        "Portez des vêtements clairs à manches longues le soir lorsque vous êtes assis en extérieur.",
      conclusion:
        "La lutte contre le paludisme commence devant votre porte. Protégeons nos enfants et nos aînés.",
    },
  },
  {
    id: 'chutes-a-domicile-amenager-sa-maison',
    title: 'Prévenir les chutes des aînés : 6 aménagements simples dans la maison',
    summary:
      "Tapis glissants, carrelages mouillés, éclairages tamisés : comment sécuriser la chambre et la salle de bain pour préserver l'autonomie et la dignité de nos parents.",
    category: 'aines',
    categoryLabel: 'Santé des Aînés',
    categoryBadgeClass: 'bg-[#003fb1] text-white',
    readTime: '5 min',
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCN-7biKqYPE5Rf7bKJc7kzgwkov-spTeryRE8dHidQHGRnFCaj55GWAndTMYMhbupiC9M5MIXUp9VlpSW2k7zy1wQ4kx5TR1R3El_xGjO7x1k3OA8TRsUqz5YT-vhzFWREny7wVvvkqfJ7AuE77Wb5b1uI1z7ae8p3apf82KZunpBy6Ybx2Bts-IJlD0pEqGQQIfIC51NRp_hdsMpRLcQfArBWKwwIDjHklxYkNwMlXuCbR66IfGwx',
    imageAlt: 'Couloir intérieur lumineux sans obstacles et sol sécurisé.',
    author: {
      name: 'Mme Estelle Sess',
      role: 'Consultante en Gérontologie • Epiqure',
      initials: 'ES',
    },
    date: '21 Oct. 2024',
    content: {
      introduction:
        "Chez la personne âgée de plus de 65 ans, une chute peut avoir des conséquences dévastatrices sur la mobilité (fracture du col du fémur). Plus de 80% de ces accidents surviennent à l'intérieur du domicile.",
      keyPoints: [
        {
          title: '1. Supprimer les petits tapis sans antidérapant',
          text: "Les tapis de couloir et de descente de lit sont les premiers pièges à chutes. Retirez-les ou fixez-les au sol avec du ruban adhésif double-face puissant.",
        },
        {
          title: '2. Installer une barre d’appui robuste dans les toilettes et la douche',
          text: "Le passage de la position assise à debout représente une phase critique de baisse temporaire de pression sanguine. Une poignée d'appui solidement chevillée apporte un point d'ancrage rassurant.",
        },
        {
          title: '3. Assurer une veilleuse de nuit entre la chambre et les sanitaires',
          text: "La plupart des chutes ont lieu la nuit lors de levers précipités dans l'obscurité. Une veilleuse automatique LED évite de chercher l'interrupteur à tâtons.",
        },
      ],
      localAdvice:
        "Veillez à ce que vos aînés portent des sandales fermées à l'arrière avec semelle en caoutchouc antidérapante, plutôt que des claquettes lâches.",
      conclusion:
        "Adapter le logement n'est pas un aveu de faiblesse, c'est le gage d'une autonomie durable et heureuse au sein de la famille.",
    },
  },
  {
    id: 'sommeil-et-recuperation-adulte',
    title: 'Insomnie et réveils nocturnes : les remèdes naturels pour retrouver un sommeil réparateur',
    summary:
      "Écrans le soir, chaleurs nocturnes, digestion lourde : nos conseils médicaux pour rééquilibrer votre horloge biologique sans somnifères de synthèse.",
    category: 'quotidien',
    categoryLabel: 'Prévention & Quotidien',
    categoryBadgeClass: 'bg-[#3d4b5b] text-white',
    readTime: '4 min',
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBq8x_0GqX2H_aO2Z5sR87G9v5u5fG70B3yT6j0pW9o6k0q7X-8p7xGZg4D9xG3yT6j0pW9o6k0q7X-8p7xGZg4D9xG3yT6j0pW9o6k0q7X-8p7xGZg4D9xG3yT6j0pW9o6k0q7X-8p7xGZg4D9xG3yT6j0pW9o6k0q7X-8p7xGZg4D9xG3yT6j0pW9o6k0q7X-8p7xGZg4D9xG',
    imageAlt: 'Tasse de tisane de kinkeliba chaud et livre posé au chevet pour favoriser le sommeil.',
    author: {
      name: 'Dr. Kouamé',
      role: 'Médecin Cardiologue Référent • Rédaction Epiqure',
      avatarUrl:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuDKzgNmOdUkB0jxqE8qX6VDNLpKLivRTWW0PYBKkOOGWYf-Rf6lpYzVSqnYiVDJr7fBik-cBpTqvVpquX8NWDaSdheYuMN2_vK4xVT4kt3lnRWlRyI7t2pjEmqCJMDoHdSFvrqyCOiKFLu-nengq9wP5NqJ5Y5k2p8KlHle12P6U4XxyMzSe6B4LNFbh1rq1Xy7DOD9iigHMqaEzTsuTyZ05yuwuyAVHA7mKL-JqD6EyHA8wKTcKN_T',
    },
    date: '15 Oct. 2024',
    content: {
      introduction:
        "Un sommeil de mauvaise qualité perturbe la tension artérielle, augmente le taux de cortisol (hormone du stress) et dérègle le métabolisme du sucre. Retrouvez des nuits paisibles grâce à quelques règles simples.",
      keyPoints: [
        {
          title: '1. Éteindre téléphones et écrans 45 minutes avant le coucher',
          text: "La lumière bleue des smartphones inhibe la sécrétion naturelle de mélatonine, l'hormone du sommeil. Préférez la lecture d'un livre ou une discussion calme.",
        },
        {
          title: '2. Dîner léger au moins 2 heures avant de dormir',
          text: "Les repas riches en graisses saturées et piments forts augmentent la température corporelle centrale et rendent l'endormissement difficile.",
        },
        {
          title: '3. Aérer la chambre en soirée',
          text: "Une pièce fraîche et bien ventilée facilite la baisse physiologique de température requise pour entrer en sommeil profond.",
        },
      ],
      localAdvice:
        "Une infusion de feuilles de verveine locale ou de camomille tiède bue 30 minutes avant de se coucher apaise le système nerveux.",
      conclusion:
        "Dormir 7 à 8 heures par nuit est le meilleur médicament préventif au monde. Respectez votre repos !",
    },
  },
];
