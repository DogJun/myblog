const argv = require('yargs-parser')(process.argv.slice(2)) // 获取命令行参数
const merge = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { join,resolve } = require('path')
const _mode = argv.mode || 'development'
// const _modeflag = _mode === 'production' ? true : false
let _mergeConfig = ''
console.log(argv.env)
if (argv.env === 'server') {
  console.log('server')
  _mergeConfig = require(`./config/webpack.server.js`)
} else {
  console.log('else')
  _mergeConfig = require(`./config/webpack.${_mode}.js`)
}
const { VueLoaderPlugin } = require('vue-loader')
let _plugins = [new VueLoaderPlugin()]
// 默认配置
let defaultConfig = {
  output: {
    path: join(__dirname, './dist/assets'),
    publicPath: '/',
    filename: 'scripts/[name].bundle.js'
  },
  module: {
    rules: [{
      test: /\.vue$/,
      loader: 'vue-loader',
      options: {
        // extractCSS: true
      }
    }, {
      test: /\.js$/,
      loader: 'babel-loader'
    }, {
      test: /\.(png|jpg|gif|eot|woff|woff2|ttf|svg|otf)$/,
      use: [{
        loader: 'file-loader',
        options: {
          name: _mode == "production" ? "images/[name].[hash:5].[ext]" : "images/[name].[ext]"
        }
      }]
    }, {
      test: /\.css$/,
      use: [
        'vue-style-loader',
        'css-loader'
      ]
    }]
  },
  // watch: !_modeflag,
  // watchOptions: {
  //   ignored: /node_modules/,
  //   aggregateTimeout: 300,
  //   poll: 1
  // },
  // optimization: {
  //   // 原 CommonsChunkPlugin 配置
  //   splitChunks: {
  //     cacheGroups: {
  //       common: {
  //         chunks: 'all',
  //         name: 'common',
  //         minChunks: 2
  //       }
  //     }
  //   },
  //   runtimeChunk: {
  //     name: 'runtime'
  //   }
  // },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/webapp/index.html',
      filename: 'index.html',
      inject: false
    }),
    ..._plugins,
  ],
  resolve: {
    modules: [
      resolve(__dirname, 'node_modules'), // 使用绝对路径指定 node_modules，不做过多查询
    ],
    // 删除不必要的后缀自动补全，少了文件后缀的自动匹配，即减少了文件路径查询的工作
    extensions: [".js", ".css", ".vue"],
    // 避免新增默认文件，编码时使用详细的文件路径，代码会更容易解读，也有益于提高构建速度
    mainFiles: ['index']
  }
}

module.exports = merge(defaultConfig, _mergeConfig)