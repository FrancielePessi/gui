var ExtractTextPlugin = require('extract-text-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var webpack = require('webpack');
var path = require('path');

module.exports = {
  entry: {
    devices: './src/js/index.js'
  },
  output: {
    publicPath: '/',
    filename: 'js/[name].js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [{loader: 'react-hot-loader'}, {loader: 'jsx-loader'}, {loader: 'babel-loader'}],
        exclude: /(node_modules|src\/components)/
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'sass-loader']
        })
      },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'file-loader',
        options: {mimetype: 'image/svg+xml'}
      },
      {
        test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
        loader: "file-loader",
        options: {mimetype: "application/font-woff"}
      },
      {
        test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
        loader: "file-loader",
        options: {mimetype: "application/font-woff"}
      },
      {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        loader: "file-loader",
        options: {mimetype:"application/octet-stream"}
      },
      {
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
        loader: "file-loader"
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin('style.css'),

    new CopyWebpackPlugin([
      { from: 'src/html/index.html', to: 'index.html' },
      { from: 'src/components', to: 'components' },
      { from: 'node_modules/leaflet/dist/leaflet.css', to: 'leaflet.css' },
      { from: 'node_modules/leaflet/dist/images', to: 'images' },
      { from: 'src/js/views/flows/vendor.js', to: 'js/vendor.js' },
      { from: 'node_modules/ace-builds/src-min', to: 'js/ace'},
      { from: 'src/img', to: 'images' }
    ]),

    new webpack.DefinePlugin({
      'process.env' : {
        NODE_ENV: JSON.stringify('production')
      }
    }),

    new webpack.optimize.UglifyJsPlugin()
  ]
};
