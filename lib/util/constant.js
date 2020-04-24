const CLI = {
  'enable-preview': '',
  help: ''
};

const CMD = {

  mode: '',

  /*
   * TODO: check bundle-analyzer
   * analyze: '',
   */
  copy: '',
  vue: '',
  babel: '',
  css: '',
  eslint: '',
  font: '',
  html: '',
  image: '',
  less: '',
  notify: '',
  scss: '',
  sass: '',
  ts: '',
  media: '',
  pug: '',
  'scss-module': '',
  jsx: '',
  stylelint: '',
  workbox: ''
};

// Set key to value
for (const key of Object.keys(CLI)) {
  CLI[key] = key;
}
for (const key of Object.keys(CMD)) {
  CMD[key] = key;
}

module.exports = {
  CMD: Object.freeze(CMD),
  CLI: Object.freeze(CLI)
};
