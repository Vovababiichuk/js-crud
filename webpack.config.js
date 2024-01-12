const path = require('path')
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin");

module.exports = {
  entry: './index.js',
  output: {
    path: path.join(__dirname, '/public'),
    publicPath: '/public/dist',
    filename: 'app.js',
  },
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  resolve: {
    fallback: {
      "stream": require.resolve("stream-browserify"),
      "util": require.resolve("util"),
      "path": require.resolve("path-browserify"),
      "url": require.resolve("url"),
      "buffer": require.resolve("buffer/"),
      fs: false,
      constants: require.resolve("constants-browserify"),
      http: require.resolve("stream-http"),
      https: require.resolve("https-browserify"),
      assert: require.resolve("assert/"),
      querystring: require.resolve("querystring-es3"),
      crypto: require.resolve("crypto-browserify"),
    stream: require.resolve("stream-browserify"),
    os: require.resolve("os-browserify/browser"),
    net: require.resolve("node-libs-browser/mock/net"),
    }
  },
  plugins: [
    new NodePolyfillPlugin(),
    // ...
  ],
}
