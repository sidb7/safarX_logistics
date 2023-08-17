import { useMediaQuery } from "react-responsive";

export function ResponsiveState() {
  return {
    isMobileScreen: useMediaQuery({ query: "(max-width: 767px)" }),
    isMdScreen: useMediaQuery({ query: "(min-width: 768px)" }),
    isLgScreen: useMediaQuery({ query: "(min-width: 1024px)" }),
    isXlScreen: useMediaQuery({ query: "(min-width: 1280px)" }),
    is2xlScreen: useMediaQuery({ query: "(min-width: 1536px)" }),
    isPortrait: useMediaQuery({ query: "(orientation: portrait)" }),
    isLandscape: useMediaQuery({ query: "(orientation: landscape)" }),
    isRetina: useMediaQuery({ query: "(min-resolution: 2dppx)" }),
  };
}
