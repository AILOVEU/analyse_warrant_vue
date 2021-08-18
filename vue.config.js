module.exports = {
  publicPath: '/analyse_warrant_vue',
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