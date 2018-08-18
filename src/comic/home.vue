<template>
 <div>
    
     <cpt-card v-for="(model,index) in $store.state.homeData" :key="index" 
     :comicModel="model"
     @clickComicEvent = "clickComicEvent"></cpt-card>
 </div>
</template>

<script>
import cptCard from './cpt_card.vue';

 export default {
   components: {
       cptCard
   },
   created() {
       if(this.$store.state.homeData!=null){
           this.homeData = this.$store.state.homeData;
           //console.log(this.homeData)
       }else{
           console.log('空数据！')
       }
   },
   data () {
     return {
        homeData:[],
     }
   },
   methods: {
       clickComicEvent(href){
           console.log(href)
       }
   },
   mounted() {
      
   },
 }
</script>

<style>
body {
  background-color: #f8f8f8;
}
 
</style>
