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
					.field('goods_id.goods_thumb.path as imgurl, goods_id.name as name, qty')
					.get()
					console.log("----------------", result.data)
					if (result.data && result.data.length > 0) {
						commit("setCartList", result.data)
					} else {
						commit("setCartList", [])
					}
				return result
			}
		}
	}
}
