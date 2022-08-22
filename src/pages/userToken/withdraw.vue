<template>
  <div class="withdraw">
    <div class="goUserToken">
      <router-link to="/assets">
        <i class="el-icon-arrow-left"></i>返回上一级
      </router-link>
    </div>
    <div class="withdrawForm">
      <el-form
        ref="withdrawForm"
        :model="withdrawForm"
        :rules="withdrawRules"
        label-width="100px"
        size="small"
        label-position="top"
        hide-required-asterisk
      >
        <el-form-item label="币种名称" prop="currency">
          <el-select
            v-model="withdrawForm.currency"
            placeholder="请选择币种名称"
            style="width:100%"
            @change="changeCurrency"
          >
            <el-option
              v-for="item in currencyOption"
              :key="item.value"
              v-show="item.isOnline"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="提币地址" prop="address">
          <el-input v-model="withdrawForm.address" placeholder="请输入提币地址"></el-input>
        </el-form-item>
        <el-form-item label="提币数量" prop="quantity">
          <el-input v-model="withdrawForm.quantity" maxlength="10" placeholder="请输入提币数量"></el-input>
          <span>可提币数量：{{available}} {{unitCode}}</span>
          <span class="rechargeWarning" @click="allWithdraw">全部提币</span>
        </el-form-item>
        <el-form-item label="资金密码" prop="fundPassword">
          <el-input
            v-model="withdrawForm.fundPassword"
            maxlength="6"
            placeholder="请输入资金密码"
            show-password
          ></el-input>
        </el-form-item>
        <el-form-item
          label="短信验证"
          prop="verificationCode"
          v-if="$store.state.info.hasMobile && mode =='mobile'"
        >
          <el-input v-model="withdrawForm.verificationCode" maxlength="6" placeholder="请输入验证码">
            <button
              type="button"
              class="normalBtn getCodeBtn"
              slot="suffix"
              id="SMSBtn"
              @click="getWithdrawCode('SMSBtn')"
            >获取验证码</button>
          </el-input>
          <button
            type="button"
            v-show="$store.state.info.hasEmail"
            class="textBtn"
            @click="mode ='email'"
          >切换邮箱验证</button>
        </el-form-item>
        <el-form-item
          label="邮箱验证"
          prop="verificationCode"
          v-if="$store.state.info.hasEmail && mode =='email'"
        >
          <el-input v-model="withdrawForm.verificationCode" maxlength="6" placeholder="请输入验证码">
            <button
              type="button"
              class="normalBtn getCodeBtn"
              slot="suffix"
              id="mailboxBtn"
              @click="getWithdrawCode('mailboxBtn')"
            >获取验证码</button>
          </el-input>
          <button
            type="button"
            class="textBtn"
            v-show="$store.state.info.hasMobile"
            @click="mode ='mobile'"
          >切换短信验证</button>
        </el-form-item>
        <el-form-item label="网络手续费" prop="handlingFee">
          <el-input v-model="handlingFee" disabled>
            <span slot="suffix">{{withdrawConfig.coinCode}}</span>
          </el-input>
        </el-form-item>
        <el-form-item class="center">
          <button type="button" class="roundBtn" @click="withdraw('withdrawForm')">提 &nbsp;现</button>
        </el-form-item>
      </el-form>
    </div>
    <div class="withdrawData">
      <div class="withdrawRecord">提现记录</div>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="createTime" label="提现时间" align="center" width="160"></el-table-column>
        <el-table-column prop="coinCode" label="通证类型" align="center" width="80"></el-table-column>
        <el-table-column prop="withdrawAmount" label="提现数量" align="center" width="80"></el-table-column>
        <el-table-column prop="address" label="地址" align="center"></el-table-column>
        <el-table-column prop="transferId" label="交易ID" align="center"></el-table-column>
        <el-table-column prop="state" label="状态" align="center" width="80">
          <template slot-scope="scope">
            <span
              :class="scope.row.state == 0?'pendingStatus':(scope.row.state == -1?'failureStatus':'successStatus')"
            >{{scope.row.stateName}}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" width="80px">
          <template slot-scope="scope">
            <button
              type="button"
              class="textBtn"
              @click="cancelWithdraw(scope.row.id)"
              v-if="scope.row.state == -1"
            >终止</button>
          </template>
        </el-table-column>
      </el-table>
      <div class="paging" v-show="total>0">
        <el-pagination
          layout="prev, pager, next"
          :page-count="total"
          @current-change="getWithdrawList"
        ></el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import currency from "@/assets/localData/currency";
