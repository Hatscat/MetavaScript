import { Text } from "./deps.ts";

export const config = {
  headerHeight: 48,
  player: {
    icon: Text("🤖"),
    radius: 32,
    positionX: 32 + 80,
    speed: 2,
  },
  target: {
    icon: Text("👾"),
    radius: 64,
    offsetX: 64 + 80,
    speed: 2,
  },
};
