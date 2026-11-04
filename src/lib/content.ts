export type Lang = "zh" | "en";
export type Theme = "light" | "dark";
export type ListingStatus = "sample" | "active" | "sold";
export type GardenMode = "before" | "viz";

export type Property = {
  id: string;
  status: ListingStatus;
  neighborhoodZh: string;
  neighborhoodEn: string;
  titleZh: string;
  titleEn: string;
  price: string;
  beds: string;
  baths: string;
  sqft: string;
  summaryZh: string;
  summaryEn: string;
  storyZh: string;
  storyEn: string;
  readZh: string;
  readEn: string;
  image: string;
};

export type Garden = {
  id: string;
  categoryZh: string;
  categoryEn: string;
  titleZh: string;
  titleEn: string;
  summaryZh: string;
  summaryEn: string;
  storyZh: string;
  storyEn: string;
  before: string;
  after: string;
  mode: GardenMode;
};

export type Neighborhood = {
  id: string;
  nameZh: string;
  nameEn: string;
  noteZh: string;
  noteEn: string;
  image: string;
};

export type Credential = { zh: string; en: string };

export type SiteContent = {
  brandZh: string;
  brandEn: string;
  taglineZh: string;
  taglineEn: string;
  principal: string;
  roleZh: string;
  roleEn: string;
  email: string;
  phone: string;
  cityZh: string;
  cityEn: string;
  aboutZh: string;
  aboutEn: string;
  credentials: Credential[];
  properties: Property[];
  gardens: Garden[];
  neighborhoods: Neighborhood[];
};

export type Inquiry = {
  id: string;
  at: string;
  intent: "estate" | "garden" | "both";
  name: string;
  contact: string;
  a1: string;
  a2: string;
  a3: string;
  note: string;
};

export const CONTENT_KEY = "northyard-content-v2";
export const INQUIRY_KEY = "northyard-inquiries-v1";
export const THEME_KEY = "northyard-theme";
export const LANG_KEY = "northyard-lang";

const IMG = "/images/landscape";

