<template>
  <view class="uni-container">
    <uni-forms ref="form" :model="formData" validateTrigger="bind">
      <uni-forms-item name="goods_sn" label="货号" required>
        <uni-easyinput placeholder="商品的唯一货号" v-model="formData.goods_sn" trim="both"></uni-easyinput>
      </uni-forms-item>
      <uni-forms-item name="name" label="名称" required>
        <uni-easyinput placeholder="商品名称" v-model="formData.name" trim="both"></uni-easyinput>
      </uni-forms-item>
      <uni-forms-item name="keywords" label="关键字">
        <uni-easyinput placeholder="商品关键字，为搜索引擎收录使用" v-model="formData.keywords" trim="both"></uni-easyinput>
      </uni-forms-item>
      <uni-forms-item name="goods_desc" label="详细描述">
        <uni-easyinput placeholder="商品详细描述" v-model="formData.goods_desc" trim="both"></uni-easyinput>
      </uni-forms-item>
      <uni-forms-item name="goods_thumb" label="商品图片">
        <uni-file-picker file-mediatype="image" file-extname="jpg,png" return-type="object" v-model="formData.goods_thumb"></uni-file-picker>
      </uni-forms-item>
      <uni-forms-item name="remain_count" label="库存数量" required>
        <uni-easyinput placeholder="库存数量" type="number" v-model="formData.remain_count"></uni-easyinput>
      </uni-forms-item>
      <uni-forms-item name="month_sell_count" label="月销量">
        <uni-easyinput placeholder="月销量" type="number" v-model="formData.month_sell_count"></uni-easyinput>
      </uni-forms-item>
      <uni-forms-item name="total_sell_count" label="总销量">
        <uni-easyinput placeholder="总销量" type="number" v-model="formData.total_sell_count"></uni-easyinput>
      </uni-forms-item>
      <uni-forms-item name="comment_count" label="评论数">
        <uni-easyinput placeholder="累计评论数" type="number" v-model="formData.comment_count"></uni-easyinput>
      </uni-forms-item>
      <uni-forms-item name="is_on_sale" label="是否上架">
        <switch @change="binddata('is_on_sale', $event.detail.value)" :checked="formData.is_on_sale"></switch>
      </uni-forms-item>
      <uni-forms-item name="is_hot" label="是否热销">
        <switch @change="binddata('is_hot', $event.detail.value)" :checked="formData.is_hot"></switch>
      </uni-forms-item>
      <uni-forms-item name="add_date" label="上架时间">
        <uni-datetime-picker return-type="timestamp" v-model="formData.add_date"></uni-datetime-picker>
      </uni-forms-item>
      <uni-forms-item name="last_modify_date" label="最后修改时间">
        <uni-datetime-picker return-type="timestamp" v-model="formData.last_modify_date"></uni-datetime-picker>
      </uni-forms-item>
      <uni-forms-item name="seller_note" label="商家备注">
        <uni-easyinput placeholder="商家备注，仅商家可见" v-model="formData.seller_note" trim="both"></uni-easyinput>
      </uni-forms-item>
      <view class="uni-button-group">
        <button type="primary" class="uni-button" style="width: 100px;" @click="submit">提交</button>
        <navigator open-type="navigateBack" style="margin-left: 15px;">
          <button class="uni-button" style="width: 100px;">返回</button>
        </navigator>
      </view>
    </uni-forms>
  </view>
</template>

<script>
  import { validator } from '../../js_sdk/validator/goods.js';

  const db = uniCloud.database();
  const dbCmd = db.command;
  const dbCollectionName = 'goods';

  function getValidator(fields) {
    let result = {}
    for (let key in validator) {
      if (fields.includes(key)) {
        result[key] = validator[key]
      }
    }
    return result
  }

  

  export default {
    data() {
      let formData = {
        "goods_sn": "",
        "name": "",
        "keywords": "",
        "goods_desc": "",
        "goods_thumb": null,
        "remain_count": null,
        "month_sell_count": 0,
        "total_sell_count": 0,
        "comment_count": 0,
        "is_on_sale": false,
        "is_hot": false,
        "add_date": null,
        "last_modify_date": null,
        "seller_note": ""
      }
      return {
        formData,
        formOptions: {},
        rules: {
          ...getValidator(Object.keys(formData))
        }
      }
    },
    onReady() {
      this.$refs.form.setRules(this.rules)
    },
    methods: {
      
      /**
       * 验证表单并提交
       */
      submit() {
        uni.showLoading({
          mask: true
        })
        this.$refs.form.validate().then((res) => {
          return this.submitForm(res)
        }).catch(() => {
        }).finally(() => {
          uni.hideLoading()
        })
      },

      /**
       * 提交表单
       */
      submitForm(value) {
        // 使用 clientDB 提交数据
        return db.collection(dbCollectionName).add(value).then((res) => {
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
        })
      }
    }
  }
</script>
