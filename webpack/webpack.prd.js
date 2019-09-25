/* eslint-disable no-useless-escape */

const webpack = require('webpack');
const path = require('path');
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
// const WebpackCleanupPlugin = require('webpack-cleanup-plugin');

const paths = {
	HTML_INDEX: path.resolve(process.cwd(), 'public/index.html'),
};

module.exports = require('./webpack.base')({
	mode: 'production',
	devtool: 'source-map',

	output: {
		filename: '[contenthash].js',
		chunkFilename: '[name].[contenthash].js'
	},

	optimization: {
		minimizer: [
			new TerserPlugin({
				parallel: true,
				sourceMap: true,
				terserOptions: {
					output: {
						comments: false,
					}
				},
			}),
		]
	},

	plugins: [
		// new WebpackCleanupPlugin(),
		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: JSON.stringify(process.env.NODE_ENV),
				WMS_HOST: JSON.stringify(process.env.WMS_HOST),
				WMS_PORT: JSON.stringify(process.env.WMS_PORT),
			},
		}),
		new LodashModuleReplacementPlugin,
		new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /en/),
		new HtmlWebpackPlugin({
			template: paths.HTML_INDEX,
			filename: 'index.html',
			minify: {
				removeComments: true,
				collapseWhitespace: true,
				removeRedundantAttributes: true,
				useShortDoctype: true,
				removeEmptyAttributes: true,
				removeStyleLinkTypeAttributes: true,
				keepClosingSlash: true,
				minifyJS: true,
				minifyCSS: true,
				minifyURLs: true,
			},
			inject: true,
		}),
		process.env.BUNDLE_ANALYZE === 'true' ? new BundleAnalyzerPlugin() : () => { }
	],
});
