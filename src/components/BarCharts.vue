
<template>
  <div class="small">
    <div v-if="getExpenditure">
      <BarChart :chart-data="getExpenditure"></BarChart>
    </div>
    <div v-else>
      <h3 class="heading-3 f-wm">No Expenditure found</h3>
    </div>
  </div>
</template>

<script>
import BarChart from './BarChart.js'

export default {
  components: {
    BarChart
  },
  props: ['pincodeWiseLocality'],
  computed: {
    getExpenditure () {
      let expenditure = {
        labels: [],
        datasets: [
          {
            label: 'Rs',
            backgroundColor: '#f87979',
            pointBackgroundColor: 'white',
            borderWidth: 1,
            pointBorderColor: '#249EBF',
            data: []
          }
        ]
      }
      if (this.pincodeWiseLocality && this.pincodeWiseLocality.pincode) {
        for (let [key, value] of Object.entries(this.pincodeWiseLocality)) {
          if (key !== 'pincode') {
            expenditure.labels.push(key)
            expenditure.datasets[0].data.push(value)
          }
        }

        return expenditure
      }
    }
  },
  name: 'BarCharts',
  data () {
    return {
      datacollection: null,
      backgroundColor: [
        '#f87979',
        '#f87979',
        '#f87979',
        '#f87979',
        '#f87979',
        '#f87979',
        '#f87979',
        '#f87979',
        '#f87979'
      ]
    }
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
