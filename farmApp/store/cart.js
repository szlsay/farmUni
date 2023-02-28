export default {
	state: {
		text: "我是moduleA模块下state.text的值"
	},
	getters: {

	},
	mutations: {
		updateTime(state) { //更新当前时间戳
			state.timestamp = Date.now()
		}
	},
	actions: {

	}
}
