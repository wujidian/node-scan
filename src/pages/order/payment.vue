<template>
  <section class="payment">
    <section class="paymentCon">
      <div class="noData" v-if="Object.keys(product).length ==0">
        <img src="/static/image/noData.png" />
        <p>暂无数据</p>
      </div>
      <div class="orderInfo" v-else>
        <div class="orderTitle">
          订单确认信息
          <span class="countdown">剩余支付时间：{{remainingTime|dataFilter}}</span>
        </div>
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
              <div class="payInfoItem">
                <span>付款方式</span>
                <span>
                  <img src="/static/image/payment_Alipay.png" width="28px" /> 支付宝
                </span>
              </div>
            </el-col>
            <el-col :span="12" class="right">
              <div class="amount">
                <span>金额：</span>
                <span>{{product.priceUsdt}} USDT</span>
              </div>
              <div>= ¥ {{product.priceCny}}</div>
              <div class="orderBtn">
                <button type="button" class="bgBtn" @click="paymentClick(2)">立即付款</button>
                <button type="button" class="textBtn" @click="dialogCancelOrder = true">取消订单</button>
              </div>
            </el-col>
          </el-row>
        </div>
      </div>
    </section>
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
    <!-- 充值 -->
    <el-dialog
      :visible.sync="dialogRecharge"
      width="400px"
      :close-on-click-modal="false"
      :show-close="false"
    >
      <div class="center">
        <div class="rechargeTitle">充值USDT</div>
        <div class="rechargeChain">ERC20</div>
        <div id="rechargeQrcode"></div>
        <div class="rechargeAddr">
          <span>{{address}}</span>
          <img
            src="/static/image/icon_copy.png"
            v-clipboard:copy="address"
            v-clipboard:success="copySuccess"
          />
        </div>
        <div class="rechargeBtn">
          <button type="button" class="bgBtn" @click="dialogRecharge = false">确 定</button>
        </div>
        <div class="rechargeTips">
          重要提示：请确认与选择正确的链上资产进行
          充值，充入错误的链类型或资产将无法找回
        </div>
      </div>
    </el-dialog>
    <!-- 支付二维码 -->
    <el-dialog
      :visible.sync="dialogPayment"
      width="300px"
      :close-on-click-modal="false"
      :show-close="false"
    >
      <div class="center">
        <div id="paymentQrcode" class="qrcode"></div>
        <div class="paymentTips">{{payType == 2?'请用支付宝扫码并支付':'请用微信扫码并支付'}}</div>
        <div>
          <button type="button" class="roundBtn" @click="paidResult(true)">我已支付</button>
          <button type="button" class="roundBtn rimBtn" @click="dialogPayment = false">关 闭</button>
        </div>
        <p>
          <button
            type="button"
            class="textBtn"
            @click="dialogPayment = false;dialogCustomerService = true"
          >支付遇到困难</button>
        </p>
      </div>
    </el-dialog>
    <!-- 添加客服 -->
    <el-dialog
      :visible.sync="dialogCustomerService"
      width="300px"
      :close-on-click-modal="false"
      :show-close="false"
    >
      <div class="center">
        <div class="qrcode">
          <img src="/static/image/poolUser.png" width="180" />
        </div>
        <div class="paymentTips">扫码添加微信客服咨询</div>
        <div>
          <button type="button" class="roundBtn" @click="dialogCustomerService = false">关 闭</button>
        </div>
      </div>
    </el-dialog>
    <!-- 资金密码 -->
    <el-dialog
      :visible.sync="dialogFundPassword"
      width="400px"
      :close-on-click-modal="false"
      @close="$refs['fundPasswordForm'].resetFields()"
      class="dialogTitle"
    >
      <div slot="title" class="header-title">
        <span class="title-age">资金密码</span>
      </div>
      <div>请输入资金密码</div>
      <el-form
        :model="fundPasswordForm"
        :rules="rules"
        ref="fundPasswordForm"
        label-position="top"
        size="mini"
        style="margin-top:40px"
      >
        <el-form-item label="资金密码" prop="fundPassword">
          <el-input type="password" v-model="fundPasswordForm.fundPassword" maxlength="6"></el-input>
        </el-form-item>
      </el-form>
      <div class="center">
        <button type="button" class="roundBtn" @click="paymentUSDT('fundPasswordForm')">确 认</button>
      </div>
    </el-dialog>
  </section>
