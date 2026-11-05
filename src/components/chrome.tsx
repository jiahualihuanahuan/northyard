import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import { Moon, Sun } from "lucide-react";
import { cn } from "@/lib/cn";
import { useSite } from "@/lib/site";

const LINKS = [
  { id: "work", zh: "作品", en: "Work" },
  { id: "also", zh: "陈设与售房", en: "Also" },
  { id: "approach", zh: "理念", en: "Approach" },
  { id: "advisory", zh: "地产顾问", en: "Advisory" },
] as const;

export function Nav({ overlay = false }: { overlay?: boolean }) {
  const { content, lang, theme, tx, setLang, setTheme } = useSite();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const onPhoto = overlay && pathname === "/" && !scrolled && !open;

  useEffect(() => {
    setMounted(true);
  }, []);

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
        "fixed inset-x-0 top-0 z-40 border-b border-line bg-canvas text-ink lg:transition-colors lg:duration-300",
        onPhoto ? "lg:border-transparent lg:bg-transparent lg:text-on-photo" : "lg:bg-canvas",
      )}
    >
      <div className="flex h-16 items-center justify-between gap-4 px-5 md:px-8 lg:px-12">
        <Link to="/" className="flex min-h-11 items-baseline gap-3" onClick={() => setOpen(false)}>
          <span className="display text-3xl leading-none">
            {lang === "zh" ? content.brandZh : content.brandEn}
          </span>
          {content.brandZh !== content.brandEn ? (
            <span className="eyebrow hidden xl:inline">{lang === "zh" ? content.brandEn : content.brandZh}</span>
          ) : null}
        </Link>
        <nav className="hidden items-center gap-7 lg:flex">
          <Link to="/services" className="min-h-11 text-sm inline-flex items-center">
            {lang === "zh" ? "服务" : "Services"}
          </Link>
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
            to="/contact"
            className="tap ml-1 hidden min-h-11 items-center border px-4 text-sm line-soft lg:inline-flex"
          >
            {tx("联系", "Contact")}
          </Link>
          <button
            type="button"
            className="tap min-h-11 px-3 text-sm lg:hidden"
            aria-expanded={open}
            aria-label={open ? tx("关闭目录", "Close menu") : tx("打开目录", "Open menu")}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? tx("关闭", "Close") : tx("目录", "Menu")}
          </button>
        </div>
      </div>
      {mounted && open
        ? createPortal(
            <div
              className="fixed inset-0 z-[80] flex flex-col lg:hidden"
              style={{ background: "var(--color-canvas)", color: "var(--color-ink)" }}
            >
              <div className="flex h-16 items-center justify-between px-5">
                <p className="display text-2xl leading-none">{lang === "zh" ? content.brandZh : content.brandEn}</p>
                <button
                  type="button"
                  className="tap min-h-11 px-3 text-sm"
                  onClick={() => setOpen(false)}
                  aria-label={tx("关闭目录", "Close menu")}
                >
                  {tx("关闭", "Close")}
                </button>
              </div>
              <div className="flex flex-col px-6 pt-6">
                <Link to="/services" className="border-b border-line py-5 text-3xl" onClick={() => setOpen(false)}>
                  {lang === "zh" ? "服务" : "Services"}
                </Link>
                {LINKS.map((link) => (
                  <button
                    key={link.id}
                    type="button"
                    className="border-b border-line py-5 text-left text-3xl"
                    onClick={() => go(link.id)}
                  >
                    {lang === "zh" ? link.zh : link.en}
                  </button>
                ))}
                <Link to="/contact" className="py-5 text-3xl" onClick={() => setOpen(false)}>
                  {tx("联系", "Contact")}
                </Link>
              </div>
            </div>,
            document.body,
          )
        : null}
    </header>
  );
}

export function Footer() {
  const { content, lang, t, tx } = useSite();
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-line px-5 py-12 md:px-8 lg:px-12">
      <div className="grid gap-10 md:grid-cols-4">
        <div className="md:col-span-2">
          <p className="display text-4xl">{lang === "zh" ? content.brandZh : content.brandEn}</p>
          <p className="mt-3 max-w-sm text-sm leading-6 text-muted">{t(content.tagline)}</p>
        </div>
        <div className="text-sm leading-7">
          <p className="eyebrow text-muted">{tx("服务地区", "Where")}</p>
          <p className="mt-3">{t(content.city)}</p>
          <ContactLinks />
        </div>
        <div className="flex flex-col items-start gap-1 text-sm">
          <p className="eyebrow text-muted">{tx("服务", "Services")}</p>
          <Link to="/services/$slug" params={{ slug: "landscape-design" }} className="inline-flex min-h-11 items-center">
            {tx("景观设计", "Landscape design")}
          </Link>
          <Link to="/services/$slug" params={{ slug: "pools-and-water" }} className="inline-flex min-h-11 items-center">
            {tx("泳池与水景", "Pools and water")}
          </Link>
          <Link to="/services/$slug" params={{ slug: "outdoor-living" }} className="inline-flex min-h-11 items-center">
            {tx("露台与厨房", "Terraces and kitchens")}
          </Link>
          <Link to="/services/$slug" params={{ slug: "property-advisory" }} className="inline-flex min-h-11 items-center">
            {tx("地产顾问", "Property advisory")}
          </Link>
          <Link to="/staging" className="inline-flex min-h-11 items-center">
            {tx("室内陈设", "Interior staging")}
          </Link>
          <Link to="/listings/$mls" params={{ mls: "N14119300" }} className="inline-flex min-h-11 items-center">
            {tx("在售房屋", "A house for sale")}
          </Link>
        </div>
      </div>
      <p className="mt-12 text-sm text-muted">
        © {year} {content.brandEn}.{" "}
        {tx("展示作品均为已完工项目。", "All projects shown are completed.")}
      </p>
    </footer>
  );
}

function telHref(phone: string) {
  return `tel:+1${phone.replace(/\D/g, "").replace(/^1(?=\d{10}$)/, "")}`;
}

export function ContactLinks() {
  const { content } = useSite();
  return (
    <>
      {content.phone ? (
        <p>
          <a href={telHref(content.phone)} className="inline-flex min-h-11 items-center">
            {content.phone}
          </a>
        </p>
      ) : null}
      {content.email ? (
        <p>
          <a href={`mailto:${content.email}`} className="inline-flex min-h-11 items-center">
            {content.email}
          </a>
        </p>
      ) : null}
    </>
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
