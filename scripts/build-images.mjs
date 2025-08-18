#!/usr/bin/env node

import fs from "fs-extra";
import path from "path";
import sharp from "sharp";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration
const CONTENT_DIR = path.join(process.cwd(), "src", "content");
const PUBLIC_DIR = path.join(process.cwd(), "public");
const OUTPUT_DIR = path.join(PUBLIC_DIR, "optimized");

// Image sizes to generate
const IMAGE_SIZES = {
  thumbnail: { width: 300, height: 200 },
  medium: { width: 800, height: 600 },
  large: { width: 1200, height: 900 },
  hero: { width: 1600, height: 900 },
};

// Supported image formats
const SUPPORTED_FORMATS = [".jpg", ".jpeg", ".png", ".webp", ".tiff"];

/**
 * Log with timestamp
 */
function log(message) {
  console.log(`[${new Date().toISOString()}] ${message}`);
}

/**
 * Process a single image file (simplified - folder already checked)
 */
async function processImage(inputPath, outputDir, slug, filename) {
  const ext = path.extname(filename).toLowerCase();
  const basename = path.basename(filename, ext);

  if (!SUPPORTED_FORMATS.includes(ext)) {
    log(`Skipping unsupported format: ${filename}`);
    return;
  }

  log(`  📷 Processing: ${filename}`);

  try {
    // Ensure output directory exists
    await fs.ensureDir(outputDir);

    // Generate different sizes
    for (const [sizeName, dimensions] of Object.entries(IMAGE_SIZES)) {
      const outputFilename = `${basename}-${sizeName}`;

      // Generate JPEG version
      const jpegPath = path.join(outputDir, `${outputFilename}.jpg`);
      await sharp(inputPath)
        .resize(dimensions.width, dimensions.height, {
          fit: "cover",
          position: "center",
        })
        .jpeg({
          quality: 85,
          progressive: true,
        })
        .toFile(jpegPath);

      // Generate WebP version
      const webpPath = path.join(outputDir, `${outputFilename}.webp`);
      await sharp(inputPath)
        .resize(dimensions.width, dimensions.height, {
          fit: "cover",
          position: "center",
        })
        .webp({
          quality: 85,
        })
        .toFile(webpPath);
    }

    // Also create original copy (optimized)
    const originalJpegPath = path.join(outputDir, `${basename}.jpg`);
    const originalWebpPath = path.join(outputDir, `${basename}.webp`);

    await sharp(inputPath)
      .jpeg({ quality: 90, progressive: true })
      .toFile(originalJpegPath);

    await sharp(inputPath).webp({ quality: 90 }).toFile(originalWebpPath);

    const totalVariants = Object.keys(IMAGE_SIZES).length * 2 + 2;
    log(`    ✓ Created ${totalVariants} variants for ${filename}`);
  } catch (error) {
    console.error(`    ✗ Error processing ${filename}:`, error.message);
  }
}

/**
 * Process images in public/img subdirectories (tools, testimonials, stacks, etc.)
 */
async function processPublicImages() {
  const publicImageCategories = [
    "tools",
    "testimonial",
    "stacks",
    "cert",
    "awards",
  ];

  for (const category of publicImageCategories) {
    const categoryDir = path.join(PUBLIC_DIR, "img", category);

    if (!(await fs.pathExists(categoryDir))) {
      log(`Public image category not found: ${category}`);
      continue;
    }

    const outputDir = path.join(OUTPUT_DIR, "img", category);

    // Check if output directory already exists - if so, skip entire category
    if (await fs.pathExists(outputDir)) {
      log(`⏭️  Skipping ${category} - output directory already exists`);
      continue;
    }

    log(`Processing ${category} images...`);

    const files = await fs.readdir(categoryDir);
    const imageFiles = files.filter((file) =>
      SUPPORTED_FORMATS.includes(path.extname(file).toLowerCase())
    );

    if (imageFiles.length > 0) {
      log(`📁 Processing ${category} (${imageFiles.length} images)`);

      for (const file of imageFiles) {
        const imagePath = path.join(categoryDir, file);
        await processImage(imagePath, outputDir, category, file);
      }
    }
  }
}

/**
 * Process all images in a content directory (portfolio or blog)
 */