</template>

<script>
import QRCode from "qrcodejs2";
import validate from "@/utils/validate";
import currencyData from "@/assets/localData/currency";
export default {
  name: "payment",
  data() {
    return {
      product: {},
      // 取消订单
      dialogCancelOrder: false,
      // 充值
      dialogRecharge: false,
      address: "",
      // 支付弹框
      dialogPayment: false,
      paymentAddr: "",
      payType: 1,
      // 客服
      dialogCustomerService: false,
      // 资金密码
      dialogFundPassword: false,
      fundPasswordForm: {
        fundPassword: ""
      },
      rules: {
        fundPassword: [
          { required: true, message: "请输入资金密码", trigger: "blur" },
          {
            validator: validate.FormValidate.Form().checkCode,
            trigger: "blur"
          }
        ]
      },
      // 剩余时间
      remainingTime: 0,
      countdownInterval: null,
      // 支付结果
      payResultTimer: null,
      // 账户余额
      balance: ""
    };
  },
  methods: {
    copySuccess() {
      this.$message("复制成功");
    },
    // 订单详情
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
          if (this.product.state !== 0) {
            this.$alert(
              this.product.state == 1
                ? "当前订单已完成!"
                : this.product.state == 2
                ? "当前订单已取消!"
                : "当前订单已超时!",
              "提示",
              {
                showCancelButton: false,
                showConfirmButton: false,
                callback: action => {
                  this.$router.push({
                    path:
                      "/orderDetails/" + this.$Base64.encode(this.product.uuid)
                  });
                }
              }
            );
          } else {
            let pastTime =
              new Date().getTime() -
              new Date(this.product.createTime.replace(/-/g, "/")).getTime();
            this.remainingTime =
              6 * 60 * 1000 -
              (pastTime > 6 * 60 * 1000 ? 6 * 60 * 1000 : pastTime);
            this.countdown();
          }
        });
    },
    // 取消订单
    cancelOrder() {
      this.dialogCancelOrder = false;
      this.$api
        .cancelOrder({
          sessionId: localStorage.getItem("passport"),
          uuid: this.product.uuid
        })
        .then(res => {
          this.$router.push({
            path: "/orderDetails/" + this.$Base64.encode(this.product.uuid)
          });
        })
        .catch(err => {
          this.$message.error(err.message);
        });
    },
    // 充值
    recharge() {
      this.dialogRecharge = true;
      this.getUSDTAddr();
    },
    // 支付点击
    paymentClick(payType) {
      this.payType = payType;
      if (payType == 2) {
        this.getPayCode();
      } else {
        if (this.$store.state.info.hasPayPassword) {
          this.dialogFundPassword = true;
        } else {
          this.$message.error("请先设置资金密码");
        }
      }
    },
    // 请求支付二维码地址
    getPayCode() {
      this.$api
        .payOrder({
          sessionId: localStorage.getItem("passport"),
          uuid: this.product.uuid,
          payType: this.payType
        })
        .then(res => {
          this.paymentAddr = res.data[0];
          this.paymentAlipay();
        })
        .catch(err => {
          this.$message.error(err.message);
        });
    },
    // 生成支付二维码
    paymentAlipay() {
      this.dialogPayment = true;
      this.$nextTick(() => {
        document.getElementById("paymentQrcode").innerHTML = "";
        let qrcode = new QRCode("paymentQrcode", {
          width: 180,
          height: 180,
          text: this.paymentAddr,
          colorDark: "#000",
          colorLight: "#fff"
        });
        if (this.countdownInterval !== null) this.payResult();
      });
    },
    // USDT支付
    paymentUSDT(formName) {
      this.$refs[formName].validate(valid => {
        this.$api
          .payOrder({
            sessionId: localStorage.getItem("passport"),
            uuid: this.product.uuid,
            payType: this.payType,
            payPassword: this.fundPasswordForm.fundPassword
          })
          .then(res => {
            this.dialogFundPassword = false;
            this.$message("支付成功");
            this.$router.push({
              path: "/orderDetails/" + this.$Base64.encode(this.product.uuid)
            });
          })
          .catch(err => {
            this.dialogFundPassword = false;
            this.$message.error(err.message);
          });
      });
    },
    // 剩余时间
    countdown() {
      this.countdownInterval = setInterval(() => {
        if (this.remainingTime <= 0) {
          clearInterval(this.countdownInterval);
          this.paidResult(false);
          return false;
        }
        this.remainingTime -= 1000;
      }, 1000);
    },
    // 支付结果
    payResult() {
      this.payResultTimer = setTimeout(() => {
        if (this.remainingTime <= 0) {
          clearInterval(this.countdownInterval);
          return false;
        } else {
          this.$api
            .getPayResult({
              sessionId: localStorage.getItem("passport"),
              uuid: this.product.uuid
            })
            .then(res => {
              if (res.data[0] == 0) {
                this.payResult();
              } else {
                this.$router.push({
                  path:
                    "/orderDetails/" + this.$Base64.encode(this.product.uuid)
                });
              }
            });
        }
      }, 1000);
    },
    // 我已支付
    paidResult(isShow) {
      this.$api
        .getPayResult({
          sessionId: localStorage.getItem("passport"),
          uuid: this.product.uuid
        })
        .then(res => {
          if (res.data[0] == 0) {
            isShow && this.$message.error("未支付成功，请重新核对");
          } else {
            this.$router.push({
              path: "/orderDetails/" + this.$Base64.encode(this.product.uuid)
            });
          }
        });
    },
    // 通证余额
    getAccoutBalance() {
      this.$api
        .getAccoutBalance({
          sessionId: localStorage.getItem("passport")
        })
        .then(res => {
          this.balance = res.data[0];
        });
    },
    // USDT充值地址
    getUSDTAddr() {
      this.$api
        .getUSDTaddr({
          sessionId: localStorage.getItem("passport")
        })
        .then(res => {
          this.address = res.data[0];
          this.$nextTick(() => {
            document.getElementById("rechargeQrcode").innerHTML = "";
            let qrcode = new QRCode("rechargeQrcode", {
              width: 100,
              height: 100,
              text: this.address,
              colorDark: "#000",
              colorLight: "#fff"
            });
          });
        });
    }
  },
  mounted() {
    this.getOrderDetails();
    this.getAccoutBalance();
  },
  beforeDestroy() {
    clearInterval(this.countdownInterval);
    clearTimeout(this.payResultTimer);
  }
};
</script>
<style  scoped>
.payment {
  min-height: 500px;
  padding: 148px 0 400px 0;
  background: url("/static/image/bg3.png") no-repeat;
  background-size: 100% contain;
  background-position: left 50% bottom 50%;
}
.payment .orderTitle {
  color: rgba(0, 0, 0, 1);
}
.countdown {
  float: right;
  font-size: 12px;
  color: rgba(59, 99, 206, 1);
}
.paymentCon {
  width: 1200px;
  margin: 0 auto;
}
.border_bom {
  border-bottom: 1px solid rgba(231, 231, 231, 1);
}
.border_bom:last-child {
  border: none;
}
.rechargeTitle {
  font-weight: bold;
  padding: 10px 0;
  border-bottom: 1px solid rgba(151, 151, 151, 1);
}
.rechargeChain {
  width: 67px;
  line-height: 25px;
  margin: 20px auto;
  background: rgba(238, 238, 238, 1);
  border-radius: 1px;
  text-align: center;
  color: rgba(59, 99, 206, 1);
}
.rechargeAddr {
  color: rgba(102, 102, 102, 1);
}
.rechargeAddr img {
  margin-left: 10px;
  cursor: pointer;
}
.rechargeBtn {
  margin: 20px 0;
}
.rechargeBtn button {
  width: 250px;
}
.rechargeTips {
  font-size: 12px;
  width: 250px;
  margin: 0 auto;
}
#rechargeQrcode {
  width: 100px;
  margin: 20px auto;
}
.qrcode {
  width: 180px;
  margin: 0 auto;
}
.paymentTips {
  color: rgba(102, 102, 102, 1);
  font-size: 16px;
  margin: 20px 0;
}
.orderBtn {
  margin-top: 27px;
}
</style>
