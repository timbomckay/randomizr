module.exports = {
  purge: [
    './src/**/*.vue',
  ],
  theme: {
    screens: {
      sm: `${640/16}rem`, // => @media (min-width: 40rem) { ... }
      md: `${768/16}rem`, // => @media (min-width: 48rem) { ... }
      lg: `${1024/16}rem`, // => @media (min-width: 64rem) { ... }
      xl: `${1280/16}rem`, // => @media (min-width: 80rem) { ... }
    },
  },
  variants: {
    margin: ['responsive', 'first', 'last'],
    padding: ['responsive', 'first', 'last'],
  },
  plugins: [],
  corePlugins: {
    animation: false
  }
}
