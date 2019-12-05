module.exports = (Port) => `const merge = require('webpack-merge');
const baseConfig = require('./base.config.js');
var path = require('path');

module.exports = merge(baseConfig(), {

    output: {
      publicPath: "/bundle/",
      filename: 'bundle.js',
    },
    devtool: 'source-map',
    devServer: {
       port: ${Port},
       host: '0.0.0.0',
      disableHostCheck: true,
       historyApiFallback: {
         rewrites: [{
          from: /./,
          to: '/src/index.html'
         }]
       },
    }
  })
`