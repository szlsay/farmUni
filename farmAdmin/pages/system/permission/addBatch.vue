<template>
	<view class="uni-container">
		<uni-forms ref="form" :value="formData" validateTrigger="bind" :label-width="100">
			<uni-forms-item name="prefix" label="权限ID前缀" required>
				<input placeholder="权限唯一标识，不可修改，不允许重复" @input="binddata('prefix', $event.detail.value)"
					class="uni-input-border" v-model="formData.prefix" trim="both" />
			</uni-forms-item>
			<uni-forms-item name="name" label="权限名称" required>
				<input placeholder="权限名称" @input="binddata('name', $event.detail.value)" class="uni-input-border"
					v-model="formData.name" trim="both" />
			</uni-forms-item>
			<view class="uni-button-group">
				<button type="primary" class="uni-button" style="width: 100px;"
					@click="submit">{{$t('common.button.submit')}}</button>
				<navigator open-type="navigateBack" style="margin-left: 15px;">
					<button class="uni-button" style="width: 100px;">{{$t('common.button.back')}}</button>
				</navigator>
			</view>
		</uni-forms>
	</view>
</template>

<script>
	const db = uniCloud.database();
	const dbCmd = db.command;
	const dbCollectionName = 'uni-id-permissions';

	export default {
		data() {
			return {
				formData: {
					"prefix": "",
					"name": ""
				}
			}
		},
		methods: {
			submit() {
				if (!this.formData.prefix) {
					uni.showToast({
						title: '请添加权限ID前缀',
						icon:'none'
					})
					uni.showto
					return
				}

				if (!this.formData.name) {
					uni.showToast({
						title: '请添加权限名称',
						icon:'none'
					})
					return
				}
				const value = [
					{
						"permission_id": this.formData.prefix + "_create",
						"permission_name": "创建" + this.formData.name,
					},
					{
						"permission_id": this.formData.prefix + "_read",
						"permission_name": "读取" + this.formData.name,
					},
					{
						"permission_id": this.formData.prefix + "_emit",
						"permission_name": "编辑" + this.formData.name,
					},
					{
						"permission_id": this.formData.prefix + "_delete",
						"permission_name": "删除" + this.formData.name,
					}
				]
				this.submitForm(value)
			},

			submitForm(value) {
				// 使用 clientDB 提交数据
				db.collection(dbCollectionName).add(value).then((res) => {
					uni.showToast({
						title: '新增成功'
					})
					this.getOpenerEventChannel().emit('refreshData')
					setTimeout(() => uni.navigateBack(), 500)
				}).catch((err) => {
					uni.showModal({
						content: err.message || '请求服务失败',
						showCancel: false
					})
				}).finally(() => {
					uni.hideLoading()
				})
			}
		}
	}
</script>
