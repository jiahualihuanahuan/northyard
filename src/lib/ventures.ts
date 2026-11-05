import type { T } from "@/lib/content";

export type StagingImage = {
  src: string;
  alt: T;
  caption: T;
};

export const STAGING = {
  path: "/staging",
  nav: { en: "Interior staging", zh: "室内陈设" } satisfies T,
  headline: { en: "A room that already feels lived in.", zh: "一间看起来已经住好的房间。" } satisfies T,
  card: {
    en: "Beds, linen, light, and the few things on a table. Set for a photograph or a showing.",
    zh: "床、布料、光线，和桌上的那几件东西。为拍摄或看房而布置。",
  } satisfies T,
  body: {
    en: "The furniture and the small things are arranged so a buyer can picture the house finished. Living rooms, bedrooms, and the table where people will sit.",
    zh: "家具和那些小东西摆好，让看房的人能想象住进去的样子。客厅、卧室，和将来坐下来吃饭的那张桌子。",
  } satisfies T,
  note: {
    en: "These photographs show the kind of room. Finished projects replace them as they are photographed.",
    zh: "这几张是陈设的样子。拍到完工的项目后会换上。",
  } satisfies T,
  images: [
    {
      src: "/images/staging/living.webp",
      alt: { en: "A living room set with a low sofa and afternoon light", zh: "矮沙发的客厅，下午的光从一侧进来" },
      caption: { en: "Living room", zh: "客厅" },
    },
    {
      src: "/images/staging/bedroom.webp",
      alt: { en: "A bed made with white linen and one wool throw", zh: "白床品，一条羊毛毯" },
      caption: { en: "Bedroom", zh: "卧室" },
    },
    {
      src: "/images/staging/dining.webp",
      alt: { en: "A dining table set for four", zh: "摆好的四人餐桌" },
      caption: { en: "Dining", zh: "餐厅" },
    },
  ] satisfies StagingImage[],
};

export type ListingFact = { label: T; value: T };

export type Listing = {
  mls: string;
  price: string;
  priceValue: number;
  address: string;
  city: string;
  region: string;
  postal: string;
  area: T;
  image: string;
  alt: T;
  summary: T;
  body: T[];
  facts: ListingFact[];
  schools: string[];
  listed: string;
};

export const LISTINGS: Listing[] = [
  {
    mls: "N14119300",
    price: "$1,699,000",
    priceValue: 1699000,
    address: "45 John Button Boulevard",
    city: "Markham",
    region: "ON",
    postal: "L3R 9A7",
    area: { en: "Buttonville, Markham", zh: "万锦 Buttonville" },
    image: "/images/listings/n14119300-aerial.webp",
    alt: {
      en: "Autumn aerial of 45 John Button Boulevard in Buttonville",
      zh: "秋天从空中看 Buttonville 的 45 John Button Boulevard",
    },
    summary: {
      en: "A detached two-storey beside Unionville. Four bedrooms upstairs, a finished basement, and a deep backyard with a gazebo and a shed.",
      zh: "紧挨 Unionville 的独立两层。楼上四间卧室，地下室已完工，后院进深大，有凉亭和储物棚。",
    },
    body: [
      {
        en: "The main floor keeps the living room and the family room separate, and the kitchen opens to a breakfast area off an island. Upstairs are four bedrooms. The primary has an ensuite and a walk-in closet.",
        zh: "一楼客厅和家庭厅分开。厨房连着岛台和早餐区。楼上四间卧室，主卧带套卫和步入式衣橱。",
      },
      {
        en: "The basement is finished: a recreation room, a gas fireplace, and a room that can be an office or a fifth bedroom. Above grade is 3,457 square feet, and the finished basement is about 1,600.",
        zh: "地下室已完工：娱乐室、燃气壁炉，以及一间可作书房或第五间卧室的房间。地上 3,457 平方英尺，完工地下室大约 1,600。",
      },
      {
        en: "The backyard is already landscaped, with a gazebo and a garden shed. The lot is 49.38 by 138.56 feet. YRT, parks, T&T, and Markham Town Centre are close. The 404, the 407, and the GO station are a short drive.",
        zh: "后院已经做了景观，有凉亭和储物棚。地块 49.38 乘 138.56 英尺。附近有 YRT、公园、大统华和万锦广场。开车不久可到 404、407 和 GO 站。",
      },
    ],
    facts: [
      { label: { en: "Price", zh: "价格" }, value: { en: "$1,699,000", zh: "$1,699,000" } },
      { label: { en: "Status", zh: "状态" }, value: { en: "For sale", zh: "在售" } },
      { label: { en: "Type", zh: "类型" }, value: { en: "Detached, 2-storey", zh: "独立屋，两层" } },
      {
        label: { en: "Bedrooms", zh: "卧室" },
        value: { en: "4 upstairs, plus a room below", zh: "楼上 4 间，楼下还可一间" },
      },
      { label: { en: "Bathrooms", zh: "卫生间" }, value: { en: "4", zh: "4" } },
      {
        label: { en: "Size", zh: "面积" },
        value: { en: "3,457 sq ft above grade", zh: "地上 3,457 平方英尺" },
      },
      {
        label: { en: "Basement", zh: "地下室" },
        value: { en: "Finished, about 1,600 sq ft", zh: "已完工，约 1,600 平方英尺" },
      },
      { label: { en: "Lot", zh: "地块" }, value: { en: "49.38 × 138.56 ft", zh: "49.38 × 138.56 英尺" } },
      { label: { en: "Parking", zh: "车位" }, value: { en: "4", zh: "4" } },
      { label: { en: "Taxes", zh: "地税" }, value: { en: "$9,446 (2026, as listed)", zh: "$9,446（2026，挂牌所载）" } },
      { label: { en: "MLS", zh: "MLS" }, value: { en: "N14119300", zh: "N14119300" } },
    ],
    schools: [
      "Unionville High School",
      "Buttonville Public School",
      "St. Justin Martyr",
      "École élémentaire catholique Marguerite-Bourgeoys",
    ],
    listed: "2026-10-27",
  },
];

export function getListing(mls: string) {
  const key = mls.toUpperCase();
  return LISTINGS.find((item) => item.mls === key);
}
