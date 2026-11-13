"use client";

import { useEffect, useMemo, useState } from "react";
import { Flame, Trophy, CalendarDays, Clock, Target, BarChart3 } from "lucide-react";

const DAY_MS = 24 * 60 * 60 * 1000;
const MONTH_LABELS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

// ── format seconds as "3h 20m" / "45m" ──────────────────────────────────────
function formatDuration(totalSeconds) {
  if (!totalSeconds) return "0m";
  const hrs = Math.floor(totalSeconds / 3600);
  const mins = Math.floor((totalSeconds % 3600) / 60);
  return hrs > 0 ? `${hrs}h ${mins}m` : `${mins}m`;
}

// ── count → heatmap intensity level (0-4) ───────────────────────────────────
function levelForCount(count) {
  if (!count) return 0;
  if (count >= 10) return 4;
  if (count >= 6) return 3;
  if (count >= 3) return 2;
  return 1;
}

const LEVEL_CLASSES = [
  "bg-slate-100",
  "bg-primary/25",
  "bg-primary/50",
  "bg-primary/75",
  "bg-primary",
];

// ── turn the sparse {date,count}[] from the API into a 53-week grid,
//    the same shape GitHub's contribution graph uses ──────────────────────
function buildWeeks(heatmapData) {
  const countByDate = new Map((heatmapData || []).map((d) => [d.date, d.count]));

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const end = new Date(today);
  end.setDate(end.getDate() + (6 - end.getDay())); // extend forward to Saturday

  const start = new Date(end);
  start.setDate(start.getDate() - (53 * 7 - 1)); // 53 weeks back
  start.setDate(start.getDate() - start.getDay()); // align back to Sunday

  const weeks = [];
  let cursor = new Date(start);

  while (cursor <= end) {
    const week = [];
    for (let d = 0; d < 7; d++) {
      const key = cursor.toISOString().slice(0, 10);
      const isFuture = cursor > today;
      week.push({
        date: key,
        day: cursor.getDate(),
        month: cursor.getMonth(),
        isFuture,
        count: isFuture ? null : countByDate.get(key) || 0,
      });
      cursor = new Date(cursor.getTime() + DAY_MS);
    }
    weeks.push(week);
  }
  return weeks;
}

// ── month labels aligned to the week a new month first appears in ─────────
function buildMonthLabels(weeks) {
  const labels = [];
  let lastMonth = null;
  weeks.forEach((week, i) => {
    const firstRealDay = week.find((d) => !d.isFuture) || week[0];
    if (firstRealDay.month !== lastMonth) {
      labels.push({ weekIndex: i, label: MONTH_LABELS[firstRealDay.month] });
      lastMonth = firstRealDay.month;
    }
  });
  return labels;
}

