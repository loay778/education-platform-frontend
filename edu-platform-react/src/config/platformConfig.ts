/**
 * ============================================================================
 * PLATFORM CONFIGURATION
 * ============================================================================
 * هذا هو الملف الوحيد اللي المفروض تعدّله عشان تستخدم نفس الكود الأساسي
 * (Core) لمدرّس تاني أو منصة تانية. متلمسش أي مكون (component) أو أي ملف
 * تاني في src/ عشان تغيّر الهوية البصرية أو بيانات المدرس.
 *
 * الألوان بتتطبّق تلقائيًا على متغيرات CSS (انظر src/hooks/useApplyTheme.ts)
 * وبالتالي بتنعكس على كل الواجهة من غير ما تلمس أي ملف CSS.
 * ============================================================================
 */

export interface PlatformConfig {
  platform: {
    name: string;
    logoText: string; // نص مختصر داخل شعار المنصة (لو مفيش صورة لوجو)
    logoImageUrl?: string; // اختياري: رابط صورة لوجو بدل النص
    faviconUrl?: string;
    aboutShort: string;
    copyrightText: string;
  };
  teacher: {
    name: string;
    imageUrl: string;
    bio: string;
    contact: {
      phone: string;
      email: string;
    };
  };
  colors: {
    primary: string;
    primaryLight: string;
    primaryDark: string;
    secondary: string;
    accent: string;
    danger: string;
  };
  social: {
    facebook?: string;
    instagram?: string;
    youtube?: string;
    tiktok?: string;
    whatsapp?: string;
  };
}

export const platformConfig: PlatformConfig = {
  platform: {
    name: "أكاديمية النخبة",
    logoText: "أ",
    logoImageUrl: "",
    faviconUrl: "",
    aboutShort:
      "منصتك التعليمية اللي بتتابع تقدمك أول بأول وتساعدك توصل لهدفك.",
    copyrightText: "© 2026 أكاديمية النخبة. جميع الحقوق محفوظة.",
  },
  teacher: {
    name: "أ. محمود العدوي",
    imageUrl:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=300&h=300&fit=crop&crop=faces",
    bio: "مدرّس أول للغة العربية بمرحلة الثانوية العامة",
    contact: {
      phone: "01000000000",
      email: "contact@example.com",
    },
  },
  colors: {
    primary: "#D99B2B",
    primaryLight: "#F0B84C",
    primaryDark: "#A6720F",
    secondary: "#2E6F5E",
    accent: "#4FC3A1",
    danger: "#E5484D",
  },
  social: {
    facebook: "#",
    instagram: "#",
    youtube: "#",
    tiktok: "#",
    whatsapp: "#",
  },
};
