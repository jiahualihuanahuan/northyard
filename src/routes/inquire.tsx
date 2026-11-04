import { createFileRoute, redirect } from "@tanstack/react-router";

// Legacy URL: /inquire moved to /contact.
export const Route = createFileRoute("/inquire")({
  beforeLoad: () => {
    throw redirect({ to: "/contact", statusCode: 301 });
  },
});
