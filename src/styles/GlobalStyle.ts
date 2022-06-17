import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  * {
    font-size: 16px;
    font-family: 'Montserrat', sans-serif;
  }
  
  body {
    background: ${(props) => props.theme.colors.backgroundWhite};
    box-sizing: border-box;
    margin: 0 auto;
    padding-top: 10px;
    width: 600px;
    height: 100%;
    min-height: 100vh;
  }

  h1 {
    margin: 0;
    margin-bottom: 20px;
    font-size: 32px;
    font-family: 'Homemade Apple', cursive;
    color: ${(props) => props.theme.colors.purple};
  }

  h2 {
    margin: 22px 0;
    font-size: 28px;
    color: ${(props) => props.theme.colors.purple};
  }

  h3 {
    font-size: 24px;
    margin: 0;
  }

  ol, ul {
    list-style: none;
    padding: 0;

    li {
      :focus {
        color: ${(props) => props.theme.colors.purple};
      }
    }
  }

  p {
    margin: 0;
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  input {
    background: transparent;
    padding: 5px;
    border: none;
    color: ${(props) => props.theme.colors.black};
    border-bottom: 1px solid ${(props) => props.theme.colors.darkBlue};
    outline: none;
    font-family: 'Montserrat', sans-serif;
    font-size: 16px;
    
    :focus {
      border-bottom: 1px solid ${(props) => props.theme.colors.red};
    } 
  }

  input::placeholder {
    color: ${(props) => props.theme.colors.red};
  }

  button {
    padding: 4px;
    background: transparent;
    border: none;
    outline: none;
    cursor: pointer;
    font-family: 'Montserrat', sans-serif;
    font-size: 16px;
    font-weight: 600;

    :disabled,
    :disabled:hover {
      background: ${(props) => props.theme.colors.lightGray};
      color: ${(props) => props.theme.colors.gray};
      cursor: not-allowed;
    }
  }

  .a11y-hidden {
    overflow: 'hidden';
    position: 'absolute';
    clip: 'rect(0, 0, 0, 0)';
    clipPath: 'circle(0)';
    width: '1px';
    height: ' 1px';
    margin: '-1px';
    border: '0';
    padding: '0';
    whiteSpace: 'nowrap';
  }
`;

export default GlobalStyle;
