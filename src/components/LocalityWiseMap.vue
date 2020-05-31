<template>
  <MglMap
    :accessToken="accessToken"
    :mapStyle.sync="mapStyle"
    :center="coordinates"
    :zoom="zoom"
    @load="onMapLoad"
  >
    <MglNavigationControl position="bottom-right" />

    <MglMarker :coordinates="coordinates" color="green" />
  </MglMap>
</template>

<script>
import Mapbox from 'mapbox-gl'
import {
  MglMap,
  MglMarker,
  MglNavigationControl,
  MglGeojsonLayer,
  MglPopup
} from 'vue-mapbox'
export default {
  name: 'LocalityWiseMap',
  components: {
    MglMap,
    MglMarker,
    MglNavigationControl,
    MglGeojsonLayer,
    MglPopup
  },
  computed: {
    allMapData () {
      return this.$store.getters.all
    },
    localities () {
      return this.$store.getters.localities
    },
    expenditure () {
      return this.$store.getters.expenditure
    },
    income () {
      return this.$store.getters.income
    },
    pincode () {
      return this.$store.getters.pincode
    },
    getGeoJson () {
      return this.localities
    },

    layer () {
      return {
        id: 'locality',
        type: 'line',
        source: 'locality',
        layout: {
          'line-join': 'round',
          'line-cap': 'round'
        },
        paint: {
          'line-color': '#888',
          'line-width': 2
        }
      }
    }
  },
  data () {
    return {
      coordinates: [77.488113, 13.002949],
      accessToken:
        'pk.eyJ1IjoicmttYWhhbGUiLCJhIjoiY2thcnhsM3Z0MDV5eTJ6bDJvNXh1ODh3cCJ9.0jjrPwlkosI00FYSNE96VQ',
      mapStyle: 'mapbox://styles/mapbox/streets-v11',
      zoom: 9
    }
  },

  created () {
    this.mapbox = Mapbox
  },
  methods: {
    updateCharts (e) {
      let locality = this.income.find(
        element => e.locality === element.locality
      )
      this.$emit('updateLocality', locality, e)
    },

    onMapLoad ({ map }) {
      map.on('click', 'locality-fill', e => {
        this.updateCharts(e.features[0].properties)
        new Mapbox.Popup()
          .setLngLat(e.lngLat)
          .setHTML(
            `<div class="pop-up_box">
      <section class="pop_scroll">
        <header class="d-flex">
          <div class="t-overflow">Locality</div>
          <div class="t-overflow">Population</div>
          <div class="t-overflow">Households</div>
        </header>
        <main class="d-flex">
          <div class="t-overflow">${e.features[0].properties.locality}</div>
          <div class="t-overflow">${e.features[0].properties.population}</div>
          <div class="t-overflow">${e.features[0].properties.households}</div>
        </main>
      </section>
    </div>`
          )
          .addTo(map)
      })

      map.on('mouseenter', 'states-layer', function () {
        map.getCanvas().style.cursor = 'pointer'
      })

      map.on('mouseleave', 'states-layer', function () {
        map.getCanvas().style.cursor = ''
      })
      map.addSource('localities', { type: 'geojson', data: this.localities })
      map.addLayer({
        id: 'locality-line',
        type: 'line',
        source: 'localities',
        paint: {
          'line-color': '#3388FF',
          'line-width': 8
        },
        filter: ['==', '$type', 'Polygon']
      })
      map.addLayer({
        id: 'locality-fill',
        type: 'fill',
        source: {
          type: 'geojson',
          data: this.localities
        },
        layout: {},
        paint: {
          'fill-color': '#B9CFED',
          'fill-opacity': 0.4
        }
      })
      map.on('zoomend', e => {})
    }
  }
}
</script>
