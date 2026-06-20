import fs from "fs";
import path from "path";

const SRC = path.resolve(
  "c:/Users/FORYOUCOM/Documents/cursor/lawygo_make/lawygo/docs/feature-verification"
);
const DST = path.resolve("public/media/product");

const files = [
  { src: "03-dashboard.html", dst: "dashboard.png" },
  { src: "04-cases.html", dst: "cases.png" },
  { src: "24-legal-encyclopedia.html", dst: "encyclopedia.png", fallback: "10-board.html" },
  { src: "06-approval.html", dst: "approval.png" },
];

fs.mkdirSync(DST, { recursive: true });

for (const f of files) {
  let htmlPath = path.join(SRC, f.src);
  if (!fs.existsSync(htmlPath) && f.fallback) {
    htmlPath = path.join(SRC, f.fallback);
  }
  if (!fs.existsSync(htmlPath)) {
    console.warn("skip", f.dst);
    continue;
  }
  const html = fs.readFileSync(htmlPath, "utf8");
  const m = html.match(/src="data:image\/png;base64,([^"]+)"/);
  if (!m) {
    console.warn("no image", f.dst);
    continue;
  }
  fs.writeFileSync(path.join(DST, f.dst), Buffer.from(m[1], "base64"));
  console.log("ok", f.dst);
}
