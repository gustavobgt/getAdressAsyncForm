import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Roboto', sans-serif;
    font-size: 100%;
    
  }

  html, body, #root {
    height: 140vh;
    scroll-behavior: smooth;
    box-sizing: border-box;
  }

  *, button, input {
    border: 0;
    outline: 0;
  }

  button {
    cursor: pointer;
  }

  .slider img,
  .card-image {
  height: 450px;
  object-fit: cover;
  }

  .pointer {
  cursor: pointer;
  }
`;
