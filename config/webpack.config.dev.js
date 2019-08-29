const path = require("path");
const fs = require('fs');
const resolveApp = relativePath => path.resolve(fs.realpathSync(process.cwd()), relativePath);
const clientEntryPoint = resolveApp('client/index.js');
const serverEntryPoint = resolveApp('dist/server.js')
const node_modules =  resolveApp('node_modules');
const client = resolveApp('client');
const output = resolveApp('dist/assets/js');
const assets = resolveApp('dist/assets');
const themes = resolveApp('client/themes');
const components = resolveApp('client/components');
const endpoints = resolveApp('endpoints');
const services = resolveApp('client/services')
const locales = resolveApp('client/locales')
const stores = resolveApp('client/stores')

module.exports = {
    mode: 'development',
    watch: true,
    entry: clientEntryPoint,
    output: {
        path: output,
        filename: 'bundle.js'
    },
    optimization: {
        splitChunks: {
          chunks: 'async',
          minSize: 30000,
          maxSize: 0,
          minChunks: 1,
          maxAsyncRequests: 5,
          maxInitialRequests: 3,
          automaticNameDelimiter: '~',
          automaticNameMaxLength: 30,
          name: true,
          cacheGroups: {
            vendors: {
              test: /[\\/]node_modules[\\/]/,
              priority: -10
            },
            default: {
              minChunks: 2,
              priority: -20,
              reuseExistingChunk: true
            }
          }
        }
    },
    resolve: {
        extensions: [ '.js', '.jsx' ],
        alias: {
            themes,
            node_modules,
            components,
            services,
            endpoints,
            stores,
            locales,
            assets
        }
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                include: [
                    endpoints,
                    client,
                    path.join(__dirname, "../node_modules/react-intl"),
                    // path.join(__dirname, "node_modules/intl-messageformat"),
                    // path.join(__dirname, "node_modules/intl-messageformat-parser")
                ],
                loader: 'babel-loader',
                // exclude: resolveApp('node_modules')
            },
            {
                test: /\.js.map$/,
                loader: 'ignore-loader'
            },
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
                test: /\.less$/,
                use: [
                    'style-loader',
                    'css-loader',
                    {
                        loader: 'less-loader',
                        options: {
                            includePaths: [ node_modules ]
                        }
                    }
                ]
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                test: /\.scss$/,
                use: [
                    "style-loader",
                    "css-loader",
                    "sass-loader"
                ]
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },
        ]
    },
    devtool: "cheap-module-eval-source-map"
};
