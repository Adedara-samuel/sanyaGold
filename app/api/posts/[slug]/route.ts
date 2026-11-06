import { getPost } from "@/lib/data";

export async function GET(_request: Request, ctx: RouteContext<"/api/posts/[slug]">) {
  const { slug } = await ctx.params;
  const post = await getPost(slug);
  if (!post) return Response.json({ error: "Post not found" }, { status: 404 });
  return Response.json(post);
}
