const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

const overrides = {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    static: './dist',
  },
};
const client = merge(common[0], overrides);
const server = merge(common[1], overrides);

module.exports = [client, server];