<template>
  <div class="tabs">
    <el-tag
      v-for="item in tags"
      :key="item.path"
      :closable="item.name !== 'home'"
      :effect="$route.name === item.name ? 'dark' : 'plain'">
      {{ item.label }}
    </el-tag>
  </div>
  
</template>

<script>
import { mapState } from "vuex"
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
  mounted () {
    console.log(this.tags);
  }
} 

</script>

<style>

</style>