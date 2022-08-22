<template>
  <div class="container">
    <nav-Top />
    <router-view />
    <nav-Bottom />
  </div>
</template>

<script>
import navTop from "@/components/navTop";
import navBottom from "@/components/navBottom";
import { getUserInfo } from "@/utils/comm.js";
export default {
  name: "container",
  components: { navTop, navBottom },
  mounted() {
    getUserInfo((res) => {
      if (res !== true) {
        this.$message.error(res);
      }
    });
  },
};
</script>
<style scoped>
.container {
  position: relative;
}
</style>

