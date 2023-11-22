<template>
  <div class="tabs">
    <el-tag
      v-for="(item,index) in tags"
      :key="item.path"
      :closable="item.name !== 'home'"
      :effect="$route.name === item.name ? 'dark' : 'plain'"
      @click="changeMenu(item,index)"
      @close="handleClose(item,index)"
      size="small"
      >
      {{ item.label }}
    </el-tag>
  </div>
  
</template>

<script>
import { mapState , mapMutations } from "vuex"
export default {
  name:"common-tag",
  data() {
    return {

    }
  },
  computed: {
    ...mapState({
      tags: state =>state.tab.tabsList
    })
  },
  methods: {
    //点击tag跳转功能
    changeMenu(item) {
      if (
        this.$route.path !== item.path &&
        !(this.$route.path === "/home" && item.path === "/")
      ) {
        this.$router.push({name:item.name})
      } 
    },
    //点击tag删除的功能
    ...mapMutations(['closeTag']),
    handleClose(item , index) {
      //调用store中的mutations
      this.closeTag(item)
      const length = this.tags.length//获取的是删除之后的长度
      if(item.name !== this.$route.name) {
        return
      }
      if(index === length) {
        this.$router.push({name:this.tags[index -1].name})
      } else {
        this.$router.push({
          name:this.tags[index].name
        })
      }
    }
  },
  mounted () {
    console.log(this.tags);
  }
} 

</script>

<style lang="less" scoped>
.tabs{
  padding: 20px;
  .el-tag {
    margin-right: 15px;
    cursor: pointer;
  }
}
</style>