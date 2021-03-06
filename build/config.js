/**
 * Created by zhangyatao on 2017/4/26.
 */

let path = require('path');
let json = require('rollup-plugin-json');
let babel = require('rollup-plugin-babel');
let replace = require('rollup-plugin-replace');
let buble = require('rollup-plugin-buble');
let alias = require('rollup-plugin-alias');
let flow = require('rollup-plugin-flow-no-whitespace');
let resolve = require('rollup-plugin-node-resolve');
const MODULE_NAME = 'Four';

let target = process.env.target || 'production';

module.exports = {
    entry: 'src/index.js',
    format: 'umd',
    moduleName: MODULE_NAME,
    plugins: [
        resolve(),
        json(),
        babel({
            exclude: 'node_modules/**'
        }),
        replace({
            ENVIRONMENT: JSON.stringify(target)
        }),
        flow(),
        buble(),
        alias({
            eventEmitter: path.resolve('./src/utilies/events/EventEmitter.js'),
            polyfill: path.resolve('./src/utilies/polyfill/index.js'),
            utilies: path.resolve('./src/utilies/util/index.js')
        })
    ],
    dest: 'dist/bundle.js',
    sourceMap: true
};