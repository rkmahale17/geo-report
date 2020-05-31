
import Vue from 'vue'
import App from './App'

// router
import router from './router'

// mapbox
import VueMapbox from 'vue-mapbox'
import Mapbox from 'mapbox-gl'

// store
import Vuex from 'vuex'
import store from './store'

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
