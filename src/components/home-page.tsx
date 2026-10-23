import { useEffect, useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { Compare } from "@/components/compare";
import { Page, statusLabel } from "@/components/chrome";
import { Frame } from "@/components/frame";
import type { Garden, Property } from "@/lib/content";
import { useSite } from "@/lib/site";

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
      <Manifesto />
      <Synergy />
      <Street />
      <Estate />
      <Landscape />
      <Process />
      <About />
      <Neighborhoods />
      <InquireBand />
    </Page>
  );
}

function Hero() {
  const { tx } = useSite();
  const [hot, setHot] = useState<"estate" | "garden" | null>(null);
  const [live, setLive] = useState(false);

  useEffect(() => {
    const id = requestAnimationFrame(() => setLive(true));
    return () => cancelAnimationFrame(id);
  }, []);

  return (
    <section className={live ? "hero-split is-live" : "hero-split"} data-hot={hot ?? undefined}>
      <a
        href="#estate"
        className="hero-panel"
        data-panel="estate"
        onMouseEnter={() => setHot("estate")}
        onMouseLeave={() => setHot(null)}
        onFocus={() => setHot("estate")}
        onBlur={() => setHot(null)}
      >
        <img
          className="hero-photo"
          src="/images/hero-estate.jpg"
          alt={tx("石灰石住宅与前庭", "Limestone house and front garden")}
          width={1792}
          height={1008}
          fetchPriority="high"
        />
        <div className="hero-shade" />
        <div className="hero-copy">
          <p className="eyebrow">{tx("地产", "Real estate")}</p>
          <h1 className="display mt-4 text-5xl md:text-6xl lg:text-7xl">
            {tx("买下之前，", "Read the land")}
            <br />
            {tx("先读懂这块地。", "before the house.")}
          </h1>
          <p className="mt-5 max-w-sm text-sm leading-6 text-on-photo/80">
            {tx("用设计的眼光看地块，而不只是看房间数。", "A designer’s reading of the lot — not just the room count.")}
          </p>
        </div>
      </a>
      <a
        href="#garden"
        className="hero-panel"
        data-panel="garden"
        onMouseEnter={() => setHot("garden")}
        onMouseLeave={() => setHot(null)}
        onFocus={() => setHot("garden")}
        onBlur={() => setHot(null)}
      >
        <img
          className="hero-photo"
          src="/images/hero-garden.jpg"
          alt={tx("石庭与静水", "Stone court and still water")}
          width={1792}
          height={1008}
        />
        <div className="hero-shade" />
        <div className="hero-copy">
          <p className="eyebrow">{tx("景观", "Landscape")}</p>
          <p className="display mt-4 text-5xl md:text-6xl lg:text-7xl">
            {tx("挂牌之前，", "Let the garden")}
            <br />
            {tx("让庭院先开口。", "speak before you list.")}
          </p>
          <p className="mt-5 max-w-sm text-sm leading-6 text-on-photo/80">
            {tx("外立面与庭院的微改造，换来第一眼和出价。", "A quieter facade and garden, for the first glance and the offer.")}
          </p>
        </div>
      </a>
    </section>
  );
}

function Manifesto() {
  const { tx } = useSite();
  return (
    <section className="grid gap-8 px-5 py-24 md:grid-cols-12 md:px-8 md:py-32 lg:px-12">
      <p className="display text-4xl md:col-span-7 md:text-6xl">
        {tx("不是两盘生意拼在一起。是同一次看地。", "Not two businesses on one page. One reading of the land.")}
      </p>
      <p className="text-base leading-7 text-muted md:col-span-4 md:col-start-9 md:pt-4">
        {tx(
          "买家需要有人指出院子还能长出什么。卖家需要门前三米经得起停留。住下来之后，同一双眼睛可以把户外做成房间。",
          "Buyers need someone who can see what the yard can still become. Sellers need the first three metres to hold a person still. Afterward, the same eye can turn the outdoors into a room.",
        )}
      </p>
    </section>
  );
}

const STEPS = [
  {
    n: "01",
    titleZh: "买入前",
    titleEn: "Before you buy",
    bodyZh: "标高、朝向、树和侧院，决定这栋房子还能不能长出另一间户外的房间。价格表上看不到这些。",
    bodyEn: "Grade, orientation, trees, and the side yard decide whether another outdoor room is possible. None of that is on the listing sheet.",
  },
  {
    n: "02",
    titleZh: "挂牌前",
    titleEn: "Before you list",
    bodyZh: "门前三米与庭院的第一眼，往往比重新刷一遍厨房更影响出价。我们整理外立面和院子，不做舞台布景。",
    bodyEn: "The first three metres change offers more often than another kitchen refresh. We edit the facade and the yard. We do not build a set.",
  },
  {
    n: "03",
    titleZh: "安家后",
    titleEn: "After you arrive",
    bodyZh: "勘测、概念、植物与石材，然后落地。院子要成为会用的房间，而不是只在照片里好看。",
    bodyEn: "Survey, concept, plants and stone, then it gets built. The garden should be a room you use, not only a photograph.",
  },
] as const;

