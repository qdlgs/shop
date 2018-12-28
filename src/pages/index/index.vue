<template>
  <div>
    <Search/>
  <swiper
  indicator-dots
  autoplay
>
    <swiper-item v-for="(item,index) in imgUrl" :key="index">
      <image :src="item.image_src" class="slide-image" mode="aspectFill" />
    </swiper-item>
</swiper>
<div class="muns">
  <div class="muns-item" v-for="(subitem,subindex) in munsList" :key="subindex">
    <img :src="subitem.image_src" alt="" mode="aspectFill">
  </div>
</div>
<!-- 楼层数据 -->
 <div class="floor">
   <!-- 标题栏 -->
      <div class="floor-item" v-for="(item, index) in floorList" :key="index">
        <div class="floor-title">
          <img :src="item.floor_title.image_src"  mode="aspectFill"/>
        </div>
    <!-- 商品内容栏 -->
        <div class="product">
          <!-- 左侧内容栏 -->
          <div class="left">
            <img :src='item.product_list[0].image_src' mode="aspectFill"/>
          </div>
          <!-- 右侧内容栏 -->
          <div class="right">
            <div class="right-item" 
            v-if="subIndex != 0"
            v-for="(subItem, subIndex) in item.product_list" 
            :key="subIndex">
              <img :src="subItem.image_src">
            </div>

          </div>
        </div>
      </div>
    </div>
    <div class="back-top">
      <img src="/static/images/back-top.png" alt="">
    </div>
  </div>
</template>

<script>
import Search from '../../components/Search.vue';
// import request from '../../utils/request.js'
export default {
   data () {
     return {
       imgUrl:[],
       munsList:[],
       floorList:[]
     }
   },
   components:{
     Search,
   },
   mounted() {
       // ajax请求数据
      // 请求轮播图数据接口
     wx.request({
       url:'https://itjustfun.cn/api/public/v1/home/swiperdata',
       success:(res) =>{
        //  console.log(res)
         const {data} = res.data
         this.imgUrl = data
       }
     }),
    //  请求分类数据接口
     wx.request({
       url:'https://itjustfun.cn/api/public/v1/home/catitems',
       success:(res) =>{
        //  console.log(res)
         const {data} = res.data
         this.munsList = data
       }
     }),
    //  请求楼层数据接口
     wx.request({
       url:'https://www.zhengzhicheng.cn/api/public/v1/home/floordata',
       success:(res) =>{
        //  console.log(res)
         const {message} = res.data
         this.floorList = message
       }
     })
   }
  }
</script>

<style lang="scss" scoped>
@import 'style.scss';
</style>

