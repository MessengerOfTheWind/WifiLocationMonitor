import Vue from 'vue'
import App from './App.vue'

import './assets/common.less'

import dataV from '@jiaminghi/data-view'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// import Vuex from 'vuex'

Vue.config.productionTip = false

Vue.use(dataV)
Vue.use(ElementUI)
// Vue.use(Vuex)

// const store = new Vuex.Store({
//   state: {
//     personData: [] // 用于存储 WebSocket 响应数据
//   },
//   mutations: {
//     SET_PERSON_DATA (state, data) {
//       state.personData = data
//     }
//   },
//   actions: {
//     updatePersonData ({ commit }, data) {
//       commit('SET_PERSON_DATA', data)
//     }
//   }
// })

new Vue({
  render: h => h(App)
}).$mount('#app')
