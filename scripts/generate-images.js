import { createCanvas } from 'canvas';
import fs from 'fs';

const sizes = [16, 32, 48, 128];
const altSuffix = '-off';

sizes.forEach((size) => {
    const canvas = createCanvas(size, size);
    const ctx = canvas.getContext('2d');

    // Create the "on" state icon.
    ctx.beginPath();
    ctx.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2, false);
    ctx.fillStyle = '#00FF00';
    ctx.fill();

    const buffer = canvas.toBuffer('image/png');

    fs.writeFileSync(`icon-${size}.png`, buffer);

    console.log(`Generated icon-${size}.png`);

    // Clear the canvas.
    ctx.clearRect(0, 0, size, size);

    // Create the "off" state icon.
    ctx.beginPath();
    ctx.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2, false);
    ctx.fillStyle = '#999999';
    ctx.fill();

    const altBuffer = canvas.toBuffer('image/png');

    fs.writeFileSync(`icon-${size}${altSuffix}.png`, altBuffer);

    console.log(`Generated icon-${size}${altSuffix}.png`);
});

// Example logo.
const logoSize = 32;
const logoCanvas = createCanvas(logoSize, logoSize);
const logoCtx = logoCanvas.getContext('2d');

logoCtx.translate(logoSize / 2, logoSize / 2);
logoCtx.translate(-logoSize / 2, -logoSize / 2);

logoCtx.fillStyle = '#FFFF00';
logoCtx.fillRect(0, 0, logoSize, logoSize);

logoCtx.fillStyle = '#000000';
logoCtx.font = 'bold 14px serif';
logoCtx.textAlign = 'center';
logoCtx.textBaseline = 'middle';
logoCtx.fillText(`LO`, logoSize / 2, logoSize / 3.3);
logoCtx.fillText(`GO`, logoSize / 2, (logoSize / 2.8) * 2);

const logoBuffer = logoCanvas.toBuffer('image/png');

fs.writeFileSync('logo.png', logoBuffer);

console.log('Generated logo.png');
