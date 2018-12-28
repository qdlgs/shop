<template>
  <div class="searchpage">
    <!-- 顶部搜索框 -->
    <div class="search-wrapper">
      <div class="search-input">
        <icon
          type='search'
          size="16"
          @click="handSearch"
        />
        <input
          type="text"
          placeholder="请输入商品名称"
          v-model="inputValue"
          @input="handleInput"
          confirm-type="search"
          @confirm="handSearch"
        >
      </div>
      <!-- 定义一个点击事件 判断输入框是否有输入,有则取消按钮出现 -->
      <button
        class="cancel"
        size="mini"
        @click="handHide"
        v-show="inputValue"
      >取消</button>
    </div>
    <div class="history">
      <div class="history-title">
        <div class="history-info">历史记录</div>
        <icon
          type="clear"
          size="16"
          @click="handClear"
        />
      </div>
      <div class="search-history">
        <span
          v-for="(item,index) in historyList"
          :key="index"
        >{{item}}</span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      inputValue: "",
      // 页面数据初始化,本地存储如果有数据就渲染在页面上,没有为空
      historyList: wx.getStorageSync("historyList") || []
    };
  },
  methods: {
    // 监听输入框的值
    handleInput() {
      // console.log(this.inputValue)
    },
    // 判断输入框是否有值 隐藏取消按钮
    handHide() {
      this.inputValue = "";
    },
    //    点击搜索按钮触发事件
    handSearch() {
      if (this.inputValue) {
        // 把输入框的值存进 historyList 数组里面
        this.historyList.unshift(this.inputValue);

        // if(!this.inputValue){

        // }
        // set对象去重
        const newData = new Set(this.historyList);

        // 把set对象解构到数据里面
        this.historyList = [...newData];

        // 将inputvalue里面的数据存进本地数据库
        wx.setStorageSync("historyList", this.historyList);

        // 跳转到详情页面
        wx.navigateTo({
          url: `/pages/search/main?keyword=${this.inputValue}`
        });
        this.inputValue = "";
      }
    },
    // 清除历史记录
    handClear() {
      // 本地存储数据删除
      wx.clearStorageSync("historyList");
      // 页面数据删除
      this.historyList = [];
    }
  }
};
</script>
<style lang="scss" scoped>
@import "style.scss";
</style>
