<template>
  <div class="product pageTop">
    <img src="/static/image/productBanner.png" />
    <div class="platform">
      <div class="blockTitle">软件平台</div>
      <el-row class="rowCon">
        <el-col
          class="platformItem"
          :md="{ span: 8, offset: 0 }"
          :sm="{ span: 12, offset: 0 }"
          :xs="{ span: 20, offset: 2 }"
          v-for="(item, index) in platformData"
          :key="index"
        >
          <img :src="item.img" alt="" />
          <h4>{{ item.label }}</h4>
          <p>{{ item.text }}</p>
        </el-col>
      </el-row>
    </div>
    <!-- <div class="hardware">
      <div class="blockTitle">硬件产品</div>
      <el-row class="rowCon hardwareCon" type="flex" justify="space-between">
        <el-col
          class="hardwareItem"
          :lg="{ span: 10, offset: 2 }"
          :sm="{ span: 12, offset: 1 }"
          :xs="{ span: 12, offset: 1 }"
        >
          <h4>定制存储服务器</h4>
          <p>
            该产品是基于英特尔系列处理器（支持SGX）设计开发的4U机架式存储型服务器。在4U空间中可实现192T/384T/576TB海量存储空间，将存储性能、可拓展性、易维护性完美融合,充分挖掘和体现性能优势。
          </p>
        </el-col>
        <el-col
          class="hardwareItem"
          :lg="{ span: 10, offset: 0 }"
          :sm="{ span: 10, push: 0 }"
          :xs="{ span: 10, push: 0 }"
        >
          <img src="/static/image/hardware01.png" alt="" />
        </el-col>
      </el-row>
      <el-row class="rowCon hardwareCon" type="flex" justify="space-between">
        <el-col
          class="hardwareItem"
          :lg="{ span: 10, offset: 2 }"
          :sm="{ span: 12, offset: 1 }"
          :xs="{ span: 12, offset: 1 }"
        >
          <img src="/static/image/hardware02.png" alt="" />
        </el-col>
        <el-col
          class="hardwareItem"
          :lg="{ span: 10, offset: 0 }"
          :sm="{ span: 10, offset: 0 }"
          :xs="{ span: 10, offset: 0 }"
        >
          <h4>定制计算服务器</h4>
          <p>
            该产品是为满足对空间部署和高性能计算要求，基于英特尔系列处理器（支持SGX）设计开发的2U机架式计算型服务器。在2U高度空间中可支持单路或双路CPU，使产品超高计算性能、扩展性和密度完美融合。
          </p>
        </el-col>
      </el-row>
    </div> -->
  </div>
</template>
<script>
export default {
  name: "recordsCenter",
  data() {
    return {
      platformData: [
        {
          img: "/static/image/platform01.png",
          label: "分布式数据服务网关",
          text: "深度整合节点数据资源，为区块链应用开发者提供统一的数据API、SDK和文档，接入简单，扩展兼容性强，稳定度高，让复杂的数据信息不再成为瓶颈。",
        },
        {
          img: "/static/image/platform02.png",
          label: "物联网数据服务网关",
          text: "为物联网开发者提供数据接口和智能分析产品，针对物联网数据特点，提供海量数据的存储备份、资产管理、报表分析和数据服务等能力，帮助企业用户更容易地挖掘物联网数据中的价值。",
        },
        {
          img: "/static/image/platform03.png",
          label: "业务快照存证稽核系统",
          text: "提供完整的存证、查证、取证等业务管理系统。可有效解决普通存证的电子数据中心化存储、防篡改性能弱、存证成本高、可信度低等问题，使数据存证变得更可信、更安全、更高效 。",
        },
        {
          img: "/static/image/platform04.png",
          label: "可信内容管理系统",
          text: "基于区块链和可信硬件的内容管理平台，着力于内容汇聚、生产、管理、审核、以及发布全流程管理，可广泛的适用于媒体客户及行业客户的内容生产制作发布场景。",
        },
        {
          img: "/static/image/platform05.png",
          label: "企业云存储和数据共享平台",
          text: "基于IPFS/Crust/Phala的分布式存储和数据共享服务平台，帮助多方企业快速搭建分布式云存储和计算平台，实现数据源之间的数据存储、共享、交换、流转通道。",
        },
      ],
    };
  },
};
</script>
<style scoped>
.platform {
  max-width: 1200;
  margin: 0 auto;
}
.rowCon {
  margin: 0 auto;
  max-width: 1200px;
  padding: 46px 0;
}
.platformItem {
  padding: 0 60px 40px;
  /* height: 270px; */
  display: flex;
  flex-direction: column;
  align-items: center;
  /* box-sizing: border-box; */
}
.platformItem img {
  display: block;
  margin-bottom: 10px;
}
.platformItem h4 {
  font-size: 16px;
  text-align: center;
  color: #1c1c1c;
}
.platformItem p {
  color: #7b7d89;
  text-align: justify;
}
.hardware {
  background: #f4f5f9;
}
.hardwareCon {
  margin-top: 45px;
  align-items: start;
}
.hardwareCon img {
  display: block;
  max-width: 100%;
}
.hardwareItem h4 {
  width: 100%;
  font-size: 20px;
}
.hardwareItem p {
  font-size: 16px;
  color: #7b7d89;
}
</style>