export default function ProfileActivityCard({
  userId,
  userName = "Student",
  isPublicProfile = false,
}) {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // holds a human-readable reason, not just true/false
  const [hoverCell, setHoverCell] = useState(null); // { date, count, x, y }

  useEffect(() => {
    const controller = new AbortController();

    async function fetchStats() {
      try {
        const token = localStorage.getItem("token");
        const apiBase = process.env.NEXT_PUBLIC_API_URL;

        if (!apiBase) {
          console.error(
            "PROFILE STATS: NEXT_PUBLIC_API_URL is not set — check your .env.local / hosting env vars and rebuild the frontend."
          );
          setError("Backend URL not configured");
          setLoading(false);
          return;
        }

        const targetUserId = userId?.trim();
        const statsUrl = targetUserId
          ? `${apiBase}/api/profile/stats?userId=${encodeURIComponent(targetUserId)}`
          : `${apiBase}/api/profile/stats`;

        const headers = {};
        if (token) {
          headers.Authorization = `Bearer ${token}`;
        }

        const res = await fetch(statsUrl, {
          headers,
          signal: controller.signal,
        });

        if (!res.ok) {
          console.error(
            `PROFILE STATS: request failed with status ${res.status} at ${statsUrl}`
          );
          setError(`Failed to load (status ${res.status})`);
          return;
        }

        const data = await res.json();
        setStats(data);
      } catch (err) {
        if (err.name !== "AbortError") {
          console.error("PROFILE STATS FETCH ERROR:", err);
          setError(err.message || "Network error");
        }
      } finally {
        setLoading(false);
      }
    }

    fetchStats();
    return () => controller.abort();
  }, [userId, isPublicProfile]);

  const weeks = useMemo(() => buildWeeks(stats?.heatmap), [stats]);
  const monthLabels = useMemo(() => buildMonthLabels(weeks), [weeks]);

  const maxSubjectSolved = useMemo(() => {
    if (!stats?.subjectBreakdown?.length) return 0;
    return Math.max(...stats.subjectBreakdown.map((s) => s.solved));
  }, [stats]);

  if (loading) {
    return (
      <div className="bg-white rounded-2xl border border-gray-150 p-6 shadow-sm animate-pulse">
        <div className="h-4 w-40 bg-gray-100 rounded mb-4" />
        <div className="h-24 bg-gray-50 rounded-xl" />
      </div>
    );
  }

  if (error || !stats) {
    return (
      <div className="bg-white rounded-2xl border border-gray-150 p-6 shadow-sm text-center">
        <p className="text-xs text-gray-500">
          {isPublicProfile
            ? `Couldn&apos;t load ${userName || "this user"}&apos;s activity right now. Refresh to try again.`
            : "Couldn&apos;t load your activity right now. Refresh to try again."}
        </p>
        {error && (
          <p className="text-[10px] text-gray-300 mt-1 font-mono">{error}</p>
        )}
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-150 shadow-sm overflow-hidden">
      {/* Header */}
      <div className="p-4 sm:p-6 border-b border-gray-100 flex items-center justify-between flex-wrap gap-3">
        <h3 className="text-base sm:text-lg font-bold text-gray-950 flex items-center space-x-2">
          <BarChart3 className="h-5 w-5 text-primary flex-shrink-0" />
          <span>
            {isPublicProfile
              ? `${(userName || "User").split(" ")[0]}'s Practice Activity`
              : "Your Practice Activity"}
          </span>
        </h3>
        <span className="text-[10px] sm:text-xs text-gray-400">
          Member since{" "}
          {new Date(stats.memberSince).toLocaleDateString("en-IN", {
            month: "short",
            year: "numeric",
          })}
        </span>
      </div>

      {/* Stat strip */}
      <div className="grid grid-cols-2 sm:grid-cols-5 divide-x divide-y sm:divide-y-0 divide-gray-100 border-b border-gray-100">
        <StatCell
          icon={<Target className="h-4 w-4" />}
          label="Solved"
          value={stats.totalSolved}
        />
        <StatCell
          icon={<Flame className="h-4 w-4 text-orange-500" />}
          label="Current Streak"
          value={`${stats.currentStreak}d`}
        />
        <StatCell
          icon={<Trophy className="h-4 w-4 text-amber-500" />}
          label="Longest Streak"
          value={`${stats.longestStreak}d`}
        />
        <StatCell
          icon={<CalendarDays className="h-4 w-4" />}
          label="Days Active"
          value={stats.daysActive}
        />
        <StatCell
          icon={<Clock className="h-4 w-4" />}
          label="Time Practiced"
          value={formatDuration(stats.totalTimeTakenSeconds)}
        />
      </div>

      {/* Heatmap */}
      <div className="p-4 sm:p-6 overflow-x-auto">
        <div className="min-w-[640px] relative">
          {/* Month labels */}
          <div className="flex ml-8 mb-1.5 relative h-3.5">
            {monthLabels.map((m) => (
              <span
                key={`${m.label}-${m.weekIndex}`}
                className="absolute text-[10px] text-gray-400 font-medium"
                style={{ left: `${m.weekIndex * 13}px` }}
              >
                {m.label}
              </span>
            ))}
          </div>

          <div className="flex gap-[3px]">
            {/* Day-of-week labels */}
            <div className="flex flex-col gap-[3px] mr-1.5 pt-[1px]">
              {["", "Mon", "", "Wed", "", "Fri", ""].map((label, i) => (
                <span
                  key={i}
                  className="text-[9px] text-gray-400 h-[10px] leading-[10px]"
                >
                  {label}
                </span>
              ))}
            </div>

            {weeks.map((week, wi) => (
              <div key={wi} className="flex flex-col gap-[3px]">
                {week.map((cell) => (
                  <div
                    key={cell.date}
                    onMouseEnter={(e) => {
                      if (cell.isFuture) return;
                      const rect = e.currentTarget.getBoundingClientRect();
                      setHoverCell({
                        date: cell.date,
                        count: cell.count,
                        x: rect.left + rect.width / 2,
                        y: rect.top,
                      });
                    }}
                    onMouseLeave={() => setHoverCell(null)}
                    className={`h-[10px] w-[10px] rounded-[2px] ${
                      cell.isFuture
                        ? "bg-transparent"
                        : LEVEL_CLASSES[levelForCount(cell.count)]
                    }`}
                  />
                ))}
              </div>
            ))}
          </div>

          {/* Legend */}
          <div className="flex items-center justify-end gap-1.5 mt-3">
            <span className="text-[10px] text-gray-400">Less</span>
            {LEVEL_CLASSES.map((cls, i) => (
              <div key={i} className={`h-[10px] w-[10px] rounded-[2px] ${cls}`} />
            ))}
            <span className="text-[10px] text-gray-400">More</span>
          </div>
        </div>

        {/* Tooltip */}
        {hoverCell && (
          <div
            className="fixed z-50 bg-slate-950 text-white text-[10px] font-semibold px-2.5 py-1.5 rounded-lg shadow-lg pointer-events-none -translate-x-1/2 -translate-y-full"
            style={{ left: hoverCell.x, top: hoverCell.y - 8 }}
          >
            {hoverCell.count} question{hoverCell.count === 1 ? "" : "s"} ·{" "}
            {new Date(hoverCell.date).toLocaleDateString("en-IN", {
              day: "numeric",
              month: "short",
              year: "numeric",
            })}
          </div>
        )}
      </div>

      {/* Subject breakdown */}
      {stats.subjectBreakdown.length > 0 && (
        <div className="p-4 sm:p-6 border-t border-gray-100 space-y-2.5">
          <h4 className="text-xs font-bold text-gray-700 uppercase tracking-wider mb-3">
            By Subject
          </h4>
          {stats.subjectBreakdown.map((s) => (
            <div key={s.subject} className="flex items-center gap-3">
              <span className="text-xs text-gray-700 font-medium w-28 sm:w-32 capitalize flex-shrink-0 truncate">
                {s.subject}
              </span>
              <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary rounded-full"
                  style={{
                    width: `${
                      maxSubjectSolved
                        ? (s.solved / maxSubjectSolved) * 100
                        : 0
                    }%`,
                  }}
                />
              </div>
              <span className="text-xs font-bold text-gray-900 w-8 text-right flex-shrink-0">
                {s.solved}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* Test series footer */}
      {stats.testSeries.testsCompleted > 0 && (
        <div className="px-4 sm:px-6 py-3.5 bg-slate-50 border-t border-gray-100 flex items-center justify-between text-xs">
          <span className="text-gray-600">
            <span className="font-bold text-gray-900">
              {stats.testSeries.testsCompleted}
            </span>{" "}
            test{stats.testSeries.testsCompleted === 1 ? "" : "s"} completed
          </span>
          <span className="text-gray-600">
            Avg score:{" "}
            <span className="font-bold text-gray-900">
              {stats.testSeries.avgTestScore}
            </span>
          </span>
        </div>
      )}
    </div>
  );
}

function StatCell({ icon, label, value }) {
  return (
    <div className="p-3.5 sm:p-4 flex flex-col items-center text-center gap-1">
      <div className="text-gray-400">{icon}</div>
      <span className="text-base sm:text-lg font-black text-gray-950">{value}</span>
      <span className="text-[9px] sm:text-[10px] uppercase tracking-wider text-gray-400 font-semibold">
        {label}
      </span>
    </div>
  );
}