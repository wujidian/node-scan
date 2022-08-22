<template>
  <div class="aboutUs pageTop">
    <img src="/static/image/aboutUsBanner.png" />
    <div class="introduce">
      <div class="blockTitle">公司简介</div>
      <el-row class="introduceCon" type="flex" justify="space-between">
        <el-col :span="8">
          <img src="/static/image/introduceImg.png" alt="" />
        </el-col>
        <el-col class="introduceText" :span="12">
          <img src="/static/image/introduceLogo.png" alt="" />
          <!-- <p>
            168Node作为专业化节点生态服务平台，致力于打造区块链基础设施的投资、规划、建设、运营与应用服务为一体综合服务平台。涉及业务包括服务器研发和销售，服务器托管、区块链节点建设和运维、分布式软件开发和应用、智能数据和内容生态管理等。团队深耕分布式存储与计算领域，打造了以分布式存储和智能数据产业为核心的新一代技术生态体系，努力为用户提供安全、稳定、高效、可靠的区块链服务，不断为用户创造更多价值。
          </p> -->
          <p>
            168Node作为专业化节点生态服务平台，致力于打造区块链基础设施的投资、规划、建设、运营与应用服务为一体综合服务平台。涉及业务包括区块链节点建设和运维、分布式软件开发和应用、智能数据和内容生态管理等。团队深耕分布式存储与计算领域，打造了以分布式存储和智能数据产业为核心的新一代技术生态体系，努力为用户提供安全、稳定、高效、可靠的区块链服务，不断为用户创造更多价值。
          </p>
        </el-col>
      </el-row>
    </div>
    <div class="CultureBg">
      <div class="Culture">
        <div class="blockTitle">企业文化</div>
        <div class="CultureCon">
          <div class="CultureConItem">
            <img src="/static/image/Culture01.png" alt="" />
            <div>
              <h4>企业使命</h4>
              <p>为用户提供极致的产品与服务</p>
            </div>
          </div>
          <div class="CultureConItem">
            <img src="/static/image/Culture02.png" alt="" />
            <div>
              <h4>核心价值观</h4>
              <p>
                创业 • 责任 &nbsp;&nbsp;&nbsp; 创新 • 求精 <br />
                诚信 • 感恩 &nbsp;&nbsp;&nbsp; 分享 • 互助
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "aboutUs",
  data() {
    return {};
  },
};
</script>
<style scoped>
.introduceCon {
  max-width: 1200px;
  margin: 0 auto;
  padding: 87px 0;
}
.introduceText {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
}
.introduceText p {
  font-style: "MicrosoftYaHei";
  font-size: 18px;
  line-height: 33px;
  color: #1c1c1c;
  padding-right: 24px;
  text-align: justify;
}
.Culture {
  max-width: 1200px;
  margin: 0 auto;
}
.CultureBg {
  background: rgba(227, 231, 240, 0.4);
}
.CultureCon {
  padding: 57px 0 63px;
  display: flex;
  justify-content: space-between;
}
.CultureConItem {
  position: relative;
}
.CultureConItem img {
  display: block;
}
.CultureConItem > div {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  left: 0;
  color: #fff;
}
.CultureConItem h4 {
  font-size: 18px;
  font-weight: 400;
  color: #ffffff;
}
</style>

