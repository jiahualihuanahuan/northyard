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
      <Landscape />
      <Street />
      <Process />
      <About />
      <Synergy />
      <Estate />
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
        href="#garden"
        className="hero-panel"
        data-panel="estate"
        onMouseEnter={() => setHot("estate")}
        onMouseLeave={() => setHot(null)}
        onFocus={() => setHot("estate")}
        onBlur={() => setHot(null)}
      >
        <img
          className="hero-photo"
          src="/images/landscape/sunset-pool-spillover-spa-lounge.webp"
          alt={tx(
            "日落时的砖砌住宅，亮灯的长方形泳池与溢流水疗池、躺椅、户外起居区和观赏草",
            "A brick house at sunset with a lit rectangular pool and spillover spa, loungers, an outdoor lounge, and ornamental grasses",
          )}
          width={1699}
          height={926}
          fetchPriority="high"
        />
        <div className="hero-shade" />
        <div className="hero-copy">
          <p className="eyebrow">{tx("景观设计", "Landscape architecture")}</p>
          <h1 className="display mt-4 text-5xl md:text-6xl lg:text-7xl">
            {tx("把户外，", "Outdoor rooms,")}
            <br />
            {tx("做成会用的房间。", "designed to be lived in.")}
          </h1>
          <p className="mt-5 max-w-sm text-sm leading-6 text-on-photo/80">
            {tx(
              "泳池庭院、露台、户外厨房、入口与灯光——从概念到落地。",
              "Pool courts, terraces, outdoor kitchens, entries, and lighting — from concept to build.",
            )}
          </p>
        </div>
      </a>
      <a
        href="#work"
        className="hero-panel"
        data-panel="garden"
        onMouseEnter={() => setHot("garden")}
        onMouseLeave={() => setHot(null)}
        onFocus={() => setHot("garden")}
        onBlur={() => setHot(null)}
      >
        <img
          className="hero-photo"
          src="/images/landscape/front-entry-stone-pillars-lighting.webp"
          alt={tx(
            "黄昏时被点亮的入口：石柱与石阶、抬高种植池、上照的树和铺装步道",
            "A lit front entry at golden hour with stone pillars and steps, raised planters, uplit trees, and a paver walkway",
          )}
          width={1617}
          height={972}
        />
        <div className="hero-shade" />
        <div className="hero-copy">
          <p className="eyebrow">{tx("作品", "Selected work")}</p>
          <p className="display mt-4 text-5xl md:text-6xl lg:text-7xl">
            {tx("从入口，", "From the entry")}
            <br />
            {tx("到后院。", "to the back garden.")}
          </p>
          <p className="mt-5 max-w-sm text-sm leading-6 text-on-photo/80">
            {tx(
              "石材、种植与灯光，作为一套完整的设计。",
              "Stone, planting, and light, designed as one.",
            )}
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
        {tx(
          "景观不是装饰，是这块地的结构。",
          "Landscape is not decoration. It is the structure of the land.",
        )}
      </p>
      <p className="text-base leading-7 text-muted md:col-span-4 md:col-start-9 md:pt-4">
        {tx(
          "阳光、坡度、水和视线决定了一个院子能成为什么。我们从这些开始，把泳池、露台、厨房、入口和种植放进同一个设计里。",
          "Sun, grade, water, and sightlines decide what a garden can become. We start there, and bring pools, terraces, kitchens, entries, and planting into one design.",
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
    bodyEn:
      "Grade, orientation, trees, and the side yard decide whether another outdoor room is possible. None of that is on the listing sheet.",
  },
  {
    n: "02",
    titleZh: "挂牌前",
    titleEn: "Before you list",
    bodyZh:
      "门前三米与庭院的第一眼，往往比重新刷一遍厨房更影响出价。我们整理外立面和院子，不做舞台布景。",
    bodyEn:
      "The first three metres change offers more often than another kitchen refresh. We edit the facade and the yard. We do not build a set.",
  },
  {
    n: "03",
    titleZh: "安家后",
    titleEn: "After you arrive",
    bodyZh: "安家之后，回到主业：把院子设计成真正会用的户外房间。",
    bodyEn:
      "Once you arrive, back to the core work: a garden designed as an outdoor room you will use.",
  },
] as const;

