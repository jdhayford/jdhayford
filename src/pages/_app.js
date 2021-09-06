import React from 'react'
import MainFrame from "../js/Frames/Main"

export default function MyApp({ Component, pageProps }) {
    console.log(Component)
    console.log(pageProps)
    return (
      <MainFrame>
        <Component {...pageProps} />
      </MainFrame>
    )
  }