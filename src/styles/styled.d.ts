import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      black: string;
      backgroundWhite: string;
      purple: string;
      darkBlue: string;
      blue: string;
      red: string;
      white: string;
      gray: string;
      lightGray: string;
      messageGray: string;
      messageOrange: string;
    };
  }
}
