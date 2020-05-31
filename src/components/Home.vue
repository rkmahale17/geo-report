/* eslint-disable no-sequences */
<template>
  <div class="home">
    <div class="maps map_box">
      <div v-if="isLocality">
        <PincodeWiseMap class="d-box-shadow" @updatePincodeLocality="updatePincodeLocality"></PincodeWiseMap>
      </div>
      <div v-else>
        <LocalityWiseMap class="div-box-shadow" @updateLocality="updateLocality"></LocalityWiseMap>
      </div>
    </div>
    <div class="charts b2 bc-p div-box-shadow">
      <section class="area_info div-box-shadow br-10">
        <div class="d-flex xs-block justify-content-space-between mt-10">
          <div class="heading-3 tc-w f-wb letter-space-1 mainHeadings">AREA INFO</div>

          <div class="pt-10 mt-10 info-block text-center mt-20" v-if="(pincode || localityId)">
            <div v-if="pincode" class="heading-4 tc-gl">
              Showing Result for Pincode
              <span class="tc-w heading-3">{{ pincode }}</span>
            </div>
            <div v-if="localityId" class="heading-4 tc-gl">
              Showing Result for Locality FID
              <span class="tc-w heading-3">{{ localityId }}</span>
            </div>
          </div>
        </div>
        <div class="d-flex xs-block justify-content-center mt-20">
          <div class="ml-5 info-block text-center">
            <div>
              <input type="checkbox" class="toggle-switch switch-on-off" v-model="isLocality" />
            </div>
            <div>
              <span class="heading-6 pl-5 tc-w">
                Click button to switch
                {{ isLocality ? "LOCALITY MAP" : "PINCODE MAP" }}
              </span>
            </div>
          </div>
        </div>

        <div
          v-if="
              !(
                population ||
                households ||
                country ||
                district ||
                locality ||
                city
              )
            "
        >
          <img src="../assets/empty.svg" alt="empty_image" class="empty_image" />
          <h3 class="tc-s text-center heading-6">Select Map area to get area_info</h3>
        </div>
        <div class="d-flex xs-block justify-content-center mt-20">
          <div class="info-block text-center" v-if="population">
            <div class="info-val heading-3 tc-w f-wm info-val">{{ population }}</div>
            <div class="info-label heading-4 tc-gl info-label">Population</div>
          </div>
          <div class="info-block text-center" v-if="households">
            <div class="info-val heading-3 tc-w f-wm info-val">{{ households }}</div>
            <div class="info-label heading-4 tc-gl info-label">Households</div>
          </div>
        </div>

        <div class="d-flex xs-block justify-content-center mt-20" v-if="country && district">
          <div class="info-block text-center">
            <div class="info-val heading-3 tc-w f-wm info-val">{{ country }}</div>

            <div class="info-label heading-4 tc-gl info-label">Country</div>
          </div>
          <div class="info-block text-center">
            <div class="info-val heading-3 tc-w f-wm info-val">{{ district }}</div>

            <div class="info-label heading-4 tc-gl info-label">District</div>
          </div>
        </div>
        <div class="d-flex xs-block justify-content-center mt-20 mb-10" v-if="locality && city">
          <div class="info-block text-center">
            <div class="info-val heading-3 tc-w f-wm info-val">{{ city }}</div>

            <div class="info-label heading-4 tc-gl info-label">City</div>
          </div>
          <div class="info-block text-center">
            <div class="info-val heading-3 tc-w f-wm info-val">{{ locality }}</div>

            <div class="info-label heading-4 tc-gl info-label">Locality</div>
          </div>
        </div>
      </section>
      <section class="demographic_box p-10 mb-10">
        <div class="heading-3 tc-p f-wb letter-space-1 mainHeadings">DEMOGRAPHICS</div>

        <div class="d-flex b-l justify-content-center dSmBlock">
          <div class="charts_box div-box-shadow br-10 bar_chart">
            <BarCharts :pincodeWiseLocality="pincodeWiseLocality" />
          </div>
          <div class="dummy_box"></div>
          <div class="b-l charts_box div-box-shadow br-10 doughnutChart">
            <DoughnutChart :localityData="localityData" />
          </div>
        </div>
      </section>
      <div class="floating-btn" @click="scrollToTop()">
        <button class="btn-r b-p div-box-shadow">
          <span class="material-icons upward_icon">arrow_upward</span>
        </button>
      </div>
      <div class="floating-btn__down" @click="scrollToChart()">
        <button class="btn-r b-s div-box-shadow">
          <span class="material-icons upward_icon">arrow_downward</span>
        </button>
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
      locality: null,
      pincode: null,
      localityId: null
    }
  },
  watch: {
    // whenever question changes, this function will run
    isLocality: function (old, current) {
      this.reset()
    }
  },
  methods: {
    reset () {
      this.localityData = null
      this.pincodeWiseLocality = null
      this.population = null
      this.households = null
      this.district = null
      this.country = null
      this.city = null
      this.locality = null
      this.pincode = null
      this.localityId = null
    },
    updateLocality (localityData, properties) {
      this.scrollToChart()
      this.localityData = localityData
      if (properties && properties.population) {
        this.population = properties.population
        this.households = properties.households
        this.city = properties.city
        this.locality = properties.locality
        this.localityId = properties.FID
      }

      this.district = null
      this.country = null
      this.pincode = null
    },
    updatePincodeLocality (pincodeWiseLocality, properties) {
      this.scrollToChart()
      this.pincodeWiseLocality = pincodeWiseLocality
      if (properties && properties.population) {
        this.population = properties.population
        this.households = properties.households
        this.district = properties.district_n
        this.country = 'India'
        this.pincode = properties.pincode
      }

      this.city = null
      this.locality = null
      this.localityId = null
    },
    scrollToChart () {
      const element = document.getElementsByClassName('charts')
      window.scrollTo({
        top: element[0].offsetTop,
        behavior: 'smooth'
      })
    },

    scrollToTop () {
      const element = document.getElementsByClassName('map_box')
      window.scrollTo({
        top: element[0].offsetTop,
        behavior: 'smooth'
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "../styles/variables.scss";
.maps {
  padding: 5px;
}
.demographic_box {
  margin: 10px auto;
}
.doughnutChart {
  background: linear-gradient(to right, #2c5364, #203a43, #0f2027);
}
.bar_chart {
  background: linear-gradient(to right, #2c5364, #203a43, #0f2027);
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
  flex: 1;
  padding: 5px;
  margin: 10px;
  margin-top: 22px !important;
  margin: auto;
  border: 1px solid gray;
}
.info-bar {
  width: 90%;
  max-width: 1200px;
  height: 60px;
  margin-left: auto;
  margin-right: auto;
}

.info-val {
  padding-left: 10px;
}
.info-label {
  padding-left: 10px;
  padding-top: 6px;
}

.info-block {
  min-width: 250px;
  margin-top: 10px;
}

.toggle-switch {
  height: 40px;
  width: 150px;
  border: 1px solid white;
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
  background-color: $primary;
  content: "LOCALITY MAP";
  color: white;
}
.toggle-switch.switch-on-off::before {
  content: "PINCODE MAP";
  background-color: white;
  color: #f14242;
}
.toggle-switch-label {
  line-height: 30px;
  vertical-align: top;
  margin-top: 4px;
}
.map_info {
  text-align: right;
  width: 90%;
  margin: auto;
  color: rgb(207, 21, 21);
  font-size: 10px;
  font-style: italic;
}
.area_info {
  margin-top: 22px !important;
  max-width: 600px;
  margin: auto;
  padding: 10px 5px;
  background: #0f2027;
  background: -webkit-linear-gradient(to right, #2c5364, #203a43, #0f2027);
  background: linear-gradient(to right, #2c5364, #203a43, #0f2027);
}
.upward_icon {
  margin: 0px 0px 0px -6px;
}

.mainHeadings {
  margin-top: 20px;
  margin-left: 15px;
}
</style>
