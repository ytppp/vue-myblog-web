module.exports = {
  devServer: {
    proxy: {
      '/api': {
        target: 'http://www.ytpblog.com/api.php/',
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  }
}