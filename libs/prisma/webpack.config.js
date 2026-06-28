const { NxAppWebpackPlugin } = require('@nx/webpack/app-plugin');
const { join } = require('path');

module.exports = {
  output: {
    path: join(__dirname, '../../dist/libs/prisma'),
    libraryTarget: 'commonjs2',
    clean: true,
  },
  plugins: [
    new NxAppWebpackPlugin({
      target: 'node',
      compiler: 'tsc',
      main: './src/index.ts', // 🚀 Tells Webpack where to find your entry point
      tsConfig: './tsconfig.lib.json', // 🚀 Points to the library's TypeScript settings
      optimization: false,
      outputHashing: 'none',
    }),
  ],
};
