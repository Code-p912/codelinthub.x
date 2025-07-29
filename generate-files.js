import fs from 'fs';
import path from 'path';

// List of files to include in the GitHub upload
const filesToInclude = [
  'package.json',
  'tsconfig.json',
  'tsconfig.app.json',
  'tsconfig.node.json',
  'vite.config.ts',
  'tailwind.config.js',
  'postcss.config.js',
  'eslint.config.js',
  'index.html',
  'README.md',
  'LICENSE',
  'src/main.tsx',
  'src/App.tsx',
  'src/index.css',
  'src/vite-env.d.ts'
];

console.log('='.repeat(80));
console.log('CODELINTHUB - FILES FOR GITHUB UPLOAD');
console.log('='.repeat(80));
console.log('');

filesToInclude.forEach((filePath, index) => {
  console.log(`\n${'='.repeat(60)}`);
  console.log(`FILE ${index + 1}: ${filePath}`);
  console.log(`${'='.repeat(60)}`);
  
  try {
    const fullPath = path.join(process.cwd(), filePath);
    const content = fs.readFileSync(fullPath, 'utf8');
    console.log(content);
  } catch (error) {
    console.log(`Error reading file: ${error.message}`);
  }
  
  console.log(`\n${'='.repeat(60)}`);
  console.log(`END OF ${filePath}`);
  console.log(`${'='.repeat(60)}\n`);
});

console.log('\n' + '='.repeat(80));
console.log('INSTRUCTIONS FOR GITHUB UPLOAD:');
console.log('='.repeat(80));
console.log('1. Create a new repository on GitHub');
console.log('2. For each file above, create a new file in GitHub with the exact filename');
console.log('3. Copy the content between the separator lines');
console.log('4. Make sure to maintain the folder structure (src/ files go in src folder)');
console.log('5. Commit all files');
console.log('='.repeat(80));