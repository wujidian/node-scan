webpackJsonp([6],{b8bl:function(t,s){},"vf/Q":function(t,s){},vkyI:function(t,s,a){"use strict";Object.defineProperty(s,"__esModule",{value:!0});var i=a("mvHQ"),e=a.n(i),n=a("Dp46"),o={name:"verifiedDiglog",props:{show:{type:Boolean,default:!1},text:{type:String,default:""},path:{type:String,default:""}},data:function(){return{visible:this.show}},watch:{show:function(){this.visible=this.show}}},r={render:function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("div",[a("el-dialog",{staticClass:"dialogTitle",attrs:{visible:t.visible,width:"400px","close-on-click-modal":!1},on:{"update:visible":function(s){t.visible=s},close:function(s){return t.$emit("update:show",!1)}}},[a("div",{staticClass:"header-title",attrs:{slot:"title"},slot:"title"},[a("span",{staticClass:"title-age"},[t._v("提示")])]),t._v(" "),a("span",[t._v(t._s(t.text))]),t._v(" "),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("button",{staticClass:"roundBtn rimBtn",attrs:{type:"button"},on:{click:function(s){t.visible=!1}}},[t._v("取 消")]),t._v(" "),a("button",{staticClass:"roundBtn",attrs:{type:"button"},on:{click:function(s){t.visible=!1,t.$router.push(t.path)}}},[t._v("确 定")])])])],1)},staticRenderFns:[]},c={name:"contractComponents",components:{verifiedDiglog:a("VU/8")(o,r,!1,null,null,null).exports},props:{contractData:{type:Object},isRealBuy:{type:Boolean,default:!1}},data:function(){return{contractObj:JSON.parse(e()(this.contractData)),dialogFundPassword:!1,dialogVerification:!1,checked:!1,unpaid:"",dialogUnpaid:!1}},watch:{contractData:function(){this.contractObj=JSON.parse(e()(this.contractData))}},methods:{goHashPowerDetails:function(t){var s=this;this.$store.state.info?this.$store.state.info.hasPayPassword?1!==this.$store.state.info.isRealNameAuth?this.dialogVerification=!0:this.isRealBuy?this.checked?this.$api.getOrderList({sessionId:localStorage.getItem("passport"),state:0,page:1,size:1}).then(function(t){0==t.data.length?s.$api.addOrder({sessionId:localStorage.getItem("passport"),buyNumber:s.contractObj.number,contractId:s.contractObj.id}).then(function(t){s.$router.push({path:"/payment/"+s.$Base64.encode(t.data[0])})}).catch(function(t){s.$message.error(t.message)}):(s.unpaid=t.data[0].uuid,s.dialogUnpaid=!0)}):this.$message.error("请勾选矿机租赁/购买协议"):this.$router.push({path:"/cloudPowerDetails/"+this.$Base64.encode(t)}):this.dialogFundPassword=!0:this.$message.error("未登录，请先登录！")}}},l={render:function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("div",{staticClass:"productItem"},[a("div",{directives:[{name:"show",rawName:"v-show",value:t.contractObj.isSoldOut,expression:"contractObj.isSoldOut"}],staticClass:"soldout"},[a("img",{attrs:{src:"/static/image/soldout.png"}})]),t._v(" "),a("div",{staticClass:"productIcon"},[a("img",{attrs:{src:t.contractObj.imgUrl,height:"40px"}}),t._v(" "),a("span",[t._v(t._s(t.contractObj.projectName))])]),t._v(" "),a("el-row",{staticClass:"productData"},[a("el-col",{attrs:{span:12}},[a("el-row",{staticClass:"productPadding"},[a("el-col",{attrs:{span:12}},[a("div",{staticClass:"productCaption"},[t._v("租赁周期")]),t._v(" "),a("div",{staticClass:"productCaptionCon successStatus"},[t._v(t._s(t.contractObj.rentCycle)+"天")])]),t._v(" "),a("el-col",{attrs:{span:12}},[a("div",{staticClass:"productCaption"},[t._v("结算周期")]),t._v(" "),a("div",{staticClass:"productCaptionCon"},[t._v(t._s(t.contractObj.settlementCycle))])])],1),t._v(" "),a("el-row",{staticClass:"productPadding"},[a("el-col",{attrs:{span:12}},[a("div",{staticClass:"productCaption"},[t._v("算力")]),t._v(" "),a("div",{staticClass:"productCaptionCon pendingStatus"},[t._v(t._s(t.contractObj.unitComputingPower)+t._s(t.contractObj.powerUnit))])]),t._v(" "),a("el-col",{directives:[{name:"show",rawName:"v-show",value:0!==t.contractObj.servicePrice,expression:"contractObj.servicePrice !== 0"}],attrs:{span:12}},[a("div",{staticClass:"productCaption"},[t._v("\n            技术服务费\n            "),a("el-tooltip",{staticClass:"contractData",attrs:{effect:"dark",content:"包含矿机维护费用，机房运维费用",placement:"top-start"}},[a("i",{staticClass:"el-icon-question"})])],1),t._v(" "),a("div",{staticClass:"productCaptionCon pendingStatus"},[t._v(t._s(t.contractObj.servicePrice)+"%")])])],1)],1),t._v(" "),a("el-col",{staticClass:"productPadding",attrs:{span:12}},[a("div",{staticClass:"productName"},[t._v(t._s(t.contractObj.name))]),t._v(" "),a("div",[t.isRealBuy?t._e():a("button",{staticClass:"normalBtn rimBtn viewContract",attrs:{type:"button",disabled:0!==t.contractObj.isSoldOut},on:{click:function(s){return t.goHashPowerDetails(t.contractObj.id)}}},[t._v("查看合约")]),t._v(" "),a("div",{staticClass:"costTips"},[t._v("电费托管费已包含")])]),t._v(" "),a("el-row",{staticClass:"productAmountItem"},[a("el-col",{attrs:{span:6}},[t._v("金额：")]),t._v(" "),a("el-col",{attrs:{span:18}},[a("div",{staticClass:"right"},[t._v(t._s(t._f("numMulti")(t.contractObj.priceUsdt,t.contractObj.number))+" USDT")]),t._v(" "),a("div",{staticClass:"right productAmountCny"},[t._v("= ¥ "+t._s(t._f("numMulti")(t.contractObj.priceCny,t.contractObj.number)))])])],1),t._v(" "),a("div",{staticClass:"productNumber"},[a("el-input-number",{attrs:{min:1,step:1,"step-strictly":!0,max:t.contractObj.maxByNumber,size:"medium",disabled:0!==t.contractObj.isSoldOut},model:{value:t.contractObj.number,callback:function(s){t.$set(t.contractObj,"number",s)},expression:"contractObj.number"}})],1),t._v(" "),t.isRealBuy?a("div",{staticClass:"protocol"},[a("el-checkbox",{model:{value:t.checked,callback:function(s){t.checked=s},expression:"checked"}},[t._v("\n          我已阅读并同意\n          "),a("router-link",{attrs:{to:"/protocol/"+t.$Base64.encode(t.contractObj.id),target:"_blank"}},[t._v("矿机租赁/购买协议")])],1)],1):t._e(),t._v(" "),a("div",[a("button",{staticClass:"normalBtn",attrs:{type:"button",disabled:1==t.contractObj.isSoldOut},on:{click:function(s){return t.goHashPowerDetails(t.contractObj.id)}}},[t._v("立即抢购")])])],1)],1),t._v(" "),a("verified-diglog",{attrs:{show:t.dialogVerification,text:"请先进行实名认证",path:"/userVerification"},on:{"update:show":function(s){t.dialogVerification=s}}}),t._v(" "),a("verified-diglog",{attrs:{show:t.dialogFundPassword,text:"请先设置资金密码",path:"/fundPassword"},on:{"update:show":function(s){t.dialogFundPassword=s}}}),t._v(" "),a("verified-diglog",{attrs:{show:t.dialogUnpaid,text:"请先完成待支付订单！",path:"/payment/"+t.$Base64.encode(t.unpaid)},on:{"update:show":function(s){t.dialogUnpaid=s}}})],1)},staticRenderFns:[]};var p=a("VU/8")(c,l,!1,function(t){a("vf/Q")},"data-v-22ae4c8a",null).exports,d=a("OO1E"),u={name:"home",components:{contractComponents:p},data:function(){return{bannerHeight:"628px",noticeData:[],contractData:[],nodeData:n.a.nodeData.slice(0,5),bannerData:[],partnerData:[{image:"/static/image/partner01.png",title:"Alaya"},{image:"/static/image/partner02.png",title:"Dfinity"},{image:"/static/image/partner03.png",title:"Kusama"},{image:"/static/image/partner04.png",title:"Polkadot"},{image:"/static/image/partner05.png",title:"Crust"},{image:"/static/image/partner06.png",title:"Phala"},{image:"/static/image/partner07.png",title:"RING"},{image:"/static/image/partner08.png",title:"Swarm"}],swiperOption:{slidesPerView:6,spaceBetween:30,loop:!0,loopFillGroupWithBlank:!0,pagination:{el:".swiper-pagination",clickable:!0},navigation:{nextEl:".swiper-button-next",prevEl:".swiper-button-prev"}}}},methods:{getBanner:function(){var t=this;localStorage.getItem("banner")?this.bannerData=JSON.parse(localStorage.getItem("banner")):this.$api.getBanner().then(function(s){t.bannerData=s.data,localStorage.setItem("banner",e()(s.data))})},getNotice:function(){var t=this;this.$api.getNotice({page:1,size:6}).then(function(s){t.noticeData=s.data})},linkTo:function(t){t&&window.open(t,"_blank")},getContractList:function(){var t=this;this.$api.getContractList({isRecommend:1}).then(function(s){var a=s.data;a.map(function(t){var s=d.a.currency.findIndex(function(s){return s.value==t.projectType});t.powerUnit=d.a.currency[s].powerUnit,t.number=1,t.maxByNumber=null==t.restComputingPower?1:Math.floor(t.restComputingPower/t.unitComputingPower)}),t.contractData=a})},move:function(t){var s=t.currentTarget,a=t.clientX-s.offsetLeft;document.onmousemove=function(t){var i=t.clientX-a;s.style.left=i+"px"},document.onmouseup=function(t){s.className="partnerCon amit",s.style.left="0px",document.onmousemove=null,document.onmouseup=null,setTimeout(function(){s.className="partnerCon"},300)}},prev:function(){this.$refs.mySwiper.$swiper.slidePrev()},next:function(){this.$refs.mySwiper.$swiper.slideNext()}},mounted:function(){this.getNotice(),this.getBanner()},created:function(){var t=document.body.clientWidth;t<1920&&t>992?this.bannerHeight="600px":t>768&&t<=992?(this.swiperOption.slidesPerView=5,this.bannerHeight="550px",console.log(this.swiperOption.slidesPerView)):t<=768&&(this.swiperOption.slidesPerView=4,this.bannerHeight="400px")}},v={render:function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("div",{staticClass:"homeInfo"},[a("section",[a("el-carousel",{staticClass:"banner",attrs:{height:t.bannerHeight}},t._l(t.bannerData,function(s,i){return a("el-carousel-item",{key:i},[a("img",{attrs:{src:s.imageUrl,height:"100%",width:"100%"},on:{click:function(a){return t.linkTo(s.linkUrl)}}})])}),1)],1),t._v(" "),a("section",{staticClass:"partner"},[a("div",{staticClass:"blockTitle partnerBg"},[t._v("节点生态")]),t._v(" "),a("div",{staticClass:"partnerMask"},[a("div",{staticClass:"swiperMask"},[a("div",{staticClass:"swiper-button-prev",attrs:{slot:"button-prev"},on:{click:t.prev},slot:"button-prev"}),t._v(" "),a("swiper",{ref:"mySwiper",staticClass:"swiper swiper1",attrs:{options:t.swiperOption}},[t._l(t.partnerData,function(s,i){return a("swiper-slide",{key:i,staticClass:"swiper1Item"},[a("img",{attrs:{src:s.image,alt:""}}),t._v(" "),a("div",[t._v(t._s(s.title))])])}),t._v(" "),a("div",{staticClass:"swiper-pagination",attrs:{slot:"pagination"},slot:"pagination"})],2),t._v(" "),a("div",{staticClass:"swiper-button-next",attrs:{slot:"button-next"},on:{click:t.next},slot:"button-next"})],1)])]),t._v(" "),t._m(0),t._v(" "),a("section",{staticClass:"ChooseUs"},[a("div",{staticClass:"blockTitle"},[t._v("为什么选择我们")]),t._v(" "),a("el-row",{staticClass:"ChooseUs_list",attrs:{type:"flex",justify:"space-between"}},[a("el-col",{attrs:{md:{span:11,offset:0},sm:{span:20,offset:2},xs:{span:20,offset:2}}},[a("div",{staticClass:"ChooseUs_item"},[a("img",{attrs:{src:"/static/image/ChooseUs01.png",alt:""}}),t._v(" "),a("div",[a("div",{staticClass:"title"},[t._v("顶尖团队")]),t._v(" "),a("p",[t._v("\n              由高级架构师、技术专家、系统工程师等组成，具备多年存储、计算、备份、系统部署等专业领域的咨询、部署、维护等服务经验，为国内众多企业提供高品质的服务。\n            ")])])])]),t._v(" "),a("el-col",{attrs:{md:{span:11,offset:0},sm:{span:20,offset:2},xs:{span:20,offset:2}}},[a("div",{staticClass:"ChooseUs_item"},[a("img",{attrs:{src:"/static/image/ChooseUs02.png",alt:""}}),t._v(" "),a("div",[a("div",{staticClass:"title"},[t._v("一站式服务")]),t._v(" "),a("p",[t._v("\n              从底层硬件的创建到上层业务系统的搭建，整合合作伙伴力量，提供全面专业的分布式存储和计算一站式服务。\n            ")])])])]),t._v(" "),a("el-col",{attrs:{md:{span:11,offset:0},sm:{span:20,offset:2},xs:{span:20,offset:2}}},[a("div",{staticClass:"ChooseUs_item"},[a("img",{attrs:{src:"/static/image/ChooseUs03.png",alt:""}}),t._v(" "),a("div",[a("div",{staticClass:"title"},[t._v("专业能力")]),t._v(" "),a("p",[t._v("\n              融合开源、自研、合作伙伴的高深技术，打造高性能高吞吐、灵活拓展的区块链网络和多种解决方案。\n            ")])])])]),t._v(" "),a("el-col",{attrs:{md:{span:11,offset:0},sm:{span:20,offset:2},xs:{span:20,offset:2}}},[a("div",{staticClass:"ChooseUs_item"},[a("img",{attrs:{src:"/static/image/ChooseUs04.png",alt:""}}),t._v(" "),a("div",[a("div",{staticClass:"title"},[t._v("标准化交付")]),t._v(" "),a("p",[t._v("\n              项目管理交付采用标准化管理体系，科学交付方法论，专业强大的交付及运营团队，保证客户业务健壮性。\n            ")])])])])],1)],1),t._v(" "),a("section",{staticClass:"notice"},[a("div",{staticClass:"blockTitle"},[t._v("资讯&公告")]),t._v(" "),a("el-row",[a("el-col",{attrs:{sm:{span:16,offset:4},xs:{span:20,offset:2}}},[a("ul",{staticClass:"noticeTable"},t._l(t.noticeData,function(s,i){return a("li",{key:i},[a("div",{on:{click:function(a){t.$router.push("/bulletinDetails/"+t.$Base64.encode(s.id))}}},[t._v("\n              "+t._s(s.title)+"\n            ")]),t._v(" "),a("span",[t._v(t._s(t._f("datetimeparse")(s.createDate,"YYYY-MM-dd")))])])}),0)])],1),t._v(" "),a("div",{staticClass:"seeMore"},[a("button",{staticClass:"bgBtn",attrs:{type:"button"},on:{click:function(s){return t.$router.push("/bulletin")}}},[t._v("\n        查看更多 "),a("i",{staticClass:"el-icon-d-arrow-right"})])])],1)])},staticRenderFns:[function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("section",{staticClass:"mining"},[a("div",{staticClass:"blockTitle"},[t._v("分布式存储与计算解决方案")]),t._v(" "),a("div",{staticClass:"produs"},[a("div",{staticClass:"produsleftimg"},[a("img",{staticClass:"produsImg",attrs:{src:"/static/image/produs01.png",alt:""}}),t._v(" "),a("div",{staticClass:"produsTitle"},[t._v("数据中心投资与建设")]),t._v(" "),a("img",{staticClass:"produsMask",attrs:{src:"/static/image/produsMask01.png"}})]),t._v(" "),a("div",[a("div",[a("img",{staticClass:"produsImg",attrs:{src:"/static/image/produs02.png",alt:""}}),t._v(" "),a("div",{staticClass:"produsTitle"},[t._v("服务器研发和销售")]),t._v(" "),a("img",{staticClass:"produsMask",attrs:{src:"/static/image/produsMask02.png"}})]),t._v(" "),a("div",[a("img",{staticClass:"produsImg",attrs:{src:"/static/image/produs03.png",alt:""}}),t._v(" "),a("div",{staticClass:"produsTitle"},[t._v("服务器智能化管理")]),t._v(" "),a("img",{staticClass:"produsMask",attrs:{src:"/static/image/produsMask03.png"}})]),t._v(" "),a("div",[a("img",{staticClass:"produsImg",attrs:{src:"/static/image/produs04.png",alt:""}}),t._v(" "),a("div",{staticClass:"produsTitle"},[t._v("区块链节点建设与运维")]),t._v(" "),a("img",{staticClass:"produsMask",attrs:{src:"/static/image/produsMask03.png"}})]),t._v(" "),a("div",[a("img",{staticClass:"produsImg",attrs:{src:"/static/image/produs05.png",alt:""}}),t._v(" "),a("div",{staticClass:"produsTitle"},[t._v("分布式软件开发和应用")]),t._v(" "),a("img",{staticClass:"produsMask",attrs:{src:"/static/image/produsMask03.png"}})]),t._v(" "),a("div",[a("img",{staticClass:"produsImg",attrs:{src:"/static/image/produs06.png",alt:""}}),t._v(" "),a("div",{staticClass:"produsTitle"},[t._v("智能数据和内容生态")]),t._v(" "),a("img",{staticClass:"produsMask",attrs:{src:"/static/image/produsMask03.png"}})])])])])}]};var m=a("VU/8")(u,v,!1,function(t){a("b8bl")},"data-v-7d063f64",null);s.default=m.exports}});
//# sourceMappingURL=6.51a503e6bba89ff5e44d.js.map