<template>
  <div class="homeInfo">
    <section>
      <el-carousel :height="bannerHeight" class="banner">
        <el-carousel-item v-for="(item, index) in bannerData" :key="index">
          <img
            :src="item.imageUrl"
            height="100%"
            width="100%"
            @click="linkTo(item.linkUrl)"
          />
        </el-carousel-item>
      </el-carousel>
    </section>
    <section class="partner">
      <div class="blockTitle partnerBg">节点生态</div>
      <div class="partnerMask">
        <div class="swiperMask">
          <div
            class="swiper-button-prev"
            slot="button-prev"
            @click="prev"
          ></div>
          <swiper class="swiper swiper1" ref="mySwiper" :options="swiperOption">
            <swiper-slide
              class="swiper1Item"
              v-for="(item, index) in partnerData"
              :key="index"
            >
              <img :src="item.image" alt />
              <div>{{ item.title }}</div>
            </swiper-slide>
            <div class="swiper-pagination" slot="pagination"></div>
          </swiper>
          <div
            class="swiper-button-next"
            slot="button-next"
            @click="next"
          ></div>
        </div>
      </div>
    </section>
    <!-- 公告 -->
    <!-- <section class="bulletin" v-show="noticeData.length !== 0">
      <div>
        <img src="/static/image/icon_bulletin.png" />
        <div class="bulletinCon">
          <div
            class="bulletinItem"
            v-for="(item, index) in noticeData"
            v-if="noticeData[0]"
            :key="index"
            @click="
              $router.push({
                path: '/bulletinDetails/' + $Base64.encode(item.id),
              })
            "
          >
            <span>{{ item.title }}</span>
            <span>{{ item.createDate | datetimeparse("YYYY-MM-dd") }}</span>
          </div>
        </div>
        <router-link to="/bulletin" class="more1">查看更多></router-link>
      </div>
    </section> -->
    <section class="mining">
      <div class="blockTitle">分布式存储与计算解决方案</div>
      <div class="produs">
        <div class="produsleftimg">
          <img class="produsImg" src="/static/image/produs01.png" alt="" />
          <div class="produsTitle">数据中心投资与建设</div>
          <img class="produsMask" src="/static/image/produsMask01.png" />
        </div>
        <div>
          <div>
            <img class="produsImg" src="/static/image/produs02.png" alt="" />
            <div class="produsTitle">服务器研发和销售</div>
            <img class="produsMask" src="/static/image/produsMask02.png" />
          </div>
          <div>
            <img class="produsImg" src="/static/image/produs03.png" alt="" />
            <div class="produsTitle">服务器智能化管理</div>
            <img class="produsMask" src="/static/image/produsMask03.png" />
          </div>
          <div>
            <img class="produsImg" src="/static/image/produs04.png" alt="" />
            <div class="produsTitle">区块链节点建设与运维</div>
            <img class="produsMask" src="/static/image/produsMask03.png" />
          </div>
          <div>
            <img class="produsImg" src="/static/image/produs05.png" alt="" />
            <div class="produsTitle">分布式软件开发和应用</div>
            <img class="produsMask" src="/static/image/produsMask03.png" />
          </div>
          <div>
            <img class="produsImg" src="/static/image/produs06.png" alt="" />
            <div class="produsTitle">智能数据和内容生态</div>
            <img class="produsMask" src="/static/image/produsMask03.png" />
          </div>
        </div>
      </div>
    </section>
    <section class="ChooseUs">
      <div class="blockTitle">为什么选择我们</div>
      <el-row class="ChooseUs_list" type="flex" justify="space-between">
        <el-col
          :md="{ span: 11, offset: 0 }"
          :sm="{ span: 20, offset: 2 }"
          :xs="{ span: 20, offset: 2 }"
        >
          <div class="ChooseUs_item">
            <img src="/static/image/ChooseUs01.png" alt="" />
            <div>
              <div class="title">顶尖团队</div>
              <p>
                由高级架构师、技术专家、系统工程师等组成，具备多年存储、计算、备份、系统部署等专业领域的咨询、部署、维护等服务经验，为国内众多企业提供高品质的服务。
              </p>
            </div>
          </div></el-col
        >
        <el-col
          :md="{ span: 11, offset: 0 }"
          :sm="{ span: 20, offset: 2 }"
          :xs="{ span: 20, offset: 2 }"
        >
          <div class="ChooseUs_item">
            <img src="/static/image/ChooseUs02.png" alt="" />
            <div>
              <div class="title">一站式服务</div>
              <p>
                从底层硬件的创建到上层业务系统的搭建，整合合作伙伴力量，提供全面专业的分布式存储和计算一站式服务。
              </p>
            </div>
          </div></el-col
        >
        <el-col
          :md="{ span: 11, offset: 0 }"
          :sm="{ span: 20, offset: 2 }"
          :xs="{ span: 20, offset: 2 }"
        >
          <div class="ChooseUs_item">
            <img src="/static/image/ChooseUs03.png" alt="" />
            <div>
              <div class="title">专业能力</div>
              <p>
                融合开源、自研、合作伙伴的高深技术，打造高性能高吞吐、灵活拓展的区块链网络和多种解决方案。
              </p>
            </div>
          </div></el-col
        >
        <el-col
          :md="{ span: 11, offset: 0 }"
          :sm="{ span: 20, offset: 2 }"
          :xs="{ span: 20, offset: 2 }"
        >
          <div class="ChooseUs_item">
            <img src="/static/image/ChooseUs04.png" alt="" />
            <div>
              <div class="title">标准化交付</div>
              <p>
                项目管理交付采用标准化管理体系，科学交付方法论，专业强大的交付及运营团队，保证客户业务健壮性。
              </p>
            </div>
          </div></el-col
        >
      </el-row>
    </section>
    <section class="notice">
      <div class="blockTitle">资讯&公告</div>
      <el-row>
        <el-col :sm="{ span: 16, offset: 4 }" :xs="{ span: 20, offset: 2 }">
          <ul class="noticeTable">
            <li v-for="(item, index) in noticeData" :key="index">
              <div
                @click="
                  $router.push('/bulletinDetails/' + $Base64.encode(item.id))
                "
              >
                {{ item.title }}
              </div>
              <span>{{ item.createDate | datetimeparse("YYYY-MM-dd") }}</span>
            </li>
          </ul>
        </el-col>
      </el-row>
      <div class="seeMore">
        <button type="button" class="bgBtn" @click="$router.push('/bulletin')">
          查看更多 <i class="el-icon-d-arrow-right"></i>
        </button>
      </div>
    </section>
  </div>
