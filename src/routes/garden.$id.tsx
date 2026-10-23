import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { Compare } from "@/components/compare";
import { Page } from "@/components/chrome";
import { Frame } from "@/components/frame";
import { useSite } from "@/lib/site";

export const Route = createFileRoute("/garden/$id")({
  component: GardenPage,
});

function GardenPage() {
  const { id } = Route.useParams();
  const { content, lang, tx, open } = useSite();
  const index = content.gardens.findIndex((item) => item.id === id);
  const item = content.gardens[index];

  if (!item) {
    return (
      <Page>
        <main className="px-5 pt-32 pb-24">
          <h1 className="display text-5xl">{tx("没有这件作品。", "This work is not here.")}</h1>
          <Link to="/" hash="garden" className="mt-8 inline-flex min-h-11 items-center gap-2 text-sm">
            <ArrowLeft className="size-4" />
            {tx("回到景观", "Back to the garden")}
          </Link>
        </main>
      </Page>
    );
  }

  const title = lang === "zh" ? item.titleZh : item.titleEn;
  const next = content.gardens[(index + 1) % content.gardens.length];
  const beforeLabel = item.mode === "viz" ? tx("效果图", "Drawing") : tx("改造前", "Before");
  const afterLabel = item.mode === "viz" ? tx("实景", "Built") : tx("改造后", "After");

  return (
    <Page>
      <article className="px-5 pt-28 pb-20 md:px-8 lg:px-12">
        <Link to="/" hash="garden" className="inline-flex min-h-11 items-center gap-2 text-sm">
          <ArrowLeft className="size-4" />
          {tx("全部作品", "All work")}
        </Link>
        <p className="eyebrow mt-8 text-muted">{tx(item.categoryZh, item.categoryEn)}</p>
        <h1 className="display mt-4 max-w-4xl text-5xl md:text-7xl">{title}</h1>
        <p className="mt-6 max-w-xl text-base leading-7 text-muted">{tx(item.summaryZh, item.summaryEn)}</p>
        <div className="mt-12">
          {item.before ? (
            <Compare
              before={item.before}
              after={item.after}
              beforeLabel={beforeLabel}
              afterLabel={afterLabel}
              alt={title}
              transitionName={`garden-${item.id}`}
            />
          ) : (
            <Frame src={item.after} alt={title} className="aspect-3/2" priority transitionName={`garden-${item.id}`} />
          )}
        </div>
        <p className="mt-12 max-w-2xl text-base leading-8">{tx(item.storyZh, item.storyEn)}</p>
        <div className="mt-16 flex flex-wrap items-center justify-between gap-6 border-t border-line pt-8">
          <Link to="/inquire" className="tap inline-flex min-h-11 items-center bg-accent px-6 text-sm text-accent-fg">
            {tx("谈谈这块地", "Talk about this ground")}
          </Link>
          {next && next.id !== item.id ? (
            <button
              type="button"
              className="group inline-flex min-h-11 items-center gap-2 text-sm"
              onClick={() => open("/garden/$id", { id: next.id })}
            >
              {tx("下一件", "Next")} · {lang === "zh" ? next.titleZh : next.titleEn}
              <ArrowUpRight className="size-4" />
            </button>
          ) : null}
        </div>
      </article>
    </Page>
  );
}