import validate from "@/utils/validate";
import { codeMsg } from "@/utils/comm.js";
import { mapGetters } from "vuex";
import filter from "@/utils/filter.js";
export default {
  name: "withdraw",
  data() {
    var checkValue = (rule, value, callback) => {
      if (value > this.available) {
        return callback(new Error("提币数量不能大于可提币数量"));
      } else if (value < this.withdrawConfig.minWithdrawNumber) {
        return callback(new Error("提币数量不能小于最小提币数量"));
      } else {
        return callback();
      }
    };
    return {
      withdrawForm: {
        currency: 5,
        address: "",
        quantity: "",
        fundPassword: "",
        verificationCode: "",
        handlingFee: ""
      },
      currencyOption: currency.currency,
      withdrawRules: {
        currency: [
          { required: true, message: "币种名称不能为空", trigger: "blur" }
        ],
        address: [{ required: true, message: "地址不能为空", trigger: "blur" }],
        quantity: [
          { required: true, message: "提币数量不能为空", trigger: "blur" },
          {
            pattern: /^(?!(0[0-9]{0,}$))[0-9]{1,}[.]{0,}[0-9]{0,}$/,
            message: "请输入大于0的数字",
            trigger: "blur"
          },
          { validator: checkValue, trigger: "blur" }
        ],
        fundPassword: [
          { required: true, message: "资金密码不能为空", trigger: "blur" },
          {
            validator: validate.FormValidate.Form().checkCode,
            trigger: "blur"
          }
        ],
        verificationCode: [
          { required: true, message: "验证码不能为空", trigger: "blur" },
          {
            validator: validate.FormValidate.Form().checkCode,
            trigger: "blur"
          }
        ],
        handlingFee: [
          { required: true, message: "网路手续不能为空", trigger: "blur" }
        ]
      },
      page: 1,
      total: 0,
      tableData: [],
      mode: this.$store.state.info.hasMobile ? "mobile" : "email",
      balance: "",
      available: 0,
      unitCode: "",
      withdrawConfig: ""
    };
  },
  methods: {
    // 获取提现验证码
    getWithdrawCode(el) {
      let errCount = 0;
      this.$refs["withdrawForm"].validateField(
        ["currency", "address", "quantity", "fundPassword"],
        error => {
          if (error) {
            return false;
          } else if (!error) {
            errCount++;
            if (errCount == 4) {
              this.$api
                .sendWithdrawCode({
                  sessionId: localStorage.getItem("passport"),
                  type: this.mode,
                  password: this.withdrawForm.fundPassword
                })
                .then(res => {
                  codeMsg(el);
                  this.$message("验证码发送成功");
                })
                .catch(err => {
                  this.$message.error(err.message);
                });
            }
          }
        }
      );
    },
    // 获取传参币种
    getCurrency() {
      if (this.$route.params.currency) {
        this.$set(this.withdrawForm, "currency", this.$route.params.currency);
      }
      this.getAccoutBalance();
    },
    // 通证余额
    getAccoutBalance() {
      this.$api
        .getAccoutBalance({
          sessionId: localStorage.getItem("passport")
        })
        .then(res => {
          this.balance = res.data[0];
          this.changeCurrency();
        });
    },
    // 币种切换
    changeCurrency() {
      this.getWithdrawConfig(this.withdrawForm.currency);
      let index = this.currencyOption.findIndex(
        item => this.withdrawForm.currency == item.value
      );
      this.available = this.balance[
        "available" + this.currencyOption[index].label
      ];
      this.unitCode = this.currencyOption[index].unit;
    },
    // 提现手续费
    getWithdrawConfig(coinType) {
      this.$api
        .getWithdrawConfig({
          sessionId: localStorage.getItem("passport"),
          coinType: coinType
        })
        .then(res => {
          this.withdrawConfig = res.data[0];
          this.$set(this.withdrawForm, "handlingFee", res.data[0].withdrawFee);
        });
    },
    // 全部体现
    allWithdraw() {
      this.$set(this.withdrawForm, "quantity", this.available);
    },
    // 提现
    withdraw(formName) {
      this.$refs[formName].validate(valid => {
        let currency = this.withdrawForm.currency;
        if (valid) {
          this.$api
            .withdraw({
              sessionId: localStorage.getItem("passport"),
              address: this.withdrawForm.address,
              amount: Number(this.withdrawForm.quantity),
              code: this.withdrawForm.verificationCode,
              coinType: this.withdrawForm.currency,
              password: this.withdrawForm.fundPassword
            })
            .then(res => {
              this.$message("提现提交成功");
              this.$refs[formName].resetFields();
              this.$set(
                this.withdrawForm,
                "handlingFee",
                this.withdrawConfig.withdrawFee
              );
              this.$set(this.withdrawForm, "currency", currency);
              this.getWithdrawList();
              this.getAccoutBalance();
            })
            .catch(err => {
              this.$message.error(err.message);
              this.$refs[formName].resetFields();
              this.$set(
                this.withdrawForm,
                "handlingFee",
                this.withdrawConfig.withdrawFee
              );
              this.$set(this.withdrawForm, "currency", currency);
            });
        } else {
          return false;
        }
      });
    },
    // 提现记录
    getWithdrawList(val) {
      this.page = val == undefined ? 1 : val;
      this.$api
        .getWithdrawList({
          sessionId: localStorage.getItem("passport"),
          page: this.page,
          size: 10
        })
        .then(res => {
          this.tableData = res.data;
          this.total = res.page.totalPage;
        });
    },
    // 取消提现
    cancelWithdraw(id) {
      this.$api
        .cancelWithdraw({
          sessionId: localStorage.getItem("passport"),
          id: id
        })
        .then(res => {
          this.$message("终止提现成功");
          this.getWithdrawList();
        })
        .catch(err => {
          this.$message.err(err.message);
        });
    }
  },
  mounted() {
    this.getCurrency();
    this.getWithdrawList();
  },
  computed: {
    handlingFee: function() {
      let reg = /^(?!(0[0-9]{0,}$))[0-9]{1,}[.]{0,}[0-9]{0,}$/;
      if (reg.test(this.withdrawForm.quantity)) {
        return filter.numMulti(
          Number(this.withdrawForm.quantity),
          filter.numMulti(Number(this.withdrawForm.handlingFee), 0.01)
        );
      } else {
        return 0;
      }
    },
    ...mapGetters(["changeInfo"])
  },
  watch: {
    changeInfo(val, old) {
      this.mode = this.$store.state.info.hasMobile ? "mobile" : "email";
    }
  }
};
</script>
<style scoped>
.withdraw {
  padding: 20px;
}
.goUserToken {
  width: 650px;
  margin: 10px auto;
  color: rgba(153, 153, 153, 1);
}
.goUserToken a {
  color: rgba(102, 102, 102, 1);
}
.rechargeWarning {
  color: rgba(73, 150, 255, 1);
  float: right;
  cursor: pointer;
}
.withdrawForm {
  width: 558px;
  margin: 20px auto;
  box-shadow: 0px 0px 10px rgba(73, 150, 255, 0.21);
  border-radius: 4px;
  padding: 20px 85px;
  box-sizing: border-box;
}
.withdrawRecord {
  padding: 10px;
  color: rgba(102, 102, 102, 1);
  border-bottom: 1px solid rgba(213, 213, 213, 1);
}
.withdrawData {
  width: 925px;
  margin: 50px auto;
  box-shadow: 0px 0px 10px rgba(73, 150, 255, 0.21);
  border-radius: 4px;
}
.withdraw .textBtn {
  padding: 0;
}
</style>
