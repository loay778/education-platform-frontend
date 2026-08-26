import { useEffect, useState } from "react";
import type { ThemeMode } from "../types";

/**
 * حالة الوضع الفاتح/الداكن. لو عايز تحفظ اختيار المستخدم بين الزيارات في
 * نسخة الإنتاج، اربط القيمة دي بـ localStorage أو بإعدادات حساب المستخدم
 * في الـ backend.
 */
export function useTheme(initial: ThemeMode = "dark") {
  const [theme, setTheme] = useState<ThemeMode>(initial);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  return { theme, setTheme };
}
