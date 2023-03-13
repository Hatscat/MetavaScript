#!/bin/bash

case "$1" in

  "build")
    deno run --check --allow-read --allow-write main.ts
    ;;

  "dev")
    deno run --check --watch --allow-read --allow-write --allow-net main.ts serve
    ;;

  "reload-deps")
    deno cache --reload main.ts
    ;;

  *)
    echo "available commands are \"build\", \"dev\" and \"reload-deps\""
    ;;
esac
