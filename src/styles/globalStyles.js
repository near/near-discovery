import { globalCss } from './stitches.config';``

const globalStylesObj = {
  '@import': [
    '/presets/normalize.css', 
  ],
  '*,*::before,*::after': {
    margin: 0,
    padding: 0,
    boxSizing: 'inherit',
    fontStyle: 'inherit',
    fontFamily: "Arial, -apple-system, 'Segoe UI', Helvetica Neue, Helvetica, Roboto, sans-serif, system-ui, 'Apple Color Emoji', 'Segoe UI Emoji'",
    lineHeight: '1.2',
    'font-smoothing': 'antialiased',
    '-moz-osx-font-smoothing': 'antialiased',
    '-webkit-font-smoothing': 'antialiased',
    textRendering: 'optimizeLegibility',
  },
};

export const globalStyles = globalCss(globalStylesObj);