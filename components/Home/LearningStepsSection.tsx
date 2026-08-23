
import { useState } from 'react';
import { 
  CheckCircle, 
  Sparkles, 

  Laptop, 
  FileCode2, 
  Briefcase,
  Ticket
} from 'lucide-react';
import { LEARNING_STEPS } from '@/utils/data';
import { CardOffer } from '@/types';


export default function LearningStepsSection() {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2500);
  };

  const getStepIcon = (step: number) => {
    switch (step) {
      case 1:
        return <Ticket className="w-6 h-6 text-[#E5252A]" />;
      case 2:
        return <Laptop className="w-6 h-6 text-[#0E2954]" />;
      case 3:
        return <FileCode2 className="w-6 h-6 text-blue-600" />;
      case 4:
        return <Briefcase className="w-6 h-6 text-emerald-600" />;
      default:
        return <Sparkles className="w-6 h-6 text-[#0E2954]" />;
    }
  };

  return (
    <section id="steps" className="py-20 bg-[#F8FAFC] border-y border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section 1: The 4 Serial Steps */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0E2954]/10 text-[#0E2954] text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-[#E5252A]" />
            Learning & Career Blueprint
          </div>
          <h2 className="mt-4 text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            How DigiLearning Works in 4 Steps
          </h2>
          <p className="mt-3 text-slate-600 text-sm sm:text-base">
            From zero computer confidence to career-ready administrative proficiency.
          </p>
        </div>

        {/* 4 Serial Steps Timeline / Grid */}
        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {LEARNING_STEPS.map((item, idx) => (
            <div 
              key={item.step}
              className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs flex flex-col justify-between hover:shadow-lg transition-all duration-300 relative group"
            >
              {/* Step Number Top Badge */}
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center group-hover:bg-[#0E2954]/10 transition-colors">
                  {getStepIcon(item.step)}
                </div>
                <span className="text-3xl font-black text-slate-200 group-hover:text-[#0E2954]/30 transition-colors">
                  0{item.step}
                </span>
              </div>

              <div className="mt-6 flex-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#0E2954] bg-[#0E2954]/5 px-2 py-0.5 rounded">
                  {item.subtitle}
                </span>
                <h3 className="mt-2 text-lg font-bold text-slate-900 leading-snug">
                  {item.title}
                </h3>
                <p className="mt-2.5 text-xs text-slate-600 leading-relaxed">
                  {item.description}
                </p>

                {/* Key Bullet points */}
                <ul className="mt-4 space-y-1.5 pt-3 border-t border-slate-100">
                  {item.details.map((detail, dIdx) => (
                    <li key={dIdx} className="text-[11px] text-slate-500 flex items-start gap-1.5">
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

     

      </div>
    </section>
  );
}
