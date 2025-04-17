const fs = require("fs");
const path = require("path");

const template = fs.readFileSync("template.html", "utf-8");
const products = JSON.parse(fs.readFileSync("products.json", "utf-8"));
const outputDir = path.join(__dirname, "products");

if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir);

products.forEach(product => {
  const thumbnails = product.media.map((src, i) => {
    const border = i === 0 ? "border-blue-500" : "border-transparent hover:border-blue-500";
    return `<img src="/${src}" class="thumbnail w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-md cursor-pointer border-2 ${border}" onclick="changeImage(this)" alt="thumb${i}" />`;
  }).join("\n");

  const page = template
    .replace(/{{arabic_name}}/g, product.arabic_name)
    .replace(/{{english_name}}/g, product.english_name)
    .replace(/{{price_usd}}/g, product.price_usd)
    .replace(/{{image}}/g, product.image)
    .replace(/{{thumbnails}}/g, thumbnails);

  const filePath = path.join(outputDir, `${product.id}.html`);
  fs.writeFileSync(filePath, page);
  console.log("✅ Generated:", filePath);
});
