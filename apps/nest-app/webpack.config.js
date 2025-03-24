const { NxAppWebpackPlugin } = require('@nx/webpack/app-plugin');
const { join } = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = {
  target: 'node', // Important for Node.js applications
  externals: [nodeExternals()], // Excludes node_modules from bundle
  output: {
    path: join(__dirname, '../../dist/apps/nest-app'), // Adjusted path
    filename: 'main.js', // Explicit output filename
    libraryTarget: 'commonjs2' // Proper module system for Node
  },
  plugins: [
    new NxAppWebpackPlugin({
      target: 'node',
      compiler: 'tsc',
      main: './src/main.ts',
      tsConfig: './tsconfig.app.json',
      assets: ['./src/assets'], // Simplified path
      optimization: false,
      outputHashing: 'none',
      generatePackageJson: true,
      outputFileName: 'main.js', // Explicit output filename
    }),
  ],
  resolve: {
    extensions: ['.ts', '.js', '.json'] // Added for better module resolution
  },
  stats: {
    warningsFilter: /^(?!CriticalDependenciesWarning$)/
  }
};