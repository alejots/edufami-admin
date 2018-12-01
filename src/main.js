// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import store from './store'
import Vuetify from 'vuetify'
import router from './router'
import 'font-awesome/css/font-awesome.css'
import './theme/default.styl'
import VeeValidate from 'vee-validate'
// import colors from 'vuetify/es5/util/colors'
import Truncate from 'lodash.truncate'
Vue.config.productionTip = false
// Helpers
// Global filters
Vue.filter('truncate', Truncate)
Vue.use(VeeValidate, { fieldsBagName: 'formFields' })
Vue.use(Vuetify, {
  theme: {
    primary: '#ff9800',
    secondary: '#4a6572',
    accent: '#3F51B5',
  },
  options: {
    themeVariations: ['primary', 'secondary', 'accent'],
    extra: {
      mainToolbar: {
        color: 'primary'
      },
      sideToolbar: {
      },
      sideNav: 'primary',
      mainNav: 'primary lighten-1',
      bodyBg: ''
    }
  }
})
// Bootstrap application components

new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>'
})
