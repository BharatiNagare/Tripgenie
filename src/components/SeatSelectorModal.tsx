import React, { useState } from 'react';
import { X, Check, ShieldCheck, Sparkles, Plane, Train, Compass, Info, User } from 'lucide-react';

export interface SeatInfo {
  code: string;
  type: 'window' | 'aisle' | 'middle' | 'extra-legroom' | 'front-cabin' | 'sleeper';
  label: string;
  category: 'First / Business' | 'Premium Extra Legroom' | 'Standard Economy' | 'Exit Row';
  priceExtra?: number;
  features: string[];
}

interface SeatSelectorModalProps {
  isOpen: boolean;
  currentSeatCode?: string;
  currentPreference?: string;
  destination?: string;
  onSelectSeat: (seat: SeatInfo) => void;
  onClose: () => void;
}

// Generate realistic cabin seats
const ROWS = [
  { row: 1, type: 'business', label: 'Row 1 (Business / Front)' },
  { row: 2, type: 'business', label: 'Row 2 (Business)' },
  { row: 4, type: 'premium', label: 'Row 4 (Extra Legroom)' },
  { row: 5, type: 'premium', label: 'Row 5 (Extra Legroom)' },
  { row: 6, type: 'standard', label: 'Row 6 (Front Economy)' },
  { row: 7, type: 'standard', label: 'Row 7' },
  { row: 8, type: 'standard', label: 'Row 8' },
  { row: 9, type: 'standard', label: 'Row 9 (Over Wing)' },
  { row: 10, type: 'standard', label: 'Row 10 (Over Wing)' },
  { row: 11, type: 'exit', label: 'Row 11 (Emergency Exit Row)' },
  { row: 12, type: 'exit', label: 'Row 12 (Emergency Exit Row)' },
  { row: 14, type: 'standard', label: 'Row 14' },
  { row: 15, type: 'standard', label: 'Row 15' },
  { row: 16, type: 'standard', label: 'Row 16' },
  { row: 17, type: 'standard', label: 'Row 17' },
  { row: 18, type: 'standard', label: 'Row 18' },
];

const OCCUPIED_SEATS = new Set([
  '1A', '1B', '2D', '4A', '4C', '5E', '6B', '6C', '7A', '8D', '8F', '9B', '9E', '10C', '11D', '14B', '15A', '16E', '17C', '18F'
]);

