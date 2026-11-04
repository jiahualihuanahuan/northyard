import { useState, type FormEvent } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { ContactLinks, Page } from "@/components/chrome";
import { Frame } from "@/components/frame";
import { SITE_URL, type T } from "@/lib/content";
import { useSite } from "@/lib/site";

const AREAS = [
  { id: "toronto", label: { en: "Toronto", zh: "多伦多" } },
  { id: "york", label: { en: "York Region", zh: "约克区" } },
  { id: "other", label: { en: "Other", zh: "其他" } },
] as const satisfies readonly { id: string; label: T }[];

const TYPES = [
  { id: "pool", label: { en: "Pool & water", zh: "泳池与水景" } },
  { id: "terrace", label: { en: "Terrace & outdoor kitchen", zh: "露台与户外厨房" } },
  { id: "entry", label: { en: "Entry & driveway", zh: "入口与车道" } },
  { id: "full", label: { en: "Full property", zh: "整体庭院" } },
  { id: "advisory", label: { en: "Property advisory", zh: "地产顾问" } },
] as const satisfies readonly { id: string; label: T }[];

type TypeId = (typeof TYPES)[number]["id"];

export const Route = createFileRoute("/contact")({
  validateSearch: (search: Record<string, unknown>): { type?: TypeId } => {
    const type = TYPES.find((x) => x.id === search.type)?.id;
    return type ? { type } : {};
  },
  head: () => ({
    meta: [
      { title: "Contact — Jenny Bu" },
      { property: "og:url", content: `${SITE_URL}/contact` },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/contact` }],
  }),
  component: ContactPage,
});

/**
 * Delivery: FormSubmit (https://formsubmit.co) AJAX endpoint — no account, no secret.
 * The first submission triggers a one-time activation email to the inbox below;
 * the owner must click "Activate Form" once before messages are delivered.
 * If the request fails, the visitor is offered a prefilled mailto: fallback.
 */
function endpoint(email: string) {
  return `https://formsubmit.co/ajax/${encodeURIComponent(email)}`;
}

function ContactPage() {
  const { content, t, tx } = useSite();
  const search = Route.useSearch();
  const [name, setName] = useState("");
  const [reach, setReach] = useState("");
  const [area, setArea] = useState<string>("toronto");
  const [type, setType] = useState<string>(search.type ?? "full");
  const [notes, setNotes] = useState("");
  const [state, setState] = useState<"idle" | "sending" | "sent" | "failed">("idle");
  const [error, setError] = useState("");

  const areaEn = AREAS.find((a) => a.id === area)?.label.en ?? area;
  const typeEn = TYPES.find((x) => x.id === type)?.label.en ?? type;
  const subject = `Website inquiry: ${typeEn} — ${name.trim()}`;
  const bodyText = [
    `Name: ${name}`,
    `Email or phone: ${reach}`,
    `Area: ${areaEn}`,
    `Project type: ${typeEn}`,
    "",
    notes,
  ].join("\n");
  const mailto = `mailto:${content.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(bodyText)}`;

  async function submit(event: FormEvent) {
    event.preventDefault();
    if (!name.trim() || !reach.trim()) {
      setError(tx("请留下姓名和联系方式。", "Please add your name and an email or phone number."));
      return;
    }
    setError("");
    setState("sending");
    try {
      const res = await fetch(endpoint(content.email), {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          name,
          "email or phone": reach,
          area: areaEn,
          "project type": typeEn,
          notes,
          _subject: subject,
          _template: "table",
          _captcha: "false",
          _honey: "",
        }),
      });
      const data = (await res.json().catch(() => ({}))) as { success?: string | boolean };
      setState(res.ok && String(data.success) !== "false" ? "sent" : "failed");
    } catch {
      setState("failed");
    }
  }

  return (
    <Page>
      <main className="grid gap-12 px-5 pt-28 pb-24 md:grid-cols-12 md:px-8 lg:px-12">
        <div className="md:col-span-7">
          <p className="eyebrow text-muted">{tx("联系", "Contact")}</p>
          <h1 className="display mt-4 max-w-3xl text-5xl md:text-7xl">{t(content.contactCta.headline)}</h1>
          <p className="mt-6 max-w-xl text-base leading-7 text-muted">{t(content.contactPage.intro)}</p>

          {state === "sent" ? (
            <div className="mt-14 max-w-xl">
              <p className="display text-4xl">{tx("已收到，谢谢。", "Thank you — received.")}</p>
              <p className="mt-4 text-sm leading-7 text-muted">
                {tx("我们会尽快回复，安排初次沟通。", "We'll reply to arrange a first conversation.")}
              </p>
            </div>
          ) : (
            <form onSubmit={submit} className="mt-14 max-w-2xl">
              <label className="block">
                <span className="eyebrow text-muted">{tx("姓名", "Name")}</span>
                <input className="field" name="name" value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" required />
              </label>
              <label className="mt-6 block">
                <span className="eyebrow text-muted">{tx("邮箱或电话", "Email or phone")}</span>
                <input className="field" name="contact" value={reach} onChange={(e) => setReach(e.target.value)} autoComplete="email" required />
              </label>
              <label className="mt-6 block">
                <span className="eyebrow text-muted">{tx("所在区域", "Area")}</span>
                <select className="field" value={area} onChange={(e) => setArea(e.target.value)}>
                  {AREAS.map((a) => (
                    <option key={a.id} value={a.id}>{t(a.label)}</option>
                  ))}
                </select>
              </label>
              <label className="mt-6 block">
                <span className="eyebrow text-muted">{tx("项目类型", "Project type")}</span>
                <select className="field" value={type} onChange={(e) => setType(e.target.value)}>
                  {TYPES.map((x) => (
                    <option key={x.id} value={x.id}>{t(x.label)}</option>
                  ))}
                </select>
              </label>
              <label className="mt-6 block">
                <span className="eyebrow text-muted">{tx("备注", "Notes")}</span>
                <textarea className="field min-h-28 resize-y" value={notes} onChange={(e) => setNotes(e.target.value)} />
              </label>
              {error ? <p className="mt-4 text-sm text-accent">{error}</p> : null}
              {state === "failed" ? (
                <p className="mt-4 text-sm leading-6 text-accent">
                  {tx("发送没有成功。你可以", "That didn't go through. You can")}{" "}
                  <a href={mailto} className="underline">{tx("改用邮件发送", "send it by email instead")}</a>
                  {tx("，或直接致电。", ", or call us directly.")}
                </p>
              ) : null}
              <button
                type="submit"
                disabled={state === "sending"}
                className="tap mt-10 inline-flex min-h-11 items-center bg-accent px-6 text-sm text-accent-fg disabled:opacity-60"
              >
                {state === "sending" ? tx("发送中…", "Sending…") : tx("发送", "Send")}
              </button>
            </form>
          )}

          <div className="mt-14 text-sm leading-7">
            <p className="eyebrow text-muted">{tx("或直接联系", "Or reach us directly")}</p>
            <ContactLinks />
            <p className="text-muted">{t(content.city)}</p>
          </div>
        </div>
        <Frame
          src={content.contactPage.image}
          alt={tx("设计效果图：木构廊架下的户外厨房", "Concept rendering: outdoor kitchen beneath a timber pergola")}
          className="aspect-4/5 md:col-span-5"
        />
      </main>
    </Page>
  );
}
