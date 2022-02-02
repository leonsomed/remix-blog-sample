import { renderToString } from "react-dom/server";
import { HandleDataRequestFunction, RemixServer } from "remix";
import type { EntryContext } from "remix";

export default function handleRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  remixContext: EntryContext
) {
  const markup = renderToString(
    <RemixServer context={remixContext} url={request.url} />
  );

  responseHeaders.set("Content-Type", "text/html");

  return new Response("<!DOCTYPE html>" + markup, {
    status: responseStatusCode,
    headers: responseHeaders,
  });
}

export const handleDataRequest: HandleDataRequestFunction = (
  response: Response,
  { request, params, context }
) => {
  console.log("hey entry point");
  console.log(context);
  response.headers.set("x-custom", "yay!");
  return response;
};
