const db = uniCloud.database()
export default {
	namespaced: true,
	state: {
		cartList: [],
	},
	mutations: {
		setCartList(state, list) {
			state.cartList = list
			console.log('setCartList----', list);
		},
		// updateCartItemSelect(state, data) {
		// 	state.cartList.map(item => {
		// 		if (data._id == item._id) {
		// 			item.select = !item.select
		// 		});
		// 	})
		// }
	},
	actions: {
		async getCartList({
			state,
			commit
		}) {
			if (state.cartList.length > 0) {
				return state.cartList
			} else {
				let {
					result
				} = await db.collection('cart,goods')
					.field('goods_id.goods_thumb.path as imgurls, goods_id.name as names, goods_id._id as goodsId, qty')
					.get()
					console.log("----------------", result.data)
					if (result.data && result.data.length > 0) {
						result.data.map(item => {
							if (item.goodsId && item.goodsId.length > 0) {
								item.goods_id = item.goodsId[0]
							} else {
								item.goods_id = ''
							}
							if (item.names && item.names.length > 0) {
								item.name = item.names[0]
							} else {
								item.name = ''
							}
							if (item.imgurls && item.imgurls.length > 0) {
								item.imgurl = item.imgurls[0]
							} else {
								item.imgurl = ''
							}
							item.select = false
						})
						commit("setCartList", result.data)
					} else {
						commit("setCartList", [])
					}
				return result
			}
		}
	}
}
