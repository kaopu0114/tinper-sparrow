var webpack = require('webpack');
var UglifyJsPlugin = webpack.optimize.UglifyJsPlugin;
var path = require('path');
var env = require('yargs').argv.mode;

var libraryName = 'sparrow';

var plugins = [],
	outputFile;

if(env === 'build') {
	plugins.push(new UglifyJsPlugin({
		minimize: true
	}));
	outputFile = libraryName + '.min.js';
} else {
	outputFile = libraryName + '.js';
}

var config = {
	entry: __dirname + '/js/index.js',
	devtool: 'source-map',
	output: {
		path: __dirname + '/dist',
		filename: outputFile,
		//library: 'u',
		libraryTarget: 'umd',
		umdNamedDefine: true
	},
	module: {
		loaders: [{
			test: /(\.jsx|\.js)$/,
			loader: 'babel',
			exclude: /(bower_components)/
		}, {
			test: /(\.jsx|\.js)$/,
			loader: "eslint-loader",
			exclude: /node_modules/
		}]
	},
	resolve: {
		root: path.resolve('./js'),
		extensions: ['', '.js']
	},
	plugins: plugins
};

module.exports = config;
