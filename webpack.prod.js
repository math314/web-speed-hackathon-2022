const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

const overrides = {
  mode: 'production',
  devtool: 'source-map',
}

const client = merge(common[0], overrides);
const server = merge(common[1], overrides);

module.exports = [client, server];