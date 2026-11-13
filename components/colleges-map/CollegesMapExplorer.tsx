'use client';

import React, { useState, useMemo } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import {
  MapPin,
  Search,
  SlidersHorizontal,
  Train,
  School,
  Compass,
  Navigation2,
  GraduationCap,
  Sparkles,
  ExternalLink,
  ChevronRight,
  Filter,
  CheckCircle2,
  RotateCcw,
  Building2,
  Info
} from 'lucide-react';
import {
  JHARKHAND_COLLEGES_MAP_DATA,
  JHARKHAND_DISTRICTS,
  DISTRICT_COORDINATES,
  calculateDistanceKm,
  type CollegeMapItem
} from '@/src/data-college/jharkhandCollegesMapData';

// Live counts derived from the dataset — avoids stale "40+ institutes / all 24 districts" copy
// when colleges are added or removed from the map data.
const MAPPED_INSTITUTE_COUNT = JHARKHAND_COLLEGES_MAP_DATA.length;
const MAPPED_DISTRICT_COUNT = new Set(
  JHARKHAND_COLLEGES_MAP_DATA.map((college) => college.district)
).size;

// Dynamically load the Leaflet map client-side only
const DynamicLeafletMap = dynamic(
  () => import('./LeafletMapView'),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-full min-h-[460px] lg:min-h-[640px] rounded-2xl bg-slate-100 flex flex-col items-center justify-center border border-slate-200 p-8 text-center">
        <div className="w-12 h-12 border-4 border-teal-600 border-t-transparent rounded-full animate-spin mb-4" />
        <p className="font-bold text-slate-800 text-base">Loading Jharkhand Technical Colleges Map...</p>
        <p className="text-xs text-slate-500 mt-1">Plotting {MAPPED_INSTITUTE_COUNT} Technical Institutes across {MAPPED_DISTRICT_COUNT} Districts</p>
      </div>
    )
  }
);

interface CollegesMapExplorerProps {
  embedded?: boolean;
}

const ALL_TRAIN_DISTANCE_KM = Number.POSITIVE_INFINITY;

