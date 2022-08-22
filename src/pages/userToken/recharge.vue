<template>
  <div>
    <div class="recharge">
      <div class="goUserToken">
        <router-link to="/assets">
          <i class="el-icon-arrow-left"></i>返回上一级
        </router-link>
      </div>
      <div>
        <el-row>
          <el-col :span="16">
            <div class="tokenSelect">
              <span>充值</span>
              <el-select
                v-model="currencyValue"
                placeholder="请选择"
                size="mini"
                class="rechargeSlec"
                :popper-append-to-body="false"
                @change="currencyChange"
              >
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  v-show="item.isOnline && item.value != 5"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </div>
            <div class="rechargeWarning">
              <img src="/static/image/icon_waring.png" />
              <span>请勿向上述地址充值任何非本币种资产，否则资产将不可找回</span>
            </div>
          </el-col>
          <el-col :span="8" class="rechargeInfo">
            <div class="rechargeChainTitle" v-if="currencyValue == 4">
              链名称
              <el-tooltip class="item" effect="dark" placement="top-start">
                <div slot="content">
                  USDT(ERC20)是Tether公司基于以太坊ERC20协议发行的，
                  <br />充提币地址是ETH地址(以数字0和小写x开头)，充提币走ETH网络。
                </div>
                <i class="el-icon-question"></i>
              </el-tooltip>
            </div>
            <div class="rechargeChain" v-if="currencyValue == 4">
              <span class="rechargeChainActive">ERC20</span>
            </div>
            <div class="rechargeQrcode">
              <div id="qrcode"></div>
            </div>
            <div class="rechargeAddr">
              <span>{{address}}</span>
              <img
                src="/static/image/icon_copy.png"
                v-if="address"
                v-clipboard:copy="address"
                v-clipboard:success="copySuccess"
              />
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
    <div class="recharge">
      <div class="rechargeRecord">最近充值记录</div>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="createTime" label="充值时间" align="center"></el-table-column>
        <el-table-column prop="typeName" label="通证类型" align="center"></el-table-column>
        <el-table-column prop="transactionId" label="交易id" align="center"></el-table-column>
        <el-table-column prop="amount" label="充值数量" align="center"></el-table-column>
        <el-table-column prop="confirmTimes" label="确认次数" align="center"></el-table-column>
        <el-table-column prop="state" label="状态" align="center">
          <template slot-scope="scope">
            <span
              :class="scope.row.state == 0?'pendingStatus':(scope.row.state == -1?'failureStatus':'successStatus')"
            >{{scope.row.stateName}}</span>
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
import currency from "@/assets/localData/currency";
import QRCode from "qrcodejs2";
export default {
  name: "recharge",
  data() {
    return {
      options: currency.currency,
      currencyValue: 2,
      address: "",
      pageNumber: 1,
      total: 0,
      tableData: []
    };
  },
  methods: {
    copySuccess(e) {
      this.$message("复制成功");
    },
    // 二维码
    getQrcode() {
      document.getElementById("qrcode").innerHTML = "";
      let qrcode = new QRCode("qrcode", {
        width: 130,
        height: 130,
        text: this.address,
        colorDark: "#000",
        colorLight: "#fff"
      });
    },
    // 充值地址
    getAddr() {
      if (this.currencyValue == 2) {
        this.$api
          .getPhalaAccount({
            sessionId: localStorage.getItem("passport")
          })
          .then(res => {
            this.address = res.data[0];
            this.getQrcode();
          });
      } else if (this.currencyValue == 4) {
        this.$api
          .getUSDTaddr({
            sessionId: localStorage.getItem("passport")
          })
          .then(res => {
            this.address = res.data[0];
            this.getQrcode();
          });
      } else if (this.currencyValue == 3) {
        this.$api
          .getcrustaddr({
            sessionId: localStorage.getItem("passport")
          })
          .then(res => {
            this.address = res.data[0];
            this.getQrcode();
          });
      }
    },
    // 获取币种
    getCurrency() {
      if (this.$route.params.currency) {
        this.currencyValue = this.$route.params.currency;
      }
      this.getAddr();
      this.getQrcode();
    },
    // 充值记录
    getRechargeList(val) {
      if (val !== undefined) this.pageNumber = val;
      this.$api
        .getRechargeList({
          sessionId: localStorage.getItem("passport"),
          page: this.pageNumber,
          size: 10
        })
        .then(res => {
          this.tableData = res.data;
          this.total = res.page.totalPage;
        });
    },
    // 币种切换
    currencyChange(val) {
      this.currencyValue = val;
      this.getAddr();
    }
  },
  mounted() {
    this.getCurrency();
    this.getRechargeList();
  }
};
</script>
<style scoped>
.recharge {
  margin-bottom: 10px;
  padding: 20px;
}
.goUserToken {
  padding: 15px 0;
  border-bottom: 1px solid rgba(213, 213, 213, 1);
}
.goUserToken a {
  color: rgba(102, 102, 102, 1);
}
.tokenSelect {
  margin: 10px 0;
  color: rgba(102, 102, 102, 1);
}
.tokenSelect span {
  margin-right: 20px;
}
.rechargeWarning {
  color: rgba(255, 132, 51, 1);
  margin: 160px 0 0 50px;
}
.rechargeInfo {
  color: rgba(102, 102, 102, 1);
}
.rechargeChainTitle {
  margin: 30px 0;
}
.rechargeChain span {
  margin-right: 10px;
  padding: 7px 20px;
  cursor: pointer;
}
.rechargeChainActive {
  background: rgba(238, 238, 238, 1);
}
.rechargeQrcode {
  margin: 30px 0;
}
.rechargeAddr {
  margin-bottom: 100px;
}
.rechargeAddr span {
  font-size: 12px;
  display: inline-block;
  width: 80%;
  margin-right: 10px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
.rechargeAddr img {
  cursor: pointer;
}
.rechargeRecord {
  padding: 10px;
  color: rgba(102, 102, 102, 1);
  border-bottom: 1px solid rgba(213, 213, 213, 1);
}
</style>
<style>
/* select样式 */
.recharge .el-select {
  width: 100px;
}
.recharge .el-select .el-input__inner {
  background: transparent;
}
.recharge .el-select .el-input__inner:focus {
  border: 1px solid rgba(227, 227, 227, 1);
}
.recharge .el-input.is-active .el-input__inner,
.el-input__inner:focus {
  border: 1px solid rgba(227, 227, 227, 1);
}
.recharge .el-select-dropdown__item.selected {
  color: rgba(51, 51, 51, 0.5);
}
</style>
