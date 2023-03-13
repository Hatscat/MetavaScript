import { serve } from "https://deno.land/std@0.178.0/http/server.ts";
import { serveDir } from "https://deno.land/std@0.178.0/http/file_server.ts";
import { loadPublicFiles, writeHtmlBundle } from "./src/deps.ts";
import { getGameSrc } from "./src/index.ts";

await Promise.all([
  loadPublicFiles(),
  writeHtmlBundle(getGameSrc()),
]);

if (Deno.args[0] === "serve") {
  serve((req) => {
    return serveDir(req, {
      fsRoot: "dist",
    });
  });
}
