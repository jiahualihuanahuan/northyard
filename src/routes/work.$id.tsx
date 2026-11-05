import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { JsonLd } from "@/components/json-ld";
import { Page } from "@/components/chrome";
import { Frame } from "@/components/frame";
import { DEFAULT_CONTENT } from "@/lib/content";
import { breadcrumbLd, pageHead } from "@/lib/seo";
import { getService } from "@/lib/services";
import { useSite } from "@/lib/site";

export const Route = createFileRoute("/work/$id")({
  beforeLoad: ({ params }) => {
    if (!DEFAULT_CONTENT.work.some((item) => item.id === params.id)) throw notFound();
  },
  head: ({ params }) => {
    const item = DEFAULT_CONTENT.work.find((w) => w.id === params.id);
    if (!item) return {};
    const title = `${item.title.en.replace(/\.$/, "")} — Jenny Bu`;
    return pageHead({
      title,
      description: item.body.en,
      path: `/work/${item.id}`,
    });
  },
  component: WorkPage,
});

function WorkPage() {
  const { id } = Route.useParams();
  const { content, t, tx } = useSite();
  const index = content.work.findIndex((item) => item.id === id);
  const item = content.work[index];

  if (!item) {
    return (
      <Page>
        <main className="px-5 pt-32 pb-24 md:px-8 lg:px-12">
          <h1 className="display text-5xl">{tx("没有这件作品。", "This project is not here.")}</h1>
          <Link to="/" hash="work" className="mt-8 inline-flex min-h-11 items-center gap-2 text-sm">
            <ArrowLeft className="size-4" />
            {tx("回到作品", "Back to the work")}
          </Link>
        </main>
      </Page>
    );
  }

  const next = content.work[(index + 1) % content.work.length];
  const service = getService(item.service);

  return (
    <Page>
      <JsonLd
        data={breadcrumbLd([
          { name: "Jenny Bu", path: "/" },
          { name: "Work", path: "/#work" },
          { name: item.title.en.replace(/\.$/, ""), path: `/work/${item.id}` },
        ])}
      />
      <main className="pt-16">
        <Frame src={item.image} alt={t(item.alt)} className="case-hero" priority />
        <section className="grid gap-8 px-5 py-20 md:grid-cols-12 md:px-8 lg:px-12">
          <div className="md:col-span-6">
            <p className="eyebrow text-muted">
              <Link to="/" hash="work" className="hover:text-ink">
                {tx("已完工项目", "Completed project")}
              </Link>
            </p>
            <h1 className="display mt-4 text-5xl md:text-6xl">{t(item.title)}</h1>
            <p lang="zh" className="bilingual-sub mt-4 text-lg text-muted">
              {item.title.zh}
            </p>
          </div>
          <div className="md:col-span-5 md:col-start-8">
            <p className="text-base leading-7 text-muted">{t(item.body)}</p>
            <p className="mt-5 text-base leading-7 text-muted">{t(item.detail)}</p>
            {service ? (
              <p className="mt-6 text-sm leading-6">
                <Link to="/services/$slug" params={{ slug: service.slug }} className="underline">
                  {t(service.nav)}
                </Link>
                <span className="text-muted">
                  {" "}
                  {tx("· 多伦多与约克区", "· Toronto and York Region")}
                </span>
              </p>
            ) : null}
            <Link to="/contact" className="tap mt-8 inline-flex min-h-11 items-center bg-accent px-6 text-sm text-accent-fg">
              {tx("咨询类似项目", "Discuss a similar project")}
            </Link>
          </div>
        </section>
        <nav className="flex flex-wrap justify-between gap-4 border-t border-line px-5 py-10 md:px-8 lg:px-12">
          <Link to="/" hash="work" className="inline-flex min-h-11 items-center gap-2 text-sm">
            <ArrowLeft className="size-4" />
            {tx("全部作品", "All work")}
          </Link>
          {next && next.id !== item.id ? (
            <Link to="/work/$id" params={{ id: next.id }} className="group inline-flex min-h-11 items-center gap-2 text-sm">
              {t(next.title)}
              <ArrowUpRight className="size-4" />
            </Link>
          ) : null}
        </nav>
      </main>
    </Page>
  );
}
