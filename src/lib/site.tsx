import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { useNavigate } from "@tanstack/react-router";
import {
  CONTENT_KEY,
  DEFAULT_CONTENT,
  INQUIRY_KEY,
  LANG_KEY,
  THEME_KEY,
  sanitizeContent,
  type Inquiry,
  type Lang,
  type SiteContent,
  type Theme,
} from "@/lib/content";

type SiteValue = {
  content: SiteContent;
  lang: Lang;
  theme: Theme;
  inquiries: Inquiry[];
  saveError: string;
  tx: (zh: string, en: string) => string;
  setLang: (lang: Lang) => void;
  setTheme: (theme: Theme) => void;
  updateContent: (next: SiteContent) => void;
  resetContent: () => void;
  addInquiry: (item: Omit<Inquiry, "id" | "at">) => void;
  removeInquiry: (id: string) => void;
  open: (to: string, params?: Record<string, string>) => void;
};

const SiteContext = createContext<SiteValue | null>(null);

function applyTheme(theme: Theme) {
  document.documentElement.setAttribute("data-theme", theme);
  const meta = document.querySelector('meta[name="theme-color"]');
  meta?.setAttribute("content", theme === "dark" ? "#12110f" : "#f3efe7");
  localStorage.setItem(THEME_KEY, theme);
}

function applyLang(lang: Lang) {
  document.documentElement.lang = lang;
  document.documentElement.setAttribute("data-lang", lang);
  localStorage.setItem(LANG_KEY, lang);
}

export function SiteProvider({ children }: { children: ReactNode }) {
  const [content, setContent] = useState<SiteContent>(DEFAULT_CONTENT);
  const [lang, setLangState] = useState<Lang>("en");
  const [theme, setThemeState] = useState<Theme>("dark");
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [saveError, setSaveError] = useState("");
  const timer = useRef<number | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const t = document.documentElement.getAttribute("data-theme");
    if (t === "dark" || t === "light") setThemeState(t);
    const l = document.documentElement.getAttribute("data-lang");
    if (l === "en" || l === "zh") setLangState(l);
    try {
      const raw = localStorage.getItem(CONTENT_KEY);
      if (raw) {
        const parsed = sanitizeContent(JSON.parse(raw));
        if (parsed) {
          if (parsed.brandZh === "北庭") parsed.brandZh = "Jenny Bu";
          if (parsed.brandEn === "Northyard") parsed.brandEn = "Jenny Bu";
          parsed.aboutZh = parsed.aboutZh.replaceAll("北庭", "Jenny Bu");
          parsed.aboutEn = parsed.aboutEn.replaceAll("Northyard", "Jenny Bu");
          setContent(parsed);
        }
      }
      const saved = localStorage.getItem(INQUIRY_KEY);
      if (saved) {
        const arr = JSON.parse(saved) as unknown;
        if (Array.isArray(arr)) setInquiries(arr as Inquiry[]);
      }
    } catch {
      /* keep defaults */
    }
  }, []);

  useEffect(() => {
    document.title =
      content.brandZh === content.brandEn ? content.brandEn : `${content.brandZh} · ${content.brandEn}`;
  }, [content.brandZh, content.brandEn]);

  const tx = useCallback((zh: string, en: string) => (lang === "zh" ? zh : en), [lang]);

  const setLang = useCallback((next: Lang) => {
    setLangState(next);
    applyLang(next);
  }, []);

  const setTheme = useCallback((next: Theme) => {
    setThemeState(next);
    applyTheme(next);
  }, []);

  const updateContent = useCallback((next: SiteContent) => {
    setContent(next);
    if (timer.current) window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => {
      try {
        localStorage.setItem(CONTENT_KEY, JSON.stringify(next));
        setSaveError("");
      } catch {
        setSaveError("full");
      }
    }, 280);
  }, []);

  const resetContent = useCallback(() => {
    if (timer.current) window.clearTimeout(timer.current);
    localStorage.removeItem(CONTENT_KEY);
    setContent(structuredClone(DEFAULT_CONTENT));
    setSaveError("");
  }, []);

  const addInquiry = useCallback((item: Omit<Inquiry, "id" | "at">) => {
    setInquiries((prev) => {
      const next = [{ ...item, id: crypto.randomUUID(), at: new Date().toISOString() }, ...prev];
      try {
        localStorage.setItem(INQUIRY_KEY, JSON.stringify(next));
      } catch {
        /* ignore quota */
      }
      return next;
    });
  }, []);

  const removeInquiry = useCallback((id: string) => {
    setInquiries((prev) => {
      const next = prev.filter((item) => item.id !== id);
      localStorage.setItem(INQUIRY_KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  const open = useCallback(
    (to: string, params?: Record<string, string>) => {
      const go = () => {
        window.scrollTo(0, 0);
        return navigate({ to, params });
      };
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (!reduce && typeof document.startViewTransition === "function") {
        document.startViewTransition(() => go());
        return;
      }
      void go();
    },
    [navigate],
  );

  const value = useMemo(
    () => ({
      content,
      lang,
      theme,
      inquiries,
      saveError,
      tx,
      setLang,
      setTheme,
      updateContent,
      resetContent,
      addInquiry,
      removeInquiry,
      open,
    }),
    [
      content,
      lang,
      theme,
      inquiries,
      saveError,
      tx,
      setLang,
      setTheme,
      updateContent,
      resetContent,
      addInquiry,
      removeInquiry,
      open,
    ],
  );

  return <SiteContext.Provider value={value}>{children}</SiteContext.Provider>;
}

export function useSite() {
  const ctx = useContext(SiteContext);
  if (!ctx) throw new Error("useSite outside provider");
  return ctx;
}
