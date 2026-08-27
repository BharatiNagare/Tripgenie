import React, { useState } from 'react';
import { X, Sparkles, RefreshCw, Check, MapPin, Clock, DollarSign } from 'lucide-react';
import { Activity } from '../types';
import { formatCurrency } from '../lib/currency';

interface ActivitySwapModalProps {
  isOpen: boolean;
  onClose: () => void;
  activity: Activity | null;
  dayTheme: string;
  destination: string;
  currency: string;
  onApplySwap: (originalId: string, newActivity: Activity) => void;
}

export const ActivitySwapModal: React.FC<ActivitySwapModalProps> = ({
  isOpen,
  onClose,
  activity,
  dayTheme,
  destination,
  currency,
  onApplySwap,
}) => {
  const [preferenceReason, setPreferenceReason] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [suggestedAlternative, setSuggestedAlternative] = useState<Activity | null>(null);
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen || !activity) return null;

  const handleGenerateAlternative = async () => {
    setIsGenerating(true);
    setErrorMsg('');
    try {
      const res = await fetch('/api/swap-activity', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          currentActivity: activity,
          dayTheme,
          destination,
          preferenceReason: preferenceReason || 'Looking for an exciting fresh alternative',
        }),
      });

      if (!res.ok) {
        throw new Error('Failed to generate alternative activity');
      }

      const data = await res.json();
      setSuggestedAlternative(data);
    } catch (err: any) {
      console.error(err);
      setErrorMsg('Could not generate alternative right now. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleConfirm = () => {
    if (suggestedAlternative) {
      onApplySwap(activity.id, suggestedAlternative);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 space-y-5 animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2 text-slate-900">
            <Sparkles className="w-5 h-5 text-indigo-600" />
            <h3 className="text-base font-bold font-display">AI Activity Swapper</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Current Activity Box */}
        <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 space-y-1 text-xs">
          <span className="text-[10px] uppercase font-bold text-slate-400 block">Current Activity</span>
          <h4 className="text-sm font-bold text-slate-900">{activity.title}</h4>
          <p className="text-slate-600">{activity.description}</p>
          <div className="flex items-center gap-3 pt-1 text-slate-500 font-medium">
            <span>Slot: {activity.timeSlot}</span>
            <span>Cost: {formatCurrency(activity.estimatedCost, currency, currency)}</span>
            <span>Duration: {activity.durationMinutes}m</span>
          </div>
        </div>

        {/* User constraint input */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-700 block">
            What kind of alternative would you prefer?
          </label>
          <div className="flex flex-wrap gap-1.5 mb-2">
            {[
              'More budget-friendly / free',
              'Indoor / Rainy day spot',
              'Food & culinary tasting',
              'Art & museum focus',
              'Scenic viewpoint / photo spot',
              'Less touristy / hidden gem',
            ].map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => setPreferenceReason(tag)}
                className={`text-[11px] px-2.5 py-1 rounded-lg border transition-all cursor-pointer ${
                  preferenceReason === tag
                    ? 'bg-indigo-100 text-indigo-800 border-indigo-300 font-bold'
                    : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>

          <input
            type="text"
            value={preferenceReason}
            onChange={(e) => setPreferenceReason(e.target.value)}
            placeholder="Or type custom constraint (e.g. wheelchair accessible, matcha cafe)..."
            className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none focus:border-indigo-500 focus:bg-white font-medium"
          />
        </div>

        {/* Generate Button */}
        <button
          onClick={handleGenerateAlternative}
          disabled={isGenerating}
          className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-60 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer flex items-center justify-center gap-2 shadow-xs"
        >
          {isGenerating ? (
            <>
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              <span>Synthesizing replacement activity...</span>
            </>
          ) : (
            <>
              <RefreshCw className="w-4 h-4" />
              <span>Generate AI Replacement</span>
            </>
          )}
        </button>

        {errorMsg && (
          <p className="text-xs text-rose-600 bg-rose-50 p-2.5 rounded-xl border border-rose-200">
            {errorMsg}
          </p>
        )}

        {/* Suggested Replacement Card */}
        {suggestedAlternative && (
          <div className="p-4 bg-emerald-50/60 border border-emerald-200 rounded-2xl space-y-2 text-xs animate-in fade-in duration-150">
            <span className="text-[10px] uppercase font-bold text-emerald-700 block">Suggested Alternative</span>
            <h4 className="text-sm font-bold text-slate-900">{suggestedAlternative.title}</h4>
            <p className="text-slate-600 leading-relaxed">{suggestedAlternative.description}</p>
            <div className="flex flex-wrap items-center gap-3 pt-1 text-slate-600 font-semibold">
              <span>📍 {suggestedAlternative.location}</span>
              <span>💰 {formatCurrency(suggestedAlternative.estimatedCost, currency, currency)}</span>
              <span>⏱️ {suggestedAlternative.durationMinutes} mins</span>
            </div>

            {suggestedAlternative.insiderTip && (
              <p className="text-[11px] text-emerald-800 bg-emerald-100/50 p-2 rounded-lg mt-1 font-medium">
                💡 <strong>Tip:</strong> {suggestedAlternative.insiderTip}
              </p>
            )}

            <div className="pt-2 flex justify-end gap-2">
              <button
                onClick={handleConfirm}
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Check className="w-3.5 h-3.5" />
                <span>Accept & Replace</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
