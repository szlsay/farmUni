<template>
	<view class="container">
		<uni-list v-for="item in list">
			<uni-list-item>
				<template v-slot:body>
					<view class="body-content">
						<view class="item-left">
							<image :src="item.goods_thumb.path" mode="aspectFill" class="item-img" />
						</view>
						<view class="item-right">
						</view>
					</view>
				</template>
			</uni-list-item>
		</uni-list>
	</view>
</template>

<!-- :title="getOneData(item.name)" :note="String(item.qty)" :thumb="getOneData(item.imgurl)"
				thumb-size='lg' -->
				
				
<script>
	const db = uniCloud.database()
	export default {
		data() {
			return {
				list: []
				// collectionList: "cart",
				// loadMore: {
				//   contentdown: '',
				//   contentrefresh: '',
				//   contentnomore: ''
				// }
			}
		},
		onShow() {
			// this.getData()
		},

		onPullDownRefresh() {
			this.$refs.udb.loadData({
				clear: true
			}, () => {
				uni.stopPullDownRefresh()
			})
		},
		onReachBottom() {
			this.$refs.udb.loadMore()
		},
		methods: {
			getOneData(data) {
				if (data && data.length > 0) {
					return data[0]
				} else {
					return ''
				}
			},
			getData() {
				// db.collection('cart').get().then(res => {
				// 	console.log(res);
				// })
				db.collection('cart,goods')
					.field('goods_id.goods_thumb.path as imgurl, goods_id.name as name, qty')
					// .field('goods_id{name,goods_thumb} as goods_info, qty')
					.get()
					.then(res => {
						console.log(res);
						this.list = res.result.data
						// this.$refs.alertCode.open(res.result)
					}).catch(err => {
						console.error(err)
					}).finally(() => {
						uni.hideLoading()
					})
			},
			handleItemClick(id) {
				uni.navigateTo({
					url: './detail?id=' + id
				})
			},
			fabClick() {
				// 打开新增页面
				uni.navigateTo({
					url: './add',
					events: {
						// 监听新增数据成功后, 刷新当前页面数据
						refreshData: () => {
							this.$refs.udb.loadData({
								clear: true
							})
						}
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.body-content{
		display: flex;
	}
</style>
