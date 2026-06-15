export const INDUSTRIES = [
  { value: "services", label: "Société de Services / Conseil" },
  { value: "retail", label: "Commerce de Détail / E-commerce" },
  { value: "manufacture", label: "Secteur Industriel / Manufacture" },
  { value: "tech", label: "Technologies & Logiciels" },
  { value: "health", label: "Santé et Médical" },
  { value: "b2b", label: "Distribution de Gros & B2B" },
  { value: "construction", label: "Bâtiment / Immobilier / Construction" },
  { value: "other", label: "Autre Secteur" }
];

export const COMPANY_SIZES = [
  { value: "1", label: "Indépendant / Freelance" },
  { value: "2-10", label: "TPE (2 à 10 salariés)" },
  { value: "11-50", label: "PME (11 à 50 salariés)" },
  { value: "51-200", label: "PME Croissance (51 à 200 salariés)" },
  { value: "200+", label: "ETI (Plus de 200 salariés)" }
];

export const MATURITIES = [
  { value: "beginner", label: "Débutant (Saisie manuelle, e-mails standard)" },
  { value: "intermediate", label: "Intermédiaire (Usage de Notion, Slack, formulaires de base)" },
  { value: "advanced", label: "Avancé (Déjà des outils connectés via Zapier ou API)" }
];

export const SAMPLE_CHALLENGES = [
  "Ressaisie manuelle de données clients d'un outil à un autre (perte de temps)",
  "Lenteur de traitement des emails, offres de prix ou requêtes clients",
  "Difficulté à centraliser les documents, factures et fichiers partagés",
  "Pas de visibilité en temps réel sur la performance commerciale ou la production",
  "Tâches administratives lourdes qui empêchent de se focaliser sur la valeur ajoutée",
  "Manque d'automatisation dans le suivi de nos opportunités de ventes"
];

export const FEATURES = [
  {
    title: "Analyse des pertes",
    description: "On calcule avec précision la perte d'heures et d'argent liée aux processus manuels répétitifs chaque année.",
    icon: "AlertTriangle",
  },
  {
    title: "Gains potentiels",
    description: "Évalue les gains d'efficacité opérationnelle de ton entreprise grâce aux recommandations offertes.",
    icon: "TrendingUp",
  },
  {
    title: "3 priorités immédiates",
    description: "Découvre les 3 zones où ton entreprise peut rapidement venir créer du levier et des recommandations concrètes pour y arriver.",
    icon: "Cpu",
  },
  {
    title: "Rapport PDF personnalisé",
    description: "Obtiens instantanément un plan d'action stratégique personnalisé ciblant spécifiquement la catégorie la plus faible identifiée.",
    icon: "FileText",
  }
];

export const HOW_IT_WORKS = [
  {
    step: "01",
    title: "Le Pré-Bilan Digital",
    description: "Remplissez notre outil interactif en 2 minutes pour recevoir une première analyse IA stratégique immédiate."
  },
  {
    step: "02",
    title: "L'audit de cadrage",
    description: "Échange de 30 minutes avec nos experts Huvi Optimisation pour creuser les spécificités de vos goulots opérationnels."
  },
  {
    step: "03",
    title: "La Remise du Plan d'Action",
    description: "Livraison d'un plan d'action clé-en-main détaillant les automatisations, l'architecture recommandée et le ROI attendu."
  },
  {
    step: "04",
    title: "Le Déploiement Agile",
    description: "Développement, interconnexion de vos applications de travail, formation complète de vos collaborateurs."
  }
];

export const FAQS = [
  {
    question: "Le diagnostic est-il gratuit ?",
    answer: "Oui, entièrement. Sans engagement."
  },
  {
    question: "Vais-je recevoir un rapport personnalisé ?",
    answer: "Oui. Les réponses soumises sont analysées pour générer des recommandations adaptées à votre situation."
  },
  {
    question: "On a aucune compétence technique. C'est un problème ?",
    answer: "Non. Le diagnostic est conçu pour les propriétaires et gestionnaires d'entreprise de services résidentiels, peu importe leur niveau technique."
  },
  {
    question: "Combien de temps faut-il consacrer à cet audit ?",
    answer: "L'évaluation initiale sur cette page prend moins de 2 minutes. Si vous décidez de passer à l'audit approfondi, cela nécessite seulement deux réunions de 45 minutes avec votre équipe clé afin de ne pas perturber vos opérations courantes."
  },
  {
    question: "Mes données d'entreprise restent-elles confidentielles ?",
    answer: "Absolument. La sécurité de vos données est notre priorité. Toutes les informations partagées durant le Bilan IA ou l'analyse automatisée sont couvertes par notre charte de confidentialité stricte et ne sont jamais revendues ou exploitées à des fins d'entraînement tierce."
  }
];

export const TESTIMONIALS = [
  {
    quote: "Grâce au Bilan IA de Huvi Optimisation, nous avons automatisé la saisie d'offres de prix et le suivi client. Nous économisons plus de 14 heures de travail répétitif par semaine.",
    author: "Marc-André Girard",
    role: "Propriétaire @ Girard & Associés",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    metrics: "14h libérées / sem"
  },
  {
    quote: "Le plan d'action personnalisé nous a permis d'intégrer des fonctionnalités de traitement sémantique intelligent sur nos factures fournisseurs en 3 semaines seulement. Un ROI immédiat.",
    author: "Mélanie Fontaine",
    role: "Directrice des Opérations @ Logix Group",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80",
    metrics: "Saisie divisée par 4"
  }
];
