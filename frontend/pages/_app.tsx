import App, { AppContext, AppInitialProps, AppProps } from "next/app"
import Head from "next/head"
import React from "react"
import { ThemeProvider } from "styled-components"

import Footer from "../components/Footer"
import Header from "../components/Header"
import { GlobalStyle, theme } from "../components/theme"
import { useShrinkingClass } from "../hooks/shrinking"
import { getAllSections } from "../lib/api"

function MyApp({ Component, pageProps }: AppProps) {
  const shrinkingClass = useShrinkingClass()

  const { sections } = pageProps

  return (
    <div className={shrinkingClass}>
      <Head>
        <title>Dansons le Blues à Marseille</title>
        <link href="//cdn.muicss.com/mui-0.10.3/css/mui.min.css" rel="stylesheet" type="text/css" />
        <script src="//cdn.muicss.com/mui-0.10.3/js/mui.min.js"></script>
      </Head>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <Header sections={sections} />
        <Component {...pageProps} />
        <Footer sections={sections} />
      </ThemeProvider>
    </div>
  )
}

MyApp.getInitialProps = async (appContext: AppContext): Promise<AppInitialProps> => {
  const sections = await getAllSections()
  const appProps = await App.getInitialProps(appContext)
  return {
    ...appProps,
    pageProps: {
      ...appProps.pageProps,
      sections,
    },
  }
}

export default MyApp
