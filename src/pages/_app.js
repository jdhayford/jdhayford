import React from 'react'
import MainFrame from "../js/Frames/Main"
import GlobalCssStyles from '../js/utils/GlobalCssStyles'
import Head from 'next/head'
import JHFav from '../images/jh-fav.png'
import WebManifest from '../../manifest.webmanifest'


export default function MyApp({ Component, pageProps }) {
    return (
      <MainFrame>
        <Head>
            <meta charSet="utf-8" />
            <meta content="ie=edge" httpEquiv="x-ua-compatible" />
            <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, shrink-to-fit=no, user-scalable=no" />
            <meta name="google-site-verification" content="XNT2RSjb4doOV2Nsoy75SjRfrgqb2M5Epb41gVWfMsk" />
            <meta name="twitter:card" content="summary" />
            <meta name="twitter:site" content="@jdhayford" />
            <meta name="twitter:title" content="Jack Hayford" />
            <meta name="twitter:description" content="A bit about me and stuff I build" />
            <meta name="twitter:image" content="https://www.jdhayford.io/images/jh-logo.png" />
            <title>Jack Hayford</title>
            <link href={JHFav} rel="shortcut icon" />
            <meta content="width=device-width, initial-scale=1" name="viewport" />
            <link rel="manifest" href={WebManifest} />
        </Head>
        <link rel="stylesheet"
          href="https://use.fontawesome.com/releases/v5.8.1/css/all.css"
          integrity="sha384-50oBUHEmvpQ+1lW4y57PTFmhCaXp0ML5d60M1M7uH2+nqUivzIebhndOJK28anvf"
          crossOrigin="anonymous"
          onLoad={function() {this.onload=null;this.rel='stylesheet'}}
        />
        <GlobalCssStyles />
        <Component {...pageProps} />
      </MainFrame>
    )
  }