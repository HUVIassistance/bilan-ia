import express from "express";
import path from "path";
import dotenv from "dotenv";
import { GoogleGenAI, Type } from "@google/genai";
import { createServer as createViteServer } from "vite";

// Load environment variables
dotenv.config();

// Initialize Express
const app = express();
app.use(express.json());

const PORT = 3000;

// Initialize Gemini client using backend key safely
// Set User-Agent to 'aistudio-build' as required
const geminiApiKey = process.env.GEMINI_API_KEY;
let ai: GoogleGenAI | null = null;

if (geminiApiKey) {
  ai = new GoogleGenAI({
    apiKey: geminiApiKey,
    httpOptions: {
      headers: {
        "User-Agent": "aistudio-build",
      },
    },
  });
} else {
  console.warn("Warning: GEMINI_API_KEY environment variable is not set. Strategic generation will be disabled.");
}

// In-memory lead storage to simulate saving to a database
const leads: any[] = [];

// API: Check health & config
app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    hasGemini: !!ai,
    environment: process.env.NODE_ENV || "development",
  });
});

// API: Process Bilan IA Strategic Action Plan using server-side Gemini
app.post("/api/bilan", async (req, res) => {
  try {
    const { companyName, industry, companySize, challenges, aiMaturity, email } = req.body;

    if (!challenges || !industry) {
      return res.status(400).json({ error: "Les champs 'Secteur d'activité' et 'Défis majeurs' sont obligatoires." });
    }

    if (!ai) {
      // Graceful fallback with comprehensive mock data if API key is not present
      return res.json({
        fallback: true,
        summary: `Bilan préliminaire pour ${companyName || "votre entreprise"} (${industry}). Vos principaux goulots concernent : "${challenges}". Nous préconisons un plan de transition ciblé et pragmatique.`,
        estimatedHoursSavedPerWeek: 8,
        estimatedEfficiencyGainPercent: 35,
        identifiedLosses: [
          {
            title: "Tâches manuelles répétitives",
            description: `Le traitement manuel de vos processus en ${industry} crée des lenteurs et des risques d'erreurs humaines importantes.`,
            financialImpact: "Moyen-Élevé"
          },
          {
            title: "Silos de communication et d'information",
            description: "Les informations précieuses se perdent entre les étapes de vos opérations, limitant ainsi la prise de décision rapide.",
            financialImpact: "Moyen"
          }
        ],
        strategicAxes: [
          {
            title: "Automatisation des flux récurrents",
            description: "Mettre en place des ponts automatiques pour synchroniser et traiter les données sans saisie manuelle.",
            recommendedTools: ["Make (Integromat)", "Zapier", "Trello / Notion"],
            timeToImplement: "2-3 semaines"
          },
          {
            title: "Assistance IA contextuelle",
            description: "Intégrer un assistant de rédaction et d'analyse basé sur des modèles d'IA pour vos équipes de support et de vente.",
            recommendedTools: ["ChatGPT API", "Gemini 3.5 Flash", "Custom LLM Assistant"],
            timeToImplement: "3 semaines"
          }
        ],
        roadmap: [
          {
            phase: "Phase 1 - Diagnostic local",
            title: "Cartographie et alignement des tâches prioritaires",
            actions: [
              "Auditer les flux de travail de l'équipe",
              "Identifier les 3 saisies de données les plus chronophages"
            ],
            duration: "1 semaine"
          },
          {
            phase: "Phase 2 - Automatisation pilote",
            title: "Création d'un premier scénario de connexion automatique",
            actions: [
              "Configurer un flux d'automatisation Make ou n8n sur un processus clé",
              "Former les utilisateurs finaux"
            ],
            duration: "2 semaines"
          },
          {
            phase: "Phase 3 - Déploiement IA",
            title: "Intégration d'outils d'IA générative pour le contenu et le support",
            actions: [
              "Déployer des modèles de réponses IA intelligents",
              "Mesurer l'impact en heures libérées"
            ],
            duration: "3 semaines"
          }
        ],
        keyMetric: {
          label: "Gain de productivité global",
          value: "+35% sur l'année"
        }
      });
    }

    // Build highly optimized structural prompt for Bilan IA
    const prompt = `
      Tu es un expert en audit/bilan stratégique d'Intelligence Artificielle et en optimisation opérationnelle chez Huvi Optimisation.
      Analyse les informations de cette entreprise pour identifier ses lacunes et proposer un plan d'action de transformation par l'IA et l'automatisation.

      Informations de l'entreprise :
      - Nom optionnel : ${companyName || "Non spécifié"}
      - Secteur opérationnel : ${industry}
      - Taille de l'équipe : ${companySize || "PME"}
      - Lacunes / Obstacles / Défis majeurs : ${challenges}
      - Maturité numérique de l'équipe : ${aiMaturity || "Débutant"}

      Génère un Bilan IA stratégique, réaliste, pragmatique et attrayant.
      Toutes les valeurs doivent être rédigées en Français. La réponse doit respecter scrupuleusement la structure JSON demandée.

      Instructions concernant les estimations :
      - Calcule une estimation réaliste d'heures perdues récupérables (estimatedHoursSavedPerWeek) sous forme de nombre (par exemple entre 6 et 18 heures).
      - Estime les gains de productivité globaux en pourcentage (estimatedEfficiencyGainPercent) sous forme de nombre (par exemple entre 20 et 55%).
      - Remplis minutieusement identifedLosses (au moins 2 pertes identifiées), strategicAxes (au moins 2 axes clés avec solutions d'outils no-code/IA réels comme Make, n8n, Gemini, LangChain, Airtable, etc.), et roadmap (un plan séquentiel en 3 phases claires).
      - Remplis la métrique clé clé (keyMetric) avec un label accrocheur (ex: "Temps libéré moyen par collaborateur") et une valeur marquante (ex: "1.5 jour récupéré / mois").
    `;

    // Define strict response schema for reliable frontend parsing
    const schema = {
      type: Type.OBJECT,
      properties: {
        summary: {
          type: Type.STRING,
          description: "Résumé stratégique et encourageant du bilan IA pour l'entreprise."
        },
        estimatedHoursSavedPerWeek: {
          type: Type.INTEGER,
          description: "Heures économisées par semaine estimées pour l'équipe (ex: 12)."
        },
        estimatedEfficiencyGainPercent: {
          type: Type.INTEGER,
          description: "Pourcentage de gains d'efficacité globale attendus (ex: 40)."
        },
        identifiedLosses: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              title: { type: Type.STRING, description: "Nom de la perte ou lacune identifiée" },
              description: { type: Type.STRING, description: "Explication claire du goulot d'étranglement et de son impact opérationnel" },
              financialImpact: { type: Type.STRING, description: "Intensité de l'impact financier (ex: critique, élevé, modéré ou estimation chiffrée)" }
            },
            required: ["title", "description", "financialImpact"]
          }
        },
        strategicAxes: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              title: { type: Type.STRING, description: "Titre de l'axe de développement (ex: Automatisation Administrative)" },
              description: { type: Type.STRING, description: "Comment l'IA ou l'automatisation résout ce problème précis" },
              recommendedTools: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
                description: "Noms d'outils existants réels adaptés (ex: ['n8n', 'Make.com', 'Airtable', 'Gemini Code'])"
              },
              timeToImplement: { type: Type.STRING, description: "Délai estimé de déploiement (ex: 2 semaines, 1 mois)" }
            },
            required: ["title", "description", "recommendedTools", "timeToImplement"]
          }
        },
        roadmap: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              phase: { type: Type.STRING, description: "Titre ou numéro de la phase (ex: Phase 1: Lancement)" },
              title: { type: Type.STRING, description: "Objectif majeur de la phase" },
              actions: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
                description: "Sous-tâches concrètes à mener"
              },
              duration: { type: Type.STRING, description: "Durée estimée de la phase (ex: 10 jours, 2 semaines)" }
            },
            required: ["phase", "title", "actions", "duration"]
          }
        },
        keyMetric: {
          type: Type.OBJECT,
          properties: {
            label: { type: Type.STRING, description: "Libellé de la mesure phare (ex: Retour sur investissement estimé)" },
            value: { type: Type.STRING, description: "Valeur ou phrase d'impact (ex: de 3 à 5x le coût initial)" }
          },
          required: ["label", "value"]
        }
      },
      required: [
        "summary",
        "estimatedHoursSavedPerWeek",
        "estimatedEfficiencyGainPercent",
        "identifiedLosses",
        "strategicAxes",
        "roadmap",
        "keyMetric"
      ]
    };

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: schema,
        temperature: 0.7,
      },
    });

    const outputText = response.text;
    if (!outputText) {
      throw new Error("Gemini returned an empty response.");
    }

    const report = JSON.parse(outputText.trim());

    // Save lead details to our in-memory list
    leads.push({
      companyName,
      industry,
      companySize,
      challenges,
      aiMaturity,
      email,
      report,
      createdAt: new Date().toISOString()
    });

    res.json(report);
  } catch (error: any) {
    console.error("Error generating strategic plan:", error);
    res.status(500).json({ error: "Une erreur est survenue lors de la génération de votre plan stratégique. Veuillez réessayer." });
  }
});

