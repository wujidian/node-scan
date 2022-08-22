<template>
  <div class="userOperate" id="userOperate">
    <el-row class="userAction">
      <el-col :span="12" class="center">
        <img src="/static/image/loignImg.png" width="408" />
      </el-col>
      <el-col :span="12" class="userActionItem">
        <p class="userActionTitle">登录</p>
        <el-form :model="loginForm" :rules="loginRules" ref="loginForm" :disabled="isDisabled">
          <el-form-item prop="user">
            <el-input type="text" v-model="loginForm.user" placeholder="手机号/邮箱" maxlength="30">
              <img src="/static/image/login_icon_user.png" slot="prefix" />
            </el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              type="password"
              v-model="loginForm.password"
              placeholder="6-20位登录密码"
              maxlength="20"
              show-password
              @keyup.enter.native="loginClick('loginForm')"
            >
              <img slot="prefix" src="/static/image/login_icon_psw.png" />
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-row class="userActionTips">
              <el-col :span="12">
                <router-link to="/forgetPassword" style="color:rgba(0,0,0,1)">忘记密码</router-link>
              </el-col>
              <el-col :span="12" class="right">
                新用户？
                <router-link class="check" to="/register">去注册</router-link>
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item class="operateBtn center">
            <button
              type="button"
              class="roundBtn"
              @click="loginClick('loginForm')"
              :disabled="isDisabled"
            >登 录</button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <!-- 人机验证 -->
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
import { aliyunVerify, getUserInfo } from "@/utils/comm";
export default {
  name: "login",
  data() {
    // 手机号邮箱验证
    var checkUser = (rule, value, callback) => {
      if (value.match(/@/) != null) {
        var reg = /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/;
        if (!reg.test(value)) {
          callback(new Error("邮箱格式错误"));
        } else {
          callback();
        }
      } else {
        var reg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/;
        if (!reg.test(value)) {
          callback(new Error("手机号格式错误"));
        } else {
          callback();
        }
      }
    };
    return {
      loginForm: {
        user: "",
        password: ""
      },
      loginRules: {
        user: [
          { required: true, message: "请输入用户名/邮箱", trigger: "blur" },
          { validator: checkUser, trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            min: 6,
            max: 20,
            message: "请输入6-20位包含数字和字母的密码",
            trigger: "blur"
          },
          {
            validator: validate.FormValidate.Form().checkPassWord,
            trigger: "blur"
          }
        ]
      },
      isAliyun: false,
      verifyId: "",
      isDisabled: false
    };
  },
  methods: {
    loginClick(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.isDisabled = true;
          this.$api
            .login({
              username: this.loginForm.user,
              password: this.loginForm.password,
              ...this.verifyForm
            })
            .then(res => {
              this.isDisabled = false;
              this.$refs[formName].resetFields();
              localStorage.setItem("passport", res.messages.data.session.id);
              getUserInfo(res => {
                if (res == true) {
                  this.$message("登录成功");
                  this.$router.push({ path: "/" });
                } else {
                  this.$message.error(res);
                }
              });
            })
            .catch(err => {
              this.isDisabled = false;
              if (err.messages.error.code == "verify_required") {
                var data = JSON.parse(err.messages.error.message)[0];
                this.verifyId = data.verifyId;
                if (data.verifyType == "anti_robot") {
                  this.isAliyun = true;
                  aliyunVerify(this.verifyId, res => {
                    this.isAliyun = false;
                    this.verifyForm = res.messages.data;
                    this.loginClick(formName);
                  });
                }
              } else {
                this.$message.error(err.messages.error.message);
              }
            });
        } else {
          return false;
        }
      });
    }
  }
};
</script>
<style scoped>
.right {
  text-align: right;
}
</style>

