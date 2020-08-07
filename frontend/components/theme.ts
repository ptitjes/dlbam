import { DefaultTheme, createGlobalStyle } from "styled-components"
import normalize from "styled-normalize"

export const breakpoints = {
  small: 640,
  medium: 960,
  large: 1200,
  extraLarge: 1600,
}

export const theme: DefaultTheme = {
  colors: {
    primary: "#0070f3",
    banner: "#003473",
    o1: "#1361BF",
    o2: "#BF7C00",
    o3: "#734A00",

    // Complementary colors
    c1: "#0070F3",
    c2: "#9ECBFF",
    c3: "#5382B8",
    c4: "#6B4500",
    c5: "#b88224",

    // Complementary colors 2
    c1_2: "#0076F5",
    c2_2: "#D9EAFC",
    c3_2: "#5383B8",
    c4_2: "#704C0D",
    c5_2: "#FFA000",
  },
  sizes: {
    headerSmallSize: 80,
    headerLargeSize: 160,
  },
}

export const GlobalStyle = createGlobalStyle`
  ${normalize}

  @font-face {
      font-family: 'Coiny';
      src: url('/fonts/coiny-regular-webfont.woff2') format('woff2'),
           url('/fonts/coiny-regular-webfont.woff') format('woff');
      font-weight: normal;
      font-style: normal;
  
  }
  
  @font-face {
      font-family: 'Montserrat';
      src: url('/fonts/montserrat-regular-webfont.woff2') format('woff2'),
           url('/fonts/montserrat-regular-webfont.woff') format('woff');
      font-weight: normal;
      font-style: normal;
  }

  @font-face {
      font-family: 'Montserrat';
      src: url('/fonts/montserrat-italic-webfont.woff2') format('woff2'),
           url('/fonts/montserrat-italic-webfont.woff') format('woff');
      font-weight: normal;
      font-style: italic;
  }
  
  @font-face {
      font-family: 'Montserrat';
      src: url('/fonts/montserrat-semibold-webfont.woff2') format('woff2'),
           url('/fonts/montserrat-semibold-webfont.woff') format('woff');
      font-weight: bold;
      font-style: normal;
  }
  
  @font-face {
      font-family: 'Montserrat';
      src: url('/fonts/montserrat-semibolditalic-webfont.woff2') format('woff2'),
           url('/fonts/montserrat-semibolditalic-webfont.woff') format('woff');
      font-weight: bold;
      font-style: italic;
  }

  html,
  body {
    padding: 0;
    background-color: ghostwhite;
    color: #555555;

    font-family: Montserrat;
    font-size: 18px;
    font-weight: normal;
    line-height: 1.5;
    -webkit-text-size-adjust: 100%;
  }
  
  h1, h2, h3, h4, h5, h6 {
    font-family: Coiny;
    font-weight: normal;
  }
  
  ul {
    margin: 0;
    padding: 0;
    list-style: none;
  }
  
  a {
    color: #0070f3
  }
  
  .video-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    column-gap: 16px;
    row-gap: 8px;
  }
  
  .aspect-ratio {
    position: relative;
    width: 100%;
    height: 0;
    padding-bottom: 56.25%;

    iframe {
      position: absolute;
      width: 100%;
      height: 100%;
      left: 0; top: 0;
    }
  }
  .caption {
    width: 100%;
    margin: 10px 0;
    font-size: 90%;
    text-align: center;
  }
  
  .hidden {
    display: none !important;
  }
  /* Phone landscape and bigger */
  @media (min-width: ${breakpoints.small}px) {
    .hidden\\\@s {
      display: none !important;
    }
  }
  /* Tablet landscape and bigger */
  @media (min-width: ${breakpoints.medium}px) {
    .hidden\\\@m {
      display: none !important;
    }
  }
  /* Desktop and bigger */
  @media (min-width: ${breakpoints.large}px) {
    .hidden\\\@l {
      display: none !important;
    }
  }
  /* Large screen and bigger */
  @media (min-width: ${breakpoints.extraLarge}px) {
    .hidden\\\@xl {
      display: none !important;
    }
  }
  /*
   * Visible
   */
  /* Phone portrait and smaller */
  @media (max-width: ${breakpoints.small - 1}px) {
    .visible\\\@s {
      display: none !important;
    }
  }
  /* Phone landscape and smaller */
  @media (max-width: ${breakpoints.medium - 1}px) {
    .visible\\\@m {
      display: none !important;
    }
  }
  /* Tablet landscape and smaller */
  @media (max-width: ${breakpoints.large - 1}px) {
    .visible\\\@l {
      display: none !important;
    }
  }
  /* Desktop and smaller */
  @media (max-width: ${breakpoints.extraLarge - 1}px) {
    .visible\\\@xl {
      display: none !important;
    }
  }
`
