<template>
  <div class="bottom">
    <el-row class="footer">
      <el-col :span="8">
        <div class="btmItem">
          <img src="/static/image/btmLogo.png" alt />成都无极点科技有限公司
        </div>
        <div class="btmItem">
          <img
            src="/static/image/dizhi.png"
            alt
          />地址：成都市高新区香年广场T3栋1401
        </div>
        <div class="btmItem">
          <img
            src="/static/image/dianhua.png"
            alt
          />电话：028-62053633（9:00-18:00）
        </div>
        <div class="btmItem">
          © 2021 AnMav . All rights reserved. |
          <a href="https://beian.miit.gov.cn/" target="_blank">
            蜀ICP备18015461号-8</a
          >
        </div>
      </el-col>
      <!-- <div class="btmList">
          <div>友情链接</div>
          <ul>
            <li>
              <a href="https://wjl.cc/" target="_blank">无极链科技</a>
            </li>
            <li>
              <a href="https://polkadot.network/" target="_blank">Polkadot</a>
            </li>
            <li>
              <a href="https://crust.network/" target="_blank">Crust官网</a>
            </li>
            <li>
              <a href="https://phala.network/zh" target="_blank">Phala官网</a>
            </li>
          </ul>
        </div> -->
      <el-col :span="8">
        <div class="clause">
          <div>条款说明</div>
          <ul>
            <li>
              <a href="/static/file/user_terms.pdf" target="_blank">用户条款</a
              >|
            </li>
            <li>
              <a href="/static/file/privacy_agreement.pdf" target="_blank"
                >隐私条款</a
              >|
            </li>
            <li>
              <a href="/static/file/legal_Notices.pdf" target="_blank"
                >法律声明</a
              >
            </li>
          </ul>
        </div>
      </el-col>
      <el-col :span="8" class="WeChatQrCode">
        <div>
          <img src="/static/image/officailAccount.png" width="124px" />
          <div class="WeChatQrCodeName">公众号</div>
        </div>
        <div>
          <img src="/static/image/weChatImg.jpg" width="124px" />
          <div class="WeChatQrCodeName">微信客服</div>
        </div>
      </el-col>
    </el-row>
    <!-- <div id="cnzz_box" class="center">
      <span id="cnzz_stat_icon_1278912268"></span>
    </div> -->
  </div>
</template>

<script>
export default {
  name: "navBottom",
  created() {
    let script = document.createElement("script");
    script.type = "text/javascript";
    script.src = "https://s9.cnzz.com/z_stat.php?id=1278912268&show=pic";
    document.body.appendChild(script);
  },
};
</script>
<style scoped>
.bottom {
  background: #181828;
  background-size: 100% 100%;
}
.footer {
  color: #fff;
  max-width: 1200px;
  margin: 0 auto;
  box-sizing: border-box;
  /* color: rgba(72, 69, 68, 1);
  display: flex;
  justify-content: space-between; */
  padding: 20px 0;
  font-size: 16px;
}
.btmItem {
  display: flex;
  align-items: flex-end;
  padding: 20px 0;
  white-space: nowrap;
}
.btmItem img {
  margin-right: 21px;
}
.btmItem a {
  color: #fff;
  margin-left: 5px;
}
.clause {
  padding-top: 70px;
  padding-left: 70px;
}
.clause div {
  padding: 20px 0;
  margin-left: 15px;
}
.clause ul {
  padding: 20px 0;
  display: flex;
}
.clause ul li a {
  padding: 0 15px;
  color: #fff;
}
.WeChatQrCode {
  display: flex;
  justify-content: flex-end;
  text-align: center;
  padding-top: 70px;
}
.WeChatQrCode > div:first-child {
  margin-right: 40px;
}
.WeChatQrCode .WeChatQrCodeName {
  margin-top: 20px;
}
</style>
