import { useEffect } from "react";
import { platformConfig } from "../config/platformConfig";

/**
 * بيطبّق ألوان platformConfig على متغيرات CSS مرة واحدة عند تحميل التطبيق.
 * ده اللي بيخلي كل الواجهة تاخد الهوية البصرية من ملف الـ config من غير ما
 * أي مكوّن يحتاج يعرف قيم الألوان بنفسه.
 */
export function useApplyPlatformColors() {
  useEffect(() => {
    const root = document.documentElement.style;
    const { colors } = platformConfig;
    root.setProperty("--primary", colors.primary);
    root.setProperty("--primary-light", colors.primaryLight);
    root.setProperty("--primary-dark", colors.primaryDark);
    root.setProperty("--secondary", colors.secondary);
    root.setProperty("--accent", colors.accent);
    root.setProperty("--danger", colors.danger);

    if (platformConfig.platform.faviconUrl) {
      const link =
        document.querySelector<HTMLLinkElement>("link[rel='icon']");
      if (link) link.href = platformConfig.platform.faviconUrl;
    }
    document.title = platformConfig.platform.name;
  }, []);
}