// API: Lead generation / Booking Consultation
app.post("/api/contact", (req, res) => {
  const { name, email, phone, company, message, reportSummary } = req.body;

  if (!email || !name) {
    return res.status(400).json({ error: "Le nom et l'adresse e-mail sont obligatoires." });
  }

  const newLead = {
    id: `lead_${Date.now()}`,
    name,
    email,
    phone: phone || "Non renseigné",
    company: company || "Non renseigné",
    message: message || "Intérêt pour un Bilan IA approfondi.",
    reportSummary,
    createdAt: new Date().toISOString(),
  };

  leads.push(newLead);
  console.log("Nouveau lead Hubi Optimisation reçu :", newLead);

  res.json({
    success: true,
    message: "Votre demande de consultation a bien été enregistrée. Un expert de Huvi Optimisation vous contactera sous 24h ouvrées !",
    leadId: newLead.id
  });
});

// API: Retrieve leads list (mostly for simulation or verification)
app.get("/api/leads", (req, res) => {
  res.json(leads);
});

// Vite middleware & Static Serving integration
async function startServer() {
  // Integrate Vite for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    // Serve production static assets from dist
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Bilan IA Service running on port ${PORT}`);
    console.log(`Development preview accessible via http://localhost:${PORT}`);
  });
}

startServer();
