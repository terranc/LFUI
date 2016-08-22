var Path = require('path');
var Webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var CleanWebpackPlugin = require('clean-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');

var SRC_PATH = Path.resolve(__dirname, 'src');
var BUILD_PATH = Path.resolve(__dirname, 'dist');

module.exports = {
  entry: {
    app: Path.resolve(SRC_PATH, 'entry.js'),
  },
  output: {
    path: BUILD_PATH,
    filename: 'lfui.js',
  },
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new Webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
      },
    }),
    new ExtractTextPlugin('lfui.css'),
    new CopyWebpackPlugin([{
      from: 'src/assets/libs',
      to: 'assets/libs',
    }]),
  ],
  resolve: {
    extensions: ['', '.js', '.vue'],
    alias: {
      'src': SRC_PATH,
    },
  },
  resolveLoader: {
    root: Path.join(__dirname, 'node_modules'),
  },
  module: {
    preLoaders: [
      {
        test: /\.js$/,
        loader: 'eslint',
        exclude: /node_modules/,
      },
    ],
    loaders: [
      {
        test: /\.vue$/,
        loader: 'vue',
      },
      {
        test: /\.js$/,
        loader: 'babel',
        include: Path.resolve(__dirname),
        exclude: /node_modules/,
      },
      {
        test: /\.json$/,
        loader: 'json',
      },
      {
        test: /\.html$/,
        loader: 'vue-html',
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url',
        query: {
          limit: 10000,
          name: Path.join('/assets', 'img/[name].[hash:7].[ext]'),
        },
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url',
        query: {
          limit: 10000,
          name: Path.join('/assets', 'fonts/[name].[hash:7].[ext]'),
        },
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('style', 'css?importLoaders=1!postcss'),
        exclude: /node_modules/,
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract('style', 'css!sass'),
        exclude: /node_modules/,
      },
    ],
  },
  externals: {
    jquery: 'jQuery',
    tether: 'Tether',
    UE: 'ueditor',
    moment: 'moment',
  },
  vue: {
    loaders: {
      js: 'babel!eslint',
    },
    postcss: [require('postcss-salad')],
  },
  postcss: function (bundler) {
    return [
      require('postcss-import')({
        addDependencyTo: bundler,
      }),
      require('postcss-salad')({
        browser: ['ie > 8', 'last 2 version'],
      }),
    ];
  },
  eslint: {
    formatter: require('eslint-friendly-formatter'),
  },
};
