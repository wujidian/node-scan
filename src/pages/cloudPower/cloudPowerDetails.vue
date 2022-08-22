<template>
  <section class="productDetails">
    <section class="productCon">
      <contract-components :contractData="contractDetails" :isRealBuy="true" />
    </section>
    <section class="productCon">
      <div class="productTitle">项目简介</div>
      <div v-if="contractDetails.project">{{contractDetails.project.introduction}}</div>
      <div class="right">
        <a
          v-if="contractDetails.project"
          :href="contractDetails.project.linkUrl"
          class="textBtn"
          target="_blank"
        >了解更多 》</a>
      </div>
    </section>
    <section class="productCon">
      <div class="productTitle">产品详情</div>
      <div v-html="contractDetails.productDetail"></div>
    </section>
  </section>
</template>

<script>
import contractComponents from "@/components/comm/contractComponents";
import currencyData from "@/assets/localData/currency";
export default {
  name: "cloudPowerDetails",
  components: { contractComponents },
  data() {
    return {
      contractDetails: {}
    };
  },
  methods: {
    // 合约包
    getContractDetails() {
      this.$api
        .getContractDetails({ id: this.$Base64.decode(this.$route.params.id) })
        .then(res => {
          let contractData = res.data[0];
          let index = currencyData.currency.findIndex(
            a => a.value == contractData.project.type
          );
          contractData.powerUnit = currencyData.currency[index].powerUnit;
          contractData.number = 1;
          contractData.maxByNumber =
            res.data[0].restComputingPower == null
              ? 1
              : Math.floor(
                  res.data[0].restComputingPower /
                    res.data[0].unitComputingPower
                );
          contractData.imgUrl = res.data[0].project.imgUrl;
          this.contractDetails = contractData;
        });
    }
  },
  mounted() {
    this.getContractDetails();
  }
};
</script>
<style  scoped>
.productDetails {
  background: url("/static/image/bg7.png") no-repeat,
    url("/static/image/bg7.png") no-repeat;
  background-size: 70%, 70%;
  background-position: left -400px top -400px, right -400px bottom -400px;
  overflow: hidden;
}
.productCon {
  width: 1200px;
  margin: 90px auto;
}
.productTitle {
  width: 129px;
  height: 37px;
  line-height: 37px;
  text-align: center;
  background: linear-gradient(
    137deg,
    rgba(145, 202, 255, 0.74) 0%,
    #589afd 100%
  );
  box-shadow: 0px 5px 25px rgba(88, 154, 253, 0.3);
  border-radius: 3px;
  color: rgba(255, 255, 255, 1);
  margin-bottom: 20px;
}
</style>
