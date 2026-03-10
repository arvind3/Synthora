import fs from "node:fs";
import path from "node:path";
import pptxgen from "pptxgenjs";

const rootDir = path.resolve(path.dirname(new URL(import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, "$1")));
const assetsDir = path.join(rootDir, "assets");
const outputPath = path.join(rootDir, "synthora-product-launch.pptx");

const colors = {
  ink: "0F172A",
  muted: "64748B",
  line: "E2E8F0",
  bg: "F8FAFC",
  bgSoft: "F0F9F6",
  brand: "00B899",
  brandDark: "009980",
  brandSoft: "CCF5EE",
  accent: "F04F23",
  accentSoft: "FFF0EC",
  white: "FFFFFF",
  navy: "10203A"
};

const assets = {
  home: path.join(assetsDir, "home-overview.png"),
  explore: path.join(assetsDir, "explore-browser.png"),
  builder: path.join(assetsDir, "dataset-builder.png"),
  export: path.join(assetsDir, "export-workflow.png")
};

for (const filePath of Object.values(assets)) {
  if (!fs.existsSync(filePath)) {
    throw new Error(`Missing asset: ${filePath}`);
  }
}

const pptx = new pptxgen();
pptx.layout = "LAYOUT_WIDE";
pptx.author = "OpenAI Codex";
pptx.company = "Synthora";
pptx.subject = "Synthora product launch";
pptx.title = "Synthora - Product Launch";
pptx.lang = "en-US";
pptx.theme = {
  headFontFace: "Aptos Display",
  bodyFontFace: "Aptos",
  lang: "en-US"
};

function base(slide, eyebrow = "PRODUCT LAUNCH") {
  slide.background = { color: colors.bg };
  slide.addShape(pptx.ShapeType.rect, {
    x: 0,
    y: 0,
    w: 13.333,
    h: 0.18,
    fill: { color: colors.brand },
    line: { color: colors.brand }
  });
  slide.addText(eyebrow, {
    x: 0.65,
    y: 0.34,
    w: 3,
    h: 0.22,
    fontSize: 10,
    bold: true,
    color: colors.brandDark,
    charSpace: 0.8
  });
  slide.addText("Synthora", {
    x: 11.25,
    y: 0.32,
    w: 1.2,
    h: 0.2,
    fontSize: 10,
    bold: true,
    color: colors.muted,
    align: "right"
  });
}

function title(slide, main, sub = "") {
  slide.addText(main, {
    x: 0.65,
    y: 0.74,
    w: 8.4,
    h: 0.72,
    fontFace: "Aptos Display",
    fontSize: 24,
    bold: true,
    color: colors.ink
  });
  if (sub) {
    slide.addText(sub, {
      x: 0.65,
      y: 1.43,
      w: 8.2,
      h: 0.38,
      fontSize: 11,
      color: colors.muted
    });
  }
}

function screenshot(slide, filePath, x, y, w, h) {
  slide.addShape(pptx.ShapeType.roundRect, {
    x: x - 0.04,
    y: y - 0.04,
    w: w + 0.08,
    h: h + 0.08,
    rectRadius: 0.08,
    fill: { color: colors.white },
    line: { color: colors.line, pt: 1 }
  });
  slide.addImage({ path: filePath, x, y, w, h });
}

function stat(slide, x, y, w, label, value) {
  slide.addShape(pptx.ShapeType.roundRect, {
    x,
    y,
    w,
    h: 0.96,
    rectRadius: 0.08,
    fill: { color: colors.white },
    line: { color: colors.line, pt: 1 }
  });
  slide.addText(label, {
    x: x + 0.16,
    y: y + 0.15,
    w: w - 0.3,
    h: 0.16,
    fontSize: 9.5,
    bold: true,
    color: colors.muted
  });
  slide.addText(value, {
    x: x + 0.16,
    y: y + 0.42,
    w: w - 0.3,
    h: 0.26,
    fontSize: 18,
    bold: true,
    color: colors.ink
  });
}

