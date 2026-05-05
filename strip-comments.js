const fs = require("fs");
const path = require("path");
const strip = require("strip-comments");

const folders = ["./frontend/src", "./backend/src"];

function walk(dir) {
  const files = fs.readdirSync(dir);

  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      walk(fullPath);
    } else if (/\.(js|jsx|ts|tsx)$/.test(fullPath)) {
      const code = fs.readFileSync(fullPath, "utf-8");
      const cleaned = strip(code);
      fs.writeFileSync(fullPath, cleaned, "utf-8");
      console.log(`Cleaned: ${fullPath}`);
    }
  }
}

for (const folder of folders) {
  if (fs.existsSync(folder)) {
    walk(folder);
  }
}
