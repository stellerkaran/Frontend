"use client";

import React, { useState, useCallback } from 'react';
import Link from 'next/link';
import { ArrowLeft, Download, FileText, CheckCircle2, Search, BookOpen, GraduationCap, Clock, AlertCircle } from "lucide-react";

// Import actual paper URLs from data files for real downloads
import { SEM1_PAPERS } from '@/src/data_Resources/jharkhand/JharDiploma/Sem1Data';
import { SEM2_PAPERS } from '@/src/data_Resources/jharkhand/JharDiploma/Sem2Data';
import { SEM3_CSE_PAPERS } from '@/src/data_Resources/jharkhand/JharDiploma/Sem3CseData';
import { SEM3_ECE_PAPERS } from '@/src/data_Resources/jharkhand/JharDiploma/Sem3EceData';
import { SEM3_EEE_PAPERS } from '@/src/data_Resources/jharkhand/JharDiploma/Sem3EeeData';
import { SEM3_MECH_PAPERS } from '@/src/data_Resources/jharkhand/JharDiploma/Sem3MechData';
import { SEM4_CSE_PAPERS } from '@/src/data_Resources/jharkhand/JharDiploma/Sem4CseData';
import { SEM4_ECE_PAPERS } from '@/src/data_Resources/jharkhand/JharDiploma/Sem4EceData';
import { SEM4_EEE_PAPERS } from '@/src/data_Resources/jharkhand/JharDiploma/Sem4EeeData';
import { SEM4_MECH_PAPERS } from '@/src/data_Resources/jharkhand/JharDiploma/Sem4MechData';
import { SEM4_CIVIL_PAPERS } from '@/src/data_Resources/jharkhand/JharDiploma/Sem4CivilData';
import { SEM5_PAPERS } from '@/src/data_Resources/jharkhand/JharDiploma/Sem5Data';
import { SEM6_PAPERS } from '@/src/data_Resources/jharkhand/JharDiploma/Sem6Data';

// Build a lookup of subject-code to actual drive URL
const buildPaperUrlLookup = () => {
  const lookup = {};
  
  // Helper: get all papers from all data files
  const allPapers = {
    ...SEM1_PAPERS,
    ...SEM2_PAPERS,
    ...SEM3_CSE_PAPERS,
    ...SEM3_ECE_PAPERS,
    ...SEM3_EEE_PAPERS,
    ...SEM3_MECH_PAPERS,
    ...SEM4_CSE_PAPERS,
    ...SEM4_ECE_PAPERS,
    ...SEM4_EEE_PAPERS,
    ...SEM4_MECH_PAPERS,
    ...SEM4_CIVIL_PAPERS,
    ...SEM5_PAPERS,
    ...SEM6_PAPERS,
  };
  
  // Build lookup by subject code (based on naming convention: SUBJECT-YEAR)
  for (const [year, subjects] of Object.entries(allPapers)) {
    for (const [subjectName, url] of Object.entries(subjects)) {
      // Extract subject code from name and create lookup
      const subjectLower = subjectName.toLowerCase().trim();
      const code = Object.keys(allPapers).find(y => y === year);
      const yearNum = parseInt(year, 10);
      
      // Create codes for common subjects
      const codeMappings = {
        'engineering mathematics': `MATH-${yearNum}`,
        'engineering physics': `PHYS-${yearNum}`,
        'engineering chemistry': `CHEM-${yearNum}`,
        'communication skills in english': `COMM-${yearNum}`,
      };
      
      for (const [key, code] of Object.entries(codeMappings)) {
        if (subjectLower.includes(key)) {
          lookup[`${code}_${yearNum}`] = url;
        }
      }
    }
  }
  
  return lookup;
};

// Lookup of subject code to actual Google Drive URL
const PAPER_URL_LOOKUP = buildPaperUrlLookup();

const getDriveUrl = (subjectCode, year) => {
  const key = `${subjectCode}_${year}`;
  return PAPER_URL_LOOKUP[key] || null;
};

