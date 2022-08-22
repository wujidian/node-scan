<template>
  <div class="userOperate" id="userOperate">
    <el-row class="userAction resetPass">
      <el-col :span="12" class="center">
        <img src="/static/image/loignImg.png" width="408" />
      </el-col>
      <el-col :span="12" class="userActionItem">
        <p class="center userActionTitle">重置密码</p>
        <el-form
          :model="resetForm"
          :rules="resetRules"
          ref="resetForm"
          v-show="!isNext"
          @submit.native.prevent
          :disabled="disabled"
        >
          <el-form-item prop="loginName">
            <el-input
              v-model="resetForm.loginName"
              placeholder="手机号/邮箱"
              @keyup.enter.native="next('resetForm')"
            >
              <img src="/static/image/login_icon_user.png" slot="prefix" />
            </el-input>
          </el-form-item>
          <el-form-item class="operateBtn">
            <button
              type="button"
              class="roundBtn"
              @click="next('resetForm')"
              :disabled="disabled"
            >下一步</button>
          </el-form-item>
          <div class="center">
            <router-link class="textBtn" to="/login">去登录</router-link>
          </div>
        </el-form>
        <el-form
          :model="nextForm"
          :rules="resetRules"
          ref="nextForm"
          v-show="isNext"
          @submit.native.prevent
          :disabled="disabled"
        >
          <el-form-item prop="password">
            <el-input type="password" v-model="nextForm.password" placeholder="新密码">
              <img src="/static/image/login_icon_psw.png" slot="prefix" />
            </el-input>
          </el-form-item>
          <el-form-item prop="comfirPassword">
            <el-input
              type="password"
              v-model="nextForm.comfirPassword"
              placeholder="确认密码"
              @keyup.enter.native="reset('nextForm')"
            >
              <img src="/static/image/login_icon_psw.png" slot="prefix" />
            </el-input>
          </el-form-item>
          <el-form-item class="operateBtn">
            <button
              type="button"
              class="roundBtn"
              @click="reset('nextForm')"
              :disabled="disabled"
            >确认重置</button>
          </el-form-item>
          <div class="center">
            <router-link class="textBtn" to="/login">去登录</router-link>
          </div>
        </el-form>
      </el-col>
    </el-row>
    <el-dialog
      :visible.sync="userOneDialog"
      width="450px"
      :close-on-click-modal="false"
      class="dialogTitle"
    >
      <div slot="title" class="header-title">
        <span class="title-age">验证码验证</span>
      </div>
      <el-form
        :model="userOneForm"
        ref="userOneForm"
        :rules="resetRules"
        style="width:80%;margin:0 auto"
        @submit.native.prevent
        :disabled="disabled"
      >
        <el-form-item class="center">
          <span>验证码发送至{{verifys[0].label}},注意查收</span>
        </el-form-item>
        <el-form-item prop="verifyCode">
          <el-input
            v-model="userOneForm.verifyCode"
            placeholder="验证码"
            @keyup.enter.native="resetCode('userOneForm')"
            maxlength="6"
          >
            <img src="/static/image/login_icon_code.png" slot="prefix" />
            <button
              type="button"
              id="getCode"
              class="roundBtn rimBtn getCodeBtn"
              :disabled="disabled"
              @click="getCode('getCode',verifys[0].verifyType)"
              slot="suffix"
            >获取验证码</button>
          </el-input>
        </el-form-item>
        <el-form-item class="center" v-if="verifys.length>1">
          <span>验证码发送至{{verifys[1].label}},注意查收</span>
        </el-form-item>
        <el-form-item prop="verifyCode" v-if="verifys.length>1">
          <el-input
            v-model="userOneForm.verifyCode2"
            placeholder="验证码"
            @keyup.enter.native="resetCode('userOneForm')"
            maxlength="6"
          >
            <img src="/static/image/login_icon_code.png" slot="prefix" />
            <button
              type="button"
              id="getCode2"
              class="roundBtn rimBtn getCodeBtn"
              @click="getCode('getCode2',verifys[1].verifyType)"
              slot="suffix"
            >获取验证码</button>
          </el-input>
        </el-form-item>
        <el-form-item class="center operateBtn">
          <button type="button" @click="resetCode('userOneForm')" class="roundBtn">确定</button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-dialog
      :visible.sync="isAliyun"
      width="350px"
      :close-on-click-modal="false"
      class="dialogTitle"
    >
      <div slot="title" class="header-title">
        <span class="title-age">人机验证</span>
      </div>
      <div id="captcha"></div>
    </el-dialog>
  </div>
</template>

