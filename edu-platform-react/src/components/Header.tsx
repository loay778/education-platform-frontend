import { platformConfig } from "../config/platformConfig";
import type { Student, ThemeMode } from "../types";
import {
  IconMenu,
  IconSun,
  IconMoon,
  IconCoin,
  IconBell,
} from "./icons";

interface HeaderProps {
  student: Student | null;
  theme: ThemeMode;
  onThemeChange: (mode: ThemeMode) => void;
  onOpenMobileMenu: () => void;
  onNotificationsClick: () => void;
}

export function Header({
  student,
  theme,
  onThemeChange,
  onOpenMobileMenu,
  onNotificationsClick,
}: HeaderProps) {
  return (
    <header className="header">
      <div className="header-side">
        <button
          className="icon-btn mobile-menu-btn"
          aria-label="فتح القائمة"
          onClick={onOpenMobileMenu}
        >
          <IconMenu />
        </button>
        <div className="brand">
          <div className="brand-logo">
            {platformConfig.platform.logoImageUrl ? (
              <img
                src={platformConfig.platform.logoImageUrl}
                alt={platformConfig.platform.name}
              />
            ) : (
              platformConfig.platform.logoText
            )}
          </div>
          <span className="brand-name">{platformConfig.platform.name}</span>
        </div>
      </div>

      <div className="header-side">
        <div className="theme-toggle" role="group" aria-label="تبديل المظهر">
          <button
            aria-label="الوضع الفاتح"
            className={theme === "light" ? "active" : ""}
            onClick={() => onThemeChange("light")}
          >
            <IconSun />
          </button>
          <button
            aria-label="الوضع الداكن"
            className={theme === "dark" ? "active" : ""}
            onClick={() => onThemeChange("dark")}
          >
            <IconMoon />
          </button>
        </div>

        <div className="points-chip" title="رصيد النقاط">
          <IconCoin />
          <span>{student ? student.points.toLocaleString("ar-EG") : "—"}</span>
          <span className="txt">&nbsp;نقطة</span>
        </div>

        <button
          className="icon-btn"
          aria-label="الإشعارات"
          style={{ position: "relative" }}
          onClick={onNotificationsClick}
        >
          <IconBell />
          {student?.hasUnreadNotifications && (
            <span className="badge-dot" />
          )}
        </button>

        <div className="profile-chip">
          <img
            className="profile-avatar"
            src={student?.avatarUrl}
            alt="صورة الطالب"
          />
          <div className="profile-meta">
            <span className="profile-name">{student?.name ?? "—"}</span>
            <span className="profile-role">طالب</span>
          </div>
        </div>
      </div>
    </header>
  );
}
