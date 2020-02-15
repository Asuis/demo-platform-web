module.exports = {
    devServer: {
        proxy: {
            '/api': {
                target: 'http://192.168.2.178:8000',
                changeOrigin: true,
                ws: true,
                pathRewrite: {
                  '^/api': ''
                }
            }
        }
    }
    
}