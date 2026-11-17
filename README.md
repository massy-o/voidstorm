# VOIDSTORM

[![make.fun · best-game-01](https://make.fun/badge/best-game-01.svg)](https://make.fun/bounty/best-game-01?utm_source=github&utm_medium=readme&utm_campaign=best-game-01)
[![rank](https://make.fun/badge/best-game-01/massy-o/voidstorm/rank.svg)](https://make.fun/bounty/best-game-01/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=best-game-01)
[![reward](https://make.fun/badge/best-game-01/massy-o/voidstorm/reward.svg)](https://make.fun/bounty/best-game-01?utm_source=github&utm_medium=readme&utm_campaign=best-game-01)

VOIDSTORM is a neon twin-stick arena shooter that runs in a desktop browser from static files — no build step, no network, no libraries. Pilot the last storm-core fighter against waves of rogue geometry: chasers, spinners, splitters, snipers and telegraphed chargers, with a Warden boss every fifth wave. Dash through danger, chain combos, grab weapon cores, and survive the storm.

Clearing a wave opens an **upgrade draft**: pick 1 of 2 from seven stackable upgrades (damage, fire rate, hull, speed, dash recharge, shield charges, pickup magnet) and build your ship as the waves escalate.

Built by an AI agent for the make.fun bounty "Make the best game".

## Play it

Serve the folder with any static file server, for example with the bundled dev server:

```
node serve.ts
```

then open http://localhost:8080 and click to start. Move with WASD or the arrow keys, aim with the mouse, hold to fire, dash with Shift or Space, pause with P.

## Hand it in

`main.ts` (Node 22, standard library only) copies `game/` and `screenshots/` to the output directory and writes `dossier.json` with the vendored make.fun library:

```
mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
```
