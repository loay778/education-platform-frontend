import { useEffect, useState } from "react";
import { Header } from "./components/Header";
import { Sidebar } from "./components/Sidebar";
import { StatCards } from "./components/StatCards";
import { ContinueLearning } from "./components/ContinueLearning";
import { LearningStats } from "./components/LearningStats";
import { CoursesGrid } from "./components/CoursesGrid";
import { Footer } from "./components/Footer";
import { useTheme } from "./hooks/useTheme";
import { useApplyPlatformColors } from "./hooks/useApplyPlatformColors";
import { mockApi } from "./api/mockApi";
import type {
  Student,
  DashboardStats,
  ContinueWatching,
  WeeklyActivity,
  Course,
} from "./types";

interface LoadState<T> {
  data: T | null;
  loading: boolean;
  error: boolean;
}

function App() {
  useApplyPlatformColors();
  const { theme, setTheme } = useTheme("dark");

  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [sidebarOpenMobile, setSidebarOpenMobile] = useState(false);

  const [student, setStudent] = useState<LoadState<Student>>({
    data: null,
    loading: true,
    error: false,
  });
  const [stats, setStats] = useState<LoadState<DashboardStats>>({
    data: null,
    loading: true,
    error: false,
  });
  const [continueWatching, setContinueWatching] = useState<
    LoadState<ContinueWatching>
  >({ data: null, loading: true, error: false });
  const [weeklyActivity, setWeeklyActivity] = useState<
    LoadState<WeeklyActivity>
  >({ data: null, loading: true, error: false });
  const [courses, setCourses] = useState<LoadState<Course[]>>({
    data: null,
    loading: true,
    error: false,
  });

  // كل قسم بيحمّل بياناته بشكل مستقل — عشان فشل قسم واحد (مثلاً تعذّر تحميل
  // الكورسات) متمنعش باقي الصفحة من الظهور.
  useEffect(() => {
    mockApi
      .getStudent()
      .then((data) => setStudent({ data, loading: false, error: false }))
      .catch(() => setStudent({ data: null, loading: false, error: true }));

    mockApi
      .getStats()
      .then((data) => setStats({ data, loading: false, error: false }))
      .catch(() => setStats({ data: null, loading: false, error: true }));

    mockApi
      .getContinueWatching()
      .then((data) =>
        setContinueWatching({ data, loading: false, error: false })
      )
      .catch(() =>
        setContinueWatching({ data: null, loading: false, error: true })
      );

    mockApi
      .getWeeklyActivity()
      .then((data) =>
        setWeeklyActivity({ data, loading: false, error: false })
      )
      .catch(() =>
        setWeeklyActivity({ data: null, loading: false, error: true })
      );

    mockApi
      .getSuggestedCourses()
      .then((data) => setCourses({ data, loading: false, error: false }))
      .catch(() => setCourses({ data: null, loading: false, error: true }));
  }, []);

  const firstName = student.data?.name.split(" ")[0];

  return (
    <>
    <div
      className={`app ${sidebarCollapsed ? "sidebar-collapsed" : ""} ${
        sidebarOpenMobile ? "sidebar-open" : ""
      }`}
    >
      <Header
        student={student.data}
        theme={theme}
        onThemeChange={setTheme}
        onOpenMobileMenu={() => setSidebarOpenMobile(true)}
        onNotificationsClick={() => {
          setStudent((s) =>
            s.data ? { ...s, data: { ...s.data, hasUnreadNotifications: false } } : s
          );
          alert("لا توجد إشعارات جديدة أخرى الآن");
        }}
      />

      <div
        className="sidebar-backdrop"
        onClick={() => setSidebarOpenMobile(false)}
      />

      <Sidebar
        onToggleCollapse={() => setSidebarCollapsed((v) => !v)}
      />

      <main className="main">
        <div className="page-title">
          <div>
            <h1>{firstName ? `أهلاً بيك يا ${firstName} 👋` : "أهلاً بيك 👋"}</h1>
            <p>يلا نكمل رحلة التعلم بتاعتك من حيث ما وقفت</p>
          </div>
        </div>

        <StatCards stats={stats.data} loading={stats.loading} />

        <div className="mid-row">
          <ContinueLearning
            data={continueWatching.data}
            loading={continueWatching.loading}
          />
          <LearningStats
            activity={weeklyActivity.data}
            loading={weeklyActivity.loading}
          />
        </div>

        <section aria-label="الكورسات المقترحة">
          <div className="page-title" style={{ marginBottom: 14 }}>
            <div className="section-heading" style={{ fontSize: 17 }}>
              الكورسات المقترحة
            </div>
          </div>
          <CoursesGrid
            courses={courses.data}
            loading={courses.loading}
            error={courses.error}
          />
        </section>
      </main>
    </div>
    <Footer />
    </>
  );
}

export default App;
