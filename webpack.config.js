var Path = require('path');
var Webpack = require('webpack');
var HtmlwebpackPlugin = require('html-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');

var SRC_PATH = Path.resolve(__dirname, 'src');

module.exports = {
  entry: {
    app: Path.resolve(SRC_PATH, 'js/main.js'),
  },
  output: {
    path: Path.resolve(__dirname, 'build'),
    filename: 'js/[name].js',
  },
  resolve: {
    extensions: ['', '.js', '.vue'],
    alias: {
      'src': SRC_PATH,
      // 'assets': Path.resolve(SRC_PATH, 'assets'),
      'components': Path.resolve(SRC_PATH, 'components'),
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
        include: SRC_PATH,
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
          name: '../images/[name].[ext]',
        },
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url',
        query: {
          limit: 10000,
          name: '../fonts/[name].[ext]',
        },
      },
      {
        test: /\.css$/,
        loader: 'style!css?importLoaders=1!postcss',
        exclude: /node_modules/,
      },
      {
        test: /\.scss$/,
        loader: 'style!css!sass',
        exclude: /node_modules/,
      },
    ],
  },
  externals: {
    jquery: 'jQuery',
    tether: 'Tether',
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
      require('postcss-salad'),
    ];
  },
  eslint: {
    formatter: require('eslint-friendly-formatter'),
  },
  plugins: [
    new HtmlwebpackPlugin({
      title: 'Hello world',
      css: [Path.resolve(SRC_PATH, 'css/index.css')],
      template: Path.resolve(SRC_PATH, 'index.html'),
    }),
    new Webpack.HotModuleReplacementPlugin(),
    new CopyWebpackPlugin([{
      from: 'src/js/libs',
      to: 'js/libs',
    }]),
  ],
  devServer: {
    contentBase: './build',
    historyApiFallback: false,
    hot: false,
    inline: true,
    progress: true,
    port: 3000,
  },
  devtool: 'eval-source-map',
};
