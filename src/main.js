import Vue from 'vue'
import App from './App.vue'
import Vconsole from 'vconsole'
import router from './router'
import store from './store'

import './styles/reset.css'

Vue.config.productionTip = false

if (['test', 'dev'].includes(process.env.VUE_APP_CURRENTMODE)) new Vconsole()

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