function featureCard(slide, x, y, w, h, head, body, accent = colors.brand) {
  slide.addShape(pptx.ShapeType.roundRect, {
    x,
    y,
    w,
    h,
    rectRadius: 0.08,
    fill: { color: colors.white },
    line: { color: colors.line, pt: 1 }
  });
  slide.addShape(pptx.ShapeType.rect, {
    x,
    y,
    w: 0.08,
    h,
    fill: { color: accent },
    line: { color: accent }
  });
  slide.addText(head, {
    x: x + 0.18,
    y: y + 0.18,
    w: w - 0.28,
    h: 0.22,
    fontSize: 14,
    bold: true,
    color: colors.ink
  });
  slide.addText(body, {
    x: x + 0.18,
    y: y + 0.48,
    w: w - 0.28,
    h: h - 0.62,
    fontSize: 10.2,
    color: colors.muted
  });
}

function bullets(slide, items, x, y, w) {
  const lines = [];
  items.forEach((item, index) => {
    lines.push({
      text: item,
      options: {
        bullet: { indent: 12 },
        hanging: 3,
        breakLine: index !== items.length - 1
      }
    });
  });
  slide.addText(lines, {
    x,
    y,
    w,
    h: 0.42 * items.length + 0.25,
    fontSize: 15,
    color: colors.ink,
    paraSpaceAfterPt: 8
  });
}

function footer(slide) {
  slide.addText("https://arvind3.github.io/Synthora/", {
    x: 0.65,
    y: 7.02,
    w: 4.5,
    h: 0.16,
    fontSize: 8.5,
    color: colors.muted,
    hyperlink: { url: "https://arvind3.github.io/Synthora/" }
  });
}

{
  const slide = pptx.addSlide();
  slide.background = { color: colors.bgSoft };
  slide.addText("Introducing Synthora", {
    x: 0.75,
    y: 1.1,
    w: 5.8,
    h: 0.72,
    fontFace: "Aptos Display",
    fontSize: 28,
    bold: true,
    color: colors.ink
  });
  slide.addText("Synthetic data generation for modern product teams", {
    x: 0.78,
    y: 1.92,
    w: 5.8,
    h: 0.34,
    fontSize: 14,
    color: colors.muted
  });
  slide.addText("Create realistic test data instantly. No signup. No backend. Just open the app and generate.", {
    x: 0.78,
    y: 2.35,
    w: 5.6,
    h: 0.65,
    fontSize: 16,
    color: colors.ink
  });
  stat(slide, 0.8, 3.5, 1.8, "Methods", "274");
  stat(slide, 2.82, 3.5, 1.8, "Runtime", "In-browser");
  stat(slide, 4.84, 3.5, 1.8, "Export", "JSON / CSV");
  slide.addText("Live product", {
    x: 0.8,
    y: 4.92,
    w: 1.2,
    h: 0.18,
    fontSize: 10,
    bold: true,
    color: colors.muted
  });
  slide.addText("https://arvind3.github.io/Synthora/", {
    x: 0.8,
    y: 5.16,
    w: 3.8,
    h: 0.24,
    fontSize: 13,
    bold: true,
    color: colors.brandDark,
    hyperlink: { url: "https://arvind3.github.io/Synthora/" }
  });
  screenshot(slide, assets.home, 7.1, 0.9, 5.55, 5.95);
}

{
  const slide = pptx.addSlide();
  base(slide, "WHY NOW");
  title(slide, "Teams still waste time building fake data by hand", "And they should not have to.");
  featureCard(slide, 0.78, 2.0, 3.0, 1.45, "Slow setup", "Manual spreadsheets and throwaway scripts keep showing up before every test cycle and demo.", colors.accent);
  featureCard(slide, 3.98, 2.0, 3.0, 1.45, "Risky source data", "Real customer records should not leak into lower environments or presentations.", colors.brand);
  featureCard(slide, 7.18, 2.0, 3.0, 1.45, "Weak realism", "Lorem ipsum and toy data fail as soon as teams need believable products or workflows.", colors.accent);
  featureCard(slide, 10.38, 2.0, 2.2, 1.45, "Fragmented tools", "Library power exists, but the workflow is not accessible to everyone.", colors.brand);
  bullets(slide, [
    "Developers need speed.",
    "QA teams need repeatability.",
    "Demo teams need realism.",
    "Business users need simplicity."
  ], 0.9, 4.3, 6.0);
  footer(slide);
}

