import React, { useState } from 'react';
import { X, Printer, Download, Share2, Copy, Check, FileText } from 'lucide-react';
import { Itinerary } from '../types';
import { formatCurrency } from '../lib/currency';

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  itinerary: Itinerary | null;
  currentCurrency: string;
}

export const ExportModal: React.FC<ExportModalProps> = ({
  isOpen,
  onClose,
  itinerary,
  currentCurrency,
}) => {
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedJSON, setCopiedJSON] = useState(false);

  if (!isOpen || !itinerary) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadJSON = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(itinerary, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `tripgenie-${itinerary.destination.toLowerCase().replace(/[^a-z0-9]/g, '-')}-itinerary.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handleCopyShareLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleCopyJSON = () => {
    navigator.clipboard.writeText(JSON.stringify(itinerary, null, 2));
    setCopiedJSON(true);
    setTimeout(() => setCopiedJSON(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-200 space-y-6 animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-teal-50 text-teal-600">
              <Download className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold font-display text-slate-900">Export &amp; Share Itinerary</h3>
              <p className="text-xs text-slate-500">Save offline, print, or share your travel plan</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Trip Snapshot */}
        <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-1 text-xs">
          <span className="text-[10px] uppercase font-bold text-teal-700 block">Active Plan</span>
          <h4 className="text-sm font-bold text-slate-900">{itinerary.title}</h4>
          <p className="text-slate-500">
            {itinerary.destination}, {itinerary.country} &middot; {itinerary.days.length} Days &middot; {formatCurrency(itinerary.totalEstimatedCost, currentCurrency, itinerary.currency)}
          </p>
        </div>

        {/* Export Options Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <button
            onClick={handlePrint}
            className="p-4 rounded-2xl border border-slate-200 hover:border-teal-400 hover:bg-teal-50/40 transition-all flex flex-col items-center justify-center text-center gap-2 group cursor-pointer"
          >
            <div className="w-10 h-10 rounded-xl bg-slate-100 group-hover:bg-teal-100 text-slate-700 group-hover:text-teal-700 flex items-center justify-center transition-colors">
              <Printer className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-bold text-slate-900 block">Print / Save as PDF</span>
              <span className="text-[10px] text-slate-400">Clean print-ready layout</span>
            </div>
          </button>

          <button
            onClick={handleDownloadJSON}
            className="p-4 rounded-2xl border border-slate-200 hover:border-teal-400 hover:bg-teal-50/40 transition-all flex flex-col items-center justify-center text-center gap-2 group cursor-pointer"
          >
            <div className="w-10 h-10 rounded-xl bg-slate-100 group-hover:bg-teal-100 text-slate-700 group-hover:text-teal-700 flex items-center justify-center transition-colors">
              <Download className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-bold text-slate-900 block">Download .JSON</span>
              <span className="text-[10px] text-slate-400">Portable data format</span>
            </div>
          </button>

          <button
            onClick={handleCopyShareLink}
            className="p-4 rounded-2xl border border-slate-200 hover:border-teal-400 hover:bg-teal-50/40 transition-all flex flex-col items-center justify-center text-center gap-2 group cursor-pointer"
          >
            <div className="w-10 h-10 rounded-xl bg-slate-100 group-hover:bg-teal-100 text-slate-700 group-hover:text-teal-700 flex items-center justify-center transition-colors">
              {copiedLink ? <Check className="w-5 h-5 text-emerald-600" /> : <Share2 className="w-5 h-5" />}
            </div>
            <div>
              <span className="text-xs font-bold text-slate-900 block">
                {copiedLink ? 'Link Copied!' : 'Copy Share URL'}
              </span>
              <span className="text-[10px] text-slate-400">Share with travel companions</span>
            </div>
          </button>

          <button
            onClick={handleCopyJSON}
            className="p-4 rounded-2xl border border-slate-200 hover:border-teal-400 hover:bg-teal-50/40 transition-all flex flex-col items-center justify-center text-center gap-2 group cursor-pointer"
          >
            <div className="w-10 h-10 rounded-xl bg-slate-100 group-hover:bg-teal-100 text-slate-700 group-hover:text-teal-700 flex items-center justify-center transition-colors">
              {copiedJSON ? <Check className="w-5 h-5 text-emerald-600" /> : <FileText className="w-5 h-5" />}
            </div>
            <div>
              <span className="text-xs font-bold text-slate-900 block">
                {copiedJSON ? 'JSON Copied!' : 'Copy Raw AST'}
              </span>
              <span className="text-[10px] text-slate-400">For academic inspection</span>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};
