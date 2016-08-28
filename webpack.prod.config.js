var Path = require('path');
var Webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var CleanWebpackPlugin = require('clean-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');

var SRC_PATH = Path.join(__dirname, 'src');
var BUILD_PATH = Path.join(__dirname, 'dist');

module.exports = {
  entry: {
    app: Path.join(SRC_PATH, 'js/entry.js'),
  },
  output: {
    path: BUILD_PATH,
    publicPath: '../',
    filename: 'js/lfui.js',
  },
  plugins: [
    new Webpack.BannerPlugin('Lookfeel © hello@lookfeel.co'),
    new CleanWebpackPlugin(['dist']),
    new Webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
      },
    }),
    new Webpack.optimize.OccurrenceOrderPlugin(), //排序输出
    new ExtractTextPlugin('./css/lfui.css'),
    new CopyWebpackPlugin([{
      from: 'src/js/libs',
      to: 'js/libs',
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
          name: 'images/[name].[ext]',
        },
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url',
        query: {
          limit: 10000,
          importLoaders: 1,
          name: 'fonts/[name].[ext]',
        },
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('style', 'css?importLoaders=1!postcss', { publicPath: '../' }),
        exclude: /node_modules/,
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract('style', 'css?sourceMap!sass', { publicPath: '../' }),
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