// Robust Mock Database for all subjects mapped to category and sub-route ids
export const resourcesDb = {
  "jharkhand-diploma": {
    "semester-1": {
      title: "Jharkhand Diploma 1st Semester PYQs",
      subtitle: "State-Level SBTE Board Exam Blueprint Hub",
      description: "Download certified previous years' board blueprints for 1st Semester Polytechnic Diploma candidates of all branches.",
      color: "linear-gradient(135deg, #1e3a8a, #3b82f6)",
      subjects: [
        { name: "Engineering Mathematics-I", code: "MATH-101", papers: [{ year: "2024", size: "1.8 MB" }, { year: "2023", size: "1.6 MB" }, { year: "2022", size: "1.5 MB" }] },
        { name: "Engineering Physics-I", code: "PHYS-102", papers: [{ year: "2024", size: "2.1 MB" }, { year: "2023", size: "1.9 MB" }, { year: "2022", size: "1.8 MB" }] },
        { name: "Engineering Chemistry-I", code: "CHEM-103", papers: [{ year: "2024", size: "2.3 MB" }, { year: "2023", size: "2.0 MB" }, { year: "2022", size: "1.9 MB" }] },
        { name: "Communication Skills in English", code: "COMM-104", papers: [{ year: "2024", size: "1.2 MB" }, { year: "2023", size: "1.1 MB" }] }
      ]
    },
    "semester-2": {
      title: "Jharkhand Diploma 2nd Semester PYQs",
      subtitle: "State-Level SBTE Board Exam Blueprint Hub",
      description: "Verified previous years' question matrices for 2nd Semester (All Branches) compiled for elite ranks.",
      color: "linear-gradient(135deg, #1e3a8a, #3b82f6)",
      subjects: [
        { name: "Engineering Mathematics-II", code: "MATH-201", papers: [{ year: "2024", size: "2.0 MB" }, { year: "2023", size: "1.7 MB" }] },
        { name: "Engineering Physics-II", code: "PHYS-202", papers: [{ year: "2024", size: "2.2 MB" }, { year: "2023", size: "1.9 MB" }] },
        { name: "Engineering Chemistry-II", code: "CHEM-203", papers: [{ year: "2024", size: "2.1 MB" }, { year: "2023", size: "1.8 MB" }] },
        { name: "Introduction to IT Systems", code: "COSC-204", papers: [{ year: "2024", size: "1.4 MB" }] }
      ]
    },
    "semester-3-ece": {
      title: "Jharkhand Diploma 3rd Semester PYQs (ECE)",
      subtitle: "Electronics & Communication Engineering Hub",
      description: "SBTE Jharkhand board electronics, digital networks, and semiconductors paper modules.",
      color: "linear-gradient(135deg, #1e3a8a, #3b82f6)",
      subjects: [
        { name: "Electronic Devices & Circuits", code: "ECE-301", papers: [{ year: "2024", size: "2.4 MB" }, { year: "2023", size: "2.1 MB" }] },
        { name: "Digital Electronics", code: "ECE-302", papers: [{ year: "2024", size: "1.9 MB" }, { year: "2023", size: "1.8 MB" }] },
        { name: "Network Theory & Circuit Analysis", code: "ECE-303", papers: [{ year: "2024", size: "2.1 MB" }] }
      ]
    },
    "semester-3-eee": {
      title: "Jharkhand Diploma 3rd Semester PYQs (EEE)",
      subtitle: "Electrical & Electronics Engineering Hub",
      description: "Original state question blueprints covering energy machinery, lines, and circuit analytics.",
      color: "linear-gradient(135deg, #1e3a8a, #3b82f6)",
      subjects: [
        { name: "Electrical Circuit Analysis", code: "EEE-301", papers: [{ year: "2024", size: "2.2 MB" }, { year: "2023", size: "1.9 MB" }] },
        { name: "Analog Electronics", code: "EEE-302", papers: [{ year: "2024", size: "1.8 MB" }] },
        { name: "Electrical Power Generation", code: "EEE-303", papers: [{ year: "2024", size: "2.5 MB" }] }
      ]
    },
    "semester-4-cse": {
      title: "Jharkhand Diploma 4th Semester PYQs (CSE)",
      subtitle: "Computer Science Engineering Exam Blueprint Vault",
      description: "Syllabus-oriented prior exam archives for 4th Semester CSE diploma aspirants.",
      color: "linear-gradient(135deg, #1e3a8a, #3b82f6)",
      subjects: [
        { name: "Data Structures with Python", code: "CSE-401", papers: [{ year: "2024", size: "2.0 MB" }, { year: "2023", size: "1.8 MB" }] },
        { name: "Operating System and Administration", code: "CSE-402", papers: [{ year: "2024", size: "2.2 MB" }] },
        { name: "Object Oriented Programming and Design with Java", code: "CSE-403", papers: [{ year: "2024", size: "1.9 MB" }] }
      ]
    },
    "semester-4-mech": {
      title: "Jharkhand Diploma 4th Semester PYQs",
      subtitle: "Intermediate Engineering Exam Blueprint Vault",
      description: "Syllbus-oriented prior exam archives for 4th Semester diploma aspirants.",
      color: "linear-gradient(135deg, #1e3a8a, #3b82f6)",
      subjects: [
        { name: "Linear Integrated Circuits", code: "DIP-401", papers: [{ year: "2024", size: "2.0 MB" }, { year: "2023", size: "1.8 MB" }] },
        { name: "Microcontrollers & Applications", code: "DIP-402", papers: [{ year: "2024", size: "2.2 MB" }] },
        { name: "Signals and Systems", code: "DIP-403", papers: [{ year: "2024", size: "1.9 MB" }] }
      ]
    },
    "semester-5": {
      title: "Jharkhand Diploma 5th Semester PYQs",
      subtitle: "Advanced Engineering Exam Blueprint Vault",
      description: "SBTE board high-level specialized engineering subject directories.",
      color: "linear-gradient(135deg, #1e3a8a, #3b82f6)",
      subjects: [
        { name: "Embedded Systems", code: "DIP-501", papers: [{ year: "2024", size: "2.3 MB" }] },
        { name: "Power Electronics", code: "DIP-502", papers: [{ year: "2024", size: "2.6 MB" }, { year: "2023", size: "2.1 MB" }] },
        { name: "Control Systems", code: "DIP-503", papers: [{ year: "2024", size: "2.0 MB" }] }
      ]
    },
    "semester-6": {
      title: "Jharkhand Diploma 6th Semester PYQs",
      subtitle: "Professional Exit Exam & Project Blueprint Hub",
      description: "Final semester blueprints covering automation and professional corporate readiness modules.",
      color: "linear-gradient(135deg, #1e3a8a, #3b82f6)",
      subjects: [
        { name: "Industrial Automation", code: "DIP-601", papers: [{ year: "2024", size: "2.5 MB" }, { year: "2023", size: "2.2 MB" }] },
        { name: "Microwave & Radar Engineering", code: "DIP-602", papers: [{ year: "2024", size: "2.1 MB" }] },
        { name: "Entrepreneurship & Startup", code: "DIP-603", papers: [{ year: "2024", size: "1.7 MB" }] }
      ]
    }
  },
  "jharkhand-btech": {
    "semester-1": {
      title: "Jharkhand B.Tech 1st Semester PYQs",
      subtitle: "First-Year B.Tech Semester Paper Vault",
      description: "Acquire authentic board papers from top universities in Jharkhand for B.Tech First Semester subjects.",
      color: "linear-gradient(135deg, #581c87, #8b5cf6)",
      subjects: [
        { name: "Engineering Mathematics-I (Calculus & Linear Algebra)", code: "MATH-101T", papers: [{ year: "2024", size: "2.5 MB" }, { year: "2023", size: "2.1 MB" }, { year: "2022", size: "2.0 MB" }] },
        { name: "Engineering Physics (Electromagnetism/Mechanics)", code: "PHYS-101T", papers: [{ year: "2024", size: "3.1 MB" }, { year: "2023", size: "2.8 MB" }] },
        { name: "Basic Electrical Engineering", code: "EENG-101T", papers: [{ year: "2024", size: "2.7 MB" }, { year: "2022", size: "2.4 MB" }] }
      ]
    },
    "semester-2": {
      title: "Jharkhand B.Tech 2nd Semester PYQs",
      subtitle: "First-Year B.Tech Semester Paper Vault",
      description: "Detailed subject questions for Ranchi University, JUT, and other university syllabus modules.",
      color: "linear-gradient(135deg, #581c87, #8b5cf6)",
      subjects: [
        { name: "Engineering Mathematics-II (Differential Equations)", code: "MATH-201T", papers: [{ year: "2024", size: "2.6 MB" }, { year: "2023", size: "2.4 MB" }] },
        { name: "Engineering Chemistry-I", code: "CHEM-201T", papers: [{ year: "2024", size: "2.8 MB" }, { year: "2022", size: "2.5 MB" }] },
        { name: "Programming for Problem Solving", code: "CSEN-201T", papers: [{ year: "2024", size: "1.9 MB" }, { year: "2023", size: "1.8 MB" }] }
      ]
    },
    "semester-3": {
      title: "Jharkhand B.Tech 3rd Semester PYQs",
      subtitle: "Core Branch B.Tech Semester Paper Vault",
      description: "Direct reference databases for core mechanical, electrical, and computer engineering blueprints.",
      color: "linear-gradient(135deg, #581c87, #8b5cf6)",
      subjects: [
        { name: "Engineering Mechanics", code: "MECH-301T", papers: [{ year: "2024", size: "3.2 MB" }, { year: "2023", size: "2.9 MB" }] },
        { name: "Mathematics-III (Probability & Statistics)", code: "MATH-301T", papers: [{ year: "2024", size: "2.8 MB" }] },
        { name: "Digital Electronics & Logic Design", code: "CSEN-302T", papers: [{ year: "2024", size: "2.3 MB" }, { year: "2023", size: "2.1 MB" }] }
      ]
    }
  },
  "jharkhand-polytechnic": {
    "exam-information": {
      title: "Jharkhand Polytechnic (PECE) 2026",
      subtitle: "State Exam Preparation Master Blueprints",
      description: "Instant downloadable practice papers, eligibility guides, and rank-boosting syllabus matrices.",
      color: "linear-gradient(135deg, #064e3b, #10b981)",
      subjects: [
        { name: "Polytechnic Physics Practice Blueprint", code: "PECE-PHYS", papers: [{ year: "2025 Set-A", size: "1.9 MB" }, { year: "2024 Paper", size: "2.5 MB" }, { year: "2023 Paper", size: "2.3 MB" }] },
        { name: "Polytechnic Mathematics Practice Blueprint", code: "PECE-MATH", papers: [{ year: "2025 Set-A", size: "2.4 MB" }, { year: "2024 Paper", size: "2.8 MB" }, { year: "2023 Paper", size: "2.6 MB" }] },
        { name: "Polytechnic Chemistry Practice Blueprint", code: "PECE-CHEM", papers: [{ year: "2025 Set-A", size: "1.8 MB" }, { year: "2024 Paper", size: "2.1 MB" }] }
      ]
    },
    "lateral-entry": {
      title: "Jharkhand Polytechnic Lateral Entry (JHPLE)",
      subtitle: "Vocational & Intermediate Lateral Exam vault",
      description: "Practice questions covering Applied Science and Math levels for direct 2nd-year polytechnic admissions.",
      color: "linear-gradient(135deg, #064e3b, #10b981)",
      subjects: [
        { name: "JHPLE Applied Science Guide", code: "JHPLE-SCI", papers: [{ year: "2025 Exam Guide", size: "3.0 MB" }, { year: "2024 Entrance Paper", size: "2.7 MB" }] },
        { name: "JHPLE Applied Mathematics Module", code: "JHPLE-MATH", papers: [{ year: "2025 Exam Guide", size: "2.6 MB" }, { year: "2024 Entrance Paper", size: "2.5 MB" }] }
      ]
    }
  },
  "jharkhand-d2d": {
    "exam-information": {
      title: "Jharkhand D2D B.Tech Lateral Entry",
      subtitle: "JCECEB Diploma to Degree Official blueprints",
      description: "Direct downloadable original JCECEB entrance papers of Physics, Chemistry, and advanced Diploma Mathematics.",
      color: "linear-gradient(135deg, #7c2d12, #f97316)",
      subjects: [
        { name: "D2D Mathematics Blueprint set", code: "D2D-MATH", papers: [{ year: "2025 Paper Set", size: "3.4 MB" }, { year: "2024 Resolved Paper", size: "3.1 MB" }, { year: "2023 Paper", size: "2.9 MB" }] },
        { name: "D2D Physics & Applied Mechanics", code: "D2D-PHYS", papers: [{ year: "2025 Paper Set", size: "2.8 MB" }, { year: "2024 Resolved Paper", size: "2.6 MB" }] },
        { name: "D2D Applied Chemistry set", code: "D2D-CHEM", papers: [{ year: "2025 Paper Set", size: "2.1 MB" }, { year: "2024 Resolved Paper", size: "2.0 MB" }] }
      ]
    }
  }
};

