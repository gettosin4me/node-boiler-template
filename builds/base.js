const path = require('path');
const webpack = require('webpack');

const paths = {
    js: path.resolve(__dirname, './../config/index.js'),
    files: [ './package.json', './.gitignore' ],
    test: {
        integration: './test/integration/**/*.js',
        unit: './test/unit/**/*.js'
    }
};

console.log(paths.js);

exports.entry = {
    app: paths.js
};

exports.resolve = {
    modules: [ path.resolve(__dirname, '../assets/js'), 'node_modules' ]
}

exports.module = {
    rules: [
        {
            test: /\.js$/,
            exclude: /node_modules/,
            use: [
                {
                    loader: 'babel-loader'
                }
            ]
        }
    ]
};

exports.plugins = [
    new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify('development')
    })
];
