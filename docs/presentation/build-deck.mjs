import fs from "node:fs";
import path from "node:path";
import pptxgen from "pptxgenjs";

const rootDir = path.resolve(path.dirname(new URL(import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, "$1")));
const assetsDir = path.join(rootDir, "assets");
const outputPath = path.join(rootDir, "synthora-enterprise-overview.pptx");

const colors = {
  ink: "0F172A",
  muted: "64748B",
  line: "E2E8F0",
  bg: "F8FAFC",
  bgSoft: "F0F9F6",
  white: "FFFFFF",
  brand: "00B899",
  brandDark: "009980",
  brandSoft: "CCF5EE",
  accent: "F04F23",
  accentSoft: "FFF0EC",
  navy: "10203A",
  darkPanel: "0D1B33"
};

const assets = {
  home: path.join(assetsDir, "home-overview.png"),
  explore: path.join(assetsDir, "explore-browser.png"),
  builder: path.join(assetsDir, "dataset-builder.png"),
  export: path.join(assetsDir, "export-workflow.png")
};

for (const [name, filePath] of Object.entries(assets)) {
  if (!fs.existsSync(filePath)) {
    throw new Error(`Missing required asset '${name}': ${filePath}`);
  }
}

const pptx = new pptxgen();
pptx.layout = "LAYOUT_WIDE";
pptx.author = "OpenAI Codex";
pptx.company = "Synthora";
pptx.subject = "Synthora enterprise overview";
pptx.title = "Synthora - Enterprise Overview";
pptx.lang = "en-US";
pptx.theme = {
  headFontFace: "Aptos Display",
  bodyFontFace: "Aptos",
  lang: "en-US"
};

function base(slide, eyebrow = "SYNTHORA ENTERPRISE OVERVIEW", bg = colors.bg) {
  slide.background = { color: bg };
  slide.addShape(pptx.ShapeType.rect, {
    x: 0,
    y: 0,
    w: 13.333,
    h: 0.18,
    fill: { color: colors.brand },
    line: { color: colors.brand }
  });
  slide.addText(eyebrow, {
    x: 0.6,
    y: 0.34,
    w: 3.6,
    h: 0.2,
    fontSize: 10,
    bold: true,
    color: colors.brandDark,
    charSpace: 0.7
  });
  slide.addText("Synthora", {
    x: 11.2,
    y: 0.3,
    w: 1.2,
    h: 0.2,
    fontSize: 10,
    bold: true,
    color: colors.muted,
    align: "right"
  });
}

