<template>
  <div id="app">
    <!-- 路由匹配到的组件将渲染在这里 -->
    <transition :name='transitionName' keep-alive>
        <router-view></router-view>
    </transition>
    <!-- <van-cell-group class="item-list">
      <van-cell is-link icon="points" title="我的积分" />
      <van-cell is-link icon="gift" title="我收到的礼物" />
    </van-cell-group> -->
  </div>
</template>

<script>
import { Cell, CellGroup, Icon } from 'vant';

export default {
  components: {
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    [Icon.name]: Icon
  },
  data (){
    return {
        transitionName:''
    }
  },
  beforeRouteUpdate(to,from,next){
        let isBack = this.$router.isBack;
        if( isBack ){
            this.transitionName = 'slide-right'
        }else{
            this.transitionName = 'slide-left'
        }
        this.$router.isBack = false;
    }
};
</script>

<style>
body {
  background-color: #f8f8f8;
}

.van-cell__title .van-icon {
  font-size: 18px;
}

.slide-left-enter, .slide-right-leave-active {
  opacity: 0;
  -webkit-transform: translate(50px, 0);
  transform: translate(50px, 0);
}
.slide-left-leave-active, .slide-right-enter {
  opacity: 0;
  -webkit-transform: translate(-50px, 0);
  transform: translate(-50px, 0);
}

</style>
