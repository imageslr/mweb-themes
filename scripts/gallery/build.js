const fs = require("fs-extra");
const ejs = require("ejs");
const { fromRoot, filePath, buildScss } = require('./utils')

// const path
const templatePath = fromRoot("src/views/gallery.html");
const exampleMdPath = fromRoot("example.md");
const distPath = fromRoot("dist/gallery");

const run = async (args) => {
  await buildScss({ distPath, minify: true });
  await buildHtml();

  process.on('unhandledRejection', (error) => {
    console.error('unhandledRejection', error);
    process.exit(1);
  });
};

const buildHtml = () => {
  let data = encodeURI(fs.readFileSync(filePath(exampleMdPath)));
  let html = fs.readFileSync(filePath(templatePath), "utf-8");
  html = ejs.render(html, { data, watching: false });
  // console.log(html)
  fs.writeFileSync(`${filePath(distPath)}/index.html`, html);
};

module.exports.run = run;
