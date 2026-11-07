const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

function getFiles(dir, ext = '.js') {
  let files = [];
  const items = fs.readdirSync(dir, { withFileTypes: true });
  for (const item of items) {
    const full = path.join(dir, item.name);
    if (item.isDirectory()) {
      files = files.concat(getFiles(full, ext));
    } else if (item.name.endsWith(ext)) {
      files.push(full);
    }
  }
  return files;
}

const jsFiles = getFiles(path.join(__dirname, 'js'));
console.log(`Checking syntax of ${jsFiles.length} JS files with node --check...`);

let errorCount = 0;
for (const file of jsFiles) {
  try {
    execSync(`node --check "${file}"`, { stdio: 'pipe' });
  } catch (err) {
    console.error(`Syntax error in ${file}:`, err.stderr.toString());
    errorCount++;
  }
}

if (errorCount === 0) {
  console.log(`✓ All ${jsFiles.length} JS files passed syntax check!`);
} else {
  console.error(`✗ Found ${errorCount} syntax errors!`);
  process.exit(1);
}
