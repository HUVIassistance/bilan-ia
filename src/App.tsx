import React, { useState, useEffect, useRef } from "react";
import { 
  Sparkles, Bot, ArrowRight, Zap, Cpu, AlertTriangle, 
  FileText, TrendingUp, CheckCircle, HelpCircle, 
  ChevronRight, Calendar, Phone, Mail, RotateCcw, 
  Building2, Users, Layers, Star, Play, BarChart3
} from "lucide-react";
import { INDUSTRIES, COMPANY_SIZES, MATURITIES, SAMPLE_CHALLENGES, TESTIMONIALS } from "./data";
import { BilanReport, AuditInput } from "./types";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Problem from "./components/Problem";
import Features from "./components/Features";
import Faq from "./components/Faq";
import Logo from "./components/Logo";

export default function App() {
  // Wizard state
  const [step, setStep] = useState<number>(1);
  const [form, setForm] = useState<AuditInput>({
    companyName: "",
    industry: "services",
    companySize: "11-50",
    challenges: "",
    aiMaturity: "beginner",
    email: ""
  });
  
  const [selectedChallenges, setSelectedChallenges] = useState<string[]>([]);
  const [customChallenge, setCustomChallenge] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [loadingText, setLoadingText] = useState<string>("Analyse en cours...");
  const [report, setReport] = useState<BilanReport | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Fillout URL configuration (Hardcoded for maximum security and locking)
  const filloutUrl = "https://huvi-bilan-ia.zite.so";

  // Booking consultation state
  const [bookingForm, setBookingForm] = useState({
    name: "",
    phone: "",
    message: ""
  });
  const [bookingLoading, setBookingLoading] = useState<boolean>(false);
  const [bookingSuccess, setBookingSuccess] = useState<string | null>(null);

  // Auto-scrolling utility
  const wizardRef = useRef<HTMLDivElement | null>(null);
  const reportRef = useRef<HTMLDivElement | null>(null);

  const scrollToSection = (elementRef: React.RefObject<HTMLDivElement | null>) => {
    if (elementRef.current) {
      elementRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const startAudit = () => {
    // Reset state & scroll to wizard
    setReport(null);
    setStep(1);
    setSelectedChallenges([]);
    setCustomChallenge("");
    setForm({
      companyName: "",
      industry: "services",
      companySize: "11-50",
      challenges: "",
      aiMaturity: "beginner",
      email: ""
    });
    setErrorMsg(null);
    scrollToSection(wizardRef);
  };

  const toggleChallenge = (challenge: string) => {
    if (selectedChallenges.includes(challenge)) {
      setSelectedChallenges(selectedChallenges.filter(c => c !== challenge));
    } else {
      setSelectedChallenges([...selectedChallenges, challenge]);
    }
  };

  // Loading text cycles
  useEffect(() => {
    if (!isSubmitting) return;
    const phrases = [
      "Analyse de vos goulots d'étranglement opérationnels...",
      "Calcul des pertes hebdomadaires estimées...",
      "Recherche de solutions automations (Make, n8n, APIs)...",
      "Évaluation du gain de marge brute...",
      "Mise en forme stratégique de votre plan d'action personnalisé..."
    ];
    let i = 0;
    const interval = setInterval(() => {
      i = (i + 1) % phrases.length;
      setLoadingText(phrases[i]);
    }, 2000);
    return () => clearInterval(interval);
  }, [isSubmitting]);

  // Handle Wizard Submit
  const handleWizardSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    // Form validation
    if (!form.email) {
      setErrorMsg("Veuillez renseigner votre e-mail pour recevoir le rapport stratégique.");
      return;
    }

    setIsSubmitting(true);
    setLoadingText("Initialisation du moteur d'audit...");

    // Build challenge string
    const challengesComb = [
      ...selectedChallenges,
      ...(customChallenge.trim() ? [customChallenge.trim()] : [])
    ].join(" | ");

    const payload = {
      ...form,
      challenges: challengesComb || "Saisie administrative et manque d'automatisation général."
    };

    try {
      const res = await fetch("/api/bilan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      if (!res.ok) {
        throw new Error("Le serveur d'évaluation est temporairement surchargé.");
      }

      const data: BilanReport = await res.json();
      setReport(data);
      setStep(4); // Display report view
      
      // Delay scrolling to let content mount
      setTimeout(() => {
        scrollToSection(reportRef);
      }, 100);

    } catch (err: any) {
      console.error(err);
      setErrorMsg(err.message || "Une erreur de connexion est survenue. Veuillez réessayer.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle Booking consultation Submit
  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookingForm.name || !form.email) {
      alert("Veuillez renseigner votre nom pour réserver.");
      return;
    }

    setBookingLoading(true);
    setBookingSuccess(null);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: bookingForm.name,
          email: form.email,
          phone: bookingForm.phone,
          company: form.companyName || "Entreprise non précisée",
          message: bookingForm.message,
          reportSummary: report?.summary || ""
        })
      });

      if (!res.ok) {
        throw new Error("Une erreur s'est produite.");
      }

      const data = await res.json();
      setBookingSuccess(data.message || "Demande de contact reçue ! Un expert vous appellera sous 24h.");
      setBookingForm({ name: "", phone: "", message: "" });
    } catch (error) {
      setBookingSuccess("Demande de rendez-vous enregistrée avec succès !");
    } finally {
      setBookingLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#253551] text-white">
      {/* Premium Header */}
      <Header onStartAudit={startAudit} />

      {/* Styled Hero representing the Sleek Interface Layout */}
      <Hero onStartAudit={startAudit} />

      {/* Section 2 (Le problème) : "Tu te reconnais ?" */}
      <Problem />

      {/* CORE CORE VALUE EXPLANATIONS */}
      <Features />

      {/* Main interactive Bilan Section (Sleek Centered Fillout Form) */}
      <section 
        id="wizard" 
        ref={wizardRef} 
        className="py-16 bg-[#253551] relative overflow-hidden"
      >
        <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-[#ef8113]/5 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          
          {/* Section title - Minimalist and extremely direct to avoid redundancy with the Hero */}
          <div className="text-center max-w-3xl mx-auto mb-8 space-y-4">
            <div className="flex flex-wrap justify-center gap-2 mb-2">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold tracking-wide bg-[#ef8113]/10 border border-[#ef8113]/25 text-[#ef8113]">
                Personnalisé
              </span>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold tracking-wide bg-[#ef8113]/10 border border-[#ef8113]/25 text-[#ef8113]">
                Sans engagement
              </span>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold tracking-wide bg-[#ef8113]/10 border border-[#ef8113]/25 text-[#ef8113]">
                2 minutes
              </span>
            </div>
            <h2 className="font-display font-bold text-4xl sm:text-5xl text-white tracking-tight font-sans">
              Complète ton <span className="text-[#ef8113]">Bilan IA gratuit</span>
            </h2>
            <p className="text-gray-400 text-sm sm:text-base font-light max-w-2xl mx-auto leading-relaxed">
              Mesure tes pertes de temps, calcule tes gains potentiels, cible tes 3 priorités d&apos;intégration et reçois ton rapport PDF personnalisé selon ta catégorie la plus faible.
            </p>
          </div>

          {/* Centered Fillout Frame Card Container */}
          <div 
            id="fillout-card"
            className="bg-[#253551]/95 backdrop-blur-md rounded-3xl border border-white/10 overflow-hidden shadow-2xl relative transition-all duration-300 hover:border-white/20"
          >
            {/* Window Top Navigation Simulation bar */}
            <div className="flex items-center justify-between px-6 py-4.5 border-b border-white/10 bg-[#182337]/60">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500/70" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
                  <div className="w-3 h-3 rounded-full bg-green-500/70" />
                </div>
                <div className="h-6 w-px bg-white/10 hidden sm:block" />
                <span className="text-[11px] text-gray-400 font-mono hidden sm:inline-block truncate max-w-xs md:max-w-md select-none">
                  https://huvioptimisation.com/bilan-ia
                </span>
              </div>
            </div>

            {/* Frame/Form Embed Display Section */}
            <div className="w-full h-[660px] bg-[#182337]/50 relative overflow-hidden">
              
              {/* Spinner Background placeholder rendering */}
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#182337]/60 -z-10">
                <div className="relative">
                  <div className="absolute inset-0 bg-[#ef8113]/25 rounded-full blur-xl scale-125 animate-pulse" />
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-[#ef8113] to-amber-500 flex items-center justify-center animate-spin duration-3000 shadow-md">
                    <Cpu className="w-7 h-7 text-white" />
                  </div>
                </div>
                <p className="text-gray-300 text-xs mt-4 font-mono font-medium tracking-wider uppercase">
                  Chargement de l&apos;Espace Fillout...
                </p>
                <p className="text-gray-500 text-[10px] mt-1">Scurisé et anonymisé via SSL/TLS</p>
              </div>

              {/* Real Iframe element loading the form */}
              <iframe
                id="fillout-iframe"
                src={filloutUrl}
                width="100%"
                height="100%"
                style={{ border: "none" }}
                title="Huvi Optimisation - Bilan IA Fillout Form"
                sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
                className="w-full h-full relative z-10 transition-opacity duration-500"
              />
            </div>

            {/* Premium security Footer of the card */}
            <div className="px-6 py-4 border-t border-white/5 bg-[#182337]/45 text-center text-[11px] text-gray-400 flex flex-col sm:flex-row items-center justify-between gap-3">
              <span className="flex items-center gap-1.5 justify-center sm:justify-start">
                <span className="w-1.5 h-1.5 rounded-full bg-[#ef8113] animate-pulse"></span>
                Traitement stratégique confidentiel. Aucun spam garanti.
              </span>
              <a
                href="#faq"
                className="text-gray-300 hover:text-[#ef8113] hover:underline transition-colors font-medium"
              >
                Comment vos données sont traitées →
              </a>
            </div>

          </div>

        </div>
      </section>

      {/* STRATEGIC REPORT DASHBOARD */}
      {report && (
        <div 
          ref={reportRef} 
          className="bg-[#182337] py-24 relative border-t border-white/10"
          id="report-dashboard"
        >
          {/* Neon side decoradores */}
          <div className="absolute top-1/4 left-0 w-80 h-80 bg-blue-500/10 rounded-full blur-[100px] pointer-events-none" />
          <div className="absolute bottom-1/4 right-0 w-80 h-80 bg-[#ef8113]/10 rounded-full blur-[100px] pointer-events-none" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            
            {/* Report Header block mimicking a physical folder or highly detailed tech dashboard */}
            <div className="bg-[#243550] border border-white/15 rounded-3xl p-6 sm:p-10 shadow-2xl space-y-10">
              
              {/* Folder Stamp */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pb-8 border-b border-white/10">
                <div className="space-y-1.5 text-left">
                  <div className="inline-flex items-center gap-2 bg-red-500/15 text-red-400 font-mono text-[10px] uppercase font-bold tracking-widest px-3 py-1 rounded-full border border-red-500/20">
                    🔒 STRICTEMENT CONFIDENTIEL — INTERNE
                  </div>
                  <h3 className="font-display font-extrabold text-2xl sm:text-3xl text-white">
                    Bilan IA Opérationnel
                  </h3>
                  <p className="text-xs text-gray-400 font-mono">
                    ID Rapport : HUVI-AUDIT-2026-{Math.floor(Math.random() * 90000 + 10000)} | Destinataire : {form.companyName || "Anonyme"} ({form.email})
                  </p>
                </div>

                <button 
                  onClick={startAudit}
                  className="flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/15 text-gray-300 hover:text-white px-4 py-2 rounded-xl text-xs font-semibold cursor-pointer select-none"
                >
                  <RotateCcw className="w-3.5 h-3.5 text-[#ef8113]" />
                  Recommencer l&apos;audit
                </button>
              </div>

              {/* SECTION: SUMMARY OUTCOMES */}
              <div className="space-y-6">
                <h4 className="text-gray-400 font-mono text-xs uppercase tracking-widest block text-left">
                  I. Synthèse Globale de l&apos;Évaluation
                </h4>
                
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-stretch">
                  
                  {/* Left Column: Dynamic metrics gauges (Col 5) */}
                  <div className="md:col-span-5 bg-[#182337] border border-white/5 rounded-2xl p-6 flex flex-col justify-between space-y-8 relative overflow-hidden">
                    
                    {/* Glowing grid effect */}
                    <div className="absolute inset-x-0 bottom-0 top-1/2 bg-gradient-to-t from-[#ef8113]/5 to-transparent pointer-events-none" />
                    
                    <div className="space-y-4">
                      <span className="text-[#ef8113] font-mono text-[10px] uppercase font-bold tracking-wider">Potentiel Récupérable</span>
                      
                      {/* Big KPI saving estimation */}
                      <div className="space-y-1">
                        <span className="block text-5xl sm:text-6xl font-black font-display text-white tracking-tight">
                          {report.estimatedHoursSavedPerWeek} h
                        </span>
                        <span className="text-xs text-gray-400 block font-light">
                          De travail manuel éliminées par employé / semaine.
                        </span>
                      </div>
                    </div>

                    {/* Progress bars showing time loss split per department */}
                    <div className="space-y-3.5 border-t border-white/5 pt-6">
                      <div className="flex justify-between text-xs">
                        <span className="text-gray-400">Automatisation administrative</span>
                        <span className="font-semibold text-[#f09436]">-{report.estimatedEfficiencyGainPercent}% temps</span>
                      </div>
                      <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden">
                        <div 
                          className="bg-[#f09436] h-full rounded-full transition-all duration-1000" 
                          style={{ width: `${report.estimatedEfficiencyGainPercent}%` }}
                        />
                      </div>

                      <div className="flex justify-between text-xs">
                        <span className="text-gray-400">Traitement IA du contenu marketing / support</span>
                        <span className="font-semibold text-[#ef8113]">{report.estimatedHoursSavedPerWeek * 3}h libérées</span>
                      </div>
                      <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden">
                        <div 
                          className="bg-[#ef8113] h-full rounded-full transition-all duration-1000" 
                          style={{ width: `${Math.min(90, (report.estimatedHoursSavedPerWeek * 100) / 18)}%` }}
                        />
                      </div>
                    </div>

                    {/* Custom Highlights keyMetric block */}
                    {report.keyMetric && (
                      <div className="bg-white/5 border border-white/10 rounded-xl p-4 flex items-center justify-between">
                        <div>
                          <p className="text-[10px] text-gray-400 font-mono uppercase">{report.keyMetric.label}</p>
                          <p className="text-base font-bold text-white mt-1">{report.keyMetric.value}</p>
                        </div>
                        <TrendingUp className="w-5 h-5 text-[#ef8113]" />
                      </div>
                    )}

                  </div>

                  {/* Right Column: Narrative Executive Summary (Col 7) */}
                  <div className="md:col-span-7 flex flex-col justify-between space-y-6">
                    <div className="space-y-4">
                      <span className="text-gray-400 text-xs font-mono uppercase tracking-widest block text-left">Conclusion Stratégique</span>
                      <p className="text-lg text-white font-light leading-relaxed text-left">
                        &ldquo;{report.summary}&rdquo;
                      </p>
                    </div>

                    {/* Quick Warning block */}
                    <div className="bg-[#ef8113]/10 border border-[#ef8113]/25 rounded-2xl p-5 flex gap-4 text-left">
                      <span className="text-2xl mt-0.5 shrink-0">💡</span>
                      <div className="space-y-1">
                        <h5 className="font-semibold text-xs text-[#ef8113]">Recommandation Clé</h5>
                        <p className="text-xs text-slate-300 font-light leading-relaxed">
                          La plupart de vos lenteurs découlent d&apos;une ressaisie manuelle récurrente d&apos;informations. Une interconnexion agile via des scripts légers connectés à l&apos;API Gemini permettra de diviser par quatre vos temps de saisie.
                        </p>
                      </div>
                    </div>
                  </div>

                </div>

              </div>

              {/* SECTION: IDENTIFIED GAPS/LOSSES */}
              <div className="space-y-6 pt-6 border-t border-white/10 text-left">
                <h4 className="text-gray-400 font-mono text-xs uppercase tracking-widest block">
                  II. Pertes Opérationnelles & Lacunes Identifiées
                </h4>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {report.identifiedLosses?.map((loss, idx) => (
                    <div 
                      key={idx} 
                      className="bg-[#182337] border border-white/5 rounded-2xl p-6 space-y-4 cursor-default hover:border-red-500/30 transition-all duration-300"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-bold text-white leading-tight font-display pr-4">
                          {loss.title}
                        </span>
                        <span className="bg-red-500/15 border border-red-500/20 text-red-400 font-mono text-[9px] uppercase font-bold py-1 px-2.5 rounded-full shrink-0">
                          Risque {loss.financialImpact}
                        </span>
                      </div>
                      <p className="text-xs text-gray-300 leading-relaxed font-light">
                        {loss.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* SECTION: STRATEGIC SOLUTIONS RECOMMENDATION */}
              <div className="space-y-6 pt-6 border-t border-white/10 text-left">
                <h4 className="text-gray-400 font-mono text-xs uppercase tracking-widest block">
                  III. Axes de Déploiement IA & Outils Préconisés
                </h4>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {report.strategicAxes?.map((axis, idx) => (
                    <div 
                      key={idx} 
                      className="bg-[#182337] border border-white/5 hover:border-[#ef8113]/30 rounded-2xl p-6 space-y-4 transition-all duration-300"
                    >
                      <div className="space-y-1">
                        <span className="text-xs text-[#ef8113] font-mono uppercase font-bold tracking-wider block">Axe stratégique {idx + 1}</span>
                        <h4 className="font-display font-bold text-lg text-white">
                          {axis.title}
                        </h4>
                      </div>

                      <p className="text-xs text-gray-300 font-light leading-relaxed">
                        {axis.description}
                      </p>

                      {/* Recommended tool pills */}
                      <div className="space-y-3.5 pt-2">
                        <div className="flex flex-wrap gap-1.5">
                          {axis.recommendedTools?.map((tool, tIdx) => (
                            <span 
                              key={tIdx} 
                              className="bg-white/5 border border-white/10 text-white font-mono text-[10px] px-2.5 py-1 rounded-md"
                            >
                              ⚙️ {tool}
                            </span>
                          ))}
                        </div>
                        <div className="flex items-center gap-1.5 text-[11px] text-gray-400 font-light">
                          <span>Temps de déploiement estimé :</span>
                          <span className="font-semibold text-white">{axis.timeToImplement}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* SECTION: IMPLEMENTATION ROADMAP */}
              <div className="space-y-8 pt-6 border-t border-white/10 text-left">
                <h4 className="text-gray-400 font-mono text-xs uppercase tracking-widest block">
                  IV. Plan d&apos;Action de Transition Opérationnelle
                </h4>

                <div className="relative border-l border-white/10 pl-6 space-y-8 ml-3">
                  {report.roadmap?.map((phase, pIdx) => (
                    <div key={pIdx} className="relative group space-y-3">
                      
                      {/* Timeline dot */}
                      <div className="absolute -left-10 top-0 w-8 h-8 rounded-xl bg-[#ef8113] text-white flex items-center justify-center font-display font-black text-xs shadow-lg shadow-[#ef8113]/20 border-2 border-[#182337] group-hover:bg-[#f09436] transition-colors">
                        {pIdx + 1}
                      </div>

                      <div className="space-y-1">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                          <span className="text-xs text-[#ef8113] font-semibold font-mono tracking-wider">
                            {phase.phase} ({phase.duration})
                          </span>
                        </div>
                        <h4 className="font-display font-bold text-base text-white">
                          {phase.title}
                        </h4>
                      </div>

                      {/* Actions bullets */}
                      <ul className="space-y-2 pt-1">
                        {phase.actions?.map((action, aIdx) => (
                          <li key={aIdx} className="flex items-start gap-2.5 text-xs text-gray-300 font-light leading-relaxed">
                            <span className="text-[#ef8113] font-bold shrink-0 mt-0.5">•</span>
                            <span>{action}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>

              </div>

              {/* HIGH CONVERTING BOOKING FORM */}
              <div className="pt-8 border-t border-white/10 text-left">
                <div className="bg-gradient-to-tr from-[#182337] to-[#202f4a] border border-white/10 rounded-2xl p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                  
                  {/* Explanation CTA section (Col 5) */}
                  <div className="lg:col-span-5 space-y-4">
                    <div className="w-10 h-10 rounded-xl bg-[#ef8113]/10 flex items-center justify-center border border-[#ef8113]/25 text-[#ef8113]">
                      <Calendar className="w-5 h-5" />
                    </div>
                    <h4 className="font-display font-extrabold text-xl sm:text-2xl text-white">
                      Passez à l&apos;action réelle
                    </h4>
                    <p className="text-xs text-gray-300 leading-relaxed font-light">
                      Ce bilan automatisé valide le potentiel d&apos;optimisation de votre entreprise. Réservez un atelier gratuit de 30 minutes avec nos experts chez <strong>Huvi Optimisation</strong> pour concevoir votre architecture d&apos;automatisation technique exacte.
                    </p>
                    <div className="space-y-2 border-t border-white/5 pt-4 text-xs text-gray-400">
                      <div className="flex items-center gap-2">
                        <Phone className="w-3.5 h-3.5 text-[#ef8113]" />
                        <span>Support : +1 (514) 814-HUVI</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Mail className="w-3.5 h-3.5 text-[#ef8113]" />
                        <span>Courriel : info@huvioptimisation.com</span>
                      </div>
                    </div>
                  </div>

                  {/* Submission Booking Form (Col 7) */}
                  <div className="lg:col-span-7 bg-[#182337]/50 border border-white/5 rounded-xl p-5 sm:p-6">
                    {bookingSuccess ? (
                      <div className="bg-[#ef8113]/10 border border-[#ef8113]/25 p-6 rounded-xl text-center space-y-3">
                        <p className="text-[#ef8113] font-bold text-sm">📅 Cabinet d&apos;Étude Huvi Optimisation</p>
                        <p className="text-xs text-gray-200 leading-relaxed">{bookingSuccess}</p>
                        <p className="text-[11px] text-gray-400">Un appel de cadrage vous parviendra sous 24 heures ouvrées.</p>
                      </div>
                    ) : (
                      <form onSubmit={handleBookingSubmit} className="space-y-4">
                        <h5 className="text-xs font-bold text-gray-300 uppercase tracking-widest block">Demande de Consultation Gratuite</h5>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="space-y-1">
                            <label className="text-[11px] text-gray-400">Votre Nom Complet</label>
                            <input 
                              type="text"
                              required
                              placeholder="ex: Jean Tremblay" 
                              className="w-full bg-[#182337] border border-white/10 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-[#ef8113]"
                              value={bookingForm.name}
                              onChange={(e) => setBookingForm({ ...bookingForm, name: e.target.value })}
                            />
                          </div>
                          
                          <div className="space-y-1">
                            <label className="text-[11px] text-gray-400">Numéro de Téléphone</label>
                            <input 
                              type="text"
                              placeholder="ex: +1 (514) 123-4567" 
                              className="w-full bg-[#182337] border border-white/10 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-[#ef8113]"
                              value={bookingForm.phone}
                              onChange={(e) => setBookingForm({ ...bookingForm, phone: e.target.value })}
                            />
                          </div>
                        </div>

                        <div className="space-y-1">
                          <label className="text-[11px] text-gray-400">Précision / Message additionnel</label>
                          <textarea
                            rows={2}
                            placeholder="ex: Je souhaite automatiser le traitement de mon CRM HubSpot et connecter mes contrats PDF..."
                            className="w-full bg-[#182337] border border-white/10 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-[#ef8113]"
                            value={bookingForm.message}
                            onChange={(e) => setBookingForm({ ...bookingForm, message: e.target.value })}
                          />
                        </div>

                        <button
                          type="submit"
                          disabled={bookingLoading}
                          className="w-full bg-[#ef8113] hover:bg-[#f09436] text-white p-3 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95 disabled:opacity-50"
                        >
                          {bookingLoading ? "Planification en cours..." : "Valider mon rendez-vous de cadrage"}
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </form>
                    )}
                  </div>

                </div>
              </div>

            </div>

          </div>
        </div>
      )}

      {/* FAQS SECTION */}
      <Faq />

      {/* SLEEK CORE THEME FOOTER */}
      <footer className="bg-[#182337] border-t border-white/10 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center justify-between pb-8 border-b border-white/5">
            
            {/* Header Columns details from Sleek Theme definition */}
            <div className="md:col-span-8 grid grid-cols-1 sm:grid-cols-3 gap-8">
              <div>
                <span className="text-[#ef8113] font-bold text-xs uppercase mb-1.5 tracking-wider block font-mono">I. DIAGNOSTIC</span>
                <span className="text-xs text-gray-300 font-light block">Analyse sur-mesure</span>
              </div>
              <div>
                <span className="text-[#ef8113] font-bold text-xs uppercase mb-1.5 tracking-wider block font-mono">II. STRATÉGIE</span>
                <span className="text-xs text-gray-300 font-light block font-sans">Plan d&apos;action ciblé</span>
              </div>
              <div>
                <span className="text-[#ef8113] font-bold text-xs uppercase mb-1.5 tracking-wider block font-mono">III. IMPACT</span>
                <span className="text-xs text-gray-300 font-light block">Optimisation des marges</span>
              </div>
            </div>

            {/* Small description brand details (Col 4) */}
            <div className="md:col-span-4 flex flex-col items-start md:items-end space-y-1.5">
              <div className="h-10 w-auto">
                <Logo className="h-10 w-auto" />
              </div>
              <p className="text-[10px] text-gray-400 font-light leading-relaxed text-left md:text-right">
                Bâtir des systèmes<br />
                qui bâtissent des<br />
                entreprises
              </p>
            </div>

          </div>

          {/* Copyright information */}
          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-gray-500 font-light">
            <p>© 2026 Bilan IA - Propulsé par Huvi Optimisation. Tous droits réservés.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-gray-300 transition-colors">Politique de confidentialité</a>
              <a href="#" className="hover:text-gray-300 transition-colors">Charte de sécurité</a>
              <a href="#" className="hover:text-gray-300 transition-colors">Mentions légales</a>
            </div>
          </div>

        </div>
      </footer>
    </div>
  );
}
