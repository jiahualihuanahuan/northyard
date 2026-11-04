import { useRef, useState, type ReactNode } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Page } from "@/components/chrome";
import { compressImage } from "@/lib/image";
import { sanitizeContent, type SiteContent, type T, type Work } from "@/lib/content";
import { useSite } from "@/lib/site";

// Owner-only editor. Not linked from public nav/footer; kept out of search engines.
export const Route = createFileRoute("/studio")({
  head: () => ({ meta: [{ title: "Studio — Jenny Bu" }, { name: "robots", content: "noindex, nofollow" }] }),
  component: StudioPage,
});

function StudioPage() {
  const { content, updateContent, resetContent, tx, saveError } = useSite();
  const [json, setJson] = useState("");
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
    link.download = "jennybu-content.json";
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
                {tx("确认恢复默认", "Confirm reset")}
              </button>
              <button type="button" className="min-h-11 px-3 text-sm" onClick={() => setConfirmReset(false)}>
                {tx("取消", "Cancel")}
              </button>
            </>
          ) : (
            <button type="button" className="min-h-11 px-3 text-sm text-muted" onClick={() => setConfirmReset(true)}>
              {tx("恢复默认内容", "Reset to defaults")}
            </button>
          )}
        </div>

        <Section title={tx("品牌与联系", "Brand & contact")}>
          <div className="grid gap-6 md:grid-cols-2">
            <TextField label={tx("中文名", "Chinese name")} value={content.brandZh} onChange={(brandZh) => patch({ brandZh })} />
            <TextField label={tx("英文名", "English name")} value={content.brandEn} onChange={(brandEn) => patch({ brandEn })} />
            <BiField label={tx("标语", "Tagline")} value={content.tagline} onChange={(tagline) => patch({ tagline })} />
            <BiField label={tx("地区", "Place")} value={content.city} onChange={(city) => patch({ city })} />
            <TextField label={tx("电话", "Phone")} value={content.phone} onChange={(phone) => patch({ phone })} />
            <TextField label={tx("邮箱（表单发送到这里）", "Email (form goes here)")} value={content.email} onChange={(email) => patch({ email })} />
          </div>
        </Section>

        <Section title={tx("作品（已完工项目）", "Work (completed projects)")}>
          <div className="flex flex-col gap-12">
            {content.work.map((item, index) => (
              <div key={item.id} className="grid gap-6 border-t border-line pt-6 md:grid-cols-2">
                <BiField label={tx("标题", "Title")} value={item.title} onChange={(title) => patchWork(index, { title })} />
                <BiField label={tx("描述", "Description")} area value={item.body} onChange={(body) => patchWork(index, { body })} />
                <ImageField label={tx("图片", "Image")} value={item.image} onChange={(image) => patchWork(index, { image })} />
              </div>
            ))}
          </div>
        </Section>

        <Section title={tx("全部文案（JSON，高级）", "All copy (JSON, advanced)")}>
          <p className="text-sm leading-6 text-muted">
            {tx(
              "首屏、理念、地产顾问、联系引导的中英文都在这里。改完点“应用”。",
              "Hero, approach, advisory and contact copy live here. Edit, then Apply.",
            )}
          </p>
          <textarea
            className="field mt-4 min-h-96 font-mono text-xs"
            value={json || JSON.stringify(content, null, 2)}
            onChange={(e) => setJson(e.target.value)}
          />
          <button
            type="button"
            className="tap mt-4 min-h-11 border border-line px-4 text-sm"
            onClick={() => {
              try {
                const parsed = sanitizeContent(JSON.parse(json || JSON.stringify(content)));
                if (!parsed) throw new Error("bad");
                updateContent(parsed);
                setJson("");
                setMessage(tx("已应用。", "Applied."));
              } catch {
                setMessage(tx("JSON 格式不对。", "That JSON is not valid."));
              }
            }}
          >
            {tx("应用", "Apply")}
          </button>
        </Section>
      </main>
    </Page>
  );

  function patchWork(index: number, partial: Partial<Work>) {
    patch({ work: content.work.map((w, i) => (i === index ? { ...w, ...partial } : w)) });
  }
}

function BiField({ label, value, onChange, area }: { label: string; value: T; onChange: (v: T) => void; area?: boolean }) {
  return (
    <div className="grid gap-3">
      <TextField label={`${label} · EN`} value={value.en} area={area} onChange={(en) => onChange({ ...value, en })} />
      <TextField label={`${label} · 中文`} value={value.zh} area={area} onChange={(zh) => onChange({ ...value, zh })} />
    </div>
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
