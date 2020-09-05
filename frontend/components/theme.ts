import { DefaultTheme, createGlobalStyle } from "styled-components"
import normalize from "styled-normalize"

export const breakpoints = {
  extraSmall: 360,
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
      src: url('/assets/fonts/coiny-regular-webfont.woff2') format('woff2'),
           url('/assets/fonts/coiny-regular-webfont.woff') format('woff');
      font-weight: normal;
      font-style: normal;
  
  }
  
  @font-face {
      font-family: 'Montserrat';
      src: url('/assets/fonts/montserrat-regular-webfont.woff2') format('woff2'),
           url('/assets/fonts/montserrat-regular-webfont.woff') format('woff');
      font-weight: normal;
      font-style: normal;
  }

  @font-face {
      font-family: 'Montserrat';
      src: url('/assets/fonts/montserrat-italic-webfont.woff2') format('woff2'),
           url('/assets/fonts/montserrat-italic-webfont.woff') format('woff');
      font-weight: normal;
      font-style: italic;
  }
  
  @font-face {
      font-family: 'Montserrat';
      src: url('/assets/fonts/montserrat-semibold-webfont.woff2') format('woff2'),
           url('/assets/fonts/montserrat-semibold-webfont.woff') format('woff');
      font-weight: bold;
      font-style: normal;
  }
  
  @font-face {
      font-family: 'Montserrat';
      src: url('/assets/fonts/montserrat-semibolditalic-webfont.woff2') format('woff2'),
           url('/assets/fonts/montserrat-semibolditalic-webfont.woff') format('woff');
      font-weight: bold;
      font-style: italic;
  }
  
  html {
    scroll-behavior: smooth;
  }
  
  @media screen and (prefers-reduced-motion: reduce) {
    html {
      scroll-behavior: auto;
    }
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

    @media (max-width: ${breakpoints.extraSmall - 1}px) {
      font-size: 15px;
    }
  }
  
  h1, h2, h3, h4, h5, h6 {
    font-family: Coiny;
    font-weight: normal;
  }

  nav ul {
    margin: 0;
    padding: 0;
    list-style: none;
  }

  a {
    color: #0070f3
  }

  table {
    width: 100%;
    text-align: center;
    border-spacing: 0px;
    
    th {
      border-bottom: solid 1px currentColor;
    }
    th, td {
      &:not(:last-child) {
        border-right: solid 1px currentColor;
      }
    }
  }

  :target::before {
    content: "";
    display: block;
    height: 96px; /* fixed header height*/
    margin: -96px 0 0; /* negative fixed header height */
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
