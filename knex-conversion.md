# Converting from Prisma to Knex

```bash
npm install knex sqlite3
npx knex init # Creates knexfile.js
```

## Rename knexfile.js to knexfile.ts and fix

```
import knex from "knex";

const config = {
  client: 'sqlite3',
  connection: {
    filename: './prisma/data.db'
  }
}

export default knex(config);
```

## Use Knex in Server

```
import knex from "../../knexfile";

interface Post {
  title: string;
  slug: string;
  markdown: string;
  createdAt: Date;
  updatedAt: Date;
};

export async function getPosts(): Promise<Array<Post>> {
  return knex<Post>('Post').select();
}

export async function getPost(slug: string) {
  return knex<Post>("Post").select("*").where({ slug }).first();
}

export function createPost(
  post: Pick<Post, "slug" | "title" | "markdown">
) {
  return knex<Post>("Post").insert({
    ...post, 
    createdAt: new Date(), 
    updatedAt: new Date()
  });
}
```