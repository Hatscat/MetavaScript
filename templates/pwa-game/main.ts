import { writeHtmlBundle } from "../../src/output.ts";
import { getGameSrc } from "./src/index.ts";

writeHtmlBundle(getGameSrc());
