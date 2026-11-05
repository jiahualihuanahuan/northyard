import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { Page } from "@/components/chrome";
import { Frame } from "@/components/frame";
import { pageHead } from "@/lib/seo";
import { STAGING } from "@/lib/ventures";
import { useSite } from "@/lib/site";

export const Route = createFileRoute("/staging")({
  head: () =>
    pageHead({
      title: "Interior Staging in Toronto & York Region — Jenny Bu",
      description:
        "Interior staging for homes in Toronto and York Region. Beds, linen, light, and the small things that make a room feel finished, set for a photograph or a showing.",
      path: "/staging",
    }),
  component: StagingPage,
});

function StagingPage() {
  const { t, tx } = useSite();
  const [lead, ...rest] = STAGING.images;
  return (
    <Page>
      <main>
        <Frame src={lead.src} alt={t(lead.alt)} className="case-hero" priority />
        <section className="grid gap-8 px-5 py-20 md:grid-cols-12 md:px-8 lg:px-12">
          <div className="md:col-span-6">
            <p className="eyebrow text-muted">{t(STAGING.nav)}</p>
            <h1 className="display mt-4 text-5xl md:text-6xl">{t(STAGING.headline)}</h1>
            <p lang="zh" className="bilingual-sub mt-4 text-lg text-muted">
              {STAGING.headline.zh}
            </p>
          </div>
          <div className="md:col-span-5 md:col-start-8">
            <p className="text-base leading-7 text-muted">{t(STAGING.body)}</p>
            <p className="mt-5 text-sm leading-6 text-muted">{t(STAGING.note)}</p>
            <Link
              to="/contact"
              search={{ type: "staging" }}
              className="group mt-8 inline-flex min-h-11 items-center gap-2 text-sm"
            >
              {tx("约一次陈设", "Ask about staging")}
              <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>
        </section>
        <section className="grid gap-12 px-5 pb-24 md:grid-cols-2 md:px-8 lg:px-12">
          {rest.map((image) => (
            <figure key={image.src}>
              <Frame src={image.src} alt={t(image.alt)} className="aspect-3/2" />
              <figcaption className="eyebrow mt-4 text-muted">{t(image.caption)}</figcaption>
            </figure>
          ))}
        </section>
      </main>
    </Page>
  );
}
