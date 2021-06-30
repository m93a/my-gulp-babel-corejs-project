import webpack from 'webpack'
import gulp from 'gulp'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'
const ROOT = dirname(fileURLToPath(import.meta.url))
const { log } = console
const str = x => JSON.stringify(x, null, '....')

const babelConfig = {
    plugins: [
        '@babel/plugin-transform-object-assign',
        '@babel/plugin-transform-runtime'
    ],
    ignore: [
        'dist/**/*.js'
    ],
    presets: [
        ['@babel/preset-env', {
            useBuiltIns: 'usage',
            corejs: '3.15'
        }]
    ]
}

const webpackConfig = {
    entry: join(ROOT, 'src/index.js'),
    mode: 'development',
    output: {
        library: 'math',
        libraryTarget: 'umd',
        libraryExport: 'default',
        path: join(ROOT, 'dist/'),
        filename: 'bundle.js',
        globalObject: 'this',
    },
    optimization: {
        minimize: false
    },
    plugins: [],
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: babelConfig
                }
            }
        ]
    },
    devtool: 'source-map',
    cache: true
}

// create a single instance of the compiler to allow caching
const compiler = webpack(webpackConfig)


function bundle (done) {
    compiler.run(function (err, stats) {
        if (err) {
            log(str(err))
            done(err)
        }
        const info = stats.toJson()

        if (stats.hasWarnings()) {
            log('Webpack warnings:\n' + info.warnings.join('\n'))
        }

        if (stats.hasErrors()) {
            log('Webpack errors:\n' + info.errors.map(e => str(e)).join('\n'))
            done(new Error('Compile failed'))
        }

        log(`bundled`)

        done()
    })
}

gulp.task('bundle', bundle)
gulp.task('default', bundle)
