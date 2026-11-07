import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { JsonLd } from "@/components/json-ld";
import { Page } from "@/components/chrome";
import { Frame } from "@/components/frame";
import { DEFAULT_CONTENT } from "@/lib/content";
import { breadcrumbLd, faqLd, pageHead, serviceLd } from "@/lib/seo";
import { SERVICES, getService } from "@/lib/services";
import { useSite } from "@/lib/site";

export const Route = createFileRoute("/services/$slug")({
  beforeLoad: ({ params }) => {
    if (!getService(params.slug)) throw notFound();
  },
  head: ({ params }) => {
    const service = getService(params.slug);
    if (!service) return {};
    return pageHead({
      title: service.title,
      description: service.description,
      path: `/services/${service.slug}`,
    });
  },
  component: ServiceRoute,
});

function ServiceRoute() {
  const { slug } = Route.useParams();
  const service = getService(slug);
  const { content, t, tx } = useSite();
  if (!service) return null;

  const related = content.work.filter((item) => item.service === service.slug);
  const others = SERVICES.filter((item) => item.slug !== service.slug);

  return (
    <Page>
      <JsonLd data={serviceLd({ name: service.title, description: service.description, path: `/services/${service.slug}` })} />
      <JsonLd data={faqLd(service.faqs)} />
      <JsonLd
        data={breadcrumbLd([
          { name: "Jenny Bu", path: "/" },
          { name: "Services", path: "/services" },
          { name: service.nav.en, path: `/services/${service.slug}` },
        ])}
      />
      <main>
        <header className="grid items-end gap-10 px-5 pt-28 pb-16 md:grid-cols-12 md:px-8 lg:px-12">
          <div className="md:col-span-7">
            <p className="eyebrow text-muted">
              <Link to="/services">{tx("服务", "Services")}</Link>
              <span> · {t(service.eyebrow)}</span>
            </p>
            <h1 className="display mt-4 text-5xl md:text-7xl">{t(service.headline)}</h1>
            <p className="mt-6 max-w-xl text-base leading-7 text-muted">{t(service.lead)}</p>
          </div>
        </header>
        <Frame src={service.image} alt={t(service.alt)} className="case-hero" priority />
        <section className="grid gap-10 px-5 py-20 md:grid-cols-12 md:px-8 lg:px-12">
          <div className="md:col-span-6">
            {service.paragraphs.map((paragraph) => (
              <p key={paragraph.en} className="mt-5 text-base leading-7 text-muted first:mt-0">
                {t(paragraph)}
              </p>
            ))}
            <Link
              to="/contact"
              search={{ type: service.contactType }}
              className="tap mt-10 inline-flex min-h-11 items-center bg-accent px-6 text-sm text-accent-fg"
            >
              {tx("咨询这类项目", "Discuss this kind of work")}
            </Link>
          </div>
          <aside className="md:col-span-5 md:col-start-8">
            <p className="eyebrow text-muted">{tx("相关完工项目", "Related completed work")}</p>
            <ul className="mt-4">
              {(related.length ? related : DEFAULT_CONTENT.work.slice(0, 2)).map((item) => (
                <li key={item.id} className="border-b border-line">
                  <Link to="/work/$id" params={{ id: item.id }} className="flex min-h-11 items-center py-3 text-sm">
                    {t(item.title)}
                  </Link>
                </li>
              ))}
            </ul>
          </aside>
        </section>
        <section className="border-t border-line px-5 py-20 md:px-8 lg:px-12">
          <h2 className="display text-4xl">{tx("先说清楚的几件事", "A few plain answers")}</h2>
          <div className="faq mt-8 max-w-3xl">
            {service.faqs.map((faq) => (
              <details key={faq.q.en}>
                <summary className="text-base">{t(faq.q)}</summary>
                <p className="pb-5 text-sm leading-6 text-muted">{t(faq.a)}</p>
              </details>
            ))}
          </div>
        </section>
        <nav className="grid border-t border-line md:grid-cols-3">
          {others.map((item) => (
            <Link
              key={item.slug}
              to="/services/$slug"
              params={{ slug: item.slug }}
              className="border-b border-line px-5 py-8 md:border-r md:px-8 lg:px-12"
            >
              <p className="eyebrow text-muted">{t(item.eyebrow)}</p>
              <p className="display mt-3 text-3xl">{t(item.headline)}</p>
            </Link>
          ))}
        </nav>
      </main>
    </Page>
  );
}
