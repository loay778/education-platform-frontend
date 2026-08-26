/**
 * ============================================================================
 * DOMAIN TYPES
 * ============================================================================
 * الأنواع دي بتمثّل شكل البيانات الحقيقية اللي هتيجي من الـ backend/قاعدة
 * البيانات. مفيش أي بيانات هنا — بس الشكل (shape) اللي المفروض الـ API
 * الحقيقي يرجّعه بنفس الحقول دي بالظبط.
 * ============================================================================
 */

export interface Student {
  id: string;
  name: string;
  avatarUrl: string;
  points: number;
  hasUnreadNotifications: boolean;
}

export interface DashboardStats {
  completedCourses: number;
  currentCourses: number;
  savedVideos: number;
}

export interface ContinueWatching {
  courseName: string;
  videoTitle: string;
  thumbnailUrl: string;
  watchedSeconds: number;
  totalSeconds: number;
  lastWatchedLabel: string;
  resumeVideoId: string;
}

export interface DailyActivity {
  label: string;
  minutes: number;
}

export interface WeeklyActivity {
  totalMinutes: number;
  videosWatched: number;
  videosCompleted: number;
  quizzesTaken: number;
  avgQuizScore: number;
  days: DailyActivity[];
}

export interface Course {
  id: string;
  title: string;
  teacher: string;
  teacherImg: string;
  thumbnailUrl: string;
  description: string;
  price: number; // 0 = مجاني
  rating: number;
  studentsCount: number;
}

export type ThemeMode = "dark" | "light";
