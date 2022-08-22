<template>
  <div class="userSafety">
    <ul class="basicTitle">
      <li
        v-for="(item,index) in userMenuList"
        :key="index"
        :class="{'basicActive':basicActive.indexOf(item.active) != -1}"
      >
        <router-link :to="item.link">{{item.title}}</router-link>
      </li>
    </ul>
    <router-view />
  </div>
</template>
<script>
export default {
  name: "userSafety",
  data() {
    return {
      basicActive: "",
      userMenuList: [
        {
          title: "基本数据",
          active: "userInfo",
          link: "/userInfo"
        },
        {
          title: "更改密码",
          active: "changePassword",
          link: "/changePassword"
        },
        {
          title: "资金密码",
          active: "fundPassword",
          link: "/fundPassword"
        }
      ]
    };
  },
  watch: {
    // 路由监听
    $route: function(to, from) {
      this.basicActive = this.$route.meta.active;
    }
  },
  mounted() {
    this.basicActive = this.$route.meta.active;
  }
};
</script>
<style scoped>
.basicTitle {
  display: flex;
  justify-content: center;
  padding: 25px 0 25px 0;
  border-bottom: 1px solid rgb(235, 238, 245);
}
.basicTitle li {
  padding: 10px 5px;
  color: #808080;
  margin-right: 70px;
  cursor: pointer;
}
.basicTitle li:last-child {
  margin: 0;
}
.basicActive {
  border-bottom: 2px solid rgba(73, 150, 255, 1);
}
.basicActive a {
  color: rgba(73, 150, 255, 1) !important;
}
</style>



