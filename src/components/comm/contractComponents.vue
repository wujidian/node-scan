<template>
  <div class="productItem">
    <div class="soldout" v-show="contractObj.isSoldOut">
      <img src="/static/image/soldout.png" />
    </div>
    <div class="productIcon">
      <img :src="contractObj.imgUrl" height="40px" />
      <span>{{contractObj.projectName}}</span>
    </div>
    <el-row class="productData">
      <el-col :span="12">
        <el-row class="productPadding">
          <el-col :span="12">
            <div class="productCaption">租赁周期</div>
            <div class="productCaptionCon successStatus">{{contractObj.rentCycle}}天</div>
          </el-col>
          <el-col :span="12">
            <div class="productCaption">结算周期</div>
            <div class="productCaptionCon">{{contractObj.settlementCycle}}</div>
          </el-col>
        </el-row>
        <el-row class="productPadding">
          <el-col :span="12">
            <div class="productCaption">算力</div>
            <div
              class="productCaptionCon pendingStatus"
            >{{contractObj.unitComputingPower}}{{contractObj.powerUnit}}</div>
          </el-col>
          <el-col :span="12" v-show="contractObj.servicePrice !== 0">
            <div class="productCaption">
              技术服务费
              <el-tooltip
                class="contractData"
                effect="dark"
                content="包含矿机维护费用，机房运维费用"
                placement="top-start"
              >
                <i class="el-icon-question"></i>
              </el-tooltip>
            </div>
            <div class="productCaptionCon pendingStatus">{{contractObj.servicePrice}}%</div>
          </el-col>
        </el-row>
      </el-col>
      <el-col :span="12" class="productPadding">
        <div class="productName">{{contractObj.name}}</div>
        <div>
          <button
            type="button"
            :disabled="contractObj.isSoldOut !== 0"
            @click="goHashPowerDetails(contractObj.id)"
            class="normalBtn rimBtn viewContract"
            v-if="!isRealBuy"
          >查看合约</button>
          <div class="costTips">电费托管费已包含</div>
        </div>
        <el-row class="productAmountItem">
          <el-col :span="6">金额：</el-col>
          <el-col :span="18">
            <div class="right">{{contractObj.priceUsdt |numMulti(contractObj.number)}} USDT</div>
            <div
              class="right productAmountCny"
            >= ¥ {{contractObj.priceCny |numMulti(contractObj.number)}}</div>
          </el-col>
        </el-row>
        <div class="productNumber">
          <el-input-number
            v-model="contractObj.number"
            :min="1"
            :step="1"
            :step-strictly="true"
            :max="contractObj.maxByNumber"
            size="medium"
            :disabled="contractObj.isSoldOut !== 0"
          ></el-input-number>
        </div>
        <div v-if="isRealBuy" class="protocol">
          <el-checkbox v-model="checked">
            我已阅读并同意
            <router-link :to="'/protocol/'+$Base64.encode(contractObj.id)" target="_blank">矿机租赁/购买协议</router-link>
          </el-checkbox>
        </div>
        <div>
          <button
            type="button"
            class="normalBtn"
            :disabled="contractObj.isSoldOut == 1"
            @click="goHashPowerDetails(contractObj.id)"
          >立即抢购</button>
        </div>
      </el-col>
    </el-row>
    <!-- 实名认证 -->
    <verified-diglog :show.sync="dialogVerification" text="请先进行实名认证" path="/userVerification" />
    <!-- 资金密码 -->
    <verified-diglog :show.sync="dialogFundPassword" text="请先设置资金密码" path="/fundPassword" />
    <!-- 待支付订单 -->
    <verified-diglog
      :show.sync="dialogUnpaid"
      text="请先完成待支付订单！"
      :path="'/payment/'+$Base64.encode(unpaid)"
    />
  </div>
</template>

<script>
import verifiedDiglog from "@/components/comm/verifiedDiglog";
export default {
  name: "contractComponents",
  components: { verifiedDiglog },
  props: {
    contractData: {
      type: Object
    },
    isRealBuy: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      contractObj: JSON.parse(JSON.stringify(this.contractData)),
      dialogFundPassword: false,
      dialogVerification: false,
      checked: false,
      unpaid: "",
      dialogUnpaid: false
    };
  },
  watch: {
    contractData() {
      this.contractObj = JSON.parse(JSON.stringify(this.contractData));
    }
  },
  methods: {
    goHashPowerDetails(id) {
      if (!this.$store.state.info) {
        this.$message.error("未登录，请先登录！");
      } else if (!this.$store.state.info.hasPayPassword) {
        this.dialogFundPassword = true;
      } else if (this.$store.state.info.isRealNameAuth !== 1) {
        this.dialogVerification = true;
      } else {
        if (this.isRealBuy) {
          if (this.checked) {
            this.$api
              .getOrderList({
                sessionId: localStorage.getItem("passport"),
                state: 0,
                page: 1,
                size: 1
              })
              .then(res => {
                if (res.data.length == 0) {
                  this.$api
                    .addOrder({
                      sessionId: localStorage.getItem("passport"),
                      buyNumber: this.contractObj.number,
                      contractId: this.contractObj.id
                    })
                    .then(res => {
                      this.$router.push({
                        path: "/payment/" + this.$Base64.encode(res.data[0])
                      });
                    })
                    .catch(err => {
                      this.$message.error(err.message);
                    });
                } else {
                  this.unpaid = res.data[0].uuid;
                  this.dialogUnpaid = true;
                }
              });
          } else {
            this.$message.error("请勾选矿机租赁/购买协议");
          }
        } else {
          this.$router.push({
            path: "/cloudPowerDetails/" + this.$Base64.encode(id)
          });
        }
      }
    }
  }
};
</script>

<style  scoped>
/* 产品 */
.productItem {
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  margin-bottom: 54px;
  position: relative;
}
.soldout {
  background: rgba(0, 0, 0, 0.2);
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  right: 0;
  z-index: 3;
  display: flex;
  align-items: center;
  justify-content: center;
}
.productIcon {
  background: rgba(245, 249, 255, 1);
  line-height: 60px;
  padding: 0 20px;
  font-size: 16px;
  color: rgba(51, 51, 51, 1);
}
.productIcon img {
  vertical-align: middle;
  margin-right: 5px;
}
.productCaption {
  color: rgba(128, 128, 128, 1);
  line-height: 20px;
}
.productCaptionCon {
  font-size: 30px;
  line-height: 50px;
}
.productPadding {
  padding: 33px 50px;
}
.productData .productPadding:first-child {
  border-bottom: 1px solid rgba(240, 240, 240, 1);
}
.productData > .productPadding:last-child {
  border-left: 1px solid rgba(240, 240, 240, 1);
}
.productName {
  color: rgba(51, 51, 51, 1);
  font-size: 18px;
}
.viewContract {
  padding: 2px 10px !important;
  margin-right: 10px;
}
.costTips {
  display: inline-block;
  font-size: 12px;
  padding: 0 10px;
  border-left: 3px solid rgba(21, 135, 237, 0.2);
  margin: 12px 10px 18px 0;
  color: rgba(185, 184, 184, 1);
}
.productAmountItem {
  width: 200px;
  margin: 5px 0;
  font-size: 16px;
  color: rgba(51, 51, 51, 1);
  font-weight: bold;
}
.productAmountCny {
  font-size: 12px;
  color: rgba(128, 128, 128, 1);
  margin-top: 10px;
  font-weight: normal;
}
.productNumber {
  margin-bottom: 20px;
}
.protocol {
  margin: 10px 0;
}
</style>

