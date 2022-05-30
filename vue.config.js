const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
    transpileDependencies: true,
    devServer: {
        // axios.post('/api/user/login')
        // axios.post('http://192.168.1.5:7001/user/login')
        // 当你配置完之后必须重启项目，否则不生效
        proxy: {
            '/api': {
                // 线上的接口   http://8.131.89.181:7001
                // 磊哥接口    http://192.168.0.123:7001
                target: 'http://192.168.0.120:7001', //服务端的域名地址
                ws: true,
                changeOrigin: true,
                pathRewrite: { '^/api': '' }
            }
        }
    }
})