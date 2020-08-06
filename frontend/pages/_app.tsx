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
