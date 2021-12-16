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

function getDefaultTheme() {
  return {
    blockCode: {
      isBold: false,
      isItalic: false,
      isStrikethrough: false,
      isUnderline: false,
      color: "09844f",
    },
    footnoteDef: {
      isBold: false,
      isItalic: false,
      isStrikethrough: false,
      isUnderline: false,
      color: "555555",
    },
    linkLink: {
      isBold: false,
      isItalic: false,
      isStrikethrough: false,
      isUnderline: false,
      color: "",
    },
    ol: {
      isBold: false,
      isItalic: false,
      isStrikethrough: false,
      isUnderline: false,
      color: "0595bf",
    },
    editor: {
      "app-row-content-color": "4c4c4c",
      "app-row-icon-color": "1996bc",
      "app-row-separator-color": "e0e0e2",
      currentLineBgColor: "f8f8f8",
      bgColor: "ffffff",
      caretColor: "00b9ff",
      color: "333333",
      "app-row-selected-bgColor": "1996bc",
      "app-row-info-color": "333333",
      selectionColor: "",
      selectionBgColor: "",
      "app-icon-color": "1996bc",
      "app-group-color": "7f7f7f",
      "app-group-bgColor": "efeff4",
      "app-row-bgColor": "ffffff",
      "app-row-title-color": "333333",
    },
    h1: {
      isBold: true,
      isItalic: false,
      isStrikethrough: false,
      isUnderline: false,
      color: "0595bf",
    },
    inlineCode: {
      isBold: false,
      isItalic: false,
      isStrikethrough: false,
      isUnderline: false,
      color: "09844f",
    },
    image: {
      isBold: false,
      isItalic: false,
      isStrikethrough: false,
      isUnderline: false,
      color: "0366dd",
    },
    h2: {
      isBold: true,
      isItalic: false,
      isStrikethrough: false,
      isUnderline: false,
      color: "0595bf",
    },
    table: {
      isBold: false,
      isItalic: false,
      isStrikethrough: false,
      isUnderline: false,
      color: "333333",
    },
    h3: {
      isBold: true,
      isItalic: false,
      isStrikethrough: false,
      isUnderline: false,
      color: "0595bf",
    },
    link: {
      isBold: false,
      isItalic: false,
      isStrikethrough: false,
      isUnderline: false,
      color: "0366dd",
    },
    strikethrough: {
      isBold: false,
      isItalic: false,
      isStrikethrough: true,
      isUnderline: false,
      color: "999999",
    },
    h4: {
      isBold: true,
      isItalic: false,
      isStrikethrough: false,
      isUnderline: false,
      color: "0595bf",
    },
    footnoteRef: {
      isBold: false,
      isItalic: false,
      isStrikethrough: false,
      isUnderline: false,
      color: "555555",
    },
    isAutoGenCSS: false,
    "codeblock-string": {
      isBold: false,
      isItalic: false,
      isStrikethrough: false,
      isUnderline: false,
      color: "d32d26",
    },
    "codeblock-preprocessor": {
      isBold: false,
      isItalic: false,
      isStrikethrough: false,
      isUnderline: false,
      color: "784830",
    },
    h5: {
      isBold: true,
      isItalic: false,
      isStrikethrough: false,
      isUnderline: false,
      color: "0595bf",
    },
    underline: {
      isBold: false,
      isItalic: false,
      isStrikethrough: false,
      isUnderline: true,
      color: "1a1a1a",
    },
    inlineHTML: {
      isBold: false,
      isItalic: false,
      isStrikethrough: false,
      isUnderline: false,
      color: "555555",
    },
    strong: {
      isBold: true,
      isItalic: false,
      isStrikethrough: false,
      isUnderline: false,
      color: "333333",
    },
    blockHTML: {
      isBold: false,
      isItalic: false,
      isStrikethrough: false,
      isUnderline: false,
      color: "555555",
    },
    "codeblock-attribute": {
      isBold: false,
      isItalic: false,
      isStrikethrough: false,
      isUnderline: false,
      color: "967d41",
    },
    h6: {
      isBold: true,
      isItalic: false,
      isStrikethrough: false,
      isUnderline: false,
      color: "0595bf",
    },
    quote: {
      isBold: false,
      isItalic: false,
      isStrikethrough: false,
      isUnderline: false,
      color: "bbbbbb",
    },
    "codeblock-keyword": {
      isBold: false,
      isItalic: false,
      isStrikethrough: false,
      isUnderline: false,
      color: "bc319c",
    },
    ul: {
      isBold: false,
      isItalic: false,
      isStrikethrough: false,
      isUnderline: false,
      color: "0595bf",
    },
    "codeblock-comment": {
      isBold: false,
      isItalic: false,
      isStrikethrough: false,
      isUnderline: false,
      color: "008327",
    },
    emph: {
      isBold: false,
      isItalic: true,
      isStrikethrough: false,
      isUnderline: false,
      color: "333333",
    },
    "codeblock-character": {
      isBold: false,
      isItalic: false,
      isStrikethrough: false,
      isUnderline: false,
      color: "2834ce",
    },
    "codeblock-number": {
      isBold: false,
      isItalic: false,
      isStrikethrough: false,
      isUnderline: false,
      color: "2834ce",
    },
    hr: {
      isBold: false,
      isItalic: false,
      isStrikethrough: false,
      isUnderline: false,
      color: "555555",
    },
  };
}

module.exports = {
  adjust, getFileName, getFileNameWithoutExtension, getDefaultTheme
};
