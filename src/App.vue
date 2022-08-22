<template>
  <div id="app" ref="app">
    <el-scrollbar style="height: 100%" ref="scroll">
      <router-view />
    </el-scrollbar>
  </div>
</template>

<script>
export default {
  name: "App",
  mounted() {
    // 关闭浏览器窗口的时候清空浏览器缓存在localStorage的数据
    window.onbeforeunload = function (e) {
      var storage = window.localStorage;
      storage.removeItem("banner");
    };

    // // 页面开始加载时修改font-size
    // var html = document.getElementsByTagName("html")[0];
    // var oWidth =
    //   document.body.clientWidth || document.documentElement.clientWidth;
    // // 这里的750是指设计图的大小,自己根据实际情况改变

    // html.style.fontSize = (oWidth / 1920) * 16 + "px";
    // console.log(html.style.fontSize);
    // console.log("rem:", html.style.fontSize);
  },
  watch: {
    //监听路由跳转将页面调回最顶部
    $route() {
      this.$refs.scroll.wrap.scrollTop = 0;
    },
  },
};
</script>


