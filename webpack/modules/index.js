import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';

import imports from 'postcss-import';
import url from 'postcss-url';
import cssnext from 'postcss-cssnext';

import properties from 'postcss-custom-properties';
import mqpacker from 'css-mqpacker';
import smootheFonts from 'postcss-font-smoothing';
import reporter from 'postcss-reporter';
import gradients from 'postcss-easing-gradients';
import cssnano from 'cssnano';
import vars from 'postcss-advanced-variables';
import { source } from '../paths';

export const generateSourceMaps = ({ devtool }) => ({
  devtool,
});

export const createBuildAnalyzer = () => ({
  plugins: [
    new BundleAnalyzerPlugin({
      analyzerMode: 'disabled',
      generateStatsFile: true,
      statsFilename: 'build-stats.json',
      openAnalyzer: false,
    }),
  ],
});

export const loadPostCSS = () => ({
  loader: 'postcss-loader',
  options: {
    syntax: 'postcss-scss',
    ident: 'postcss',
    plugins: () => [
      imports({
        getPath: source,
        path: [source],
        skipDuplicates: true,
      }),
      url({
        basePath: source,
      }),
      gradients(),
      properties(),
      smootheFonts(),
      vars(),
      cssnext({
        features: {
          autoprefixer: true,
          customProperties: false,
          applyRule: false,
        },
      }),
      mqpacker(),
      reporter(),
      cssnano(),
    ],
  },
});
