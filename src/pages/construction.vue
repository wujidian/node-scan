<template>
  <div class="construction">
    <div class="pageTop">
      <img src="/static/image/appPageBanner.png" />
      <el-row class="topCon">
        <el-col class="topConItem" :span="15" :offset="4">
          <p>
            支持详细的区块链数据查询、服务器管理、<br />数据实时显示，给用户提供流畅的使用体验。
          </p>
          <div class="downloadCon">
            <img src="/static/image/android.png" alt="" />&nbsp;&nbsp;Android
            版下载
          </div>
          <img src="/static/image/download.png" alt="" />
        </el-col>
      </el-row>
    </div>
    <div class="constructionCon">
      <el-row class="conItem" type="flex" justify="space-between">
        <el-col :span="8">
          <img src="/static/image/appImg1.png" alt="" />
        </el-col>
        <el-col class="appConText" :span="12">
          <h4>区块浏览器</h4>
          <p>为用户提供详细的全网信息、全网容量、节点排行榜</p>
        </el-col>
      </el-row>
      <el-row class="conItem" type="flex" justify="space-between">
        <el-col class="appConText" :span="8">
          <h4>容量池</h4>
          <p>
            服务器远程接入，汇集分散容量，<br />
            容量占比、贡献度、账户数据实时查阅
          </p>
        </el-col>
        <el-col :span="16">
          <img src="/static/image/appImg2.png" alt="" />
        </el-col>
      </el-row>
      <el-row class="conItem" type="flex" justify="space-between">
        <el-col :span="8">
          <img src="/static/image/appImg3.png" alt="" />
        </el-col>
        <el-col class="appConText" :span="12">
          <h4>服务器管理</h4>
          <p>
            服务器多维数据实时监控、服务器离线及时推<br />
            送、智能排序便捷管理
          </p>
        </el-col>
      </el-row>
    </div>
    <div class="appDetailed"></div>
  </div>
</template>
<script>
export default {
  name: "construction",
  data() {
    return {};
  },
};
</script>
<style  scoped>
.pageTop {
  position: relative;
}
.topCon {
  height: 100%;
  width: 100%;
  position: absolute;
  top: 0px;
  left: 0;
}
.topConItem {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
  height: 100%;
  padding-left: 40px;
}
.topConItem p {
  font-size: 22px;
  color: #fff;
  line-height: 1.8em;
}
.topConItem > img {
  display: block;
  width: 5.2083vw;
  margin-left: 1.0417vw;
  margin-top: 1.0417vw;
}
.downloadCon {
  border: 1px solid rgba(255, 255, 255, 0.8);
  padding: 5px 11px;
  border-radius: 16px;
  color: #fff;
  display: flex;
  align-items: center;
}
.downloadCon img {
  display: block;
}
.constructionCon {
  max-width: 1200px;
  margin: 0 auto;
  padding: 87px 0;
}
.constructionCon .conItem {
  margin-bottom: 83px;
}
.appConText {
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.appConText h4 {
  font-size: 26px;
  color: #1c1c1c;
  margin-bottom: -5px;
  line-height: 26px;
  font-weight: bold;
}
.appConText p {
  color: #7b7d89;
  font-size: 20px;
  font-weight: 400;
  line-height: 1.5em;
}
</style>
