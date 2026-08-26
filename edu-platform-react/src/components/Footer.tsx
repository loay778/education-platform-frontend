import type { ReactElement } from "react";
import { platformConfig } from "../config/platformConfig";

const SOCIAL_ICONS: Record<string, ReactElement> = {
  facebook: (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M13.5 21v-7.6h2.55l.38-2.96h-2.93v-1.9c0-.86.24-1.44 1.47-1.44h1.57V4.8c-.27-.04-1.2-.12-2.28-.12-2.26 0-3.8 1.38-3.8 3.9v2.18H8v2.96h2.46V21h3.04Z" />
    </svg>
  ),
  instagram: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="1" />
    </svg>
  ),
  youtube: (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M21.6 7.2s-.2-1.5-.85-2.2c-.8-.9-1.7-.9-2.1-.95C15.9 3.8 12 3.8 12 3.8h0s-3.9 0-6.65.25c-.4.05-1.3.05-2.1.95C2.6 5.7 2.4 7.2 2.4 7.2S2.15 9 2.15 10.75v1.5C2.15 14 2.4 15.8 2.4 15.8s.2 1.5.85 2.2c.8.9 1.85.87 2.3.97 1.65.16 7 .2 7.45.2 0 0 3.9 0 6.65-.24.4-.05 1.3-.05 2.1-.95.65-.7.85-2.2.85-2.2s.25-1.8.25-3.55v-1.5c0-1.75-.25-3.55-.25-3.55Zm-11.9 6.9V8.4l5.3 2.85-5.3 2.85Z" />
    </svg>
  ),
  tiktok: (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M14.5 3h2.4c.15 1.4.85 2.6 2.1 3.3.75.45 1.6.7 2.5.75v2.5c-1.5-.05-2.9-.5-4.1-1.3v6.4c0 3.15-2.55 5.7-5.7 5.7S5.9 17.35 5.9 14.2c0-3.05 2.4-5.55 5.4-5.7v2.55c-1.6.15-2.85 1.5-2.85 3.15 0 1.75 1.4 3.15 3.15 3.15s3.15-1.4 3.15-3.15V3Z" />
    </svg>
  ),
  whatsapp: (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 3a9 9 0 0 0-7.75 13.6L3 21l4.55-1.2A9 9 0 1 0 12 3Zm0 1.85a7.15 7.15 0 0 1 6 11.05l-.25.4.65 2.4-2.45-.65-.4.25A7.15 7.15 0 1 1 12 4.85Zm-3.2 3.5c-.2 0-.5.07-.75.35-.25.28-1 .95-1 2.35s1.03 2.7 1.17 2.9c.15.2 2 3.15 5 4.3.5.2.9.3 1.2.4.5.15.95.13 1.3.08.4-.06 1.25-.5 1.42-1 .18-.5.18-.9.13-1-.05-.1-.2-.15-.4-.25-.2-.1-1.25-.6-1.45-.68-.2-.08-.33-.1-.48.1-.15.2-.55.68-.68.83-.13.15-.25.16-.45.06-.2-.1-.87-.32-1.65-1.02-.6-.55-1.02-1.22-1.14-1.42-.12-.2-.01-.32.09-.4.09-.1.2-.25.3-.38.1-.13.13-.2.2-.35.06-.15.03-.28-.02-.4-.06-.1-.48-1.18-.65-1.6-.17-.4-.36-.35-.5-.36h-.42Z" />
    </svg>
  ),
};

export function Footer() {
  const { platform, teacher, social } = platformConfig;

  return (
    <footer className="footer">
      <div className="footer-grid">
        <div className="footer-brand">
          <div className="brand">
            <div className="brand-logo">
              {platform.logoImageUrl ? (
                <img src={platform.logoImageUrl} alt={platform.name} />
              ) : (
                platform.logoText
              )}
            </div>
            <span className="brand-name">{platform.name}</span>
          </div>
          <p>{platform.aboutShort}</p>
          <div className="social-row">
            {Object.entries(social).map(([key, url]) =>
              url ? (
                <a
                  key={key}
                  href={url}
                  aria-label={key}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {SOCIAL_ICONS[key]}
                </a>
              ) : null
            )}
          </div>
        </div>

        <div className="footer-col">
          <h5>الصفحات</h5>
          <ul>
            <li><a href="#">الرئيسية</a></li>
            <li><a href="#">الكورسات</a></li>
            <li><a href="#">المنتدى</a></li>
            <li><a href="#">حسابي</a></li>
          </ul>
        </div>

        <div className="footer-col">
          <h5>المساعدة</h5>
          <ul>
            <li><a href="#">الأسئلة الشائعة</a></li>
            <li><a href="#">سياسة الاسترجاع</a></li>
            <li><a href="#">الشروط والأحكام</a></li>
            <li><a href="#">سياسة الخصوصية</a></li>
          </ul>
        </div>

        <div className="footer-col">
          <h5>تواصل معنا</h5>
          <ul>
            <li><a href={`tel:${teacher.contact.phone}`}>{teacher.contact.phone}</a></li>
            <li><a href={`mailto:${teacher.contact.email}`}>{teacher.contact.email}</a></li>
            <li><a href="#">الدعم الفني</a></li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <span>{platform.copyrightText}</span>
        <span>بإشراف {teacher.name}</span>
      </div>
    </footer>
  );
}
