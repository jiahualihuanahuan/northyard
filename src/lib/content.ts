export type Lang = "zh" | "en";
export type Theme = "light" | "dark";

/** Bilingual text: `en` is the published market copy, `zh` is for the owner / Chinese toggle. */
export type T = { en: string; zh: string };

export type Work = {
  id: string;
  image: string;
  alt: T;
  title: T;
  body: T;
};

export type SiteContent = {
  brandZh: string;
  brandEn: string;
  tagline: T;
  email: string;
  phone: string;
  city: T;
  hero: { image: string; alt: T; headline: T; body: T; primaryCta: T; secondaryCta: T };
  approach: { image: string; alt: T; headline: T; body: T };
  workSection: { headline: T };
  work: Work[];
  advisory: { enabled: boolean; image: string; alt: T; headline: T; body: T; cta: T };
  contactCta: { image: string; alt: T; headline: T; body: T; cta: T };
  contactPage: { image: string; intro: T };
};

export const CONTENT_KEY = "northyard-content-v4";
export const THEME_KEY = "northyard-theme";
export const LANG_KEY = "northyard-lang";
export const SITE_URL = "https://jennybu.ca";

const IMG = "/images/landscape";
export const IMAGES = {
  sunset: `${IMG}/sunset-pool-spillover-spa-lounge.webp`,
  firePit: `${IMG}/backyard-fire-pit-outdoor-kitchen.webp`,
  pergola: `${IMG}/outdoor-kitchen-timber-pergola.webp`,
  nightPool: `${IMG}/night-aerial-pool-waterfall-putting-green.webp`,
  estate: `${IMG}/aerial-estate-pool-hot-tub-driveway.webp`,
  entry: `${IMG}/front-entry-stone-pillars-lighting.webp`,
} as const;

const ALT = {
  sunset: {
    en: "A rectangular pool with a spillover spa and lounge deck at sunset",
    zh: "日落时的长方形泳池、溢流按摩池与躺椅平台",
  },
  firePit: {
    en: "A backyard terrace with a sunken fire pit and outdoor kitchen",
    zh: "带下沉火炉与户外厨房的后院露台",
  },
  pergola: {
    en: "An outdoor kitchen and bar beneath a timber pergola",
    zh: "木构廊架下的户外厨房与吧台",
  },
  nightPool: {
    en: "Night aerial view of a rounded pool, rock waterfall and putting green",
    zh: "夜晚俯瞰圆形泳池、岩石瀑布与推杆果岭",
  },
  estate: {
    en: "Aerial view of a home from driveway to terrace, hot tub and pool",
    zh: "俯瞰住宅，从车道到露台、热水池与泳池",
  },
  entry: {
    en: "A lit front entry with stone pillars and layered planting",
    zh: "石柱、层次种植与灯光点亮的前门入口",
  },
} satisfies Record<keyof typeof IMAGES, T>;

