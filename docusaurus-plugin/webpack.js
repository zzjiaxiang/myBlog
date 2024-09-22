module.exports = (context, options) => ({
  name: 'docusaurus-plugin-webpack',
  configureWebpack(config, isServer, utils) {
    if (!isServer) {
      return {
        optimization: {
          splitChunks: {
            cacheGroups: {
              vendor: {
                test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
                name: 'react-vendors',
                chunks: 'all',
              },
              lottie: {
                test: /[\\/]node_modules[\\/]lottie-web[\\/]/,
                name: 'lottie-vendors',
                chunks: 'all',
              },
              docusaurus: {
                test: /[\\/]node_modules[\\/]@docusaurus[\\/]/,
                name: 'docusaurus-vendors',
                chunks: 'all',
              },
            },
          },
        },
      }
    }
  },
})
