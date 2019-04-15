
module.exports = {

    devtool: "#eval-source-map",
    entry: './src/index.js',
    output: {
        path: __dirname,
        filename: './assets/iframely.js',
    },
    module: {
        loaders: [
            {
                test: /.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
            },
        ],
    },
};