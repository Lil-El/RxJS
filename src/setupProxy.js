const { createProxyMiddleware } = require('http-proxy-middleware')

module.exports = function (app) {
  app.use(
    '/search',
    createProxyMiddleware({
      target: 'https://gitee.com/',
      changeOrigin: true,
      pathRewrite: {
        '/search': '/search',
      },
    })
  )
}
