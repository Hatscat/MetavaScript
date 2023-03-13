import { element } from "./dom.ts";
import { replaceAllTmpVarNames } from "./variables.ts";

type SrcProps = {
  css?: string;
  html?: string | string[];
  js?: string;
  outputPath?: string;
};

const DEFAULT_OUTPUT_PATH = "dist";

export async function writeHtmlBundle(
  { css, html, js, outputPath = DEFAULT_OUTPUT_PATH }: SrcProps,
): Promise<void> {
  const src = replaceAllTmpVarNames([
    css ? element("style", { children: css, closed: true }) : "",
    html ? Array.isArray(html) ? html.join("") : html : "",
    js ? element("script", { children: js, closed: true }) : "",
  ].join(""));

  await Deno.mkdir(outputPath, { recursive: true });

  Deno.writeTextFile(`${outputPath}/index.html`, src, { create: true });
}

export async function loadPublicFiles(
  sourcePath = "public",
  targetPath = DEFAULT_OUTPUT_PATH,
): Promise<void> {
  for await (const dirEntry of Deno.readDir(sourcePath)) {
    const entrySourcePath = `${sourcePath}/${dirEntry.name}`;
    const entryTargetPath = `${targetPath}/${dirEntry.name}`;

    if (dirEntry.isFile) {
      await Deno.mkdir(targetPath, { recursive: true });
      await Deno.copyFile(entrySourcePath, entryTargetPath);
    } else {
      await loadPublicFiles(entrySourcePath, entryTargetPath);
    }
  }
}
