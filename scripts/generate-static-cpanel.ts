import fs from 'fs';
import path from 'path';
import { generateCPanelFiles } from '../src/utils/cpanelHtmlGenerator';

const files = generateCPanelFiles();
const rootDir = process.cwd();

console.log(`Generating ${files.length} static cPanel files into disk...`);

files.forEach((file) => {
  const targetPath = path.join(rootDir, file.fullPath);
  const targetDir = path.dirname(targetPath);

  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }

  fs.writeFileSync(targetPath, file.content, 'utf-8');
  console.log(`✓ Created: ${file.fullPath} (${file.content.length} bytes)`);
});

console.log('All static files for cPanel public_html successfully generated on disk!');
