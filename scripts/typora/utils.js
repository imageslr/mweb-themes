const path = require("path")

const toRootPrefix = "../../";
const fromRoot = (pathFromRoot) => toRootPrefix + pathFromRoot;
const filePath = (file) => path.join(__dirname, `${file}`);
const isExisted = async function (path) {
  return new Promise((resolve, reject) => {
    fs.access(path, (err) => {
      err ? reject(false) : resolve(true);
    });
  }).catch(err => err);
};

module.exports = {
  fromRoot,
  filePath,
  isExisted
};
