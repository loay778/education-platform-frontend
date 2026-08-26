import type { Course } from "../types";
import { IconBook, IconStar, IconAlert } from "./icons";

interface CoursesGridProps {
  courses: Course[] | null;
  loading: boolean;
  error: boolean;
}

export function CoursesGrid({ courses, loading, error }: CoursesGridProps) {
  if (loading) {
    return (
      <div className="courses-grid">
        {Array.from({ length: 3 }).map((_, i) => (
          <article className="course-card" key={i}>
            <div className="course-thumb skeleton" />
            <div className="course-body">
              <div className="skel-line" style={{ width: "60%" }} />
              <div className="skel-line" style={{ width: "90%" }} />
              <div className="skel-line" style={{ width: "70%" }} />
            </div>
          </article>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="courses-grid">
        <div className="state-box error">
          <IconAlert />
          <h4>تعذّر تحميل الكورسات المقترحة</h4>
          <p>حاول تحديث الصفحة</p>
        </div>
      </div>
    );
  }

  if (!courses || courses.length === 0) {
    return (
      <div className="courses-grid">
        <div className="state-box">
          <IconBook />
          <h4>لا توجد كورسات مقترحة حاليًا</h4>
          <p>هيتم إضافة كورسات جديدة قريبًا، تابعنا</p>
        </div>
      </div>
    );
  }

  return (
    <div className="courses-grid">
      {courses.map((course) => (
        <article className="course-card" key={course.id}>
          <div className="course-thumb">
            <img src={course.thumbnailUrl} alt={course.title} />
            <span className={`course-price ${course.price === 0 ? "free" : ""}`}>
              {course.price === 0 ? "مجاني" : `${course.price} ج.م`}
            </span>
          </div>
          <div className="course-body">
            <div className="course-teacher">
              <img src={course.teacherImg} alt={course.teacher} />
              {course.teacher}
            </div>
            <div className="course-title">{course.title}</div>
            <div className="course-desc">{course.description}</div>
            <div className="course-meta-row">
              <span className="course-rating">
                <IconStar /> {course.rating}
              </span>
              <span>{course.studentsCount.toLocaleString("ar-EG")} طالب</span>
            </div>
            <button
              className="btn-primary"
              onClick={() => alert(`جارِ فتح صفحة الكورس: ${course.title}`)}
            >
              عرض الكورس
            </button>
          </div>
        </article>
      ))}
    </div>
  );
}
