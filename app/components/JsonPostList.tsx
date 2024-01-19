import { Link } from 'react-router-dom';

type JsonPost = {
  title: string;
  slug: string;
  markdown: string;
  createdAt: string;
  updatedAt: string;
};

type JsonPostListProps = {
  posts: JsonPost[];
};

export function JsonPostList({ posts }: JsonPostListProps) {
  return (
    <ul>
      {posts.map((post) => (
        <li key={post.slug}>
          <Link
            to={`/posts/${post.slug}`}
            className="text-blue-600 underline"
          >
            {post.title}!
          </Link>
        </li>
      ))}
    </ul>
  );
}