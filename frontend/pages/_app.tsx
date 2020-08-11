import App, { AppContext, AppInitialProps, AppProps } from "next/app"
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

  // noinspection HtmlUnknownAttribute
  return (
    <div className={shrinkingClass}>
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
