/**
 * Created by xiezg on 2017/3/10.
 */

import 'es6-promise/auto'
import Vue from 'vue'
import App from '~pages/App.vue'
import storeFactory from './store/index'
import router from './router'
import { sync } from 'vuex-router-sync'
import vueTap from 'v-tap'
const store = storeFactory()
sync(store, router)
Vue.use(vueTap)

const app = new Vue(Object.assign({
    router,
    store,
}, App))
app.$mount('#app')

export { app, router, store }