{
  const slide = pptx.addSlide();
  base(slide, "WHAT LAUNCHED");
  title(slide, "Synthora packages Faker into a product experience", "Search methods, build datasets, preview results, and export immediately.");
  screenshot(slide, assets.explore, 0.75, 1.95, 7.8, 4.55);
  featureCard(slide, 8.95, 2.0, 3.2, 1.0, "Explore", "Search providers and try methods from a modern UI.", colors.brand);
  featureCard(slide, 8.95, 3.25, 3.2, 1.0, "Build", "Assemble structured datasets with fields, locale, rows, and seed.", colors.accent);
  featureCard(slide, 8.95, 4.5, 3.2, 1.0, "Export", "Download usable JSON or CSV in the same workflow.", colors.brand);
  footer(slide);
}

{
  const slide = pptx.addSlide();
  base(slide, "PRODUCT TOUR");
  title(slide, "From homepage to output in minutes", "The product flow is intentionally short.");
  featureCard(slide, 0.8, 2.0, 2.7, 1.1, "1. Home", "Understand the product value and jump into action.", colors.brand);
  featureCard(slide, 3.7, 2.0, 2.7, 1.1, "2. Explore", "Browse categories and interact with individual Faker methods.", colors.accent);
  featureCard(slide, 6.6, 2.0, 2.7, 1.1, "3. Build Dataset", "Compose schema fields and generate larger datasets.", colors.brand);
  featureCard(slide, 9.5, 2.0, 2.7, 1.1, "4. Export", "Take JSON or CSV into testing, demos, or workflows.", colors.accent);
  screenshot(slide, assets.home, 0.95, 3.45, 4.0, 2.5);
  screenshot(slide, assets.explore, 4.75, 3.45, 4.0, 2.5);
  screenshot(slide, assets.builder, 8.55, 3.45, 4.0, 2.5);
  footer(slide);
}

{
  const slide = pptx.addSlide();
  base(slide, "WHY IT MATTERS");
  title(slide, "Key benefits, by team", "One launch, multiple audiences.");
  featureCard(slide, 0.8, 2.0, 3.8, 1.65, "Developers", "Generate believable seed data faster and avoid writing throwaway scripts.", colors.brand);
  featureCard(slide, 4.8, 2.0, 3.8, 1.65, "QA and automation", "Prepare repeatable synthetic datasets for validation and regression testing.", colors.accent);
  featureCard(slide, 8.8, 2.0, 3.8, 1.65, "Demo teams", "Populate product environments with safe but credible records before meetings.", colors.brand);
  featureCard(slide, 0.8, 4.1, 3.8, 1.65, "Non-technical users", "Use a guided interface without learning Faker APIs or code.", colors.accent);
  featureCard(slide, 4.8, 4.1, 3.8, 1.65, "Platform teams", "Avoid building and hosting a separate internal sample-data service.", colors.brand);
  footer(slide);
}

{
  const slide = pptx.addSlide();
  base(slide, "HOW IT WORKS");
  title(slide, "Lightweight architecture, serious utility", "Static delivery, browser execution, export-ready output.");
  featureCard(slide, 0.95, 2.3, 2.1, 1.1, "React UI", "Home, Explore, Templates, Build Dataset", colors.brand);
  featureCard(slide, 3.25, 2.3, 2.1, 1.1, "Catalog", "Generated metadata and runtime manifest", colors.accent);
  featureCard(slide, 5.55, 2.3, 2.1, 1.1, "Worker", "Execution isolated from the main UI thread", colors.brand);
  featureCard(slide, 7.85, 2.3, 2.1, 1.1, "Pyodide + Faker", "Python Faker runs in-browser", colors.accent);
  featureCard(slide, 10.15, 2.3, 2.1, 1.1, "Export", "Preview plus JSON / CSV output", colors.brand);
  slide.addText(">", { x: 3.02, y: 2.6, w: 0.2, h: 0.2, fontSize: 22, bold: true, color: colors.brandDark, align: "center" });
  slide.addText(">", { x: 5.32, y: 2.6, w: 0.2, h: 0.2, fontSize: 22, bold: true, color: colors.brandDark, align: "center" });
  slide.addText(">", { x: 7.62, y: 2.6, w: 0.2, h: 0.2, fontSize: 22, bold: true, color: colors.brandDark, align: "center" });
  slide.addText(">", { x: 9.92, y: 2.6, w: 0.2, h: 0.2, fontSize: 22, bold: true, color: colors.brandDark, align: "center" });
  bullets(slide, [
    "Build-time introspection generates the active catalog and whitelist.",
    "Runtime execution stays inside the browser.",
    "Generated data can be previewed and downloaded without infrastructure."
  ], 1.05, 4.55, 10.8);
  footer(slide);
}

