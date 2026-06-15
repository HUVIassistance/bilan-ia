import { ArrowRight, Bot, Cpu, TrendingUp, Zap } from "lucide-react";

interface HeroProps {
  onStartAudit: () => void;
}

export default function Hero({ onStartAudit }: HeroProps) {
  return (
    <section className="relative pt-32 pb-24 md:pt-40 md:pb-32 overflow-hidden bg-[#253551]">
      {/* Background Decorative Circles/Glows */}
      <div className="absolute top-1/4 left-1/10 w-96 h-96 bg-[#ef8113]/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-10 right-1/10 w-80 h-80 bg-blue-500/10 rounded-full blur-[100px] pointer-events-none" />

      {/* Grid pattern overlay */}
      <div 
        className="absolute inset-0 opacity-[0.02]" 
        style={{
          backgroundImage: `radial-gradient(#ffffff 1px, transparent 1px)`,
          backgroundSize: "24px 24px"
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Centered Heading Section */}
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto space-y-6 mb-16">
          
          {/* Elegant multi-pill badges directly inspired by the Nexus-style reference image, using pure brand colors */}
          <div className="flex flex-wrap gap-2.5 items-center justify-center">
            <span className="inline-flex items-center px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide bg-[#ef8113]/15 border border-[#ef8113]/35 text-[#ef8113]">
              Services résidentiels
            </span>
            <span className="inline-flex items-center px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide bg-[#ef8113]/20 border border-[#ef8113]/40 text-[#ef8113]">
              Construction
            </span>
            <span className="inline-flex items-center px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide bg-[#ef8113]/10 border border-[#ef8113]/25 text-[#ef8113]">
              PME Services
            </span>
          </div>

          {/* Main Premium Heading made bigger and centered */}
          <h1 className="font-display font-black text-4xl sm:text-6xl lg:text-7xl text-white tracking-tight leading-tight max-w-5xl">
            Combien de temps et d&apos;argent ton entreprise <br className="hidden md:inline" />
            <span className="text-[#ef8113]">perd-elle chaque année sans l&apos;IA ?</span>
          </h1>

          {/* Subtext - Centered and spacious */}
          <p className="text-lg sm:text-xl text-gray-300 font-light leading-relaxed max-w-3xl">
            Bilan IA = 2 minutes + pertes financières cachées + opportunités IA + guide PDF personnalisé
          </p>

          {/* Call to Actions - Centered */}
          <div className="flex justify-center pt-4 w-full">
            <a
              href="#wizard"
              className="inline-flex items-center justify-center gap-2 bg-[#ef8113] hover:bg-[#f09436] text-white px-8 py-4 rounded-xl font-extrabold text-xs uppercase tracking-wider transition-all transform hover:-translate-y-0.5 shadow-lg shadow-[#ef8113]/20 cursor-pointer active:scale-95 text-center w-full sm:w-auto"
            >
              Remplir le bilan
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>

        </div>

        {/* Content Section below: Split into Metrics/Introduction & Interactive Graphic */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mt-12 pt-12 border-t border-white/5">
          
          {/* Social Trust Metrics (Col 6) */}
          <div className="lg:col-span-6 space-y-8">
            <div className="grid grid-cols-3 gap-6">
              <div>
                <span className="block font-display font-black text-3xl sm:text-4xl text-[#ef8113]">-15h</span>
                <span className="text-xs text-gray-400 mt-1.5 block">Par employé / semaine</span>
              </div>
              <div className="border-l border-white/5 pl-6">
                <span className="block font-display font-black text-3xl sm:text-4xl text-white">+45%</span>
                <span className="text-xs text-gray-400 mt-1.5 block">De gains d&apos;efficacité</span>
              </div>
              <div className="border-l border-white/5 pl-6">
                <span className="block font-display font-black text-3xl sm:text-4xl text-white">48h</span>
                <span className="text-xs text-gray-400 mt-1.5 block">Analyse technique et ROI</span>
              </div>
            </div>

            <p className="text-sm sm:text-base text-gray-300 font-light leading-relaxed border-t border-white/5 pt-6 text-center">
              Bilan destiné aux entrepreneurs et gestionnaires de services. À partir de tes réponses, on estime l’impact réel de l’automatisation et de l’IA sur ton entreprise.
            </p>
          </div>

          {/* Interactive Card Graphic (Col 6) */}
          <div className="lg:col-span-6 relative flex justify-center w-full">
            <div className="relative w-full max-w-[420px]">
              
              {/* Decorative accent shadows */}
              <div className="absolute inset-0 bg-gradient-to-tr from-[#ef8113]/20 to-blue-500/20 rounded-2xl filter blur-2xl transform rotate-3 scale-105 pointer-events-none" />

              {/* Main Card */}
              <div className="relative bg-[#182337]/90 border border-white/10 rounded-2xl p-6 shadow-2xl backdrop-blur-md w-full">
                
                {/* Header */}
                <div className="flex items-center justify-between pb-4 border-b border-white/5">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500" />
                    <div className="w-3 h-3 rounded-full bg-green-500" />
                  </div>
                  <span className="text-[10px] font-mono text-gray-400">huvi_bilan_motor_v1.ts</span>
                </div>

                {/* Audit preview fields */}
                <div className="space-y-4 pt-6">
                  
                  {/* Alert of loss */}
                  <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-3.5 flex gap-3">
                    <span className="text-red-400 text-xl font-bold">⚠️</span>
                    <div className="text-left">
                      <p className="text-xs font-semibold text-white">Pertes financières détectées</p>
                      <p className="text-[11px] text-gray-300 mt-0.5">Saisie administrative manuelle répétitive : <strong>12.5 heures perdues</strong> par semaine.</p>
                    </div>
                  </div>

                  {/* Recommendation metric */}
                  <div className="bg-[#ef8113]/10 border border-[#ef8113]/20 rounded-xl p-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-[#ef8113]/25 rounded-lg text-[#ef8113]">
                        <Zap className="w-4 h-4" />
                      </div>
                      <div className="text-left">
                        <p className="text-xs font-semibold text-white">Calculateur d&apos;efficacité</p>
                        <p className="text-[11px] text-gray-400">Automatisation & IA</p>
                      </div>
                    </div>
                    <span className="text-[#ef8113] font-display font-extrabold text-lg">+35% ROI</span>
                  </div>

                  {/* Code placeholder snippet representing automatic workflow */}
                  <div className="bg-black/40 rounded-xl p-3.5 font-mono text-[11px] text-emerald-400/90 whitespace-pre leading-relaxed border border-white/5 text-left">
                    {`// Automate clients follow-up
const leads = await getInboundEmails();
for (const lead of leads) {
  const spec = await ai.analyze(lead);
  await createStrategicOffer(spec);
}`}
                  </div>

                  {/* CTA linked to the form */}
                  <a
                    href="#wizard"
                    className="w-full bg-[#ef8113] hover:bg-[#f09436] active:scale-[0.98] text-white py-2.5 rounded-xl text-xs font-semibold transition-all text-center flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-[#ef8113]/20"
                  >
                    Remplir mon bilan
                    <Cpu className="w-3.5 h-3.5 text-white" />
                  </a>

                </div>

              </div>

              {/* Float widgets */}
              <div className="absolute -top-6 -right-6 bg-gradient-to-r from-[#ef8113] to-[#f09436] text-white p-3 rounded-xl shadow-lg flex items-center gap-2 transform rotate-3 hover:rotate-0 transition-transform hidden sm:flex">
                <TrendingUp className="w-4 h-4" />
                <span className="text-xs font-bold leading-none">ROI Moyen : +400%</span>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
