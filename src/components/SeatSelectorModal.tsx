import React, { useState, useEffect } from 'react';
import {
  X,
  Check,
  ShieldCheck,
  Sparkles,
  Plane,
  Train,
  Bus,
  Ship,
  Compass,
  Info,
  User,
  Users,
  Luggage,
  Utensils,
  Clock,
  QrCode,
  Download,
  Share2,
  Copy,
  CheckCircle2,
  AlertCircle,
  Armchair,
  FileText,
  Printer
} from 'lucide-react';
import { PassengerDetails, TransitPreBooking, TravelGroup } from '../types';
import { formatCurrency } from '../lib/currency';

export interface SeatInfo {
  code: string;
  type: 'window' | 'aisle' | 'middle' | 'extra-legroom' | 'front-cabin' | 'sleeper';
  label: string;
  category: 'First / Business' | 'Premium Extra Legroom' | 'Standard Economy' | 'Exit Row' | 'Sleeper 2-Tier';
  priceExtra?: number;
  features: string[];
}

interface SeatSelectorModalProps {
  isOpen: boolean;
  currentSeatCode?: string;
  currentPreference?: string;
  currentBooking?: TransitPreBooking;
  destination?: string;
  sourceCity?: string;
  travelDate?: string;
  groupType?: TravelGroup | string;
  currency?: string;
  onSelectSeat?: (seat: SeatInfo) => void;
  onConfirmPreBooking?: (booking: TransitPreBooking) => void;
  onClose: () => void;
}

// Seat rows for Aircraft
const FLIGHT_ROWS = [
  { row: 1, type: 'business', label: 'Row 1 (Business Suite)' },
  { row: 2, type: 'business', label: 'Row 2 (Business)' },
  { row: 4, type: 'premium', label: 'Row 4 (Extra Legroom)' },
  { row: 5, type: 'premium', label: 'Row 5 (Extra Legroom)' },
  { row: 6, type: 'standard', label: 'Row 6 (Front Economy)' },
  { row: 7, type: 'standard', label: 'Row 7' },
  { row: 8, type: 'standard', label: 'Row 8' },
  { row: 9, type: 'standard', label: 'Row 9 (Over Wing)' },
  { row: 10, type: 'standard', label: 'Row 10 (Over Wing)' },
  { row: 11, type: 'exit', label: 'Row 11 (Emergency Exit - 38" Pitch)' },
  { row: 12, type: 'exit', label: 'Row 12 (Emergency Exit - 38" Pitch)' },
  { row: 14, type: 'standard', label: 'Row 14' },
  { row: 15, type: 'standard', label: 'Row 15' },
  { row: 16, type: 'standard', label: 'Row 16' },
  { row: 17, type: 'standard', label: 'Row 17' },
  { row: 18, type: 'standard', label: 'Row 18' },
];

// Seat rows for Express Train
const TRAIN_ROWS = [
  { row: 1, type: 'business', label: 'Coach A1 (Executive Club)' },
  { row: 2, type: 'business', label: 'Coach A1 (Executive Club)' },
  { row: 3, type: 'premium', label: 'Coach B1 (Quiet Car Chair)' },
  { row: 4, type: 'premium', label: 'Coach B1 (Quiet Car Chair)' },
  { row: 5, type: 'standard', label: 'Coach C1 (Standard Chair)' },
  { row: 6, type: 'standard', label: 'Coach C1 (Standard Chair)' },
  { row: 7, type: 'standard', label: 'Coach C1 (Standard Chair)' },
  { row: 8, type: 'standard', label: 'Coach C2 (Standard Chair)' },
  { row: 9, type: 'standard', label: 'Coach C2 (Standard Chair)' },
  { row: 10, type: 'standard', label: 'Coach C2 (Standard Chair)' },
  { row: 11, type: 'sleeper', label: 'Coach S1 (Upper/Lower Sleeper Berth)' },
  { row: 12, type: 'sleeper', label: 'Coach S1 (Upper/Lower Sleeper Berth)' },
];

const OCCUPIED_SEATS = new Set([
  '1A', '1B', '2D', '4A', '4C', '5E', '6B', '6C', '7A', '8D', '8F', '9B', '9E', '10C', '11D', '14B', '15A', '16E', '17C', '18F'
]);

