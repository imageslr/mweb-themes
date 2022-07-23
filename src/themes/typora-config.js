/**
 * 每次新增一个 typora 主题文件，都需要在这里新增一项，字段包括：
 * - file: 文件名
 * - mode（可选）: "dark"，是否是深色主题
 */

const themes = {
  ayu: { file: "typora-ayu.scss" },
  "ayu-mirage": {
    file: "typora-ayu-mirage.scss",
    mode: "dark",
  },
  charcoal: {
    file: "typora-charcoal.scss",
    mode: "dark",
  }, // Night Text Theme
  cobalt: {
    file: "typora-cobalt.scss",
    mode: "dark",
  },
  contrast: { file: "typora-contrast.scss" },
  "d-boring": {
    file: "typora-d-boring.scss",
  },
  "dark-graphite": {
    file: "typora-dark-graphite.scss",
    mode: "dark",
  },
  dieci: {
    file: "typora-dieci.scss",
    mode: "dark",
  },
  dracula: {
    file: "typora-dracula.scss",
    mode: "dark",
  },
  "duotone-heat": {
    file: "typora-duotone-heat.scss",
  },
  "duotone-light": {
    file: "typora-duotone-light.scss",
  },
  gandalf: { file: "typora-gandalf.scss" },
  gotham: {
    file: "typora-gotham.scss",
    mode: "dark",
  },
  indigo: {
    file: "type-indigo.scss",
  },
  lighthouse: {
    file: "mweb-lighthouse.scss",
    mode: "dark",
  },
  lark: { file: "typora-lark.scss" },
  "lark-bold-color": {
    file: "typora-lark-bold-color.scss",
  },
  nord: {
    file: "typora-nord.scss",
    mode: "dark",
  },
  "olive-dunk": {
    file: "typora-olive-dunk.scss",
  },
  panic: {
    file: "typora-panic.scss",
    mode: "dark",
  },
  "red-graphite": {
    file: "typora-red-graphite.scss",
  },
  "solarized-dark": {
    file: "typora-solarized-dark.scss",
    mode: "dark",
  },
  "solarized-light": {
    file: "typora-solarized-light.scss",
  },
  toothpaste: {
    file: "typora-toothpaste.scss",
    mode: "dark",
  },
};

module.exports = themes;
