<template>
  <div>
    
    <el-container>
      <el-aside width="auto">
        <common-aside />
      </el-aside>
      <el-container>
        <el-header>
          <common-header />
        </el-header>
        <common-tag />
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import CommonAside from '@/components/common-aside.vue';
import CommonHeader from '@/components/common-header.vue';
import CommonTag from '@/components/common-tag.vue';
export default {
  data(){
    return{
  
    }
  },

  components:{
    CommonAside,
    CommonHeader,
    CommonTag
  }
};
</script>
 
<style>
.el-header {
  background-color: #333;
}
</style>