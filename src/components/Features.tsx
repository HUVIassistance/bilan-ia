import { FEATURES } from "../data";
import { AlertTriangle, FileText, Cpu, TrendingUp } from "lucide-react";

const iconMap: Record<string, any> = {
  AlertTriangle: AlertTriangle,
  FileText: FileText,
  Cpu: Cpu,
  TrendingUp: TrendingUp,
};

export default function Features() {
  return (
    <section id="advantages" className="py-12 bg-[#253551] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading - Made tighter */}
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-2">
          <p className="text-[#ef8113] font-mono text-[10px] font-bold uppercase tracking-widest">
            Contenu du bilan
          </p>
          <h2 className="font-display font-bold text-2xl sm:text-3xl text-white tracking-tight">
            Ce que tu obtiendras avec ce bilan
          </h2>
          <p className="text-gray-300 text-sm font-light leading-relaxed">
            Une analyse claire et précise conçue pour évaluer les pertes de temps et identifier les opportunités à prioriser
          </p>
        </div>

        {/* Features Layout - Minimalist, borderless layout replacing heavy cards/rectangles */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-6">
          {FEATURES.map((feat, index) => {
            const IconComponent = iconMap[feat.icon] || Cpu;
            return (
              <div
                key={index}
                className="flex flex-col space-y-2 relative border-l border-white/10 hover:border-[#ef8113]/50 pl-5 py-0.5 transition-colors duration-300 group"
              >
                {/* Micro Icon & Title Row */}
                <div className="flex items-center gap-2.5 mb-1">
                  <div className="w-7 h-7 rounded-lg bg-white/5 flex items-center justify-center border border-white/10 group-hover:border-[#ef8113]/30 transition-all shrink-0">
                    <IconComponent className="w-3.5 h-3.5 text-[#ef8113]" />
                  </div>
                  <h3 className="font-display font-semibold text-sm sm:text-base text-white tracking-tight group-hover:text-[#ef8113] transition-colors">
                    {feat.title}
                  </h3>
                </div>

                {/* Description */}
                <p className="text-xs text-gray-400 leading-relaxed font-light">
                  {feat.description}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
