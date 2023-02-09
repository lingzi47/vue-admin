 module.exports = {
     baseUrl: './',
     productionSourceMap: false,
     devServer: {
         //port:8888,
         proxy: {
             '/api': {
                 target: 'https://testboxapi.yujian02.xyz/api/',
                 changeOrigin: true, // 是否跨域
                 pathRewrite: {
                     '^/api': '/', //需要rewrite重写的, //本地联调
                 },
             }
             //  '/api': {
             //      target: 'http://jsonplaceholder.typicode.com',
             //      changeOrigin: true,
             //      pathRewrite: {
             //          '/api': ''
             //      }
             //  },
             //  '/testApi': {
             //      target: 'http://111.8.20.247:89/api/apph5api',
             //      changeOrigin: true,
             //      pathRewrite: {
             //          '^/testApi': '/testApi'
             //      }
             //  },
             //  '/ms': {
             //      target: 'https://www.easy-mock.com/mock/592501a391470c0ac1fab128',
             //      changeOrigin: true
             //  }
         }
     }
 }