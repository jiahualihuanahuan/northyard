import { createFileRoute } from "@tanstack/react-router";
import { HomePage } from "@/components/home-page";
import { HOME_DESCRIPTION, HOME_TITLE, pageHead } from "@/lib/seo";

export const Route = createFileRoute("/")({
  head: () => pageHead({ title: HOME_TITLE, description: HOME_DESCRIPTION, path: "/" }),
  component: HomePage,
});