async function processContentType(contentType) {
  const contentTypeDir = path.join(CONTENT_DIR, contentType);

  if (!(await fs.pathExists(contentTypeDir))) {
    log(`Content directory not found: ${contentTypeDir}`);
    return;
  }

  log(`Processing ${contentType} images...`);

  const items = await fs.readdir(contentTypeDir, { withFileTypes: true });

  for (const item of items) {
    if (item.isDirectory()) {
      const slug = item.name;
      const itemDir = path.join(contentTypeDir, slug);
      const outputDir = path.join(OUTPUT_DIR, contentType, slug);

      // Check if output directory already exists - if so, skip entire folder
      if (await fs.pathExists(outputDir)) {
        log(`⏭️  Skipping ${slug} - output directory already exists`);
        continue;
      }

      // Get all image files in this directory
      const files = await fs.readdir(itemDir);
      const imageFiles = files.filter((file) =>
        SUPPORTED_FORMATS.includes(path.extname(file).toLowerCase())
      );

      if (imageFiles.length > 0) {
        log(`📁 Processing ${slug} (${imageFiles.length} images)`);

        for (const file of imageFiles) {
          const imagePath = path.join(itemDir, file);
          await processImage(imagePath, outputDir, slug, file);
        }
      }
    }
  }
}

/**
 * Generate image manifest for easier access
 */
async function generateImageManifest() {
  const manifestPath = path.join(OUTPUT_DIR, "manifest.json");
  const manifest = {};

  // Scan output directory
  const contentTypes = ["portfolio", "blog"];

  for (const contentType of contentTypes) {
    const contentTypeDir = path.join(OUTPUT_DIR, contentType);

    if (!(await fs.pathExists(contentTypeDir))) continue;

    manifest[contentType] = {};

    const slugs = await fs.readdir(contentTypeDir, { withFileTypes: true });

    for (const slug of slugs) {
      if (slug.isDirectory()) {
        const slugDir = path.join(contentTypeDir, slug.name);
        const images = await fs.readdir(slugDir);

        manifest[contentType][slug.name] = {
          images: images.reduce((acc, img) => {
            const basename = path.basename(img, path.extname(img));
            const ext = path.extname(img);

            if (!acc[basename]) acc[basename] = {};
            acc[basename][
              ext.slice(1)
            ] = `/optimized/${contentType}/${slug.name}/${img}`;

            return acc;
          }, {}),
        };
      }
    }
  }

  // Process public image categories
  for (const category of ["tools", "testimonial", "stacks", "cert", "awards"]) {
    const categoryDir = path.join(OUTPUT_DIR, "img", category);

    if (await fs.pathExists(categoryDir)) {
      if (!manifest.img) manifest.img = {};

      const images = await fs.readdir(categoryDir);
      manifest.img[category] = {
        images: images.reduce((acc, img) => {
          const basename = path.basename(img, path.extname(img));
          const ext = path.extname(img);

          if (!acc[basename]) acc[basename] = {};
          acc[basename][ext.slice(1)] = `/optimized/img/${category}/${img}`;

          return acc;
        }, {}),
      };
    }
  }

  await fs.writeJson(manifestPath, manifest, { spaces: 2 });
  log(`✓ Generated image manifest: ${manifestPath}`);
}

/**
 * Clean up old optimized images (optional - for fresh builds)
 */
async function cleanupOldImages() {
  if (await fs.pathExists(OUTPUT_DIR)) {
    log("Cleaning up old optimized images...");
    await fs.remove(OUTPUT_DIR);
  }
  await fs.ensureDir(OUTPUT_DIR);
}

/**
 * Main function
 */
async function main() {
  log("🖼️  Starting image build process...");

  try {
    // Only clean up if --clean flag is passed
    if (process.argv.includes("--clean")) {
      await cleanupOldImages();
    } else {
      // Just ensure output directory exists
      await fs.ensureDir(OUTPUT_DIR);
    }

    // Process content types
    await processContentType("portfolio");
    await processContentType("blog");

    // Process public image categories
    await processPublicImages();

    // Generate manifest
    await generateImageManifest();

    log("✅ Image build process completed successfully!");

    // Output summary
    const manifest = await fs.readJson(path.join(OUTPUT_DIR, "manifest.json"));
    const portfolioCount = Object.keys(manifest.portfolio || {}).length;
    const blogCount = Object.keys(manifest.blog || {}).length;

    log(
      `📊 Summary: Processed ${portfolioCount} portfolio items and ${blogCount} blog items`
    );
  } catch (error) {
    console.error("❌ Image build process failed:", error);
    process.exit(1);
  }
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}

export { main as buildImages };