export const SeatSelectorModal: React.FC<SeatSelectorModalProps> = ({
  isOpen,
  currentSeatCode = '11A',
  currentPreference = 'window',
  destination = 'Destination',
  onSelectSeat,
  onClose,
}) => {
  const [selectedSeat, setSelectedSeat] = useState<string>(currentSeatCode || '11A');
  const [vehicleType, setVehicleType] = useState<'flight' | 'train'>('flight');
  const [filterPreference, setFilterPreference] = useState<string>(currentPreference || 'all');

  if (!isOpen) return null;

  const getSeatDetails = (seatCode: string): SeatInfo => {
    const rowNum = parseInt(seatCode.replace(/\D/g, ''), 10);
    const col = seatCode.replace(/[0-9]/g, '');

    const isWindow = col === 'A' || col === 'F';
    const isAisle = col === 'C' || col === 'D';
    const isMiddle = col === 'B' || col === 'E';
    const isExit = rowNum === 11 || rowNum === 12;
    const isBusiness = rowNum <= 2;
    const isPremium = rowNum === 4 || rowNum === 5;

    let type: SeatInfo['type'] = isWindow ? 'window' : isAisle ? 'aisle' : 'middle';
    if (isExit || isPremium) type = 'extra-legroom';
    if (isBusiness) type = 'front-cabin';

    let category: SeatInfo['category'] = 'Standard Economy';
    if (isBusiness) category = 'First / Business';
    else if (isExit) category = 'Exit Row';
    else if (isPremium) category = 'Premium Extra Legroom';

    const features: string[] = [];
    if (isWindow) features.push('Scenic window view & wall headrest');
    if (isAisle) features.push('Easy aisle access & unrestricted leg stretch');
    if (isMiddle) features.push('Shared dual armrests & central media console');
    if (isExit) features.push('38" Extra Legroom & rapid deplaning');
    if (isPremium) features.push('34" Extended Pitch & Priority Boarding');
    if (isBusiness) features.push('Lie-flat / Recliner & Gourmet In-flight Dining');
    if (rowNum <= 8) features.push('Front of aircraft for fast disembarkation');
    features.push('USB-C Fast Charging & Universal AC Power');

    return {
      code: seatCode,
      type,
      label: `${seatCode} (${category})`,
      category,
      features,
    };
  };

  const currentSeatInfo = getSeatDetails(selectedSeat);

  const handleSeatClick = (seatCode: string) => {
    if (OCCUPIED_SEATS.has(seatCode)) return;
    setSelectedSeat(seatCode);
  };

  const handleConfirm = () => {
    onSelectSeat(currentSeatInfo);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/80 backdrop-blur-md animate-fade-in">
      <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-hidden shadow-2xl border border-slate-200 flex flex-col relative animate-scale-up">
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-slate-900 via-teal-950 to-slate-900 p-5 sm:p-6 text-white flex items-center justify-between shrink-0 relative">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 rounded-full bg-teal-500/20 text-teal-300 border border-teal-400/30 text-[11px] font-bold uppercase tracking-wider">
                Transit Seat Selection
              </span>
              <span className="text-xs text-slate-300 font-medium">Flight & Rail Travel</span>
            </div>
            <h2 className="text-lg sm:text-2xl font-extrabold font-display text-white">
              Choose Your Preferred Seat for {destination}
            </h2>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
            title="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Mode & Preference Filter Bar */}
        <div className="p-4 bg-slate-50 border-b border-slate-200 flex flex-wrap items-center justify-between gap-3 shrink-0">
          {/* Vehicle type toggle */}
          <div className="flex items-center bg-slate-200/80 p-1 rounded-xl">
            <button
              onClick={() => setVehicleType('flight')}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                vehicleType === 'flight'
                  ? 'bg-white text-teal-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Plane className="w-3.5 h-3.5 text-teal-600" />
              <span>Flight Cabin (A320)</span>
            </button>
            <button
              onClick={() => setVehicleType('train')}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                vehicleType === 'train'
                  ? 'bg-white text-indigo-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Train className="w-3.5 h-3.5 text-indigo-600" />
              <span>Express Rail Coach</span>
            </button>
          </div>

          {/* Quick preset filters */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
            {[
              { id: 'all', label: 'All Seats' },
              { id: 'window', label: '🪟 Window' },
              { id: 'aisle', label: '🚶 Aisle' },
              { id: 'extra-legroom', label: '💺 Extra Legroom' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setFilterPreference(tab.id)}
                className={`px-2.5 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  filterPreference === tab.id
                    ? 'bg-teal-600 text-white'
                    : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-100'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Main Seat Map & Summary Grid */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Cabin Layout Column (7 cols) */}
          <div className="md:col-span-7 flex flex-col items-center bg-slate-50/60 p-4 rounded-3xl border border-slate-200">
            {/* Aircraft Nose / Cockpit */}
            <div className="w-32 h-10 border-t-2 border-x-2 border-teal-500/40 rounded-t-full flex items-center justify-center bg-teal-50/50 mb-3 text-teal-800 text-[10px] font-extrabold uppercase tracking-wider">
              <span>✈️ Cockpit / Front</span>
            </div>

            {/* Legend */}
            <div className="flex flex-wrap items-center justify-center gap-3 text-[11px] font-semibold text-slate-600 mb-4 bg-white px-3 py-1.5 rounded-xl border border-slate-200 shadow-2xs">
              <div className="flex items-center gap-1">
                <span className="w-3.5 h-3.5 rounded-md bg-teal-600 ring-2 ring-teal-300" />
                <span>Selected</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="w-3.5 h-3.5 rounded-md bg-white border-2 border-teal-500" />
                <span>Available</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="w-3.5 h-3.5 rounded-md bg-amber-100 border-2 border-amber-400" />
                <span>Extra Legroom</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="w-3.5 h-3.5 rounded-md bg-slate-200 text-slate-400" />
                <span>Occupied</span>
              </div>
            </div>

            {/* Column Headers */}
            <div className="w-full max-w-sm flex items-center justify-between px-3 text-xs font-bold text-slate-400 mb-2">
              <div className="flex gap-2 w-28 justify-around">
                <span>A <span className="text-[9px] font-normal text-slate-400">(Win)</span></span>
                <span>B</span>
                <span>C <span className="text-[9px] font-normal text-slate-400">(Ais)</span></span>
              </div>
              <span className="text-[10px] text-slate-300 font-normal">Aisle</span>
              <div className="flex gap-2 w-28 justify-around">
                <span>D <span className="text-[9px] font-normal text-slate-400">(Ais)</span></span>
                <span>E</span>
                <span>F <span className="text-[9px] font-normal text-slate-400">(Win)</span></span>
              </div>
            </div>

            {/* Rows list */}
            <div className="w-full max-w-sm space-y-2">
              {ROWS.map(({ row, type, label }) => {
                const isExitRow = type === 'exit';
                const isPremiumRow = type === 'premium';
                const isBusinessRow = type === 'business';

                const leftSeats = isBusinessRow
                  ? [`${row}A`, `${row}C`]
                  : [`${row}A`, `${row}B`, `${row}C`];
                const rightSeats = isBusinessRow
                  ? [`${row}D`, `${row}F`]
                  : [`${row}D`, `${row}E`, `${row}F`];

                return (
                  <div key={row} className="relative">
                    {/* Exit row label banner */}
                    {isExitRow && (
                      <div className="text-[10px] font-extrabold text-amber-700 bg-amber-100 px-2 py-0.5 rounded-md text-center mb-1 border border-amber-300/80">
                        ⚡ EMERGENCY EXIT ROW &middot; EXTRA LEGROOM
                      </div>
                    )}

                    <div className="flex items-center justify-between gap-2">
                      {/* Left 3 Seats (A, B, C) */}
                      <div className="flex gap-1.5 sm:gap-2">
                        {leftSeats.map((code) => {
                          const isOccupied = OCCUPIED_SEATS.has(code);
                          const isCurrentSelected = selectedSeat === code;
                          const isWindow = code.endsWith('A');
                          const isAisle = code.endsWith('C');

                          let seatBg = 'bg-white border-2 border-teal-500 text-teal-900 hover:bg-teal-50';
                          if (isOccupied) {
                            seatBg = 'bg-slate-200 border-slate-300 text-slate-400 cursor-not-allowed';
                          } else if (isCurrentSelected) {
                            seatBg = 'bg-teal-600 border-teal-700 text-white shadow-md scale-105 ring-2 ring-teal-300';
                          } else if (isExitRow || isPremiumRow) {
                            seatBg = 'bg-amber-50 border-2 border-amber-400 text-amber-950 hover:bg-amber-100';
                          } else if (isBusinessRow) {
                            seatBg = 'bg-indigo-50 border-2 border-indigo-400 text-indigo-950 hover:bg-indigo-100';
                          }

                          return (
                            <button
                              key={code}
                              type="button"
                              disabled={isOccupied}
                              onClick={() => handleSeatClick(code)}
                              className={`w-8 h-8 sm:w-9 sm:h-9 rounded-xl flex items-center justify-center text-xs font-bold transition-all cursor-pointer relative ${seatBg}`}
                              title={
                                isOccupied
                                  ? `Seat ${code} is occupied`
                                  : `Select Seat ${code} (${isWindow ? 'Window' : isAisle ? 'Aisle' : 'Middle'})`
                              }
                            >
                              {code.replace(/[0-9]/g, '')}
                              {isCurrentSelected && (
                                <span className="absolute -top-1 -right-1 w-3 h-3 bg-white text-teal-700 rounded-full flex items-center justify-center text-[8px] font-extrabold shadow-xs">
                                  ✓
                                </span>
                              )}
                            </button>
                          );
                        })}
                      </div>

                      {/* Row Number Marker */}
                      <div className="w-7 text-center text-xs font-extrabold text-slate-400">
                        {row}
                      </div>

                      {/* Right 3 Seats (D, E, F) */}
                      <div className="flex gap-1.5 sm:gap-2">
                        {rightSeats.map((code) => {
                          const isOccupied = OCCUPIED_SEATS.has(code);
                          const isCurrentSelected = selectedSeat === code;
                          const isWindow = code.endsWith('F');
                          const isAisle = code.endsWith('D');

                          let seatBg = 'bg-white border-2 border-teal-500 text-teal-900 hover:bg-teal-50';
                          if (isOccupied) {
                            seatBg = 'bg-slate-200 border-slate-300 text-slate-400 cursor-not-allowed';
                          } else if (isCurrentSelected) {
                            seatBg = 'bg-teal-600 border-teal-700 text-white shadow-md scale-105 ring-2 ring-teal-300';
                          } else if (isExitRow || isPremiumRow) {
                            seatBg = 'bg-amber-50 border-2 border-amber-400 text-amber-950 hover:bg-amber-100';
                          } else if (isBusinessRow) {
                            seatBg = 'bg-indigo-50 border-2 border-indigo-400 text-indigo-950 hover:bg-indigo-100';
                          }

                          return (
                            <button
                              key={code}
                              type="button"
                              disabled={isOccupied}
                              onClick={() => handleSeatClick(code)}
                              className={`w-8 h-8 sm:w-9 sm:h-9 rounded-xl flex items-center justify-center text-xs font-bold transition-all cursor-pointer relative ${seatBg}`}
                              title={
                                isOccupied
                                  ? `Seat ${code} is occupied`
                                  : `Select Seat ${code} (${isWindow ? 'Window' : isAisle ? 'Aisle' : 'Middle'})`
                              }
                            >
                              {code.replace(/[0-9]/g, '')}
                              {isCurrentSelected && (
                                <span className="absolute -top-1 -right-1 w-3 h-3 bg-white text-teal-700 rounded-full flex items-center justify-center text-[8px] font-extrabold shadow-xs">
                                  ✓
                                </span>
                              )}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Rear of plane */}
            <div className="w-32 h-6 border-b-2 border-x-2 border-slate-300 rounded-b-xl flex items-center justify-center text-[10px] text-slate-400 font-bold mt-4">
              Galley / Restrooms
            </div>
          </div>

          {/* Seat Details & Boarding Card Column (5 cols) */}
          <div className="md:col-span-5 flex flex-col justify-between space-y-4">
            {/* Boarding Pass Preview Box */}
            <div className="bg-gradient-to-br from-teal-900 to-slate-900 text-white rounded-3xl p-5 sm:p-6 shadow-xl border border-teal-700/50 relative overflow-hidden">
              <div className="absolute top-0 right-0 -mt-8 -mr-8 w-32 h-32 bg-teal-500/20 rounded-full blur-2xl pointer-events-none" />

              <div className="flex items-center justify-between text-xs text-teal-300 font-bold border-b border-white/10 pb-3 mb-3">
                <span className="flex items-center gap-1.5">
                  <Plane className="w-3.5 h-3.5" />
                  TripGenie Boarding Pass
                </span>
                <span className="bg-teal-500/20 px-2 py-0.5 rounded text-teal-200 border border-teal-400/30">
                  Confirmed
                </span>
              </div>

              <div className="flex items-center justify-between my-2">
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Selected Seat</span>
                  <span className="text-3xl font-extrabold font-display text-white tracking-tight">
                    {currentSeatInfo.code}
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Class</span>
                  <span className="text-xs font-bold text-teal-300">
                    {currentSeatInfo.category}
                  </span>
                </div>
              </div>

              <div className="pt-3 border-t border-white/10 text-xs space-y-1.5">
                <div className="flex justify-between text-slate-300">
                  <span>Destination:</span>
                  <span className="font-semibold text-white">{destination}</span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span>Position:</span>
                  <span className="font-semibold text-teal-200 capitalize">
                    {currentSeatInfo.type.replace('-', ' ')} Position
                  </span>
                </div>
              </div>
            </div>

            {/* Seat Perks & Inclusions */}
            <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 space-y-2.5">
              <h4 className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                <span>Seat Features & Inclusions</span>
              </h4>

              <div className="space-y-1.5">
                {currentSeatInfo.features.map((feature, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-xs text-slate-600">
                    <Check className="w-3.5 h-3.5 text-teal-600 shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-2 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirm}
                className="px-5 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-extrabold shadow-sm hover:shadow-md transition-all cursor-pointer flex items-center gap-2"
              >
                <Check className="w-4 h-4" />
                <span>Confirm Seat {currentSeatInfo.code}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
