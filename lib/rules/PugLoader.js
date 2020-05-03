const { config } = require('../util/config');
const { depend } = require('../util/depend');

function pugLoader() {
  depend.addImplicit('pug-plain-loader');

  const rule = config.chain.module.
    rule('pug').
    test(/\.pug$/u);

  rule.use('pug-plain-loader').
    loader('pug-plain-loader');
}

module.exports = pugLoader;

