import { json } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { JsonPostList } from "~/components/JsonPostList"
import { getPosts } from "~/models/post.server";

export const loader = async () => {
  return json({ posts: await getPosts() })
};

export default function Posts() {
  const { posts } = useLoaderData<typeof loader>();
  return (
    <main>
      <div className="mx-auto max-w-4xl">
        <h1 className="my-6 mb-2 border-b-2 text-center text-3xl">Posts</h1>
        <JsonPostList posts={posts} />
        <Link
          to="admin"
          className="inline-block px-4 py-2 my-4 text-white bg-red-600 rounded hover:bg-red-700"
        >
          Admin
        </Link>
      </div>
    </main>
  );
};