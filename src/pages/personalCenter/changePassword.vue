<template>
  <div class="changePassword">
    <el-form
      :model="editPasswordForm"
      ref="editPasswordForm"
      label-position="top"
      size="small"
      hide-required-asterisk
      :rules="editRules"
    >
      <el-form-item label="旧密码" prop="oldPassword">
        <el-input
          v-model="editPasswordForm.oldPassword"
          type="password"
          maxlength="20"
          placeholder="请输入旧密码"
          show-password
        ></el-input>
      </el-form-item>
      <el-form-item label="新密码" prop="newPassword">
        <el-input
          v-model="editPasswordForm.newPassword"
          type="password"
          maxlength="20"
          placeholder="请输入新密码"
          show-password
        ></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="newPassword1">
        <el-input
          v-model="editPasswordForm.newPassword1"
          type="password"
          maxlength="20"
          placeholder="请确认密码"
          show-password
        ></el-input>
      </el-form-item>
      <el-form-item label class="center">
        <button
          type="button"
          class="roundBtn"
          @click="editPassword('editPasswordForm')"
          :disabled="isDisable"
        >确认更改</button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import validate from "@/utils/validate";
import { codeMsg } from "@/utils/comm.js";
import { aliyunVerify } from "@/utils/comm";
export default {
  name: "changePassword",
  data() {
    // 密码验证
    var validatePass = (rule, value, callback) => {
      var reg = /^(?![^a-zA-Z]+$)(?!\D+$)/;
      if (!reg.test(value)) {
        callback(new Error("请输入6-20位带有数字和字母的登录密码"));
      } else {
        if (this.editPasswordForm.newPassword1 !== "") {
          this.$refs.editPasswordForm.validateField("newPassword1");
        }
        callback();
      }
    };
    // 确认密码验证
    var validatePass1 = (rule, value, callback) => {
      if (value !== this.editPasswordForm.newPassword) {
        callback(new Error("密码不一致"));
      } else {
        callback();
      }
    };
    return {
      // 密码修改
      editPasswordForm: {
        oldPassword: "",
        newPassword: "",
        newPassword1: ""
      },
      editRules: {
        oldPassword: [
          { required: true, message: "请输入旧密码", trigger: "blur" },
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
        ],
        newPassword: [
          { required: true, message: "请输入新密码", trigger: "blur" },
          {
            min: 6,
            max: 20,
            message: "请输入6-20位包含数字和字母的密码",
            trigger: "blur"
          },
          { validator: validatePass, trigger: "blur" }
        ],
        newPassword1: [
          { required: true, message: "请确认新密码", trigger: "blur" },
          {
            min: 6,
            max: 20,
            message: "请输入6-20位包含数字和字母的密码",
            trigger: "blur"
          },
          { validator: validatePass1, trigger: "blur" }
        ]
      },
      isDisable: false
    };
  },
  methods: {
    // 修改密码
    editPassword(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.isDisable = true;
          this.$api
            .updatePassword({
              ...this.editPasswordForm
            })
            .then(res => {
              this.isDisable = false;
              this.$message("密码已成功修改。请重新登录。");
              this.$store.dispatch("getInfo", "");
              this.$router.push({ path: "/login" });
            })
            .catch(err => {
              this.isDisable = false;
              this.$message.error(err.messages.error.message);
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
  }
};
</script>
<style scoped>
.changePassword .el-form {
  width: 400px;
  margin: 20px auto;
}
</style>



