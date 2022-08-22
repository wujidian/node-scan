<template>
  <div class="voteDetails pageTop">
    <img src="/static/image/nodeVoteBanner.png" />
    <div class="nodeInfo">
      <!-- logo+下拉 -->
      <div class="voteSelect">
        <img :src="nodeInfo.logo" width="45" />
        <el-select
          v-model="selectValue"
          placeholder="请选择"
          size="mini"
          @change="nodeChange"
          style="width: 118px; margin-left: 10px"
        >
          <el-option
            v-for="item in options"
            :key="item.id"
            :label="item.name"
            :value="item.id"
            v-show="item.isOnline"
          ></el-option>
        </el-select>
      </div>
      <div class="nodeVerifi">
        <span>节点名称：</span>
        <span>{{ nodeInfo.nodeName || "--" }}</span>
      </div>
      <div class="nodeAddr">
        <span>节点地址：{{ nodeInfo.nodeAddress }}</span>
        <div>
          <div class="qrHover">
            <button type="button" class="showCode">查看二维码</button>
            <div id="qrcode" class="qrImgHover"></div>
          </div>
          <button
            type="button"
            class="bgBtn"
            v-clipboard:copy="nodeInfo.nodeAddress"
            v-clipboard:success="copySuccess"
          >
            复制地址
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import QRCode from "qrcodejs2";
import nodeInfo from "@/assets/localData/nodeInfo";
import filter from "../../utils/filter";
export default {
  name: "chainxVote",
  data() {
    return {
      options: nodeInfo.nodeData,
      selectValue: "",
      nodeInfo: {},
    };
  },
  methods: {
    copySuccess(e) {
      this.$message("复制成功");
    },
    getQrcode() {
      this.$nextTick(() => {
        document.getElementById("qrcode").innerHTML = "";
        let qrcode = new QRCode("qrcode", {
          width: 130,
          height: 130,
          text: this.nodeInfo.nodeAddress,
          colorDark: "#000",
          colorLight: "#fff",
        });
      });
    },
    // 节点数据
    getNodeData(id) {
      this.nodeInfo = nodeInfo.nodeData.find((x) => {
        console.log(x);
        return x.id === id;
      });
      this.nodeInfo == null && this.$router.push({ path: "/" });
      this.getQrcode();
    },
    // 币种切换
    nodeChange(val) {
      this.getNodeData(val);
    },
    // 获取币种
    getNodeType() {
      this.selectValue = this.$route.params.id;
      this.getNodeData(this.selectValue);
    },
  },
  mounted() {
    this.getNodeType();
  },
  watch: {
    $route(to, from) {
      if (this.$route.params.id) {
        this.getNodeType();
      }
    },
  },
};
</script>
<style  scoped>
.voteDetails {
  background-position: left bottom;
  background-size: cover;
  min-height: 55vh;
}
.nodeInfo {
  width: 1400px;
  margin: 0 auto;
  padding: 65px 0;
  box-sizing: border-box;
  position: relative;
}
.voteSelect {
  padding: 25px 0;
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid #f2f4f5;
}
.voteSelect img {
  display: block;
  width: 78px;
}
.voteSelect /deep/ .el-select {
  width: 165px !important;
}
.voteSelect /deep/ .el-input__inner {
  border: transparent;
  font-size: 20px;
  color: #1c1c1c;
  font-weight: bold;
}
.voteSelect /deep/ .el-select .el-input .el-select__caret {
  font-weight: bold;
  font-size: 20px;
  font-weight: bolder;
  color: #1c1c1c;
}
.nodeSign {
  position: relative;
  width: 100%;
  height: 170px;
}
.nodeSign img {
  position: absolute;
  left: 0;
  bottom: 0;
}
.nodeVerifi {
  padding-top: 30px;
  display: flex;
  justify-content: center;
}
.nodeVerifi span {
  line-height: 62px;
  font-size: 18px;
}
/* .nodeVerifi span:last-child {
  color: rgba(0, 100, 251, 1);
} */
.nodeAddr {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.nodeAddr img {
  vertical-align: middle;
}
.nodeAddr span {
  margin-bottom: 60px;
  font-size: 18px;
}
.qrHover {
  display: inline-block;
  position: relative;
  margin-right: 40px;
}
.qrImgHover {
  position: absolute;
  top: 47px;
  left: 50%;
  transform: translateX(-50%);
  -webkit-transform: translateX(-50%);
  -ms-transform: translateX(-50%);
  -moz-transform: translateX(-50%);
  -o-transform: translateX(-50%);
  display: none;
  padding: 10px;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 5px 20px rgba(125, 142, 188, 1);
}
.qrHover:hover {
  cursor: pointer;
}
.qrHover:hover .qrImgHover {
  display: block;
}
.bgBtn {
  padding: 14px 34px;
  border: none;
  outline: none;
  color: rgba(255, 255, 255, 1);
  background: linear-gradient(to right, #1587ed, #3dd399);
  background-size: 100% 100%;
  border-radius: 5px;
  cursor: pointer;
}
.showCode {
  padding: 14px 34px;
  border: none;
  outline: none;
  background: #fff;
  border: 1px solid #1587ed;
  color: #1587ed;
  border-radius: 5px;
  cursor: pointer;
}
</style>