export const DEFAULT_CONTENT: SiteContent = {
  brandZh: "Jenny Bu",
  brandEn: "Jenny Bu",
  tagline: { en: "Landscape architecture and outdoor living", zh: "景观设计 · 户外生活空间" },
  email: "askjennybu@gmail.com",
  phone: "647-879-1206",
  city: { en: "Toronto · York Region", zh: "多伦多 · 约克区" },
  hero: {
    image: IMAGES.sunset,
    alt: ALT.sunset,
    headline: { en: "Landscapes designed to be lived in.", zh: "为生活而设计的景观。" },
    body: {
      en: "Landscape architecture and outdoor living for homes across Toronto and York Region: pools, terraces, outdoor kitchens and lit entries, designed as one.",
      zh: "服务多伦多与约克区的住宅：泳池、露台、户外厨房、入口灯光，作为一个整体来设计。",
    },
    primaryCta: { en: "Start a project", zh: "开始一个项目" },
    secondaryCta: { en: "View the work", zh: "查看作品" },
  },
  approach: {
    image: IMAGES.estate,
    alt: ALT.estate,
    headline: { en: "One property, one design.", zh: "一块地，一套设计。" },
    body: {
      en: "The drive, the entry, the terrace and the pool are a single sequence, not a list of features added one at a time. We plan how the land is walked, where people gather, and how it reads from the street to the back fence, then carry that through materials, planting and light.",
      zh: "车道、入口、露台、泳池是一条连贯的动线，而不是一件件堆上去的设施。我们先规划人怎么走、在哪里停留、从街口到后院怎样被看见，再把这个思路贯穿到材料、种植和灯光里。",
    },
  },
  workSection: { headline: { en: "Selected work: completed projects", zh: "精选作品 · 已完工项目" } },
  work: [
    {
      id: "sunset-pool",
      image: IMAGES.sunset,
      alt: ALT.sunset,
      title: { en: "The pool at golden hour.", zh: "黄昏泳池。" },
      body: {
        en: "A spillover spa feeds the main pool, and the lounge deck faces west to catch the last of the light. Stone, water and planting are composed for the hours the yard is used most.",
        zh: "溢流式按摩池连接主泳池，躺椅平台朝西，留住最后的阳光。石材、水面与植物，为最常使用的时段而布局。",
      },
    },
    {
      id: "fire-pit-yard",
      image: IMAGES.firePit,
      alt: ALT.firePit,
      title: { en: "Fire pit and outdoor kitchen.", zh: "火炉与户外厨房。" },
      body: {
        en: "Cooking and gathering share one terrace, so the host is never cut off from the conversation. A sunken fire circle anchors the evening.",
        zh: "烹饪区与聚会区在同一露台上，主人做饭时也不脱离人群；下沉式火炉成为夜晚的中心。",
      },
    },
    {
      id: "pergola-kitchen",
      image: IMAGES.pergola,
      alt: ALT.pergola,
      title: { en: "A kitchen under timber.", zh: "木构廊架下的厨房。" },
      body: {
        en: "A timber pergola frames the outdoor kitchen and bar, giving shade by day and a warm, defined room at night.",
        zh: "木质廊架围合出户外厨房与吧台，白天遮阳，夜晚成为一个温暖、有边界的“房间”。",
      },
    },
    {
      id: "waterfall-pool-night",
      image: IMAGES.nightPool,
      alt: ALT.nightPool,
      title: { en: "Water, stone and play after dark.", zh: "夜色中的水、石与游戏。" },
      body: {
        en: "A rounded pool with a rock waterfall sits beside a putting green. Lighting turns the whole yard into a night-time landscape.",
        zh: "圆形泳池配岩石瀑布，旁边是推杆果岭；灯光让整个后院在夜里成为另一种风景。",
      },
    },
    {
      id: "estate-aerial",
      image: IMAGES.estate,
      alt: ALT.estate,
      title: { en: "From the drive to the pool.", zh: "从车道到泳池。" },
      body: {
        en: "Seen from above, arrival, house, terrace, hot tub and pool read as one continuous plan.",
        zh: "从空中看，到达、住宅、露台、热水池和泳池是一张连续的平面。",
      },
    },
    {
      id: "front-entry",
      image: IMAGES.entry,
      alt: ALT.entry,
      title: { en: "A lit front entry.", zh: "点亮的前门入口。" },
      body: {
        en: "Stone pillars, layered planting and lighting turn the entry into the home's first impression after dark.",
        zh: "石柱、层次种植与灯光，让入口成为住宅在夜晚的第一印象。",
      },
    },
  ],
  advisory: {
    enabled: true,
    image: IMAGES.entry,
    alt: ALT.entry,
    headline: { en: "Buying or selling? See the land first.", zh: "买房或卖房？先看懂这块地。" },
    body: {
      en: "Before a purchase or a listing, a landscape eye can show what a lot could become and what its grounds are worth to the next owner.",
      zh: "在购买或挂牌前，用景观的眼光判断一块地的潜力，以及庭院对下一位业主的价值。",
    },
    cta: { en: "Ask about advisory", zh: "咨询地产顾问" },
  },
  contactCta: {
    image: IMAGES.nightPool,
    alt: ALT.nightPool,
    headline: { en: "Let's talk about your property.", zh: "聊聊你的房子。" },
    body: {
      en: "Tell us about your home and what you'd like the outdoors to do. We'll reply to arrange a first conversation.",
      zh: "告诉我们你的住宅情况，以及你希望户外空间带来什么，我们会回复并安排初次沟通。",
    },
    cta: { en: "Start a project", zh: "开始一个项目" },
  },
  contactPage: {
    image: IMAGES.pergola,
    intro: {
      en: "A few details help us prepare for the first conversation.",
      zh: "留下几项基本信息，方便我们为第一次沟通做准备。",
    },
  },
};

/**
 * Merge stored (studio-edited) content over the defaults. Anything missing or of the
 * wrong shape falls back to the default, so stale localStorage cannot break the site.
 */
export function sanitizeContent(input: unknown): SiteContent | null {
  if (!input || typeof input !== "object" || Array.isArray(input)) return null;
  return merge(DEFAULT_CONTENT, input) as SiteContent;
}

function merge(base: unknown, value: unknown): unknown {
  if (Array.isArray(base)) {
    if (!Array.isArray(value)) return base;
    const tmpl = base[0];
    return tmpl === undefined ? value : value.map((v, i) => merge(base[i] ?? tmpl, v));
  }
  if (base && typeof base === "object") {
    if (!value || typeof value !== "object" || Array.isArray(value)) return base;
    const out: Record<string, unknown> = {};
    for (const key of Object.keys(base)) {
      out[key] = merge((base as Record<string, unknown>)[key], (value as Record<string, unknown>)[key]);
    }
    return out;
  }
  return typeof value === typeof base ? value : base;
}

export const THEME_BOOT = `(function(){try{var t=localStorage.getItem("${THEME_KEY}");var l=localStorage.getItem("${LANG_KEY}");var theme=t==="light"?"light":"dark";var lang=l==="zh"?"zh":"en";var h=document.documentElement;h.setAttribute("data-theme",theme);h.setAttribute("data-lang",lang);h.lang=lang;var m=document.querySelector('meta[name="theme-color"]');if(m)m.setAttribute("content",theme==="dark"?"#12110f":"#f3efe7");}catch(e){}})();`;
