module.exports = {
	devtool: 'eval-source-map',

    entry: __dirname + "/app/main.js",
    output: {
		path: __dirname + "/public",
		filename: "bundle.js",
    },

    module: {
		loaders: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: 'babel-loader'
			},
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader'
            },
            {
                test: /\.json$/,
                loader: "json-loader"
            },
            {
                test: /\.(png|jpg)$/,
                loader: "url-loader"
            }
		]
    }
}
