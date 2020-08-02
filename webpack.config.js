const webpack = require('webpack');
const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const htmlWebpackTemplate = require('html-webpack-template');
const Dotenv = require('dotenv-webpack');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;


module.exports = {
  entry: './src/js/app.js',
  output: {
    filename: 'dist.[hash].js',
    path: path.resolve(__dirname, 'build'),
    publicPath: '/',
  },
  devServer: {
    port: 3001,
    disableHostCheck: true,
    historyApiFallback: true,
    hot: true,
  },
  mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /\.(png|svg|jpg|gif|mp4)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'images/[hash].[ext]',
            },
          },
        ],
      },
      {
        test: /\.(m4a)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'audio/[name].[ext]',
            },
          },
        ],
      },
      {
        test: /\.(mp3|ogg|wav)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'samples/[name].[ext]',
            },
          },
        ],
      },
      {
        test: /\.(md)$/,
        use: ['raw-loader'],
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'fonts/[hash].[ext]',
            },
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  plugins: [
    new Dotenv(),
    new CleanWebpackPlugin(['build']),
    new HtmlWebpackPlugin({
      inject: false,
      template: htmlWebpackTemplate,
      appMountId: 'root',
      favicon: './src/images/jh-fav.png',
      meta: [
        {
          name: 'viewport',
          content:
            'width=device-width, initial-scale=1, maximum-scale=1, shrink-to-fit=no, user-scalable=no',
        },
        {
          name: 'google-site-verification',
          content: 'XNT2RSjb4doOV2Nsoy75SjRfrgqb2M5Epb41gVWfMsk'
        },
        {
          name: 'twitter:card',
          content: 'summary'
        },
        {
          name: 'twitter:site',
          content: '@jdhayford'
        },
        {
          name: 'twitter:title',
          content: 'Jack Hayford'
        },
        {
          name: 'twitter:description',
          content: 'A bit about me and stuff I build'
        },
        {
          name: 'twitter:image',
          content: 'https://s3.amazonaws.com/www.jdhayford.io/images/jh-logo.png'
        },
      ],
      title: 'Jack Hayford',
      mobile: true,
      links: [
        {
          rel: 'stylesheet',
          href: 'https://cdn.jsdelivr.net/gh/konpa/devicon@master/devicon.min.css'
        },
        {
          href: 'https://use.fontawesome.com/releases/v5.8.1/css/all.css',
          rel: 'stylesheet',
          integrity: 'sha384-50oBUHEmvpQ+1lW4y57PTFmhCaXp0ML5d60M1M7uH2+nqUivzIebhndOJK28anvf',
          crossorigin: 'anonymous',
        },
        {
          href: 'https://cdnjs.cloudflare.com/ajax/libs/izitoast/1.4.0/css/iziToast.min.css',
          rel: 'stylesheet',
          type: 'text/css',
        },
        {
          rel: 'manifest',
          href: '/manifest.webmanifest'
        }
      ],
      scripts: [
        'https://apis.google.com/js/api.js',
        'https://cdnjs.cloudflare.com/ajax/libs/izitoast/1.4.0/js/iziToast.min.js',
      ],
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'production'),
      },
    }),
    // Uncomment when evaluating build size
    // new BundleAnalyzerPlugin()
  ],
  watch: process.env.WATCH === 'true',
  devtool: 'cheap-module-eval-source-map',
  performance: { hints: false },
};
