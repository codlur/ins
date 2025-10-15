const fs = require('fs');
const path = require('path');
const sharp = require('sharp');
const toIco = require('to-ico');

(async () => {
  try {
    // Read the SVG file
    const svgBuffer = fs.readFileSync(path.resolve(__dirname, 'public', 'insearch.svg'));
    
    // Convert SVG to PNG buffers of different sizes
    const pngBuffers = await Promise.all([
      sharp(svgBuffer).resize(16, 16).png().toBuffer(),
      sharp(svgBuffer).resize(32, 32).png().toBuffer(),
      sharp(svgBuffer).resize(48, 48).png().toBuffer()
    ]);
    
    // Create ICO from PNG buffers
    const icoBuffer = await toIco(pngBuffers);
    
    // Write ICO file
    fs.writeFileSync(path.resolve(__dirname, 'public', 'favicon.ico'), icoBuffer);
    
    console.log('Successfully converted insearch.svg to favicon.ico');
  } catch (error) {
    console.error('Error converting SVG to ICO:', error);
  }
})();