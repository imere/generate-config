const { CMD } = require('../util/constant');
const config = require('../util/config');

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

function configureRules() {
  const { args } = config;

  if (args[CMD.babel]) {
    babelLoader();
  }

  if (args[CMD.css]) {
    cssLoader();
  }

  if (args[CMD.eslint]) {
    eslintLoader();
  }

  if (args[CMD.font]) {
    fontLoader();
  }

  if (args[CMD.image]) {
    imageLoader();
  }

  if (args[CMD.less]) {
    lessLoader();
  }

  if (args[CMD.media]) {
    mediaLoader();
  }

  if (args[CMD.pug]) {
    pugLoader();
  }

  if (args[CMD.sass]) {
    sassLoader();
  }

  if (args[CMD.scss]) {
    scssLoader();
  }

  if (args[CMD['scss-module']]) {
    scssModuleLoader();
  }

  if (args[CMD.ts]) {
    tsxLoader();
  }

  if (args[CMD.vue]) {
    vueLoader();
  }
}

module.exports = {
  configureRules
};
