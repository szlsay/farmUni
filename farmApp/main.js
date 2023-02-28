import App from './App'
import i18n from './lang/i18n'


// #ifndef VUE3
import Vue from 'vue'
import store from './store'
Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
	i18n,
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
	app.use(i18n)
	return {
		app
	}
}
// #endif
