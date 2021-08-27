const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = merge(common, {
    mode: 'production',
    optimization: {
        //runtimeChunk: true,
         minimizer: [new UglifyJsPlugin({
             uglifyOptions: {
                 compress: {
                     
                     drop_console: true,
                    //  unsafe: true,
                    //  sequences: true,
                    //  dead_code: true,
                    //  conditionals: true,
                    //  booleans: true,
                    //  unused: true,
                    //  if_return: true,
                    //  join_vars: true,
                 }
             }
         })],
    }
});