import React from 'react'

import './variables.css'
import './global.css'
import Seo from './seo'
import Navigation from './navigation'
import Footer from './footer'

import {
  ThemeProvider,
  createTheme,
  responsiveFontSizes,
} from '@mui/material/styles'

let theme = createTheme({
  typography: {
    fontFamily: [
      'Inter var',
      '-apple-system, BlinkMacSystemFont',
      'Segoe UI',
      'Helvetica',
      'Arial',
      'sans-serif',
      'Apple Color Emoji',
      'Segoe UI Emoji',
      'Segoe UI Symbol',
    ].join(','),
    subtitle1: {
      fontSize: 12,
    },
    h4: {
      fontWeight: 700,
    },
    h3: {
      fontWeight: 700,
    },
  },
})

theme = responsiveFontSizes(theme)

class Template extends React.Component {
  render() {
    const { children } = this.props

    return (
      <>
        <ThemeProvider theme={theme}>
          <Seo />
          <Navigation />
          <main>{children}</main>
          <Footer />
        </ThemeProvider>
      </>
    )
  }
}

export default Template
