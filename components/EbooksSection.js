"use client";

import React from "react";
import { useRouter } from "next/navigation";

const EBOOKS = [
  {
    id: "d2d-physics-notes",
    title: "D2D Physics Notes",
    subject: "Physics",
    color: "#6366f1",
    emoji: "⚛️",
    badge: "FREE",
    pdfUrl:
      "https://res.cloudinary.com/do8knpreu/image/upload/v1782056500/D2D_Engineering_Physics_Notes_Futurely_uhl6s3.pdf",
  },
  {
    id: "d2d-chemistry-notes",
    title: "D2D Chemistry Notes",
    subject: "Chemistry",
    color: "#8b5cf6",
    emoji: "🧪",
    badge: "FREE",
    pdfUrl:
      "https://res.cloudinary.com/do8knpreu/image/upload/v1782056500/D2D_Engineering_Chemistry_Notes_Futurely_aem74f.pdf",
  },
];

export default function EbooksSection() {
  const router = useRouter();

  return (
    <div style={styles.section}>
      {/* Section Header */}
      <div style={styles.sectionHeader}>
        <div>
          <p style={styles.sectionTitle}>📚 Digital Notes</p>
          <p style={styles.sectionSub}>Free bilingual study material</p>
        </div>
        <button
          style={styles.viewAllBtn}
          onClick={() => router.push("/resources")}
        >
          VIEW ALL
        </button>
      </div>

      {/* Horizontal Scroll Row */}
      <div style={styles.scrollRow}>
        {EBOOKS.map((book) => (
          <div
            key={book.id}
            style={styles.card}
            onClick={() => router.push(`/resources?book=${book.id}`)}
          >
            {/* Mini Cover */}
            <div
              style={{
                ...styles.miniCover,
                background: `linear-gradient(135deg, ${book.color}33, ${book.color}66)`,
                border: `1px solid ${book.color}44`,
              }}
            >
              <span style={styles.miniEmoji}>{book.emoji}</span>
              <span style={{ ...styles.miniBadge, background: book.color }}>
                {book.badge}
              </span>
            </div>

            {/* Card Label */}
            <p style={styles.cardTitle}>{book.title}</p>
            <p style={styles.cardSub}>D2D · Bilingual</p>
          </div>
        ))}

        {/* Coming Soon Card */}
        <div style={styles.comingSoonCard}>
          <div style={styles.comingSoonIcon}>➕</div>
          <p style={styles.comingSoonText}>More Soon</p>
          <p style={styles.comingSoonSub}>Maths & More</p>
        </div>
      </div>
    </div>
  );
}

const styles = {
  section: {
    padding: "20px 0 4px",
    borderBottom: "1px solid rgba(255,255,255,0.06)",
  },
  sectionHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    padding: "0 16px 12px",
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 800,
    color: "#fff",
    margin: 0,
  },
  sectionSub: {
    fontSize: 12,
    color: "rgba(255,255,255,0.45)",
    margin: "3px 0 0",
  },
  viewAllBtn: {
    background: "none",
    border: "none",
    color: "#818cf8",
    fontSize: 12,
    fontWeight: 700,
    cursor: "pointer",
    letterSpacing: 0.5,
    padding: "2px 0",
  },
  scrollRow: {
    display: "flex",
    gap: 12,
    overflowX: "auto",
    padding: "4px 16px 16px",
    scrollbarWidth: "none",
    msOverflowStyle: "none",
    WebkitOverflowScrolling: "touch",
  },
  card: {
    flexShrink: 0,
    width: 120,
    cursor: "pointer",
  },
  miniCover: {
    width: 120,
    height: 150,
    borderRadius: 10,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    marginBottom: 8,
  },
  miniEmoji: {
    fontSize: 40,
  },
  miniBadge: {
    position: "absolute",
    top: 8,
    right: 8,
    fontSize: 9,
    fontWeight: 800,
    color: "#fff",
    padding: "3px 7px",
    borderRadius: 20,
    letterSpacing: 0.8,
  },
  cardTitle: {
    fontSize: 12,
    fontWeight: 700,
    color: "#fff",
    margin: "0 0 3px",
    lineHeight: 1.3,
  },
  cardSub: {
    fontSize: 11,
    color: "rgba(255,255,255,0.4)",
    margin: 0,
  },
  comingSoonCard: {
    flexShrink: 0,
    width: 120,
    cursor: "default",
  },
  comingSoonIcon: {
    width: 120,
    height: 150,
    borderRadius: 10,
    background: "rgba(255,255,255,0.04)",
    border: "1px dashed rgba(255,255,255,0.15)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 28,
    marginBottom: 8,
  },
  comingSoonText: {
    fontSize: 12,
    fontWeight: 700,
    color: "rgba(255,255,255,0.4)",
    margin: "0 0 3px",
  },
  comingSoonSub: {
    fontSize: 11,
    color: "rgba(255,255,255,0.25)",
    margin: 0,
  },
};
