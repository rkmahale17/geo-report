<template>
  <div id="app">
    <Toolbar />
    <router-view />
  </div>
</template>

<script>
import Toolbar from './components/Toolbar'
import API_SEVICES from './services/api.services'
export default {
  name: 'App',
  components: {
    Toolbar
  },

  created: function () {
    API_SEVICES.getLocality().then(result => {
      this.$store.dispatch('addLocalities', result.data)
    })
    API_SEVICES.getIncome().then(result => {
      this.$store.dispatch('addIncome', result.data)
    })
    API_SEVICES.getPinocde().then(result => {
      this.$store.dispatch('addPincode', result.data)
    })
    API_SEVICES.getExpenditure().then(result => {
      this.$store.dispatch('addExpenditure', result.data)
    })
  }
}
</script>

<style lang="scss">
@import "./styles/main.scss";
@import "./styles/medias.scss";
</style>
