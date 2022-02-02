import { Link, useLoaderData } from "remix";
import type { Post } from "../post.server";
import { getPosts } from "../post.server";

export async function loader() {
  return { posts: await getPosts(), date: new Date() };
}

export default function Posts() {
  const { posts, date } = useLoaderData<{ posts: Post[]; date: Date }>();
  console.log(typeof date);
  return (
    <div>
      <h1>Posts</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.slug}>
            <Link to={post.slug}>{post.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
