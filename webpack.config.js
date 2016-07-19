var path = require('path'),
  Webpack = require('webpack'),
  HtmlwebpackPlugin = require('html-webpack-plugin'),
  projectRoot = path.resolve(__dirname, './');

module.exports = {
  entry: {
    app: path.resolve(projectRoot, 'src/main.js'),
  },
  output: {
    path: path.resolve(__dirname, './build'),
    filename: '[name].js'
  },
  plugins: [
    new HtmlwebpackPlugin({
      title: 'Hello world',
      css: [path.resolve(__dirname, 'src/css/index.css')],
      template: path.resolve(__dirname, 'src/index.html'),
    }),
    new Webpack.HotModuleReplacementPlugin(),
  ],
  resolve: {
    extensions: ['', '.js', '.vue'],
    alias: {
      'src': path.resolve(__dirname, './src')
    }
  },
  resolveLoader: {
    root: path.join(__dirname, 'node_modules')
  },
  module: {
    preLoaders: [
      {
        test: /\.js$/,
        loader: "eslint-loader",
        exclude: /node_modules/
      }
    ],
    loaders: [
      {
        test: /\.vue$/,
        loader: 'vue'
      },
      {
        test: /\.js$/,
        loader: 'babel',
        include: projectRoot,
      },
      {
        test: /\.json$/,
        loader: 'json'
      },
      {
        test: /\.html$/,
        loader: 'vue-html'
      },
      {
        test: /\.(png|jpg|gif|svg|woff2?|eot|ttf)(\?.*)?$/,
        loader: 'url',
        query: {
          limit: 10000,
          name: '[name].[ext]?[hash:7]'
        }
      },
      {
        test: /\.css$/,
        loader: 'style!css?importLoaders=1&localIdentName=[local]!postcss',
        exclude: /node_modules/
      }
    ]
  },
  vue: {
    loaders: {
      js: 'babel!eslint'
    }
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
    formatter: require('eslint-friendly-formatter')
  },
  devServer: {
    contentBase: './build',
    historyApiFallback: false,
    hot: false,
    inline: true,
    progress: true,
    port: 3000
  },
  devtool: 'eval-source-map',
}
