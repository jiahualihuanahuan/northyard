import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { Page, statusLabel } from "@/components/chrome";
import { Frame } from "@/components/frame";
import { useSite } from "@/lib/site";

export const Route = createFileRoute("/property/$id")({
  component: PropertyPage,
});

function PropertyPage() {
  const { id } = Route.useParams();
  const { content, lang, tx, open } = useSite();
  const index = content.properties.findIndex((item) => item.id === id);
  const item = content.properties[index];

  if (!item) {
    return (
      <Page>
        <main className="px-5 pt-32 pb-24 md:px-8">
          <h1 className="display text-5xl">{tx("没有这栋房子。", "This house is not here.")}</h1>
          <Link to="/" hash="estate" className="mt-8 inline-flex min-h-11 items-center gap-2 text-sm">
            <ArrowLeft className="size-4" />
            {tx("回到案例", "Back to studies")}
          </Link>
        </main>
      </Page>
    );
  }

  const title = lang === "zh" ? item.titleZh : item.titleEn;
  const next = content.properties[(index + 1) % content.properties.length];
  const facts = [
    item.beds ? tx(`${item.beds} 室`, `${item.beds} bed`) : "",
    item.baths ? tx(`${item.baths} 卫`, `${item.baths} bath`) : "",
    item.sqft ? tx(`${item.sqft} 平方英尺`, `${item.sqft} sf`) : "",
  ].filter(Boolean);

  return (
    <Page>
      <article>
        <Frame
          src={item.image}
          alt={title}
          className="case-hero"
          priority
          transitionName={`prop-${item.id}`}
        />
        <div className="px-5 py-16 md:px-8 md:py-20 lg:px-12">
          <Link to="/" hash="estate" className="inline-flex min-h-11 items-center gap-2 text-sm">
            <ArrowLeft className="size-4" />
            {tx("全部案例", "All studies")}
          </Link>
          <p className="eyebrow mt-8 text-muted">
            {tx(item.neighborhoodZh, item.neighborhoodEn)} · {statusLabel(item.status, tx)}
          </p>
          <div className="mt-4 grid gap-8 md:grid-cols-12">
            <h1 className="display text-5xl md:col-span-7 md:text-7xl">{title}</h1>
            <div className="md:col-span-4 md:col-start-9 md:pt-3">
              {item.price ? <p className="text-lg">{item.price}</p> : null}
              {facts.length ? <p className="mt-2 text-sm text-muted">{facts.join(" · ")}</p> : null}
            </div>
          </div>
          <div className="mt-14 grid gap-12 border-t border-line pt-12 md:grid-cols-12">
            <div className="md:col-span-6">
              <p className="text-base leading-8">{tx(item.storyZh, item.storyEn)}</p>
            </div>
            <aside className="bg-panel p-8 md:col-span-5 md:col-start-8">
              <p className="eyebrow text-accent">{tx("景观读地", "A landscape reading")}</p>
              <p className="mt-4 text-sm leading-7">{tx(item.readZh, item.readEn)}</p>
            </aside>
          </div>
          <div className="mt-16 flex flex-wrap items-center justify-between gap-6 border-t border-line pt-8">
            <Link to="/inquire" className="tap inline-flex min-h-11 items-center bg-accent px-6 text-sm text-accent-fg">
              {tx("聊聊这栋房子", "Talk about this house")}
            </Link>
            {next && next.id !== item.id ? (
              <button
                type="button"
                className="group inline-flex min-h-11 items-center gap-2 text-sm"
                onClick={() => open("/property/$id", { id: next.id })}
              >
                {tx("下一栋", "Next")} · {lang === "zh" ? next.titleZh : next.titleEn}
                <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>
            ) : null}
          </div>
        </div>
      </article>
    </Page>
  );
}
