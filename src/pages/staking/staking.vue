<template>
  <section class="nodeData">
    <div class="nodeInfo">
      <div class="nodeDataConBg">
        <div class="nodeTop">
          168Node深度参与公链生态建设，成为各公链的超级节点，提供节点基础设施与服务<br />您只需将拥有的票权抵押给验证人
          168Node，即可获取 Staking 收益
        </div>
        <div class="nodeDataCon">
          <div
            v-for="(item, index) in nodeData"
            :key="index"
            class="nodeItemBg"
          >
            <div class="nodeItem">
              <img :src="item.logo" width="47px" />
              <div class="nodeName">{{ item.name }}</div>
              <div class="nodeDigital">
                <div>
                  <div v-show="item.isOnline">预计年化收益率</div>
                  <p>{{ item.annualizedRate }}</p>
                </div>
                <div v-show="item.handlingFee != ''">
                  <div>手续费</div>
                  <p>{{ item.handlingFee }}</p>
                </div>
              </div>
              <div class="nodeMore">
                <router-link
                  :to="'/nodeVote/' + item.id"
                  class="roundBtn rimBtn roundBtnHover"
                  v-show="item.isOnline"
                  >投票</router-link
                >
                <a
                  class="roundBtn rimBtn roundBtnHover"
                  :href="item.voteAddress"
                  v-if="item.voteAddress ? true : false"
                  target="_blank"
                  >投票</a
                >
                <a
                  :href="item.website"
                  class="roundBtn rimBtn roundBtnHover"
                  target="_blank"
                  >了解更多</a
                >
              </div>
            </div>
          </div>
        </div>
      </div>
      <section class="advantage center">
        <div class="blockTitle">代建节点</div>
        <div class="advantageCon">
          <div class="advantageItems">
            <div
              v-for="(item, index) in advantage"
              :key="index"
              class="advantageItem"
            >
              <img :src="item.img" height="100" />
              <p class="advantageTitle">{{ item.title }}</p>
              <p>{{ item.con }}</p>
            </div>
          </div>
        </div>
      </section>
      <section class="project center">
        <div class="blockTitle">支持的项目</div>
        <ul>
          <li v-for="(item, index) in objData" :key="index">
            <img :src="item.img" alt="" />
          </li>
        </ul>
        <div class="seeMore">
          <button type="button" class="bgBtn">立即咨询</button>
          <div class="hoverCode">
            <div>
              <img src="/static/image/officailAccount.jpg" />
              <div class="WeChatQrCodeName">公众号</div>
            </div>
            <div>
              <img src="/static/image/weChatImg.jpg" />
              <div class="WeChatQrCodeName">微信客服</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </section>
</template>

<script>
import nodeInfo from "@/assets/localData/nodeInfo";
export default {
  name: "home",
  data() {
    return {
      nodeData: nodeInfo.nodeData,
      objData: [
        { img: "/static/image/DOT.png" },
        { img: "/static/image/ETH.png" },
        { img: "/static/image/Kusama.png" },
        { img: "/static/image/PCX.png" },
        { img: "/static/image/ring.png" },
      ],
      advantage: [
        {
          img: "/static/image/advantage1.png",
          title: "专业团队",
          con: "团队拥有丰富搭建节点经验",
        },
        {
          img: "/static/image/advantage2.png",
          title: "价格从优",
          con: "价格透明，量大从优",
        },
        {
          img: "/static/image/advantage3.png",
          title: "专人服务",
          con: "7x24小时，一对一服务",
        },
      ],
      nodeDatas: [
        {
          logo: "/static/image/partner01.png",
          symbol: "Alaya",
        },
        {
          logo: "/static/image/KSM.png",
          symbol: "Kusama",
        },
        {
          logo: "/static/image/partner04.png",
          symbol: "Polkadot",
        },
        {
          logo: "/static/image/crust.png",
          symbol: "Crust",
        },
        {
          logo: "/static/image/partner06.png",
          symbol: "Phala",
        },
      ],
    };
  },
};
</script>
<style  scoped>
.nodeDataConBg {
  padding-top: 140px;
  background: url("/static/image/stakingBanner.png") no-repeat center center;
}
.partTitle {
  color: #ffffff;
  font-size: 35px;
  font-weight: bolder;
  text-align: center;
  height: 100px;
  line-height: 100px;
  font-size: 36px;
  position: relative;
}
.supportTitle {
  color: #ffffff;
  font-size: 35px;
  font-weight: bolder;
  text-align: center;
  height: 100px;
  line-height: 100px;
  font-size: 36px;
  position: relative;
}

