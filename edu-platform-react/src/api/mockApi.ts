/**
 * ============================================================================
 * MOCK API LAYER
 * ============================================================================
 * كل دالة هنا بترجع Promise وفيها تأخير بسيط بيحاكي زمن استجابة شبكة حقيقية،
 * وده اللي بيسمح بعرض حالات التحميل (Loading States) بشكل واقعي في الواجهة.
 *
 * لما يبقى عندك backend فعلي، استبدل جسم كل دالة بنداء fetch() حقيقي لنفس
 * الـ endpoint، وسيب الـ interface (اسم الدالة والـ return type) زي ما هو —
 * المكونات (components) مش محتاجة تتغيّر خالص لأنها بتتكلم مع الطبقة دي بس.
 *
 * مثال حقيقي:
 *   async getStats(): Promise<DashboardStats> {
 *     const res = await fetch('/api/student/stats');
 *     if (!res.ok) throw new Error('failed to load stats');
 *     return res.json();
 *   }
 * ============================================================================
 */

import type {
  Student,
  DashboardStats,
  ContinueWatching,
  WeeklyActivity,
  Course,
} from "../types";

function delay<T>(data: T, ms = 550): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(data), ms));
}

export const mockApi = {
  async getStudent(): Promise<Student> {
    return delay({
      id: "stu_1",
      name: "يوسف أحمد",
      avatarUrl:
        "https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=200&h=200&fit=crop&crop=faces",
      points: 1240,
      hasUnreadNotifications: true,
    });
  },

  async getStats(): Promise<DashboardStats> {
    // بيانات حقيقية مفروض تيجي من جدول تقدم الطالب في قاعدة البيانات
    return delay({
      completedCourses: 5,
      currentCourses: 3,
      savedVideos: 8,
    });
  },

  async getContinueWatching(): Promise<ContinueWatching | null> {
    // آخر فيديو شاهده الطالب — أو null لو لسه ماشافش حاجة (Empty State)
    return delay({
      courseName: "اللغة العربية - الصف الثالث الثانوي",
      videoTitle: "شرح الوحدة الأولى - النحو التطبيقي",
      thumbnailUrl:
        "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=500&h=280&fit=crop",
      watchedSeconds: 18 * 60,
      totalSeconds: 30 * 60,
      lastWatchedLabel: "من يومين",
      resumeVideoId: "vid_1021",
    });
  },

  async getWeeklyActivity(): Promise<WeeklyActivity> {
    // ساعات تعلم حقيقية محسوبة من نشاط الطالب الفعلي على المنصة
    return delay({
      totalMinutes: 312,
      videosWatched: 14,
      videosCompleted: 9,
      quizzesTaken: 6,
      avgQuizScore: 84,
      days: [
        { label: "السبت", minutes: 35 },
        { label: "الأحد", minutes: 60 },
        { label: "الاثنين", minutes: 20 },
        { label: "الثلاثاء", minutes: 75 },
        { label: "الأربعاء", minutes: 40 },
        { label: "الخميس", minutes: 55 },
        { label: "الجمعة", minutes: 27 },
      ],
    });
  },

  async getSuggestedCourses(): Promise<Course[]> {
    return delay([
      {
        id: "c1",
        title: "اللغة العربية - الصف الثالث الثانوي",
        teacher: "أ. محمود العدوي",
        teacherImg:
          "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&h=100&fit=crop&crop=faces",
        thumbnailUrl:
          "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=500&h=280&fit=crop",
        description: "شرح كامل للمنهج مع مراجعات وأسئلة متوقعة على كل درس.",
        price: 350,
        rating: 4.9,
        studentsCount: 2140,
      },
      {
        id: "c2",
        title: "التاريخ الحديث - باقة الفصل الأول",
        teacher: "أ. محمود العدوي",
        teacherImg:
          "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&h=100&fit=crop&crop=faces",
        thumbnailUrl:
          "https://images.unsplash.com/photo-1447069387593-a5de0862481e?w=500&h=280&fit=crop",
        description:
          "تلخيص وترتيب الأحداث التاريخية بأسلوب مبسط وسهل الحفظ.",
        price: 280,
        rating: 4.8,
        studentsCount: 1876,
      },
      {
        id: "c3",
        title: "مهارات التفكير والتعبير",
        teacher: "أ. محمود العدوي",
        teacherImg:
          "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&h=100&fit=crop&crop=faces",
        thumbnailUrl:
          "https://images.unsplash.com/photo-1519452575417-564c1401ecc0?w=500&h=280&fit=crop",
        description:
          "كورس تمهيدي مجاني لتقوية أساسيات التعبير والفهم القرائي.",
        price: 0,
        rating: 4.7,
        studentsCount: 3320,
      },
    ]);
  },
};
