const db = uniCloud.database()
export default {
	namespaced: true,
	state: {
		cartList: [],
	},
	mutations: {
		setCartList(state, list) {
			state.cartList = list
		}
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
					.field('goods_id{goods_thumb, name, remain_count}, qty')
					.get()
				if (result.data && result.data.length > 0) {
					result.data.map(item => {
						if (item.goods_id && item.goods_id.length > 0) {
							let goods_id = item.goods_id[0]
							item.imgurl = goods_id.goods_thumb.path
							item.name = goods_id.name
							item.remain_count = goods_id.remain_count
							item.goodsId = goods_id._id
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
