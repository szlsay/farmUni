const db = uniCloud.database();
const order = db.collection('order')
const orderDetail = db.collection('order-detail')
// const uniIdCommon = require('uni-id-common')
require("uni-")
module.exports = {
	_before: function() { // 通用预处理器
		console.log("getCloudInfo----", this.getCloudInfo())
		console.log("getUniIdToken----", this.getUniIdToken())
		console.log("getMethodName----", this.getMethodName())
		console.log("getParams----", this.getParams())
		console.log("getUniCloudRequestId----", this.getUniCloudRequestId())
		console.log("getHttpInfo----", this.getHttpInfo())
		console.log("getClientInfo----", this.getClientInfo())
		// console.log("$cloudEnv_uid----", this.$cloudEnv_uid)
		
	

		// const clientInfo = this.getClientInfo()
		// this.uniID = uniID.createInstance({ // 创建uni-id实例，其上方法同uniID
		// 	clientInfo
		// })
		// console.log("_before", state)
		// const clientInfo = this.getClientInfo()
		// this.uniID = uniID.createInstance({
		// 	clientInfo
		// })
		// params.create_data = Date.now()
	},
	// async add({
	// 	status = 1
	// }) {
	// 	let res = await order.add({
	// 		status,
	// 	})
	// 	return res
	// },
	async add() {
		// const uid = this.authInfo.uid
		console.log('0000000', this)
		// const {uid} = await this.uniID.checkToken(this.getUniIdToken());
		let res = await order.add({
			status: 1,
			create_date: Date.now()
		})
		return res
	},
	// add: function(title = '', content = '') {
	// 	title = title.trim()
	// 	content = content.trim()
	// 	if(!title || !content) {
	// 		return {
	// 			errCode: 'INVALID_TODO',
	// 			errMsg: 'TODO标题或内容不可为空'
	// 		}
	// 	}
	// 	// ...其他逻辑，如操作todo数据表添加数据
	// 	return {
	// 		errCode: 0,
	// 		errMsg: '创建成功'
	// 	}
	// }
}