</template>

<script>
import nodeInfo from "@/assets/localData/nodeInfo";
import contractComponents from "@/components/comm/contractComponents";
import currencyData from "@/assets/localData/currency";

export default {
  name: "home",
  components: { contractComponents },
  data() {
    return {
      bannerHeight: "628px",
      noticeData: [],
      contractData: [],
      nodeData: nodeInfo.nodeData.slice(0, 5),
      bannerData: [],
      partnerData: [
        {
          image: "/static/image/partner01.png",
          title: "Alaya",
        },
        {
          image: "/static/image/partner02.png",
          title: "Dfinity",
        },
        {
          image: "/static/image/partner03.png",
          title: "Kusama",
        },
        {
          image: "/static/image/partner04.png",
          title: "Polkadot",
        },
        {
          image: "/static/image/partner05.png",
          title: "Crust",
        },
        {
          image: "/static/image/partner06.png",
          title: "Phala",
        },
        {
          image: "/static/image/partner07.png",
          title: "RING",
        },
        {
          image: "/static/image/partner08.png",
          title: "Swarm",
        },
      ],
      swiperOption: {
        slidesPerView: 6,
        spaceBetween: 30,
        loop: true,
        loopFillGroupWithBlank: true,
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
        },
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
      },
    };
  },
  methods: {
    // banner
    getBanner() {
      if (!localStorage.getItem("banner")) {
        this.$api.getBanner().then((res) => {
          this.bannerData = res.data;
          // console.log(res);
          localStorage.setItem("banner", JSON.stringify(res.data));
        });
      } else {
        this.bannerData = JSON.parse(localStorage.getItem("banner"));
      }
    },
    // 公告
    getNotice() {
      this.$api.getNotice({ page: 1, size: 6 }).then((res) => {
        this.noticeData = res.data;
      });
    },
    // 跳转
    linkTo(linkUrl) {
      if (linkUrl) {
        window.open(linkUrl, "_blank");
      }
    },
    // 合约包
    getContractList() {
      this.$api.getContractList({ isRecommend: 1 }).then((res) => {
        let result = res.data;
        result.map((item) => {
          let index = currencyData.currency.findIndex(
            (a) => a.value == item.projectType
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
    },
    //滑动
    move(e) {
      let odiv = e.currentTarget; //获取目标元素
      //算出鼠标相对元素的位置
      let disX = e.clientX - odiv.offsetLeft;
      document.onmousemove = (e) => {
        //鼠标按下并移动的事件
        //用鼠标的位置减去鼠标相对元素的位置，得到元素的位置
        let left = e.clientX - disX;

        //移动当前元素
        odiv.style.left = left + "px";
      };
      document.onmouseup = (e) => {
        odiv.className = "partnerCon amit";
        odiv.style.left = 0 + "px";
        document.onmousemove = null;
        document.onmouseup = null;
        setTimeout(() => {
          odiv.className = "partnerCon";
        }, 300);
      };
    },
    prev() {
      this.$refs.mySwiper.$swiper.slidePrev();
    },
    next() {
      this.$refs.mySwiper.$swiper.slideNext();
    },
  },
  mounted() {
    this.getNotice();
    this.getBanner();

    // this.getContractList();
  },
  created() {
    let windowSize = document.body.clientWidth;
    if (windowSize < 1920 && windowSize > 992) {
      this.bannerHeight = "600px";
    } else if (windowSize > 768 && windowSize <= 992) {
      this.swiperOption.slidesPerView = 5;
      this.bannerHeight = "550px";
      console.log(this.swiperOption.slidesPerView);
    } else if (windowSize <= 768) {
      this.swiperOption.slidesPerView = 4;
      this.bannerHeight = "400px";
    }
  },
};
</script>
<style  scoped>
.partner {
  padding-bottom: 50px;
}
.partnerMask {
  width: 100%;
  height: 200px;
  position: relative;
}
.partnerMask /deep/ .el-carousel__mask {
  background-color: transparent;
}
.swiper1 {
  max-width: 1200px;
  height: 100%;
  cursor: pointer;
}
.swiper1Item {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.swiper1Item > div {
  margin-top: 20px;
  color: #7b7d89;
}
.swiperMask {
  max-width: 1200px;
  height: 100%;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
}
.swiperMask .swiper-button-prev,
.swiper-button-next {
  position: static;
  color: #aaaaaa;
}
.more1 {
  color: rgba(112, 116, 255, 1);
  border: none;
  outline: none;
  background: transparent;
  cursor: pointer;
}

/* .nodeInfo {
  padding: 30px 0;
  background: linear-gradient(
    to bottom,
    transparent 0%, 
    transparent 60%,
    rgba(245, 249, 255, 1) 61%,
    rgba(245, 249, 255, 1) 100%
  );
} */
.nodeData {
  width: 1200px;
  margin: 0 auto;
}
.bgBtn {
  padding: 18px 35px;
  border-radius: 5px;
}
</style>
