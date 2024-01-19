import { LoaderFunctionArgs, json } from "@remix-run/node";
import { getPost } from "~/models/post.server";
import { useLoaderData } from "@remix-run/react";
import { marked } from "marked";
import invariant from "tiny-invariant";

export const loader = async ({
  params
}: LoaderFunctionArgs) => {
  invariant(params.slug, "params.slug is required");

  const post = await getPost(params.slug);
  if (!post) {
    throw new Response("Not found", { status: 404 });
  }

  const html = marked(post.markdown);

  return json({ post, html });
};

export default function PostSlug() {
  const { post, html } = useLoaderData<typeof loader>();

  return (
    <main className="mx-auto max-w-4xl">
      <h1 className="my-6 border.b-2 text-center text-3xl">
        {post.title}
      </h1>
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </main>
  )
}
