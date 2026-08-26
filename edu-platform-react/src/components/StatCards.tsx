import type { DashboardStats } from "../types";
import { IconCheck, IconBook, IconBookmark } from "./icons";

interface StatCardsProps {
  stats: DashboardStats | null;
  loading: boolean;
}

const CARD_DEFS = [
  { key: "completedCourses" as const, label: "كورسات مكتملة", icon: <IconCheck /> },
  { key: "currentCourses" as const, label: "كورساتك الحالية", icon: <IconBook /> },
  { key: "savedVideos" as const, label: "الفيديوهات المحفوظة", icon: <IconBookmark /> },
];

export function StatCards({ stats, loading }: StatCardsProps) {
  return (
    <section className="stat-row" aria-label="ملخص إحصائي">
      {CARD_DEFS.map((card) => (
        <div
          key={card.key}
          className={`stat-card ${loading ? "skeleton" : ""}`}
        >
          <div>
            <div className="stat-num">{loading ? "0" : stats?.[card.key] ?? 0}</div>
            <div className="stat-label">{card.label}</div>
          </div>
          <div className="stat-icon">{card.icon}</div>
        </div>
      ))}
    </section>
  );
}