export default function CollegesMapExplorer({ embedded = false }: CollegesMapExplorerProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [selectedDistrict, setSelectedDistrict] = useState<string>('All Districts');
  const [selectedCollege, setSelectedCollege] = useState<CollegeMapItem | null>(null);

  // Distance & Location State
  const [referenceLocation, setReferenceLocation] = useState<string>('Ranchi');
  const [useGpsLocation, setUseGpsLocation] = useState<boolean>(false);
  const [userCustomCoords, setUserCustomCoords] = useState<{ lat: number; lng: number } | null>(
    DISTRICT_COORDINATES['Ranchi']
  );
  const [isLocating, setIsLocating] = useState<boolean>(false);
  const [locationStatus, setLocationStatus] = useState<string>('📍 Nearby colleges based on: Ranchi (Default)');

  // Train Proximity Filter
  const [maxTrainDistanceKm, setMaxTrainDistanceKm] = useState<number>(ALL_TRAIN_DISTANCE_KM);

  // Filter & Sort Logic
  const filteredColleges = useMemo(() => {
    return JHARKHAND_COLLEGES_MAP_DATA.filter((col) => {
      // 1. Search Query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = col.name.toLowerCase().includes(q) || col.shortName.toLowerCase().includes(q);
        const matchesCity = col.address.toLowerCase().includes(q) || col.district.toLowerCase().includes(q);
        const matchesBranch = col.branches.some((b) => b.toLowerCase().includes(q));
        const matchesRailway = col.nearestRailwayStation.name.toLowerCase().includes(q) || col.nearestRailwayStation.code.toLowerCase().includes(q);
        if (!matchesName && !matchesCity && !matchesBranch && !matchesRailway) return false;
      }

      // 2. Category
      if (selectedCategory !== 'ALL') {
        if (selectedCategory === 'GP' && col.category !== 'Government Polytechnic') return false;
        if (selectedCategory === 'GWP' && col.category !== "Government Women's Polytechnic") return false;
        if (selectedCategory === 'BTECH' && col.category !== 'Government B.Tech' && col.category !== 'PPP Engineering') return false;
        if (selectedCategory === 'PREMIER' && col.category !== 'Premier Institute') return false;
      }

      // 3. District
      if (selectedDistrict !== 'All Districts' && col.district !== selectedDistrict) {
        return false;
      }

      // 4. Railway Proximity
      if (col.nearestRailwayStation.distanceKm > maxTrainDistanceKm) {
        return false;
      }

      return true;
    }).map((col) => {
      // Calculate distance if reference coordinate available
      let calculatedDist: number | null = null;
      if (userCustomCoords) {
        calculatedDist = calculateDistanceKm(
          userCustomCoords.lat,
          userCustomCoords.lng,
          col.coordinates.lat,
          col.coordinates.lng
        );
      }
      return {
        ...col,
        userDistanceKm: calculatedDist
      };
    }).sort((a, b) => {
      if (a.userDistanceKm !== null && b.userDistanceKm !== null) {
        return a.userDistanceKm - b.userDistanceKm;
      }
      return a.name.localeCompare(b.name);
    });
  }, [searchQuery, selectedCategory, selectedDistrict, maxTrainDistanceKm, userCustomCoords]);

  // Handle GPS location trigger
  const handleGetGpsLocation = () => {
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by your browser.');
      return;
    }

    setIsLocating(true);
    setLocationStatus('Detecting your GPS location...');

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const coords = {
          lat: pos.coords.latitude,
          lng: pos.coords.longitude
        };
        setUserCustomCoords(coords);
        setUseGpsLocation(true);
        setReferenceLocation('My Live GPS Location');
        setLocationStatus('📍 Nearby colleges sorted by your Live GPS Location');
        setIsLocating(false);
      },
      (err) => {
        console.warn('Geolocation error:', err);
        setIsLocating(false);
        setLocationStatus('📍 Could not fetch GPS. Showing nearby colleges from Ranchi.');
        setUserCustomCoords(DISTRICT_COORDINATES['Ranchi']);
        setUseGpsLocation(false);
        setReferenceLocation('Ranchi');
      },
      { timeout: 10000, enableHighAccuracy: true }
    );
  };

  // Handle District selection for distance reference
  const handleReferenceDistrictChange = (distName: string) => {
    setReferenceLocation(distName);
    setUseGpsLocation(false);
    if (DISTRICT_COORDINATES[distName]) {
      setUserCustomCoords(DISTRICT_COORDINATES[distName]);
      setLocationStatus(`📍 Nearby colleges sorted by proximity to ${distName}`);
    }
  };

  // Handle user clicking directly on the map to set origin
  const handleMapClickLocation = (coords: { lat: number; lng: number }) => {
    setUserCustomCoords(coords);
    setUseGpsLocation(false);
    setReferenceLocation('Pinned Location on Map');
    setLocationStatus(`📍 Nearby colleges sorted from pinned map location (${coords.lat.toFixed(2)}°N, ${coords.lng.toFixed(2)}°E)`);
  };

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('ALL');
    setSelectedDistrict('All Districts');
    setMaxTrainDistanceKm(ALL_TRAIN_DISTANCE_KM);
    setSelectedCollege(null);
    setReferenceLocation('Ranchi');
    setUseGpsLocation(false);
    setUserCustomCoords(DISTRICT_COORDINATES['Ranchi']);
    setLocationStatus('📍 Nearby colleges based on: Ranchi (Default)');
  };

  return (
    <div className={embedded ? "w-full max-w-[1080px] mx-auto space-y-4 sm:space-y-6" : "w-full bg-slate-50 min-h-screen py-4 sm:py-8 px-2 sm:px-6 lg:px-8"}>
      <div className={embedded ? "space-y-4 sm:space-y-6" : "max-w-7xl mx-auto space-y-4 sm:space-y-6"}>
        {/* Header Section (Only on standalone page, or clean title in embedded) */}
        {!embedded ? (
          <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 border border-slate-200/90 shadow-sm relative overflow-hidden">
            <div className="absolute -top-12 -right-12 w-64 h-64 bg-gradient-to-br from-teal-100 to-emerald-100 rounded-full blur-3xl opacity-60 pointer-events-none" />
            
            <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-4 sm:gap-6">
              <div className="space-y-1.5 sm:space-y-2 max-w-3xl">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full bg-teal-50 border border-teal-200 text-teal-800 text-[10px] sm:text-xs font-bold uppercase tracking-wider">
                  <Compass className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-teal-600 animate-spin-slow" />
                  Interactive Map & Distance Finder
                </div>
                <h1 className="text-xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
                  Jharkhand Technical Colleges Map
                </h1>
                <p className="text-xs sm:text-base text-slate-600 leading-relaxed">
                  Explore exact campus locations for all Government Polytechnics, Women’s Polytechnics, Govt & PPP B.Tech Colleges, and National Institutes across {MAPPED_DISTRICT_COUNT} districts of Jharkhand. Filter by distance, nearest railway stations, and offered branches.
                </p>
              </div>

              {/* Quick Summary Pill Badges */}
              <div className="flex flex-wrap sm:flex-nowrap md:flex-col gap-2 shrink-0">
                <div className="bg-teal-50/80 border border-teal-200/90 px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl sm:rounded-2xl flex items-center gap-2 sm:gap-3 flex-1 sm:flex-initial">
                  <div className="p-1.5 sm:p-2 bg-teal-600 text-white rounded-lg sm:rounded-xl shrink-0">
                    <Building2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  </div>
                  <div>
                    <div className="text-[10px] sm:text-xs text-slate-500 font-semibold">Mapped Colleges</div>
                    <div className="text-sm sm:text-lg font-extrabold text-teal-900">{JHARKHAND_COLLEGES_MAP_DATA.length} Institutes</div>
                  </div>
                </div>
                <div className="bg-indigo-50/80 border border-indigo-200/90 px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl sm:rounded-2xl flex items-center gap-2 sm:gap-3 flex-1 sm:flex-initial">
                  <div className="p-1.5 sm:p-2 bg-indigo-600 text-white rounded-lg sm:rounded-xl shrink-0">
                    <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  </div>
                  <div>
                    <div className="text-[10px] sm:text-xs text-slate-500 font-semibold">Districts Covered</div>
                    <div className="text-sm sm:text-lg font-extrabold text-indigo-900">{MAPPED_DISTRICT_COUNT} Districts</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
           <div className="cf-explore-head flex items-center justify-between gap-2 pt-2">
             <div>
               <h3 className="font-serif text-lg sm:text-2xl font-bold text-slate-900 m-0">
                 Colleges Map &amp; Distance Finder
               </h3>
            </div>
            <span className="text-[11px] sm:text-xs font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-full hidden sm:inline-block">
              📍 {MAPPED_DISTRICT_COUNT} Districts Mapped
            </span>
          </div>
        )}

        {/* Filter Control Dashboard */}
        <div className="bg-white rounded-xl sm:rounded-2xl p-3.5 sm:p-5 border border-slate-200 shadow-sm space-y-3 sm:space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3 sm:gap-4">
            {/* Search Input */}
            <div className="md:col-span-4 relative">
              <label className="block text-[10px] sm:text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                Search College / Branch / City
              </label>
              <div className="relative">
                <Search className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="e.g. Adityapur, Mining, BIT Sindri..."
                  className="w-full pl-8 sm:pl-10 pr-3 sm:pr-4 py-2 sm:py-2.5 bg-slate-50 border border-slate-300 rounded-lg sm:rounded-xl text-xs sm:text-sm font-medium text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:bg-white transition-all"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[11px] font-bold text-slate-400 hover:text-slate-600"
                  >
                    Clear
                  </button>
                )}
              </div>
            </div>

            {/* Category Filter Pills */}
            <div className="md:col-span-4">
              <label className="block text-[10px] sm:text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                Institute Type
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-1 sm:gap-1.5">
                {[
                  { id: 'ALL', label: 'All' },
                  { id: 'GP', label: 'Govt GP' },
                  { id: 'GWP', label: 'Women GP' },
                  { id: 'BTECH', label: 'B.Tech' }
                ].map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`py-1.5 sm:py-2 px-1 sm:px-2 text-[11px] sm:text-xs font-bold rounded-lg sm:rounded-xl transition-all text-center truncate ${
                      selectedCategory === cat.id
                        ? 'bg-teal-700 text-white shadow-sm ring-2 ring-teal-600/30'
                        : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>

            {/* District Selector */}
            <div className="md:col-span-4">
              <label className="block text-[10px] sm:text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                Select District (24 Districts)
              </label>
              <select
                value={selectedDistrict}
                onChange={(e) => setSelectedDistrict(e.target.value)}
                className="w-full py-2 sm:py-2.5 px-2.5 sm:px-3 bg-slate-50 border border-slate-300 rounded-lg sm:rounded-xl text-xs sm:text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:bg-white transition-all"
              >
                {JHARKHAND_DISTRICTS.map((dist) => (
                  <option key={dist} value={dist}>
                    {dist}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Secondary Filter Bar: Distance & Railway Proximity */}
          <div className="pt-3 border-t border-slate-100 flex flex-col gap-3 lg:grid lg:grid-cols-12 lg:gap-4 lg:items-center">
            {/* Origin & GPS Location Picker */}
            <div className="lg:col-span-6 flex flex-wrap items-center gap-1.5 sm:gap-2">
              <span className="text-xs font-bold text-slate-700 flex items-center gap-1 shrink-0">
                <Navigation2 className="w-3.5 h-3.5 text-teal-600" /> Measure From:
              </span>

              <button
                onClick={handleGetGpsLocation}
                disabled={isLocating}
                className={`text-[11px] sm:text-xs font-bold px-2.5 py-1.5 rounded-lg border transition-all flex items-center gap-1 ${
                  useGpsLocation
                    ? 'bg-teal-600 text-white border-teal-600'
                    : 'bg-white hover:bg-slate-100 text-slate-700 border-slate-300'
                }`}
                title="Use Current GPS Location"
              >
                <span>📍</span>
                <span>{isLocating ? 'Locating...' : 'Use My GPS'}</span>
              </button>

              <select
                value={useGpsLocation ? '' : referenceLocation}
                onChange={(e) => handleReferenceDistrictChange(e.target.value)}
                className="text-[11px] sm:text-xs font-semibold py-1.5 px-2 bg-slate-100 border border-slate-300 rounded-lg text-slate-800 focus:outline-none focus:ring-1 focus:ring-teal-500 max-w-[140px] sm:max-w-none truncate"
              >
                {Object.keys(DISTRICT_COORDINATES).map((dist) => (
                  <option key={dist} value={dist}>
                    District: {dist}
                  </option>
                ))}
              </select>

              <div className="inline-flex items-center text-[10px] sm:text-[11px] font-bold text-teal-800 bg-teal-50 border border-teal-200/80 px-2 py-1 rounded-md w-full sm:w-auto truncate">
                {locationStatus}
              </div>
            </div>

            {/* Railway Station Proximity Range */}
            <div className="lg:col-span-4 flex flex-wrap sm:flex-nowrap items-center gap-2">
              <span className="text-xs font-bold text-slate-700 whitespace-nowrap flex items-center gap-1 shrink-0">
                <Train className="w-3.5 h-3.5 text-sky-600" /> Rail Dist:
              </span>
              <div className="grid grid-cols-4 sm:flex gap-1 w-full sm:w-auto sm:flex-1">
                {[
                  { label: 'All', dist: ALL_TRAIN_DISTANCE_KM },
                  { label: '≤ 5 km', dist: 5 },
                  { label: '≤ 15 km', dist: 15 },
                  { label: '≤ 30 km', dist: 30 }
                ].map((item) => (
                  <button
                    key={item.dist}
                    onClick={() => setMaxTrainDistanceKm(item.dist)}
                    className={`text-[10px] sm:text-[11px] font-bold px-1.5 sm:px-2 py-1 rounded-md border text-center transition-all ${
                      maxTrainDistanceKm === item.dist
                        ? 'bg-sky-600 text-white border-sky-600'
                        : 'bg-slate-50 hover:bg-slate-100 text-slate-600 border-slate-200'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Reset Button */}
            <div className="lg:col-span-2 flex justify-end">
              <button
                onClick={handleResetFilters}
                className="text-xs font-bold text-slate-600 hover:text-red-600 flex items-center gap-1 transition-colors px-1 py-1"
              >
                <RotateCcw className="w-3.5 h-3.5" /> Reset Filters
              </button>
            </div>
          </div>
        </div>

        {/* Split View: Interactive Map (Left/Top) + Synchronized College Cards (Right/Bottom) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 items-start">
          {/* MAP CONTAINER */}
          <div className="lg:col-span-12 sticky top-20 z-20 space-y-2 sm:space-y-3">
            <div className="flex items-center justify-between px-1">
              <div className="flex items-center gap-1.5">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-teal-600"></span>
                </span>
                <span className="text-[11px] sm:text-xs font-extrabold text-slate-800 uppercase tracking-wider">
                  Live GPS Vector Map
                </span>
              </div>
              <span className="text-[11px] sm:text-xs font-bold text-teal-800 bg-teal-50 px-2 py-0.5 rounded-full border border-teal-200">
                {filteredColleges.length} Colleges Found
              </span>
            </div>

            {/* The Dynamic Leaflet Component */}
            <DynamicLeafletMap
              colleges={filteredColleges}
              selectedCollege={selectedCollege}
              onSelectCollege={(c) => setSelectedCollege(c)}
              userCoords={userCustomCoords}
              userLocationName={referenceLocation}
              onMapClickLocation={handleMapClickLocation}
            />

          </div>

        </div>

      </div>
    </div>
  );
}