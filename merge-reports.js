const fs = require("fs");
const path = require("path");
const mochawesomeMerge = require("mochawesome-merge");
const generator = require("mochawesome-report-generator");

const reportsDir = "cypress/reports";
const mergedReportFile = path.join(reportsDir, "report.json");

// Ensure the reports directory exists
if (!fs.existsSync(reportsDir)) {
  console.error(`Reports directory does not exist: ${reportsDir}`);
  process.exit(1);
}

// Read all JSON files in the reports directory
const jsonFiles = fs
  .readdirSync(reportsDir)
  .filter((file) => file.endsWith(".json") && file !== "report.json");

// Validate and filter non-empty JSON files
const validJsonFiles = jsonFiles.filter((file) => {
  try {
    const content = fs.readFileSync(path.join(reportsDir, file), "utf-8");
    JSON.parse(content);
    return true;
  } catch (error) {
    console.error(`Invalid JSON file: ${file}`, error);
    return false;
  }
});

if (validJsonFiles.length === 0) {
  console.error("No valid JSON report files found.");
  process.exit(1);
}

// Merge valid JSON files
mochawesomeMerge({
  files: validJsonFiles.map((file) => path.join(reportsDir, file)),
})
  .then((report) => {
    fs.writeFileSync(mergedReportFile, JSON.stringify(report, null, 2));
    return generator.create(report, {
      reportDir: reportsDir,
      saveJson: true,
    });
  })
  .then(() => {
    console.log("Merged report generated successfully");
  })
  .catch((error) => {
    console.error("Failed to merge reports:", error);
    process.exit(1);
  });
