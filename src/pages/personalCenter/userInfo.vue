<template>
  <div class="userInfo">
    <el-form label-position="top" size="small">
      <el-form-item label="昵称">
        <el-input v-model="this.$store.state.info.nickName" disabled></el-input>
      </el-form-item>
      <el-form-item label="手机号">
        <el-row v-show="this.$store.state.info.hasMobile">
          <el-col :span="20">
            <el-input
              v-model="this.$store.state.info.mobile"
              disabled
              v-if="this.$store.state.info.hasMobile"
            ></el-input>
          </el-col>
          <el-col
            :span="4"
            class="center"
            v-show="this.$store.state.info.hasMobile && this.$store.state.info.hasEmail"
          >
            <span
              class="unBinding"
              @click="unBindingDialog = true;unBindingOperation = 'mobile';unBindingClick()"
            >解绑</span>
          </el-col>
        </el-row>
        <button
          type="button"
          class="normalBtn rimBtn"
          v-show="!this.$store.state.info.hasMobile"
          @click="bindingDialog = true;bindingOperation = 'mobile'"
        >绑 定</button>
      </el-form-item>
      <el-form-item label="邮箱">
        <el-row v-show="this.$store.state.info.hasEmail">
          <el-col :span="20">
            <el-input v-model="this.$store.state.info.email" disabled></el-input>
          </el-col>
          <el-col
            :span="4"
            class="center"
            v-show="this.$store.state.info.hasMobile && this.$store.state.info.hasEmail"
          >
            <span
              class="unBinding"
              @click="unBindingDialog = true;unBindingOperation = 'email';unBindingClick()"
            >解绑</span>
          </el-col>
        </el-row>
        <button
          type="button"
          class="normalBtn rimBtn"
          v-show="!this.$store.state.info.hasEmail "
          @click="bindingDialog = true;bindingOperation='email';"
        >绑定</button>
      </el-form-item>
    </el-form>
    <!-- 绑定邮箱地址或手机号 -->
    <el-dialog
      :visible.sync="bindingDialog"
      width="500px"
      :close-on-click-modal="false"
      @close="resetForm('bindingForm')"
      class="dialogTitle"
    >
      <div slot="title" class="header-title">
        <span class="title-age">{{bindingOperation == 'mobile'?'绑定手机号':'绑定邮箱'}}</span>
      </div>
      <el-form
        :model="bindingForm"
        ref="bindingForm"
        label-position="top"
        size="small"
        hide-required-asterisk
        :rules="bindingRules"
      >
        <el-form-item label="邮箱" prop="email" v-if="bindingOperation == 'email'">
          <el-input v-model="bindingForm.email" maxlength="50"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="mobile" v-if="bindingOperation == 'mobile'">
          <el-input v-model="bindingForm.mobile">
            <country v-on:getCountry="getCountry($event,'register')" slot="prefix" />
          </el-input>
        </el-form-item>
        <el-form-item label="验证码" prop="verifyCode">
          <el-row :gutter="20">
            <el-col :span="18">
              <el-input v-model="bindingForm.verifyCode" maxlength="6"></el-input>
            </el-col>
            <el-col :span="6">
              <button
                type="button"
                id="bindingCode"
                class="textBtn"
                @click="getCode('bindingCode')"
              >获取验证码</button>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item class="center">
          <button type="button" class="roundBtn" @click="checkCode('bindingForm')">确 认</button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <!-- 解绑手机号/邮箱 -->
    <el-dialog
      :visible.sync="unBindingDialog"
      width="500px"
      :close-on-click-modal="false"
      @close="resetForm('unBindingForm')"
      @submit.native.prevent
      class="dialogTitle"
    >
      <div slot="title" class="header-title">
        <span class="title-age">{{unBindingOperation == 'mobile'?'解绑手机号':'解绑邮箱'}}</span>
      </div>
      <el-form
        :model="unBindingForm"
        ref="unBindingForm"
        label-position="top"
        size="small"
        hide-required-asterisk
        :rules="unBindingRules"
      >
        <el-form-item label="验证码" prop="verifyCode">
          <el-row :gutter="20">
            <el-col :span="18">
              <el-input v-model="unBindingForm.verifyCode" type="text" maxlength="6"></el-input>
            </el-col>
            <el-col :span="6">
              <button
                type="button"
                class="textBtn"
                @click="getUnBindingCode('getCode')"
                id="getCode"
              >获取验证码</button>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item class="center">
          <button type="button" class="roundBtn" @click="unBidingCode('unBindingForm')">确认</button>
        </el-form-item>
      </el-form>
    </el-dialog>
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
import country from "@/components/country";
import { codeMsg } from "@/utils/comm.js";
import { aliyunVerify, getUserInfo } from "@/utils/comm";
import { mapGetters } from "vuex";
export default {
  name: "userInfo",
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
            country: this.bindingForm.country.id,
            action: "validateMobile",
            mobile: this.bindingForm.mobile
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
    var validEmail = (rule, value, callback) => {
      var reg = /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/;
      if (!reg.test(value)) {
        callback(new Error("邮箱格式错误"));
      } else {
        this.$api
          .registerEmail({
            action: "validateEmail",
            email: this.bindingForm.email
          })
          .then(res => {
            callback();
          })
          .catch(err => {
            callback(new Error(err.messages.error.message));
          });
      }
    };
    return {
      // 用户信息
      basicInfo: {},
      // 绑定
      bindingDialog: false,
      bindingForm: {
        email: "",
        verifyCode: "",
        mobile: "",
        country: ""
      },
      isAliyun: false,
      verifyToken: "",
      bindingRules: {
        email: [
          { required: true, message: "请输入邮箱", trigger: "blur" },
          { validator: validEmail, trigger: "blur" }
        ],
        mobile: [
          { required: true, message: "请输入手机号", trigger: "blur" },
          { validator: checkMobile, trigger: "blur" }
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
      bindingOperation: "",
      validCodeFrom: "",
      verifyInfo: "",
      verify: "",
      // 解绑手机号/邮箱
      unBindingOperation: "email",
      unBindingDialog: false,
      unBindingForm: {
        verifyCode: ""
      },
      unBindingRules: {
        verifyCode: [
          { required: true, message: "请输入验证码", trigger: "blur" },
          {
            min: 6,
            max: 20,
            message: "请输入6位数字的验证码",
            trigger: "blur"
          },
          {
            validator: validate.FormValidate.Form().checkCode,
            trigger: "blur"
          }
        ]
      },
      verifyId: ""
    };
  },
  methods: {
    // 绑定邮箱或手机号
    binding() {
      if (this.bindingOperation == "mobile") {
        this.$api
          .registerMobile({
            mobile: this.bindingForm.mobile,
            link: true,
            ...this.verifyInfo
          })
          .then(res => {
            this.bindingDialog = false;
            this.$message("手机号码已成功绑定");
            getUserInfo();
          })
          .catch(err => {
            this.$message.error(err.messages.error.message);
          });
      } else {
        this.$api
          .registerEmail({
            email: this.bindingForm.email,
            link: true,
            ...this.verifyInfo
          })
          .then(res => {
            this.bindingDialog = false;
            this.$message("邮箱绑定成功");
            getUserInfo();
          })
          .catch(err => {
            this.$message.error(err.messages.error.message);
          });
      }
    },
    // 获取验证码
    getCode(el) {
      if (this.bindingOperation == "email") {
        this.$refs["bindingForm"].validateField(["email"], error => {
          if (error) {
            return false;
          } else {
            this.$api
              .registerEmail({
                action: "validateEmailSend",
                email: this.bindingForm.email,
                verifyToken: this.verifyToken
              })
              .then(res => {
                this.$message("验证码已成功发送。");
                this.validCodeFrom = res.messages.data.verifyInfo;
                codeMsg(el);
              })
              .catch(err => {
                if (err.messages.error.code == "verify_required") {
                  this.isAliyun = true;
                  aliyunVerify("", res => {
                    this.isAliyun = false;
                    this.verifyToken = res.messages.data.verifyToken;
                    this.getCode("bindingCode");
                  });
                }
              });
          }
        });
      } else {
        this.$refs["bindingForm"].validateField(["mobile"], error => {
          if (error) {
            return false;
          } else {
            this.$api
              .registerMobile({
                action: "validateMobileSend",
                mobile:
                  "+" + this.bindingForm.country.tel + this.bindingForm.mobile,
                country: this.bindingForm.country.id,
                verifyToken: this.verifyToken,
                sign: "168node"
              })
              .then(res => {
                this.$message("验证码已成功发送。");
                this.validCodeFrom = res.messages.data.verifyInfo;
                codeMsg(el);
              })
              .catch(err => {
                if (err.messages.error.code == "verify_required") {
                  this.isAliyun = true;
                  aliyunVerify("", res => {
                    this.isAliyun = false;
                    this.verifyToken = res.messages.data.verifyToken;
                    this.getCode("bindingCode");
                  });
                }
              });
          }
        });
      }
    },
    // 获取国家
    getCountry(data, formName) {
      if (formName == "register") {
        this.bindingForm.country = data;
      }
    },
    // 解绑点击
    unBindingClick() {
      var loginId = "";
      if (this.unBindingOperation == "mobile") {
        loginId = this.$store.state.info.mobile;
      } else {
        loginId = this.$store.state.info.email;
      }
      this.$api
        .unRegister({
          loginId: loginId,
          loginType: this.unBindingOperation
        })
        .catch(err => {
          try {
            this.verifyId = JSON.parse(err.messages.error.message)[0].verifyId;
          } catch (error) {
            this.$message.error(err.messages.error.message);
          }
        });
    },
    // 解绑邮箱或手机号
    unBinding() {
      var loginId = "";
      if (this.unBindingOperation == "mobile") {
        loginId = this.$store.state.info.mobile;
      } else {
        loginId = this.$store.state.info.email;
      }
      this.$api
        .unRegister({
          loginId: loginId,
          loginType: this.unBindingOperation,
          ...this.verifyInfo
        })
        .then(res => {
          this.unBindingDialog = false;
          this.$message("取消绑定成功");
          getUserInfo();
        })
        .catch(err => {
          try {
            this.verifyId = JSON.parse(err.messages.error.message)[0].verifyId;
          } catch (error) {
            this.$message.error(err.messages.error.message);
          }
        });
    },
    // 发送解绑验证码
    getUnBindingCode(el) {
      this.$api
        .checkCaptcha({
          action: "refresh",
          verifyId: this.verifyId,
          sign: "168node"
        })
        .then(res => {
          this.$message("验证码已成功发送。");
          this.verify = res.messages.data;
          codeMsg(el);
        })
        .catch(err => {
          this.$message.error(err.messages.error.message);
        });
    },
    // 绑定验证码验证
    checkCode(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (this.bindingOperation == "mobile") {
            this.$api
              .registerMobile({
                action: "validateMobileVerify",
                mobile: this.bindingForm.mobile,
                verifyCode: this.bindingForm.verifyCode,
                ...this.validCodeFrom
              })
              .then(res => {
                this.verifyInfo = res.messages.data.verifyInfo;
                this.binding();
              })
              .catch(err => {
                this.$message.error("验证码错误");
              });
          } else {
            this.$api
              .registerEmail({
                action: "validateEmailVerify",
                email: this.bindingForm.email,
                verifyCode: this.bindingForm.verifyCode,
                ...this.validCodeFrom
              })
              .then(res => {
                this.verifyInfo = res.messages.data.verifyInfo;
                this.binding();
              })
              .catch(err => {
                this.$message.error("验证码错误");
              });
          }
        } else {
          return false;
        }
      });
    },
    // 解绑验证码验证
    unBidingCode(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$api
            .checkCaptcha({
              action: "verify",
              verifyCode: this.unBindingForm.verifyCode,
              ...this.verify
            })
            .then(res => {
              this.verifyInfo = res.messages.data;
              this.unBinding();
            })
            .catch(err => {
              this.$message.error("验证码错误");
            });
        } else {
          return false;
        }
      });
    },
    // 重置表单
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  },
  computed: {
    ...mapGetters(["changeInfo"])
  }
};
</script>
<style scoped>
.userInfo {
  padding: 20px;
}
.userInfo .el-form {
  width: 380px;
  margin: 0 auto;
}
.unBinding {
  color: rgba(228, 76, 76, 1);
}
.unBinding:hover {
  cursor: pointer;
}
.OwnerAddr {
  position: relative;
}
.userInfo .textBtn {
  padding: 0;
}
</style>



