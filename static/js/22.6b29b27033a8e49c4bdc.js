webpackJsonp([22],{"5dr8":function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i={name:"download",data:function(){return{isWeChat:!1,xxx:"",appAddress:""}},methods:{getAuthority:function(){/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)?console.log("现在移动端打开的"):this.$router.push({path:"/"}),this.isWeiXin()&&(this.isWeChat=!0),document.querySelector('meta[name="viewport"]').content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no,viewport-fit=cover",document.title="168Node APP DOWNLOAD"},isWeiXin:function(){var t=navigator.userAgent.toLowerCase();return"micromessenger"==t.match(/MicroMessenger/i)||"weibo"==t.match(/WeiBo/i)||(t.indexOf("iphone")>-1||t.indexOf("mac")>-1)&&t.indexOf("qq")>-1},appDownload:function(){window.open("")},getAppAddress:function(){var t=this;this.$api.getAppAddress().then(function(e){console.log(e),e.data.length>0&&(t.appAddress=e.data[0].url)}).catch(function(t){console.log(t)})}},mounted:function(){this.getAuthority(),this.getAppAddress()}},a={render:function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"download"},[e("div",{directives:[{name:"show",rawName:"v-show",value:this.isWeChat,expression:"isWeChat"}],staticClass:"WeChatMask"},[this._m(0),this._v(" "),e("img",{staticClass:"WeChat1",attrs:{src:"/static/image/WeChat1.png"}})]),this._v(" "),e("div",[e("a",{staticClass:"appDownLoad",attrs:{href:this.appAddress,download:this.appAddress}},[this._v("Android下载")])])])},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"WeChatTips"},[e("div",{staticClass:"nums"},[e("span",[this._v("1")]),this._v(" 点击屏幕右上角图标")]),this._v(" "),e("div",{staticClass:"nums"},[e("span",[this._v("2")]),this._v(" 选择用 “浏览器” 打开")])])}]};var n=s("VU/8")(i,a,!1,function(t){s("JnuJ")},"data-v-2bfd89ec",null);e.default=n.exports},JnuJ:function(t,e){}});
//# sourceMappingURL=22.6b29b27033a8e49c4bdc.js.map