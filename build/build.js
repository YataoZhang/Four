/**
 * Created by zhangyatao on 2017/4/26.
 */
const fs = require('fs');
const path = require('path');
const zlib = require('zlib');
const rollup = require('rollup');
const uglify = require('uglify-js');

if (!fs.existsSync('dist')) {
    fs.mkdirSync('dist');
}

let config = require('./config');

rollup.rollup(config).then(function (bundle) {
    const code = bundle.generate(config).code;

    let minified = (config.banner ? config.banner + '\n' : '') + uglify.minify(code, {
            fromString: true,
            output: {
                screw_ie8: true,
                ascii_only: true
            },
            compress: {
                pure_funcs: ['makeMap']
            }
        }).code;

    return write('dist/four.min.js', minified, true)
});

function write(dest, code, zip) {
    return new Promise((resolve, reject) => {
        function report(extra) {
            console.log(blue(path.relative(process.cwd(), dest)) + ' ' + getSize(code) + (extra || ''));
            resolve()
        }

        fs.writeFile(dest, code, err => {
            if (err) return reject(err);
            if (zip) {
                zlib.gzip(code, (err, zipped) => {
                    if (err) return reject(err);
                    report(' (gzipped: ' + getSize(zipped) + ')')
                })
            } else {
                report()
            }
        })
    })
}

function getSize(code) {
    return (code.length / 1024).toFixed(2) + 'kb'
}

function blue(str) {
    return '\x1b[1m\x1b[34m' + str + '\x1b[39m\x1b[22m';
}
