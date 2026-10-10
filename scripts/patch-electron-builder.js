const fs = require('fs');
const path = require('path');

const targetFile = path.join(__dirname, '..', 'node_modules', 'app-builder-lib', 'out', 'targets', 'snap', 'core24.js');

if (fs.existsSync(targetFile)) {
    let content = fs.readFileSync(targetFile, 'utf8');
    const target1 = 'desktop: `meta/gui/${desktopBaseName}.desktop`,';
    const target2 = 'this.packager.executableName + " %U"';

    let modified = false;
    if (content.includes(target1)) {
        content = content.replace(target1, '');
        modified = true;
    }
    if (content.includes(target2)) {
        content = content.replace(target2, 'snap.name + " %U"');
        modified = true;
    }

    if (modified) {
        fs.writeFileSync(targetFile, content, 'utf8');
        console.log('[patch] Successfully applied electron-builder PR #10176 core24 desktop fix.');
    } else {
        console.log('[patch] core24.js already patched.');
    }
} else {
    console.log('[patch] app-builder-lib core24.js not found, skipping patch.');
}
