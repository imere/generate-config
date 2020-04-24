const {CMD} = require('../util/constant');

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

/**
 * @param {import('webpack-chain')} config
 * @param {'none' | 'production' | 'development'} env
 * @param {import('yargs-parser').Arguments} args
 */
function configureRules(config, env, args) {

  if (args[CMD.babel]) {
    babelLoader(config, env, args);
  }

  if (args[CMD.css]) {
    cssLoader(config, env, args);
  }

  if (args[CMD.eslint]) {
    eslintLoader(config, env, args);
  }

  if (args[CMD.font]) {
    fontLoader(config, env, args);
  }

  if (args[CMD.image]) {
    imageLoader(config, env, args);
  }

  if (args[CMD.less]) {
    lessLoader(config, env, args);
  }

  if (args[CMD.media]) {
    mediaLoader(config, env, args);
  }

  if (args[CMD.pug]) {
    pugLoader(config, env, args);
  }

  if (args[CMD.sass]) {
    sassLoader(config, env, args);
  }

  if (args[CMD.scss]) {
    scssLoader(config, env, args);
  }

  if (args[CMD['scss-module']]) {
    scssModuleLoader(config, env, args);
  }

  if (args[CMD.ts]) {
    tsxLoader(config, env, args);
  }

  if (args[CMD.vue]) {
    vueLoader(config, env, args);
  }
}

module.exports = {
  configureRules
};
