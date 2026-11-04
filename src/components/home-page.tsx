import { useEffect, useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { Page } from "@/components/chrome";
import { Frame } from "@/components/frame";
import { useSite } from "@/lib/site";

const PAD = "px-5 md:px-8 lg:px-12";
const ARROW =
  "size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5";

export function HomePage() {
  const hash = useRouterState({ select: (s) => s.location.hash });
  useEffect(() => {
    if (!hash) return;
    const id = hash.replace("#", "");
    const frame = requestAnimationFrame(() => {
      document.getElementById(id)?.scrollIntoView();
    });
    return () => cancelAnimationFrame(frame);
  }, [hash]);

  return (
    <Page overlay>
      <Hero />
      <Approach />
      <SelectedWork />
      <Services />
      <Process />
      <Advisory />
      <ContactCta />
    </Page>
  );
}

function Hero() {
  const { content, t } = useSite();
  const hero = content.hero;
  const [live, setLive] = useState(false);
  useEffect(() => {
    const id = requestAnimationFrame(() => setLive(true));
    return () => cancelAnimationFrame(id);
  }, []);

  return (
    <section className={live ? "hero-split is-live" : "hero-split"} style={{ gridTemplateColumns: "1fr" }}>
      <div className="hero-panel">
        <img
          className="hero-photo"
          src={hero.image}
          alt={t(hero.alt)}
          width={1699}
          height={926}
          fetchPriority="high"
        />
        <div className="hero-shade" />
        <div className="hero-copy" style={{ maxWidth: "44rem" }}>
          <p className="eyebrow">{t(content.tagline)}</p>
          <h1 className="display mt-4 text-5xl md:text-6xl lg:text-7xl">{t(hero.headline)}</h1>
          <p className="mt-5 max-w-lg text-base leading-7 text-on-photo/85">{t(hero.body)}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/contact" className="tap inline-flex min-h-11 items-center bg-accent px-6 text-sm text-accent-fg">
              {t(hero.primaryCta)}
            </Link>
            <a href="#work" className="tap inline-flex min-h-11 items-center border px-6 text-sm line-soft">
              {t(hero.secondaryCta)}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function Approach() {
  const { content, t } = useSite();
  const a = content.approach;
  return (
    <section id="approach" className={`grid items-center gap-10 py-24 md:grid-cols-12 md:py-32 ${PAD}`}>
      <div className="md:col-span-5">
        <h2 className="display text-4xl md:text-6xl">{t(a.headline)}</h2>
        <p className="mt-6 text-base leading-7 text-muted">{t(a.body)}</p>
      </div>
      <Frame src={a.image} alt={t(a.alt)} className="aspect-3/2 md:col-span-7" />
    </section>
  );
}

function SelectedWork() {
  const { content, t, tx } = useSite();
  return (
    <section id="work" className={`border-t border-line py-24 md:py-32 ${PAD}`}>
      <h2 className="display max-w-3xl text-4xl md:text-6xl">{t(content.workSection.headline)}</h2>
      <div className="mt-16 grid gap-12 md:grid-cols-2 lg:grid-cols-3">
        {content.work.map((item) => (
          <article key={item.id}>
            <Link to="/work/$id" params={{ id: item.id }} className="group block">
              <Frame src={item.image} alt={t(item.alt)} className="aspect-3/2" />
              <p className="eyebrow mt-5 text-muted">{tx("设计方案", "Concept design")}</p>
              <h3 className="display mt-3 text-3xl">{t(item.title)}</h3>
              <p className="mt-3 text-sm leading-6 text-muted">{t(item.body)}</p>
              <span className="mt-4 inline-flex min-h-11 items-center gap-2 text-sm">
                {tx("查看", "View")}
                <ArrowUpRight className={ARROW} />
              </span>
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}

function Services() {
  const { content, t } = useSite();
  return (
    <section id="services" className={`border-t border-line py-24 md:py-32 ${PAD}`}>
      <h2 className="display text-4xl md:text-6xl">{t(content.services.headline)}</h2>
      <ul className="mt-16 grid gap-10 md:grid-cols-2 lg:grid-cols-4">
        {content.services.items.map((item, i) => (
          <li key={i} className="border-t border-line pt-6">
            <h3 className="display text-2xl">{t(item.title)}</h3>
            <p className="mt-3 text-sm leading-6 text-muted">{t(item.body)}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}

function Process() {
  const { content, t } = useSite();
  return (
    <section id="process" className={`border-t border-line py-24 md:py-32 ${PAD}`}>
      <h2 className="display text-4xl md:text-6xl">{t(content.process.headline)}</h2>
      <ol className="mt-16 grid gap-10 md:grid-cols-4">
        {content.process.steps.map((step, i) => (
          <li key={i}>
            <p className="display text-5xl text-accent">{String(i + 1).padStart(2, "0")}</p>
            <h3 className="mt-4 text-lg">{t(step.title)}</h3>
            <p className="mt-3 text-sm leading-6 text-muted">{t(step.body)}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}

function Advisory() {
  const { content, t, tx } = useSite();
  const a = content.advisory;
  if (!a.enabled) return null;
  return (
    <section id="advisory" className={`grid items-center gap-10 border-t border-line py-24 md:grid-cols-12 md:py-32 ${PAD}`}>
      <Frame src={a.image} alt={t(a.alt)} className="aspect-3/2 md:col-span-6" />
      <div className="md:col-span-5 md:col-start-8">
        <p className="eyebrow text-muted">{tx("地产顾问", "Property advisory")}</p>
        <h2 className="display mt-4 text-3xl md:text-5xl">{t(a.headline)}</h2>
        <p className="mt-6 text-base leading-7 text-muted">{t(a.body)}</p>
        <Link to="/contact" search={{ type: "advisory" }} className="group mt-6 inline-flex min-h-11 items-center gap-2 text-sm">
          {t(a.cta)}
          <ArrowUpRight className={ARROW} />
        </Link>
      </div>
    </section>
  );
}

function ContactCta() {
  const { content, t } = useSite();
  const c = content.contactCta;
  return (
    <section id="contact" className="band">
      <img src={c.image} alt={t(c.alt)} className="absolute inset-0 h-full w-full max-w-none object-cover" loading="lazy" />
      <div className="band-shade" style={{ background: "color-mix(in oklab, var(--color-scrim) 62%, transparent)" }} />
      <div className={`relative flex h-full flex-col justify-end pb-12 text-on-photo ${PAD}`}>
        <h2 className="display max-w-2xl text-4xl md:text-6xl">{t(c.headline)}</h2>
        <p className="mt-5 max-w-xl text-base leading-7 text-on-photo/85">{t(c.body)}</p>
        <Link to="/contact" className="tap mt-8 inline-flex min-h-11 w-fit items-center bg-accent px-6 text-sm text-accent-fg">
          {t(c.cta)}
        </Link>
      </div>
    </section>
  );
}
