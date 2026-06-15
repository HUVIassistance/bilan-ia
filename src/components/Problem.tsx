import { FC } from "react";
import { AlertCircle, ArrowRight, RefreshCw, Copy, Users, Clock, ShieldAlert } from "lucide-react";

export const Problem: FC = () => {
  const points = [
    {
      text: "Chaque semaine tu répètes les mêmes choses.",
      icon: RefreshCw,
    },
    {
      text: "Tu copies des données d'un logiciel à l'autre.",
      icon: Copy,
    },
    {
      text: "Ton équipe fait beaucoup de suivi manuel.",
      icon: Users,
    },
    {
      text: "Tu as l'impression de manquer de temps malgré tes longues journées.",
      icon: Clock,
    },
    {
      text: "Beaucoup de choses dépendent encore de personnes plutôt que d'un système.",
      icon: ShieldAlert,
    },
  ];

  return (
    <section className="py-12 bg-[#253551] border-t border-white/5 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-6 space-y-2">
          <div className="inline-flex items-center gap-1.5 bg-[#ef8113]/10 border border-[#ef8113]/25 px-3 py-0.5 rounded-full text-xs font-semibold text-[#ef8113]">
            <AlertCircle className="w-3.5 h-3.5" />
            Constat
          </div>
          <h2 className="font-display font-bold text-2xl sm:text-3xl text-white tracking-tight">
            Tes journées ressemblent à ça ?
          </h2>
        </div>

        {/* Cards / Points Grid */}
        <div className="bg-[#182337]/45 border border-white/10 rounded-2xl p-5 sm:p-6 space-y-4 shadow-xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-3">
            {points.map((point, index) => {
              const IconComp = point.icon;
              return (
                <div 
                  key={index}
                  className="flex items-center gap-3 p-2 rounded-xl hover:bg-[#182337]/80 transition-colors duration-300"
                >
                  <div className="p-1.5 bg-[#ef8113]/10 text-[#ef8113] rounded-lg shrink-0 border border-[#ef8113]/20">
                    <IconComp className="w-4 h-4" />
                  </div>
                  <p className="text-gray-200 text-sm sm:text-base font-light leading-snug">
                    {point.text}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Subtitle / Conclusion */}
          <div className="border-t border-white/5 pt-4 mt-2 text-center">
            <p className="text-sm sm:text-base text-gray-300 font-normal leading-relaxed max-w-2xl mx-auto">
              Si c&apos;est le cas, ton entreprise perd probablement plus de temps et d&apos;argent que tu l&apos;imagines.
            </p>
          </div>
        </div>

        {/* Summary Value Banner - Scaled down & elegant */}
        <div className="mt-8 bg-gradient-to-r from-[#ef8113]/10 to-transparent border border-white/10 rounded-xl p-6 flex flex-col md:flex-row items-center justify-between gap-5">
          <div className="space-y-1 text-left">
            <h4 className="text-base font-bold text-white tracking-tight">
              Curieux d&apos;estimer ton potentiel ?
            </h4>
            <p className="text-gray-300 text-xs font-light leading-relaxed max-w-2xl">
              En 2 minutes, le bilan calcule les pertes de temps et d&apos;argent de ton entreprise, estime tes gains potentiels et te transmet un plan d&apos;action sur-mesure.
            </p>
          </div>
          <a
            href="#wizard"
            className="whitespace-nowrap bg-[#ef8113] hover:bg-[#f09436] text-white font-semibold text-xs uppercase tracking-wider px-5 py-3 rounded-lg transition-all shadow-md active:scale-95"
          >
            Calculer mes gains
          </a>
        </div>

      </div>
    </section>
  );
};

export default Problem;
