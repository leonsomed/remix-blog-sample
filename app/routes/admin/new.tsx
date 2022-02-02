import {
  ActionFunction,
  ErrorBoundaryComponent,
  Form,
  json,
  redirect,
  useActionData,
  useTransition,
} from "remix";
import invariant from "tiny-invariant";
import { createPost } from "../post.server";

type PostError = {
  title?: boolean;
  slug?: boolean;
  markdown?: boolean;
};

export const action: ActionFunction = async ({ request }) => {
  throw new Error("sssss");
  try {
    await new Promise((res) => setTimeout(res, 1000));

    const formData = await request.formData();

    const title = formData.get("title");
    const slug = formData.get("slug");
    const markdown = formData.get("markdown");

    const errors: PostError = {};
    if (!title) errors.title = true;
    if (!slug) errors.slug = true;
    if (!markdown) errors.markdown = true;

    if (Object.keys(errors).length) {
      return errors;
    }

    invariant(typeof title === "string");
    invariant(typeof slug === "string");
    invariant(typeof markdown === "string");

    throw new Error("xxxx");

    await createPost({
      title: title as string,
      slug: slug as string,
      markdown: markdown as string,
    });

    return redirect("/admin");
  } catch (error) {
    return json(
      { message: "Sorry, we couldn't create the thing" },
      {
        status: 500,
      }
    );
  }
};

export default function NewPost() {
  const errors = useActionData();
  const transition = useTransition();

  console.log(errors);

  return (
    <>
      <Form method="post">
        <p>
          <label>
            Post Title: {errors?.title ? <em>Title is required</em> : null}
            <input type="text" name="title" />
          </label>
        </p>
        <p>
          <label>
            Post Slug: {errors?.slug ? <em>Slug is required</em> : null}
            <input type="text" name="slug" />
          </label>
        </p>
        <p>
          <label htmlFor="markdown">Markdown:</label>{" "}
          {errors?.markdown ? <em>Markdown is required</em> : null}
          <br />
          <textarea rows={20} name="markdown" />
        </p>
        <p>
          <button type="submit" disabled={Boolean(transition.submission)}>
            {transition.submission ? "Creating..." : "Create Post"}
          </button>
        </p>
      </Form>
      {errors ? <p>{errors.message}</p> : null}
    </>
  );
}

export const ErrorBoundary: ErrorBoundaryComponent = ({ error, ...props }) => {
  return (
    <div>
      <h1>Error</h1>
      <p>{error.message}</p>
      <p>The stack trace is:</p>
      <pre>{error.stack}</pre>

      {props.children}
    </div>
  );
};
