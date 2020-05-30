
<template>
  <div class="small">
    <p class="heading-3 f-wb">Monthly Income</p>
    <div v-if="getData">
      <DoughnutCharts :chart-data="getData"></DoughnutCharts>
      <h3 class="text-center">
        {{localityData.locality}} :
        <span class="tc-p f-wm">{{ localityData.income}}</span>
      </h3>
    </div>
    <div v-else>
      <h3 class="text-center heading-3" style="color:red">No Data for Income</h3>
    </div>
  </div>
</template>p
<script>
import DoughnutCharts from './DoughnutCharts.js'

export default {
  components: {
    DoughnutCharts
  },
  name: 'DoughnutChart',
  props: ['localityData'],
  computed: {
    getData () {
      if (
        this.localityData &&
        this.localityData.income &&
        this.localityData.locality
      ) {
        return {
          labels: [this.localityData.locality],
          datasets: [
            {
              backgroundColor: ['#41B883'],
              data: [this.localityData.income]
            }
          ]
        }
      } else {
        return false
      }
    }
  },
  data () {
    return {}
  },
  mounted () {},
  methods: {
    getRandomInt () {
      return Math.floor(Math.random() * (50 - 5 + 1)) + 5
    }
  }
}
</script>

<style>
.small {
  max-width: 600px;
  margin: 150px auto;
}
</style>
