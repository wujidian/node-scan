<template>
  <div>
    <div class="addWithdraw">
      <div class="goUserToken">
        <router-link to="/withdraw">
          <i class="el-icon-arrow-left"></i>返回上一级
        </router-link>
      </div>
      <div class="addWithdrawForm">
        <el-form
          ref="addWithdrawForm"
          :model="addWithdrawForm"
          label-width="100px"
          size="small"
          label-position="top"
          :inline="true"
        >
          <el-form-item label="通证类型">
            <el-select v-model="addWithdrawForm.currency" placeholder="请选择币种名称">
              <el-option
                v-for="item in currencyOption"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="链名称">
            <el-select v-model="addWithdrawForm.chainName" placeholder="请选择提币地址">
              <el-option
                v-for="item in currencyOption"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="通证地址">
            <el-input v-model="addWithdrawForm.address" placeholder="请输入通证地址"></el-input>
          </el-form-item>
          <el-form-item label="备注">
            <el-input v-model="addWithdrawForm.remarks" placeholder="请输入备注"></el-input>
          </el-form-item>
        </el-form>
        <div class="right">
          <button type="button" class="bgBtn">添 &nbsp;加</button>
        </div>
      </div>
    </div>
    <div class="addWithdraw">
      <div class="addWithdrawRecord">地址列表</div>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="type" label="通证类型" align="center"></el-table-column>
        <el-table-column prop="address" label="地址" align="center"></el-table-column>
        <el-table-column prop="remarks" label="备注" align="center"></el-table-column>
        <el-table-column label="操作" align="center">
          <button type="button" class="roundBtn">删除</button>
          <button type="button" class="roundBtn">修改</button>
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
export default {
  name: "addWithdraw",
  data() {
    return {
      addWithdrawForm: {
        currency: "",
        address: "",
        chainName: "",
        remarks: ""
      },
      currencyOption: currency.currency,
      total: 2,
      tableData: [
        {
          type: "USDT",
          address: "0xF4ww58fasdfad544587",
          remarks: "备注"
        },
        {
          type: "USDT",
          address: "0xF4ww58fasdfad544587",
          remarks: "备注"
        },
        {
          type: "USDT",
          address: "0xF4ww58fasdfad544587",
          remarks: "备注"
        },
        {
          type: "USDT",
          address: "0xF4ww58fasdfad544587",
          remarks: "备注"
        }
      ]
    };
  },
  methods: {},
  mounted() {}
};
</script>
<style scoped>
.addWithdraw {
  background: rgba(245, 250, 255, 1);

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
.addWithdrawForm {
  width: 900px;
  margin: 20px auto;
}
.addWithdrawRecord {
  padding: 10px;
  color: rgba(102, 102, 102, 1);
  border-bottom: 1px solid rgba(213, 213, 213, 1);
}
</style>
