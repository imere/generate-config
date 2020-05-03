# config-generator

Generate common used webpack config with builtin configs.

## Options

Loaders are not listed

### `--help`

Only show options

### `--enable-preview`

Generate a preview-only config file at

```js
process.cwd() + 'webpack.config.preview.only.js';
```

### `--babel`

### `--copy`

copy-webpack-plugin

### `--css`

### `--eslint`

### `--font`

### `--image`

### `--jsx`

### `--less`

### `--media`

### `--notify`

webpack-build-notifier

### `--pug`

### `--sass`

### `--scss`

### `--scss-module`

### `--stylelint`

stylelint-webpack-plugin

### `--ts`

### `--vue`

### `--workbox`

workbox-webpack-plugin

## Usage

use cli

```sh
node bin/index.js [--option]

# this will generate preview with all configs in production mode
node bin/index.js

# this only show available options
node bin/index.js --help

# enable vue support
node bin/index.js --vue
```

in webpack.config.js

```js
const { CMD, CLI, generateConfig } = require('generate-config');

const config = generateConfig(
    {
        ...CMD, // this will enable all builtin configs
        'enable-preview': CLI['enable-preview'], // this will generate a preview file
    },
    process.env.NODE_ENV
);

module.exports = config;
```

## Note

Some configs not listed here may be automatically applied. (like postcss and some env dependant configs)
