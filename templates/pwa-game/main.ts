import { writeHtmlBundle } from "./src/deps.ts";
import { getGameSrc } from "./src/index.ts";

writeHtmlBundle(getGameSrc());
