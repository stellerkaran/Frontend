'use client';

import React, { useEffect, useRef, useState } from 'react';
import type { CollegeMapItem } from '@/src/data-college/jharkhandCollegesMapData';

interface LeafletMapViewProps {
  colleges: CollegeMapItem[];
  selectedCollege: CollegeMapItem | null;
  onSelectCollege: (college: CollegeMapItem) => void;
  userCoords: { lat: number; lng: number } | null;
  userLocationName: string;
  onMapClickLocation: (coords: { lat: number; lng: number }) => void;
}

export default function LeafletMapView({
  colleges,
  selectedCollege,
  onSelectCollege,
  userCoords,
  userLocationName,
  onMapClickLocation
}: LeafletMapViewProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const markersGroupRef = useRef<any>(null);
  const userMarkerRef = useRef<any>(null);
  const [isMapReady, setIsMapReady] = useState(false);

  // Initialize Map Once on Client
  useEffect(() => {
    if (typeof window === 'undefined' || !mapContainerRef.current) return;

    let isMounted = true;

    const initMap = async () => {
      try {
        const L = (await import('leaflet')).default;

        // Ensure Leaflet styles are present in the document
        if (!document.getElementById('leaflet-css-bundle')) {
          const link = document.createElement('link');
          link.id = 'leaflet-css-bundle';
          link.rel = 'stylesheet';
          link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
          link.integrity = 'sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY=';
          link.crossOrigin = '';
          document.head.appendChild(link);
        }

        if (!mapInstanceRef.current && mapContainerRef.current && isMounted) {
          // Center of Jharkhand (Ranchi / Bokaro region)
          const map = L.map(mapContainerRef.current, {
            center: [23.6102, 85.2799],
            zoom: 8,
            minZoom: 6,
            maxZoom: 18,
            zoomControl: false,
            attributionControl: false
          });

          // Free OpenStreetMap tiles (no API key required, completely free and open-source)
          L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          }).addTo(map);
          // Add Zoom control at top-right
          L.control.zoom({ position: 'topright' }).addTo(map);

          // Layer group for college markers
          const markersGroup = L.layerGroup().addTo(map);
          markersGroupRef.current = markersGroup;
          mapInstanceRef.current = map;
          setIsMapReady(true);
        }
      } catch (err) {
        console.error('Error initializing Leaflet map:', err);
      }
    };

    initMap();

    return () => {
      isMounted = false;
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  // Update Markers when colleges or userCoords change
  useEffect(() => {
    if (!isMapReady || !mapInstanceRef.current || !markersGroupRef.current) return;

    let isMounted = true;

    const renderMarkers = async () => {
      const L = (await import('leaflet')).default;
      if (!isMounted || !mapInstanceRef.current || !markersGroupRef.current) return;

      const map = mapInstanceRef.current;
      const markersGroup = markersGroupRef.current;

      markersGroup.clearLayers();

      // Color mapping for marker categories
      const getCategoryBadgeClass = (category: string) => {
        if (category === "Government Women's Polytechnic") return { bg: '#8b5cf6', ring: '#7c3aed', icon: '👩‍🎓', label: 'Womens GP' };
        if (category === 'Government Polytechnic') return { bg: '#059669', ring: '#047857', icon: '🏛️', label: 'Govt GP' };
        if (category === 'Government B.Tech') return { bg: '#2563eb', ring: '#1d4ed8', icon: '🎓', label: 'Govt B.Tech' };
        if (category === 'PPP Engineering') return { bg: '#d97706', ring: '#b45309', icon: '⚙️', label: 'PPP B.Tech' };
        if (category === 'Premier Institute') return { bg: '#dc2626', ring: '#b91c1c', icon: '⭐', label: 'Premier' };
        return { bg: '#475569', ring: '#334155', icon: '🏫', label: 'Private' };
      };

      const latLngs: [number, number][] = [];

      colleges.forEach((college) => {
        const { bg, ring, icon } = getCategoryBadgeClass(college.category);
        const isSelected = selectedCollege?.id === college.id;

        const customIcon = L.divIcon({
          className: 'custom-college-marker',
          html: `
            <div style="
              display: flex;
              align-items: center;
              justify-content: center;
              background-color: ${isSelected ? '#0f172a' : bg};
              color: #ffffff;
              width: ${isSelected ? '38px' : '30px'};
              height: ${isSelected ? '38px' : '30px'};
              border-radius: 50%;
              border: 3px solid ${isSelected ? '#38bdf8' : '#ffffff'};
              box-shadow: 0 4px 10px rgba(0,0,0,0.3);
              font-size: ${isSelected ? '16px' : '13px'};
              cursor: pointer;
              transition: all 0.2s ease-in-out;
              transform: ${isSelected ? 'scale(1.15)' : 'scale(1)'};
            ">
              <span>${icon}</span>
            </div>
            <div style="
              background: rgba(15, 23, 42, 0.9);
              color: #ffffff;
              padding: 2px 6px;
              border-radius: 4px;
              font-size: 10px;
              font-weight: 700;
              white-space: nowrap;
              position: absolute;
              top: 100%;
              left: 50%;
              transform: translateX(-50%);
              margin-top: 3px;
              pointer-events: none;
              box-shadow: 0 2px 4px rgba(0,0,0,0.2);
              display: ${isSelected ? 'block' : 'none'};
            ">
              ${college.shortName}
            </div>
          `,
          iconSize: [32, 32],
          iconAnchor: [16, 16],
          popupAnchor: [0, -18]
        });

        const marker = L.marker([college.coordinates.lat, college.coordinates.lng], {
          icon: customIcon,
          title: college.name
        });

        // Rich Popup Content
        const popupContent = `
          <div style="font-family: system-ui, -apple-system, sans-serif; min-width: 240px; max-width: 290px; padding: 2px;">
            <div style="display: flex; align-items: center; justify-content: space-between; gap: 8px; margin-bottom: 6px;">
              <span style="background: ${bg}15; color: ${bg}; border: 1px solid ${bg}40; font-size: 10px; font-weight: 700; padding: 2px 6px; border-radius: 4px;">
                ${college.typeBadge}
              </span>
              <span style="font-size: 11px; font-weight: 600; color: #64748b;">
                📍 ${college.district}
              </span>
            </div>
            <h4 style="font-size: 14px; font-weight: 800; color: #0f172a; margin: 0 0 4px 0; line-height: 1.3;">
              ${college.name}
            </h4>
            <p style="font-size: 11px; color: #475569; margin: 0 0 8px 0; line-height: 1.4;">
              ${college.address}
            </p>
            
            <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 6px; padding: 6px 8px; margin-bottom: 8px; font-size: 11px;">
              <div style="display: flex; align-items: center; gap: 4px; color: #0369a1; font-weight: 600; margin-bottom: 3px;">
                🚆 <strong>Train:</strong> ${college.nearestRailwayStation.name} (${college.nearestRailwayStation.distanceKm} km)
              </div>
              <div style="display: flex; justify-content: space-between; color: #334155; font-weight: 500;">
                <span>👥 Seats: <strong>${college.totalSeats}</strong></span>
                <span>💰 Fee: <strong>₹${college.avgFeesPerYear.toLocaleString()}/yr</strong></span>
              </div>
            </div>

            <div style="display: flex; gap: 6px; margin-top: 8px;">
              ${
                college.route
                  ? `<a href="${college.route}" style="flex: 1; text-align: center; background: #0284c7; color: #ffffff; text-decoration: none; padding: 6px 8px; border-radius: 6px; font-size: 11px; font-weight: 700;">
                      View Details & Cutoff →
                    </a>`
                  : ''
              }
              <a href="${college.googleMapsUrl}" target="_blank" rel="noopener noreferrer" style="display: flex; align-items: center; justify-content: center; background: #f1f5f9; color: #334155; text-decoration: none; padding: 6px 10px; border-radius: 6px; font-size: 11px; font-weight: 600; border: 1px solid #cbd5e1;" title="Open in Google Maps">
                🧭 Map
              </a>
            </div>
          </div>
        `;

        marker.bindPopup(popupContent, { maxWidth: 320 });

        marker.on('mouseover', () => {
          marker.openPopup();
        });

        marker.on('mouseout', () => {
          if (!isSelected) {
            marker.closePopup();
          }
        });

        marker.on('click', () => {
          onSelectCollege(college);
        });

        markersGroup.addLayer(marker);
        latLngs.push([college.coordinates.lat, college.coordinates.lng]);

        if (isSelected) {
          marker.openPopup();
        }
      });

      // Render User GPS / Selected Origin Marker
      if (userCoords) {
        if (userMarkerRef.current) {
          map.removeLayer(userMarkerRef.current);
        }

        const userIcon = L.divIcon({
          className: 'custom-user-marker',
          html: `
            <div style="
              display: flex;
              align-items: center;
              justify-content: center;
              background-color: #0284c7;
              color: #ffffff;
              width: 32px;
              height: 32px;
              border-radius: 50%;
              border: 3px solid #ffffff;
              box-shadow: 0 0 0 4px rgba(2, 132, 199, 0.4);
              font-size: 14px;
            ">
              📍
            </div>
          `,
          iconSize: [32, 32],
          iconAnchor: [16, 16]
        });

        const uMarker = L.marker([userCoords.lat, userCoords.lng], {
          icon: userIcon,
          zIndexOffset: 1000
        }).bindPopup(`<strong>Your Origin:</strong> ${userLocationName}`);

        uMarker.addTo(map);
        userMarkerRef.current = uMarker;
      }
    };

    renderMarkers();

    return () => {
      isMounted = false;
    };
  }, [isMapReady, colleges, selectedCollege, onSelectCollege, userCoords, userLocationName]);

  // Pan to selected college when it changes
  useEffect(() => {
    if (!mapInstanceRef.current || !selectedCollege) return;
    mapInstanceRef.current.flyTo(
      [selectedCollege.coordinates.lat, selectedCollege.coordinates.lng],
      13,
      { animate: true, duration: 1.2 }
    );
  }, [selectedCollege]);

  const handleResetView = () => {
    if (!mapInstanceRef.current) return;
    mapInstanceRef.current.flyTo([23.6102, 85.2799], 8, { animate: true, duration: 0.8 });
  };

  return (
    <div className="relative w-full h-[460px] sm:h-[640px] lg:h-[640px] rounded-2xl overflow-hidden border border-slate-200 shadow-inner bg-slate-100">
      {/* The Leaflet map DOM element */}
      <div ref={mapContainerRef} className="w-full h-full absolute inset-0 z-0" />

      {/* Floating Control: Reset Map View */}
      <div className="absolute top-2 left-2 sm:top-4 sm:left-4 z-10 flex flex-col gap-2">
        <button
          onClick={handleResetView}
          className="bg-white/95 backdrop-blur hover:bg-slate-900 hover:text-white text-slate-800 text-[10px] sm:text-xs font-bold px-2.5 py-1.5 sm:px-3 sm:py-2 rounded-lg sm:rounded-xl shadow-md border border-slate-200 flex items-center gap-1 sm:gap-1.5 transition-all"
          title="Reset to Full Jharkhand Overview"
        >
          <span>🔄</span> <span>Reset Overview</span>
        </button>
      </div>

      {/* Map Legend Overlay */}
      <div className="absolute bottom-2 left-2 sm:bottom-4 sm:left-4 z-10 bg-white/95 backdrop-blur p-2 sm:p-2.5 rounded-xl border border-slate-200/90 shadow-md text-[10px] sm:text-xs max-w-[calc(100%-16px)] sm:max-w-[280px]">
        <div className="font-extrabold text-slate-800 mb-1 flex items-center justify-between text-[10px] uppercase tracking-wider">
          <span>Map Pins</span>
          <span className="text-teal-700 font-bold">{colleges.length} Shown</span>
        </div>
        <div className="grid grid-cols-2 gap-1 text-[10px] text-slate-700 font-medium leading-tight">
          <div className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-emerald-600 inline-block shrink-0" />
            <span className="truncate">Govt GP</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-purple-600 inline-block shrink-0" />
            <span className="truncate">Women&apos;s GP</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-blue-600 inline-block shrink-0" />
            <span className="truncate">Govt B.Tech</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-amber-600 inline-block shrink-0" />
            <span className="truncate">PPP Engg</span>
          </div>
          <div className="flex items-center gap-1 col-span-2">
            <span className="w-2 h-2 rounded-full bg-red-600 inline-block shrink-0" />
            <span className="truncate">Premier (NIT/IIT/IIIT)</span>
          </div>
        </div>
      </div>
    </div>
  );
}