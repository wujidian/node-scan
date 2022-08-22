<template>
  <section class="orderDetails">
    <div class="noData" v-if="Object.keys(product).length ==0">
      <img src="/static/image/noData.png" />
      <p>暂无数据</p>
    </div>
    <div v-else>
      <div class="tradingStatus" v-if="product.state == 1">
        <div class="payResult">支付成功！</div>
      </div>
      <div class="tradingStatus" v-if="product.state == 2 || product.state == 3">
        <div class="payResult">交易关闭！</div>
        <div v-show="product.state == 2">取消关闭！</div>
        <div v-show="product.state == 3">超时关闭！</div>
      </div>
      <div class="orderInfo">
        <div class="orderTitle">我的订单</div>
        <div class="orderCon">
          <div class="contractName">
            <span>产品名称：</span>
            <span>{{product.contractName}}</span>
          </div>
          <el-row>
            <el-col :span="8" class="orderItem">
              <div>
                <img src="/static/image/order_icon_allvolume.png" />
              </div>
              <div>
                <div>算力</div>
                <div class="orderNum">{{product.unitComputingPower }}{{product.powerUnit}}</div>
              </div>
            </el-col>
            <el-col :span="8" class="orderItem">
              <div>
                <img src="/static/image/order_icon_poolvolume.png" />
              </div>
              <div>
                <div>租赁数</div>
                <div class="orderNum">{{product.buyNumber}}个</div>
              </div>
            </el-col>
            <el-col :span="8" class="orderItem">
              <div>
                <img src="/static/image/order_icon_itc.png" />
              </div>
              <div>
                <div>租赁算力</div>
                <div
                  class="orderNum"
                >{{product.unitComputingPower *product. buyNumber || 0}}{{product.powerUnit}}</div>
              </div>
            </el-col>
            <el-col :span="8" class="orderItem">
              <div>
                <img src="/static/image/order_icon_miner.png" />
              </div>
              <div>
                <div>租赁周期</div>
                <div class="orderNum">{{product.rentCycle}}天</div>
              </div>
            </el-col>
            <el-col :span="8" class="orderItem" v-show="product.machineModel">
              <div>
                <img src="/static/image/order_icon_lastblock.png" />
              </div>
              <div>
                <div>矿机型号</div>
                <div class="orderNum">{{product.machineModel}}</div>
              </div>
            </el-col>
            <el-col :span="8" class="orderItem" v-show="product.poolName">
              <div>
                <img src="/static/image/order_icon_24block.png" />
              </div>
              <div>
                <div>矿池</div>
                <div class="orderNum">{{product.poolName}}</div>
              </div>
            </el-col>
          </el-row>
          <el-row class="payInfo">
            <el-col :span="7">
              <div class="payInfoItem">
                <span>订单编号</span>
                <span>{{product.orderNo}}</span>
              </div>
              <div class="payInfoItem">
                <span>下单时间</span>
                <span>{{product.createTime}}</span>
              </div>
              <div class="payInfoItem" v-show="product.payTime">
                <span>支付时间</span>
                <span>{{product.payTime }}</span>
              </div>
              <div class="payInfoItem" v-show="product.payTypeName">
                <span>支付方式</span>
                <span>{{product.payTypeName }}</span>
              </div>
            </el-col>
            <el-col :span="12">
              <div class="right amount">
                <span>订单金额：</span>
                <span>{{product.priceUsdt}} USDT</span>
              </div>
              <div class="right">= ¥ {{product.priceCny}}</div>
            </el-col>
          </el-row>
        </div>
      </div>
      <div class="goHashPowerDetail">
        <router-link v-show="product.state == 1" class to="/userCloudPowerDetail">查看我的算力</router-link>
      </div>
    </div>
  </section>
</template>

<script>
import currencyData from "@/assets/localData/currency";
export default {
  name: "orderDetails",
  data() {
    return {
      product: ""
    };
  },
  methods: {
    getOrderDetails() {
      this.$api
        .getOrderDetails({
          sessionId: localStorage.getItem("passport"),
          uuid: this.$Base64.decode(this.$route.params.uuid)
        })
        .then(res => {
          let result = res.data[0];
          let index = currencyData.currency.findIndex(
            a => a.value == result.projectType
          );
          result.powerUnit = currencyData.currency[index].powerUnit;
          this.product = result;
        });
    }
  },
  mounted() {
    this.getOrderDetails();
  }
};
</script>
<style  scoped>
.orderDetails {
  padding: 70px 0 400px 0;
  background: url("/static/image/bg3.png") no-repeat;
  background-size: 100% contain;
  background-position: left 50% bottom 50%;
}
.tradingStatus {
  text-align: center;
  padding-bottom: 50px;
  font-size: 18px;
}
.payResult {
  font-weight: bold;
  margin: 20px 0;
}
.goHashPowerDetail {
  width: 1200px;
  margin: 22px auto;
  padding-left: 100px;
}
.goHashPowerDetail a {
  color: rgba(0, 100, 251, 1);
  border-bottom: 1px solid rgba(0, 100, 251, 1);
}
</style>
