const HtmlWebPackPlugin = require('html-webpack-plugin');
const path = require('path');

const webpackConfig = () => {
    return {
        entry: './src/index.js',
        output: {
            path: path.resolve(`${__dirname}/app`, 'dist'),
            filename: 'bundle.js',
            publicPath: '/',
        },
        module: {
            rules: [
                {
                    test: /\.(js|jsx)$/,
                    exclude: /node_modules/,
                    loader: 'babel-loader',
                    options: {
                        presets: [['@babel/preset-react',{ runtime: 'automatic' }], '@babel/preset-env'],
                    },
                },
                {
                    test: /\.css$/,
                    use: ['style-loader', 'css-loader'],
                },
            ],
        },
        resolve: {
            extensions: ['*', '.js', '.jsx'],
        },
        devtool: 'source-map',
        devServer: {
            historyApiFallback: true,
            proxy: {
                '/': {
                    target: 'http://localhost:3001',
                    secure: false
                }
            }
        },
        plugins: [
            new HtmlWebPackPlugin({
                template: './public/index.html',
                filename: './index.html',
            }),
        ],
    };
};

module.exports = webpackConfig;