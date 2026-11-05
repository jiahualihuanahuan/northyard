import { useEffect, useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { JsonLd } from "@/components/json-ld";
import { Page } from "@/components/chrome";
import { Frame } from "@/components/frame";
import { faqLd } from "@/lib/seo";
import { AREAS, HOME_FAQS, SERVICES } from "@/lib/services";
import { useSite } from "@/lib/site";
import { LISTINGS, STAGING } from "@/lib/ventures";

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
      <JsonLd data={faqLd(HOME_FAQS)} />
      <Hero />
      <Approach />
      <Services />
      <Where />
      <SelectedWork />
      <Also />
      <Questions />
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
          <p lang="zh" className="bilingual-sub mt-3 text-lg text-on-photo/80">
            {hero.headline.zh}
          </p>
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

function Services() {
  const { t, tx } = useSite();
  return (
    <section id="services" className={`border-t border-line py-24 md:py-32 ${PAD}`}>
      <div className="flex flex-wrap items-end justify-between gap-6">
        <h2 className="display max-w-3xl text-4xl md:text-6xl">
          {tx("服务从整块地开始。", "The work starts with the whole lot.")}
        </h2>
        <Link to="/services" className="group inline-flex min-h-11 items-center gap-2 text-sm">
          {tx("全部服务", "All services")}
          <ArrowUpRight className={ARROW} />
        </Link>
      </div>
      <div className="mt-16 border-t border-line">
        {SERVICES.map((service) => (
          <Link
            key={service.slug}
            to="/services/$slug"
            params={{ slug: service.slug }}
            className="group grid gap-2 border-b border-line py-7 md:grid-cols-12 md:items-baseline"
          >
            <span className="eyebrow text-muted md:col-span-4">{t(service.nav)}</span>
            <span className="display text-3xl md:col-span-8">{t(service.headline)}</span>
          </Link>
        ))}
      </div>
    </section>
  );
}

function Where() {
  const { tx } = useSite();
  return (
    <section id="where" className={`border-t border-line py-24 md:py-28 ${PAD}`}>
      <p className="eyebrow text-muted">{tx("服务地区", "Where")}</p>
      <h2 className="display mt-4 max-w-3xl text-4xl md:text-6xl">
        {tx("多伦多与约克区。", "Toronto and York Region.")}
      </h2>
      <p className="mt-6 max-w-xl text-base leading-7 text-muted">
        {tx(
          "目前的项目在北约克、万锦、列治文山、旺市、奥罗拉、索恩希尔，以及多伦多与约克区周边。",
          `Current work is in ${AREAS}, and on nearby streets across Toronto and York Region.`,
        )}
      </p>
    </section>
  );
}

function Questions() {
  const { t, tx } = useSite();
  return (
    <section id="questions" className={`border-t border-line py-24 md:py-32 ${PAD}`}>
      <h2 className="display max-w-3xl text-4xl md:text-6xl">
        {tx("先问的几件事。", "Questions people ask first.")}
      </h2>
      <div className="faq mt-12 max-w-3xl">
        {HOME_FAQS.map((faq) => (
          <details key={faq.q.en}>
            <summary className="text-base">{t(faq.q)}</summary>
            <p className="pb-5 text-sm leading-6 text-muted">{t(faq.a)}</p>
          </details>
        ))}
      </div>
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
              <p className="eyebrow mt-5 text-muted">{tx("已完工项目", "Completed project")}</p>
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

function Also() {
  const { t, tx } = useSite();
  const listing = LISTINGS[0];
  const photo = STAGING.images[0];
  return (
    <section id="also" className={`border-t border-line py-24 md:py-32 ${PAD}`}>
      <h2 className="display max-w-3xl text-4xl md:text-6xl">
        {tx("房子里面，和在卖的房子。", "Inside the house, and the house itself.")}
      </h2>
      <div className="mt-16 grid gap-16 md:grid-cols-2">
        <article>
          <Link to="/staging" className="group block">
            <Frame src={photo.src} alt={t(photo.alt)} className="aspect-3/2" />
            <p className="eyebrow mt-5 text-muted">{t(STAGING.nav)}</p>
            <h3 className="display mt-3 text-3xl">{t(STAGING.headline)}</h3>
            <p className="mt-3 text-sm leading-6 text-muted">{t(STAGING.card)}</p>
            <span className="mt-4 inline-flex min-h-11 items-center gap-2 text-sm">
              {tx("再看几间", "See the rooms")}
              <ArrowUpRight className={ARROW} />
            </span>
          </Link>
        </article>
        <article>
          <Link to="/listings/$mls" params={{ mls: listing.mls }} className="group block">
            <Frame src={listing.image} alt={t(listing.alt)} className="aspect-3/2" />
            <p className="eyebrow mt-5 text-muted">{tx("在售", "For sale")}</p>
            <h3 className="display mt-3 text-3xl">{listing.address}</h3>
            <p className="mt-3 text-sm leading-6 text-muted">
              {t(listing.area)} · {listing.price}
            </p>
            <p className="mt-2 text-sm leading-6 text-muted">{t(listing.summary)}</p>
            <span className="mt-4 inline-flex min-h-11 items-center gap-2 text-sm">
              {tx("看这套房", "See the house")}
              <ArrowUpRight className={ARROW} />
            </span>
          </Link>
        </article>
      </div>
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
