import { Link, LoaderFunction, Outlet, useLoaderData } from "remix";
import type { Post } from "./post.server";
import { getPosts } from "./post.server";
import adminStyles from "../styles/admin.css";
import Test from "~/components/test";

export const loader: LoaderFunction = () => {
  return getPosts();
};

export const links = () => {
  return [{ rel: "stylesheet", href: adminStyles }];
};

export default function Admin() {
  const posts = useLoaderData<Post[]>();

  return (
    <div className="admin">
      <nav>
        <h1>Admin</h1>
        <Test />
        <ul>
          {posts.map((post) => (
            <li key={post.slug}>
              <Link to={`/posts/${post.slug}`}>{post.title}</Link>
            </li>
          ))}
        </ul>
      </nav>
      <main>
        <Outlet />
      </main>
    </div>
  );
}
