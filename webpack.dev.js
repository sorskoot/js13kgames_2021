const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const fs = require('fs');

module.exports = merge(common, {
    mode: 'development',
    "devtool": "inline-source-map",
    devServer: {     
        hot: true,
        inline: true, 
        https: false,
        port:1337,     
        disableHostCheck: true,
        host: 'localhost',
        contentBase: __dirname+'/dist',
        //key: fs.readFileSync('c0dr.key'),
        //cert: fs.readFileSync('c0dr.crt'),
      //  ca: fs.readFileSync('c0dr.pem'),
      }
});