{
  const slide = pptx.addSlide();
  base(slide, "SCREENSHOT");
  title(slide, "Dataset creation is the hero workflow", "Build the shape you need, then export it.");
  screenshot(slide, assets.builder, 0.75, 1.9, 8.9, 4.9);
  featureCard(slide, 10.0, 2.15, 2.3, 0.95, "Field mapping", "Each column uses a chosen Faker method.", colors.brand);
  featureCard(slide, 10.0, 3.35, 2.3, 0.95, "Control volume", "Rows, locale, and seed support repeatable output.", colors.accent);
  featureCard(slide, 10.0, 4.55, 2.3, 0.95, "Export cleanly", "JSON and CSV are one click away.", colors.brand);
  footer(slide);
}

{
  const slide = pptx.addSlide();
  base(slide, "USE CASES");
  title(slide, "Launch use cases teams can adopt immediately", "Synthora is useful on day one.");
  featureCard(slide, 0.8, 2.0, 2.9, 1.15, "API testing", "Seed payloads and mocked responses.", colors.brand);
  featureCard(slide, 3.95, 2.0, 2.9, 1.15, "Regression testing", "Prepare synthetic datasets for repeatable automation.", colors.accent);
  featureCard(slide, 7.1, 2.0, 2.9, 1.15, "Product demos", "Populate screens and tables before stakeholder reviews.", colors.brand);
  featureCard(slide, 10.25, 2.0, 2.3, 1.15, "Training", "Use safe examples in onboarding and sandbox flows.", colors.accent);
  screenshot(slide, assets.export, 0.95, 3.55, 11.45, 2.65);
  footer(slide);
}

{
  const slide = pptx.addSlide();
  base(slide, "WHY DIFFERENT");
  title(slide, "Why Synthora feels different from ad hoc data tooling", "It combines speed, accessibility, and portability.");
  stat(slide, 0.9, 2.15, 2.6, "No infrastructure", "Static site");
  stat(slide, 3.7, 2.15, 2.6, "No signup", "Immediate use");
  stat(slide, 6.5, 2.15, 2.6, "Privacy-safe", "Synthetic output");
  stat(slide, 9.3, 2.15, 2.6, "Open source", "Extensible");
  bullets(slide, [
    "Fully client-side generation is a strong story for privacy and simplicity.",
    "The UI lowers the barrier for teams that do not want to work directly in code.",
    "The catalog and whitelist model gives the experience more trust and clarity."
  ], 0.95, 4.0, 11.2);
  footer(slide);
}

{
  const slide = pptx.addSlide();
  base(slide, "CALL TO ACTION");
  title(slide, "Synthora is live", "Try the product and share it with the teams who still handcraft fake data.");
  slide.addShape(pptx.ShapeType.roundRect, {
    x: 0.95,
    y: 2.2,
    w: 11.2,
    h: 2.0,
    rectRadius: 0.1,
    fill: { color: colors.white },
    line: { color: colors.line, pt: 1 }
  });
  slide.addText("https://arvind3.github.io/Synthora/", {
    x: 1.35,
    y: 2.88,
    w: 7.2,
    h: 0.32,
    fontSize: 24,
    bold: true,
    color: colors.brandDark,
    hyperlink: { url: "https://arvind3.github.io/Synthora/" }
  });
  featureCard(slide, 1.2, 4.75, 3.4, 1.0, "Try first", "Open Build Dataset and generate a schema.", colors.brand);
  featureCard(slide, 4.95, 4.75, 3.4, 1.0, "Then explore", "Search methods and use Try for fast samples.", colors.accent);
  featureCard(slide, 8.7, 4.75, 3.0, 1.0, "Share it", "Send the link to your engineering and QA teams.", colors.brand);
  footer(slide);
}

await pptx.writeFile({ fileName: outputPath });
console.log(`Wrote ${outputPath}`);
