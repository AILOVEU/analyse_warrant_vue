module.exports = {
  publicPath: '/analyse_warrant_vue',
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