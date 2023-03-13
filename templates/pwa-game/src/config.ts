import { font, Text } from "./deps.ts";

export const config = {
  headerHeight: 48,
  player: {
    icon: Text("🤖"),
    radius: 32,
    positionX: 32 + 80,
    speed: 5,
  },
  target: {
    icon: Text("👾"),
    radius: 64,
    offsetX: 64 + 80,
    speed: 500,
    hp: 3,
    recoverDelay: 300,
  },
  bullet: {
    icon: Text("⚙️"),
    radius: 8,
    speed: 9,
  },
  timer: {
    offsetY: 64,
    font: font(32),
  },
} as const;
