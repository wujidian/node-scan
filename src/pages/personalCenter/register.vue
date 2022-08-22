<template>
  <div class="userOperate" id="userOperate">
    <el-row class="userAction">
      <el-col :span="12" class="center">
        <img src="/static/image/loignImg.png" width="408" />
      </el-col>
      <el-col :span="12" class="userActionItem">
        <p class="userActionTitle center">
          <span v-show="registration =='mobileRegister'" class="loginTips">手机注册</span>
          <span class="loginTips" v-show="registration =='emailRegister'">邮箱注册</span>
        </p>
        <el-form
          :model="registerForm"
          :rules="registerRules"
          ref="registerForm"
          @submit.native.prevent
          :disabled="isDisable"
        >
          <el-form-item prop="nickName">
            <el-input
              v-model="registerForm.nickName"
              placeholder="昵称"
              autocomplete="off"
              maxlength="20"
            >
              <img src="/static/image/login_icon_user.png" slot="prefix" />
            </el-input>
          </el-form-item>
          <el-form-item v-if="registration == 'mobileRegister'" prop="mobile">
            <el-input
              v-model="registerForm.mobile"
              placeholder="手机号"
              class="phoneInput"
              autocomplete="off"
              maxlength="20"
            >
              <img src="/static/image/login_icon_phone.png" slot="prefix" />
            </el-input>
            <country v-on:getCountry="getCountry($event,'register')" />
          </el-form-item>
          <el-form-item v-if="registration == 'emailRegister'" prop="email">
            <el-input
              v-model="registerForm.email"
              placeholder="邮箱"
              autocomplete="off"
              maxlength="50"
            >
              <img src="/static/image/login_icon_email.png" slot="prefix" />
            </el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              type="password"
              v-model="registerForm.password"
              placeholder="密码"
              autocomplete="off"
              maxlength="20"
              show-password
            >
              <img src="/static/image/login_icon_psw.png" slot="prefix" />
            </el-input>
          </el-form-item>
          <el-form-item prop="comfirPassword">
            <el-input
              type="password"
              v-model="registerForm.comfirPassword"
              placeholder="确认密码"
              autocomplete="off"
              maxlength="20"
              show-password
            >
              <img src="/static/image/login_icon_psw.png" slot="prefix" />
            </el-input>
          </el-form-item>
          <el-form-item prop="verifyCode">
            <el-input
              v-model="registerForm.verifyCode"
              :placeholder="registration =='mobileRegister'?'手机验证码':'邮箱验证码'"
              autocomplete="off"
              @keyup.enter.native="checkCode('registerForm')"
              maxlength="6"
            >
              <img src="/static/image/login_icon_code.png" slot="prefix" />
            </el-input>
            <button
              type="button"
              class="roundBtn rimBtn getCodeBtn"
              @click="getCode('getCode')"
              id="getCode"
            >获取验证码</button>
          </el-form-item>
          <el-form-item>
            <div class="userActionTips">
              <div>
                已有账号,
                <router-link class="check" to="/login">去登录</router-link>
              </div>
              <div>
                <span
                  class="check"
                  @click="registration = 'mobileRegister';resetForm('registerForm');isDisable = false"
                  v-show="registration !=='mobileRegister'"
                >手机注册</span>
                <span
                  class="check"
                  @click="registration = 'emailRegister';resetForm('registerForm');isDisable = false"
                  v-show="registration !=='emailRegister'"
                >邮箱注册</span>
              </div>
            </div>
          </el-form-item>
          <el-form-item class="operateBtn center">
            <button
              type="button"
              class="roundBtn"
              @click="checkCode('registerForm')"
              :disabled="isDisable"
            >确认注册</button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
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
import country from "@/components/country";
import { codeMsg } from "@/utils/comm.js";
import { aliyunVerify } from "@/utils/comm";
export default {
  name: "register",
  components: { country },
  data() {
    // 手机号验证
    var checkMobile = (rule, value, callback) => {
      var reg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/;
      if (!reg.test(value)) {
        callback(new Error("手机号格式错误"));
      } else {
        this.$api
          .registerMobile({
            country: this.registerForm.country.id,
            action: "validateMobile",
            mobile: this.registerForm.mobile,
            loginType: "mobile"
          })
          .then(res => {
            callback();
          })
          .catch(err => {
            callback(new Error(err.messages.error.message));
          });
      }
    };
    // 邮箱验证
    var checkEmail = (rule, value, callback) => {
      var reg = /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/;
      if (!reg.test(value)) {
        callback(new Error("邮箱格式错误"));
      } else {
        this.$api
          .registerEmail({
            country: this.registerForm.country.id,
            action: "validateEmail",
            email: this.registerForm.email,
            loginType: "email"
          })
          .then(res => {
            callback();
          })
          .catch(err => {
            callback(new Error(err.messages.error.message));
          });
      }
    };
    // 密码验证
    var validatePass = (rule, value, callback) => {
      var reg = new RegExp(/^(?![^a-zA-Z]+$)(?!\D+$)/);
      if (!reg.test(value)) {
        callback(new Error("请输入6-20位包含数字和字母的密码"));
      } else {
        if (this.registerForm.comfirPassword !== "") {
          this.$refs.registerForm.validateField("comfirPassword");
        }
        callback();
      }
    };
    // 确认密码验证
    var validatePass2 = (rule, value, callback) => {
      if (value !== this.registerForm.password) {
        callback(new Error("密码不一致"));
      } else {
        callback();
      }
    };
    // 用户名验证
    var checkNickName = (rule, value, callback) => {
      var maxLength = 20;
      this.$api
        .register({
          action: "validateNickName",
          nickName: value
        })
        .then(res => {
          callback();
        })
        .catch(err => {
          callback(new Error(err.messages.error.message));
        });
    };
    return {
      registration: "mobileRegister",
      registerForm: {
        country: "",
        mobile: "",
        password: "",
        comfirPassword: "",
        nickName: "",
        email: "",
        verifyCode: ""
      },
      registerRules: {
        nickName: [
          { required: true, message: "请输入昵称", trigger: "blur" },
          { validator: checkNickName, trigger: "blur" }
        ],
        mobile: [
          { required: true, message: "请输入手机号", trigger: "blur" },
          { validator: checkMobile, trigger: "change" }
        ],
        email: [
          { required: true, message: "请输入邮箱", trigger: "blur" },
          { validator: checkEmail, trigger: "change" }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            min: 6,
            max: 20,
            message: "请输入6-20位包含数字和字母的密码",
            trigger: "blur"
          },
          { validator: validatePass, trigger: "blur" }
        ],
        comfirPassword: [
          { required: true, message: "请确认密码", trigger: "blur" },
          {
            min: 6,
            max: 20,
            message: "请输入6-20位包含数字和字母的密码",
            trigger: "blur"
          },
          { validator: validatePass2, trigger: "blur" }
        ],
        verifyCode: [
          { required: true, message: "请输入验证码", trigger: "blur" },
          {
            min: 6,
            max: 6,
            message: "请输入6位数字的验证码",
            trigger: "blur"
          },
          { validator: validate.FormValidate.Form().checkCode, trigger: "blur" }
        ]
      },
      verify: "",
      verifyInfo: "",
      isAliyun: false,
      isDisable: false
    };
  },
  methods: {
    // 验证码验证
    checkCode(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.isDisable = true;
          if (this.registration == "mobileRegister") {
            this.$api
              .registerMobile({
                action: "validateMobileVerify",
                mobile: this.registerForm.mobile,
                verifyCode: this.registerForm.verifyCode,
                ...this.verify
              })
              .then(res => {
                this.verifyInfo = res.messages.data.verifyInfo;
                this.register(formName);
              })
              .catch(err => {
                this.isDisable = false;
                this.$message.error("验证码错误");
              });
          } else {
            this.$api
              .registerEmail({
                action: "validateEmailVerify",
                email: this.registerForm.email,
                verifyCode: this.registerForm.verifyCode,
                ...this.verify
              })
              .then(res => {
                this.verifyInfo = res.messages.data.verifyInfo;
                this.register(formName);
              })
              .catch(err => {
                this.isDisable = false;
                this.$message.error(err.messages.error.message);
              });
          }
        } else {
          return false;
        }
      });
    },
    // 注册
    register(formName) {
      if (this.registration == "mobileRegister") {
        this.$api
          .registerMobile({
            country: this.registerForm.country.id,
            mobile: this.registerForm.mobile,
            verifyCode: this.registerForm.verifyCode,
            nickName: this.registerForm.nickName,
            password: this.registerForm.password,
            ...this.verifyInfo
          })
          .then(res => {
            this.resetForm(formName);
            this.$message("注册成功");
            this.$router.push({ path: "/login" });
          })
          .catch(err => {
            this.isDisable = false;
            this.$message.error(err.messages.error.message);
          });
      } else {
        this.$api
          .registerEmail({
            country: this.registerForm.country.id,
            email: this.registerForm.email,
            nickName: this.registerForm.nickName,
            password: this.registerForm.password,
            password1: this.registerForm.comfirPassword,
            ...this.verifyInfo
          })
          .then(res => {
            this.resetForm(formName);
            this.$message("注册成功");
            this.$router.push({ path: "/login" });
          })
          .catch(err => {
            this.isDisable = false;
            this.$message.error(err.messages.error.message);
          });
      }
    },
    // 获取验证码
    getCode(el) {
      var errArr = [];
      this.$refs["registerForm"].validateField(
        [
          "mobile",
          "country",
          "password",
          "comfirPassword",
          "nickName",
          "email"
        ],
        error => {
          if (error) {
            return false;
          } else if (!error) {
            errArr.push(!error);
            if (errArr.length == 4) {
              if (this.registration == "mobileRegister") {
                this.$api
                  .registerMobile({
                    mobile:
                      "+" +
                      this.registerForm.country.tel +
                      this.registerForm.mobile,
                    action: "validateMobileSend",
                    country: this.registerForm.country.id,
                    ...this.verify,
                    sign: "168node"
                  })
                  .then(res => {
                    this.verify = res.messages.data.verifyInfo;
                    this.$message("验证码发送成功");
                    setTimeout(() => {
                      codeMsg("getCode");
                    }, 500);
                  })
                  .catch(err => {
                    if (err.messages.error.code == "verify_required") {
                      this.isAliyun = true;
                      setTimeout(() => {
                        aliyunVerify("", res => {
                          this.isAliyun = false;
                          this.verify = res.messages.data;
                          this.getCode("getCode");
                        });
                      }, 500);
                    } else {
                      this.$message.error(err.messages.error.message);
                    }
                  });
              } else {
                this.$api
                  .registerEmail({
                    email: this.registerForm.email,
                    action: "validateEmailSend",
                    ...this.verify
                  })
                  .then(res => {
                    this.$message("验证码发送成功");
                    this.verify = res.messages.data.verifyInfo;
                    setTimeout(() => {
                      codeMsg("getCode");
                    }, 500);
                  })
                  .catch(err => {
                    if (err.messages.error.code == "verify_required") {
                      this.isAliyun = true;
                      setTimeout(() => {
                        aliyunVerify("", res => {
                          this.isAliyun = false;
                          this.verify = res.messages.data;
                          this.getCode("getCode");
                        });
                      }, 500);
                    } else {
                      this.$message.error(err.messages.error.message);
                    }
                  });
              }
            } else {
              return false;
            }
          }
        }
      );
    },

    // 获取国家
    getCountry(data, formName) {
      if (formName == "register") {
        this.registerForm.country = data;
      }
    },
    // 重置表单
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>
<style scoped>
.phoneCity {
  position: absolute;
  left: 30px;
  bottom: 0;
}
.phoneCity i {
  border-right: 1px solid rgba(179, 179, 179, 1);
}
</style>