export const DEFAULT_CONTENT: SiteContent = {
  brandZh: "Jenny Bu",
  brandEn: "Jenny Bu",
  taglineZh: "景观设计 · 户外生活空间",
  taglineEn: "Landscape architecture and outdoor living",
  principal: "Jenny Bu",
  roleZh: "景观设计主理人",
  roleEn: "Principal, landscape design",
  email: "",
  phone: "",
  cityZh: "多伦多 · 约克区",
  cityEn: "Toronto · York Region",
  aboutZh:
    "一块地真正的价值，在它被走进、被坐下、被点亮的样子。泳池、露台、户外厨房、入口和种植，应该是一套连贯的设计，而不是一件件堆上去的东西。\n\nJenny Bu 的工作从景观开始：勘测、概念、材料与灯光，一直到落地。需要时，同一双眼睛也会在买房或挂牌前，帮你读懂一块地的潜力。",
  aboutEn:
    "The real value of a property is how its land is walked, sat in, and lit. Pools, terraces, outdoor kitchens, entries, and planting should read as one design — not a list of features added one at a time.\n\nJenny Bu's work starts with the landscape: survey, concept, materials, and lighting, through to the built garden. When it helps, the same eye can also read a lot's potential before a purchase or a listing.",
  credentials: [
    { zh: "景观概念、方案与落地", en: "Landscape concept, design, and build-out" },
    { zh: "泳池庭院、露台与户外厨房", en: "Pool courts, terraces, and outdoor kitchens" },
    { zh: "地产顾问 · 大多伦多（辅助服务）", en: "Real estate advisory · Greater Toronto (secondary)" },
  ],
  properties: [
    {
      id: "estate-grounds",
      status: "sample",
      neighborhoodZh: "示范",
      neighborhoodEn: "Study",
      titleZh: "从地块读一栋房子",
      titleEn: "Reading a house through its grounds",
      price: "",
      beds: "",
      baths: "",
      sqft: "",
      summaryZh: "车道、泳池、露台和绿篱的关系，决定这块地还能长成什么。",
      summaryEn: "How the drive, pool, terraces, and hedges relate decides what the land can still become.",
      storyZh:
        "买入之前，先看地：车道如何引向门口，泳池和露台占了哪里的阳光，绿篱留出了多少私密。这些比房间数更难改，也更值得提前看清。",
      storyEn:
        "Before a purchase, read the land: how the drive leads to the door, where the pool and terraces take the sun, how much privacy the hedges hold. These are harder to change than rooms, and worth seeing early.",
      readZh: "示范内容，可在工作室替换为你自己的房源。",
      readEn: "A sample study — replace it with your own listings in the studio.",
      image: `${IMG}/aerial-estate-pool-hot-tub-driveway.webp`,
    },
    {
      id: "first-glance",
      status: "sample",
      neighborhoodZh: "示范",
      neighborhoodEn: "Study",
      titleZh: "挂牌前的第一眼",
      titleEn: "The first glance before a listing",
      price: "",
      beds: "",
      baths: "",
      sqft: "",
      summaryZh: "入口、台阶和灯光，是买家记住一栋房子的第一个画面。",
      summaryEn: "The entry, the steps, and the light are the first picture a buyer keeps.",
      storyZh:
        "挂牌之前，把入口整理清楚：石柱和台阶有秩序，种植池收住边界，灯光把路径和树轻轻点亮。",
      storyEn:
        "Before a listing, make the entry clear: ordered pillars and steps, planters that hold the edges, and light that gently picks out the path and the trees.",
      readZh: "示范内容，可在工作室替换为你自己的房源。",
      readEn: "A sample study — replace it with your own listings in the studio.",
      image: `${IMG}/front-entry-stone-pillars-lighting.webp`,
    },
  ],
  gardens: [
    {
      id: "sunset-pool",
      categoryZh: "泳池庭院",
      categoryEn: "Pool court",
      titleZh: "日落时的泳池",
      titleEn: "The pool at sunset",
      summaryZh: "带溢流水疗池的长方形泳池、躺椅、户外起居区和观赏草。",
      summaryEn: "A lit rectangular pool with a spillover spa, loungers, an outdoor lounge, and ornamental grasses.",
      storyZh:
        "泳池、水疗池和起居区沿着同一条轴线展开，从屋内一路延伸到花园。观赏草软化了铺装的边缘，灯光让水面在天黑后成为主角。",
      storyEn:
        "Pool, spa, and lounge sit on one line that carries the eye from the house into the garden. Ornamental grasses soften the paving, and lighting lets the water take over after dark.",
      before: "",
      after: `${IMG}/sunset-pool-spillover-spa-lounge.webp`,
      mode: "viz",
    },
    {
      id: "fire-pit-yard",
      categoryZh: "后院",
      categoryEn: "Rear garden",
      titleZh: "火塘与户外厨房",
      titleEn: "Fire pit and outdoor kitchen",
      summaryZh: "火塘、红色坐垫藤椅、石砌烧烤厨房、深色廊架、汀步与多年生花境。",
      summaryEn: "A fire pit with red-cushioned wicker seating, a stone BBQ kitchen, a dark pergola, stepping stones, lawn, and perennial beds.",
      storyZh:
        "火塘把人聚在一起，石砌厨房和廊架定义了用餐的一侧。汀步穿过草坪，多年生花境把整个后院的边界收得柔和。",
      storyEn:
        "The fire pit gathers people; the stone kitchen and pergola define the dining side. Stepping stones cross the lawn, and perennial beds soften the edges of the whole yard.",
      before: "",
      after: `${IMG}/backyard-fire-pit-outdoor-kitchen.webp`,
      mode: "viz",
    },
    {
      id: "pergola-kitchen",
      categoryZh: "户外厨房",
      categoryEn: "Outdoor kitchen",
      titleZh: "廊架下的吧台",
      titleEn: "A bar under the pergola",
      summaryZh: "木结构廊架下的户外厨房，花岗岩吧台、高脚凳、灯笼和绣球花池。",
      summaryEn: "An outdoor kitchen under a timber pergola, with a granite bar, stools, lanterns, and a hydrangea planter.",
      storyZh:
        "廊架给厨房一个屋顶，也给夜晚一个尺度。花岗岩吧台让做饭的人和坐着的人面对面，绣球和灯笼让这里像一个真正的房间。",
      storyEn:
        "The pergola gives the kitchen a roof and the evening a scale. The granite bar puts the cook and the guests face to face; hydrangeas and lanterns make it feel like a real room.",
      before: "",
      after: `${IMG}/outdoor-kitchen-timber-pergola.webp`,
      mode: "viz",
    },
    {
      id: "waterfall-pool-night",
      categoryZh: "夜景",
      categoryEn: "Night landscape",
      titleZh: "岩石瀑布与圆形泳池",
      titleEn: "Round pool and rock waterfall",
      summaryZh: "夜间鸟瞰：圆形泳池与岩石瀑布、带灯光的弧形铺装露台、推杆果岭和红色遮阳伞。",
      summaryEn: "A night aerial: a round pool with a rock waterfall, curved lit paver patios, a putting green, and red umbrellas.",
      storyZh:
        "弧形的露台围绕圆形泳池展开，岩石瀑布成为视觉焦点。夜间照明把各个区域串成一条可以走的路线。",
      storyEn:
        "Curved patios wrap the round pool, with the rock waterfall as the focal point. Night lighting ties each area into a route you can walk.",
      before: "",
      after: `${IMG}/night-aerial-pool-waterfall-putting-green.webp`,
      mode: "viz",
    },
    {
      id: "estate-aerial",
      categoryZh: "整体规划",
      categoryEn: "Master plan",
      titleZh: "从车道到泳池",
      titleEn: "From the drive to the pool",
      summaryZh: "白天鸟瞰：长方形泳池与按摩池、铺装露台、带花坛的弧形车道和绿篱。",
      summaryEn: "A daytime aerial: a rectangular pool and hot tub, paver patios, a curved driveway with a flower bed, and hedges.",
      storyZh:
        "整块地作为一个整体来规划：弧形车道和花坛安排到达，绿篱划出私密，泳池和露台占据后院最好的阳光。",
      storyEn:
        "The whole property planned as one: a curved drive and flower bed shape the arrival, hedges set the privacy, and the pool and patios take the best sun in the rear.",
      before: "",
      after: `${IMG}/aerial-estate-pool-hot-tub-driveway.webp`,
      mode: "viz",
    },
    {
      id: "front-entry",
      categoryZh: "入口",
      categoryEn: "Front entry",
      titleZh: "被点亮的入口",
      titleEn: "A lit front entry",
      summaryZh: "黄昏的入口：石柱与台阶、抬高种植池、上照的树和铺装步道。",
      summaryEn: "An entry at golden hour: stone pillars and steps, raised planters, uplit trees, and a paver walkway.",
      storyZh:
        "入口是一栋房子的第一句话。石柱和台阶给出秩序，种植池收住边界，上照的树让到家的路在天黑后依然清楚。",
      storyEn:
        "The entry is a house's first sentence. Pillars and steps give it order, planters hold the edges, and uplit trees keep the way home clear after dark.",
      before: "",
      after: `${IMG}/front-entry-stone-pillars-lighting.webp`,
      mode: "viz",
    },
  ],
  neighborhoods: [
    {
      id: "toronto",
      nameZh: "多伦多",
      nameEn: "Toronto",
      noteZh: "城市后院、露台与入口",
      noteEn: "City rear gardens, terraces, and entries",
      image: `${IMG}/backyard-fire-pit-outdoor-kitchen.webp`,
    },
    {
      id: "york",
      nameZh: "约克区",
      nameEn: "York Region",
      noteZh: "更大的地块、泳池庭院与整体规划",
      noteEn: "Larger lots, pool courts, and master plans",
      image: `${IMG}/aerial-estate-pool-hot-tub-driveway.webp`,
    },
  ],
};

