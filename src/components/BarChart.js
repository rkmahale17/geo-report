
import { Bar, mixins } from 'vue-chartjs'
const { reactiveProp } = mixins
export default {
  extends: Bar,
  mixins: [reactiveProp],
  props: ['chart-data', 'options'],
  mounted () {
    this.renderChart(this.chartData, this.options)
  }
}