export default function ResourceSubpage({ category, id }) {

  const [searchQuery, setSearchQuery] = useState("");
  const [downloadingState, setDownloadingState] = useState({}); // Mapped by subject_paper

  // Find exact directory info, fallback to standard first segment if missing
  const categoryData = resourcesDb[category];
  const screenData = categoryData ? categoryData[id] : null;

  // Render defensive fallback screen if route is not defined
  if (!screenData) {
    return (
      <div className="bg-slate-50 min-h-screen py-20 flex items-center justify-center px-4" id="resource-fallback-screen">
        <div className="bg-white border border-gray-200 rounded-2xl max-w-md p-8 text-center shadow-lg">
          <AlertCircle className="mx-auto h-16 w-16 text-primary mb-4 animate-bounce" />
          <h2 className="text-xl font-bold text-gray-900">Custom Content Block Pending</h2>
          <p className="text-xs text-gray-500 mt-2 leading-relaxed">
            This specific curriculum sequence is currently undergoing rank-blueprint updates by our Ranchi editorial panel. It will launch dynamically soon.
          </p>
          <div className="mt-6">
            <Link href="/resources">
              <button className="bg-primary hover:bg-primary-dark text-white px-5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer">
                Return to Resources
              </button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Filter subjects by search
  const filteredSubjects = screenData.subjects.filter((sub) =>
    sub.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    sub.code.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Real download function - opens actual Google Drive file
  const handleRealDownload = (subjectCode, year) => {
    const url = getDriveUrl(subjectCode, year);
    if (url) {
      window.open(url, '_blank', 'noopener,noreferrer');
    } else {
      // Fallback: open Google Drive search for the subject
      window.open(`https://drive.google.com/drive/search?q=${encodeURIComponent(subjectCode)}`, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen pb-16 text-slate-800 font-sans" id="resources-blueprint-detail-page">
      
      {/* Visual Hub Banner */}
      <div 
        className="text-white py-14 px-4 sm:px-6 lg:px-8 border-b border-gray-150 relative overflow-hidden"
        style={{ background: screenData.color || "linear-gradient(135deg, #1e3a8a, #3b82f6)" }}
        id="detail-banner"
      >
        <div className="absolute inset-0 bg-black/10 pointer-events-none" />
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-end gap-6 relative z-10">
          <div>
            <Link href="/resources" className="inline-flex items-center space-x-2 text-white/80 hover:text-white text-xs font-bold uppercase tracking-wider mb-4 transition-colors">
              <ArrowLeft className="h-4 w-4" />
              <span>Back to resources</span>
            </Link>
            <span className="bg-white/20 text-white text-[10px] uppercase font-bold tracking-widest px-3 py-1 rounded-full border border-white/10">
              {screenData.subtitle || "Syllabus Paper Vault"}
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mt-3">
              {screenData.title}
            </h1>
            <p className="mt-3 text-xs sm:text-sm text-white/90 max-w-2xl leading-relaxed">
              {screenData.description}
            </p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm border border-white/10 rounded-2xl p-4 flex items-center space-x-3.5 text-xs text-white/95">
            <Clock className="h-5 w-5 text-amber-300" />
            <div>
              <span className="font-bold block">Update Rank Matrix</span>
              <span>Daily academic review live</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid View */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left/Middle Column - Content list */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Search box */}
            <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex items-center justify-between gap-4">
              <div className="relative w-full">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
                  <Search className="h-4 w-4" />
                </span>
                <input
                  type="text"
                  placeholder="Filter subjects by name or syllabus code..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-slate-50 border border-gray-350 rounded-xl py-2 pl-9 pr-4 text-xs focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                />
              </div>
            </div>

            {/* Subjects Map layout */}
            <div className="space-y-4" id="subjects-grid">
              {filteredSubjects.length > 0 ? (
                filteredSubjects.map((sub, sidx) => (
                  <div key={sidx} className="bg-white border border-gray-100 shadow-sm rounded-xl p-5 hover:border-primary/20 transition-all duration-200" id={`subject-card-${sub.code.toLowerCase()}`}>
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-3">
                        <div className="bg-indigo-50 p-2.5 rounded-lg text-primary mt-1">
                          <FileText className="h-5 w-5" />
                        </div>
                        <div>
                          <h4 className="text-gray-900 font-bold leading-snug text-base">
                            {sub.name}
                          </h4>
                          <span className="inline-block bg-slate-100 text-slate-700 font-mono text-[10px] px-1.5 py-0.5 rounded mt-1 font-semibold">
                            CODE: {sub.code}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Paper entries within subjects */}
                    <div className="mt-4 border-t border-gray-50 pt-3.5 space-y-2.5">
                      <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Available Board Papers</p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {sub.papers.map((p, pidx) => {
                          const stateKey = `${sub.code}_${p.year}`;
                          const stateEntry = downloadingState[stateKey];

                          return (
                            <div key={pidx} className="flex items-center justify-between bg-slate-50 border border-slate-100 p-2.5 rounded-lg">
                              <div className="text-xs">
                                <span className="font-bold text-gray-800">{p.year} Paper</span>
                                <span className="text-gray-400 font-mono block text-[10px]">{p.size} PDF</span>
                              </div>

                              {/* Download Actions */}
                              <div>
                                {stateEntry?.status === "complete" ? (
                                  <span className="inline-flex items-center space-x-1 text-green-600 bg-green-50 px-2 py-1 rounded text-[10px] font-bold">
                                    <CheckCircle2 className="h-3 w-3" />
                                    <span>Downloaded</span>
                                  </span>
                                ) : stateEntry?.status === "loading" ? (
                                  <div className="flex flex-col items-end space-y-1 w-16">
                                    <span className="text-[9px] text-gray-600 font-bold font-mono">{stateEntry.progress}%</span>
                                    <div className="w-full bg-gray-200 rounded-full h-1">
                                      <div className="bg-primary h-1 rounded-full transition-all duration-150" style={{ width: `${stateEntry.progress}%` }}></div>
                                    </div>
                                  </div>
                                ) : (
                                  <a
                                    href={getDriveUrl(sub.code, p.year)}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="bg-primary hover:bg-primary-dark text-white text-[10px] font-bold px-2.5 py-1 rounded-lg flex items-center space-x-1 cursor-pointer transition-colors"
                                  >
                                    <Download className="h-3 w-3" />
                                    <span>PDF</span>
                                  </a>
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-12 bg-white rounded-2xl border border-gray-100 shadow-sm">
                  <BookOpen className="mx-auto h-12 w-12 text-gray-200 mb-3" />
                  <h3 className="font-bold text-gray-800">No matching subjects</h3>
                  <p className="text-xs text-gray-500 mt-1">Try refining your search keyword above.</p>
                </div>
              )}
            </div>

          </div>

          {/* Right Column - Side support info */}
          <div className="space-y-6">
            
            {/* Academic Checklist guidance */}
            <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
              <h3 className="font-extrabold text-gray-900 border-b border-gray-100 pb-2.5 flex items-center gap-2">
                <GraduationCap className="h-5 w-5 text-primary" />
                <span>Preparation Blueprint</span>
              </h3>
              <ul className="text-xs text-gray-600 space-y-3.5 mt-4 leading-relaxed">
                <li className="flex items-start gap-2">
                  <span className="bg-emerald-50 text-emerald-600 rounded-full p-1 font-bold text-[10px] leading-none mt-0.5">1</span>
                  <span><strong>Solve without referencing:</strong> Complete mock papers under a strict 120-minute span to measure execution limits.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="bg-emerald-50 text-emerald-600 rounded-full p-1 font-bold text-[10px] leading-none mt-0.5">2</span>
                  <span><strong>Analyze blueprints:</strong> Compare questions from 2022 to 2024 to identify repeated question distributions.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="bg-emerald-50 text-emerald-600 rounded-full p-1 font-bold text-[10px] leading-none mt-0.5">3</span>
                  <span><strong>Review notes:</strong> Use detailed formulas or proofs to consolidate memory on hard physics/math topics.</span>
                </li>
              </ul>
            </div>

            {/* Help desk card */}
            <div className="bg-primary/5 rounded-xl p-5 border border-primary/10">
              <h4 className="font-bold text-primary flex items-center gap-1.5 text-sm">
                <AlertCircle className="h-4 w-4" />
                <span>Need Support?</span>
              </h4>
              <p className="text-[11px] text-gray-650 leading-relaxed mt-2.5">
                Experiencing slow download loops or can't locate a specific paper code? Get in touch with our helpdesk at <strong>support@futurely.in</strong> for expert rank guidance.
              </p>
            </div>

          </div>

        </div>
      </div>

    </div>
  );
}
