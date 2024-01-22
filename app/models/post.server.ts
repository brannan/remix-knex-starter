import db from "../../knex/db";

export interface Post {
  title: string;
  slug: string;
  markdown: string;
  createdAt: Date;
  updatedAt: Date;
};

export async function getPosts(): Promise<Array<Post>> {
  return db<Post>('Post').select();
}

export async function getPost(slug: string) {
  return db<Post>("Post").select("*").where({ slug }).first();
}

export function createPost(
  post: Pick<Post, "slug" | "title" | "markdown">
) {
  return db<Post>("Post").insert({
    ...post,
    createdAt: new Date(),
    updatedAt: new Date()
  });
}

export function updatePost(
  post: Pick<Post, "slug" | "title" | "markdown">
) {
  return db<Post>("Post").where({ slug: post.slug }).update({
    ...post,
    createdAt: new Date(),
    updatedAt: new Date()
  });
}
