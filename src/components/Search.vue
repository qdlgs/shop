<template>
          <!-- 搜索框 -->
<div class="search-warpper">
  <div class="search-input">
    <icon size="14" type="search"></icon>
        搜索
  </div>
</div>
</template>
<script>
export default {
    data () {
      return {
        
      }
    }
}
</script>
<style lang="scss" scoped>
 .search-warpper{
    background-color:#eb4450; 
    padding: 5px;
    .search-input{
      height: 60rpx;
      background-color: white;
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 5px;
      font-size: 15px;
      color: rgb(19, 4, 4);
    }
  }
</style>
