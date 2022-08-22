<template>
  <div class="download">
    <div class="WeChatMask" v-show="isWeChat">
      <div class="WeChatTips">
        <div class="nums"><span>1</span> 点击屏幕右上角图标</div>
        <div class="nums"><span>2</span> 选择用 “浏览器” 打开</div>
      </div>
      <img src="/static/image/WeChat1.png" class="WeChat1" />
      <!-- <img src="/static/image/WeChat2.png" class="WeChat2" /> -->
    </div>
    <div>
      <a :href="appAddress" :download="appAddress" class="appDownLoad"
        >Android下载</a
      >
    </div>
  </div>
</template>

<script>
export default {
  name: "download",
  data() {
    return {
      isWeChat: false,
      xxx: "",
      appAddress: "",
    };
  },
  methods: {
    getAuthority() {
      if (/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)) {
        console.log("现在移动端打开的");
      } else {
        this.$router.push({ path: "/" });
      }
      var wx = this.isWeiXin();
      if (wx) {
        this.isWeChat = true;
      }
      let meta = document.querySelector('meta[name="viewport"]');
      meta.content =
        "width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no,viewport-fit=cover";
      document.title = "168Node APP DOWNLOAD";
    },
    isWeiXin() {
      var ua = navigator.userAgent.toLowerCase();
      if (
        ua.match(/MicroMessenger/i) == "micromessenger" ||
        ua.match(/WeiBo/i) == "weibo"
      ) {
        return true;
      } else if (ua.indexOf("iphone") > -1 || ua.indexOf("mac") > -1) {
        if (ua.indexOf("qq") > -1) {
          return true;
        }
      }
      return false;
    },
    appDownload() {
      window.open("");
    },
    getAppAddress() {
      this.$api
        .getAppAddress()
        .then((res) => {
          console.log(res);
          if (res.data.length > 0) {
            this.appAddress = res.data[0].url;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  mounted() {
    this.getAuthority();
    this.getAppAddress();
  },
};
</script>
<style  scoped>
.download {
  /* background: url("/static/image/appDownloadBg.png") no-repeat center center;
  background-size: cover;*/
  background: url("/static/image/appDownloadBg.png") no-repeat;
  background-size: 100% 100%;
  width: 100vw;
  height: 100vh;
  position: relative;
}

.WeChatMask {
  width: 100vw;
  height: 100vh;
  z-index: 10000;
  background-color: rgba(0, 0, 0, 0.6);
  color: rgba(254, 252, 252, 1);
  font-size: 4.3vw;
  text-align: center;
  position: fixed;
}
.WeChatTips {
  position: absolute;
  top: 20vh;
  right: 25vw;
}
.nums {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}
.nums span {
  width: 27px;
  height: 27px;
  background: #2399d8;
  border-radius: 50px;
  margin-right: 10px;
  line-height: 27px;
}
.WeChat1 {
  position: absolute;
  top: 7vh;
  right: 10vw;
  /* width: 30vw;
  height: 27vh; */
}
.WeChat2 {
  position: absolute;
  top: 2vh;
  right: 5vw;
  width: 10vw;
  height: 8vh;
}
.appDownLoad {
  display: block;
  width: 45vw;
  line-height: 11vw;
  margin: 0 auto;
  text-align: center;
  background: #5391ec;
  color: rgba(254, 252, 252, 1);
  box-shadow: 0 0 5px rgba(19, 47, 142, 1);
  border: 2px solid #ffffff;
  border-radius: 10px;
  font-size: 4.3vw;
  position: absolute;
  left: 50%;
  bottom: 15%;
  transform: translate(-50%, -20%);
}
</style>
