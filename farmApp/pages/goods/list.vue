<template>
	<view class="container">
																																	<!-- 		<unicloud-db ref="udb" v-slot:default="{data, pagination, loading, hasMore, error}" :collection="collectionList"
																																				field="goods_sn,name,keywords,goods_desc,goods_thumb,remain_count,month_sell_count,total_sell_count,comment_count,is_on_sale,is_hot,add_date,last_modify_date">
																																				<view v-if="error">{{error.message}}</view>
																																				<view v-else-if="data">
																																					<uni-list>
																																						<uni-list-item v-for="(item, index) in data" :key="index" showArrow :clickable="true"
																																							@click="handleItemClick(item._id)">
																																							<template v-slot:body>
																																								<view class="item-left">
																																									<image :src="item.goods_thumb.path" mode="aspectFill" class="item-img" />
																																								</view>
																																								<view class="item-right">
																																									<text
																																										class="title">{{item.name}}</text>
																																									<view class="num">
																																										<text>月销:{{item.month_sell_count}}</text>
																																										<text style="margin-left: 10rpx;">评论:{{item.comment_count}}</text>
																																									</view>
																																								</view>
																																							</template>
																																						</uni-list-item>
																																					</uni-list>
																																				</view>
																																				<uni-load-more :status="loading?'loading':(hasMore ? 'more' : 'noMore')"></uni-load-more>
																																			</unicloud-db> -->
	</view>
</template>

<script>
	const db = uniCloud.database()
	export default {
		data() {
			return {
				collectionList: "goods",
				loadMore: {
					contentdown: '',
					contentrefresh: '',
					contentnomore: ''
				}
			}
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
			handleItemClick(id) {
				uni.navigateTo({
					url: './detail?id=' + id
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.item-img {
		flex: 1;
		width: 200rpx;
		height: 180rpx;
		border-radius: 16rpx;
	}

	.item-right {
		margin-left: 10rpx;
		display: flex;
		flex-direction: column;

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
		.num{
			font-size: 28rpx;
			color: #333333;
		}
	}
</style>
