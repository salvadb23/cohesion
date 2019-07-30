const proxy = require('http-proxy-middleware');

console.log(process.env.PROXY_URL);

module.exports = function(app) {
  app.use(proxy('/api', {
    target: process.env.PROXY_URL,
    changeOrigin: true,
    ws: true,
    pathRewrite: { '^/api': '' },
  }));
};
