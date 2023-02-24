import { element, expressions, setInnerHtml, Text } from "../deps.ts";
import { assign, defineFunc, execFunc, prop, statements } from "../deps.ts";
import {
  canvasContext,
  domElementIds,
  functions,
  state,
} from "../variables.ts";

export function defineGamePage() {
  return defineFunc(
    functions.goToGamePage,
    {
      body: statements(
        setInnerHtml(domElementIds.page, [
          element("canvas", {
            tagProps: {
              id: domElementIds.canvas,
              // onclick: execFunc(v.canvasClickHandler, "event"),
              // onpointermove: execFunc(v.canvasPointerMoveHandler, "event"),
            },
          }),
        ]),
        assign(
          prop(domElementIds.headerTitle, "innerText"),
          Text("Game Template"),
        ),
        canvasSetup(),
      ),
    },
  );
}

function canvasSetup() {
  return expressions(
    assign(
      prop(domElementIds.canvas, "width"),
      state.canvas.width,
    ),
    assign(
      prop(domElementIds.canvas, "height"),
      state.canvas.height,
    ),
    assign(
      canvasContext,
      execFunc(prop(domElementIds.canvas, "getContext"), "2d", {
        isTemplateLiteral: true,
      }),
    ),
    assign(prop(canvasContext, "textAlign"), Text("center")),
    assign(prop(canvasContext, "textBaseline"), Text("middle")),
    assign(prop(canvasContext, "fillStyle"), Text("#F00")),
    execFunc(prop(canvasContext, "fillRect"), [
      0,
      0,
      state.canvas.width,
      state.canvas.height,
    ]),
  );
}