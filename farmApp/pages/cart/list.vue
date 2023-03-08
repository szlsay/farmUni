<template>
	<view class="container">
		<uni-list v-for="item in $store.state.cart.cartList">
			<uni-list-item>
				<template v-slot:body>
					<view class="body-content">
						<view class="item-left">
							<radio :checked="item.select" @click="onSelectItem(item)"/>
							<image :src="item.imgurl" mode="aspectFill" class="item-img" />
						</view>
						<view class="item-middle">
							<text class="title">{{item.name}}</text>
							<text class="num">价格</text>
						</view>
						<view class="item-right">
							<uni-number-box :min="0" :max="item.remain_count" v-model="item.qty"/>
						</view>
					</view>
				</template>
			</uni-list-item>
		</uni-list>
		<view class="footer">
			<view>
				<radio :checked="selectAll" @click="onSelectAll">全选</radio>
			</view>
			<view>
				<button class="mini-btn" type="warn" size="mini" @click="onClickBuy">结算</button>
			</view>
		</view>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				selectAll: false,
			}
		},
		onShow() {
			// this.getData()
		},

		methods: {
			onClickBuy() {
				console.log(this.$store.unregisterModule())
				// const db = uniCloud.database();
				// const order = db.collection('order')
				// const order = uniCloud.importObject('order')
				// order.add().then(res => {
				// 	console.log(res)
				// }).catch(e => {
				// 	console.log(e)
				// })
				
				// const goods = this.$store.state.cart.cartList.filter(item => item.select == true).map(obj => {
				// 	return {'goods_id': obj.goodsId, 'qty': obj.qty}
				// })
				// console.log(goods);
			},
			onSelectAll() {
				this.selectAll = !this.selectAll
				this.$store.state.cart.cartList.map(item => {
					item.select = this.selectAll
				})
			},
			onSelectItem(data) {
				data.select = !data.select
				this.selectAll = !this.$store.state.cart.cartList.some(item => item.select == false)
			},
			async getData() {
				await this.$store.dispatch('cart/getCartList')
			}
		}
	}
</script>

<style lang="scss" scoped>
	.footer{
		position: fixed;
		bottom: 100rpx;
		right: 0;
		left: 0;
		
		box-sizing: border-box;
		padding: 20rpx;
		height: 100rpx;
		
		display: flex;
		justify-content: space-between;
		align-items: center;
		
	}
	.body-content {
		width: 100%;
		display: flex;
		justify-content: space-between;
	}

	.item-left {
		display: flex;
		justify-content: center;
		align-items: center;

		.item-select {
			width: 40rpx;
			height: 40rpx;
		}

		.item-img {
			width: 200rpx;
			height: 180rpx;
			border-radius: 16rpx;
		}

	}


	.item-middle {
		margin-left: 10rpx;
		display: flex;
		flex-direction: column;
		padding-left: 10rpx;
		padding-right: 10rpx;
		width: 200rpx;

		.title {
			font-size: 32rpx;
			font-weight: 600;
			color: #333333;
			overflow: hidden;
			-webkit-line-clamp: 2;
			text-overflow: ellipsis;
			display: -webkit-box;
			-webkit-box-orient: vertical;
		}

		.num {
			margin-top: 10rpx;
			font-size: 28rpx;
			color: #333333;
		}
	}

	.item-right {
		align-items: center;
		justify-content: center;
	}
</style>
