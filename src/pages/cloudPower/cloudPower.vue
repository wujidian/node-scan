<template>
  <section class="product">
    <div class="noData" v-if="Object.keys(contractData).length ==0">
      <img src="/static/image/noData.png" />
      <p>暂无数据</p>
    </div>
    <div class="productCon" v-else>
      <contract-components
        v-for="(item,index) in contractData"
        :key="item+index"
        :contractData="item"
        :isRealBuy="false"
      />
    </div>
  </section>
</template>

<script>
import contractComponents from "@/components/comm/contractComponents";
import currencyData from "@/assets/localData/currency";
export default {
  name: "cloudPower",
  components: { contractComponents },
  data() {
    return {
      contractData: {},
      dialogFundPassword: false,
      dialogVerification: false
    };
  },
  methods: {
    // 合约包
    getContractList() {
      this.$api
        .getContractList({
          sessionId: localStorage.getItem("passport"),
          isRecommend: 0
        })
        .then(res => {
          let result = res.data;
          result.map(item => {
            let index = currencyData.currency.findIndex(
              a => a.value == item.projectType
            );
            item.powerUnit = currencyData.currency[index].powerUnit;
            item.number = 1;
            item.maxByNumber =
              item.restComputingPower == null
                ? 1
                : Math.floor(item.restComputingPower / item.unitComputingPower);
          });
          this.contractData = result;
        });
    }
  },
  mounted() {
    this.getContractList();
  }
};
</script>
<style  scoped>
.product {
  padding: 46px 0 0 0;
  background: url("/static/image/bg5.png") no-repeat;
  background-position: left bottom;
}
.productCon {
  width: 1200px;
  margin: 0 auto;
}
</style>
