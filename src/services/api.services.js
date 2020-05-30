
import axios from 'axios'
const API_SECRET = '$2b$10$ceA2DTBejlJeXZx5gsOdPuVDzrsgsDDtabwmPAztGqr6YhGIopxS.'
const API = axios.create({
  baseURL: 'https://api.jsonbin.io/b',
  headers: {'secret-key': API_SECRET}

})

export default {
  getLocality: function () {
    return API.get('/5ed0ca867741ef56a563f20a/2')
  },
  getIncome: function () {
    return API.get('/5ed0ca367741ef56a563f1f2')
  },
  getPinocde: function () {
    return API.get('/5ed0cb3d60775a5685841d18/2')
  },
  getExpenditure: function () {
    return API.get('/5ed0aeaa7741ef56a563e6dc')
  }
}
