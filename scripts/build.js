const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, '..', 'public');
const outDir = path.join(__dirname, '..', '.vercel', 'output', 'static');

function copyRecursiveSync(src, dest) {
  const stat = fs.statSync(src);

  if (stat.isDirectory()) {
    if (!fs.existsSync(dest)) {
      fs.mkdirSync(dest, { recursive: true });
    }

    for (const entry of fs.readdirSync(src)) {
      copyRecursiveSync(path.join(src, entry), path.join(dest, entry));
    }
  } else {
    fs.copyFileSync(src, dest);
  }
}

if (!fs.existsSync(srcDir)) {
  console.error(`Source directory not found: ${srcDir}`);
  process.exit(1);
}

copyRecursiveSync(srcDir, outDir);

const configDir = path.join(__dirname, '..', '.vercel', 'output');
const configFile = path.join(configDir, 'config.json');
const config = {
  version: 3,
  routes: [
    { handle: 'filesystem' },
    { src: '/.*', dest: '/index.html' }
  ]
};

fs.writeFileSync(configFile, JSON.stringify(config, null, 2), 'utf8');
console.log(`Static files copied to ${outDir}`);
console.log(`Vercel build config written to ${configFile}`);
