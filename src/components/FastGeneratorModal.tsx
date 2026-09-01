import React, { useEffect, useState } from 'react';
import { Sparkles, MapPin, Camera, Utensils, IndianRupee, Compass, CheckCircle2, Zap } from 'lucide-react';

interface FastGeneratorModalProps {
  isOpen: boolean;
  destination: string;
  durationDays: number;
  currency: string;
}

const GENERATION_STEPS = [
  {
    id: 1,
    title: 'Clustering Geographic Neighborhoods',
    detail: 'Minimizing transit waste between morning, afternoon & evening spots',
    icon: Compass,
  },
  {
    id: 2,
    title: 'Curating Iconic Landmarks & Photo References',
    detail: 'Attaching high-resolution visual previews for day-by-day reference',
    icon: Camera,
  },
  {
    id: 3,
    title: 'Selecting Top-Rated Authentic Dining',
    detail: 'Matching local Michelin street foods, ramen shops & regional culinary gems',
    icon: Utensils,
  },
  {
    id: 4,
    title: 'Calculating Itemized Budget & Currency Rates',
    detail: 'Optimizing accommodation, daily transit & activity costs',
    icon: IndianRupee,
  },
];

export const FastGeneratorModal: React.FC<FastGeneratorModalProps> = ({
  isOpen,
  destination,
  durationDays,
  currency,
}) => {
  const [activeStep, setActiveStep] = useState<number>(0);
  const [progressPercent, setProgressPercent] = useState<number>(15);

  useEffect(() => {
    if (!isOpen) {
      setActiveStep(0);
      setProgressPercent(15);
      return;
    }

    // Fast-advancing realistic animation stages
    const stepTimers = [
      setTimeout(() => { setActiveStep(1); setProgressPercent(42); }, 600),
      setTimeout(() => { setActiveStep(2); setProgressPercent(74); }, 1300),
      setTimeout(() => { setActiveStep(3); setProgressPercent(92); }, 2100),
    ];

    const progressInterval = setInterval(() => {
      setProgressPercent((prev) => {
        if (prev >= 96) return 96;
        return prev + 1;
      });
    }, 150);

    return () => {
      stepTimers.forEach(clearTimeout);
      clearInterval(progressInterval);
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-200/80 overflow-hidden relative">
        {/* Ambient background glow */}
        <div className="absolute -top-12 -right-12 w-48 h-48 bg-teal-400/20 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-indigo-400/20 rounded-full blur-2xl pointer-events-none" />

        {/* Header */}
        <div className="text-center relative z-10 space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 text-teal-700 border border-teal-200 text-xs font-extrabold uppercase tracking-wider">
            <Zap className="w-3.5 h-3.5 text-amber-500 fill-amber-400" />
            <span>TripGenie AI Synthesis Engine</span>
          </div>

          <h3 className="text-xl sm:text-2xl font-extrabold font-display text-slate-900">
            Crafting Your {durationDays}-Day Journey
          </h3>

          <p className="text-xs sm:text-sm text-slate-500 flex items-center justify-center gap-1.5 font-medium">
            <MapPin className="w-3.5 h-3.5 text-teal-600 shrink-0" />
            <span className="font-semibold text-slate-700">{destination || 'Your Destination'}</span>
            <span>&middot;</span>
            <span className="text-teal-700 font-bold">{currency} Budget</span>
          </p>
        </div>

        {/* Dynamic Progress Bar */}
        <div className="my-6 space-y-1.5 relative z-10">
          <div className="flex justify-between text-xs font-bold text-slate-700">
            <span>Fast AI Synthesis</span>
            <span className="text-teal-600">{progressPercent}%</span>
          </div>
          <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden p-0.5 border border-slate-200">
            <div
              className="h-full bg-gradient-to-r from-teal-500 via-emerald-500 to-cyan-500 rounded-full transition-all duration-300 ease-out"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Multi-Stage Milestones */}
        <div className="space-y-3 relative z-10">
          {GENERATION_STEPS.map((step, idx) => {
            const Icon = step.icon;
            const isFinished = activeStep > idx;
            const isCurrent = activeStep === idx;

            return (
              <div
                key={step.id}
                className={`p-3.5 rounded-2xl border transition-all duration-300 flex items-start gap-3 ${
                  isCurrent
                    ? 'bg-teal-50/90 border-teal-300 shadow-sm scale-[1.01]'
                    : isFinished
                    ? 'bg-slate-50/70 border-slate-200/80 text-slate-600'
                    : 'bg-white/50 border-slate-100 text-slate-400 opacity-60'
                }`}
              >
                <div
                  className={`w-7 h-7 rounded-xl flex items-center justify-center shrink-0 mt-0.5 font-bold transition-all ${
                    isFinished
                      ? 'bg-emerald-500 text-white'
                      : isCurrent
                      ? 'bg-teal-600 text-white animate-pulse'
                      : 'bg-slate-100 text-slate-400'
                  }`}
                >
                  {isFinished ? (
                    <CheckCircle2 className="w-4 h-4" />
                  ) : (
                    <Icon className="w-4 h-4" />
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span
                      className={`text-xs font-bold ${
                        isCurrent ? 'text-teal-950 font-display' : isFinished ? 'text-slate-800' : 'text-slate-500'
                      }`}
                    >
                      {step.title}
                    </span>
                    {isCurrent && (
                      <span className="text-[10px] text-teal-600 font-extrabold animate-pulse">
                        In Progress...
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-slate-500 mt-0.5 leading-snug truncate">
                    {step.detail}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer info */}
        <p className="text-center text-[11px] text-slate-400 mt-5 relative z-10 font-medium">
          ⚡ Gemini 3.7 Flash &middot; Geocoded Locations &middot; High-Res Place Imagery
        </p>
      </div>
    </div>
  );
};
