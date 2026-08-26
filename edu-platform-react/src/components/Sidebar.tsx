import { useState } from "react";
import { platformConfig } from "../config/platformConfig";
import { IconChevron, IconHome, IconBook, IconForum, IconUser } from "./icons";

interface SidebarProps {
  onToggleCollapse: () => void;
}

const NAV_ITEMS = [
  { key: "home", label: "الرئيسية", icon: <IconHome /> },
  { key: "courses", label: "الكورسات", icon: <IconBook /> },
  { key: "forum", label: "المنتدى", icon: <IconForum /> },
  { key: "account", label: "حسابي", icon: <IconUser /> },
] as const;

export function Sidebar({ onToggleCollapse }: SidebarProps) {
  const [activeKey, setActiveKey] = useState<string>("home");

  return (
    <aside className="sidebar" id="sidebar">
      <button className="sidebar-collapse-btn" onClick={onToggleCollapse}>
        <IconChevron />
        <span className="label">تصغير النافذة</span>
      </button>

      <nav className="nav-list">
        {NAV_ITEMS.map((item) => (
          <a
            key={item.key}
            href="#"
            className={`nav-item ${activeKey === item.key ? "active" : ""}`}
            onClick={(e) => {
              e.preventDefault();
              setActiveKey(item.key);
            }}
          >
            {item.icon}
            <span className="label">{item.label}</span>
          </a>
        ))}
      </nav>

      <div className="sidebar-footer">
        <div className="teacher-mini">
          <img src={platformConfig.teacher.imageUrl} alt="صورة المدرس" />
          <div className="txt">
            <div className="t-name">{platformConfig.teacher.name}</div>
            <div className="t-role">المدرّس</div>
          </div>
        </div>
      </div>
    </aside>
  );
}

export type { SidebarProps };
