<template>
  <div>
<Search/>
<div class="item-list">
  <div class="left">
    <div class="left-list" 
    :class="{active:index == currentIndex}"
    v-for="(item,index) in leftList" 
    :key="index"
    @click="handClick(index)">
      {{item.cat_name}}
    </div>
  </div>
  <div class="right">
    <div class="right-pic">
      <img src="../../../static/images/gtx.jpg" alt="" mode="aspectFill">
    </div>
    <div class="brand" v-for="(subitem,subindex) in rightList.children" :key="subindex">
      <div class="right-title">
      <span>/</span>
      {{subitem.cat_name}}
      <span>/</span>
    </div>
    <div class="brand-list">
            <!-- 每项品牌 -->
            <div class="brand-item" 
            v-for="(item, index) in subitem.children" 
            :key="index"
            @click="handToList(item.cat_name)">
              <img :src="'https://www.itjustfun.cn/' + item.cat_icon" mode="aspectFill"/>
              <p>{{item.cat_name}}</p>
            </div>

          </div>
    </div>
  </div>
</div>
  </div>
</template>

<script>
// 引入封装好的公共头部样式
import Search from '../../components/Search.vue';
// 引入封装好的请求数据的request函数
import request from '../../utils/request.js';
export default {
 data() {
   return {
    //  菜单栏数组
     leftList:[],
    //  详情栏对象
     rightList:{},
    //  页面默认选中高亮
     currentIndex: 0
   }
 },
 components: {
   Search,
 },
 methods: {
   handClick(index){
    //  点击选项菜单栏高亮
    this.currentIndex = index
    // 点击选项菜单栏获取对应的详情数据
    this.rightList = this.leftList[this.currentIndex]
   },
   handToList(name){
      wx.navigateTo({
        url: `/pages/search/main?keyword=${name}`
      })
    }
 },
 mounted() {
  //  使用封装方法调用api接口请求数据
   request("https://itjustfun.cn/api/public/v1/categories").then(res =>{
    //  console.log(res)
    const {data} = res.data
    this.leftList = data
    this.rightList = data[0]
   })
  
 },
  }
</script>

<style lang="scss" scoped>
@import 'style.scss';
</style>