function Synergy() {
  const { tx } = useSite();
  return (
    <section id="synergy" className="border-t border-line px-5 py-24 md:px-8 md:py-32 lg:px-12">
      <p className="eyebrow text-muted">{tx("跨界", "The synergy")}</p>
      <h2 className="display mt-4 max-w-3xl text-4xl md:text-6xl">
        {tx("一加一，是同一次专业判断。", "One and one, in a single judgment.")}
      </h2>
      <ol className="mt-16 grid gap-12 md:grid-cols-3">
        {STEPS.map((step) => (
          <li key={step.n} className="border-t border-line pt-6">
            <p className="eyebrow text-accent">{step.n}</p>
            <h3 className="display mt-4 text-3xl">{tx(step.titleZh, step.titleEn)}</h3>
            <p className="mt-4 text-sm leading-7 text-muted">{tx(step.bodyZh, step.bodyEn)}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}

function Street() {
  const { tx } = useSite();
  return (
    <section className="band">
      <Frame
        src="/images/street.jpg"
        alt={tx("林荫住宅街", "A leafy residential street")}
        className="h-full"
        priority
      />
      <div className="band-shade" />
      <p className="absolute bottom-8 left-5 max-w-md text-on-photo md:left-8 lg:left-12">
        <span className="eyebrow">{tx("大多伦多", "Greater Toronto")}</span>
        <span className="display mt-3 block text-4xl md:text-5xl">
          {tx("我们把街走慢一点。", "We walk the street slowly.")}
        </span>
      </p>
    </section>
  );
}

function Estate() {
  const { content, tx, open } = useSite();
  const [first, second, third, fourth, ...rest] = content.properties;
  return (
    <section id="estate" className="px-5 py-24 md:px-8 md:py-32 lg:px-12">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div>
          <p className="eyebrow text-muted">{tx("地产", "Real estate")}</p>
          <h2 className="display mt-4 text-4xl md:text-6xl">{tx("精选案例", "Selected studies")}</h2>
        </div>
        <p className="max-w-sm text-sm leading-6 text-muted">
          {tx(
            "不像密密麻麻的挂牌列表。每栋房子只讲它和地的关系。现在是示范，可在工作室换成你的成交。",
            "Not a wall of listings. Each house is told through its land. These are studies — replace them with your own sales in the studio.",
          )}
        </p>
      </div>
      <div className="mt-16 flex flex-col gap-20">
        {first ? <PropertyFeature item={first} onOpen={() => open("/property/$id", { id: first.id })} /> : null}
        <div className="grid gap-12 md:grid-cols-2">
          {second ? <PropertyCard item={second} onOpen={() => open("/property/$id", { id: second.id })} /> : null}
          {third ? <PropertyCard item={third} onOpen={() => open("/property/$id", { id: third.id })} /> : null}
        </div>
        {fourth ? (
          <PropertyFeature item={fourth} flip onOpen={() => open("/property/$id", { id: fourth.id })} />
        ) : null}
        {rest.map((item) => (
          <PropertyCard key={item.id} item={item} onOpen={() => open("/property/$id", { id: item.id })} />
        ))}
      </div>
    </section>
  );
}

function PropertyFeature({ item, flip, onOpen }: { item: Property; flip?: boolean; onOpen: () => void }) {
  const { lang, tx } = useSite();
  const title = lang === "zh" ? item.titleZh : item.titleEn;
  return (
    <article className="grid items-center gap-8 md:grid-cols-12">
      <button type="button" onClick={onOpen} className={`tap text-left md:col-span-7 ${flip ? "md:order-2" : ""}`}>
        <Frame
          src={item.image}
          alt={title}
          className="aspect-3/2"
          transitionName={`prop-${item.id}`}
          priority={item.id === "maple"}
        />
      </button>
      <div className={`md:col-span-4 ${flip ? "md:order-1 md:col-start-1" : "md:col-start-9"}`}>
        <p className="eyebrow text-muted">
          {tx(item.neighborhoodZh, item.neighborhoodEn)} · {statusLabel(item.status, tx)}
        </p>
        <h3 className="display mt-4 text-4xl md:text-5xl">{title}</h3>
        <p className="mt-4 text-sm leading-7 text-muted">{tx(item.summaryZh, item.summaryEn)}</p>
        <p className="mt-6 text-sm">{item.price}</p>
        <button type="button" onClick={onOpen} className="group mt-6 inline-flex min-h-11 items-center gap-2 text-sm">
          {tx("阅读这栋房子", "Read this house")}
          <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </button>
      </div>
    </article>
  );
}

function PropertyCard({ item, onOpen }: { item: Property; onOpen: () => void }) {
  const { lang, tx } = useSite();
  const title = lang === "zh" ? item.titleZh : item.titleEn;
  return (
    <article>
      <button type="button" onClick={onOpen} className="tap block w-full text-left">
        <Frame src={item.image} alt={title} className="aspect-3/2" transitionName={`prop-${item.id}`} />
        <p className="eyebrow mt-5 text-muted">
          {tx(item.neighborhoodZh, item.neighborhoodEn)} · {statusLabel(item.status, tx)}
        </p>
        <h3 className="display mt-3 text-3xl">{title}</h3>
        <p className="mt-3 text-sm leading-6 text-muted">{tx(item.summaryZh, item.summaryEn)}</p>
      </button>
    </article>
  );
}

function Landscape() {
  const { content, tx, open, lang } = useSite();
  const [first, ...rest] = content.gardens;
  return (
    <section id="garden" className="border-t border-line px-5 py-24 md:px-8 md:py-32 lg:px-12">
      <p className="eyebrow text-muted">{tx("景观", "Landscape")}</p>
      <h2 className="display mt-4 max-w-3xl text-4xl md:text-6xl">
        {tx("拖动，看同一块地的前后。", "Drag, and read the same ground twice.")}
      </h2>
      {first ? (
        <article className="mt-16">
          <Compare
            before={first.before}
            after={first.after}
            beforeLabel={first.mode === "viz" ? tx("效果图", "Drawing") : tx("改造前", "Before")}
            afterLabel={first.mode === "viz" ? tx("实景", "Built") : tx("改造后", "After")}
            alt={lang === "zh" ? first.titleZh : first.titleEn}
            transitionName={`garden-${first.id}`}
          />
          <div className="mt-8 grid gap-6 md:grid-cols-12">
            <div className="md:col-span-6">
              <p className="eyebrow text-muted">{tx(first.categoryZh, first.categoryEn)}</p>
              <h3 className="display mt-3 text-4xl">{lang === "zh" ? first.titleZh : first.titleEn}</h3>
            </div>
            <div className="md:col-span-5 md:col-start-8">
              <p className="text-sm leading-7 text-muted">{tx(first.summaryZh, first.summaryEn)}</p>
              <button
                type="button"
                onClick={() => open("/garden/$id", { id: first.id })}
                className="group mt-4 inline-flex min-h-11 items-center gap-2 text-sm"
              >
                {tx("看这件作品", "Open this work")}
                <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>
            </div>
          </div>
        </article>
      ) : null}
      <div className="mt-20 grid gap-12 md:grid-cols-2">
        {rest.map((item) => (
          <GardenCard key={item.id} item={item} onOpen={() => open("/garden/$id", { id: item.id })} />
        ))}
      </div>
    </section>
  );
}

function GardenCard({ item, onOpen }: { item: Garden; onOpen: () => void }) {
  const { lang, tx } = useSite();
  const title = lang === "zh" ? item.titleZh : item.titleEn;
  return (
    <article>
      <button type="button" onClick={onOpen} className="tap block w-full text-left">
        <Frame src={item.after} alt={title} className="aspect-3/2" transitionName={`garden-${item.id}`} />
        <p className="eyebrow mt-5 text-muted">{tx(item.categoryZh, item.categoryEn)}</p>
        <h3 className="display mt-3 text-3xl">{title}</h3>
        <p className="mt-3 text-sm leading-6 text-muted">{tx(item.summaryZh, item.summaryEn)}</p>
      </button>
    </article>
  );
}

const PROCESS = [
  {
    n: "01",
    titleZh: "现场勘测",
    titleEn: "Site walk",
    bodyZh: "记下阳光、排水、邻里视线，和必须留下的树。",
    bodyEn: "Sun, drainage, the neighbor’s view, and the trees that stay.",
  },
  {
    n: "02",
    titleZh: "概念",
    titleEn: "Concept",
    bodyZh: "一张清楚的平面，加上能沟通的效果，而不是堆砌风格名词。",
    bodyEn: "A clear plan, and a drawing you can decide from. Not a pile of style words.",
  },
  {
    n: "03",
    titleZh: "材料",
    titleEn: "Material",
    bodyZh: "石、木、青铜与植物，连同以后的维护一起选。",
    bodyEn: "Stone, wood, bronze, and plants — chosen with the upkeep in mind.",
  },
  {
    n: "04",
    titleZh: "落地",
    titleEn: "Delivery",
    bodyZh: "把图变成院子，并在需要时对准挂牌的节奏。",
    bodyEn: "Turn the drawing into a garden, and time it to a listing when that is the point.",
  },
] as const;

function Process() {
  const { tx } = useSite();
  return (
    <section className="border-t border-line px-5 py-24 md:px-8 md:py-32 lg:px-12">
      <p className="eyebrow text-muted">{tx("过程", "The process")}</p>
      <h2 className="display mt-4 text-4xl md:text-6xl">{tx("四步，不绕。", "Four steps. No theatre.")}</h2>
      <ol className="mt-16 grid gap-10 md:grid-cols-4">
        {PROCESS.map((step) => (
          <li key={step.n}>
            <p className="display text-5xl text-accent">{step.n}</p>
            <h3 className="mt-4 text-lg">{tx(step.titleZh, step.titleEn)}</h3>
            <p className="mt-3 text-sm leading-6 text-muted">{tx(step.bodyZh, step.bodyEn)}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}

function About() {
  const { content, lang, tx } = useSite();
  const about = (lang === "zh" ? content.aboutZh : content.aboutEn).split("\n").filter(Boolean);
  return (
    <section id="about" className="border-t border-line px-5 py-24 md:px-8 md:py-32 lg:px-12">
      <div className="grid items-start gap-12 md:grid-cols-12">
        <Frame
          src="/images/materials.jpg"
          alt={tx("石材、木材与植物样本", "Stone, timber, and plant samples")}
          className="aspect-3/2 md:col-span-5"
        />
        <div className="md:col-span-6 md:col-start-7">
          <p className="eyebrow text-muted">{tx(content.roleZh, content.roleEn)}</p>
          <h2 className="display mt-4 text-5xl md:text-6xl">{content.principal}</h2>
          <p className="mt-2 text-sm text-muted">{tx(content.cityZh, content.cityEn)}</p>
          <div className="mt-8 space-y-5 text-base leading-7">
            {about.map((paragraph) => (
              <p key={paragraph.slice(0, 24)}>{paragraph}</p>
            ))}
          </div>
          <ul className="mt-10 border-t border-line">
            {content.credentials.map((item) => (
              <li key={item.zh + item.en} className="border-b border-line py-4 text-sm">
                {tx(item.zh, item.en)}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function Neighborhoods() {
  const { content, lang, tx } = useSite();
  return (
    <section className="border-t border-line px-5 py-24 md:px-8 md:py-32 lg:px-12">
      <p className="eyebrow text-muted">{tx("社区", "Neighborhoods")}</p>
      <h2 className="display mt-4 text-4xl md:text-5xl">{tx("常走的地方", "Ground we know")}</h2>
      <ul className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {content.neighborhoods.map((item) => (
          <li key={item.id}>
            <Frame src={item.image} alt={lang === "zh" ? item.nameZh : item.nameEn} className="aspect-3/2" />
            <h3 className="display mt-4 text-2xl">{lang === "zh" ? item.nameZh : item.nameEn}</h3>
            <p className="mt-2 text-sm leading-6 text-muted">{tx(item.noteZh, item.noteEn)}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}

function InquireBand() {
  const { tx } = useSite();
  return (
    <section className="bg-inverse text-canvas">
      <div className="grid gap-8 px-5 py-24 md:grid-cols-12 md:px-8 md:py-28 lg:px-12">
        <h2 className="display text-5xl md:col-span-7 md:text-7xl">
          {tx("从一次散步开始。", "Begin with a walk.")}
        </h2>
        <div className="md:col-span-4 md:col-start-9 md:pt-3">
          <p className="text-sm leading-7">
            {tx(
              "房产买卖、庭院定制，或把两者放在一起评估。告诉我你现在站在哪一步。",
              "A purchase or a sale, a garden, or both read together. Tell me which step you are on.",
            )}
          </p>
          <Link
            to="/inquire"
            className="tap mt-8 inline-flex min-h-11 items-center bg-accent px-6 text-sm text-accent-fg"
          >
            {tx("预约咨询", "Inquire")}
          </Link>
        </div>
      </div>
    </section>
  );
}
