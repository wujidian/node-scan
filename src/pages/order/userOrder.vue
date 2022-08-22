<template>
  <div class="userOrder">
    <div class="orderStatus">
      <span
        v-for="(item,index) in orderStatus"
        :key="index"
        @click="changeStatus(item.status)"
        :class="{'isActive':item.status == statusValue}"
      >{{item.title}}</span>
    </div>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="contractName" label="产品名称" align="left">
        <template slot-scope="scope">
          <div>{{scope.row. projectName}} • {{scope.row.contractName}}</div>
        </template>
      </el-table-column>
      <el-table-column prop="orderNo" label="订单编号" align="left"></el-table-column>
      <el-table-column prop="priceCny" label="单价" align="center">
        <template slot-scope="scope">
          <div>{{scope.row.priceUsdt}} USDT/{{scope.row.powerUnit}}</div>
        </template>
      </el-table-column>
      <el-table-column prop="buyNumber" label="租赁算力" align="center" width="80px">
        <template slot-scope="scope">
          <div>{{scope.row.buyNumber|numMulti(scope.row.unitComputingPower)}} {{scope.row.powerUnit}}</div>
        </template>
      </el-table-column>
      <el-table-column prop label="支付金额" align="center">
        <template slot-scope="scope">
          <div v-if="scope.row.payType == 2">{{scope.row.buyNumber | numMulti(scope.row.priceCny)}}</div>
          <div
            v-if=" scope.row.payType !== 2"
          >{{scope.row.buyNumber | numMulti(scope.row.priceUsdt)}} {{scope.row.payType==2?'CNY':'USDT'}}</div>
        </template>
      </el-table-column>
      <el-table-column prop="createTime" label="下单时间" align="center" width="160px"></el-table-column>
      <el-table-column prop="payTypeName" label="支付方式" align="center" width="80px">
        <template slot-scope="scope">
          <div>{{scope.row.payTypeName || '--'}}</div>
        </template>
      </el-table-column>
      <el-table-column prop="state" label="当前状态" align="left" width="80px">
        <template slot-scope="scope">
          <span
            :class="scope.row.state == 0?'pendingStatus':(scope.row.state == 1?'successStatus':'failureStatus')"
          >{{scope.row.state == 0?"待付款":(scope.row.state == 1?'已完成':(scope.row.state == 2?'已取消':'已超时'))}}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="left" width="150px">
        <template slot-scope="scope">
          <button
            type="button"
            v-show="scope.row.state !== 0"
            class="normalBtn rimBtn"
            @click="$router.push({path:'/orderDetails/'+$Base64.encode(scope.row.uuid)})"
          >查看详情</button>
          <button
            type="button"
            v-show="scope.row.state == 0"
            class="normalBtn rimBtn"
            @click="$router.push({path:'/payment/'+$Base64.encode(scope.row.uuid)})"
          >支付</button>
          <button
            type="button"
            v-show="scope.row.state == 0"
            class="normalBtn rimBtn"
            @click="dialogCancelOrder = true;uuid=scope.row.uuid"
          >取消</button>
        </template>
      </el-table-column>
    </el-table>
    <div class="paging" v-show="total>0">
      <el-pagination
        layout="prev, pager, next"
        :page-count="total"
        @current-change="getOrderList"
        :current-page.sync="page"
      ></el-pagination>
    </div>
    <!-- 取消订单 -->
    <el-dialog
      :visible.sync="dialogCancelOrder"
      width="400px"
      :close-on-click-modal="false"
      :show-close="false"
      class="dialogTitle"
    >
      <div slot="title" class="header-title">
        <span class="title-age">取消订单</span>
      </div>
      <span>取消订单后不可恢复，确定取消吗？</span>
      <span slot="footer" class="dialog-footer">
        <button type="button" class="roundBtn rimBtn" @click="dialogCancelOrder = false">取 消</button>
        <button type="button" class="roundBtn" @click="cancelOrder()">确 定</button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import currencyData from "@/assets/localData/currency";
export default {
  name: "userOrder",
  data() {
    return {
      statusValue: "",
      orderStatus: [
        {
          title: "全部订单",
          status: ""
        },
        {
          title: "待完成",
          status: "0"
        },
        {
          title: "已完成",
          status: "1"
        },
        {
          title: "已取消",
          status: "2"
        },
        {
          title: "已超时",
          status: "3"
        }
      ],
      page: 1,
      total: 0,
      tableData: [],
      // 取消订单
      dialogCancelOrder: false,
      uuid: ""
    };
  },
  methods: {
    getOrderList(val) {
      this.page = val == undefined ? 1 : val;
      this.$api
        .getOrderList({
          sessionId: localStorage.getItem("passport"),
          state: this.statusValue,
          page: this.page,
          size: 10
        })
        .then(res => {
          let result = res.data;
          result.map(item => {
            let index = currencyData.currency.findIndex(
              a => a.value == item.projectType
            );
            item.powerUnit = currencyData.currency[index].powerUnit;
          });
          this.tableData = result;
          this.total = res.page.totalPage;
        });
    },
    // 状态筛选
    changeStatus(status) {
      this.statusValue = status;
      this.getOrderList(1);
    },
    // 取消订单
    cancelOrder() {
      this.dialogCancelOrder = false;
      this.$api
        .cancelOrder({
          sessionId: localStorage.getItem("passport"),
          uuid: this.uuid
        })
        .then(res => {
          this.getOrderList();
          this.uuid = "";
        })
        .catch(err => {
          this.$message.error(err.message);
          this.uuid = "";
        });
    }
  },
  mounted() {
    this.getOrderList();
  }
};
</script>
<style scoped>
.userOrder {
  min-height: 315px;
  box-sizing: border-box;
}
.orderStatus {
  text-align: center;
  padding: 25px 0;
  border-bottom: 1px solid rgb(235, 238, 245);
}
.orderStatus span {
  margin-right: 30px;
  color: rgba(128, 128, 128, 1);
  padding: 10px 0;
  cursor: pointer;
  font-size: 16px;
}
.isActive {
  color: rgba(73, 150, 255, 1) !important;
  border-bottom: 2px solid rgba(73, 150, 255, 1);
}
</style>