function str(v: unknown, fallback = ""): string {
  return typeof v === "string" ? v : fallback;
}

function asStatus(v: unknown): ListingStatus {
  return v === "active" || v === "sold" || v === "sample" ? v : "sample";
}

function asMode(v: unknown): GardenMode {
  return v === "viz" ? "viz" : "before";
}

export function sanitizeContent(input: unknown): SiteContent | null {
  if (!input || typeof input !== "object") return null;
  const o = input as Partial<SiteContent>;
  if (typeof o.brandZh !== "string" && typeof o.brandEn !== "string") return null;
  const base = DEFAULT_CONTENT;
  const properties = Array.isArray(o.properties)
    ? o.properties
        .map((item, i) => {
          if (!item || typeof item !== "object") return null;
          const p = item as Partial<Property>;
          const prop: Property = {
            id: str(p.id, `p-${i}`),
            status: asStatus(p.status),
            neighborhoodZh: str(p.neighborhoodZh),
            neighborhoodEn: str(p.neighborhoodEn),
            titleZh: str(p.titleZh, "未命名"),
            titleEn: str(p.titleEn, "Untitled"),
            price: str(p.price),
            beds: str(p.beds),
            baths: str(p.baths),
            sqft: str(p.sqft),
            summaryZh: str(p.summaryZh),
            summaryEn: str(p.summaryEn),
            storyZh: str(p.storyZh),
            storyEn: str(p.storyEn),
            readZh: str(p.readZh),
            readEn: str(p.readEn),
            image: str(p.image, "/images/landscape/aerial-estate-pool-hot-tub-driveway.webp"),
          };
          return prop;
        })
        .filter((p): p is Property => Boolean(p))
    : base.properties;
  const gardens = Array.isArray(o.gardens)
    ? o.gardens
        .map((item, i) => {
          if (!item || typeof item !== "object") return null;
          const g = item as Partial<Garden>;
          const garden: Garden = {
            id: str(g.id, `g-${i}`),
            categoryZh: str(g.categoryZh),
            categoryEn: str(g.categoryEn),
            titleZh: str(g.titleZh, "未命名"),
            titleEn: str(g.titleEn, "Untitled"),
            summaryZh: str(g.summaryZh),
            summaryEn: str(g.summaryEn),
            storyZh: str(g.storyZh),
            storyEn: str(g.storyEn),
            before: str(g.before),
            after: str(g.after, "/images/landscape/sunset-pool-spillover-spa-lounge.webp"),
            mode: asMode(g.mode),
          };
          return garden;
        })
        .filter((g): g is Garden => Boolean(g))
    : base.gardens;
  const neighborhoods = Array.isArray(o.neighborhoods)
    ? o.neighborhoods
        .map((item, i) => {
          if (!item || typeof item !== "object") return null;
          const n = item as Partial<Neighborhood>;
          const hood: Neighborhood = {
            id: str(n.id, `n-${i}`),
            nameZh: str(n.nameZh),
            nameEn: str(n.nameEn),
            noteZh: str(n.noteZh),
            noteEn: str(n.noteEn),
            image: str(n.image, "/images/landscape/backyard-fire-pit-outdoor-kitchen.webp"),
          };
          return hood;
        })
        .filter((n): n is Neighborhood => Boolean(n))
    : base.neighborhoods;
  const credentials = Array.isArray(o.credentials)
    ? o.credentials
        .map((item) => {
          if (!item || typeof item !== "object") return null;
          const c = item as Partial<Credential>;
          return { zh: str(c.zh), en: str(c.en) };
        })
        .filter((c): c is Credential => Boolean(c))
    : base.credentials;

  return {
    brandZh: str(o.brandZh, base.brandZh),
    brandEn: str(o.brandEn, base.brandEn),
    taglineZh: str(o.taglineZh, base.taglineZh),
    taglineEn: str(o.taglineEn, base.taglineEn),
    principal: str(o.principal, base.principal),
    roleZh: str(o.roleZh, base.roleZh),
    roleEn: str(o.roleEn, base.roleEn),
    email: str(o.email),
    phone: str(o.phone),
    cityZh: str(o.cityZh, base.cityZh),
    cityEn: str(o.cityEn, base.cityEn),
    aboutZh: str(o.aboutZh, base.aboutZh),
    aboutEn: str(o.aboutEn, base.aboutEn),
    credentials,
    properties,
    gardens,
    neighborhoods,
  };
}

