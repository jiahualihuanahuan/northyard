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

export const CONTENT_KEY = "northyard-content-v1";
export const INQUIRY_KEY = "northyard-inquiries-v1";
export const THEME_KEY = "northyard-theme";
export const LANG_KEY = "northyard-lang";

export const DEFAULT_CONTENT: SiteContent = {
  brandZh: "北庭",
  brandEn: "Northyard",
  taglineZh: "空间美学与资产价值",
  taglineEn: "Spatial aesthetics and property value",
  principal: "Jenny Bu",
  roleZh: "主理人",
  roleEn: "Principal",
  email: "",
  phone: "",
  cityZh: "多伦多 · 约克区",
  cityEn: "Toronto · York Region",
  aboutZh:
    "看房的时候，我们同时在看这块地以后的样子。朝向、树、侧院和门前那三米，往往比房间数更决定一栋房子值不值得留下来。\n\n北庭把地产经纪和景观设计放在同一次判断里。买入前，评估改造潜力；挂牌前，用克制的外立面和庭院整理第一眼；入住后，把户外做成真正会用的房间。",
  aboutEn:
    "A showing is also a reading of the land. Orientation, trees, the side yard, and the first three metres often matter more than the room count.\n\nNorthyard keeps real estate and landscape in the same judgment. Before a purchase, the potential. Before a listing, a quieter facade and garden. After you arrive, an outdoor room you will actually use.",
  credentials: [
    { zh: "地产顾问 · 大多伦多", en: "Real estate advisory · Greater Toronto" },
    { zh: "景观概念与庭院落地", en: "Landscape concept through to the garden" },
    { zh: "市区、约克区与湖岸", en: "City, York Region, and the shore" },
  ],
  properties: [
    {
      id: "maple",
      status: "sample",
      neighborhoodZh: "玫瑰谷",
      neighborhoodEn: "Rosedale",
      titleZh: "石基与枫",
      titleEn: "Stone, and the maple",
      price: "$3.4M",
      beds: "4",
      baths: "4",
      sqft: "3,450",
      summaryZh: "老枫压住了门廊的光线。这栋房子的安静，是树给的。",
      summaryEn: "An old maple holds the porch in shade. The quiet here belongs to the tree.",
      storyZh:
        "石基、红砖、黑色窗框，是这条街上熟悉的语法。真正稀缺的是那棵枫还在，而且长得健康。进门之前，视线已经被院子压低了一寸，房子因此不吵。",
      storyEn:
        "Stone base, brick, black sash — the grammar of this street. What is scarce is the maple, still here and still well. The garden lowers the eye before the door, and the house stays quiet.",
      readZh:
        "侧院还有一跨，早餐露台不必去占前庭。枫树留下。灯和台阶可以收一收，让门成为画面的中心，而不是被冬青挡住。",
      readEn:
        "The side yard can take a breakfast terrace without spending the front garden. Keep the maple. Edit the light and the steps so the door, not the shrubs, holds the picture.",
      image: "/images/prop-maple.jpg",
    },
    {
      id: "birch",
      status: "sample",
      neighborhoodZh: "林谷",
      neighborhoodEn: "Ravine",
      titleZh: "桦木院子",
      titleEn: "A court of birch",
      price: "$4.1M",
      beds: "4",
      baths: "3",
      sqft: "3,860",
      summaryZh: "玻璃拉开之后，房间是院子的延伸。湿石板把天光接进屋里。",
      summaryEn: "With the glass open, the room continues into the court. Wet stone brings the sky inside.",
      storyZh:
        "这不是一栋靠立面说话的房子。价值在室内和白桦之间那条没有门槛的线。雨天石板发暗，屋子反而更亮。买它，是买一种整天都在院子边上的生活。",
      storyEn:
        "This house does not sell itself from the street. The value is the line between the room and the birch, with no threshold in it. Rain darkens the stone and the interior gets brighter. You are buying a day spent at the edge of the garden.",
      readZh:
        "白桦是资产，不是装饰。排水顺着石板走，不要再铺一块会积水的草坪。石头留着，植物只补底层，别跟树争高度。",
      readEn:
        "The birch is an asset, not a decoration. Let water run with the stone — do not add a lawn that holds it. Keep the rock. Plant low, and do not compete with the trees.",
      image: "/images/prop-birch.jpg",
    },
    {
      id: "lake",
      status: "sample",
      neighborhoodZh: "湖岸",
      neighborhoodEn: "The Shore",
      titleZh: "向光的台阶",
      titleEn: "Steps toward the light",
      price: "$5.2M",
      beds: "4",
      baths: "4",
      sqft: "4,120",
      summaryZh: "露台比客厅更像这栋房子的中心。草比草坪更适合这里的风。",
      summaryEn: "The terrace is the real living room. Grasses belong here more than a lawn.",
      storyZh:
        "傍晚的光先落在石灰石上，再进室内。高草挡住了风，湖还在视线里。这种房子不需要更多房间，它需要你愿意把晚上过在外面。",
      storyEn:
        "Evening light hits the limestone before it enters the house. The grasses take the wind and leave the water in view. It does not need more rooms. It needs evenings spent outside.",
      readZh:
        "坡地不必修成平整草坪。高草是这栋房子的围墙，也是它的安静。台阶的比例已经对了，别再用栏杆把湖切碎。",
      readEn:
        "Do not grade this slope into a lawn. The grasses are the wall, and the quiet. The steps are already the right proportion — a railing would only cut up the lake.",
      image: "/images/prop-lake.jpg",
    },
    {
      id: "orchard",
      status: "sample",
      neighborhoodZh: "北镇",
      neighborhoodEn: "North lot",
      titleZh: "果园入夜",
      titleEn: "The orchard at dusk",
      price: "$2.6M",
      beds: "4",
      baths: "4",
      sqft: "3,640",
      summaryZh: "更大的地，更慢的晚上。价值在天空，和那排还年轻的树。",
      summaryEn: "A wider lot, a slower evening. The value is the sky, and a row of young trees.",
      storyZh:
        "约克区这种地块，房子往往盖得比院子诚实。这里反过来：黑屋顶和暖窗只是果园的背景。白天是树，天黑以后才是家。",
      storyEn:
        "On a York Region lot the house is often louder than the land. Here it is the other way: the black roof and the warm windows are a backdrop for the orchard. Day belongs to the trees. Night is when it becomes a house.",
      readZh:
        "前场可以再收一点，让门廊成为画面的中心。果树留下。夜灯只要暖，不要亮。车道别再加宽，草甸比更多铺装值钱。",
      readEn:
        "Pull the front field in slightly so the porch can hold the picture. Keep the fruit trees. Lamps should be warm, not bright. Do not widen the drive — the meadow is worth more than more paving.",
      image: "/images/prop-orchard.jpg",
    },
  ],
  gardens: [
    {
      id: "court",
      categoryZh: "现代后院",
      categoryEn: "Rear garden",
      titleZh: "留下那棵枫",
      titleEn: "Keep the maple",
      summaryZh: "同一栋房子，同一棵树。变的是人怎么走出来吃饭。",
      summaryEn: "Same house, same tree. What changed is how you walk out to dinner.",
      storyZh:
        "改造前是一块用旧的草坪、窄木台和一只塑料椅。枫树本来就在对的位置。我们留下它，把用餐移到石灰石上，用绿篱换掉木栅栏。边界还在，只是软了。",
      storyEn:
        "Before: a tired lawn, a narrow deck, a plastic chair. The maple was already in the right place. We kept it, moved dinner onto limestone, and traded the fence for hedge. The boundary is still there. It is simply softer.",
      before: "/images/court-before.jpg",
      after: "/images/court-after.jpg",
      mode: "before",
    },
    {
      id: "front",
      categoryZh: "极简前院",
      categoryEn: "Front court",
      titleZh: "三棵树的前院",
      titleEn: "Three trees, one door",
      summaryZh: "门不要被灌木吃掉。路径要直，材料要少。",
      summaryEn: "The door should not be eaten by shrubs. A straight path. Fewer materials.",
      storyZh:
        "客人下车的十秒里，裂开的混凝土和生锈的信箱会先把房子说旧。同一扇门，换成砾石、黄杨和三棵小树之后，地址变得清楚。这是挂牌前最值得做的三米。",
      storyEn:
        "In the ten seconds after someone steps out of the car, cracked concrete and a rusted box tell the house it is tired. The same door, with gravel, boxwood, and three small trees, makes the address clear. Those three metres are the ones worth doing before a listing.",
      before: "/images/front-before.jpg",
      after: "/images/front-after.jpg",
      mode: "before",
    },
    {
      id: "terrace",
      categoryZh: "户外起居",
      categoryEn: "Outdoor room",
      titleZh: "从效果到晚上",
      titleEn: "From drawing to dusk",
      summaryZh: "一边把尺度讲明白，一边把天黑之后的温度做对。",
      summaryEn: "One side explains the scale. The other gets the temperature of night right.",
      storyZh:
        "石灰石坐席、蕨和绣球。效果图用来跟主人沟通比例，实景用来证明灯是暖的、植物是活的。好看的院子如果不能在晚上坐下来，就还没有完成。",
      storyEn:
        "Limestone seating, ferns, hydrangea. The visualization is how we agree on proportion. The photograph is proof the light is warm and the plants are alive. A garden you cannot sit in after dark is not finished.",
      before: "/images/terrace-viz.jpg",
      after: "/images/terrace.jpg",
      mode: "viz",
    },
  ],
  neighborhoods: [
    {
      id: "rosedale",
      nameZh: "玫瑰谷",
      nameEn: "Rosedale",
      noteZh: "老树、石材、安静的前院",
      noteEn: "Old trees, stone, a quiet front garden",
      image: "/images/prop-maple.jpg",
    },
    {
      id: "ravine",
      nameZh: "林谷",
      nameEn: "Ravine",
      noteZh: "白桦、天光、室内外连成一片",
      noteEn: "Birch, sky, room and garden as one",
      image: "/images/prop-birch.jpg",
    },
    {
      id: "shore",
      nameZh: "湖岸",
      nameEn: "The Shore",
      noteZh: "风、高草、朝向水面的露台",
      noteEn: "Wind, grasses, a terrace toward the water",
      image: "/images/prop-lake.jpg",
    },
    {
      id: "north",
      nameZh: "北镇",
      nameEn: "North lot",
      noteZh: "更大的地块，果树和夜色",
      noteEn: "A wider lot, fruit trees, and night",
      image: "/images/prop-orchard.jpg",
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
            image: str(p.image, "/images/materials.jpg"),
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
            after: str(g.after, "/images/hero-garden.jpg"),
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
            image: str(n.image, "/images/street.jpg"),
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
    image: "/images/materials.jpg",
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
    after: "/images/hero-garden.jpg",
    mode: "before",
  };
}

export const THEME_BOOT = `(function(){try{var t=localStorage.getItem("${THEME_KEY}");var l=localStorage.getItem("${LANG_KEY}");var theme=t==="light"?"light":"dark";var lang=l==="zh"?"zh":"en";var h=document.documentElement;h.setAttribute("data-theme",theme);h.setAttribute("data-lang",lang);h.lang=lang;var m=document.querySelector('meta[name="theme-color"]');if(m)m.setAttribute("content",theme==="dark"?"#12110f":"#f3efe7");}catch(e){}})();`;
