import 'vuetify/styles'
import '@mdi/font/css/materialdesignicons.css'
import { createVuetify } from 'vuetify'
import { aliases, mdi } from 'vuetify/iconsets/mdi'

export const vuetify = createVuetify({
  icons: { defaultSet: 'mdi', aliases, sets: { mdi } },
  theme: {
    defaultTheme: 'mangaTheme',
    themes: {
      mangaTheme: {
        dark: false,
        colors: {
          primary: '#7C4DFF',
          secondary: '#FF4081',
          background: '#F5F3FF',
          surface: '#FFFFFF'
        }
      }
    }
  }
})