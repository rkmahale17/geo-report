
<template>
  <div class="small">
    <p class="heading-3 f-w text-center tc-w">Monthly Income Distrubution</p>
    <div v-if="getData">
      <DoughnutCharts :chart-data="getData"></DoughnutCharts>
      <h3 class="text-center f-wr">
       <span class="tc-gl" >Income of </span>  {{localityData.locality}} :
        <span class="tc-p f-wm"> {{ localityData.income }}<span class="tc-b f-wr headin"> Rs.</span>  </span>
      </h3>
    </div>
    <div v-else>
            <img src="../assets/empty.svg" class="empty_image" alt="emptyImage">

      <div class="heading-4 f-wr  text-center">
      <h3 class="mb-n-10">No Data Available</h3>
      <h4>
       Monthly Income Distrubution
      </h4>

      </div>
    </div>
  </div>
</template>
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
  margin: auto;
}
</style>
