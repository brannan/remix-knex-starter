import { ActionFunctionArgs, LoaderFunctionArgs, json, redirect } from "@remix-run/node";
import { Form, useActionData, useLoaderData } from "@remix-run/react";
import { Post, getPost, updatePost } from "~/models/post.server";
import invariant from "tiny-invariant";

type PostFormData = Pick<Post, "slug" | "title" | "markdown"> & {
  createdAt?: string,
  updatedAt?: string
};

interface PostFormErrors {
  title: string | null,
  slug: string | null,
  markdown: string | null
}

interface PostFormProps {
  errors: PostFormErrors | undefined,
  defaultValues: PostFormData | undefined
}
const inputClassName =
  "w-full rounded border border-gray-500 px-2 py-1 text-lg";

export const loader = async ({ params }: LoaderFunctionArgs) => {
  invariant(params.slug, "Post slug is required");
  const post = await getPost(params.slug);
  if (!post) {
    throw new Response("Not Found", { status: 404 })
  }
  return json({ post });
}

export const action = async ({
  request,
}: ActionFunctionArgs) => {
  const formData = await request.formData();

  const title = formData.get("title");
  const slug = formData.get("slug");
  const markdown = formData.get("markdown");

  invariant(typeof title === "string", "title must be a string");
  invariant(typeof slug === "string", "slug must be a string");
  invariant(typeof markdown === "string", "slug must be a string");

  const errors: PostFormErrors = {
    title: title ? null : "Title is required",
    slug: slug ? null : "Slug is required",
    markdown: slug ? null : "Markdown is required",
  };
  const hasErrors = Object.values(errors).some(
    (errorMessage) => errorMessage
  );
  if (hasErrors) {
    return json(errors);
  }

  // TODO: this is just a toy example, but what happens to the old slug if the
  // user changes it?
  await updatePost({ title, slug, markdown });

  return redirect("/posts/slug");
}


/**
 * Main element 
 */
export default function EditPost() {
  const { post } = useLoaderData<typeof loader>();
  const errors = useActionData<typeof action>();

  return (
    <PostForm errors={errors} defaultValues={post} />
  )
}

/**
  * Form to be used for both new and edit. 
  */
export function PostForm({ errors, defaultValues }: PostFormProps) {
  return (
    <Form method="post">
      <p>
        <label>
          Post Title:{" "}
          {errors?.title ? (
            <em className="text-red-600">{errors.title}</em>
          ) : null}
          <input
            type="text"
            name="title"
            defaultValue={defaultValues?.title}
            className={inputClassName}
          />
        </label>
      </p>
      <p>
        <label>
          Post Slug:{" "}
          {errors?.slug ? (
            <em className="text-red-600">{errors.slug}</em>
          ) : null}
          <input
            type="text"
            name="slug"
            defaultValue={defaultValues?.slug}
            className={inputClassName}
          />
        </label>
      </p>
      <p>
        <label htmlFor="markdown">
          Markdown:
          {errors?.markdown ? (
            <em className="text-red-600">{errors.markdown}</em>
          ) : null}
        </label>
        <br />

        <textarea
          id="markdown"
          rows={20}
          name="markdown"
          defaultValue={defaultValues?.markdown}
          className={`${inputClassName} font-mono`}
        />
      </p>
      <p className="text-right">
        <button
          type="submit"
          className="rounded bg-blue-500 py-2 px-4 text-white hover:bg-blue-600 focus:bg-blue-400 disabled:bg-blue-300"
        >
          Submit
        </button>
      </p>
    </Form>
  );
}
