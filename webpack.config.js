const path = require('path');
const glob = require('glob');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const entry = glob.sync('./src/**/*.px.ts').reduce((acc, curr) => {
  return { ...acc, [path.basename(curr, '.ts')]: curr };
  }, {});

module.exports = {
  mode: 'development',
  entry,
  plugins: [new CleanWebpackPlugin()],
  output: {
    path: path.join(__dirname, 'dist'),
    libraryTarget: 'commonjs',
    filename: '[name].js'
  },
  resolve: {
    extensions: ['.ts', '.js']
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'babel-loader'
      }
    ]
  },
  target: 'web',
  externals: /k6(\/.*)?/,
  stats: {
    colors: true
  }
};
