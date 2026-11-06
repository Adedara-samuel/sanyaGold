import { getService } from "@/lib/data";

export async function GET(_request: Request, ctx: RouteContext<"/api/services/[slug]">) {
  const { slug } = await ctx.params;
  const service = await getService(slug);
  if (!service) return Response.json({ error: "Service not found" }, { status: 404 });
  return Response.json(service);
}