function title(slide, head, sub = "", opts = {}) {
  const x = opts.x ?? 0.6;
  const y = opts.y ?? 0.72;
  const w = opts.w ?? 7.8;
  slide.addText(head, {
    x,
    y,
    w,
    h: 0.74,
    fontFace: "Aptos Display",
    fontSize: opts.size ?? 24,
    bold: true,
    color: colors.ink
  });
  if (sub) {
    slide.addText(sub, {
      x,
      y: y + 0.72,
      w: opts.subW ?? 8.2,
      h: 0.34,
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
    line: { color: colors.line, pt: 1.1 }
  });
  slide.addImage({ path: filePath, x, y, w, h });
}

function chip(slide, x, y, w, text, fill = colors.brandSoft, color = colors.brandDark) {
  slide.addShape(pptx.ShapeType.roundRect, {
    x,
    y,
    w,
    h: 0.34,
    rectRadius: 0.12,
    fill: { color: fill },
    line: { color: fill }
  });
  slide.addText(text, {
    x: x + 0.08,
    y: y + 0.07,
    w: w - 0.16,
    h: 0.16,
    fontSize: 9,
    bold: true,
    color,
    align: "center"
  });
}

function card(slide, x, y, w, h, head, body, accent = colors.brand, fill = colors.white) {
  slide.addShape(pptx.ShapeType.roundRect, {
    x,
    y,
    w,
    h,
    rectRadius: 0.08,
    fill: { color: fill },
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
    y: y + 0.46,
    w: w - 0.28,
    h: h - 0.56,
    fontSize: 10.2,
    color: colors.muted
  });
}

function metric(slide, x, y, w, label, value, fill = colors.white) {
  slide.addShape(pptx.ShapeType.roundRect, {
    x,
    y,
    w,
    h: 0.95,
    rectRadius: 0.08,
    fill: { color: fill },
    line: { color: colors.line, pt: 1 }
  });
  slide.addText(label, {
    x: x + 0.16,
    y: y + 0.14,
    w: w - 0.3,
    h: 0.16,
    fontSize: 9.5,
    bold: true,
    color: colors.muted
  });
  slide.addText(value, {
    x: x + 0.16,
    y: y + 0.39,
    w: w - 0.3,
    h: 0.28,
    fontSize: 18,
    bold: true,
    color: colors.ink
  });
}

function bullets(slide, items, x, y, w, fontSize = 15) {
  const runs = [];
  items.forEach((item, index) => {
    runs.push({
      text: item,
      options: {
        bullet: { indent: 12 },
        hanging: 3,
        breakLine: index !== items.length - 1
      }
    });
  });
  slide.addText(runs, {
    x,
    y,
    w,
    h: 0.42 * items.length + 0.2,
    fontSize,
    color: colors.ink,
    paraSpaceAfterPt: 8
  });
}

function urlFooter(slide, text = "https://arvind3.github.io/Synthora/") {
  slide.addText(text, {
    x: 0.6,
    y: 7.02,
    w: 4.2,
    h: 0.16,
    fontSize: 8.5,
    color: colors.muted,
    hyperlink: { url: "https://arvind3.github.io/Synthora/" }
  });
}

{
  const slide = pptx.addSlide();
  slide.background = { color: colors.bgSoft };
  slide.addShape(pptx.ShapeType.rect, {
    x: 0,
    y: 0,
    w: 13.333,
    h: 7.5,
    fill: { color: colors.bgSoft },
    line: { color: colors.bgSoft }
  });
  slide.addText("Synthora", {
    x: 0.75,
    y: 0.88,
    w: 2.2,
    h: 0.2,
    fontSize: 12,
    bold: true,
    color: colors.brandDark,
    charSpace: 1
  });
  slide.addText("Synthetic data generation\nthat feels like a product", {
    x: 0.75,
    y: 1.25,
    w: 5.3,
    h: 1.2,
    fontFace: "Aptos Display",
    fontSize: 28,
    bold: true,
    color: colors.ink
  });
  slide.addText("Synthora gives developers, QA teams, and demo owners a fast path to realistic data without setup, signup, or backend infrastructure.", {
    x: 0.78,
    y: 2.72,
    w: 5.3,
    h: 0.7,
    fontSize: 15,
    color: colors.muted
  });
  chip(slide, 0.82, 3.75, 1.38, "No signup");
  chip(slide, 2.34, 3.75, 1.68, "Runs in browser");
  chip(slide, 4.18, 3.75, 1.58, "JSON + CSV");
  slide.addText("Live demo", {
    x: 0.82,
    y: 4.6,
    w: 1.0,
    h: 0.16,
    fontSize: 10,
    bold: true,
    color: colors.muted
  });
  slide.addText("https://arvind3.github.io/Synthora/", {
    x: 0.82,
    y: 4.88,
    w: 4.3,
    h: 0.24,
    fontSize: 14,
    bold: true,
    color: colors.brandDark,
    hyperlink: { url: "https://arvind3.github.io/Synthora/" }
  });
  screenshot(slide, assets.home, 7.0, 0.95, 5.55, 5.8);
  metric(slide, 7.0, 6.05, 1.7, "Method catalog", "274");
  metric(slide, 8.92, 6.05, 1.7, "Runtime", "Client-side");
  metric(slide, 10.84, 6.05, 1.7, "Output", "CSV / JSON");
}

{
  const slide = pptx.addSlide();
  base(slide, "WHY THIS MATTERS", colors.white);
  title(slide, "Creating fake data is still more manual than it should be", "The pain is rarely strategic, but it shows up in every test cycle, demo, and lower environment.");
  card(slide, 0.72, 2.0, 2.85, 1.35, "Manual setup", "Spreadsheets, copied records, and one-off scripts slow teams down.", colors.accent);
  card(slide, 3.85, 2.0, 2.85, 1.35, "Privacy risk", "Real customer data should not travel into demos or non-production workflows.", colors.brand);
  card(slide, 6.98, 2.0, 2.85, 1.35, "Low realism", "Toy data breaks when teams need believable product scenarios.", colors.accent);
  card(slide, 10.11, 2.0, 2.5, 1.35, "Delay cost", "Teams lose time before they can even start the real work.", colors.brand);
  slide.addShape(pptx.ShapeType.roundRect, {
    x: 0.82,
    y: 4.0,
    w: 11.8,
    h: 1.72,
    rectRadius: 0.08,
    fill: { color: colors.bgSoft },
    line: { color: colors.line, pt: 1 }
  });
  bullets(slide, [
    "Developers need credible data fast, not another setup task.",
    "QA teams need repeatable synthetic datasets for regression and workflow validation.",
    "Demo teams need realistic records without using sensitive customer information.",
    "Non-technical users still need a guided path to export-ready data."
  ], 1.02, 4.34, 11.2);
}

{
  const slide = pptx.addSlide();
  base(slide, "THE PRODUCT ANSWER", colors.bg);
  title(slide, "Synthora turns fake data from a coding chore into a product workflow", "It gives teams a clear path from discovery to export using the browser alone.");
  card(slide, 0.75, 2.05, 2.85, 1.2, "Discover", "Search the live Faker method catalog through a clean UI instead of raw code.", colors.brand);
  card(slide, 3.88, 2.05, 2.85, 1.2, "Build", "Compose structured schemas with locale, rows, seed, and field mapping.", colors.accent);
  card(slide, 7.01, 2.05, 2.85, 1.2, "Preview", "Inspect output before you download or hand it to another team.", colors.brand);
  card(slide, 10.14, 2.05, 2.45, 1.2, "Export", "Take clean JSON or CSV into testing, demos, or downstream workflows.", colors.accent);
  bullets(slide, [
    "No signup required.",
    "No infrastructure to stand up.",
    "Client-side runtime execution.",
    "One workflow for technical and non-technical users."
  ], 0.92, 4.1, 5.6);
  metric(slide, 7.55, 4.25, 2.25, "Primary value", "Fast, safe, self-serve");
  metric(slide, 10.0, 4.25, 2.25, "Delivery model", "Static web app");
  metric(slide, 7.55, 5.4, 2.25, "Runtime model", "Pyodide + Faker");
  metric(slide, 10.0, 5.4, 2.25, "Trust model", "Whitelisted methods");
}

{
  const slide = pptx.addSlide();
  base(slide, "PRODUCT OVERVIEW", colors.white);
  title(slide, "The product value is visible in one screen", "The homepage makes the workflow legible immediately: understand the promise, choose a path, start generating.");
  screenshot(slide, assets.home, 0.72, 1.95, 11.85, 4.25);
  card(slide, 0.92, 6.45, 3.6, 0.72, "Build Dataset CTA", "Jump directly into structured dataset creation.", colors.brand);
  card(slide, 4.88, 6.45, 3.6, 0.72, "Category Browser", "Browse common data domains without learning library internals.", colors.accent);
  card(slide, 8.84, 6.45, 3.35, 0.72, "Runtime Signal", "Clear status tells users when the browser runtime is ready.", colors.brand);
}

{
  const slide = pptx.addSlide();
  base(slide, "CORE CAPABILITIES", colors.bg);
  title(slide, "Built for the data types teams use every day", "The experience covers the high-value domains most often needed in testing, demos, and environment setup.");
  const items = [
    ["Person", "Profiles, names, email, phone", colors.brand],
    ["Address", "Street, city, country, postcode", colors.accent],
    ["Company", "Organization, job, catch phrase", colors.brand],
    ["Internet", "URL, IP, username, domain", colors.accent],
    ["Financial", "Cards, IBAN, currency", colors.brand],
    ["Content", "Sentence, paragraph, word", colors.accent],
    ["Date and Time", "Dates, timestamps, birth dates", colors.brand],
    ["Security", "UUIDs, hashes, tokens", colors.accent]
  ];
  items.forEach(([head, body, accent], index) => {
    const col = index % 4;
    const row = Math.floor(index / 4);
    card(slide, 0.78 + col * 3.08, 2.15 + row * 1.68, 2.78, 1.28, head, body, accent);
  });
  slide.addShape(pptx.ShapeType.roundRect, {
    x: 0.82,
    y: 5.72,
    w: 11.8,
    h: 0.8,
    rectRadius: 0.08,
    fill: { color: colors.white },
    line: { color: colors.line, pt: 1 }
  });
  slide.addText("This breadth matters because the product can support both quick samples and realistic multi-field datasets from the same UI.", {
    x: 1.05,
    y: 5.98,
    w: 11.1,
    h: 0.22,
    fontSize: 12,
    color: colors.ink,
    bold: true,
    align: "center"
  });
}

{
  const slide = pptx.addSlide();
  base(slide, "DATASET BUILDER", colors.white);
  title(slide, "The Schema Builder makes structured data a self-serve workflow", "Users can choose fields, control rows, preview output, and export without leaving the page.");
  screenshot(slide, assets.builder, 0.72, 1.95, 11.85, 4.28);
  card(slide, 0.92, 6.44, 3.6, 0.72, "Field Mapping", "Each column is tied to a specific Faker method.", colors.brand);
  card(slide, 4.88, 6.44, 3.6, 0.72, "Generation Controls", "Locale, row volume, and seed make output more deliberate.", colors.accent);
  card(slide, 8.84, 6.44, 3.35, 0.72, "Preview Before Export", "Inspect output before downloading JSON or CSV.", colors.brand);
}

{
  const slide = pptx.addSlide();
  base(slide, "EXPORT", colors.bg);
  title(slide, "The last mile stays simple", "Build the data once, then move it directly into the workflow that needs it.");
  screenshot(slide, assets.export, 0.72, 1.95, 7.65, 4.8);
  card(slide, 8.85, 2.08, 3.55, 1.05, "JSON Export", "Use it for API mocks, fixtures, seeded app state, and developer flows.", colors.brand);
  card(slide, 8.85, 3.46, 3.55, 1.05, "CSV Export", "Use it for spreadsheets, imports, QA validation, and business-friendly handoff.", colors.accent);
  card(slide, 8.85, 4.84, 3.55, 1.05, "Operational Value", "Generated files can feed automation, demo resets, and lower-environment setup.", colors.brand);
}

{
  const slide = pptx.addSlide();
  base(slide, "KEY FEATURES", colors.white);
  title(slide, "Designed for speed, safety, and usability", "The product reduces friction without reducing capability.");
  const items = [
    ["Fully Browser-Based", "Static delivery with no backend dependency.", colors.brand],
    ["No Signup Required", "Start immediately without account setup.", colors.accent],
    ["Searchable Method Catalog", "Browse the active Faker surface through a guided UI.", colors.brand],
    ["Interactive Generation", "Try methods and validate output before building full datasets.", colors.accent],
    ["Templates", "Use starter schemas to move faster on common scenarios.", colors.brand],
    ["Export-Ready Output", "Download JSON or CSV when the dataset is ready.", colors.accent]
  ];
  items.forEach(([head, body, accent], index) => {
    const col = index % 3;
    const row = Math.floor(index / 3);
    card(slide, 0.82 + col * 4.02, 2.05 + row * 1.75, 3.62, 1.35, head, body, accent);
  });
  slide.addText("One workflow now serves developers, testers, and non-technical users with less coordination overhead.", {
    x: 0.9,
    y: 5.95,
    w: 11.6,
    h: 0.24,
    fontSize: 12,
    color: colors.ink,
    bold: true,
    align: "center"
  });
}

{
  const slide = pptx.addSlide();
  base(slide, "BENEFITS", colors.bg);
  title(slide, "Different teams get a clear outcome from the same product", "The value changes by audience, but the workflow stays shared.");
  card(slide, 0.82, 2.1, 3.8, 1.7, "Developers", "Generate realistic seed data faster and stop writing throwaway setup scripts.", colors.brand);
  card(slide, 4.77, 2.1, 3.8, 1.7, "QA and automation", "Prepare repeatable synthetic datasets for regression and workflow validation.", colors.accent);
  card(slide, 8.72, 2.1, 3.8, 1.7, "Demo and product teams", "Populate environments with believable records before customer or stakeholder reviews.", colors.brand);
  card(slide, 0.82, 4.15, 3.8, 1.7, "Non-technical users", "Use a guided interface instead of learning a library API or writing code.", colors.accent);
  card(slide, 4.77, 4.15, 3.8, 1.7, "Platform and DevOps teams", "Avoid standing up a separate internal service just to create sample data.", colors.brand);
  slide.addShape(pptx.ShapeType.roundRect, {
    x: 8.72,
    y: 4.15,
    w: 3.8,
    h: 1.7,
    rectRadius: 0.08,
    fill: { color: colors.darkPanel },
    line: { color: colors.darkPanel }
  });
  slide.addText("Shared outcome", {
    x: 8.95,
    y: 4.38,
    w: 2.4,
    h: 0.18,
    fontSize: 10,
    color: "A8C1D9",
    bold: true
  });
  slide.addText("Less setup friction.\nBetter realism.\nSafer data.", {
    x: 8.95,
    y: 4.68,
    w: 2.5,
    h: 0.78,
    fontSize: 20,
    bold: true,
    color: colors.white
  });
}

{
  const slide = pptx.addSlide();
  base(slide, "ARCHITECTURE", colors.white);
  title(slide, "Lightweight architecture, credible delivery model", "The product keeps infrastructure minimal while preserving trust in what runs inside the browser.");
  const boxes = [
    ["React UI", "Home, Explore, Templates, Build Dataset"],
    ["Catalog artifacts", "Generated catalog and runtime manifest"],
    ["Worker runtime", "Execution isolated from the main thread"],
    ["Pyodide + Faker", "Python Faker runs in-browser"],
    ["Preview + Export", "Rows become preview, JSON, and CSV"]
  ];
  boxes.forEach(([head, body], index) => {
    const x = 0.86 + index * 2.42;
    card(slide, x, 2.5, 1.95, 1.25, head, body, index % 2 === 0 ? colors.brand : colors.accent, index % 2 === 0 ? colors.bgSoft : colors.white);
    if (index < boxes.length - 1) {
      slide.addText(">", {
        x: x + 2.02,
        y: 2.9,
        w: 0.22,
        h: 0.22,
        fontSize: 20,
        bold: true,
        color: colors.brandDark,
        align: "center"
      });
    }
  });
  slide.addShape(pptx.ShapeType.roundRect, {
    x: 0.9,
    y: 4.55,
    w: 11.6,
    h: 1.5,
    rectRadius: 0.08,
    fill: { color: colors.bgSoft },
    line: { color: colors.line, pt: 1 }
  });
  bullets(slide, [
    "Build-time Python introspection generates catalog metadata and the runtime manifest.",
    "Only whitelisted methods are exposed, aligning product behavior with runtime enforcement.",
    "Generated rows remain in the browser session until the user previews or exports them."
  ], 1.08, 4.88, 10.9, 13);
}

{
  const slide = pptx.addSlide();
  base(slide, "USE CASES", colors.bg);
  title(slide, "Real-world use cases map directly to everyday delivery work", "The value is practical, immediate, and easy to explain across teams.");
  const items = [
    ["API testing", "Seed request payloads and mock response bodies."],
    ["Regression testing", "Generate safe inputs for repeatable automation runs."],
    ["Product demos", "Populate dashboards, tables, and flows before reviews."],
    ["Load and perf prep", "Create bulk records for lower environments and test paths."],
    ["Training and sandbox data", "Prepare synthetic examples for onboarding and enablement."],
    ["Schema prototyping", "Shape sample datasets before backend contracts are final."]
  ];
  items.forEach(([head, body], index) => {
    const col = index % 3;
    const row = Math.floor(index / 3);
    card(slide, 0.82 + col * 4.02, 2.1 + row * 1.82, 3.62, 1.38, head, body, index % 2 === 0 ? colors.brand : colors.accent);
  });
}

{
  const slide = pptx.addSlide();
  base(slide, "WHY IT STANDS OUT", colors.white);
  title(slide, "Why teams choose this over ad hoc scripts and generators", "The difference is not just the library. It is the quality of the workflow.");
  bullets(slide, [
    "Fully client-side generation keeps data local to the browser session.",
    "No infrastructure or account model is required to start using the product.",
    "Open-source code and generated catalog metadata increase transparency.",
    "Whitelisted runtime execution improves trust in what the UI can actually do.",
    "The same experience supports both quick exploration and structured export."
  ], 0.9, 2.15, 6.2, 14);
  metric(slide, 7.8, 2.2, 4.0, "Deployment model", "Static site on GitHub Pages");
  metric(slide, 7.8, 3.35, 4.0, "Execution model", "Pyodide + Faker in-browser", colors.bgSoft);
  metric(slide, 7.8, 4.5, 4.0, "Trust model", "Whitelisted runtime methods");
  metric(slide, 7.8, 5.65, 4.0, "Adoption model", "Immediate self-service", colors.bgSoft);
}

{
  const slide = pptx.addSlide();
  base(slide, "LIVE DEMO", colors.bg);
  title(slide, "The fastest proof is the product itself", "A short live walkthrough communicates the value better than another feature list.");
  slide.addShape(pptx.ShapeType.roundRect, {
    x: 0.86,
    y: 2.1,
    w: 11.7,
    h: 2.1,
    rectRadius: 0.12,
    fill: { color: colors.white },
    line: { color: colors.line, pt: 1 }
  });
  slide.addText("https://arvind3.github.io/Synthora/", {
    x: 1.18,
    y: 2.88,
    w: 7.6,
    h: 0.32,
    fontSize: 24,
    bold: true,
    color: colors.brandDark,
    hyperlink: { url: "https://arvind3.github.io/Synthora/" }
  });
  card(slide, 1.0, 4.78, 3.55, 1.0, "Try first", "Open Build Dataset and generate a simple schema.", colors.brand);
  card(slide, 4.9, 4.78, 3.55, 1.0, "Then explore", "Search methods and use Try to validate the output shape.", colors.accent);
  card(slide, 8.8, 4.78, 3.4, 1.0, "What to show", "Speed, simplicity, and export-ready output.", colors.brand);
  urlFooter(slide);
}

{
  const slide = pptx.addSlide();
  base(slide, "ROADMAP", colors.white);
  title(slide, "Clear next steps already exist", "The current product solves core workflows, with obvious room for expansion.");
  card(slide, 0.82, 2.1, 2.85, 1.35, "API mode", "Expose generation through a more automation-friendly interface.", colors.brand);
  card(slide, 3.95, 2.1, 2.85, 1.35, "Richer templates", "Expand reusable datasets for QA, retail, CRM, and ITSM.", colors.accent);
  card(slide, 7.08, 2.1, 2.85, 1.35, "Tool integrations", "Connect more directly with testing and developer workflows.", colors.brand);
  card(slide, 10.21, 2.1, 2.35, 1.35, "Relationships", "Support linked datasets across related entities.", colors.accent);
  slide.addShape(pptx.ShapeType.roundRect, {
    x: 0.86,
    y: 4.2,
    w: 11.7,
    h: 1.55,
    rectRadius: 0.08,
    fill: { color: colors.bgSoft },
    line: { color: colors.line, pt: 1 }
  });
  bullets(slide, [
    "Saved presets would help teams reuse common generation patterns.",
    "Governed sharing could make approved templates easier to distribute across organizations.",
    "Relational dataset modeling would open more advanced demo and testing scenarios."
  ], 1.08, 4.5, 11.0, 13);
}

{
  const slide = pptx.addSlide();
  base(slide, "CLOSING", colors.bgSoft);
  slide.addText("Synthora makes realistic data generation feel fast, safe, and usable.", {
    x: 0.85,
    y: 1.2,
    w: 8.3,
    h: 0.85,
    fontFace: "Aptos Display",
    fontSize: 27,
    bold: true,
    color: colors.ink
  });
  slide.addText("It replaces hidden setup work with a browser-first product workflow teams can adopt immediately.", {
    x: 0.9,
    y: 2.2,
    w: 7.0,
    h: 0.42,
    fontSize: 14,
    color: colors.muted
  });
  bullets(slide, [
    "Safer than reusing real data.",
    "Faster than hand-building demo and test records.",
    "Accessible to technical and non-technical users.",
    "Ready for live use today."
  ], 0.95, 3.05, 5.8, 15);
  slide.addShape(pptx.ShapeType.roundRect, {
    x: 8.05,
    y: 1.55,
    w: 4.1,
    h: 3.0,
    rectRadius: 0.1,
    fill: { color: colors.white },
    line: { color: colors.line, pt: 1 }
  });
  slide.addText("Next step", {
    x: 8.38,
    y: 1.92,
    w: 1.3,
    h: 0.16,
    fontSize: 10,
    bold: true,
    color: colors.muted
  });
  slide.addText("Open the live product and build a dataset in under five minutes.", {
    x: 8.38,
    y: 2.35,
    w: 3.1,
    h: 0.85,
    fontSize: 20,
    bold: true,
    color: colors.ink
  });
  slide.addText("https://arvind3.github.io/Synthora/", {
    x: 8.38,
    y: 3.62,
    w: 3.0,
    h: 0.24,
    fontSize: 11,
    color: colors.brandDark,
    hyperlink: { url: "https://arvind3.github.io/Synthora/" }
  });
}

await pptx.writeFile({ fileName: outputPath });
console.log(`Wrote ${outputPath}`);
