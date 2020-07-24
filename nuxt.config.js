import colors from 'vuetify/es5/util/colors'

export default {
  
  server: {
    port: 3012,
    host: "0.0.0.0",
  },
  
  mode: 'spa',
  
  // ** Headers of the page
  head: {
    titleTemplate: '%s - CRM Web',
    title: process.env.npm_package_name || '',
    meta: [
      {charset: 'utf-8'},
      {name: 'viewport', content: 'width=device-width, initial-scale=1'},
      {hid: 'description', name: 'description', content: process.env.npm_package_description || ''}
    ],
    link: [
      {rel: 'icon', type: 'image/x-icon', href: '/favicon.ico'}
    ]
  },
  
  // ** Customize the progress-bar color
  loading: {color: '#fff'},
  
  // ** Global CSS
  css: [
    // ..
  ],
  
  // ** Plugins to load before mounting the App
  plugins: [
    '~/plugins/axios',
    '~/plugins/envstore',
    '~/plugins/appconfig'
  ],
  
  // ** Nuxt.js dev-modules
  buildModules: [
    '@nuxtjs/vuetify',
    ['@nuxtjs/dotenv', {
      // ..
    }],
  ],
  
  // ** Nuxt.js modules
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/auth',
    '@nuxtjs/pwa',
  ],
  
  router: {
    middleware: ['auth']
  },
  
  auth: {
    strategies: {
      local: {
        endpoints: {
          login: {
            url: "oauth/token",
            method: "post",
            propertyName: "access_token"
          },
          logout: { url: "/api/auth/logout", method: "post" },
          user: {
            url: "/api/users/current",
            method: "get",
            propertyName: "user"
          }
        },
        tokenRequired: true,
        tokenType: 'Bearer'
      }
    },
    redirect: {
      login: '/auth/login',
      logout: '/auth/login',
      callback: '/auth/login',
      home: '/home'
    }
  },
  
  // ** Axios module configuration
  // ** See https://axios.nuxtjs.org/options
  axios: {
    // ..
  },
  
  // ** https://github.com/nuxt-community/vuetify-module
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: true,
      themes: {
        dark: {
          // primary: colors.blue.darken2,
          // accent: colors.grey.darken3,
          // secondary: colors.amber.darken3,
          // info: colors.teal.lighten1,
          // warning: colors.amber.base,
          // error: colors.deepOrange.accent4,
          // success: colors.green.accent3
        }
      }
    }
  },
  
  dotenv: {
    // ..
  },
  
  build: {
    extend(config, ctx) {
    }
  }
}
