<template>
	<view class="container">
		<unicloud-db ref="udb" v-slot:default="{data, loading, error, options}" :options="options"
			:collection="collectionList" field="name,goods_desc,goods_thumb,month_sell_count,comment_count,is_hot"
			:where="queryWhere" :getone="true" :manual="true">
			<view v-if="error">{{error.message}}</view>
			<view v-else-if="loading">
				<uni-load-more :contentText="loadMore" status="loading"></uni-load-more>
			</view>
			<view v-else-if="data">
				<view>
					<image :src="data.goods_thumb.path" mode="aspectFill" style="height: 500rpx; width: 100%;" />
				</view>
				<view class=""></view>
				<view>
					<text>名称:{{data.name}}</text>
				</view>
				<view>
					<text>详细描述:{{data.goods_desc}}</text>
				</view>
				<view>
					<text>{{data.is_hot == true ? '✅' : '❌'}}</text>
					<text style="margin-left: 16rpx;">月销量:{{data.month_sell_count}}</text>
					<text style="margin-left: 16rpx;">评论数:{{data.comment_count}}</text>
				</view>
			</view>
		</unicloud-db>
		<view class="btns">
			<button type="primary" @click="handleCart">加入购物车</button>
			<button type="warn" class="btn-delete" @click="handleBuy">立即购买</button>
		</view>
	</view>
</template>

<script>
	import {
		enumConverter
	} from '../../js_sdk/validator/goods.js'
	const db = uniCloud.database();
	const cartCollectionName = 'cart';

	export default {
		data() {
			return {
				queryWhere: '',
				collectionList: "goods",
				loadMore: {
					contentdown: '',
					contentrefresh: '',
					contentnomore: ''
				},
				options: {
					...enumConverter
				}
			}
		},
		onLoad(e) {
			this._id = e.id
		},
		onReady() {
			if (this._id) {
				this.queryWhere = '_id=="' + this._id + '"'
			}
		},
		methods: {
			/**
			 * 提交表单
			 */
			async handleCart() {
				// 使用 clientDB 提交数据
				let value = {
					"goods_id": this._id,
					"qty": 1,
				}

				let { result } = await db.collection(cartCollectionName).where({
					goods_id: this._id,
				}).get()
				console.log(result);
				if (result.data.length === 0) {
					db.collection(cartCollectionName).add(value).then((res) => {
						uni.showToast({
							icon: 'none',
							title: '新增成功'
						})
					}).catch((err) => {
						uni.showModal({
							content: err.message || '请求服务失败',
							showCancel: false
						})
					})
				} else {
					let cartData = result.data[0]
					cartData.qty += 1
					db.collection(cartCollectionName).doc(cartData._id) .update({
						qty: cartData.qty
					}).then((res) => {
						uni.showToast({
							icon: 'none',
							title: '更新成功'
						})
						// this.getOpenerEventChannel().emit('refreshData')
						// setTimeout(() => uni.navigateBack(), 500)
					}).catch((err) => {
						uni.showModal({
							content: err.message || '请求服务失败',
							showCancel: false
						})
					})
				}
			},
			// handleCart() {
			// 	this.submitForm()
			// 	// 打开修改页面
			// 	// uni.navigateTo({
			// 	// 	url: './edit?id=' + this._id,
			// 	// 	events: {
			// 	// 		// 监听修改页面成功修改数据后, 刷新当前页面数据
			// 	// 		refreshData: () => {
			// 	// 			this.$refs.udb.loadData({
			// 	// 				clear: true
			// 	// 			})
			// 	// 		}
			// 	// 	}
			// 	// })
			// },
			handleBuy() {
				// this.$refs.udb.remove(this._id, {
				// 	success: (res) => {
				// 		// 删除数据成功后跳转到list页面
				// 		uni.navigateTo({
				// 			url: './list'
				// 		})
				// 	}
				// })
			}
		}
	}
</script>

<style>
	.btns {
		padding: 40rpx;
		display: flex;
	}

	.btns button {
		width: 300rpx;
	}
</style>
