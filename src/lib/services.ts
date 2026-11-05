import { IMAGES, type ServiceSlug, type T } from "@/lib/content";

export type Faq = { q: T; a: T };

export type ServicePage = {
  slug: ServiceSlug;
  nav: T;
  title: string;
  description: string;
  eyebrow: T;
  headline: T;
  lead: T;
  paragraphs: T[];
  image: string;
  alt: T;
  contactType: "pool" | "terrace" | "entry" | "full" | "advisory";
  faqs: Faq[];
};

export const AREAS =
  "Toronto, North York, Markham, Richmond Hill, Vaughan, Aurora and Thornhill";

export const SERVICES: ServicePage[] = [
  {
    slug: "landscape-design",
    nav: { en: "Landscape design", zh: "景观设计" },
    title: "Landscape Design in Toronto & York Region — Jenny Bu",
    description:
      "Whole-property landscape design for homes in Toronto, Markham, Richmond Hill, Vaughan and Aurora. Driveway, entry, terrace and garden planned as one sequence.",
    eyebrow: { en: "Landscape design", zh: "景观设计" },
    headline: { en: "The whole property, as one plan.", zh: "整块地，一张平面。" },
    lead: {
      en: "Landscape design for houses in Toronto and York Region starts with how the land is arrived at, walked and used — from the street to the back fence. Features come after that, not before.",
      zh: "多伦多与约克区的住宅景观，先看人怎么到达、怎么走、怎么用，从街口到后院围栏。设施排在这之后，而不是之前。",
    },
    paragraphs: [
      {
        en: "A first visit is a read of the lot: sun, grade, the neighbours, where the car stops, and where people actually stand in the evening. A plan that ignores any of those will look finished in a drawing and fail in use.",
        zh: "第一次到场是在读这块地：阳光、坡度、邻居、车停在哪里、傍晚人真正站在哪里。忽略其中任何一项的平面，图上看着完整，用起来会失败。",
      },
      {
        en: "Stone, timber, planting and light then hold that sequence. They are not a catalogue of upgrades. A front hedge, a side path and a rear terrace should be obvious as one property from the sidewalk.",
        zh: "石材、木材、种植和灯光是用来守住这条动线的，不是一份升级清单。前院绿篱、侧面小路和后院露台，从人行道上看就应该是同一栋房子。",
      },
      {
        en: "Typical scope is the full grounds: drive and entry, side yards, rear terrace, planting and lighting. Pools, outdoor kitchens and fire pits are drawn into that plan when they belong there. The finished projects on this site are the proof, not a mood board.",
        zh: "通常的范围是整块庭院：车道与入口、侧院、后院露台、种植与灯光。泳池、户外厨房和火炉在合适的时候画进同一张平面。本站的完工项目是结果，不是情绪板。",
      },
    ],
    image: IMAGES.estate,
    alt: {
      en: "Aerial view of a home from driveway to terrace, hot tub and pool",
      zh: "俯瞰住宅，从车道到露台、热水池与泳池",
    },
    contactType: "full",
    faqs: [
      {
        q: { en: "Do I need a redesign of the entire yard?", zh: "一定要重做整个院子吗？" },
        a: {
          en: "Not always. A smaller piece — an entry, a terrace — still starts from how the whole lot works, so the next project does not fight the last one.",
          zh: "不一定。只做入口或露台也可以，但仍然要从整块地怎么用开始，这样下一次不会和上一次对着干。",
        },
      },
      {
        q: { en: "Which neighbourhoods do you take?", zh: "接哪些地区？" },
        a: {
          en: `Homes in ${AREAS}, and nearby streets in Toronto and York Region.`,
          zh: "多伦多与约克区的住宅，包括北约克、万锦、列治文山、旺市、奥罗拉、索恩希尔及周边。",
        },
      },
    ],
  },
  {
    slug: "pools-and-water",
    nav: { en: "Pools & water", zh: "泳池与水景" },
    title: "Pool & Spa Landscape Design — Toronto & York Region",
    description:
      "Pool, spa and water-feature design for Toronto and York Region homes. Spillover spas, rock waterfalls and night lighting, planned with the terrace around them.",
    eyebrow: { en: "Pools and water", zh: "泳池与水景" },
    headline: { en: "A pool that belongs to the yard.", zh: "属于这个院子的泳池。" },
    lead: {
      en: "Pool and spa design in Toronto and York Region is a landscape problem before it is a product problem. The shape of the water has to meet the terrace, the view from the house, and the hours the yard is actually used.",
      zh: "在多伦多与约克区做泳池和按摩池，先是景观问题，然后才是产品问题。水面的形状要接得上露台、从房子看出去的景，以及院子真正被使用的时段。",
    },
    paragraphs: [
      {
        en: "A spillover spa, a coping line and a lounge deck are one edge, not three purchases. If the chairs face the wrong way, or the water noise is a jet instead of a low weir, the pool will be photographed and then avoided.",
        zh: "溢流按摩池、池沿和躺椅平台是同一条边，不是三笔采购。椅子朝向不对，或者水声是喷射而不是低堰，泳池会被拍下来，然后没人去用。",
      },
      {
        en: "Night is half the season here. Lighting belongs on the water and the stone, in a few clear pools of light. Washing the whole lot flattens the waterfall, the green and the house into one glare.",
        zh: "在这里，夜晚占季节的一半。灯光应落在水面和石材上，几处清楚的光。把整块地照亮，瀑布、果岭和房子会变成一片眩光。",
      },
      {
        en: "Water is drawn with the rest of the grounds: where people walk with wet feet, where a waterfall is the view from the kitchen, and where planting can screen a neighbour without stealing the sun from the deck.",
        zh: "水景和庭院其余部分一起画：湿脚往哪走、瀑布是不是厨房的对景、种植能不能挡住邻居又不抢走露台的阳光。",
      },
    ],
    image: IMAGES.sunset,
    alt: {
      en: "A rectangular pool with a spillover spa and lounge deck at sunset",
      zh: "日落时的长方形泳池、溢流按摩池与躺椅平台",
    },
    contactType: "pool",
    faqs: [
      {
        q: { en: "Do you build the pool, or design it?", zh: "你们是建造泳池，还是设计？" },
        a: {
          en: "The work here is the design of the water with the landscape around it: shape, edges, levels, planting and light, and how it sits in the property. Construction is coordinated with the builders the project needs.",
          zh: "这里做的是水与周围景观的设计：形状、边界、高差、种植和灯光，以及它在整块地上的位置。建造会与项目需要的施工方配合。",
        },
      },
      {
        q: { en: "Can a pool be added to an existing terrace?", zh: "已有露台还能加泳池吗？" },
        a: {
          en: "Sometimes. It depends on grade, the setback to neighbours, and whether the terrace can spare an edge that faces the right light. That is a site question, not a catalogue question.",
          zh: "有时可以。取决于坡度、与邻居的退让，以及露台能不能让出一条朝向对的边。这是场地问题，不是图册问题。",
        },
      },
    ],
  },
  {
    slug: "outdoor-living",
    nav: { en: "Outdoor living", zh: "户外生活" },
    title: "Outdoor Kitchens, Terraces & Fire Pits — Toronto",
    description:
      "Outdoor kitchens, timber pergolas, terraces and fire pits for homes in Toronto and York Region. Cooking and gathering designed as one room.",
    eyebrow: { en: "Terraces and kitchens", zh: "露台与厨房" },
    headline: { en: "A terrace that works as a room.", zh: "把露台做成一个能用的房间。" },
    lead: {
      en: "Outdoor kitchens, pergolas and fire pits in Toronto and York Region fail when they are lined up as equipment. They work when cooking, sitting and fire share one floor, one shade line and one conversation.",
      zh: "多伦多与约克区的户外厨房、廊架和火炉，如果只是设备排成一排，就会失败。烹饪、就座和火在同一地面、同一道遮阳、同一次谈话里，才用得起来。",
    },
    paragraphs: [
      {
        en: "The person at the grill should not have their back to the table. A sunken fire puts seated eyes level with someone standing at the counter. Those two decisions decide the terrace more than the choice of appliance.",
        zh: "烤炉前的人不应背对桌子。下沉的火让坐着的人与站在台前的人视线齐平。这两件事比选哪台电器更决定露台。",
      },
      {
        en: "A timber pergola is the ceiling of that room. Sized to the kitchen and the bar, it shades the day and holds the lights at night. A beam dropped on an unrelated patio does neither.",
        zh: "木构廊架是这个房间的天花。按厨房和吧台的尺寸来做，白天遮阳，夜里承住灯光。一根落在无关平台上的梁，两样都做不到。",
      },
      {
        en: "Materials stay quiet: one paving plane, timber that weathers, light kept inside the room. The yard beyond can go dark. That contrast is what makes the terrace feel finished after sunset, which is when it is used.",
        zh: "材料保持安静：一个铺装平面、会老去的木材、灯光留在房间里。外面的院子可以暗下去。这种对比让露台在日落后——也就是它被使用的时候——显得完整。",
      },
    ],
    image: IMAGES.pergola,
    alt: {
      en: "An outdoor kitchen and bar beneath a timber pergola",
      zh: "木构廊架下的户外厨房与吧台",
    },
    contactType: "terrace",
    faqs: [
      {
        q: { en: "Is an outdoor kitchen usable in a Toronto winter?", zh: "多伦多的冬天，户外厨房用得上吗？" },
        a: {
          en: "The long season is late spring through autumn, and the shoulder evenings when a fire is the point. The room is designed for those months: shade in July, a defined lit space in October. It is not a four-season interior.",
          zh: "长的季节是春末到秋天，以及以火为理由的凉夜。房间为这些月份而设计：七月的遮阳，十月一处有边界的光。它不是四季室内。",
        },
      },
      {
        q: { en: "Can the kitchen be covered without enclosing the yard?", zh: "加顶会不会把院子封死？" },
        a: {
          en: "Yes, if the cover is only as large as the room. Posts at the corners of the kitchen and bar leave the rest of the grounds open.",
          zh: "可以，只要顶只覆盖这个房间。柱子落在厨房和吧台的角上，院子其余部分仍然敞开。",
        },
      },
    ],
  },
  {
    slug: "property-advisory",
    nav: { en: "Property advisory", zh: "地产顾问" },
    title: "Landscape Advice Before You Buy or Sell — Toronto",
    description:
      "Before a purchase or a listing in Toronto and York Region, a landscape read of what the lot can become and what the grounds are worth to the next owner.",
    eyebrow: { en: "Property advisory", zh: "地产顾问" },
    headline: { en: "See the land before you buy or list.", zh: "买或卖之前，先看懂这块地。" },
    lead: {
      en: "A house listing rarely explains the lot. Advisory is a landscape read before a purchase or a sale in Toronto and York Region: what the grounds could become, and what they are worth to the next owner.",
      zh: "房源很少解释地本身。顾问服务是在多伦多与约克区购买或出售之前，用景观的方式读这块地：庭院能变成什么，以及对下一位业主值什么。",
    },
    paragraphs: [
      {
        en: "On a purchase, the question is potential. Grade, sun, the depth of the rear yard, the entry from the street, and whether a pool or a terrace can sit there without a fight with the neighbours or the house. A flat lawn is not a blank cheque.",
        zh: "买的时候，问题是潜力。坡度、阳光、后院进深、从街道进入的方式，以及泳池或露台能不能放下，而不与邻居或房子冲突。一块平草坪不是空白支票。",
      },
      {
        en: "On a sale, the question is what a buyer can already understand. An entry that reads at night, a terrace with a clear use, and a yard that is one sequence rather than a scatter of leftover projects — these change how the property is seen. This is not staging, and it is not an appraisal.",
        zh: "卖的时候，问题是买家已经能看懂什么。夜里可读的入口、用途清楚的露台、一条动线而不是散落的旧工程——这些会改变房子被看待的方式。这不是软装布置，也不是估价。",
      },
      {
        en: "The visit ends with a plain account of what is possible, what is not, and what would be worth doing first. If a project follows, it is a separate conversation.",
        zh: "到访结束时，会有一份直白的说明：什么可能，什么不可能，以及什么值得先做。如果之后要做项目，那是另一次谈话。",
      },
    ],
    image: IMAGES.entry,
    alt: {
      en: "A lit front entry with stone pillars and layered planting",
      zh: "石柱、层次种植与灯光点亮的前门入口",
    },
    contactType: "advisory",
    faqs: [
      {
        q: { en: "Is this a home inspection or an appraisal?", zh: "这是验房或估价吗？" },
        a: {
          en: "No. It is a designer's read of the grounds. It does not replace an inspection, a survey or a formal valuation.",
          zh: "不是。这是设计师对庭院的解读，不能代替验房、测绘或正式估价。",
        },
      },
      {
        q: { en: "When is it useful?", zh: "什么时候有用？" },
        a: {
          en: "Before an offer, when two lots look similar on paper, or before a listing, when the grounds are doing less than they could for the sale.",
          zh: "出价之前，两块地在资料上看起来差不多的时候；或者挂牌之前，庭院对成交的帮助还不够的时候。",
        },
      },
    ],
  },
];