function Synergy() {
  const { tx } = useSite();
  return (
    <section id="synergy" className="border-t border-line px-5 py-24 md:px-8 md:py-32 lg:px-12">
      <p className="eyebrow text-muted">{tx("地产顾问", "Also: real estate")}</p>
      <h2 className="display mt-4 max-w-3xl text-3xl md:text-4xl">
        {tx("用景观的眼光看房子。", "A landscape eye on buying and selling.")}
      </h2>
      <ol className="mt-16 grid gap-12 md:grid-cols-3">
        {STEPS.map((step) => (
          <li key={step.n} className="border-t border-line pt-6">
            <p className="eyebrow text-accent">{step.n}</p>
            <h3 className="display mt-4 text-2xl">{tx(step.titleZh, step.titleEn)}</h3>
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
        src="/images/landscape/night-aerial-pool-waterfall-putting-green.webp"
        alt={tx(
          "夜间鸟瞰：圆形泳池与岩石瀑布、带灯光的弧形铺装露台、推杆果岭和红色遮阳伞",
          "Night aerial view of a round pool with a rock waterfall, curved lit paver patios, a putting green, and red umbrellas",
        )}
        className="h-full"
        priority
      />
      <div className="band-shade" />
      <p className="absolute bottom-8 left-5 max-w-md text-on-photo md:left-8 lg:left-12">
        <span className="eyebrow">{tx("夜间景观", "After dark")}</span>
        <span className="display mt-3 block text-4xl md:text-5xl">
          {tx("天黑之后，院子才完整。", "A garden is finished when it works after dark.")}
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
          <h2 className="display mt-4 text-3xl md:text-4xl">
            {tx("房产示范", "Property studies")}
          </h2>
        </div>
        <p className="max-w-sm text-sm leading-6 text-muted">
          {tx(
            "地产是辅助服务：每栋房子都从它的院子和地块来读。现在是示范，可在工作室替换。",
            "A secondary service: each house is read through its grounds and garden. These are samples — replace them in the studio.",
          )}
        </p>
      </div>
      <div className="mt-16 flex flex-col gap-20">
        {first ? (
          <PropertyFeature item={first} onOpen={() => open("/property/$id", { id: first.id })} />
        ) : null}
        <div className="grid gap-12 md:grid-cols-2">
          {second ? (
            <PropertyCard item={second} onOpen={() => open("/property/$id", { id: second.id })} />
          ) : null}
          {third ? (
            <PropertyCard item={third} onOpen={() => open("/property/$id", { id: third.id })} />
          ) : null}
        </div>
        {fourth ? (
          <PropertyFeature
            item={fourth}
            flip
            onOpen={() => open("/property/$id", { id: fourth.id })}
          />
        ) : null}
        {rest.map((item) => (
          <PropertyCard
            key={item.id}
            item={item}
            onOpen={() => open("/property/$id", { id: item.id })}
          />
        ))}
      </div>
    </section>
  );
}

function PropertyFeature({
  item,
  flip,
  onOpen,
}: {
  item: Property;
  flip?: boolean;
  onOpen: () => void;
}) {
  const { lang, tx } = useSite();
  const title = lang === "zh" ? item.titleZh : item.titleEn;
  return (
    <article className="grid items-center gap-8 md:grid-cols-12">
      <button
        type="button"
        onClick={onOpen}
        className={`tap text-left md:col-span-7 ${flip ? "md:order-2" : ""}`}
      >
        <Frame
          src={item.image}
          alt={tx(item.summaryZh, item.summaryEn) || title}
          className="aspect-3/2"
          transitionName={`prop-${item.id}`}
        />
      </button>
      <div className={`md:col-span-4 ${flip ? "md:order-1 md:col-start-1" : "md:col-start-9"}`}>
        <p className="eyebrow text-muted">
          {tx(item.neighborhoodZh, item.neighborhoodEn)} · {statusLabel(item.status, tx)}
        </p>
        <h3 className="display mt-4 text-4xl md:text-5xl">{title}</h3>
        <p className="mt-4 text-sm leading-7 text-muted">{tx(item.summaryZh, item.summaryEn)}</p>
        <p className="mt-6 text-sm">{item.price}</p>
        <button
          type="button"
          onClick={onOpen}
          className="group mt-6 inline-flex min-h-11 items-center gap-2 text-sm"
        >
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
        <Frame
          src={item.image}
          alt={tx(item.summaryZh, item.summaryEn) || title}
          className="aspect-3/2"
          transitionName={`prop-${item.id}`}
        />
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
      <p id="work" className="eyebrow text-muted">
        {tx("景观作品", "Landscape work")}
      </p>
      <h2 className="display mt-4 max-w-3xl text-4xl md:text-6xl">
        {tx("泳池、露台、厨房与入口。", "Pools, terraces, kitchens, and entries.")}
      </h2>
      {first ? (
        <article className="mt-16">
          {first.before ? (
            <Compare
              before={first.before}
              after={first.after}
              beforeLabel={first.mode === "viz" ? tx("效果图", "Drawing") : tx("改造前", "Before")}
              afterLabel={first.mode === "viz" ? tx("实景", "Built") : tx("改造后", "After")}
              alt={lang === "zh" ? first.titleZh : first.titleEn}
              transitionName={`garden-${first.id}`}
            />
          ) : (
            <Frame
              src={first.after}
              alt={tx(first.summaryZh, first.summaryEn)}
              className="aspect-3/2"
              transitionName={`garden-${first.id}`}
            />
          )}
          <div className="mt-8 grid gap-6 md:grid-cols-12">
            <div className="md:col-span-6">
              <p className="eyebrow text-muted">{tx(first.categoryZh, first.categoryEn)}</p>
              <h3 className="display mt-3 text-4xl">
                {lang === "zh" ? first.titleZh : first.titleEn}
              </h3>
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
          <GardenCard
            key={item.id}
            item={item}
            onOpen={() => open("/garden/$id", { id: item.id })}
          />
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
        <Frame
          src={item.after}
          alt={tx(item.summaryZh, item.summaryEn) || title}
          className="aspect-3/2"
          transitionName={`garden-${item.id}`}
        />
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
      <h2 className="display mt-4 text-4xl md:text-6xl">
        {tx("四步，不绕。", "Four steps. No theatre.")}
      </h2>
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
          src="/images/landscape/outdoor-kitchen-timber-pergola.webp"
          alt={tx(
            "木结构廊架下的户外厨房，花岗岩吧台、高脚凳、灯笼和绣球花池",
            "An outdoor kitchen under a timber pergola with a granite bar, stools, lanterns, and a hydrangea planter",
          )}
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
      <p className="eyebrow text-muted">{tx("服务地区", "Where we work")}</p>
      <h2 className="display mt-4 text-4xl md:text-5xl">{tx("大多伦多地区", "Greater Toronto")}</h2>
      <ul className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {content.neighborhoods.map((item) => (
          <li key={item.id}>
            <Frame src={item.image} alt={tx(item.noteZh, item.noteEn)} className="aspect-3/2" />
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
          {tx("从一次现场勘测开始。", "Begin with a site walk.")}
        </h2>
        <div className="md:col-span-4 md:col-start-9 md:pt-3">
          <p className="text-sm leading-7">
            {tx(
              "泳池庭院、后院、户外厨房或入口——也可以在买卖房产时一起评估。告诉我你的院子。",
              "A pool court, a back garden, an outdoor kitchen, or an entry — or a landscape read alongside a purchase or sale. Tell me about your garden.",
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
