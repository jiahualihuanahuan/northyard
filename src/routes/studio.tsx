import { useRef, useState, type ReactNode } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { ChevronDown, ChevronUp, Trash2 } from "lucide-react";
import { Page } from "@/components/chrome";
import { compressImage } from "@/lib/image";
import {
  blankGarden,
  blankProperty,
  sanitizeContent,
  type Credential,
  type Garden,
  type ListingStatus,
  type Property,
  type SiteContent,
} from "@/lib/content";
import { useSite } from "@/lib/site";

export const Route = createFileRoute("/studio")({
  component: StudioPage,
});

function StudioPage() {
  const { content, updateContent, resetContent, tx, inquiries, removeInquiry, saveError } = useSite();
  const [confirmReset, setConfirmReset] = useState(false);
  const [message, setMessage] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  function patch(partial: Partial<SiteContent>) {
    updateContent({ ...content, ...partial });
  }

  function exportJson() {
    const blob = new Blob([JSON.stringify(content, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "northyard.json";
    link.click();
    URL.revokeObjectURL(url);
  }

  async function onImport(file: File) {
    try {
      const parsed = sanitizeContent(JSON.parse(await file.text()));
      if (!parsed) {
        setMessage(tx("这份文件对不上。", "That file does not match."));
        return;
      }
      updateContent(parsed);
      setMessage(tx("已导入。", "Imported."));
    } catch {
      setMessage(tx("读不了这份文件。", "Could not read that file."));
    }
  }

  return (
    <Page>
      <main className="px-5 pt-28 pb-24 md:px-8 lg:px-12">
        <p className="eyebrow text-muted">{tx("内容工作室", "Content studio")}</p>
        <h1 className="display mt-4 text-5xl md:text-6xl">{tx("换成你的照片和介绍。", "Replace this with your work.")}</h1>
        <p className="mt-5 max-w-2xl text-sm leading-7 text-muted">
          {tx(
            "改动保存在这台浏览器里，刷新还在。图片可以上传（会先压缩）或粘贴网址。导出 JSON 当作备份；换电脑时再导入。",
            "Edits stay in this browser. Upload a photo — it is compressed — or paste an image URL. Export JSON as a backup, and import it on another computer.",
          )}
        </p>
        {saveError ? (
          <p className="mt-4 text-sm text-accent">
            {tx("存不下了。图片太大时请改用网址，或先导出 JSON。", "Storage is full. Use an image URL, or export JSON first.")}
          </p>
        ) : null}
        {message ? <p className="mt-4 text-sm">{message}</p> : null}

        <div className="mt-8 flex flex-wrap gap-3">
          <button type="button" onClick={exportJson} className="tap min-h-11 border border-line px-4 text-sm">
            {tx("导出", "Export")}
          </button>
          <button type="button" onClick={() => fileRef.current?.click()} className="tap min-h-11 border border-line px-4 text-sm">
            {tx("导入", "Import")}
          </button>
          <input
            ref={fileRef}
            type="file"
            accept="application/json"
            className="hidden"
            onChange={(event) => {
              const file = event.target.files?.[0];
              event.target.value = "";
              if (file) void onImport(file);
            }}
          />
          {confirmReset ? (
            <>
              <button
                type="button"
                className="tap min-h-11 bg-inverse px-4 text-sm text-canvas"
                onClick={() => {
                  resetContent();
                  setConfirmReset(false);
                }}
              >
                {tx("确认恢复示范", "Confirm reset")}
              </button>
              <button type="button" className="min-h-11 px-3 text-sm" onClick={() => setConfirmReset(false)}>
                {tx("取消", "Cancel")}
              </button>
            </>
          ) : (
            <button type="button" className="min-h-11 px-3 text-sm text-muted" onClick={() => setConfirmReset(true)}>
              {tx("恢复示范内容", "Reset to sample")}
            </button>
          )}
        </div>

        <Section title={tx("品牌", "Brand")}>
          <div className="grid gap-6 md:grid-cols-2">
            <TextField label={tx("中文名", "Chinese name")} value={content.brandZh} onChange={(brandZh) => patch({ brandZh })} />
            <TextField label={tx("英文名", "English name")} value={content.brandEn} onChange={(brandEn) => patch({ brandEn })} />
            <TextField label={tx("中文标语", "Chinese line")} value={content.taglineZh} onChange={(taglineZh) => patch({ taglineZh })} />
            <TextField label={tx("英文标语", "English line")} value={content.taglineEn} onChange={(taglineEn) => patch({ taglineEn })} />
            <TextField label={tx("主理人", "Principal")} value={content.principal} onChange={(principal) => patch({ principal })} />
            <TextField label={tx("电话", "Phone")} value={content.phone} onChange={(phone) => patch({ phone })} />
            <TextField label={tx("邮箱", "Email")} value={content.email} onChange={(email) => patch({ email })} />
            <TextField label={tx("地区 · 中文", "Place · Chinese")} value={content.cityZh} onChange={(cityZh) => patch({ cityZh })} />
            <TextField label={tx("地区 · 英文", "Place · English")} value={content.cityEn} onChange={(cityEn) => patch({ cityEn })} />
            <TextField label={tx("身份 · 中文", "Role · Chinese")} value={content.roleZh} onChange={(roleZh) => patch({ roleZh })} />
            <TextField label={tx("身份 · 英文", "Role · English")} value={content.roleEn} onChange={(roleEn) => patch({ roleEn })} />
          </div>
        </Section>

        <Section title={tx("关于", "About")}>
          <div className="grid gap-6 md:grid-cols-2">
            <TextField label={tx("中文介绍", "Chinese bio")} value={content.aboutZh} area onChange={(aboutZh) => patch({ aboutZh })} />
            <TextField label={tx("英文介绍", "English bio")} value={content.aboutEn} area onChange={(aboutEn) => patch({ aboutEn })} />
          </div>
          <div className="mt-8 flex flex-col gap-4">
            {content.credentials.map((item, index) => (
              <div key={index} className="grid gap-4 border-t border-line pt-4 md:grid-cols-[1fr_1fr_auto]">
                <TextField
                  label={tx("资质 · 中文", "Credential · Chinese")}
                  value={item.zh}
                  onChange={(zh) => patch({ credentials: replaceAt(content.credentials, index, { ...item, zh }) })}
                />
                <TextField
                  label={tx("资质 · 英文", "Credential · English")}
                  value={item.en}
                  onChange={(en) => patch({ credentials: replaceAt(content.credentials, index, { ...item, en }) })}
                />
                <button
                  type="button"
                  className="mt-6 grid size-11 place-items-center"
                  aria-label={tx("删除", "Remove")}
                  onClick={() => patch({ credentials: content.credentials.filter((_, i) => i !== index) })}
                >
                  <Trash2 className="size-4" />
                </button>
              </div>
            ))}
            <button
              type="button"
              className="min-h-11 self-start text-sm"
              onClick={() => patch({ credentials: [...content.credentials, { zh: "", en: "" } satisfies Credential] })}
            >
              {tx("加一条资质", "Add a credential")}
            </button>
          </div>
        </Section>

        <Section title={tx("地产案例", "Properties")}>
          <div className="flex flex-col gap-12">
            {content.properties.map((item, index) => (
              <PropertyEditor
                key={item.id}
                item={item}
                onChange={(next) => patch({ properties: replaceAt(content.properties, index, next) })}
                onRemove={() => patch({ properties: content.properties.filter((p) => p.id !== item.id) })}
                onUp={() => patch({ properties: move(content.properties, index, -1) })}
                onDown={() => patch({ properties: move(content.properties, index, 1) })}
              />
            ))}
          </div>
          <button
            type="button"
            className="tap mt-8 min-h-11 border border-line px-4 text-sm"
            onClick={() => patch({ properties: [...content.properties, blankProperty()] })}
          >
            {tx("加一栋", "Add a house")}
          </button>
        </Section>

        <Section title={tx("景观作品", "Gardens")}>
          <div className="flex flex-col gap-12">
            {content.gardens.map((item, index) => (
              <GardenEditor
                key={item.id}
                item={item}
                onChange={(next) => patch({ gardens: replaceAt(content.gardens, index, next) })}
                onRemove={() => patch({ gardens: content.gardens.filter((g) => g.id !== item.id) })}
                onUp={() => patch({ gardens: move(content.gardens, index, -1) })}
                onDown={() => patch({ gardens: move(content.gardens, index, 1) })}
              />
            ))}
          </div>
          <button
            type="button"
            className="tap mt-8 min-h-11 border border-line px-4 text-sm"
            onClick={() => patch({ gardens: [...content.gardens, blankGarden()] })}
          >
            {tx("加一件", "Add a work")}
          </button>
        </Section>

        <Section title={tx("社区", "Neighborhoods")}>
          <div className="flex flex-col gap-10">
            {content.neighborhoods.map((item, index) => (
              <div key={item.id} className="grid gap-6 border-t border-line pt-6 md:grid-cols-2">
                <TextField label={tx("中文", "Chinese")} value={item.nameZh} onChange={(nameZh) => patch({ neighborhoods: replaceAt(content.neighborhoods, index, { ...item, nameZh }) })} />
                <TextField label={tx("英文", "English")} value={item.nameEn} onChange={(nameEn) => patch({ neighborhoods: replaceAt(content.neighborhoods, index, { ...item, nameEn }) })} />
                <TextField label={tx("一句 · 中文", "Note · Chinese")} value={item.noteZh} onChange={(noteZh) => patch({ neighborhoods: replaceAt(content.neighborhoods, index, { ...item, noteZh }) })} />
                <TextField label={tx("一句 · 英文", "Note · English")} value={item.noteEn} onChange={(noteEn) => patch({ neighborhoods: replaceAt(content.neighborhoods, index, { ...item, noteEn }) })} />
                <div className="md:col-span-2">
                  <ImageField label={tx("图片", "Image")} value={item.image} onChange={(image) => patch({ neighborhoods: replaceAt(content.neighborhoods, index, { ...item, image }) })} />
                </div>
              </div>
            ))}
          </div>
        </Section>

        <Section title={tx("收到的咨询", "Inquiries")}>
          <p className="text-sm text-muted">{tx("只存在这台浏览器，不会自动发给任何人。", "Stored only on this browser. Nothing is sent on its own.")}</p>
          {inquiries.length === 0 ? (
            <p className="mt-6 text-sm">{tx("还没有。", "None yet.")}</p>
          ) : (
            <ul className="mt-6 flex flex-col gap-4">
              {inquiries.map((item) => (
                <li key={item.id} className="border border-line p-5 text-sm leading-6">
                  <div className="flex items-start justify-between gap-4">
                    <p>
                      {item.name} · {item.contact}
                      <span className="mt-1 block text-muted">
                        {item.intent} · {new Date(item.at).toLocaleString()}
                      </span>
                    </p>
                    <button type="button" className="grid size-11 place-items-center" onClick={() => removeInquiry(item.id)} aria-label={tx("删除", "Remove")}>
                      <Trash2 className="size-4" />
                    </button>
                  </div>
                  <p className="mt-3">{item.a1}</p>
                  <p>{item.a2}</p>
                  <p>{item.a3}</p>
                  {item.note ? <p className="mt-2 text-muted">{item.note}</p> : null}
                </li>
              ))}
            </ul>
          )}
        </Section>
      </main>
    </Page>
  );
}

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="mt-16 border-t border-line pt-10">
      <h2 className="display text-4xl">{title}</h2>
      <div className="mt-8">{children}</div>
    </section>
  );
}

function TextField({
  label,
  value,
  onChange,
  area = false,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  area?: boolean;
}) {
  return (
    <label className="block">
      <span className="eyebrow text-muted">{label}</span>
      {area ? (
        <textarea className="field min-h-36 resize-y" value={value} onChange={(event) => onChange(event.target.value)} />
      ) : (
        <input className="field" value={value} onChange={(event) => onChange(event.target.value)} />
      )}
    </label>
  );
}

function ImageField({ label, value, onChange }: { label: string; value: string; onChange: (value: string) => void }) {
  const { tx } = useSite();
  const [err, setErr] = useState("");
  const uploaded = value.startsWith("data:");
  return (
    <label className="block">
      <span className="eyebrow text-muted">{label}</span>
      <div className="mt-3 aspect-3/2 overflow-hidden bg-panel">
        {value ? <img src={value} alt="" className="h-full w-full object-cover" /> : null}
      </div>
      <input
        className="field"
        value={uploaded ? "" : value}
        placeholder={uploaded ? tx("已上传，粘贴网址可替换", "Uploaded — paste a URL to replace") : "https://"}
        onChange={(event) => onChange(event.target.value)}
      />
      <input
        type="file"
        accept="image/*"
        className="mt-3 block w-full text-sm"
        onChange={async (event) => {
          const file = event.target.files?.[0];
          event.target.value = "";
          if (!file) return;
          try {
            onChange(await compressImage(file));
            setErr("");
          } catch {
            setErr(tx("读不了这张图。", "Could not read that image."));
          }
        }}
      />
      {err ? <p className="mt-2 text-sm text-accent">{err}</p> : null}
    </label>
  );
}

function RowActions({ onUp, onDown, onRemove }: { onUp: () => void; onDown: () => void; onRemove: () => void }) {
  const { tx } = useSite();
  return (
    <div className="flex gap-1">
      <button type="button" className="grid size-11 place-items-center" onClick={onUp} aria-label={tx("上移", "Move up")}>
        <ChevronUp className="size-4" />
      </button>
      <button type="button" className="grid size-11 place-items-center" onClick={onDown} aria-label={tx("下移", "Move down")}>
        <ChevronDown className="size-4" />
      </button>
      <button type="button" className="grid size-11 place-items-center" onClick={onRemove} aria-label={tx("删除", "Remove")}>
        <Trash2 className="size-4" />
      </button>
    </div>
  );
}

function PropertyEditor({
  item,
  onChange,
  onRemove,
  onUp,
  onDown,
}: {
  item: Property;
  onChange: (item: Property) => void;
  onRemove: () => void;
  onUp: () => void;
  onDown: () => void;
}) {
  const { tx } = useSite();
  const set = (partial: Partial<Property>) => onChange({ ...item, ...partial });
  return (
    <article className="border-t border-line pt-6">
      <div className="flex items-center justify-between gap-4">
        <p className="display text-2xl">{item.titleZh || item.titleEn}</p>
        <RowActions onUp={onUp} onDown={onDown} onRemove={onRemove} />
      </div>
      <div className="mt-4 grid gap-6 md:grid-cols-2">
        <ImageField label={tx("图片", "Image")} value={item.image} onChange={(image) => set({ image })} />
        <div className="grid content-start gap-4">
          <label className="block">
            <span className="eyebrow text-muted">{tx("状态", "Status")}</span>
            <select
              className="field"
              value={item.status}
              onChange={(event) => set({ status: event.target.value as ListingStatus })}
            >
              <option value="sample">{tx("示范", "Study")}</option>
              <option value="active">{tx("在售", "Listed")}</option>
              <option value="sold">{tx("成交", "Sold")}</option>
            </select>
          </label>
          <TextField label={tx("价格", "Price")} value={item.price} onChange={(price) => set({ price })} />
          <div className="grid grid-cols-3 gap-3">
            <TextField label={tx("室", "Beds")} value={item.beds} onChange={(beds) => set({ beds })} />
            <TextField label={tx("卫", "Baths")} value={item.baths} onChange={(baths) => set({ baths })} />
            <TextField label={tx("面积", "Area")} value={item.sqft} onChange={(sqft) => set({ sqft })} />
          </div>
        </div>
        <TextField label={tx("标题 · 中文", "Title · Chinese")} value={item.titleZh} onChange={(titleZh) => set({ titleZh })} />
        <TextField label={tx("标题 · 英文", "Title · English")} value={item.titleEn} onChange={(titleEn) => set({ titleEn })} />
        <TextField label={tx("社区 · 中文", "Place · Chinese")} value={item.neighborhoodZh} onChange={(neighborhoodZh) => set({ neighborhoodZh })} />
        <TextField label={tx("社区 · 英文", "Place · English")} value={item.neighborhoodEn} onChange={(neighborhoodEn) => set({ neighborhoodEn })} />
        <TextField label={tx("摘要 · 中文", "Summary · Chinese")} value={item.summaryZh} area onChange={(summaryZh) => set({ summaryZh })} />
        <TextField label={tx("摘要 · 英文", "Summary · English")} value={item.summaryEn} area onChange={(summaryEn) => set({ summaryEn })} />
        <TextField label={tx("正文 · 中文", "Story · Chinese")} value={item.storyZh} area onChange={(storyZh) => set({ storyZh })} />
        <TextField label={tx("正文 · 英文", "Story · English")} value={item.storyEn} area onChange={(storyEn) => set({ storyEn })} />
        <TextField label={tx("景观读地 · 中文", "Landscape reading · Chinese")} value={item.readZh} area onChange={(readZh) => set({ readZh })} />
        <TextField label={tx("景观读地 · 英文", "Landscape reading · English")} value={item.readEn} area onChange={(readEn) => set({ readEn })} />
      </div>
    </article>
  );
}

function GardenEditor({
  item,
  onChange,
  onRemove,
  onUp,
  onDown,
}: {
  item: Garden;
  onChange: (item: Garden) => void;
  onRemove: () => void;
  onUp: () => void;
  onDown: () => void;
}) {
  const { tx } = useSite();
  const set = (partial: Partial<Garden>) => onChange({ ...item, ...partial });
  return (
    <article className="border-t border-line pt-6">
      <div className="flex items-center justify-between gap-4">
        <p className="display text-2xl">{item.titleZh || item.titleEn}</p>
        <RowActions onUp={onUp} onDown={onDown} onRemove={onRemove} />
      </div>
      <div className="mt-4 grid gap-6 md:grid-cols-2">
        <ImageField
          label={item.mode === "viz" ? tx("效果图", "Drawing") : tx("改造前", "Before")}
          value={item.before}
          onChange={(before) => set({ before })}
        />
        <ImageField
          label={item.mode === "viz" ? tx("实景", "Built") : tx("改造后", "After")}
          value={item.after}
          onChange={(after) => set({ after })}
        />
        <label className="block">
          <span className="eyebrow text-muted">{tx("对比方式", "Comparison")}</span>
          <select className="field" value={item.mode} onChange={(event) => set({ mode: event.target.value === "viz" ? "viz" : "before" })}>
            <option value="before">{tx("改造前 / 改造后", "Before / after")}</option>
            <option value="viz">{tx("效果图 / 实景", "Drawing / built")}</option>
          </select>
        </label>
        <TextField label={tx("类别 · 中文", "Category · Chinese")} value={item.categoryZh} onChange={(categoryZh) => set({ categoryZh })} />
        <TextField label={tx("类别 · 英文", "Category · English")} value={item.categoryEn} onChange={(categoryEn) => set({ categoryEn })} />
        <TextField label={tx("标题 · 中文", "Title · Chinese")} value={item.titleZh} onChange={(titleZh) => set({ titleZh })} />
        <TextField label={tx("标题 · 英文", "Title · English")} value={item.titleEn} onChange={(titleEn) => set({ titleEn })} />
        <TextField label={tx("摘要 · 中文", "Summary · Chinese")} value={item.summaryZh} area onChange={(summaryZh) => set({ summaryZh })} />
        <TextField label={tx("摘要 · 英文", "Summary · English")} value={item.summaryEn} area onChange={(summaryEn) => set({ summaryEn })} />
        <TextField label={tx("正文 · 中文", "Story · Chinese")} value={item.storyZh} area onChange={(storyZh) => set({ storyZh })} />
        <TextField label={tx("正文 · 英文", "Story · English")} value={item.storyEn} area onChange={(storyEn) => set({ storyEn })} />
      </div>
    </article>
  );
}

function replaceAt<T>(list: T[], index: number, next: T): T[] {
  return list.map((item, i) => (i === index ? next : item));
}

function move<T>(list: T[], index: number, dir: -1 | 1): T[] {
  const target = index + dir;
  if (target < 0 || target >= list.length) return list;
  const copy = list.slice();
  const [item] = copy.splice(index, 1);
  if (!item) return list;
  copy.splice(target, 0, item);
  return copy;
}
