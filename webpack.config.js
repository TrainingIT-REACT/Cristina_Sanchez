const webpack = require('webpack');
const path = require('path');
const HtmlWebPackPlugin = require("html-webpack-plugin");

const config = {
  entry: {
      main: './src/index.js',
      vendor: ['react', 'react-dom', 'react-redux', 'react-soundplayer','redux-thunk','spotify-web-api-node']
  },
  output: {
    path: path.resolve(__dirname, 'build'),
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: "babel-loader"
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  resolve: {
    extensions: ['*', '.js', '.jsx']
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: "./public/index.html",
      filename: "./index.html"
    }),
    new webpack.HotModuleReplacementPlugin()
  ],
  devServer: {
    contentBase: './',
    hot: true,
    historyApiFallback: true
  },
    optimization: {
        usedExports: true,
        sideEffects: true,
        runtimeChunk: "single",
        splitChunks: {
            cacheGroups: {
                vendor: {
                    test: 'vendor',
                    name : 'vendor',
                    enforce: true,
                    chunks: 'all'
                }
            }
        }
    }
}

// Modificamos la configuración según el modo
module.exports = (env, argv) => {
  // Comprobamos si estamos en desarrollo
  const isDevelopment = argv.mode === 'development';

  if (isDevelopment) {
    config.devtool = 'eval-source-map';
  } else {
    config.devtool = 'source-map'; // o hidden-source-map
  }

  return config;
};

