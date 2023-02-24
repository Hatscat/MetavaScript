#!/bin/bash

case "$1" in

  "build")
    deno run --check --allow-write main.ts
    ;;

  "dev")
    deno run --check --watch --allow-write main.ts
    ;;

  "reload-deps")
    deno cache --reload main.ts
    ;;

  *)
    echo "available commands are \"build\", \"dev\" and \"reload-deps\""
    ;;
esac
