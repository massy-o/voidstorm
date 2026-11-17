// VOIDSTORM (best-game-01 entry, Node 22, standard library only): the game is this directory's
// game/ folder, plain static files a desktop browser loads offline (game/index.html, a single
// self-contained canvas game with no library and no network request), and the program hands it in.
// It copies game/ and screenshots/ from beside this file to /output and writes /output/dossier.json,
// the summary the judge reads, with the vendored make.fun library. VOIDSTORM is a neon twin-stick
// arena shooter: waves of geometric enemies, dash with i-frames, weapon cores, NOVA bombs, golden
// elites, special formation waves, a Warden boss every 5th wave, and an upgrade draft between waves.
//
// Serve it locally with `node serve.ts`, then open http://localhost:8080.
// Outside the grader's container, MAKEFUN_OUTPUT_DIR stands in for /output:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { cpSync, existsSync, mkdirSync, readdirSync, statSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { buildDossier } from './vendor/makefun-game.ts';

const here = fileURLToPath(new URL('.', import.meta.url));
const out = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

mkdirSync(out, { recursive: true });
cpSync(join(here, 'game'), join(out, 'game'), { recursive: true });
mkdirSync(join(out, 'screenshots'), { recursive: true });
if (existsSync(join(here, 'screenshots'))) cpSync(join(here, 'screenshots'), join(out, 'screenshots'), { recursive: true });

// VOIDSTORM's own pre-flight check: the scorer refuses an entry with no screenshots or one
// over 256 KiB, so fail loudly here instead of shipping a dossier the judge cannot read.
const shots = existsSync(join(here, 'screenshots'))
  ? readdirSync(join(here, 'screenshots')).filter((f) => /\.(png|jpe?g)$/i.test(f)).sort()
  : [];
if (shots.length === 0) throw new Error('no screenshots in screenshots/ (need 1-4)');
if (shots.length > 4) throw new Error(`too many screenshots: ${shots.length} (max 4)`);
for (const f of shots) {
  const bytes = statSync(join(here, 'screenshots', f)).size;
  if (bytes > 262144) throw new Error(`screenshot ${f} is ${bytes} bytes (max 262144)`);
}

// The scorer's own caps (reference/gate.json): only text_max_bytes shapes the bytes; the others refuse an entry the
// scorer would refuse (more than 4 screenshots or one over 256 KiB; more than 993 files in game/ or 48 MiB of game
// files, in all, or a path under game/ over 1000 bytes: game/ counts beside /output's own 1000-entry cap, its
// screenshots/ and dossier.json).
writeFileSync(
  join(out, 'dossier.json'),
  buildDossier(out, {
    text_max_bytes: 163840,
    screenshots: { max: 4, max_bytes: 262144 },
    game_max_files: 993,
    game_max_bytes: 50331648,
    game_path_max_bytes: 1000,
  }),
);
console.log(`VOIDSTORM dossier written: ${shots.length} screenshots (${shots.join(', ')})`);
