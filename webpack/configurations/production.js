import merge from 'webpack-merge';
import CleanWebpackPlugin from 'clean-webpack-plugin';
import UglifyJsPlugin from 'uglifyjs-webpack-plugin';
import OptimizeCSSAssetsPlugin from 'optimize-css-assets-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { generateCommonConfiguration } from './common';
import { build } from '../paths';
import { createBuildAnalyzer } from '../modules';

export const generateProductionConfiguration = () =>
  merge(generateCommonConfiguration(), createBuildAnalyzer(), {
    mode: 'production',
    optimization: {
      nodeEnv: process.env.NODE_ENV,
      splitChunks: {
        cacheGroups: {
          default: false,
          commons: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendor',
            chunks: 'all',
            minChunks: 2,
          },
        },
      },
      minimizer: [
        new UglifyJsPlugin({
          cache: false,
          parallel: true,
          sourceMap: false,

          uglifyOptions: {
            compress: {
              inline: 1,
            },
            ecma: 8,
            warnings: false,
            output: {
              comments: false,
              beautify: false,
            },
            toplevel: false,
            nameCache: null,
            ie8: false,
            keep_classnames: undefined,
            keep_fnames: false,
            safari10: false,
          },
        }),
        new OptimizeCSSAssetsPlugin({}),
      ],
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: '[name].[contenthash].[hash:5].css',
        chunkFilename: '[name].[contenthash].[hash:5].css',
      }),
      new CleanWebpackPlugin(build, {
        allowExternal: true,
      }),
    ],
  });
