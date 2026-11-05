import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { JsonLd } from "@/components/json-ld";
import { Page } from "@/components/chrome";
import { Frame } from "@/components/frame";
import { SITE_URL } from "@/lib/content";
import { breadcrumbLd, pageHead } from "@/lib/seo";
import { getListing, LISTINGS } from "@/lib/ventures";
import { useSite } from "@/lib/site";

export const Route = createFileRoute("/listings/$mls")({
  beforeLoad: ({ params }) => {
    if (!getListing(params.mls)) throw notFound();
  },
  head: ({ params }) => {
    const listing = getListing(params.mls);
    if (!listing) return {};
    return pageHead({
      title: `${listing.address}, ${listing.area.en} — ${listing.price}`,
      description: `${listing.summary.en} MLS ${listing.mls}.`,
      path: `/listings/${listing.mls}`,
    });
  },
  component: ListingPage,
});

function ListingPage() {
  const { mls } = Route.useParams();
  const listing = getListing(mls) ?? LISTINGS[0];
  const { t, tx } = useSite();
  const url = `${SITE_URL}/listings/${listing.mls}`;
  return (
    <Page>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "RealEstateListing",
          name: listing.address,
          url,
          datePosted: listing.listed,
          image: `${SITE_URL}${listing.image}`,
          description: listing.summary.en,
          address: {
            "@type": "PostalAddress",
            streetAddress: listing.address,
            addressLocality: listing.city,
            addressRegion: listing.region,
            postalCode: listing.postal,
            addressCountry: "CA",
          },
          identifier: { "@type": "PropertyValue", name: "MLS", value: listing.mls },
          offers: {
            "@type": "Offer",
            price: listing.priceValue,
            priceCurrency: "CAD",
            url,
          },
        }}
      />
      <JsonLd
        data={breadcrumbLd([
          { name: "Jenny Bu", path: "/" },
          { name: "For sale", path: "/#also" },
          { name: listing.address, path: `/listings/${listing.mls}` },
        ])}
      />
      <main>
        <Frame src={listing.image} alt={t(listing.alt)} className="case-hero" priority />
        <section className="grid gap-10 px-5 py-20 md:grid-cols-12 md:px-8 lg:px-12">
          <div className="md:col-span-6">
            <p className="eyebrow text-muted">
              <Link to="/" hash="also" className="hover:text-ink">
                {tx("在售", "For sale")}
              </Link>
            </p>
            <h1 className="display mt-4 text-4xl md:text-6xl">{listing.address}</h1>
            <p className="mt-4 text-base text-muted">
              {t(listing.area)} · {listing.postal}
            </p>
            <p className="display mt-6 text-3xl">{listing.price}</p>
            <p className="mt-2 text-sm text-muted">MLS {listing.mls}</p>
          </div>
          <div className="md:col-span-5 md:col-start-8">
            <p className="text-base leading-7 text-muted">{t(listing.summary)}</p>
            <Link
              to="/contact"
              search={{ type: "listing", about: `${listing.address}, MLS ${listing.mls}` }}
              className="group mt-8 inline-flex min-h-11 items-center gap-2 text-sm"
            >
              {tx("问这套房", "Ask about this house")}
              <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>
        </section>
        <section className="grid gap-12 border-t border-line px-5 py-16 md:grid-cols-12 md:px-8 lg:px-12">
          <dl className="md:col-span-5">
            {listing.facts.map((fact) => (
              <div key={fact.label.en} className="grid grid-cols-2 gap-4 border-b border-line py-3 text-sm">
                <dt className="text-muted">{t(fact.label)}</dt>
                <dd>{t(fact.value)}</dd>
              </div>
            ))}
          </dl>
          <div className="md:col-span-6 md:col-start-7">
            {listing.body.map((paragraph) => (
              <p key={paragraph.en} className="mt-5 text-base leading-7 text-muted first:mt-0">
                {t(paragraph)}
              </p>
            ))}
            <p className="mt-8 text-sm leading-6 text-muted">
              {tx("挂牌上的学校：", "Schools named on the listing: ")}
              {listing.schools.join(", ")}.
            </p>
            <p className="mt-6 text-sm leading-6 text-muted">
              {tx(
                "数字来自公开挂牌，出价前请再确认。这不是估价。",
                "Figures are from the public listing. Confirm them before an offer. This is not an appraisal.",
              )}
            </p>
          </div>
        </section>
      </main>
    </Page>
  );
}
