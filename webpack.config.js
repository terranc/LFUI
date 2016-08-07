var Path = require('path'),
    Webpack = require('webpack'),
    HtmlwebpackPlugin = require('html-webpack-plugin'),
    projectRoot = Path.resolve(__dirname, './');

module.exports = {
  entry: {
    app: Path.resolve(projectRoot, 'src/main.js'),
  },
  output: {
    path: Path.resolve(__dirname, './build'),
    filename: '[name].js',
  },
  plugins: [
    new HtmlwebpackPlugin({
      title: 'Hello world',
      css: [Path.resolve(__dirname, 'src/css/index.css')],
      template: Path.resolve(__dirname, 'src/index.html'),
    }),
    new Webpack.HotModuleReplacementPlugin(),
    new Webpack.ProvidePlugin({
      fetch: 'imports?this=>global!exports?global.fetch!whatwg-fetch',
    }),
  ],
  resolve: {
    extensions: ['', '.js', '.vue'],
    alias: {
      'src': Path.resolve(__dirname, './src'),
    },
  },
  resolveLoader: {
    root: Path.join(__dirname, 'node_modules'),
  },
  module: {
    preLoaders: [
      {
        test: /\.js$/,
        loader: 'eslint-loader',
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
        include: projectRoot,
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
        test: /\.(png|jpg|gif|svg|woff2?|eot|ttf)(\?.*)?$/,
        loader: 'url',
        query: {
          limit: 10000,
          name: '[name].[ext]?[hash:7]',
        },
      },
      {
        test: /\.css$/,
        loader: 'style!css?importLoaders=1!postcss',
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
