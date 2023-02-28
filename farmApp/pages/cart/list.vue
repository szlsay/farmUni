<template>
	<view class="container">
		<uni-list v-for="item in list">
			<uni-list-item>
				<template v-slot:body>
					<view class="body-content">
						<view class="item-left">
							<image :src="getOneData(item.imgurl)" mode="aspectFill" class="item-img" />
						</view>
						<view class="item-middle">
							<text class="title">{{ getOneData(item.name )}}</text>
							<text class="num">价格</text>
						</view>
						<view class="item-right">
							<uni-number-box :min="0" :max="999" v-model="item.qty" @blur="blur" @focus="focus"
								@change="changeValue" />
						</view>
					</view>
				</template>
			</uni-list-item>
		</uni-list>
	</view>
</template>
<script>
	const db = uniCloud.database()
	export default {
		data() {
			return {
				list: [],
			}
		},
		onShow() {
			this.getData()
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
				db.collection('cart,goods')
					.field('goods_id.goods_thumb.path as imgurl, goods_id.name as name, qty')
					.get()
					.then(res => {
						console.log(res);
						this.list = res.result.data
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
	.body-content {
		width: 100%;
		display: flex;
		justify-content: space-between;
	}

	.item-img {
		width: 200rpx;
		height: 180rpx;
		border-radius: 16rpx;
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
