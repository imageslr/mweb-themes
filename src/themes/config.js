/**
 * 每次新增一个 mweb 主题文件，都需要在这里新增一项，字段包括：
 * - file：文件名
 * - mode（可选）："dark"，是否是深色主题
 */

const themes = {
  ayu: { file: "mweb-ayu.scss", isMWeb4EditorThemeCompatible: true },
  "ayu-mirage": {
    file: "mweb-ayu-mirage.scss",
    mode: "dark",
    isMWeb4EditorThemeCompatible: true,
  },
  "bear-default": {
    file: "mweb-bear-default.scss",
    isMWeb4EditorThemeCompatible: true,
  }, // black primary color
  charcoal: {
    file: "mweb-charcoal.scss",
    mode: "dark",
    isMWeb4EditorThemeCompatible: true,
  }, // Night Text Theme
  cobalt: {
    file: "mweb-cobalt.scss",
    mode: "dark",
    isMWeb4EditorThemeCompatible: true,
  },
  contrast: { file: "mweb-contrast.scss", isMWeb4EditorThemeCompatible: true },
  "d-boring": {
    file: "mweb-d-boring.scss",
    isMWeb4EditorThemeCompatible: true,
  },
  "dark-graphite": {
    file: "mweb-dark-graphite.scss",
    mode: "dark",
    isMWeb4EditorThemeCompatible: true,
  },
  default: { file: "mweb-default.scss" }, // raw html
  dieci: {
    file: "mweb-dieci.scss",
    mode: "dark",
    isMWeb4EditorThemeCompatible: true,
  },
  dracula: {
    file: "mweb-dracula.scss",
    mode: "dark",
    isMWeb4EditorThemeCompatible: true,
  },
  "duotone-heat": {
    file: "mweb-duotone-heat.scss",
    isMWeb4EditorThemeCompatible: true,
  },
  "duotone-light": {
    file: "mweb-duotone-light.scss",
    isMWeb4EditorThemeCompatible: true,
  },
  gandalf: { file: "mweb-gandalf.scss", isMWeb4EditorThemeCompatible: true },
  gotham: {
    file: "mweb-gotham.scss",
    mode: "dark",
    isMWeb4EditorThemeCompatible: true,
  },
  indigo: { file: "mweb-indigo.scss" },
  jzman: { file: "mweb-jzman.scss" },
  lighthouse: {
    file: "mweb-lighthouse.scss",
    mode: "dark",
    isMWeb4EditorThemeCompatible: true,
  },
  lark: { file: "mweb-lark.scss", isMWeb4EditorThemeCompatible: true },
  "lark-bold-color": {
    file: "mweb-lark-bold-color.scss",
    isMWeb4EditorThemeCompatible: true,
  },
  nord: {
    file: "mweb-nord.scss",
    mode: "dark",
    isMWeb4EditorThemeCompatible: true,
  },
  "olive-dunk": {
    file: "mweb-olive-dunk.scss",
    isMWeb4EditorThemeCompatible: true,
  },
  panic: {
    file: "mweb-panic.scss",
    mode: "dark",
    isMWeb4EditorThemeCompatible: true,
  },
  "red-graphite": {
    file: "mweb-red-graphite.scss",
    isMWeb4EditorThemeCompatible: true,
  },
  smartblue: {
    file: "mweb-smartblue.scss",
  },
  "solarized-dark": {
    file: "mweb-solarized-dark.scss",
    mode: "dark",
    isMWeb4EditorThemeCompatible: true,
  },
  "solarized-light": {
    file: "mweb-solarized-light.scss",
    isMWeb4EditorThemeCompatible: true,
  },
  toothpaste: {
    file: "mweb-toothpaste.scss",
    mode: "dark",
    isMWeb4EditorThemeCompatible: true,
  },
  typo: { file: "mweb-typo.scss" },
  "v-green": { file: "mweb-v-green.scss" },
  vue: { file: "mweb-vue.scss" },
};

module.exports = themes;
