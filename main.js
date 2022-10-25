import App from './App'

// 引入阿里巴巴矢量图图标
import '@/static/icon/iconfont.css'

// 引入vuex组件
import store from './store'
import api from './request/api' // 导入api接口
import axios from './request/http';

import {
	myRequest
} from './http/api.js' // 封装好的Request接口

import '@/style/style.scss'


// #ifndef VUE3
import Vue from 'vue'

// import EnergySuccess from '@/components/energy-success/energy-success.vue'
// Vue.componemt('EnergySuccess', EnergySuccess)

Vue.config.productionTip = false
Vue.prototype.$store = store
Vue.prototype.$api = api; // 将api挂载到vue的原型上
Vue.prototype.$axios = axios; // 将$axios挂载到vue的原型上
Vue.prototype.$hospitalId = '1';

// 将封装好的Request挂载到全局
Vue.prototype.$myRequest = myRequest

Vue.prototype.$onLaunched = new Promise(resolve => {
    Vue.prototype.$isResolve = resolve
})

App.mpType = 'app'
const app = new Vue({
	store,
	...App
})
app.$mount()
// #endif

// #ifdef VUE3
import {
	createSSRApp
} from 'vue'
export function createApp() {
	const app = createSSRApp(App)
	return {
		app
	}
}
// #endif
