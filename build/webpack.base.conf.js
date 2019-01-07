const path = require('path');
const baseConfig = require('../config').base;
// const vueLoaderConfig = require('./vue-loader.conf.js');
const VueLoaderPlugin = require('vue-loader/lib/plugin')
// const ExtractTextPlugin = require('extract-text-webpack-plugin');
// const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const isProd = process.env.NODE_ENV === 'production';
const resolve = dir => path.join(__dirname, '..', dir);
const assetsPath = dir => path.posix.join(baseConfig.assetsPath, dir);

module.exports = {
  mode: isProd ? 'production' : 'development',
  context: path.resolve(__dirname, '../'),
  output: {
    path: path.resolve(__dirname, '../dist'),
    publicPath: '/dist/',
    filename: '[name]-[chunkhash].js'
  },
  // 配置模块如何被解析
  resolve: {
    // 自动解析文件扩展名(补全文件后缀)(从左->右)
    extensions: ['.js', '.vue', '.json'],

    // 配置别名映射
    alias: {
      vue$: 'vue/dist/vue.esm.js',
      src: resolve('src'),
      components: resolve('src/components'),
      widgets: resolve('src/widgets'),
      assets: resolve('src/assets'),
      views: resolve('src/views'),
      store: resolve('src/store'),
      utils: resolve('src/utils'),
      api: resolve('src/api')
    }
  },
  // 处理模块的规则(可在此处使用不同的loader来处理模块！)
  module: {
    rules: [
      {
        test: /\.js$/, // 资源路径
        loader: 'babel-loader?cacheDirectory=true', // 该路径执行的loader
        include: resolve('src'), // 指定哪个文件loader
        exclude: /node_modules/
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader'
        // options: vueLoaderConfig
      },
      {
        test: /\.(png|jpe?g|gif|svg|ico)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: assetsPath('media/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin()
    // new MiniCssExtractPlugin({
    //   // Options similar to the same options in webpackOptions.output// both options are optional
    //   filename: '/static/css/[name].[hash].css',
    //   chunkFilename: '/static/css/[id].[chunkhash].css'
    // })
  ]
};
