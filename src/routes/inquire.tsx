import { useState, type FormEvent } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Page } from "@/components/chrome";
import { cn } from "@/lib/cn";
import { useSite } from "@/lib/site";

export const Route = createFileRoute("/inquire")({
  component: InquirePage,
});

type Intent = "estate" | "garden" | "both";

const INTENTS: { id: Intent; zh: string; en: string }[] = [
  { id: "estate", zh: "房产买卖", en: "Buying or selling" },
  { id: "garden", zh: "景观设计", en: "A garden" },
  { id: "both", zh: "房产与庭院", en: "House and garden" },
];

const QUESTIONS: Record<Intent, { zh: [string, string, string]; en: [string, string, string] }> = {
  estate: {
    zh: ["社区或地址", "大致预算，或期望售价", "更在意自住，还是资产回报"],
    en: ["Neighborhood or address", "Budget, or the price you have in mind", "Living there, or the return"],
  },
  garden: {
    zh: ["前院、后院，还是整体", "大约面积", "希望低维护，还是适合招待"],
    en: ["Front, rear, or the whole ground", "Rough size", "Low care, or made for gathering"],
  },
  both: {
    zh: ["社区或地址", "先评估买入潜力，还是出售前的庭院包装", "希望什么时候开始"],
    en: ["Neighborhood or address", "Buying potential, or garden work before a listing", "When you would like to begin"],
  },
};

function InquirePage() {
  const { tx, lang, content, addInquiry } = useSite();
  const [intent, setIntent] = useState<Intent>("both");
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [a1, setA1] = useState("");
  const [a2, setA2] = useState("");
  const [a3, setA3] = useState("");
  const [note, setNote] = useState("");
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);

  const questions = lang === "zh" ? QUESTIONS[intent].zh : QUESTIONS[intent].en;

  function submit(event: FormEvent) {
    event.preventDefault();
    if (!name.trim() || !contact.trim()) {
      setError(tx("请留下姓名和联系方式。", "Name and a way to reach you, please."));
      return;
    }
    addInquiry({ intent, name: name.trim(), contact: contact.trim(), a1, a2, a3, note });
    setSent(true);
    setError("");
  }

  function mail() {
    if (!content.email) return;
    const labels = questions;
    const body = [
      `${tx("意向", "Intent")}: ${tx(INTENTS.find((i) => i.id === intent)?.zh ?? "", INTENTS.find((i) => i.id === intent)?.en ?? "")}`,
      `${tx("姓名", "Name")}: ${name}`,
      `${tx("联系", "Contact")}: ${contact}`,
      `${labels[0]}: ${a1}`,
      `${labels[1]}: ${a2}`,
      `${labels[2]}: ${a3}`,
      note,
    ].join("\n");
    window.location.href = `mailto:${content.email}?subject=${encodeURIComponent(tx("Jenny Bu 咨询", "Jenny Bu inquiry"))}&body=${encodeURIComponent(body)}`;
  }

  return (
    <Page>
      <main className="px-5 pt-28 pb-24 md:px-8 lg:px-12">
        <p className="eyebrow text-muted">{tx("预约", "Inquire")}</p>
        <h1 className="display mt-4 max-w-3xl text-5xl md:text-7xl">
          {tx("告诉我你站在哪一步。", "Tell me which step you are on.")}
        </h1>
        {sent ? (
          <div className="mt-16 max-w-xl">
            <p className="display text-4xl">{tx("已收下。", "Received.")}</p>
            <p className="mt-4 text-sm leading-7 text-muted">
              {tx(
                "这份咨询保存在这台浏览器的内容工作室里。填好邮箱后，也可以直接用邮件发出去。",
                "It is saved in the content studio on this browser. Once an email is set, you can also open it in your mail app.",
              )}
            </p>
            {content.email ? (
              <button type="button" onClick={mail} className="tap mt-8 inline-flex min-h-11 items-center bg-accent px-6 text-sm text-accent-fg">
                {tx("用邮件发送", "Send by email")}
              </button>
            ) : null}
          </div>
        ) : (
          <form onSubmit={submit} className="mt-14 max-w-2xl">
            <div className="flex flex-wrap gap-2">
              {INTENTS.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setIntent(item.id)}
                  className={cn(
                    "tap min-h-11 border px-4 text-sm",
                    intent === item.id ? "border-inverse bg-inverse text-canvas" : "border-line",
                  )}
                >
                  {lang === "zh" ? item.zh : item.en}
                </button>
              ))}
            </div>
            <label className="mt-10 block">
              <span className="eyebrow text-muted">{tx("姓名", "Name")}</span>
              <input className="field" value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" />
            </label>
            <label className="mt-6 block">
              <span className="eyebrow text-muted">{tx("电话或邮箱", "Phone or email")}</span>
              <input className="field" value={contact} onChange={(e) => setContact(e.target.value)} autoComplete="email" />
            </label>
            <label className="mt-6 block">
              <span className="eyebrow text-muted">{questions[0]}</span>
              <input className="field" value={a1} onChange={(e) => setA1(e.target.value)} />
            </label>
            <label className="mt-6 block">
              <span className="eyebrow text-muted">{questions[1]}</span>
              <input className="field" value={a2} onChange={(e) => setA2(e.target.value)} />
            </label>
            <label className="mt-6 block">
              <span className="eyebrow text-muted">{questions[2]}</span>
              <input className="field" value={a3} onChange={(e) => setA3(e.target.value)} />
            </label>
            <label className="mt-6 block">
              <span className="eyebrow text-muted">{tx("还想补充", "Anything else")}</span>
              <textarea className="field min-h-28 resize-y" value={note} onChange={(e) => setNote(e.target.value)} />
            </label>
            {error ? <p className="mt-4 text-sm text-accent">{error}</p> : null}
            <button type="submit" className="tap mt-10 inline-flex min-h-11 items-center bg-accent px-6 text-sm text-accent-fg">
              {tx("送出", "Send")}
            </button>
          </form>
        )}
      </main>
    </Page>
  );
}