export const HOME_FAQS: Faq[] = [
  {
    q: { en: "Where do you work?", zh: "在哪些地方做项目？" },
    a: {
      en: `Homes across Toronto and York Region, including ${AREAS}.`,
      zh: "多伦多与约克区的住宅，包括北约克、万锦、列治文山、旺市、奥罗拉和索恩希尔。",
    },
  },
  {
    q: { en: "What do you design?", zh: "设计哪些内容？" },
    a: {
      en: "Whole properties, and the parts people actually use: pools and spas, terraces, outdoor kitchens, fire pits, entries, planting and lighting. Every project shown on this site is a completed build.",
      zh: "整块地，以及人真正会用的部分：泳池与按摩池、露台、户外厨房、火炉、入口、种植和灯光。本站展示的都是已完工项目。",
    },
  },
  {
    q: { en: "Can you look at a house before we buy or sell?", zh: "买房或卖房前可以先看地吗？" },
    a: {
      en: "Yes. Advisory is a read of the lot: what the grounds could become, and what they are worth to the next owner. It is not staging and not an appraisal.",
      zh: "可以。顾问是在读这块地：庭院能变成什么，以及对下一位业主值什么。不是软装，也不是估价。",
    },
  },
  {
    q: { en: "How does a project start?", zh: "项目怎么开始？" },
    a: {
      en: "Send a note with the area and the kind of work. We reply to arrange a first conversation. There is no online quote — the lot has to be seen.",
      zh: "留下区域和项目类型。我们会回复并安排第一次沟通。没有在线报价，地必须看到。",
    },
  },
  {
    q: { en: "Do you work in English and Chinese?", zh: "可以用中文沟通吗？" },
    a: {
      en: "Yes. The conversation, and this site, can be in either.",
      zh: "可以。沟通和这个网站都可以用中文或英文。",
    },
  },
];

export function getService(slug: string): ServicePage | undefined {
  return SERVICES.find((service) => service.slug === slug);
}
