<template>
  <section class="contract">
    <div v-html="contractDetails.purchaseAgreement"></div>
  </section>
</template>

<script>
export default {
  name: "hashPowerDetails",
  data() {
    return {
      contractDetails: ""
    };
  },
  methods: {
    // 合约包
    getContractDetails() {
      this.$api
        .getContractDetails({ id: this.$Base64.decode(this.$route.params.id) })
        .then(res => {
          this.contractDetails = res.data[0];
        });
    }
  },
  mounted() {
    this.getContractDetails();
  }
};
</script>
<style  scoped>
.contract {
  padding: 20px;
}
</style>
