const { CMD } = require('../util/constant');
const { ifArg } = require('../util/config');

const babelLoader = require('./BabelLoader');
const cssLoader = require('./CssLoader');
const eslintLoader = require('./EslintLoader');
const fontLoader = require('./FontLoader');
const imageLoader = require('./ImageLoader');
const lessLoader = require('./LessLoader');
const mediaLoader = require('./MediaLoader');
const pugLoader = require('./PugLoader');
const sassLoader = require('./SassLoader');
const scssLoader = require('./ScssLoader');
const scssModuleLoader = require('./ScssModuleLoader');
const tsxLoader = require('./TsxLoader');
const vueLoader = require('./VueLoader');

async function configureRules() {
  await ifArg(CMD.babel, async () => {
    await babelLoader();
  });

  await ifArg(CMD.css, async () => {
    await cssLoader();
  });

  await ifArg(CMD.eslint, async () => {
    await eslintLoader();
  });

  await ifArg(CMD.font, async () => {
    await fontLoader();
  });

  await ifArg(CMD.image, async () => {
    await imageLoader();
  });

  await ifArg(CMD.less, async () => {
    await lessLoader();
  });

  await ifArg(CMD.media, async () => {
    await mediaLoader();
  });

  await ifArg(CMD.pug, async () => {
    await pugLoader();
  });

  await ifArg(CMD.sass, async () => {
    await sassLoader();
  });

  await ifArg(CMD.scss, async () => {
    await scssLoader();
  });

  await ifArg(CMD['scss-module'], async () => {
    await scssModuleLoader();
  });

  await ifArg(CMD.ts, async () => {
    await tsxLoader();
  });

  await ifArg(CMD.vue, async () => {
    await vueLoader();
  });
}

module.exports = {
  configureRules
};
