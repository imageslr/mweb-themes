// 减淡或加深十六进制颜色
// amount (-100~100) 为正数时表示减淡 (更白)，为负数时表示加深 (更黑)
// 纯白色只能加深，纯黑色只能减淡，例子：
//   adjust('#ffffff', -20) => "#ebebeb"
//   adjust('000000', 20) => "#141414"
function adjust(color, amount) {
  return (
    "#" +
    color
      .replace(/^#/, "")
      .replace(/../g, (color) =>
        (
          "0" +
          Math.min(255, Math.max(0, parseInt(color, 16) + amount)).toString(16)
        ).substr(-2)
      )
  );
}

function getFileName (filePath) {
  return filePath.match(/([a-zA-Z\-]*\..*)$/)[1]; // eg: mweb-ayu
}

function getFileNameWithoutExtension (filePath) {
  return filePath.match(/([a-zA-Z\-]*)\..*$/)[1]; // eg: mweb-ayu
}

module.exports = {
  adjust, getFileName, getFileNameWithoutExtension
};
