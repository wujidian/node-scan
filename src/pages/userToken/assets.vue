<template>
  <div class="userToken">
    <div
      class="assetsItem"
      v-for="(item,index) in currencyData"
      :key="index"
      v-show="item.isOnline && item.value !== 6"
    >
      <el-row>
        <el-col :span="8" class="lumpSum">
          <el-row>
            <el-col :span="6">
              <img :src="item.img" width="60px" />
            </el-col>
            <el-col :span="18" class="lumpSumData">
              <span>{{balance['total'+item.label] || 0}}</span>
              <span>总额</span>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="6">可用：{{balance['available'+item.label] || 0}} {{item.unit}}</el-col>
        <el-col :span="5">冻结：{{balance['frozen'+item.label] || 0}} {{item.unit}}</el-col>
        <el-col :span="5" class="right">
          <button
            type="button"
            class="normalBtn"
            @click="linkTo('recharge',item.value)"
            v-show="item.value != 5"
          >充值</button>
          <button type="button" class="normalBtn" @click="linkTo('withdraw',item.value)">提现</button>
        </el-col>
      </el-row>
    </div>
    <!-- 资金密码 -->
    <verified-diglog :show.sync="dialogFundPassword" text="请先设置资金密码" path="/fundPassword" />
    <!-- 实名认证 -->
    <verified-diglog :show.sync="dialogVerification" text="请先进行实名认证" path="/userVerification" />
  </div>
</template>

<script>
import currency from "@/assets/localData/currency";
import verifiedDiglog from "@/components/comm/verifiedDiglog";
export default {
  name: "userToken",
  components: { verifiedDiglog },
  data() {
    return {
      balance: "",
      dialogFundPassword: false,
      dialogVerification: false,
      currencyData: currency.currency
    };
  },
  methods: {
    linkTo(link, currency) {
      if (link == "recharge") {
        this.$router.push({
          name: link,
          params: {
            currency: currency
          }
        });
        return false;
      }
      if (this.$store.state.info.hasChangePayPassword == 1) {
        this.$message.error("提现服务已锁定，请24小时后再来");
      } else if (!this.$store.state.info.hasPayPassword) {
        this.dialogFundPassword = true;
      } else if (this.$store.state.info.isRealNameAuth !== 1) {
        this.dialogVerification = true;
      } else if (
        this.$store.state.info.hasPayPassword &&
        this.$store.state.info.isRealNameAuth == 1
      ) {
        this.$router.push({
          name: link,
          params: {
            currency: currency
          }
        });
      }
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
    }
  },
  mounted() {
    this.getAccoutBalance();
  }
};
</script>
<style scoped>
.userToken {
  padding: 20px;
}
.assetsItem {
  width: 834px;
  height: 83px;
  margin: 20px auto;
  background: #f5f9ff;
  box-shadow: 0px 3px 6px rgba(73, 150, 255, 0.21);
  border-radius: 4px;
  padding: 0 37px;
}
.assetsItem > .el-row > .el-col:not(:first-child) {
  line-height: 83px;
  color: rgba(102, 102, 102, 1);
}
.assetsItem button {
  margin-right: 20px;
}
.lumpSum .el-col {
  height: 83px;
}
.lumpSum img {
  margin-top: 10px;
}
.lumpSumData {
  display: flex;
  flex-direction: column;
  align-items: left;
  justify-content: center;
  font-size: 22px;
}
.lumpSumData span:last-child {
  display: block;
  font-size: 16px;
  font-weight: bold;
  color: rgba(255, 153, 0, 1);
}
</style>