export const SeatSelectorModal: React.FC<SeatSelectorModalProps> = ({
  isOpen,
  currentSeatCode = '12A',
  currentPreference = 'window',
  currentBooking,
  destination = 'Destination',
  sourceCity = 'Your Location',
  travelDate = '2026-09-15',
  groupType = 'solo',
  currency = 'USD',
  onSelectSeat,
  onConfirmPreBooking,
  onClose,
}) => {
  // Determine default passenger count from group type
  const getDefaultPassengerCount = (group?: TravelGroup | string): number => {
    switch (group) {
      case 'solo': return 1;
      case 'couple': return 2;
      case 'family': return 3;
      case 'friends': return 4;
      case 'students': return 3;
      default: return 1;
    }
  };

  const initialCount = currentBooking?.passengers.length || getDefaultPassengerCount(groupType);

  const [activeStep, setActiveStep] = useState<'select' | 'passengers' | 'confirmed'>('select');
  const [vehicleType, setVehicleType] = useState<'flight' | 'train' | 'bus' | 'ferry'>(
    currentBooking?.transitMode || 'flight'
  );
  const [selectedSeats, setSelectedSeats] = useState<string[]>(
    currentBooking?.seatCodes || [currentSeatCode || '12A']
  );
  const [activePassengerIdx, setActivePassengerIdx] = useState<number>(0);
  const [filterPreference, setFilterPreference] = useState<string>(currentPreference || 'all');
  const [copiedPNR, setCopiedPNR] = useState(false);
  const [holdTimeLeft, setHoldTimeLeft] = useState(1200); // 20 mins countdown in seconds

  // Passenger list state
  const [passengers, setPassengers] = useState<PassengerDetails[]>(() => {
    if (currentBooking?.passengers && currentBooking.passengers.length > 0) {
      return currentBooking.passengers;
    }
    const defaultCodes = ['12A', '12B', '12C', '11A'];
    return Array.from({ length: initialCount }, (_, idx) => ({
      id: `pax-${idx + 1}`,
      fullName: idx === 0 ? 'Lead Traveler' : `Passenger ${idx + 1}`,
      age: 28 + idx * 2,
      gender: 'other',
      idNumber: `ID-${Math.floor(100000 + Math.random() * 900000)}`,
      seatCode: defaultCodes[idx] || `${12 + idx}A`,
      seatType: idx % 2 === 0 ? 'window' : 'middle',
      cabinClass: 'Economy',
      mealPreference: 'Standard Meal / Chef Special',
      baggageAddon: '7kg Cabin + 20kg Check-in (Included)',
    }));
  });

  // Keep seat codes in sync with passengers
  useEffect(() => {
    if (passengers.length > 0) {
      setSelectedSeats(passengers.map(p => p.seatCode));
    }
  }, [passengers]);

  // Hold timer countdown simulation
  useEffect(() => {
    if (!isOpen) return;
    const timer = setInterval(() => {
      setHoldTimeLeft(prev => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, [isOpen]);

  if (!isOpen) return null;

  const formatTimer = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const getSeatDetails = (seatCode: string): SeatInfo => {
    const rowNum = parseInt(seatCode.replace(/\D/g, ''), 10) || 12;
    const col = seatCode.replace(/[0-9]/g, '') || 'A';

    const isWindow = col === 'A' || col === 'F';
    const isAisle = col === 'C' || col === 'D';
    const isMiddle = col === 'B' || col === 'E';
    const isExit = rowNum === 11 || rowNum === 12;
    const isBusiness = rowNum <= 2;
    const isPremium = rowNum === 4 || rowNum === 5;
    const isSleeper = vehicleType === 'train' && rowNum >= 11;

    let type: SeatInfo['type'] = isWindow ? 'window' : isAisle ? 'aisle' : 'middle';
    if (isExit || isPremium) type = 'extra-legroom';
    if (isBusiness) type = 'front-cabin';
    if (isSleeper) type = 'sleeper';

    let category: SeatInfo['category'] = 'Standard Economy';
    if (isBusiness) category = 'First / Business';
    else if (isExit) category = 'Exit Row';
    else if (isPremium) category = 'Premium Extra Legroom';
    else if (isSleeper) category = 'Sleeper 2-Tier';

    const features: string[] = [];
    if (isWindow) features.push('Scenic window panoramic view');
    if (isAisle) features.push('Direct aisle access & easy leg stretch');
    if (isMiddle) features.push('Shared dual armrests & central display');
    if (isExit) features.push('38" Extra Legroom pitch & rapid exit');
    if (isPremium) features.push('34" Extended Pitch & Priority Boarding');
    if (isBusiness) features.push('Lie-flat Suite & Complimentary Lounge Access');
    if (isSleeper) features.push('Full flat berth with privacy curtain & bedroll');
    features.push('Universal AC Power & Fast USB-C Fast Port');
    features.push('Guaranteed Overhead Luggage Storage Lock');

    return {
      code: seatCode,
      type,
      label: `${seatCode} (${category})`,
      category,
      features,
    };
  };

  // Handle clicking a seat on the map
  const handleSeatClick = (seatCode: string) => {
    if (OCCUPIED_SEATS.has(seatCode)) return;

    const seatDetails = getSeatDetails(seatCode);
    const updated = [...passengers];
    const targetIdx = activePassengerIdx < updated.length ? activePassengerIdx : 0;

    // Check if another passenger already has this seat
    const existingIndex = updated.findIndex(p => p.seatCode === seatCode);
    if (existingIndex !== -1 && existingIndex !== targetIdx) {
      // Swap or replace
      updated[existingIndex].seatCode = updated[targetIdx].seatCode;
    }

    updated[targetIdx] = {
      ...updated[targetIdx],
      seatCode,
      seatType: seatDetails.type,
      cabinClass: seatDetails.category.includes('Business') ? 'Business' : 'Economy',
    };

    setPassengers(updated);
    setSelectedSeats(updated.map(p => p.seatCode));

    // Move to next passenger if any unassigned
    if (activePassengerIdx < updated.length - 1) {
      setActivePassengerIdx(activePassengerIdx + 1);
    }
  };

  const handleAddPassenger = () => {
    if (passengers.length >= 6) return;
    const nextIdx = passengers.length + 1;
    const nextCode = `${14 + nextIdx}A`;
    const newPax: PassengerDetails = {
      id: `pax-${nextIdx}`,
      fullName: `Passenger ${nextIdx}`,
      age: 26,
      gender: 'other',
      idNumber: `ID-${Math.floor(100000 + Math.random() * 900000)}`,
      seatCode: nextCode,
      seatType: 'window',
      cabinClass: 'Economy',
      mealPreference: 'Standard Meal / Chef Special',
      baggageAddon: '7kg Cabin + 20kg Check-in (Included)',
    };
    setPassengers([...passengers, newPax]);
    setActivePassengerIdx(passengers.length);
  };

  const handleRemovePassenger = (idx: number) => {
    if (passengers.length <= 1) return;
    const updated = passengers.filter((_, i) => i !== idx);
    setPassengers(updated);
    if (activePassengerIdx >= updated.length) {
      setActivePassengerIdx(updated.length - 1);
    }
  };

  const handleUpdatePassenger = (idx: number, field: keyof PassengerDetails, value: any) => {
    const updated = [...passengers];
    updated[idx] = {
      ...updated[idx],
      [field]: value,
    };
    setPassengers(updated);
  };

  // Generate Booking Reference
  const pnr = currentBooking?.bookingReference || `TG-${Math.floor(1000 + Math.random() * 9000)}-${vehicleType.toUpperCase().slice(0, 2)}`;
  const carrier = vehicleType === 'flight' ? 'IndiGo / Air India Global' : vehicleType === 'train' ? 'Vande Bharat / Eurostar Express' : vehicleType === 'bus' ? 'Volvo Multi-Axle Sleeper' : 'High-Speed Ferry Cruiser';
  const vehicleNumber = vehicleType === 'flight' ? 'AI-842' : vehicleType === 'train' ? 'VB-20814' : vehicleType === 'bus' ? 'EXP-404' : 'FRY-99';

  const completedBooking: TransitPreBooking = {
    id: currentBooking?.id || `bk-${Date.now()}`,
    bookingReference: pnr,
    status: 'confirmed',
    transitMode: vehicleType,
    carrierName: carrier,
    vehicleNumber,
    departureCity: sourceCity || 'Origin Hub',
    arrivalCity: destination,
    departureDate: travelDate || '2026-09-15',
    departureTime: '08:45 AM',
    arrivalTime: '11:15 AM',
    cabinClass: passengers[0]?.cabinClass || 'Economy',
    passengers,
    totalSeats: passengers.length,
    seatCodes: passengers.map(p => p.seatCode),
    totalPrice: 0, // Pre-booking reservation included
    currency,
    gateOrPlatform: vehicleType === 'flight' ? 'Gate 14B (Terminal 3)' : 'Platform 4',
    terminal: vehicleType === 'flight' ? 'T3 Departure' : 'Central Station',
    bookingTimestamp: new Date().toISOString(),
    holdExpiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7).toISOString(),
    specialAssistance: false,
  };

  const handleFinalizePreBooking = () => {
    if (onSelectSeat && passengers.length > 0) {
      const primarySeat = getSeatDetails(passengers[0].seatCode);
      onSelectSeat(primarySeat);
    }
    if (onConfirmPreBooking) {
      onConfirmPreBooking(completedBooking);
    }
    setActiveStep('confirmed');
  };

  const handleCopyPNR = () => {
    navigator.clipboard.writeText(pnr);
    setCopiedPNR(true);
    setTimeout(() => setCopiedPNR(false), 2000);
  };

  const handlePrintOrDownload = () => {
    window.print();
  };

  const primarySeatInfo = getSeatDetails(passengers[activePassengerIdx]?.seatCode || '12A');
  const rowsList = vehicleType === 'train' ? TRAIN_ROWS : FLIGHT_ROWS;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/85 backdrop-blur-md animate-fade-in">
      <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[92vh] overflow-hidden shadow-2xl border border-slate-200 flex flex-col relative animate-scale-up">
        
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-slate-950 via-teal-950 to-slate-900 p-4 sm:p-5 text-white flex items-center justify-between shrink-0 border-b border-teal-800/40">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-teal-500/20 border border-teal-400/40 flex items-center justify-center text-teal-300">
              <Armchair className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full bg-teal-500/25 text-teal-200 border border-teal-400/30 text-[10px] font-extrabold uppercase tracking-wider">
                  Seat Pre-Booking &amp; Transit Reservation
                </span>
                <span className="hidden sm:inline-block text-xs text-teal-300/80 font-medium">
                  {sourceCity} &rarr; {destination}
                </span>
              </div>
              <h2 className="text-base sm:text-xl font-extrabold font-display text-white mt-0.5">
                Pre-Book Traveling Seats &middot; {passengers.length} {passengers.length > 1 ? 'Passengers' : 'Passenger'}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Live Hold Timer Badge */}
            <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-xl bg-amber-500/20 text-amber-300 border border-amber-400/30 text-xs font-bold">
              <Clock className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
              <span>Seat Hold: {formatTimer(holdTimeLeft)}</span>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
              title="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Step Navigation Bar */}
        <div className="bg-slate-50 border-b border-slate-200 px-4 sm:px-6 py-2.5 flex items-center justify-between gap-2 shrink-0">
          <div className="flex items-center gap-1.5 sm:gap-4 text-xs font-bold">
            <button
              type="button"
              onClick={() => setActiveStep('select')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl transition-all cursor-pointer ${
                activeStep === 'select'
                  ? 'bg-teal-600 text-white shadow-xs'
                  : 'text-slate-600 hover:bg-slate-200'
              }`}
            >
              <span>1. Cabin Seat Map</span>
              <span className="text-[10px] bg-white/20 px-1.5 py-0.2 rounded">
                {passengers.map(p => p.seatCode).join(', ')}
              </span>
            </button>

            <button
              type="button"
              onClick={() => setActiveStep('passengers')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl transition-all cursor-pointer ${
                activeStep === 'passengers'
                  ? 'bg-teal-600 text-white shadow-xs'
                  : 'text-slate-600 hover:bg-slate-200'
              }`}
            >
              <span>2. Passenger Details &amp; Perks</span>
              <span className="text-[10px] bg-slate-200 text-slate-700 px-1.5 py-0.2 rounded">
                {passengers.length}
              </span>
            </button>

            <button
              type="button"
              onClick={() => setActiveStep('confirmed')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl transition-all cursor-pointer ${
                activeStep === 'confirmed'
                  ? 'bg-teal-600 text-white shadow-xs'
                  : 'text-slate-600 hover:bg-slate-200'
              }`}
            >
              <span>3. Boarding Pass &amp; Ticket</span>
              <span className="text-[10px] bg-emerald-100 text-emerald-800 px-1.5 py-0.2 rounded font-extrabold">
                PNR
              </span>
            </button>
          </div>

          {/* Mode Switcher */}
          {activeStep !== 'confirmed' && (
            <div className="hidden md:flex items-center bg-slate-200/80 p-1 rounded-xl">
              {[
                { id: 'flight', label: 'Flight', icon: Plane },
                { id: 'train', label: 'Rail', icon: Train },
                { id: 'bus', label: 'Bus', icon: Bus },
                { id: 'ferry', label: 'Ferry', icon: Ship },
              ].map((m) => {
                const Icon = m.icon;
                return (
                  <button
                    key={m.id}
                    onClick={() => setVehicleType(m.id as any)}
                    className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      vehicleType === m.id
                        ? 'bg-white text-teal-900 shadow-xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    <Icon className="w-3 h-3 text-teal-600" />
                    <span>{m.label}</span>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* STEP 1: INTERACTIVE CABIN SEAT MAP */}
        {activeStep === 'select' && (
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 grid grid-cols-1 md:grid-cols-12 gap-6">
            
            {/* Left Seat Grid Map */}
            <div className="md:col-span-7 flex flex-col items-center bg-slate-50/70 p-4 rounded-3xl border border-slate-200">
              
              {/* Aircraft Nose / Engine Banner */}
              <div className="w-36 h-10 border-t-2 border-x-2 border-teal-500/40 rounded-t-full flex items-center justify-center bg-teal-50/50 mb-3 text-teal-900 text-[11px] font-extrabold uppercase tracking-wider">
                <span>
                  {vehicleType === 'flight' ? '✈️ Cockpit / Front' : vehicleType === 'train' ? '🚄 Driver Engine' : '🚌 Driver Cabin'}
                </span>
              </div>

              {/* Legend Bar */}
              <div className="flex flex-wrap items-center justify-center gap-2.5 text-[11px] font-semibold text-slate-600 mb-4 bg-white px-3 py-1.5 rounded-xl border border-slate-200 shadow-2xs">
                <div className="flex items-center gap-1">
                  <span className="w-3.5 h-3.5 rounded-md bg-teal-600 ring-2 ring-teal-300" />
                  <span>Your Seat</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="w-3.5 h-3.5 rounded-md bg-white border-2 border-teal-500" />
                  <span>Available</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="w-3.5 h-3.5 rounded-md bg-amber-100 border-2 border-amber-400" />
                  <span>Extra Pitch</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="w-3.5 h-3.5 rounded-md bg-slate-200 text-slate-400" />
                  <span>Occupied</span>
                </div>
              </div>

              {/* Column Letter Markers */}
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

              {/* Cabin Rows */}
              <div className="w-full max-w-sm space-y-2">
                {rowsList.map(({ row, type, label }) => {
                  const isExitRow = type === 'exit';
                  const isPremiumRow = type === 'premium';
                  const isBusinessRow = type === 'business';
                  const isSleeperRow = type === 'sleeper';

                  const leftSeats = isBusinessRow
                    ? [`${row}A`, `${row}C`]
                    : [`${row}A`, `${row}B`, `${row}C`];
                  const rightSeats = isBusinessRow
                    ? [`${row}D`, `${row}F`]
                    : [`${row}D`, `${row}E`, `${row}F`];

                  return (
                    <div key={row} className="relative">
                      {isExitRow && (
                        <div className="text-[9px] font-extrabold text-amber-800 bg-amber-100 px-2 py-0.5 rounded-md text-center mb-1 border border-amber-300">
                          ⚡ EMERGENCY EXIT ROW &middot; 38" EXTRA LEGROOM
                        </div>
                      )}
                      {isSleeperRow && (
                        <div className="text-[9px] font-extrabold text-indigo-800 bg-indigo-100 px-2 py-0.5 rounded-md text-center mb-1 border border-indigo-300">
                          🚂 SLEEPER COMFORT BERTH &middot; FULL LIE-FLAT
                        </div>
                      )}

                      <div className="flex items-center justify-between gap-2">
                        {/* Left seats */}
                        <div className="flex gap-1.5 sm:gap-2">
                          {leftSeats.map((code) => {
                            const isOccupied = OCCUPIED_SEATS.has(code);
                            const assignedPaxIndex = passengers.findIndex(p => p.seatCode === code);
                            const isAssigned = assignedPaxIndex !== -1;
                            const isCurrentActive = passengers[activePassengerIdx]?.seatCode === code;

                            let seatStyle = 'bg-white border-2 border-teal-500 text-teal-900 hover:bg-teal-50';
                            if (isOccupied) {
                              seatStyle = 'bg-slate-200 border-slate-300 text-slate-400 cursor-not-allowed';
                            } else if (isCurrentActive) {
                              seatStyle = 'bg-teal-600 border-teal-700 text-white shadow-md scale-105 ring-2 ring-teal-300';
                            } else if (isAssigned) {
                              seatStyle = 'bg-teal-100 border-2 border-teal-600 text-teal-900 font-extrabold';
                            } else if (isExitRow || isPremiumRow) {
                              seatStyle = 'bg-amber-50 border-2 border-amber-400 text-amber-950 hover:bg-amber-100';
                            } else if (isBusinessRow) {
                              seatStyle = 'bg-indigo-50 border-2 border-indigo-400 text-indigo-950 hover:bg-indigo-100';
                            }

                            return (
                              <button
                                key={code}
                                type="button"
                                disabled={isOccupied}
                                onClick={() => handleSeatClick(code)}
                                className={`w-8 h-8 sm:w-9 sm:h-9 rounded-xl flex flex-col items-center justify-center text-xs font-bold transition-all cursor-pointer relative ${seatStyle}`}
                                title={isOccupied ? `Seat ${code} is occupied` : `Pre-book Seat ${code}`}
                              >
                                <span>{code.replace(/[0-9]/g, '')}</span>
                                {isAssigned && (
                                  <span className="text-[8px] -mt-1 font-extrabold text-teal-900">
                                    P{assignedPaxIndex + 1}
                                  </span>
                                )}
                              </button>
                            );
                          })}
                        </div>

                        {/* Row number */}
                        <div className="w-7 text-center text-xs font-extrabold text-slate-400">
                          {row}
                        </div>

                        {/* Right seats */}
                        <div className="flex gap-1.5 sm:gap-2">
                          {rightSeats.map((code) => {
                            const isOccupied = OCCUPIED_SEATS.has(code);
                            const assignedPaxIndex = passengers.findIndex(p => p.seatCode === code);
                            const isAssigned = assignedPaxIndex !== -1;
                            const isCurrentActive = passengers[activePassengerIdx]?.seatCode === code;

                            let seatStyle = 'bg-white border-2 border-teal-500 text-teal-900 hover:bg-teal-50';
                            if (isOccupied) {
                              seatStyle = 'bg-slate-200 border-slate-300 text-slate-400 cursor-not-allowed';
                            } else if (isCurrentActive) {
                              seatStyle = 'bg-teal-600 border-teal-700 text-white shadow-md scale-105 ring-2 ring-teal-300';
                            } else if (isAssigned) {
                              seatStyle = 'bg-teal-100 border-2 border-teal-600 text-teal-900 font-extrabold';
                            } else if (isExitRow || isPremiumRow) {
                              seatStyle = 'bg-amber-50 border-2 border-amber-400 text-amber-950 hover:bg-amber-100';
                            } else if (isBusinessRow) {
                              seatStyle = 'bg-indigo-50 border-2 border-indigo-400 text-indigo-950 hover:bg-indigo-100';
                            }

                            return (
                              <button
                                key={code}
                                type="button"
                                disabled={isOccupied}
                                onClick={() => handleSeatClick(code)}
                                className={`w-8 h-8 sm:w-9 sm:h-9 rounded-xl flex flex-col items-center justify-center text-xs font-bold transition-all cursor-pointer relative ${seatStyle}`}
                                title={isOccupied ? `Seat ${code} is occupied` : `Pre-book Seat ${code}`}
                              >
                                <span>{code.replace(/[0-9]/g, '')}</span>
                                {isAssigned && (
                                  <span className="text-[8px] -mt-1 font-extrabold text-teal-900">
                                    P{assignedPaxIndex + 1}
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

              <div className="w-36 h-6 border-b-2 border-x-2 border-slate-300 rounded-b-xl flex items-center justify-center text-[10px] text-slate-400 font-bold mt-4">
                Galley / Restrooms
              </div>
            </div>

            {/* Right Summary & Passenger Assignment Box */}
            <div className="md:col-span-5 flex flex-col justify-between space-y-4">
              
              {/* Passenger Seat Allocation Selector */}
              <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-extrabold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                    <Users className="w-4 h-4 text-teal-600" />
                    <span>Select Seat for Traveler</span>
                  </h4>
                  <button
                    type="button"
                    onClick={handleAddPassenger}
                    className="text-[11px] font-bold text-teal-700 hover:text-teal-900 bg-teal-50 hover:bg-teal-100 border border-teal-200 px-2 py-0.5 rounded-lg transition-colors cursor-pointer"
                  >
                    + Add Passenger
                  </button>
                </div>

                <div className="space-y-2">
                  {passengers.map((pax, idx) => {
                    const isSelected = activePassengerIdx === idx;
                    return (
                      <div
                        key={pax.id}
                        onClick={() => setActivePassengerIdx(idx)}
                        className={`p-3 rounded-xl border flex items-center justify-between transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-teal-600 text-white border-teal-700 shadow-sm'
                            : 'bg-white text-slate-800 border-slate-200 hover:bg-slate-100'
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <div className={`w-7 h-7 rounded-lg flex items-center justify-center font-bold text-xs ${
                            isSelected ? 'bg-white/20 text-white' : 'bg-teal-50 text-teal-700'
                          }`}>
                            P{idx + 1}
                          </div>
                          <div>
                            <span className="text-xs font-bold block">{pax.fullName}</span>
                            <span className={`text-[10px] ${isSelected ? 'text-teal-100' : 'text-slate-400'}`}>
                              {getSeatDetails(pax.seatCode).category}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <span className={`px-2.5 py-1 rounded-lg text-xs font-extrabold ${
                            isSelected ? 'bg-white text-teal-900' : 'bg-teal-50 text-teal-800 border border-teal-200'
                          }`}>
                            {pax.seatCode}
                          </span>
                          {passengers.length > 1 && (
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleRemovePassenger(idx);
                              }}
                              className={`p-1 rounded-md hover:bg-red-500/20 text-xs ${isSelected ? 'text-white' : 'text-slate-400 hover:text-red-600'}`}
                              title="Remove passenger"
                            >
                              &times;
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Selected Seat Specs & Features */}
              <div className="bg-gradient-to-br from-teal-900 to-slate-900 text-white rounded-3xl p-5 shadow-xl border border-teal-700/50 space-y-3">
                <div className="flex items-center justify-between text-xs text-teal-300 font-bold border-b border-white/10 pb-2">
                  <span>Selected Seat: {primarySeatInfo.code}</span>
                  <span className="bg-teal-500/25 px-2 py-0.5 rounded text-teal-200 border border-teal-400/30">
                    {primarySeatInfo.category}
                  </span>
                </div>

                <div className="space-y-1.5 text-xs text-slate-200">
                  {primarySeatInfo.features.slice(0, 3).map((f, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <Check className="w-3.5 h-3.5 text-teal-400 shrink-0 mt-0.5" />
                      <span>{f}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => setActiveStep('passengers')}
                  className="px-5 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-extrabold shadow-sm transition-all cursor-pointer flex items-center gap-2"
                >
                  <span>Continue to Passenger Info &rarr;</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* STEP 2: PASSENGER DETAILS & PRE-BOOKING PERKS */}
        {activeStep === 'passengers' && (
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5">
            <div className="bg-teal-50 border border-teal-200 rounded-2xl p-4 flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-teal-700 shrink-0 mt-0.5" />
              <div className="text-xs text-teal-950 space-y-0.5">
                <strong className="font-bold block">Complimentary Transit Seat Pre-Booking Included</strong>
                <p className="text-teal-800">
                  Your selected seats are temporarily held. Please verify passenger names and preferences to generate your confirmed digital boarding pass.
                </p>
              </div>
            </div>

            {/* Passenger Forms */}
            <div className="space-y-4">
              {passengers.map((pax, idx) => (
                <div key={pax.id} className="bg-slate-50 rounded-2xl p-4 sm:p-5 border border-slate-200 space-y-3">
                  <div className="flex items-center justify-between border-b border-slate-200/80 pb-2">
                    <div className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-teal-600 text-white flex items-center justify-center text-xs font-bold">
                        {idx + 1}
                      </span>
                      <h4 className="text-sm font-bold text-slate-900">
                        Traveler {idx + 1} &middot; Seat {pax.seatCode}
                      </h4>
                    </div>
                    <span className="px-2 py-0.5 rounded-full bg-teal-100 text-teal-800 text-[10px] font-extrabold">
                      {pax.seatType.toUpperCase()} SEAT
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 mb-1">Full Legal Name</label>
                      <input
                        type="text"
                        value={pax.fullName}
                        onChange={(e) => handleUpdatePassenger(idx, 'fullName', e.target.value)}
                        placeholder="e.g. Johnathan Doe"
                        className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 text-xs text-slate-800 focus:outline-teal-500 font-medium"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 mb-1">ID / Passport Number</label>
                      <input
                        type="text"
                        value={pax.idNumber || ''}
                        onChange={(e) => handleUpdatePassenger(idx, 'idNumber', e.target.value)}
                        placeholder="e.g. P1294821"
                        className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 text-xs text-slate-800 focus:outline-teal-500 font-medium"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 mb-1">In-Transit Meal Choice</label>
                      <select
                        value={pax.mealPreference || 'Standard Meal'}
                        onChange={(e) => handleUpdatePassenger(idx, 'mealPreference', e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 text-xs text-slate-800 focus:outline-teal-500 font-medium"
                      >
                        <option value="Standard Meal / Chef Special">Standard Meal / Chef Special</option>
                        <option value="Vegetarian Hindu / Indian Meal">Vegetarian Hindu / Indian Meal</option>
                        <option value="Jain Pure Vegetarian">Jain Pure Vegetarian</option>
                        <option value="Vegan Plant-Based">Vegan Plant-Based</option>
                        <option value="Gluten-Free &amp; Diabetic Friendly">Gluten-Free &amp; Diabetic Friendly</option>
                        <option value="Halal Certified Meal">Halal Certified Meal</option>
                      </select>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Step 2 Actions */}
            <div className="flex items-center justify-between pt-3 border-t border-slate-200">
              <button
                type="button"
                onClick={() => setActiveStep('select')}
                className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors cursor-pointer"
              >
                &larr; Back to Seat Map
              </button>
              <button
                type="button"
                onClick={handleFinalizePreBooking}
                className="px-6 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-extrabold shadow-md hover:shadow-lg transition-all cursor-pointer flex items-center gap-2"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Confirm &amp; Lock Pre-Booking</span>
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: CONFIRMED BOARDING PASS & DIGITAL TICKET */}
        {activeStep === 'confirmed' && (
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
            
            {/* Success Alert Banner */}
            <div className="bg-emerald-50 border border-emerald-200 rounded-3xl p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shrink-0">
                  <Check className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[11px] font-extrabold uppercase tracking-wider text-emerald-800 block">
                    Pre-Booking Confirmed &middot; Guaranteed Seats Locked
                  </span>
                  <h3 className="text-base sm:text-lg font-extrabold font-display text-emerald-950">
                    Seats {passengers.map(p => p.seatCode).join(', ')} reserved for {destination}
                  </h3>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleCopyPNR}
                  className="px-3 py-1.5 rounded-xl bg-white border border-emerald-300 text-emerald-800 text-xs font-bold hover:bg-emerald-100 transition-colors flex items-center gap-1.5 cursor-pointer shadow-2xs"
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span>{copiedPNR ? 'Copied PNR!' : `PNR: ${pnr}`}</span>
                </button>
              </div>
            </div>

            {/* Digital Boarding Pass Ticket Component */}
            <div className="bg-gradient-to-r from-slate-900 via-teal-950 to-slate-900 rounded-3xl text-white shadow-2xl border border-teal-700/50 overflow-hidden relative">
              
              {/* Header Bar */}
              <div className="p-4 sm:p-6 border-b border-white/10 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  {vehicleType === 'flight' ? <Plane className="w-5 h-5 text-teal-400" /> : <Train className="w-5 h-5 text-teal-400" />}
                  <span className="font-extrabold text-sm uppercase tracking-wider text-white">
                    TripGenie Transit Pass &middot; {carrier}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="px-3 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/40 text-xs font-extrabold">
                    CONFIRMED PRE-BOOKING
                  </span>
                  <span className="text-xs text-slate-300 font-mono">
                    Ref: {pnr}
                  </span>
                </div>
              </div>

              {/* Route & Seat Grid */}
              <div className="p-4 sm:p-6 grid grid-cols-1 md:grid-cols-12 gap-6">
                {/* Flight/Train Details */}
                <div className="md:col-span-8 space-y-4">
                  <div className="flex items-center justify-between border-b border-white/10 pb-4">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-slate-400 block">Departure</span>
                      <span className="text-xl sm:text-2xl font-black font-display text-white">{sourceCity}</span>
                      <span className="text-xs text-teal-300 block">08:45 AM &middot; {travelDate}</span>
                    </div>

                    <div className="flex flex-col items-center px-3">
                      <span className="text-[10px] text-slate-400 font-bold mb-1">Non-Stop</span>
                      <div className="w-20 sm:w-28 h-0.5 bg-teal-400/40 relative">
                        <span className="absolute left-1/2 -top-1.5 -translate-x-1/2 w-3 h-3 rounded-full bg-teal-400" />
                      </div>
                      <span className="text-[10px] text-teal-300 mt-1 font-mono">{vehicleNumber}</span>
                    </div>

                    <div className="text-right">
                      <span className="text-[10px] uppercase font-bold text-slate-400 block">Arrival</span>
                      <span className="text-xl sm:text-2xl font-black font-display text-white">{destination}</span>
                      <span className="text-xs text-teal-300 block">11:15 AM &middot; {travelDate}</span>
                    </div>
                  </div>

                  {/* Passenger & Seats List */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 text-xs">
                    <div>
                      <span className="text-[10px] uppercase text-slate-400 font-bold block">Assigned Seats</span>
                      <span className="text-base font-extrabold text-teal-300">
                        {passengers.map(p => p.seatCode).join(', ')}
                      </span>
                    </div>
                    <div>
                      <span className="text-[10px] uppercase text-slate-400 font-bold block">Class / Cabin</span>
                      <span className="text-xs font-bold text-white">
                        {passengers[0]?.cabinClass || 'Standard Economy'}
                      </span>
                    </div>
                    <div>
                      <span className="text-[10px] uppercase text-slate-400 font-bold block">Gate / Platform</span>
                      <span className="text-xs font-bold text-white">
                        {completedBooking.gateOrPlatform}
                      </span>
                    </div>
                    <div>
                      <span className="text-[10px] uppercase text-slate-400 font-bold block">Baggage</span>
                      <span className="text-xs font-bold text-teal-200">
                        Included
                      </span>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-white/10 text-xs text-slate-300">
                    <span className="font-bold text-white">Passengers: </span>
                    {passengers.map(p => `${p.fullName} (Seat ${p.seatCode})`).join(' &middot; ')}
                  </div>
                </div>

                {/* QR & Barcode Section */}
                <div className="md:col-span-4 bg-white/5 border border-white/10 rounded-2xl p-4 flex flex-col items-center justify-center text-center space-y-3">
                  <div className="p-2 bg-white rounded-xl shadow-inner">
                    <QrCode className="w-24 h-24 text-slate-950" />
                  </div>
                  <div className="space-y-0.5">
                    <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-widest">
                      Digital Boarding Key
                    </span>
                    <span className="text-xs font-mono font-bold text-teal-300">
                      {pnr}-PASS
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
              <button
                type="button"
                onClick={() => setActiveStep('select')}
                className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors cursor-pointer"
              >
                &larr; Modify Seat Selection
              </button>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handlePrintOrDownload}
                  className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <Printer className="w-4 h-4" />
                  <span>Print Ticket</span>
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="px-5 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-extrabold shadow-sm transition-all cursor-pointer"
                >
                  Done &amp; Return to Trip
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
