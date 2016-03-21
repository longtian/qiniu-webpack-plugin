var path = require('path');
module.exports = {
  entry: path.join(__dirname, 'app', 'index.jsx'),
  output: {
    filename: '[name].js',
    path: path.join(__dirname, 'public'),
    publicPath: 'public/'
  },
  plugins: [],
  module: {
    loaders: [
      {
        test: /\.(jsx)$/,
        loader: 'babel',
        query: {
          presets: ["es2015", "react"]
        }
      },
      {
        test: /\.(css)$/,
        loader: "style!css"
      },
      {
        test: /\.(ttf|eot|svg|woff|woff2)$/,
        loader: 'file'
      },
      {
        test: /\.png$/,
        loader: 'file',
        query: {
          name: "[name].[ext]"
        }
      }
    ]
  }

}