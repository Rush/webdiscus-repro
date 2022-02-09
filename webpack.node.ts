import { writeFile } from 'fs';
import { join, resolve } from 'path';
import { Compiler, Configuration } from 'webpack';

const path = require('path');
const nodeExternals = require('webpack-node-externals');
const TerserPlugin = require('terser-webpack-plugin');

const tsconfig = 'tsconfig.node.json';

const extraPlugins: any[] = [];

const tsLoaderRule = {
  test: /\.ts$/,
  use: {
    loader: 'ts-loader',
    options: {
      configFile: tsconfig,
      transpileOnly: false,
      experimentalFileCaching: true,
    },
  },
};

const optimizationOptions = process.env.NO_MINIFY ? {
  optimization: {
    minimize: false,
    namedModules: true,
  },
} : {};

const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

interface WebpackOptions {
  mode: 'development' | 'production';
}

const cssLoader = {
  loader: 'css-loader',
  options: {
    sourceMap: true,
    importLoaders: 2,
    // needs to be false for "to-string" loader to work
    esModule: false,
  },
};

export default function (env: any, { mode }: WebpackOptions) {
  const devtool = mode === 'development' ? 'nosources-source-map' : 'source-map';

  const fileLoader = {
    loader: 'file-loader',
    options: {
      esModule: false,
      outputPath: '../public-built',
      context: path.resolve(__dirname),
      publicPath: '/',
      name: '[hash].[ext][query]'
    },
  };

  const optimization: Configuration['optimization'] = mode === 'development' ? {
    minimize: false,
    nodeEnv: false,
  } : {
    splitChunks: {
      chunks: 'all',
    },
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          // needs to be false for function parameters to not be mangled and for Deepkit's DI to work
          mangle: false,
        },
      }),
    ],
  };

  const entry = {
    'mainPublic': {
      import: './server/mainPublic.ts',
      // allow exporting utility functions
      library: {
        type: 'commonjs',
      }
    },
  };
  const output: Configuration['output'] = {
    filename: '[name].js',
    path: path.resolve(__dirname, 'server'),
    chunkFilename: '[name].chunk.js',
    pathinfo: false,
    assetModuleFilename: 'public-built/[hash][ext][query]',
    publicPath: '../',
    devtoolModuleFilenameTemplate: (info: any) => {
      if (info.resourcePath.startsWith('webpack')) {
        return `webpack://${info.resourcePath}`;
      }
      return info.absoluteResourcePath;
    },
  };

  const coreConfig: Configuration = {
    name: 'server',
    entry,
    output,
    target: 'node',
    stats: mode === 'development' ? 'errors-warnings' : 'normal',
    devtool,
    ...optimizationOptions,
    externalsPresets: { node: true },
    externals: [
      nodeExternals(),
      nodeExternals({
        modulesDir: resolve(__dirname, '..', 'node_modules'),
      }),
      /webpack\./,
    ],
    optimization,
    resolve: {
      modules: ['node_modules'],
      unsafeCache: true,
      extensions: ['.ts', '.js'],
      alias: {
        assets: process.env.REPRODUCE ?
          [ resolve(__dirname, 'assets').replace(/\\/g, '/'), resolve(__dirname, 'assets2').replace(/\\/g, '/') ]
          : resolve(__dirname, 'assets').replace(/\\/g, '/')
      },
      plugins: [
        new TsconfigPathsPlugin({
          configFile: tsconfig,
        }),
      ],
    },
    cache: {
      type: 'filesystem',
    },
    node: {
      __dirname: false,
      __filename: false,
    },
    plugins: [
      // new BannerPlugin({ banner: '#!/usr/bin/env node', raw: true }),
      new (class FinalHook {
        apply(compiler: Compiler) {
          compiler.hooks.afterEmit.tap('FinalHook', (options) => {
            // notify scripts/wait-for-file.js of a finished build
            writeFile(join(compiler.options.output.path!, '.webpack-emit'), '', () => { });
          });
        }
      })(),
      ...extraPlugins,
    ],
    module: {
      rules: [
        tsLoaderRule,
        {
          test: /\.(gif|svg|jpg|png|woff2)$/,
          use: [fileLoader],
        },
        {
          test: /\.(webmanifest)$/,
          use: [fileLoader],
        },
        {
          test: /\.s[ac]ss$/i,
          use: ['to-string-loader', cssLoader, 'sass-loader'],
        },
        {
          test: /\.pug$/i,
          use: [{
            loader: '@webdiscus/pug-loader',
            options: {
              method: 'compile',
            }
          }],
        },
      ]
    },
    watchOptions: {
      ignored: /node_modules/,
    },
  };

  return coreConfig;
}
