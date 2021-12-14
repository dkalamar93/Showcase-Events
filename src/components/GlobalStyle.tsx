import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'Hind';
    src: local('Hind Bold'), local('Hind-Bold'),
      url('/assets/fonts/Hind-Bold.ttf')
        format('truetype');
    font-weight: bold;
    font-style: normal;
    font-display: swap;
  }

  @font-face {
    font-family: 'Hind';
    src: local('Hind SemiBold'), local('Hind-SemiBold'),
      url('/assets/fonts/Hind-SemiBold.ttf')
        format('truetype');
    font-weight: 600;
    font-style: normal;
    font-display: swap;
  }

  @font-face {
    font-family: 'Hind';
    src: local('Hind Medium'), local('Hind-Medium'),
      url('/assets/fonts/Hind-Medium.ttf')
        format('truetype');
    font-weight: 500;
    font-style: normal;
    font-display: swap;
  }

  @font-face {
    font-family: 'Hind';
    src: local('Hind Light'), local('Hind-Light'),
      url('/assets/fonts/Hind-Light.ttf')
        format('truetype');
    font-weight: 400;
    font-style: normal;
    font-display: swap;
  }

  @font-face {
    font-family: 'Hind';
    src: local('Hind Regular'), local('Hind-Regular'),
      url('/assets/fonts/Hind-Regular.ttf')
        format('truetype');
    font-weight: normal;
    font-style: normal;
    font-display: swap;
  }

  @font-face {
    font-family: 'PlayfairDisplay';
    src: local('Playfair Regular'), local('Playfair-Regular'),
      url('/assets/fonts/Playfair-Regular.ttf')
        format('truetype');
    font-weight: normal;
    font-style: normal;
    font-display: swap;
  }


  html, #root, body  {
    height: 100%;
    overflow: auto;
  }

  body {
    width: 100%;
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-size: 14px;
    font-family: 'Hind';
    font-style:normal;
    font-weight:normal;
  }

  button {
    border: none;
    background-color: none
  }

  a,
  a:active,
  a:hover,
  a:visited {
    color: inherit;
    text-decoration: none;
  }
`;
