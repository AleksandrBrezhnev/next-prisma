import { css } from '@emotion/react';

const globalStyles = css`
  * {
    font-family: 'Montserrat', sans-serif;
    outline-color: #8D7AB1;
  }

  html, 
  body {
    position: static !important;
    font-family: 'DM Sans', Arial, sans-serif;
    max-width: 1200px;
    margin: 0 auto;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  p,
  ul,
  ol {
    margin: 0;
  }

  label,
  button {
    cursor: pointer;
  }

  ul,
  ol,
  button {
    padding: 0;
  }

  button {
    background: none;
    border: none;
  }

  ul {
    list-style-type: none;
  }

  textarea,
  input[type=text],
  input[type=email] {
    -webkit-appearance: none;
  }
`;

export default globalStyles;
