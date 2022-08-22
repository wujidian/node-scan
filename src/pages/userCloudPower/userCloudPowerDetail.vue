<template>
  <div class="userCloudPowerDetail">
    <div class="goUserToken">
      <router-link to="userCloudPower">
        <i class="el-icon-arrow-left"></i>返回上一级
      </router-link>
    </div>
    <div>
      <div class="hashPowerRecord">算力明细</div>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="contractName" label="产品名称" align="left"></el-table-column>
        <el-table-column prop="totalComputingPower" label="算力大小" align="center">
          <template slot-scope="scope">
            <span>{{scope.row.totalComputingPower}} {{scope.row.powerUnit}}</span>
          </template>
        </el-table-column>
        <el-table-column label="运行状态" align="center">
          <template slot-scope="scope">
            <span
              :class="scope.row.state == 0?'pendingStatus':(scope.row.state == -1?'failureStatus':'successStatus')"
            >{{scope.row.stateName}}</span>
          </template>
        </el-table-column>
        <el-table-column prop label="合约剩余时长" align="center">
          <template slot-scope="scope">
            <span>{{scope.row.restDays}}天</span>
          </template>
        </el-table-column>
      </el-table>
      <div class="paging" v-show="total>0">
        <el-pagination layout="prev, pager, next" :page-count="total"></el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import currencyData from "@/assets/localData/currency";
export default {
  name: "userCloudPowerDetail",
  data() {
    return {
      total: 0,
      tableData: []
    };
  },
  methods: {
    getContractList() {
      this.$api
        .getUserContractList({ sessionId: localStorage.getItem("passport") })
        .then(res => {
          let result = res.data;
          result.map(item => {
            let index = currencyData.currency.findIndex(
              a => a.value == item.projectType
            );
            item.powerUnit = currencyData.currency[index].powerUnit;
          });
          this.tableData = result;
        });
    }
  },
  mounted() {
    this.getContractList();
  }
};
</script>
<style scoped>
.userCloudPowerDetail {
  min-height: 315px;
  box-sizing: border-box;
}
.goUserToken {
  padding: 15px 0 15px 10px;
}
.goUserToken a {
  color: rgba(102, 102, 102, 1);
}
.hashPowerRecord {
  color: rgba(73, 150, 255, 1);
  font-size: 16px;
  font-weight: bold;
  padding: 15px;
  border-top: 1px solid rgba(213, 213, 213, 1);
  border-bottom: 1px solid rgb(235, 238, 245);
}
</style>

