const nodeExternals = require('webpack-node-externals')

module.exports = {
  mode: 'development',
  target: 'node',
  devtool: 'inline-source-map',
  entry: './src/server/index.js',
  externals: [
    nodeExternals()
  ],
  output: {
    filename: 'server.js'
  }
}
