import { readdir, unlink, stat, rename } from 'fs/promises';
import sharp from 'sharp';
import { join } from 'path'

const ASSETS_DIR = 'src/assets';
const MAX_WIDTH = 1920;
const QUALITY = 80;
const SKIP_UNDER_KB = 1024

async function optimize() {
    const files = await readdir(ASSETS_DIR);
    const jpgs = files.filter(f => /\.jpe?g$/i.test(f))

    for (const file of jpgs) {
        const filePath = join(ASSETS_DIR, file);
        const before = (await stat(filePath)).size;

        if (before < SKIP_UNDER_KB * 1024) {
            console.log(`${file}: ${(before/1024).toFixed(0)}KB - skipped (already under ${SKIP_UNDER_KB}KB)`);
            continue;
        }

        const tmpPath = filePath + '.tmp.jpg';

        await sharp(filePath)
            .rotate()
            .resize({ width: MAX_WIDTH, withoutEnlargement: true})
            .jpeg({ quality: QUALITY, mozjpeg: true })
            .toFile(tmpPath);

        await unlink(filePath);
        await rename(tmpPath, filePath);

        const after = (await stat(filePath)).size;
        const saved = ((1 - after / before) * 100).toFixed(1);
        console.log(`${file}: ${(before/1024).toFixed(0)}KB -> ${(after/1024).toFixed(0)}KB (${saved}% saved)`);
    }
}

optimize().catch(console.error)