import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    localities: {},
    expenditure: [],
    income: [],
    pincode: {}
  },
  mutations: {
    commitLocalities (state, localities) {
      state.localities = localities
    },
    commitExpenditure (state, expenditure) {
      state.expenditure = expenditure
    },
    commitIncome (state, income) {
      state.income = income
    },
    commitPincode (state, pincode) {
      state.pincode = pincode
    }
  },
  actions: {
    addLocalities (state, localities) {
      state.commit('commitLocalities', localities)
    },
    addExpenditure (state, expenditure) {
      state.commit('commitExpenditure', expenditure)
    },
    addIncome (state, income) {
      state.commit('commitIncome', income)
    },
    addPincode (state, pincode) {
      state.commit('commitPincode', pincode)
    }
  },
  getters: {
    all (state) {
      return state
    },
    expenditure (state) {
      return state.expenditure
    },
    income (state) {
      return state.income
    },
    localities (state) {
      return state.localities
    },
    pincode (state) {
      return state.pincode
    }
  }
})

export default store
