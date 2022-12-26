/**
 * plugins/vuetify.js
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

// Composables
import { createVuetify } from 'vuetify'
import { md3 } from 'vuetify/blueprints'

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
  blueprint: md3,
  theme: {
    defaultTheme: 'dark',
    themes: {
      light: {
        colors: {
          primary: '#73C8F9',
          secondary: '#F7D51D',
          
        },
      },
      dark: {
        colors: {
          primary: '#73C8F9',
          secondary: '#F7D51D',
          blackBg: '#121212'
          
        },
      },
    },
  },
})
