import { json } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { JsonPostList } from "~/components/JsonPostList"
import { getPosts } from "~/models/post.server";
import { useOptionalUser } from "~/utils";

export const loader = async () => {
  return json({ posts: await getPosts() })
};

export default function Posts() {
  const user = useOptionalUser();
  const { posts } = useLoaderData<typeof loader>();
  return (
    <main>
      <div className="mx-auto max-w-4xl">
        <h1 className="my-6 mb-2 border-b-2 text-center text-3xl">Posts</h1>
        <JsonPostList posts={posts} />
        {user ? (
          <Link
            to="admin"
            className="inline-block px-4 py-2 my-4 text-white bg-red-600 rounded hover:bg-red-700"
          >
            Admin
          </Link>
        )
          : (
            <div className="space-y-4 sm:mx-auto sm:inline-grid sm:grid-cols-2 sm:gap-5 sm:space-y-0">
              <Link
                to="/join"
                className="flex items-center justify-center rounded-md border border-transparent bg-white px-4 py-3 text-base font-medium text-yellow-700 shadow-sm hover:bg-yellow-50 sm:px-8"
              >
                Sign up
              </Link>
              <Link
                to="/login"
                className="flex items-center justify-center rounded-md bg-yellow-500 px-4 py-3 font-medium text-white hover:bg-yellow-600"
              >
                Log In
              </Link>
            </div>
          )}
      </div>
    </main >
  );
};
