const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const htmlWebpackTemplate = require('html-webpack-template');
const Dotenv = require('dotenv-webpack');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const withFonts = require('next-fonts');
const withImages = require('next-images')


module.exports = withImages(withFonts({
  compress: true,
  trailingSlash: true,
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // Note: we provide webpack above so you should not `require` it
    // Perform customizations to webpack config
    config.plugins.push(new webpack.IgnorePlugin(/\/__tests__\//))
    config.plugins.push(...[
      new Dotenv(),
      new CleanWebpackPlugin(['build']),
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'production'),
        },
      }),
      // Uncomment when evaluating build size
      // new BundleAnalyzerPlugin()
    ])

    config.module.rules.push(
      ...[
        // {
        //   test: /\.(png|svg|jpg|gif)$/,
        //   use: [
        //     {
        //       loader: 'file-loader',
        //       options: {
        //         name: 'images/[hash].[ext]',
        //       },
        //     },
        //   ],
        // },
        {
          test: /\.(mp4|webmanifest)$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                publicPath: '/_next/static/',
                outputPath: '/static',
                name: '[name].[ext]'
              },
            },
          ],
        },
        {
          test: /\.(md)$/,
          use: 'raw-loader',
        },
      ]
    )


    return config
  }
}))
