webpackJsonp([17],{GpCx:function(e,t){},xphC:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var s=r("Dd8w"),i=r.n(s),o=r("mvHQ"),a=r.n(o),n=r("E4LH"),l=r("mCTZ"),d={name:"login",data:function(){var e=this;return{resetForm:{loginName:""},isNext:!1,nextForm:{password:"",comfirPassword:""},userOneDialog:!1,userOneForm:{verifyCode:"",verifyCode2:""},resetRules:{loginName:[{required:!0,message:"请输入用户名/邮箱",trigger:"blur"},{validator:function(e,t,r){null!=t.match(/@/)?/[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/.test(t)?r():r(new Error("请输入正确的邮箱地址")):/^[1][3,4,5,6,7,8,9][0-9]{9}$/.test(t)?r():r(new Error("请输入正确的手机号"))},trigger:"blur"}],password:[{required:!0,message:"请输入密码",trigger:"blur"},{min:6,max:20,message:"请输入6-20位包含数字和字母的密码",trigger:"blur"},{validator:function(t,r,s){new RegExp(/^(?![^a-zA-Z]+$)(?!\D+$)/).test(r)?(""!==e.nextForm.comfirPassword&&e.$refs.nextForm.validateField("comfirPassword"),s()):s(new Error("请输入6-20位带数字和字母的登录密码"))},trigger:"blur"}],comfirPassword:[{required:!0,message:"请输入密码",trigger:"blur"},{min:6,max:20,message:"请输入6-20位包含数字和字母的密码",trigger:"blur"},{validator:function(t,r,s){r!==e.nextForm.password?s(new Error("密码不一致")):s()},trigger:"blur"}],verifyCode:[{required:!0,message:"请输入验证码",trigger:"blur"},{min:6,max:6,message:"请输入6位数字的验证码",trigger:"blur"},{validator:n.a.FormValidate.Form().checkCode,trigger:"blur"}]},isAliyun:!1,verifyId:"",verifyForm:"",verifys:[{label:"",verifyType:""},{label:"",verifyType:""}],disabled:!1}},methods:{next:function(e){var t=this;this.$refs[e].validate(function(e){if(!e)return!1;t.disabled=!0,t.forgotPassword()})},reset:function(e){var t=this;this.$refs[e].validate(function(e){if(!e)return!1;t.disabled=!0,t.forgotPassword("reset")})},resetCode:function(e){var t=this;this.$refs[e].validate(function(e){if(!e)return!1;var r=[];r.push({verifyType:t.verifys[0].verifyType,verifyCode:t.userOneForm.verifyCode}),t.verifys.length>1&&r.push({verifyType:t.verifys[1].verifyType,verifyCode:t.userOneForm.verifyCode2}),t.$api.checkCaptcha({action:"verify",verifyCode:a()(r),verifyType:"user_all",verifyId:t.verifyId}).then(function(e){t.verifyForm=e.messages.data,t.forgotPassword("resetCode")}).catch(function(e){t.$message.error(e.messages.error.message)})})},forgotPassword:function(e){var t=this,r="";void 0==e?r={action:"validateLoginName",loginName:this.resetForm.loginName}:"aliyun"==e?r=i()({action:"validateLoginName",loginName:this.resetForm.loginName},this.verifyForm):"reset"==e?r={passportId:this.passportId,password:this.nextForm.password,password1:this.nextForm.comfirPassword,sign:"168node"}:"resetCode"==e&&(r=i()({passportId:this.passportId,password:this.nextForm.password,password1:this.nextForm.comfirPassword},this.verifyForm)),this.$api.forgotPassword(r).then(function(e){t.disabled=!1,1==e.messages.data.ret&&void 0!=e.messages.data.ret&&(t.$message("密码重置成功"),t.$router.push({path:"/login"})),t.isNext=!0,t.passportId=e.messages.data.passportId}).catch(function(e){if(t.disabled=!1,"verify_required"==e.messages.error.code){var r=JSON.parse(e.messages.error.message)[0];t.verifyId=r.verifyId,"anti_robot"==r.verifyType&&(t.isAliyun=!0,Object(l.a)(t.verifyId,function(e){t.isAliyun=!1,t.verifyForm=e.messages.data,t.forgotPassword("aliyun")})),"user_all"==r.verifyType&&(t.verifys=r.verifys,t.userOneDialog=!0,setTimeout(function(){Object(l.b)("getCode"),t.verifys.length>1&&Object(l.b)("getCode2")},500))}else t.$message.error(e.messages.error.message)})},getCode:function(e,t){var r=this,s="";s="user_email"==t?{action:"refresh",type:t,verifyId:this.verifyId}:{action:"refresh",type:t,verifyId:this.verifyId,sign:"168node"},this.$api.checkCaptcha(s).then(function(t){Object(l.b)(e),r.verifyForm=t.messages.data})},resetFields:function(e){this.$refs[e].resetFields()}}},u={render:function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"userOperate",attrs:{id:"userOperate"}},[r("el-row",{staticClass:"userAction resetPass"},[r("el-col",{staticClass:"center",attrs:{span:12}},[r("img",{attrs:{src:"/static/image/loignImg.png",width:"408"}})]),e._v(" "),r("el-col",{staticClass:"userActionItem",attrs:{span:12}},[r("p",{staticClass:"center userActionTitle"},[e._v("重置密码")]),e._v(" "),r("el-form",{directives:[{name:"show",rawName:"v-show",value:!e.isNext,expression:"!isNext"}],ref:"resetForm",attrs:{model:e.resetForm,rules:e.resetRules,disabled:e.disabled},nativeOn:{submit:function(e){e.preventDefault()}}},[r("el-form-item",{attrs:{prop:"loginName"}},[r("el-input",{attrs:{placeholder:"手机号/邮箱"},nativeOn:{keyup:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:e.next("resetForm")}},model:{value:e.resetForm.loginName,callback:function(t){e.$set(e.resetForm,"loginName",t)},expression:"resetForm.loginName"}},[r("img",{attrs:{slot:"prefix",src:"/static/image/login_icon_user.png"},slot:"prefix"})])],1),e._v(" "),r("el-form-item",{staticClass:"operateBtn"},[r("button",{staticClass:"roundBtn",attrs:{type:"button",disabled:e.disabled},on:{click:function(t){return e.next("resetForm")}}},[e._v("下一步")])]),e._v(" "),r("div",{staticClass:"center"},[r("router-link",{staticClass:"textBtn",attrs:{to:"/login"}},[e._v("去登录")])],1)],1),e._v(" "),r("el-form",{directives:[{name:"show",rawName:"v-show",value:e.isNext,expression:"isNext"}],ref:"nextForm",attrs:{model:e.nextForm,rules:e.resetRules,disabled:e.disabled},nativeOn:{submit:function(e){e.preventDefault()}}},[r("el-form-item",{attrs:{prop:"password"}},[r("el-input",{attrs:{type:"password",placeholder:"新密码"},model:{value:e.nextForm.password,callback:function(t){e.$set(e.nextForm,"password",t)},expression:"nextForm.password"}},[r("img",{attrs:{slot:"prefix",src:"/static/image/login_icon_psw.png"},slot:"prefix"})])],1),e._v(" "),r("el-form-item",{attrs:{prop:"comfirPassword"}},[r("el-input",{attrs:{type:"password",placeholder:"确认密码"},nativeOn:{keyup:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:e.reset("nextForm")}},model:{value:e.nextForm.comfirPassword,callback:function(t){e.$set(e.nextForm,"comfirPassword",t)},expression:"nextForm.comfirPassword"}},[r("img",{attrs:{slot:"prefix",src:"/static/image/login_icon_psw.png"},slot:"prefix"})])],1),e._v(" "),r("el-form-item",{staticClass:"operateBtn"},[r("button",{staticClass:"roundBtn",attrs:{type:"button",disabled:e.disabled},on:{click:function(t){return e.reset("nextForm")}}},[e._v("确认重置")])]),e._v(" "),r("div",{staticClass:"center"},[r("router-link",{staticClass:"textBtn",attrs:{to:"/login"}},[e._v("去登录")])],1)],1)],1)],1),e._v(" "),r("el-dialog",{staticClass:"dialogTitle",attrs:{visible:e.userOneDialog,width:"450px","close-on-click-modal":!1},on:{"update:visible":function(t){e.userOneDialog=t}}},[r("div",{staticClass:"header-title",attrs:{slot:"title"},slot:"title"},[r("span",{staticClass:"title-age"},[e._v("验证码验证")])]),e._v(" "),r("el-form",{ref:"userOneForm",staticStyle:{width:"80%",margin:"0 auto"},attrs:{model:e.userOneForm,rules:e.resetRules,disabled:e.disabled},nativeOn:{submit:function(e){e.preventDefault()}}},[r("el-form-item",{staticClass:"center"},[r("span",[e._v("验证码发送至"+e._s(e.verifys[0].label)+",注意查收")])]),e._v(" "),r("el-form-item",{attrs:{prop:"verifyCode"}},[r("el-input",{attrs:{placeholder:"验证码",maxlength:"6"},nativeOn:{keyup:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:e.resetCode("userOneForm")}},model:{value:e.userOneForm.verifyCode,callback:function(t){e.$set(e.userOneForm,"verifyCode",t)},expression:"userOneForm.verifyCode"}},[r("img",{attrs:{slot:"prefix",src:"/static/image/login_icon_code.png"},slot:"prefix"}),e._v(" "),r("button",{staticClass:"roundBtn rimBtn getCodeBtn",attrs:{slot:"suffix",type:"button",id:"getCode",disabled:e.disabled},on:{click:function(t){return e.getCode("getCode",e.verifys[0].verifyType)}},slot:"suffix"},[e._v("获取验证码")])])],1),e._v(" "),e.verifys.length>1?r("el-form-item",{staticClass:"center"},[r("span",[e._v("验证码发送至"+e._s(e.verifys[1].label)+",注意查收")])]):e._e(),e._v(" "),e.verifys.length>1?r("el-form-item",{attrs:{prop:"verifyCode"}},[r("el-input",{attrs:{placeholder:"验证码",maxlength:"6"},nativeOn:{keyup:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:e.resetCode("userOneForm")}},model:{value:e.userOneForm.verifyCode2,callback:function(t){e.$set(e.userOneForm,"verifyCode2",t)},expression:"userOneForm.verifyCode2"}},[r("img",{attrs:{slot:"prefix",src:"/static/image/login_icon_code.png"},slot:"prefix"}),e._v(" "),r("button",{staticClass:"roundBtn rimBtn getCodeBtn",attrs:{slot:"suffix",type:"button",id:"getCode2"},on:{click:function(t){return e.getCode("getCode2",e.verifys[1].verifyType)}},slot:"suffix"},[e._v("获取验证码")])])],1):e._e(),e._v(" "),r("el-form-item",{staticClass:"center operateBtn"},[r("button",{staticClass:"roundBtn",attrs:{type:"button"},on:{click:function(t){return e.resetCode("userOneForm")}}},[e._v("确定")])])],1)],1),e._v(" "),r("el-dialog",{staticClass:"dialogTitle",attrs:{visible:e.isAliyun,width:"350px","close-on-click-modal":!1},on:{"update:visible":function(t){e.isAliyun=t}}},[r("div",{staticClass:"header-title",attrs:{slot:"title"},slot:"title"},[r("span",{staticClass:"title-age"},[e._v("人机验证")])]),e._v(" "),r("div",{attrs:{id:"captcha"}})])],1)},staticRenderFns:[]};var c=r("VU/8")(d,u,!1,function(e){r("GpCx")},"data-v-5df430f0",null);t.default=c.exports}});
//# sourceMappingURL=17.5712f5ac201b4add375d.js.map