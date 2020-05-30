<template>
  <div class="home">
    <div class="maps">
      {{isLocality}}
      <div v-if="isLocality">
         <PincodeWiseMap class="d-box-shadow" @updatePincodeLocality="updatePincodeLocality"></PincodeWiseMap>

      </div>
      <div v-else>
          <LocalityWiseMap class="div-box-shadow" @updateLocality="updateLocality"></LocalityWiseMap>
      </div>
    </div>
    <div class="charts b2 bc-p">
      <section>
        <input type="checkbox" class="toggle-switch switch-on-off" v-model="isLocality" />
        <h3 class="heading-4 tc-b">Select Map for reports</h3>
        <div class="d-flex xs-block justify-content-center">
          <div class="d-flex info-block " >
            <div class="info-label heading-4 tc-gl info-label">Population</div>
            <div class="info-val heading-2 tc-p f-wm info-val">{{population? population : "______"}}</div>
          </div>
          <div class="d-flex info-block">
            <div class="info-label heading-4 tc-gl info-label">Households</div>
            <div class="info-val heading-2 tc-p f-wm info-val">{{ households? households : "______"}}</div>
          </div>
        </div>

             <div class="d-flex xs-block justify-content-center " v-if="country && d">
          <div class="d-flex info-block" >
            <div class="info-label heading-4 tc-gl info-label">Country</div>
            <div class="info-val heading-2 tc-p f-wm info-val">{{country}}</div>
          </div>
          <div class="d-flex info-block">
            <div class="info-label heading-4 tc-gl info-label">District</div>
            <div class="info-val heading-2 tc-p f-wm info-val">{{district}}</div>
          </div>

        </div>
             <div class="d-flex xs-block justify-content-center" v-if="locality && city">
                  <div class="d-flex info-block">
            <div class="info-label heading-4 tc-gl info-label">City</div>
            <div class="info-val heading-2 tc-p f-wm info-val">{{city}}</div>
          </div>
          <div class="d-flex info-block">
            <div class="info-label heading-4 tc-gl info-label">Locality</div>
            <div class="info-val heading-2 tc-p f-wm info-val">{{locality}}</div>
          </div>

        </div>

      </section>

      <div class="d-flex b-l justify-content-center sm-block">
        <div class="charts_box div-box-shadow">    <BarCharts :pincodeWiseLocality="pincodeWiseLocality"/></div>
        <div class="b-l charts_box div-box-shadow"> <DoughnutChart :localityData="localityData" /></div>
      </div>
    </div>

  </div>
</template>

<script>
import LocalityWiseMap from './LocalityWiseMap'
import PincodeWiseMap from './PincodeWiseMap'
import BarCharts from './BarCharts'
import DoughnutChart from './DoughnutChart'

export default {
  name: 'Home',
  components: { LocalityWiseMap, BarCharts, DoughnutChart, PincodeWiseMap },
  data () {
    return {
      isLocality: false,
      localityData: {},
      pincodeWiseLocality: {},
      population: null,
      households: null,
      district: null,
      country: null,
      city: null,
      locality: null

    }
  },
  methods: {
    updateLocality (localityData, properties) {
      this.localityData = localityData
      if (properties && properties.population) {
        this.population = properties.population
        this.households = properties.households
        this.city = properties.city
        this.locality = properties.locality
      }

      this.district = null
      this.country = null
    },
    updatePincodeLocality (pincodeWiseLocality, properties) {
      this.pincodeWiseLocality = pincodeWiseLocality
      if (properties && properties.population) {
        this.population = properties.population
        this.households = properties.households
        this.district = properties.district
        this.country = 'India'
      }

      this.city = null
      this.locality = null
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.maps {
  padding: 5px;
}
.charts {
  position: absolute !important;
  width: 90%;
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
  left: 0;
  right: 0;
  margin-top: 2rem;
  padding: 10px;
  border-radius: 10px;
}
.charts_box {
  padding: 5px;
  margin: 10px;
  min-width: 300px;
  max-width: 600px;
  width: 50%;
}
.info-bar {
  width: 90%;
  max-width: 1200px;
  height: 60px;
  margin-left: auto;
  margin-right: auto;
}

.info-val {
  width: 100px;
  max-width: 200px;
  padding-left: 10px;
}
.info-label {
  padding-left: 10px;
  padding-top: 6px;
  width: 100px;
}

.info-block{
  min-width: 300px;
}

.toggle-switch {
  height: 40px;
  width: 150px;
  border: 1px solid black;
  display: inline-block;
  overflow: hidden;
  position: relative;
  -moz-appearance: none;
  -webkit-appearance: none;
  -o-appearance: none;
  border-radius: 3px;
}
.toggle-switch:after,
.toggle-switch:before {
  height: 40px;
  width: 150px;
  display: block;
  line-height: 40px;
  text-align: center;
  position: absolute;
  transition: left 0.5s, right 0.5s;
}
.toggle-switch::after {
  left: 0;
}
.toggle-switch::before {
  right: 150px;
}
.toggle-switch:checked::after {
left: 150px;
}
.toggle-switch:checked::before {
  right: 0;
}
.toggle-switch.switch-on-off::after {
  background-color: green;
  content: "LocalityWise Map";
  color: white;
}
.toggle-switch.switch-on-off::before {
  content: "PincodeWise Map";
  background-color: white;
  color: #f14242;
}
.toggle-switch-label {
  line-height: 30px;
  vertical-align: top;
  margin-top: 4px;
}

</style>
