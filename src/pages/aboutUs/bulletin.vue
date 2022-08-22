<template>
  <div class="bulletin">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item
        ><router-link :to="{ path: '/bulletin' }"
          >资讯&公告</router-link
        ></el-breadcrumb-item
      >
    </el-breadcrumb>
    <ul>
      <li v-for="(item, index) in noticeData" :key="index">
        <div class="noticeLeft">
          <h4
            @click="$router.push('/bulletinDetails/' + $Base64.encode(item.id))"
          >
            {{ item.title }}
          </h4>
          <p class="noticeCon">{{ item.content }}</p>
          <div class="noticeTime">
            发布于：{{ item.createDate | datetimeparse("YYYY-MM-dd") }}
            <span
              @click="
                $router.push('/bulletinDetails/' + $Base64.encode(item.id))
              "
              >详情</span
            >
          </div>
        </div>
        <img v-if="item.imgSrc != ''" :src="item.imgSrc" alt="" />
      </li>
    </ul>
    <div class="noticeSeeMore btns" @click="loadMore" v-if="moreMsg">
      加载更多 <i :class="icon"></i>
    </div>
    <div class="noticeSeeMore" v-else>暂无更多数据</div>
  </div>
</template>
<script>
export default {
  name: "bulletin",
  data() {
    return {
      noticeData: [],
      totalCount: 0,
      page: 1,
      size: 5,
      moreMsg: true,
      icon: "el-icon-d-arrow-right",
    };
  },
  methods: {
    // 公告
    getNoticeData() {
      this.icon = "el-icon-loading";
      var pageNumber = this.page;
      this.$api
        .getNotice({
          page: pageNumber,
          size: this.size,
        })
        .then((res) => {
          console.log(res);
          this.totalCount = res.page.totalCount;
          this.page++;
          for (let i = 0; i < res.data.length; i++) {
            res.data[i].imgSrc = this.getImgSrc(res.data[i].content);
            res.data[i].content = res.data[i].content
              .replace(/<(style|script|iframe)[^>]*?>[\s\S]+?<\/\1\s*>/gi, "")
              .replace(/<[^>]+?>/g, "")
              .replace(/\s+/g, " ")
              .replace(/ /g, " ")
              .replace(/>/g, " ");
            this.noticeData.push(res.data[i]);
          }

          if (this.noticeData.length >= this.totalCount) {
            this.moreMsg = false;
          }
          this.icon = "el-icon-d-arrow-right";
        });
    },
    getImgSrc(html) {
      let imgReg = /<img.*?(?:>|\/>)/gi;
      let srcReg = /src=[\'\"]?([^\'\"]*)[\'\"]?/i;
      let arr = html.match(imgReg); // arr 为包含所有img标签的数组
      arr = arr == null ? [] : arr;
      let src = [];
      for (var i = 0; i < arr.length; i++) {
        src = arr[i].match(srcReg);
      }
      return src.length > 0 ? src[0].slice(5, -1) : "";
    },
    loadMore() {
      if (this.noticeData.length < this.totalCount) {
        console.log(2);
        this.getNoticeData();
      }
    },
  },
  mounted() {
    this.getNoticeData();
  },
};
</script>
<style scoped>
.bulletin {
  max-width: 1200px;
  margin: 0 auto;
  padding-top: 85px;
}
.bulletin ul li {
  margin-top: 50px;
  border-bottom: 1px solid #f2f4f5;
  padding-bottom: 30px;
  display: flex;
  align-items: center;
}
.bulletin ul li .noticeLeft {
  flex-grow: 1;
  padding-right: 60px;
}
.bulletin ul li img {
  display: block;
  width: 230px;
  height: 155px;
  flex-shrink: 0;
}
.bulletin ul li h4 {
  font-size: 18px;
  cursor: pointer;
}
.bulletin ul li .noticeCon {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  overflow: hidden;
  color: #7b7d89;
  line-height: 1.8em;
}
.noticeTime {
  color: #7b7d89;
}
.noticeTime span {
  padding-left: 15px;
  color: #1587ed;
  cursor: pointer;
}
.noticeSeeMore {
  color: #7b7d89;
  width: 120px;
  margin: 50px auto;
  text-align: center;
}
.btns {
  cursor: pointer;
}
</style>

