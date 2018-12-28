<template>
  <div class="search">
    <!-- 搜索框 -->
    <div class="search-warpper">
      <div class="search-input">
        <icon
          size="14"
          type="search"
        ></icon>
        电视
      </div>
    </div>
    <!-- tap栏 -->
    <div class="tap">
      <div
        class="tap-item"
        :class="{active:index == currentIndex}"
        @click="handTopList(index)"
        v-for="(item,index) in tapList"
        :key="index"
      >
        {{item}}
      </div>
    </div>
    <!-- 商品页 -->
    <div scroll-y class="search-list">
      <!-- 商品栏 -->
     <div class="box">
       
        <a :href="'/pages/details/main?goods_id=' + item.goods_id" 
        class="goods-list" 
        v-for="(item,index) in goodsList" 
        :key="index">
        <!-- 商品图片 -->
        <img
          :src="item.goods_small_logo"
          mode="aspectFill"
        >
        <!-- 商品描述 价格 -->
        <div class="goods-details">
          <div class="goods-title">
            {{item.goods_name}}
          </div>
          <div class="price">
            ￥<span>{{item.goods_price}}</span>
          </div>
        </div>
      </a>
      <!-- 加载提示 -->
      <div class="loading">
        <!-- <div v-show="hasMore">正在加载</div> -->
        <img v-if="hasMore" src="../../../static/images/dongtai.gif" mode="aspectFill">
        <div v-if="!hasMore">加载完成</div>
      </div>
    </div>
  </div>
    </div>
</template>
<script>
// 引入封装好的request请求后台数据函数
import request from "../../utils/request.js";
export default {
  data() {
    return {
      tapList: ["综合", "销量", "价格"],
      currentIndex: 0,
      goodsList: [],
      keyword: "",
      pagenum: 1,
      hasMore: true
    };
  },
  // mounted() {
  //     this.getData()
  // },
  // 页面加载时触发,只触发一次
  onLoad(query) {
    const keyword = query.keyword;
    this.keyword = keyword;
  },
  // 在页面卸载时候初始化所有data数据
  onUnload() {
    Object.assign(this, this.$options.data());
  },
  // 第一次请求数据
  onShow() {
    this.getData();
  },
  // 页面触底时触发加载下一页
  onReachBottom() {
    //   console.log(123);
    this.getData();
  },
  methods: {
    handTopList(index) {
      this.currentIndex = index;
    },
    getData() {
      if (!this.hasMore) {
        return;
      }
      request.get("https://itjustfun.cn/api/public/v1/goods/search", {
          query: this.keyword,
          pagenum: this.pagenum
        })
        .then(res => {
          const { goods } = res.data.data;
        // console.log(res)
          // 当goods列表数量小于20时候，没有更多数据
          if (goods.length < 20) {
            // 没有更多数据
            this.hasMore = false;
          }

          // 把goods添加到this.goodsList
          this.goodsList = this.goodsList.concat(goods);
          // 下一页
          this.pagenum = this.pagenum + 1;
        });
    }
  }
};
</script>
<style lang="scss" scoped>
@import "style.scss";
</style>
