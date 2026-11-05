export type Lang = "zh" | "en";
export type Theme = "light" | "dark";

/** Bilingual text: `en` is the published market copy, `zh` is for the owner / Chinese toggle. */
export type T = { en: string; zh: string };

export type ServiceSlug =
  | "landscape-design"
  | "pools-and-water"
  | "outdoor-living"
  | "property-advisory";

export type Work = {
  id: string;
  image: string;
  alt: T;
  title: T;
  body: T;
  /** Longer, indexable project copy. Not edited in the studio field list. */
  detail: T;
  service: ServiceSlug;
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
      detail: {
        en: "The spa sits just above the main water and spills across a weir, so the sound stays low and constant. The lounge deck faces west, on the same stone as the coping, which makes the water's edge the edge of the seating. Planting stays low toward the sunset so it does not cut the evening light, and gets denser at the sides where neighbours are closer. Lighting is on the water and the stone, not a wash across the whole yard.",
        zh: "按摩池略高于主水面，水从堰口溢出，声音低而持续。朝西的躺椅平台与池沿同一石材，水面的边界就是座位的边界。西侧种植压低，不挡住傍晚的光；邻里一侧则更密。灯光落在水面和石材上，而不是把整个院子照亮。",
      },
      service: "pools-and-water",
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
      detail: {
        en: "The kitchen counter and the fire circle share one paving plane. The fire is sunken, so someone seated there is at eye level with the person standing at the grill. That is the layout: cooking stays inside the conversation instead of turning its back on it. Seating is close enough to the flame to matter on a cool evening, and far enough that smoke is not the centre of the meal.",
        zh: "厨房台面与火炉在同一铺装平面上。火炉下沉，坐下的人与站在烤炉边的人视线齐平。做饭因此留在谈话里，而不是背对客人。座位离火足够近，凉夜里用得上，又不会让烟成为正餐的中心。",
      },
      service: "outdoor-living",
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
      detail: {
        en: "The timber frame is sized as a room, not as decoration over a leftover patio. Posts set the corners of the kitchen and bar. By day the structure itself is the shade. At night the lights stay inside that footprint, so the yard beyond goes dark and the room reads clearly. The bar faces the seating, which keeps the person making drinks in the same space as everyone else.",
        zh: "木构的尺寸按一个房间来定，而不是给剩余平台加个装饰。柱子落在厨房与吧台的角上。白天，结构本身就是遮阳。夜里灯光只留在这个轮廓里，外面的院子暗下去，房间才清楚。吧台面向座位，调酒的人与客人都在同一空间里。",
      },
      service: "outdoor-living",
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
      detail: {
        en: "The pool is a simple round so the rock waterfall has a clear edge to meet. The putting green sits beside the water, not across a path, so play and swimming share one evening. Light is held to three places — the water, the stone and the green — rather than flooding the lot. From the house the waterfall is the night view; from the green, the water is the boundary of the game.",
        zh: "泳池用简单的圆形，让岩石瀑布有一条清楚的边可接。推杆果岭紧挨水面，中间不隔一条路，打球和游泳是同一个晚上。灯光只留在三处：水面、石头、果岭，而不是照亮整块地。从房子看出去，瀑布是夜景；从果岭看，水是球场的边界。",
      },
      service: "pools-and-water",
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
      detail: {
        en: "From above the sequence is one axis: drive, house, terrace, hot tub, pool. Nothing is stranded in a corner of leftover lawn. That is the test of a whole-property plan. A feature that only makes sense in a close-up is usually in the wrong place. Here each piece is visible in the arrival and usable from the rooms that face it.",
        zh: "从上往下看是一条轴线：车道、房子、露台、热水池、泳池。没有一件设施被丢在剩余草坪的角落里。这是整块地设计的检验标准。一件只在特写里成立的东西，通常放错了位置。这里每一部分从到达时就能看见，从朝向它的房间也能使用。",
      },
      service: "landscape-design",
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
      detail: {
        en: "The pillars and the layered beds do the same job: they slow the arrival and mark the door. Planting is in layers rather than a single hedge, so the entry has depth from the street. Lighting stays low, on the stone and the leaves, which makes the door readable at night without flooding the facade. The drive and the door are designed together, so the car and the person arrive at the same idea of the house.",
        zh: "石柱与层次种植做的是同一件事：放慢到达，并标出门口。种植是层次而不是一道绿篱，入口从街上看才有深度。灯光压低，落在石头和叶片上，夜里能认出门，又不会把立面照得发白。车道和门一起设计，车和人到达时看到的是同一个家。",
      },
      service: "landscape-design",
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
