<template>
  <div class="userParentEle">
    <div class="userModule">
      <div class="info">
        <img src="/static/image/avatar.png" />
        <span>{{$store.state.info.mobile || $store.state.info.email}}</span>
      </div>
      <div class="userMenu">
        <ul>
          <li v-for="(item,index) in userMenuList" :key="index">
            <router-link
              :to="item.link"
              :class="{'userMenuActive':active.indexOf(item.active) != -1}"
            >{{item.title}}</router-link>
          </li>
        </ul>
      </div>
      <div class="userCon">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "userParentEle",
  data() {
    return {
      active: "",
      userMenuList: [
        // {
        //   title: "通证管理",
        //   active: "assets",
        //   link: "/assets"
        // },
        {
          title: "算力管理",
          active: "userCloudPower",
          link: "/userCloudPower"
        },
        // {
        //   title: "订单管理",
        //   active: "userOrder",
        //   link: "/userOrder"
        // },
        {
          title: "安全管理",
          active: "userSafety",
          link: "/userSafety"
        },
        {
          title: "实名认证",
          active: "userVerification",
          link: "/userVerification"
        }
      ],
      info: ""
    };
  },
  watch: {
    // 路由监听
    $route: function(to, from) {
      this.active = this.$route.meta.active;
    }
  },
  mounted() {
    this.active = this.$route.meta.active;
  }
};
</script>
<style scoped>
.userParentEle {
  background: url("/static/image/userInfoBg.png") no-repeat;
  background-size: 100% 250px;
  overflow: hidden;
}
.userModule {
  width: 1200px;
  margin: 130px auto 100px auto;
}
.info {
  display: inline-block;
  min-width: 150px;
  margin-bottom: 20px;
  padding: 5px;
  color: rgba(73, 150, 255, 1);
  font-weight: bold;
  border: 1px solid rgba(255, 255, 255, 1);
  border-radius: 30px;
}
.info span {
  margin-left: 5px;
}
.userMenu {
  width: 100%;
  height: 60px;
  background: rgba(240, 240, 240, 1);
}
.userMenu ul {
  display: flex;
  justify-content: center;
}
.userMenu li a {
  display: inline-block;
  height: 60px;
  line-height: 60px;
  text-align: center;
  padding: 0 30px;
  color: rgba(51, 51, 51, 1);
}
.userMenu li:hover {
  background: rgba(249, 251, 252, 0.5);
}
.userMenuActive {
  background: rgba(249, 251, 252, 1);
  color: rgba(73, 150, 255, 1) !important;
  font-weight: bold;
}
.userCon {
  min-height: 500px;
  box-shadow: 0px 3px 6px rgba(73, 150, 255, 0.21);
  box-sizing: border-box;
}
</style>

