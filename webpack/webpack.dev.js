/* eslint-disable no-useless-escape */

const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// const CircularDependencyPlugin = require('circular-dependency-plugin');

const paths = {
	STATIC: path.resolve(process.cwd(), 'dist'),
	HTML_INDEX: path.resolve(process.cwd(), 'dist/index.html'),
};

module.exports = require('./webpack.base')({
	mode: 'development',
	devtool: 'cheap-module-eval-source-map',

	output: {
		filename: 'app.[hash].js',
		chunkFilename: '[name].bundle.js'
	},

	optimization: {
		minimize: false,
	},

	plugins: [
		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: JSON.stringify(process.env.NODE_ENV),
				WMS_HOST: JSON.stringify(process.env.WMS_HOST),
				WMS_PORT: JSON.stringify(process.env.WMS_PORT),
			},
		}),
		new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /en/),
		new HtmlWebpackPlugin({
			template: paths.HTML_INDEX,
			filename: 'index.html',
			inject: true,
		}),
		// new CircularDependencyPlugin({
		// 	exclude: /a\.js|node_modules/, // exclude node_modules
		// 	failOnError: false, // show a warning when there is a circular dependency
		// }),
	],
	devServer: {
		compress: true,
		port: 3000,
		host: '0.0.0.0',
		historyApiFallback: true,
		publicPath: '/',
		contentBase: paths.STATIC
	},
});
