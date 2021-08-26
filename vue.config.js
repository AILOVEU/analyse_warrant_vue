const Visualizer = require('webpack-visualizer-plugin');

module.exports = {
  publicPath: '/warrant',
  css: {
    // 是否分离css（插件ExtractTextPlugin）
    extract: true,
    // 是否开启 CSS source maps
    sourceMap: false,
    // css预设器配置项
    loaderOptions: {},
    // 是否启用 CSS modules for all css / pre-processor files.
    modules: false
  },
  configureWebpack: (config)=> {
    const plugins = config.plugins;
    plugins.push(new Visualizer({
      filename: './statics.html'
    }))
    config.devtool = 'cheap-eval-source-map'
  },
  devServer: {

    proxy: {
      '/waditu': {
        target: 'http://api.waditu.com',
        pathRewrite: {
          '^/waditu': ''
        }
      }
    }
  }
}