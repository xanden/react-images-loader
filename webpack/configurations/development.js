import merge from 'webpack-merge';
import { HotModuleReplacementPlugin } from 'webpack';
import { generateCommonConfiguration } from './common';
import { generateSourceMaps } from '../modules';

export const generateDevelopmentConfiguration = () =>
  merge(
    generateCommonConfiguration(),
    {
      mode: 'development',
      devServer: {
        // hot: true,
        compress: true,
        watchContentBase: true,
        clientLogLevel: 'none',
        port: 3000,
        host: 'localhost',
        inline: true,
        historyApiFallback: true,
        overlay: true,
        stats: 'errors-only',
        quiet: true,
      },
      optimization: {
        minimize: false,
        removeAvailableModules: false,
        removeEmptyChunks: false,
        splitChunks: false,
      },
      performance: {
        hints: false,
      },
      plugins: [
        new HotModuleReplacementPlugin(),
      ],
    },
    generateSourceMaps({ devtool: 'cheap-module-eval-source-map' }),
  );