export function blankProperty(): Property {
  return {
    id: `p-${Date.now()}`,
    status: "sample",
    neighborhoodZh: "",
    neighborhoodEn: "",
    titleZh: "新案例",
    titleEn: "New study",
    price: "",
    beds: "",
    baths: "",
    sqft: "",
    summaryZh: "",
    summaryEn: "",
    storyZh: "",
    storyEn: "",
    readZh: "",
    readEn: "",
    image: "/images/landscape/aerial-estate-pool-hot-tub-driveway.webp",
  };
}

export function blankGarden(): Garden {
  return {
    id: `g-${Date.now()}`,
    categoryZh: "",
    categoryEn: "",
    titleZh: "新作品",
    titleEn: "New work",
    summaryZh: "",
    summaryEn: "",
    storyZh: "",
    storyEn: "",
    before: "",
    after: "/images/landscape/sunset-pool-spillover-spa-lounge.webp",
    mode: "before",
  };
}

export const THEME_BOOT = `(function(){try{var t=localStorage.getItem("${THEME_KEY}");var l=localStorage.getItem("${LANG_KEY}");var theme=t==="light"?"light":"dark";var lang=l==="zh"?"zh":"en";var h=document.documentElement;h.setAttribute("data-theme",theme);h.setAttribute("data-lang",lang);h.lang=lang;var m=document.querySelector('meta[name="theme-color"]');if(m)m.setAttribute("content",theme==="dark"?"#12110f":"#f3efe7");}catch(e){}})();`;
