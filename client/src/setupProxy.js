const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/king',
    createProxyMiddleware({
      target: "http://localhost:8080",
      changeOrigin: true,
      pathRewrite: {
        '^/king/': '/', // remove base path
      },
    })
  );
};