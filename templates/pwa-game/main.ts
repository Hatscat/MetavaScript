import { replaceAllTmpVarNames } from "./src/deps.ts";
import { getGameHtmlSrc } from "./src/index.ts";

const src = replaceAllTmpVarNames(getGameHtmlSrc());

await Deno.mkdir("dist", { recursive: true });

Deno.writeTextFile("dist/index.html", src, { create: true });
