<template>
  <div class="phoneCity">
    <div class="countryChange">
      <span>+{{country.tel}}</span>
      <i class="el-icon-arrow-right" v-show="!countriesShow"></i>
      <i class="el-icon-arrow-down" v-show="countriesShow"></i>
    </div>
    <div class="countries" v-show="countriesShow">
      <el-scrollbar style="height:100%">
        <div
          v-for="(item,index) of countries"
          :key="index"
          class="countryItem"
          :class="{'countryNow':item.tel == country.tel}"
        >{{item.name}}</div>
      </el-scrollbar>
    </div>
  </div>
</template>

<script>
export default {
  name: "country",
  data() {
    return {
      countries: [],
      countriesShow: false,
      country: ""
    };
  },
  methods: {
    getCountry() {
      this.$api.getCountry().then(res => {
        this.countries = res.messages.data.countries;
        this.countryName = res.messages.data.country;
        this.country = res.messages.data.countries.find(item => {
          return item.tel == "86";
        });
        this.$emit("getCountry", this.country);
      });
    },
    checkCountry(item) {
      this.country = item;
      this.countriesShow = !this.countriesShow;
      this.$emit("getCountry", this.country);
    }
  },
  mounted() {
    this.getCountry();
  }
};
</script>
<style scoped>
.countries {
  width: 100px;
  height: 150px;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
  border-radius: 4px;
  position: absolute;
  top: 40px;
  left: 0;
  z-index: 999;
}
.countryItem {
  padding: 0 3px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.countryItem:hover {
  background: rgb(212, 212, 212);
  cursor: pointer;
}
.countryChange:hover {
  cursor: pointer;
}
.countryNow {
  background: rgba(82, 81, 81, 0.12);
}
</style>
