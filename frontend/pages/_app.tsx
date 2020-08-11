import App, { AppContext, AppInitialProps, AppProps } from "next/app"
import Head from "next/head"
import React from "react"
import { ThemeProvider } from "styled-components"

import { Footer, Header, ScrollToTop } from "../components/layout"
import { GlobalSeo } from "../components/seo"
import { GlobalStyle, theme } from "../components/theme"
import { useShrinkingClass } from "../hooks/shrinking"
import { getAllSections } from "../lib/api"

function MyApp({ Component, pageProps }: AppProps) {
  const shrinkingClass = useShrinkingClass()

  const { sections } = pageProps
  if (!sections) return <div />

  // noinspection HtmlRequiredTitleElement
  return (
    <div className={shrinkingClass}>
      <Head>
        <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link href="/assets/mui.min.css" rel="stylesheet" type="text/css" />
        <script src="/assets/mui.min.js" />
      </Head>
      <GlobalSeo />
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <Header sections={sections} />
        <Component {...pageProps} />
        <Footer sections={sections} />
        <ScrollToTop />
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
