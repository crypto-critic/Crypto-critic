const path = require("path");
const fs = require('fs');
const resolveApp = relativePath => path.resolve(fs.realpathSync(process.cwd()), relativePath);

const entrypoint = resolveApp('client/index.js');
const appNodeModules =  resolveApp('node_modules');
const appClient = resolveApp('client');
const output = resolveApp('dist/assets/js');

module.exports = {
    entry: entrypoint,
    output: {
        path: output,
        filename: 'bundle.js'
    },
    resolve: {
        extensions: [ '.ts', '.tsx', '.js', '.jsx', '.scss', '.css', '.less' ]
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                include: appClient,
                loader: require.resolve('babel-loader'),
                exclude: appNodeModules
            },
            // {
            //     test: /\.css$/,
            //     use: [ 'style-loader', 'css-loader' ]
            // },
            {
                test: /\.(png|svg|jpg|gif|ico|jpeg)$/i,
                use: [
                    {
                        loader: 'url-loader'
                    }
                ]
            },
            {
                test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: 'url-loader?limit=10000&mimetype=application/font-woff'
            },
            {
                test: /\.(ttf|eot)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: 'file-loader'
            },
            {
                test: /\.otf(\?.*)?$/,
                use: 'file-loader?name=/fonts/[name].  [ext]&mimetype=application/font-otf'
            },
            {
                test: /\.(le|sc|c)ss$/,
                use: [
                    'style-loader',
                    'css-loader',
                    // 'postcss-loader',
                    {
                        loader: 'less-loader',
                        options: {
                            includePaths: [ path.resolve( './node_modules' ) ]
                        }
                    }]
            }
        ]
    },
    devtool: "cheap-module-eval-source-map"
};
