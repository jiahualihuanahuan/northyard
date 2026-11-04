import { createFileRoute, redirect } from "@tanstack/react-router";

// Legacy URL: /garden/:id moved to /work/:id.
export const Route = createFileRoute("/garden/$id")({
  beforeLoad: ({ params }) => {
    throw redirect({ to: "/work/$id", params: { id: params.id }, statusCode: 301 });
  },
});
