<template>
 <div>
   <van-tabs swipeable>
    <van-tab v-for="index in 8" :title="'选项 ' + index" :key="index">
      
    </van-tab>
  </van-tabs>
 </div>
</template>
<script>
import Vue from 'vue';
import { Tab, Tabs } from 'vant';
Vue.use(Tab).use(Tabs);
 export default {
   components: {
     Tab,Tabs
   },
   created() {

   },
   data () {
     return {

     }
   },
   methods: {

   },
   mounted() {
      this.nextTick(() => {

      })
   },
 }
</script>

<style>

 
</style>
