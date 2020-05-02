const config = require('../util/config');

function pugLoader() {
  const rule = config.chain.module.
    rule('pug').
    test(/\.pug$/u);

  rule.use('pug-plain').
    loader('pug-plain-loader').
    end();
}

module.exports = pugLoader;

