// import original module declarations
import "styled-components";

// and extend them!
declare module "styled-components" {
  export interface DefaultTheme {
    borderColor: string;
    bgColor: string;
    accent: string;
    colors: {
      main: string;

      dark?: string;
      darkMedium?: string;
    };
  }
}
