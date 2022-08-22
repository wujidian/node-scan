module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ?
    '/vue-admin-web/' : '/',
  configureWebpack: {
    resolve: {
      alias: {
        '@': './src',
      }
    }
  },
}
