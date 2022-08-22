<template>
  <div class="userCloudPower">
    <div class="hashPowerTitle">
      <el-dropdown @command="currencyChange">
        <span class="el-dropdown-link hashPowerDropdown">
          <img :src="currencyJson.img" />
          <span>{{currencyJson.label}}</span>
          <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item
            v-for="item in currencyOption"
            :key="item.value"
            v-show="item.isOnline"
            :command="item.value"
          >{{item.label}}</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <div>
      <el-row class="powerStatistics">
        <el-col :span="6">
          <div>今日分配({{currencyJson.unit}})</div>
          <div>{{todayTotalCoin }}</div>
        </el-col>
        <el-col :span="6">
          <div>累计分配({{currencyJson.unit}})</div>
          <div>{{historyTotalCoin}}</div>
        </el-col>
        <el-col :span="6">
          <div>我的算力({{currencyJson.powerUnit}})</div>
          <div>{{orderCount}}</div>
        </el-col>
        <el-col :span="6">
          <div>
            <router-link to="/userCloudPowerDetail" class="toDetail">算力明细</router-link>
          </div>
          <!-- <router-link to="/cloudPower" class="roundBtn" style="display:inline-block">去购买</router-link> -->
        </el-col>
      </el-row>
      <div class="outputRecord">
        <div class="hashPowerRecord">产出记录</div>
        <el-table :data="tableData" style="width: 100%">
          <el-table-column prop="createTime" label="产出时间" align="center"></el-table-column>
          <el-table-column prop="coinName" label="产出类型" align="center"></el-table-column>
          <el-table-column prop="availableCoin" label="数量" align="center"></el-table-column>
          <el-table-column prop="sourceName" label="来源" align="center"></el-table-column>
        </el-table>
      </div>
      <div class="paging" v-show="total>0">
        <el-pagination
          layout="prev, pager, next"
          :page-count="total"
          @current-change="getUserMining"
        ></el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import currency from "@/assets/localData/currency";
export default {
  name: "userCloudPower",
  data() {
    return {
      currencyJson: "",
      currencyOption: currency.currency,
      total: 0,
      tableData: [],
      historyTotalCoin: 0,
      todayTotalCoin: 0,
      orderCount: 0
    };
  },
  methods: {
    // 币种切换
    currencyChange(val) {
      let currencyIndex = this.currencyOption.findIndex(
        res => res.value == val
      );
      this.currencyJson = this.currencyOption[currencyIndex];
      this.getUserMiningHistory();
      this.getUserMiningYesterday();
      this.getOrderCount();
      this.getUserMining();
    },
    // 收益记录
    getUserMining(page) {
      let pageNumber = 1;
      if (page !== undefined) pageNumber = page;
      this.$api
        .getUserMining({
          sessionId: localStorage.getItem("passport"),
          page: pageNumber,
          size: 10,
          projectType: this.currencyJson.value
        })
        .then(res => {
          this.tableData = res.data;
          this.total = res.page.totalPage;
        });
    },
    // 累计分配
    getUserMiningHistory() {
      this.$api
        .getUserMiningHistory({
          sessionId: localStorage.getItem("passport"),
          projectType: this.currencyJson.value
        })
        .then(res => {
          this.historyTotalCoin = res.data[0].totalCoin;
        });
    },
    // 昨日分配
    getUserMiningYesterday() {
      this.$api
        .getUserMiningYesterday({
          sessionId: localStorage.getItem("passport"),
          projectType: this.currencyJson.value
        })
        .then(res => {
          this.todayTotalCoin = res.data[0].totalCoin;
        });
    },
    // 统计算力
    getOrderCount() {
      this.$api
        .getOrderCount({
          sessionId: localStorage.getItem("passport"),
          projectType: this.currencyJson.value
        })
        .then(res => {
          this.orderCount = res.data[0];
        });
    }
  },
  mounted() {
    this.currencyChange(6);
  }
};
</script>
<style scoped>
.hashPowerTitle {
  padding: 10px 26px;
  background: rgba(245, 249, 255, 1);
}
.hashPowerTitle > div {
  display: inline-block;
  vertical-align: top;
  margin-right: 20px;
}
.toDetail {
  color: rgba(73, 150, 255, 1);
  font-size: 14px;
}
.hashPowerRecord {
  padding: 20px 42px;
  color: rgba(255, 255, 255, 1);
  background: linear-gradient(167deg, #91caff 0%, #589afd 100%);
  box-shadow: 0px 5px 25px rgba(88, 154, 253, 0.3);
}
.powerStatistics {
  font-size: 14px;
  color: rgba(128, 128, 128, 1);
}
.powerStatistics .el-col {
  padding: 40px 10px 40px 40px;
  height: 138px;
  box-sizing: border-box;
}
.powerStatistics .el-col:nth-child(2) {
  border-right: 1px solid rgba(240, 240, 240, 1);
}
.powerStatistics .el-col div:first-child {
  margin-bottom: 10px;
}
.powerStatistics .el-col div:last-child {
  font-size: 30px;
  color: rgba(73, 150, 255, 1);
  word-break: break-all;
}
.hashPowerDropdown {
  min-width: 150px;
  display: inline-block;
  background: rgba(73, 150, 255, 1);
  color: rgba(255, 255, 255, 1);
  font-size: 16px;
  font-weight: bold;
  padding-right: 10px;
  border-top-right-radius: 18px;
  border-bottom-right-radius: 18px;
  outline: none;
  cursor: pointer;
}
.hashPowerDropdown img {
  width: 40px;
  border-top-right-radius: 50%;
  border-bottom-right-radius: 50%;
  background: white;
}
.hashPowerDropdown i {
  text-align: right;
  float: right;
  line-height: 40px;
}
.outputRecord {
  width: 1126px;
  margin: 0 auto;
  box-shadow: 0px 3px 6px rgba(73, 150, 255, 0.21);
  border-radius: 4px;
}
</style>

