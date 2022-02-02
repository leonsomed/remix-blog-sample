import { Link } from "remix";

export default function AdminIndex() {
  return (
    <div>
      <p>
        <Link to="new">Create a New Post</Link>
      </p>
    </div>
  );
}
