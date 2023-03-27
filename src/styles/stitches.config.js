import { createStitches } from '@stitches/react';

export const {
  config,
  createTheme,
  css,
  getCssText,
  globalCss,
  keyframes,
  styled,
  theme,
} = createStitches({
  theme: {
    colors: {},
    space: {
      1: '4px',
      2: '8px',
      3: '16px',
      4: '24px',
      5: '32px',
      6: '40px',
      7: '48px',
      8: '56px',
      9: '64px',
      10: '72px',
      11: '80px',
      12: '88px',
      13: '96px',
      14: '104px',
      15: '112px',
      16: '120px',
    },
    sizes: {
      1: '4px',
      2: '8px',
      3: '16px',
      4: '24px',
      5: '32px',
      6: '40px',
      7: '48px',
      8: '56px',
      9: '64px',
      10: '72px',
      11: '80px',
      12: '88px',
      13: '96px',
      14: '104px',
      15: '112px',
      16: '120px',
    },
    fontSizes: {
      display1: '62px',
      display2: '45px',
      display3: '32px',
      heading1: '28px',
      heading2: '24px',
      heading3: '20px',
      heading4: '18px',
      heading5: '15px',
      heading6: '13px',
      body1: '16px',
      body2: '15px',
      body3: '13px',
    },
    fonts: {
      sohne:
        "'Circular Std', Söhne, apple-system, sans-serif, menlo, monospace",
    },
    fontWeights: {},
    letterSpacings: {},
    borderWidths: {},
    borderStyles: {},
    shadows: {},
    radii: {
      1: '4px',
      2: '8px',
      3: '16px',
      4: '24px',
      round: '50%',
      pill: '9999px',
    },
    zIndices: {
      1: '100',
      2: '200',
      3: '300',
      4: '400',
      max: '999',
    },
    transitions: {},
  },
  media: {
    bp1: '(min-width: 520px)',
    bp11: '(min-width: 720px)',
    bp2: '(min-width: 900px)',
    bp3: '(min-width: 1200px)',
    bp4: '(min-width: 1800px)',
    motion: '(prefers-reduced-motion)',
    hover: '(any-hover: hover)',
    dark: '(prefers-color-scheme: dark)',
    light: '(prefers-color-scheme: light)',
  },
  utils: {
    p: (value)=> ({
      padding: value,
    }),
    pt: (value)=> ({
      paddingTop: value,
    }),
    pr: (value) => ({
      paddingRight: value,
    }),
    pb: (value) => ({
      paddingBottom: value,
    }),
    pl: (value) => ({
      paddingLeft: value,
    }),
    px: (value) => ({
      paddingLeft: value,
      paddingRight: value,
    }),
    py: (value) => ({
      paddingTop: value,
      paddingBottom: value,
    }),

    // border
    bx: (value) => ({
      borderLeft: value,
      borderRight: value,
    }),
    by: (value) => ({
      borderTop: value,
      borderBottom: value,
    }),

    m: (value) => ({
      margin: value,
    }),
    mt: (values) => ({
      marginTop: value,
    }),
    mr: (value) => ({
      marginRight: value,
    }),
    mb: (value) => ({
      marginBottom: value,
    }),
    ml: (value) => ({
      marginLeft: value,
    }),
    mx: (value) => ({
      marginLeft: value,
      marginRight: value,
    }),
    my: (value) => ({
      marginTop: value,
      marginBottom: value,
    }),

    ta: (value) => ({ textAlign: value }),

    fd: (value) => ({
      flexDirection: value,
    }),
    fw: (value) => ({ flexWrap: value }),

    ai: (value) => ({
      alignItems: value,
    }),
    ac: (value) => ({
      alignContent: value,
    }),
    jc: (value)=> ({
      justifyContent: value,
    }),
    as: (value) => ({ alignSelf: value }),
    fg: (value) => ({ flexGrow: value }),
    fs: (value) => ({
      flexShrink: value,
    }),
    fb: (value) => ({ flexBasis: value }),

    bc: (value) => ({
      backgroundColor: value,
    }),

    br: (value) => ({
      borderRadius: value,
    }),
    btrr: (value) => ({
      borderTopRightRadius: value,
    }),
    bbrr: (value) => ({
      borderBottomRightRadius: value,
    }),
    bblr: (value) => ({
      borderBottomLeftRadius: value,
    }),
    btlr: (value) => ({
      borderTopLeftRadius: value,
    }),

    bs: (value) => ({ boxShadow: value }),

    lh: (value) => ({
      lineHeight: value,
    }),

    ox: (value) => ({ overflowX: value }),
    oy: (value) => ({ overflowY: value }),

    pe: (value) => ({
      pointerEvents: value,
    }),
    us: (value) => ({
      WebkitUserSelect: value,
      userSelect: value,
    }),

    userSelect: (value) => ({
      WebkitUserSelect: value,
      userSelect: value,
    }),

    size: (value) => ({
      width: value,
      height: value,
    }),

    appearance: (value) => ({
      WebkitAppearance: value,
      appearance: value,
    }),
    backgroundClip: (value) => ({
      WebkitBackgroundClip: value,
      backgroundClip: value,
    }),
  }
});