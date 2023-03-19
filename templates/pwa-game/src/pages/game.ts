import { actions, dispatch } from "../data-store/mutator.ts";
import { GameState } from "../data-store/state.ts";
import {
  assign,
  defineFunc,
  element,
  execFunc,
  INLINE_EVENT_ARG_NAME,
  prop,
  setInnerHtml,
  statements,
  Text,
} from "../deps.ts";
import {
  canvasContext,
  domElementIds,
  functions,
  state,
} from "../variables.ts";

export function defineGamePage() {
  return defineFunc(
    {
      name: functions.goToGamePage,
      body: statements(
        setInnerHtml(domElementIds.page, [
          element("canvas", {
            tagProps: {
              id: domElementIds.canvas,
              onpointermove: Text(pointerMoveHandler()),
              onclick: Text(clickHandler()),
            },
          }),
        ]),
        assign(
          prop(domElementIds.headerTitle, "innerText"),
          Text("Game Template"),
        ),
        assign(
          state.gameState,
          GameState.Play,
        ),
        canvasSetup(),
      ),
    },
  );
}

function canvasSetup() {
  return statements(
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
  );
}

// function createBgImg(): string {
//   // backgroundImage=new OffscreenCanvas(w*2,h);(x=backgroundImage.getContext`2d`).fillStyle='#fff';for(i=3e3;i--;x.fillRect(r%w,r/w,2,2),x.fillRect(w+r%w,r/w,2,2))r=Math.random()*w*h
//   return;
// }

function pointerMoveHandler(): string {
  return dispatch(actions.setPointer(prop(INLINE_EVENT_ARG_NAME, "offsetY")));
}

function clickHandler(): string {
  return dispatch(actions.firePlayerBullet());
}
