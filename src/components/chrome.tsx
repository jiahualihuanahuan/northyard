import { useEffect, useState } from "react";
import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import { Menu, Moon, Sun, X } from "lucide-react";
import { cn } from "@/lib/cn";
import { useSite } from "@/lib/site";

const LINKS = [
  { id: "synergy", zh: "跨界", en: "Synergy" },
  { id: "estate", zh: "地产", en: "Estate" },
  { id: "garden", zh: "景观", en: "Garden" },
  { id: "about", zh: "关于", en: "About" },
] as const;

export function Nav({ overlay = false }: { overlay?: boolean }) {
  const { content, lang, theme, tx, setLang, setTheme } = useSite();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const onPhoto = overlay && pathname === "/" && !scrolled && !open;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  function go(id: string) {
    setOpen(false);
    if (pathname === "/") {
      document.getElementById(id)?.scrollIntoView();
      return;
    }
    void navigate({ to: "/", hash: id });
  }

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-40 transition-colors duration-300",
        onPhoto ? "bg-transparent text-on-photo" : "border-b border-line bg-canvas/92 text-ink backdrop-blur-md",
      )}
    >
      <div className="flex h-16 items-center justify-between gap-4 px-5 md:px-8 lg:px-12">
        <Link to="/" className="flex min-h-11 items-baseline gap-3" onClick={() => setOpen(false)}>
          <span className="display text-3xl leading-none">
            {lang === "zh" ? content.brandZh : content.brandEn}
          </span>
          <span className="eyebrow hidden xl:inline">{lang === "zh" ? content.brandEn : content.brandZh}</span>
        </Link>
        <nav className="hidden items-center gap-7 lg:flex">
          {LINKS.map((link) => (
            <button key={link.id} type="button" className="min-h-11 text-sm" onClick={() => go(link.id)}>
              {lang === "zh" ? link.zh : link.en}
            </button>
          ))}
        </nav>
        <div className="flex items-center gap-1">
          <button
            type="button"
            className="tap min-h-11 px-3 text-sm"
            onClick={() => setLang(lang === "zh" ? "en" : "zh")}
            aria-label={tx("切换语言", "Switch language")}
          >
            {lang === "zh" ? "EN" : "中"}
          </button>
          <button
            type="button"
            className="tap grid size-11 place-items-center"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            aria-label={tx("切换明暗", "Toggle theme")}
          >
            {theme === "dark" ? <Sun className="size-4" /> : <Moon className="size-4" />}
          </button>
          <Link
            to="/inquire"
            className="tap ml-1 hidden min-h-11 items-center border px-4 text-sm line-soft lg:inline-flex"
          >
            {tx("预约", "Inquire")}
          </Link>
          <button
            type="button"
            className="tap grid size-11 place-items-center lg:hidden"
            aria-expanded={open}
            aria-label={open ? tx("关闭菜单", "Close menu") : tx("打开菜单", "Open menu")}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>
      <div
        className={cn(
          "fixed inset-0 z-50 bg-canvas text-ink transition-opacity duration-300 lg:hidden",
          open ? "opacity-100" : "pointer-events-none opacity-0",
        )}
        aria-hidden={!open}
      >
        <div className="flex h-16 items-center justify-end px-5">
          <button
            type="button"
            className="grid size-11 place-items-center"
            onClick={() => setOpen(false)}
            aria-label={tx("关闭菜单", "Close menu")}
          >
            <X className="size-5" />
          </button>
        </div>
        <div className="flex flex-col px-6 pt-8">
          {LINKS.map((link) => (
            <button
              key={link.id}
              type="button"
              className="display border-b border-line py-4 text-left text-5xl"
              onClick={() => go(link.id)}
            >
              {lang === "zh" ? link.zh : link.en}
            </button>
          ))}
          <Link to="/inquire" className="display py-4 text-5xl" onClick={() => setOpen(false)}>
            {tx("预约", "Inquire")}
          </Link>
        </div>
      </div>
    </header>
  );
}

export function Footer() {
  const { content, lang, tx } = useSite();
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-line px-5 py-12 md:px-8 lg:px-12">
      <div className="grid gap-10 md:grid-cols-4">
        <div className="md:col-span-2">
          <p className="display text-4xl">{lang === "zh" ? content.brandZh : content.brandEn}</p>
          <p className="mt-3 max-w-sm text-sm leading-6 text-muted">{tx(content.taglineZh, content.taglineEn)}</p>
        </div>
        <div className="text-sm leading-7">
          <p className="eyebrow text-muted">{tx("服务地区", "Where")}</p>
          <p className="mt-3">{tx(content.cityZh, content.cityEn)}</p>
          {content.phone ? <p>{content.phone}</p> : null}
          {content.email ? <p>{content.email}</p> : null}
        </div>
        <div className="flex flex-col items-start gap-1 text-sm">
          <Link to="/inquire" className="inline-flex min-h-11 items-center">
            {tx("预约咨询", "Book a conversation")}
          </Link>
          <Link to="/studio" className="inline-flex min-h-11 items-center text-muted">
            {tx("内容工作室", "Content studio")}
          </Link>
        </div>
      </div>
      <p className="mt-12 text-sm text-muted">
        © {year} {content.brandEn}. {tx("示范内容可在工作室里替换成你的照片与介绍。", "Sample studies can be replaced with your own photographs and words in the studio.")}
      </p>
    </footer>
  );
}

export function Page({ children, overlay = false }: { children: React.ReactNode; overlay?: boolean }) {
  return (
    <div className="min-h-dvh bg-canvas text-ink">
      <Nav overlay={overlay} />
      {children}
      <Footer />
    </div>
  );
}

export function statusLabel(status: string, tx: (zh: string, en: string) => string) {
  if (status === "active") return tx("在售", "Listed");
  if (status === "sold") return tx("成交", "Sold");
  return tx("示范", "Study");
}
