import type { ContinueWatching } from "../types";
import { IconPlayCircle, IconPlay } from "./icons";

interface ContinueLearningProps {
  data: ContinueWatching | null;
  loading: boolean;
}

function formatTime(totalSeconds: number): string {
  const m = Math.floor(totalSeconds / 60);
  const s = Math.floor(totalSeconds % 60);
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

export function ContinueLearning({ data, loading }: ContinueLearningProps) {
  if (loading) {
    return (
      <section className="continue-card" aria-label="استكمال التعلم">
        <div className="section-heading">استكمال التعلم</div>
        <div className="continue-thumb-wrap skeleton" />
        <div className="skel-line" style={{ width: "50%" }} />
        <div className="skel-line" style={{ width: "80%" }} />
        <div className="skel-line" style={{ width: "40%" }} />
      </section>
    );
  }

  if (!data) {
    return (
      <section className="continue-card" aria-label="استكمال التعلم">
        <div className="section-heading">
          <IconPlayCircle />
          استكمال التعلم
        </div>
        <div className="state-box">
          <IconPlayCircle />
          <h4>لسه ما بدأتش أي فيديو</h4>
          <p>ابدأ أول درس عشان تظهر هنا وتقدر تكمل منه في أي وقت</p>
          <a href="#" className="btn-ghost">
            تصفح الكورسات
          </a>
        </div>
      </section>
    );
  }

  const pct = Math.min(
    100,
    Math.round((data.watchedSeconds / data.totalSeconds) * 100)
  );

  const handleResume = () => {
    // في نسخة الإنتاج: توجيه لصفحة الفيديو data.resumeVideoId مع بدء
    // التشغيل من data.watchedSeconds بالظبط.
    alert(`جارِ فتح الفيديو من الدقيقة ${formatTime(data.watchedSeconds)}…`);
  };

  return (
    <section className="continue-card" aria-label="استكمال التعلم">
      <div className="section-heading">
        <IconPlayCircle />
        استكمال التعلم
      </div>

      <div className="continue-thumb-wrap">
        <img src={data.thumbnailUrl} alt={data.videoTitle} />
        <div className="continue-play">
          <span>
            <IconPlay />
          </span>
        </div>
        <div className="continue-progress-overlay">
          <i style={{ width: `${pct}%` }} />
        </div>
      </div>

      <div className="continue-info">
        <div className="course-tag">{data.courseName}</div>
        <div className="video-title">{data.videoTitle}</div>
        <div className="time-row">
          <span>
            {formatTime(data.watchedSeconds)} / {formatTime(data.totalSeconds)}
          </span>
          <span>{pct}%</span>
        </div>
        <div className="last-watched">آخر مشاهدة: {data.lastWatchedLabel}</div>
      </div>

      <button className="btn-primary" onClick={handleResume}>
        <IconPlay />
        استكمال المشاهدة
      </button>
    </section>
  );
}
