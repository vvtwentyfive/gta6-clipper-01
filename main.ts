// gta6-clipper-01 entry program (Node 22, standard library only).
//
// The entry itself is the video: a 28-second vertical GTA 6 clip cut from
// Rockstar's official GTA VI Launch Trailer, published on YouTube as a
// public Short. The house ranks the entry by that Short's view count, so
// this program does one job only: hand VIDEO.json (the Short's address) to
// the grader by copying it from the repository root into the output
// directory, byte for byte.
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const botDir = process.env.MAKEFUN_BOT_DIR ?? '/bot';
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

const videoPath = join(botDir, 'VIDEO.json');
const data = readFileSync(videoPath);
const video = JSON.parse(data.toString('utf8'));
if (typeof video !== 'object' || video === null || typeof video.url !== 'string') {
  throw new Error('VIDEO.json must be an object with a url string');
}
if (!video.url.startsWith('http://') && !video.url.startsWith('https://')) {
  throw new Error('VIDEO.json url must start with http:// or https://');
}

// The copy is byte-for-byte on purpose: the grader reads exactly the
// VIDEO.json the entry ships, so re-serialising here could only drift it.
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, 'VIDEO.json'), data);
