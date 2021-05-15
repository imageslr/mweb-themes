const plist = require('plist');
const fs = require('fs')

function convert(file) {
  const dict = {
    "Background Text Color": "$body-bg-color",
    "Base Text Color": "$font-color",
    "Light Text Color": "$del-font-color",
    "Title Text Color": "$head-color",
    "Link Text Color": "$link-color",
    "Accent Text Color": "$primary-color",
    "Insertion Point Color": "",
    "Selected Text Background Color": "",
    "Selected Text Inactive Background Color": "",
    "Style Marker Text Color": "",
    "Invalid Character Color": "",
    "Map Text Color": "",
    "Separator Text Color": "",
    "Hashtag Text Color": "",
    "Hashtag Marker Text Color": "",
    "Hashtag Background Color": "",
    "Hashtag Selected Background Color": "",
    "Checkbox Fill Color": "",
    "Checkbox Stroke Color": "",
    "Checkbox Check Color": "",
    "Highlighter Background Color": "$mark-bg-color",
    "Highlighter Marker Color": "",
    "Code Background Color": "$code-bg-color",
    "Code Stroke Color": "$border-color",
    "Code Font Color": "$code-font-color",
    "Syntax Keyword": "$prism-color-keyword",
    "Syntax Comment": "$prism-color-comment",
    "Syntax String": "$prism-color-selector",
    "Syntax Project": "",
    "Syntax Preprocessor": "",
    "Syntax Documentation Comment": "",
    "Syntax Number": "$prism-color-number",
    "Syntax Character": "$prism-color-char",
    "Syntax Attribute": "$prism-color-attr-name",
    // "Paragraph Font": "$font-family",
    // "Title Font": "$title-font-family",
    // "Monospace Font": "$code-font-family",
    "Monospace Font Adjust": "",
    "Line Height Multiplier": "$line-height",
    "Line Width Multiplier": "",
    "Paragraph Spacing Multiplier": "",
    "H1 Font Size Multiplier": "$h1-font-size",
    "H2 Font Size Multiplier": "$h2-font-size",
    "H3 Font Size Multiplier": "$h3-font-size",
    "Base Text Size": "$font-size",
    "Base Text Size iOS": "",
  }
  
  var xml = fs.readFileSync(file, 'utf8');
  var val = plist.parse(xml);
  
  variables = ""
  
  val.forEach(i => { 
    const { key, value } = i
    if (!dict[key]) return;
    variables += `${dict[key]}: ${value};\n`
  })
  
  console.log(variables)
}

convert('theme.theme')