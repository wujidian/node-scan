<template>
  <div class="server pageTop">
    <img src="/static/image/serverBanner.png" />
    <div class="serverCon">
      <div class="blockTitle">服务展示</div>
      <ul>
        <li v-for="item in serverConData" :key="item.id">
          <h4>
            {{ item.label }}<span class="itemId">{{ item.id }}</span>
          </h4>
          <p>{{ item.content }}</p>
        </li>
      </ul>
    </div>
    <div class="serverNode">
      <div class="blockTitle">国内外优质节点覆盖，用户随处可用</div>
      <el-row class="serverNode-row" type="flex" justify="space-between">
        <el-col
          class="serverNode-col"
          v-for="(item, index) in nodeData"
          :key="index"
          :sm="10"
          :lg="6"
        >
          <img :src="item.img" alt="" />
          <div>{{ item.label }}</div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
export default {
  name: "home",
  data() {
    return {
      machine: "",
      machineData: [],
      nodeData: [
        {
          img: "/static/image/serverNode01.png",
          label: "全球节点分布",
        },
        {
          img: "/static/image/serverNode02.png",
          label: "超稳定运行",
        },
        {
          img: "/static/image/serverNode03.png",
          label: "专业平台",
        },
        {
          img: "/static/image/serverNode04.png",
          label: "更快更省",
        },
      ],
      serverConData: [
        {
          id: "01",
          label: "节点建设和运维服务",
          content: "提供节点建设、节点维护以及节点服务器生产和托管服务",
        },
        {
          id: "02",
          label: "分布式云计算服务",
          content:
            "依托海量计算服务器资源，完美相应业务需求，随时调整配置，多种计费模式灵活选择，无缝衔接丰富产品，持续为业务发展提供完整的云计算服务。",
        },
        {
          id: "03",
          label: "边缘数据采集和存储服务",
          content:
            "基于可信软硬件及区块链技术，保证在企业数据绝对安全和隐私保护的前提下完成多方数据协同采集和存储， 同时做到企业数据确权及协作行为追溯，保证协作过程的权益平衡。",
        },
        {
          id: "04",
          label: "区块链大数据服务",
          content:
            "数据科技赋能是产业升级的核心，然而大量数据却未被妥善收集和分析应用，我们专注于格式多样、实时生产的海量机器数据，让您不仅读懂机器，更能了解顾客的想法，成为行业的领先者。",
        },
        {
          id: "05",
          label: "数据缓存和分发服务",
          content:
            "独家的 CDN 加速和质量监控体系，可实现全网一体化调度和优化，助您在性能和成本之间得到良好平衡。面向不同音视频数据特别优化的传输网络让数据实现真正闭环。",
        },
        {
          id: "06",
          label: "可信存证服务",
          content:
            "数据通过IPFS/CRUST方式减少中心化控制，保障存证数据不可篡改，提供不限文件类型的hash存证、隐私存证、链接存证等多类型方案满足业务需求。",
        },
      ],
    };
  },
  mounted() {},
  watch: {
    // 路由监听
    // $route: function (to, from) {
    //   this.machineData = [];
    //   this.machine = this.$route.params.id;
    //   for (let i = 0; i < this.serversData.length; i++) {
    //     this.serversData[i].machineType == this.machine &&
    //       this.machineData.push(this.serversData[i]);
    //   }
    //   this.machineData == [] && this.$router.push({ path: "/" });
    //   // console.log(this.machineData);
    // },
  },
};
</script>
<style scoped>
.serverCon {
  padding-bottom: 50px;
}
.serverCon ul {
  max-width: 1200px;
  margin: 0 auto;
  background: url("/static/image/serverConBg.png") no-repeat center center;
  padding: 80px 0 10px;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}
.serverCon ul li {
  width: 50%;
  box-sizing: border-box;
  margin-bottom: 54px;
  display: flex;
  flex-direction: column;
}
.serverCon ul li h4 {
  font-size: 18px;
  position: relative;
}
.serverCon ul li p {
  color: #7b7d89;
}
.serverCon ul li h4 span {
  font-size: 50px;
  line-height: 50px;
  color: #1587ed;
  font-weight: bold;
  opacity: 0.5;
  display: block;
  position: absolute;
  left: -30px;
  bottom: -6px;
}
.serverCon ul li:nth-of-type(2n + 1) {
  padding-right: 18%;
  align-items: flex-end;
}

.serverCon ul li:nth-of-type(2n) {
  padding-left: 18%;
}
.serverCon ul li:nth-of-type(2n) h4 {
  margin-left: 25px;
}
.serverNode {
  background: rgba(227, 231, 240, 0.4);
}
.serverNode-row {
  max-width: 1200px;
  margin: 0 auto;
  padding: 57px 0 48px;
}
.serverNode-col {
  background: #fff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 55px 0 73px;
  box-shadow: 0px 2px 16px 0px rgba(0, 0, 0, 0.07);
  border-radius: 8px;
  margin-bottom: 20px;
}
.serverNode-col img {
  display: block;
  margin-bottom: 25px;
}
.serverNode-col div {
  font-size: 18px;
  color: #1c1c1c;
}
.serverNode-col + .serverNode-col {
  margin-left: 12px;
}
@media screen and (max-width: 1024px) {
  .serverNode-row {
    flex-wrap: wrap;
    padding-left: 40px;
    padding-right: 40px;
  }
  .serverNode-col + .serverNode-col {
    margin-left: 0px;
  }
}
</style> 