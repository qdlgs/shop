<template>
  <div class="details">
    <swiper
      autoplay
      duration
      indicator-dots
      indicator-color=skyblue
    >
      <block v-for="(item,index) in detailsList.pics" :key="index">
        <swiper-item>
          <image
            :src="item.pics_big"
            class="slide-image"
            width="355"
            height="150"
            mode="aspectFill"
          />
        </swiper-item>
      </block>
    </swiper>
    <div class="goods-details">
        <div class="goods-price">
            ${{detailsList.goods_price}}
        </div>
        <div class="goods-title">
            <div class="title">{{detailsList.goods_name}}</div>
            <span class="iconfont icon-shoucang">收藏</span>
        </div>
        <div class="express">快递: 免运费</div>
    </div>
    <div class="space"></div>
    <div class="box">
        <div class="box-title">
        / 商品详情 /
      </div>
      <div v-html="detailsList.goods_introduce">
      </div>
    </div>
   <div class="footer">

      <!-- 联系客服的按钮 -->
      <button class="contact" open-type="contact">联系客服</button>

      <div class="ft-left">
        <span class="iconfont icon-kefu-copy"></span>
        <p>联系客服</p>
      </div>
      <a href="/pages/cart/main" open-type="switchTab" class="ft-left">
        <span class="iconfont icon-unie62d"></span>
        <p>购物车</p>
      </a>
      <div class="ft-right" @click="handleAddCart">加入购物车</div>
      <div class="ft-right" @click="handleAddCart">立即购买</div>
    </div>
  </div>
</template>
<script>
// 引入自定義的請求後台數據的封裝函數
import request from "../../utils/request.js";
export default {
  data() {
    return {
      goods_id: "",
      detailsList:{}
    };
  },
  onLoad(query) {
      this.goods_id = query.goods_id
    request.get("https://itjustfun.cn/api/public/v1/goods/detail", {
      goods_id: this.goods_id
    }).then(res =>{
        console.log(res)
        const {data} = res.data
        this.detailsList = data
    })
  },
  methods: {
    handleAddCart(){
      
    }
  },
};
</script>
<style lang="scss" scoped>
@import 'style.scss';
</style>
