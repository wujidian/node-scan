<template>
  <div class="fundPassword">
    <el-form
      :model="addFundPasswordForm"
      :rules="addFundPasswordRules"
      ref="addFundPasswordForm"
      label-position="top"
      size="small"
      hide-required-asterisk
    >
      <el-form-item label="新资金密码" prop="fundPassword">
        <el-input
          v-model="addFundPasswordForm.fundPassword"
          placeholder="6位数字资金密码"
          maxlength="6"
          type="password"
          show-password
        ></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="confirmPassword">
        <el-input
          v-model="addFundPasswordForm.confirmPassword"
          placeholder="请再次输入资金密码"
          maxlength="6"
          type="password"
          show-password
        ></el-input>
      </el-form-item>
      <el-form-item label="短信验证码" prop="code" v-if="$store.state.info.hasMobile && mode =='mobile'">
        <el-row>
          <el-col :span="17">
            <el-input v-model="addFundPasswordForm.code" placeholder="请输入验证码" maxlength="6"></el-input>
          </el-col>
          <el-col :span="7" class="right">
            <button
              type="button"
              class="roundBtn rimBtn"
              id="SMSBtn"
              @click="getFundPasswordCode('SMSBtn')"
            >发送验证码</button>
          </el-col>
        </el-row>
        <div>
          <button
            type="button"
            class="textBtn"
            v-show="$store.state.info.hasEmail"
            @click="mode ='email'"
          >切换邮箱验证</button>
        </div>
      </el-form-item>
      <el-form-item label="邮箱验证码" prop="code" v-if="$store.state.info.hasEmail && mode =='email'">
        <el-row>
          <el-col :span="17">
            <el-input v-model="addFundPasswordForm.code" placeholder="请输入验证码" maxlength="6"></el-input>
          </el-col>
          <el-col :span="7" class="right">
            <button
              type="button"
              class="roundBtn rimBtn"
              id="mailboxBtn"
              @click="getFundPasswordCode('mailboxBtn')"
            >发送验证码</button>
          </el-col>
        </el-row>
        <div>
          <button
            type="button"
            class="textBtn"
            v-show="$store.state.info.hasMobile"
            @click="mode ='mobile'"
          >切换短信验证</button>
        </div>
      </el-form-item>
      <el-form-item label class="center">
        <button
          type="button"
          class="roundBtn"
          @click="editFundPassword('addFundPasswordForm')"
          :disabled="isDisable"
        >确认更改</button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import validate from "@/utils/validate";
import { codeMsg } from "@/utils/comm.js";
import { mapGetters } from "vuex";
import { getUserInfo } from "@/utils/comm";
export default {
  name: "fundPassword",
  data() {
    // 确认密码验证
    var validatePass = (rule, value, callback) => {
      if (value !== this.addFundPasswordForm.fundPassword) {
        callback(new Error("密码不一致"));
      } else {
        callback();
      }
    };
    return {
      addFundPasswordForm: {
        fundPassword: "",
        confirmPassword: "",
        code: ""
      },
      addFundPasswordRules: {
        fundPassword: [
          { required: true, message: "请输入资金密码", trigger: "blur" },
          {
            validator: validate.FormValidate.Form().checkCode,
            trigger: "blur"
          }
        ],
        confirmPassword: [
          { required: true, message: "请确认密码", trigger: "blur" },
          {
            validator: validate.FormValidate.Form().checkCode,
            trigger: "blur"
          },
          { validator: validatePass, trigger: "blur" }
        ],
        code: [
          { required: true, message: "请输入验证码", trigger: "blur" },
          {
            validator: validate.FormValidate.Form().checkCode,
            trigger: "blur"
          }
        ]
      },
      mode: this.$store.state.info.hasMobile ? "mobile" : "email",
      isDisable: false
    };
  },
  methods: {
    // 资金密码验证码
    getFundPasswordCode(el) {
      let errCount = 0;
      let errArr = [];
      this.$refs["addFundPasswordForm"].validateField(
        ["fundPassword", "confirmPassword"],
        error => {
          if (error) {
            return false;
          } else {
            errArr.push(!error);
            errCount++;
            if (errCount == 2) {
              this.$api
                .sendFundCode({
                  sessionId: localStorage.getItem("passport"),
                  type: this.mode
                })
                .then(res => {
                  codeMsg(el);
                  this.$message("验证码发送成功");
                })
                .catch(err => {
                  this.$message.error(err.message);
                });
            }
          }
        }
      );
    },
    // 修改资金密码
    editFundPassword(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.isDisable = true;
          this.$api
            .updateFundPassword({
              sessionId: localStorage.getItem("passport"),
              code: this.addFundPasswordForm.code,
              payPassword: this.addFundPasswordForm.fundPassword
            })
            .then(res => {
              this.isDisable = false;
              this.$message("资金密码修改成功");
              this.resetForm("addFundPasswordForm");
              getUserInfo();
            })
            .catch(err => {
              this.isDisable = false;
              this.$message.error(err.message);
              this.resetForm("addFundPasswordForm");
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
  mounted() {},
  computed: {
    ...mapGetters(["changeInfo"])
  },
  watch: {
    changeInfo(val, old) {
      this.mode = this.$store.state.info.hasMobile ? "mobile" : "email";
    }
  }
};
</script>
<style scoped>
.fundPassword .el-form {
  width: 400px;
  margin: 20px auto;
}
.fundPassword .textBtn {
  padding: 0;
}
</style>



