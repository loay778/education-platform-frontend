import type { WeeklyActivity } from "../types";
import { IconChart } from "./icons";
import { WeeklyChart } from "./WeeklyChart";

interface LearningStatsProps {
  activity: WeeklyActivity | null;
  loading: boolean;
}

function formatMinutesLabel(mins: number): string {
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  if (h === 0) return `${m} د`;
  return `${h} س ${m ? m + " د" : ""}`.trim();
}

export function LearningStats({ activity, loading }: LearningStatsProps) {
  return (
    <section className="stats-card" aria-label="إحصائيات التعلم">
      <div className="section-heading">
        <IconChart />
        إحصائيات التعلم
      </div>

      <div className="mini-metrics">
        {loading || !activity ? (
          Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="mini-metric skeleton"
              style={{ minHeight: 56 }}
            />
          ))
        ) : (
          <>
            <div className="mini-metric">
              <div className="m-num">{formatMinutesLabel(activity.totalMinutes)}</div>
              <div className="m-label">إجمالي وقت المشاهدة</div>
            </div>
            <div className="mini-metric">
              <div className="m-num">{activity.videosWatched}</div>
              <div className="m-label">فيديوهات شاهدها</div>
            </div>
            <div className="mini-metric">
              <div className="m-num">{activity.videosCompleted}</div>
              <div className="m-label">فيديوهات أكملها</div>
            </div>
            <div className="mini-metric">
              <div className="m-num">{activity.avgQuizScore}%</div>
              <div className="m-label">
                متوسط درجات الاختبارات ({activity.quizzesTaken})
              </div>
            </div>
          </>
        )}
      </div>

      <div className={`chart-wrap ${loading || !activity ? "skeleton" : ""}`}>
        <div className="chart-legend">
          <span>
            <i /> ساعات التعلم هذا الأسبوع
          </span>
        </div>
        {!loading && activity && <WeeklyChart days={activity.days} />}
      </div>
    </section>
  );
}