.advantageItems {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  padding: 57px 0;
}
.advantageItem {
  width: 32%;
  padding: 79px 0;
  box-sizing: border-box;
  border-radius: 5px;
  transition: all 0.3s;
  box-shadow: 0px 2px 16px 0px rgba(0, 0, 0, 0.07);
}

.advantageItem p {
  margin: 0;
}
.advantageItem .advantageTitle {
  font-weight: bold;
  font-size: 22px;
  line-height: 32px;
  margin-top: 28px;
  margin-bottom: 8px;
}
.support {
  padding-top: 35px;
  width: 100%;
}
.supportProject {
  width: 100%;
  background: linear-gradient(to right, #292e38, #1a202b);
  padding: 16px 0;
}
.supportProjectItem {
  width: 700px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
}
.supportProjectName {
  font-size: 18px;
  color: rgba(22, 53, 135, 1);
  margin-top: 20px;
}
.inquiry {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 120px;
}
.inquiry .idcBtn {
  width: 170px;
  font-size: 20px;
}
.inquiry .idcBtn .moreBtn {
  padding: 20px 39px;
}
.idcBtn:hover .moreBtn {
  background: transparent;
}
.idcBtn:hover + .inquiryCode {
  opacity: 1;
}
.inquiryCode {
  margin: 0 auto;
  width: 455px;
  box-sizing: border-box;
  padding: 32px 85px;
  display: flex;
  justify-content: space-between;
  text-align: center;
  color: rgba(245, 245, 245, 0.8);
  background: #20252e;
  margin-bottom: 30px;
  opacity: 0;
  border-radius: 5px;
  transition: all 0.2s;
}
.WeChatQrCodeName {
  font-size: 14px;
  margin-top: 8px;
}
.nodeTop {
  text-align: center;
  font-size: 22px;
  line-height: 2em;
  color: #fff;
}
.nodeDataCon {
  max-width: 1480px;
  /* height: 100%; */
  padding: 40px 0 86px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
}
.nodeItemBg {
  height: 460px;
  width: 288px;
  border-radius: 5px;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
}

.nodeItem {
  width: 100%;
  height: 387px;
  box-sizing: border-box;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 6px 14px rgba(170, 178, 185, 0.4);
  border: 3px solid #168a9e;
  border-color: transparent;
  border-radius: 10px;
  color: #163587;
  /* margin-bottom: 40px; */
  padding-top: 45px;
  text-align: center;
  cursor: pointer;
  transition: all 0.2s;
}

.nodeItem img {
  width: 81px;
}

.nodeName {
  font-size: 20px;
  font-weight: bold;
  color: #1c1c1c;
  margin: 18px 0;
  position: relative;
}
.nodeName::before {
  content: "";
  position: absolute;
  left: 50%;
  bottom: -10px;
  width: 10%;
  height: 2px;
  transform: translateX(-50%);
  background: linear-gradient(to right, #3dd399, #1587ed);
  box-sizing: border-box;
}

.nodeDigital {
  display: flex;
  justify-content: space-around;
  padding: 30px 0;
  color: #a4b3c0;
  font-size: 14 px;
  height: 50px;
}

.nodeItem:hover {
  margin-bottom: 20px;
  border-color: #168a9e;
}

.roundBtnHover:hover {
  background: linear-gradient(to right, #1587ed, #3dd399);

  color: #fff !important;
}

.nodeDigital p {
  margin: 6px;
}

.nodeDigital > div:first-child {
  color: rgba(73, 150, 255, 1);
}

.nodeMore {
  width: 100%;
  display: flex;
  justify-content: space-around;
  box-sizing: border-box;
  padding: 0 20px;
}

.nodeItem .roundBtn {
  width: 88px;
  font-size: 14px;
}
.project {
  max-width: 1200px;
  margin: 0 auto;
}
.project ul {
  display: flex;
  padding: 58px 0;
  justify-content: space-between;
}
.project ul li img {
  display: block;
  width: 78px;
  height: 78px;
}
.bgBtn {
  padding: 18px 35px;
  border-radius: 5px;
}
.seeMore {
  position: relative;
  padding-bottom: 240px;
}

.hoverCode {
  width: 350px;
  display: flex;
  justify-content: space-between;
  box-shadow: 0px 2px 16px 0px rgba(0, 0, 0, 0.07);
  font-size: 16px;
  color: #7b7d89;
  box-sizing: border-box;
  padding: 22px 54px;
  position: absolute;
  top: 80px;
  display: none;
}
.hoverCode img {
  display: block;
  width: 100px;
  height: 100px;
}
.bgBtn:hover + .hoverCode {
  display: flex;
}
@media screen and (max-width: 1480px) {
  .nodeDataCon {
    width: 1200px;
  }
  .nodeItemBg {
    width: 230px;
  }
  .nodeItem .roundBtn {
    width: 65px;
  }
}
</style>
