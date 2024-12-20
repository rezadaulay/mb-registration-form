// https://nuxt.com/docs/api/configuration/nuxt-config

const myCustomLightTheme = {
  dark: false,
  colors: {
    primary: '#813d3c',
  }
}

export default defineNuxtConfig({
  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
    }
  },
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: ['vuetify-nuxt-module', '@nuxtjs/supabase'],
  vuetify: {
    moduleOptions: {
      /* module specific options */
    },
    vuetifyOptions: {
      /* vuetify options */
      theme: {
        defaultTheme: 'myCustomLightTheme',
        themes: {
          myCustomLightTheme
        },
      },    
    }
  },
  supabase: {
    redirectOptions: {
      login: '/login',
      callback: '/confirm',
      include: ['/manage(/*)?'],
      exclude: [],
      cookieRedirect: false,
    }
  },
  build: {
    transpile: [
      // Keep other transpile configuration, such as:
      // 'vuetify',
      // Add transpile for the package:
      'v-phone-input',
    ],
  },
})