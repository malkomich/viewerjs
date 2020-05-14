const babel = require('rollup-plugin-babel');
const createBanner = require('create-banner');
const resolve = require('@rollup/plugin-node-resolve');
const commonjs = require('@rollup/plugin-commonjs');
const { terser } = require('rollup-plugin-terser');

const fileName = 'viewerjs';
const umdName = 'Viewer';
const banner = createBanner({
  data: {
    name: `${fileName}.js`,
    year: '2020',
  },
});

module.exports = {
  input: 'src/index.js',
  output: [
    {
      banner,
      name: umdName,
      file: `dist/${fileName}.js`,
      format: 'umd',
      globals: {
        'crypto-js': 'CryptoJS',
      },
    },
    {
      banner,
      name: umdName,
      file: `dist/${fileName}.min.js`,
      format: 'umd',
      globals: {
        'crypto-js': 'CryptoJS',
      },
    },
    {
      banner,
      file: `dist/${fileName}.common.js`,
      format: 'cjs',
    },
    {
      banner,
      file: `dist/${fileName}.esm.js`,
      format: 'esm',
    },
    {
      banner,
      name: umdName,
      file: `docs/js/${fileName}.js`,
      format: 'umd',
      globals: {
        'crypto-js': 'CryptoJS',
      },
    },
  ],
  plugins: [
    babel(),
    resolve({
      preferBuiltins: false,
      mainFields: ['main'],
    }),
    commonjs({
      include: /node_modules/,
    }),
    terser({
      include: [/^.+\.min\.js$/],
    }),
  ],
  external: ['crypto-js'],
};
