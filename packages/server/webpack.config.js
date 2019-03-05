const nodeExternals = require('webpack-node-externals')
const { IgnorePlugin } = require('webpack')

module.exports = {
  mode: 'development',
  target: 'node',
  devtool: 'inline-source-map',
  entry: './index.js',
  output: {
    filename: 'server.js'
  },
  externals: [
    nodeExternals()
  ],
  plugins: [
    // https://github.com/brianc/node-postgres/issues/838
    new IgnorePlugin(/^pg-native$/)
  ]
}
