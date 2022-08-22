<template>
  <div class="bulletinDetails">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item
        ><router-link :to="{ path: '/bulletin' }"
          >资讯&公告</router-link
        ></el-breadcrumb-item
      >
      <el-breadcrumb-item>
        {{ noticeData.title }}
      </el-breadcrumb-item>
    </el-breadcrumb>
    <div class="infoItem">
      <div class="noticeTitle center">
        {{ noticeData.title }}
        <div class="noticeDate">
          发表于{{ noticeData.createDate | datetimeparse("YYYY-MM-dd") }}
        </div>
      </div>
      <div class="noticeCon" v-html="noticeData.content"></div>
      <!-- <div class="noticeUser">
        <p>168Node</p>
        <p class="noticeDate">
          {{ noticeData.createDate | datetimeparse("YYYY-MM-dd") }}
        </p>
      </div> -->
    </div>
  </div>
</template>
<script>
export default {
  name: "bulletinDetails",
  data() {
    return {
      noticeData: "",
    };
  },
  methods: {
    // 公告
    getNotice() {
      // console.log(this.$route.params.id);
      this.$api
        .getNoticeCon({ id: this.$Base64.decode(this.$route.params.id) })
        .then((res) => {
          this.noticeData = res.data[0];
          console.log(res);
        });
    },
  },
  mounted() {
    this.getNotice();
  },
};
</script>
<style scoped>
.bulletinDetails {
  width: 1200px;
  margin: 0 auto;
  padding: 85px 0 60px;
}
.goBullet {
  width: 1000px;
  padding: 30px 80px 87px 80px;
}
.goBullet a {
  color: rgba(189, 189, 189, 1);
}
.infoItem {
  min-height: 500px;
}
.noticeTitle {
  padding-top: 50px;
  font-weight: bold;
  font-size: 26px;
}
.noticeCon {
  padding-top: 34px;
  font-size: 16px;
  color: #7b7d89;
  line-height: 31px;
}
.noticeDate {
  margin-top: 10px;
  color: #999999;
  font-size: 14px;
  font-weight: normal;
}
.noticeUser {
  padding-top: 10px;
  color: #999999;
}
.noticeUser p {
  font-size: 14px;
  text-align: right;
}
</style>

