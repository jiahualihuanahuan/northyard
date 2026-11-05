import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { Page } from "@/components/chrome";
import { pageHead } from "@/lib/seo";
import { AREAS, SERVICES } from "@/lib/services";
import { useSite } from "@/lib/site";

export const Route = createFileRoute("/services/")({
  head: () =>
    pageHead({
      title: "Landscape Services in Toronto & York Region — Jenny Bu",
      description: `Landscape design, pools and water, outdoor kitchens and property advisory for homes in ${AREAS}.`,
      path: "/services",
    }),
  component: ServicesIndex,
});

function ServicesIndex() {
  const { t, tx } = useSite();
  return (
    <Page>
      <main className="px-5 pt-28 pb-24 md:px-8 lg:px-12">
        <p className="eyebrow text-muted">{tx("服务", "Services")}</p>
        <h1 className="display mt-4 max-w-4xl text-5xl md:text-7xl">
          {tx("四件事，都落在同一块地上。", "Four kinds of work, one property.")}
        </h1>
        <p lang="zh" className="bilingual-sub mt-4 text-lg text-muted">
          四件事，都落在同一块地上。
        </p>
        <p className="mt-6 max-w-xl text-base leading-7 text-muted">
          {tx(
            "服务多伦多与约克区的住宅，包括北约克、万锦、列治文山、旺市、奥罗拉与索恩希尔。",
            `For homes in ${AREAS}.`,
          )}
        </p>
        <div className="mt-16 border-t border-line">
          {SERVICES.map((service, index) => (
            <Link
              key={service.slug}
              to="/services/$slug"
              params={{ slug: service.slug }}
              className="group grid gap-3 border-b border-line py-8 md:grid-cols-12 md:items-baseline"
            >
              <span className="eyebrow text-muted md:col-span-1">0{index + 1}</span>
              <span className="display text-4xl md:col-span-5">{t(service.headline)}</span>
              <span className="text-sm leading-6 text-muted md:col-span-5">{t(service.lead)}</span>
              <span className="inline-flex min-h-11 items-center gap-2 text-sm md:col-span-1 md:justify-end">
                {tx("查看", "View")}
                <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </span>
            </Link>
          ))}
        </div>
      </main>
    </Page>
  );
}
