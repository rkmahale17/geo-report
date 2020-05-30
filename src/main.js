// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueMapbox from 'vue-mapbox'
import Mapbox from 'mapbox-gl'
// import axios from 'axios'
import Vuex from 'vuex'
import store from './store'

// Vue.prototype.$http = axios
Vue.config.productionTip = false
Vue.use(Vuex)
Vue.use(VueMapbox, { mapboxgl: Mapbox })
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