<script>
import validate from "@/utils/validate";
import { codeMsg } from "@/utils/comm.js";
import { aliyunVerify } from "@/utils/comm";
export default {
  name: "login",
  data() {
    // 手机号邮箱验证
    var checkUser = (rule, value, callback) => {
      if (value.match(/@/) != null) {
        var reg = /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/;
        if (!reg.test(value)) {
          callback(new Error("请输入正确的邮箱地址"));
        } else {
          callback();
        }
      } else {
        var reg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/;
        if (!reg.test(value)) {
          callback(new Error("请输入正确的手机号"));
        } else {
          callback();
        }
      }
    };
    // 密码验证
    var validatePass = (rule, value, callback) => {
      var reg = new RegExp(/^(?![^a-zA-Z]+$)(?!\D+$)/);
      if (!reg.test(value)) {
        callback(new Error("请输入6-20位带数字和字母的登录密码"));
      } else {
        if (this.nextForm.comfirPassword !== "") {
          this.$refs.nextForm.validateField("comfirPassword");
        }
        callback();
      }
    };
    // 确认密码验证
    var validatePass2 = (rule, value, callback) => {
      if (value !== this.nextForm.password) {
        callback(new Error("密码不一致"));
      } else {
        callback();
      }
    };
    return {
      resetForm: {
        loginName: ""
      },
      isNext: false,
      nextForm: {
        password: "",
        comfirPassword: ""
      },
      userOneDialog: false,
      userOneForm: {
        verifyCode: "",
        verifyCode2: ""
      },
      resetRules: {
        loginName: [
          {
            required: true,
            message: "请输入用户名/邮箱",
            trigger: "blur"
          },
          { validator: checkUser, trigger: "blur" }
        ],
        password: [
          {
            required: true,
            message: "请输入密码",
            trigger: "blur"
          },
          {
            min: 6,
            max: 20,
            message: "请输入6-20位包含数字和字母的密码",
            trigger: "blur"
          },
          { validator: validatePass, trigger: "blur" }
        ],
        comfirPassword: [
          {
            required: true,
            message: "请输入密码",
            trigger: "blur"
          },
          {
            min: 6,
            max: 20,
            message: "请输入6-20位包含数字和字母的密码",
            trigger: "blur"
          },
          { validator: validatePass2, trigger: "blur" }
        ],
        verifyCode: [
          {
            required: true,
            message: "请输入验证码",
            trigger: "blur"
          },
          {
            min: 6,
            max: 6,
            message: "请输入6位数字的验证码",
            trigger: "blur"
          },
          { validator: validate.FormValidate.Form().checkCode, trigger: "blur" }
        ]
      },
      isAliyun: false,
      verifyId: "",
      verifyForm: "",
      verifys: [
        { label: "", verifyType: "" },
        { label: "", verifyType: "" }
      ],
      disabled: false
    };
  },
  methods: {
    // 下一步
    next(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.disabled = true;
          this.forgotPassword();
        } else {
          return false;
        }
      });
    },
    // 重置密码
    reset(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.disabled = true;
          this.forgotPassword("reset");
        } else {
          return false;
        }
      });
    },
    // 验证码
    resetCode(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          var verifyCode = [];
          verifyCode.push({
            verifyType: this.verifys[0].verifyType,
            verifyCode: this.userOneForm.verifyCode
          });
          if (this.verifys.length > 1) {
            verifyCode.push({
              verifyType: this.verifys[1].verifyType,
              verifyCode: this.userOneForm.verifyCode2
            });
          }
          this.$api
            .checkCaptcha({
              action: "verify",
              verifyCode: JSON.stringify(verifyCode),
              verifyType: "user_all",
              verifyId: this.verifyId
            })
            .then(res => {
              this.verifyForm = res.messages.data;
              this.forgotPassword("resetCode");
            })
            .catch(err => {
              this.$message.error(err.messages.error.message);
            });
        } else {
          return false;
        }
      });
    },
    // 重置密码
    forgotPassword(type) {
      var parames = "";
      if (type == undefined) {
        //账号验证
        parames = {
          action: "validateLoginName",
          loginName: this.resetForm.loginName
        };
      } else if (type == "aliyun") {
        //人机验证
        parames = {
          action: "validateLoginName",
          loginName: this.resetForm.loginName,
          ...this.verifyForm
        };
      } else if (type == "reset") {
        //重置密码
        parames = {
          passportId: this.passportId,
          password: this.nextForm.password,
          password1: this.nextForm.comfirPassword,
          sign: "168node"
        };
      } else if (type == "resetCode") {
        parames = {
          passportId: this.passportId,
          password: this.nextForm.password,
          password1: this.nextForm.comfirPassword,
          ...this.verifyForm
        };
      }
      this.$api
        .forgotPassword(parames)
        .then(res => {
          this.disabled = false;
          if (
            res.messages.data.ret == true &&
            res.messages.data.ret != undefined
          ) {
            this.$message("密码重置成功");
            this.$router.push({ path: "/login" });
          }
          this.isNext = true;
          this.passportId = res.messages.data.passportId;
        })
        .catch(err => {
          this.disabled = false;
          if (err.messages.error.code == "verify_required") {
            var data = JSON.parse(err.messages.error.message)[0];
            // 人机验证ID
            this.verifyId = data.verifyId;
            if (data.verifyType == "anti_robot") {
              this.isAliyun = true;
              aliyunVerify(this.verifyId, res => {
                this.isAliyun = false;
                this.verifyForm = res.messages.data;
                this.forgotPassword("aliyun");
              });
            }
            if (data.verifyType == "user_all") {
              // 发送验证码信息
              this.verifys = data.verifys;
              this.userOneDialog = true;
              setTimeout(() => {
                codeMsg("getCode");
                if (this.verifys.length > 1) {
                  codeMsg("getCode2");
                }
              }, 500);
            }
          } else {
            this.$message.error(err.messages.error.message);
          }
        });
    },
    // 获取验证码
    getCode(el, verifyType) {
      var parames = "";
      if (verifyType == "user_email") {
        parames = {
          action: "refresh",
          type: verifyType,
          verifyId: this.verifyId
        };
      } else {
        parames = {
          action: "refresh",
          type: verifyType,
          verifyId: this.verifyId,
          sign: "168node"
        };
      }
      this.$api.checkCaptcha(parames).then(res => {
        codeMsg(el);
        this.verifyForm = res.messages.data;
      });
    },

    // 表单重置
    resetFields(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>
<style scoped>
.resetPass .el-form {
  height: 200px;
}
.password {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
}
.password:hover {
  cursor: pointer;
}
</style>
