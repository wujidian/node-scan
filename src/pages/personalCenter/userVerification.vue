<template>
  <div class="userIdentityVerification">
    <el-form
      :model="form"
      :rules="formRules"
      ref="form"
      size="small"
      label-position="top"
      hide-required-asterisk
    >
      <el-form-item label="姓名" prop="name">
        <el-input v-model="form.name" placeholder="请输入姓名" maxlength="20"></el-input>
      </el-form-item>
      <el-form-item label="身份证号" prop="idCard">
        <el-input v-model="form.idCard" placeholder="请输入身份证号" maxlength="30"></el-input>
      </el-form-item>
      <el-row :gutter="10">
        <el-col :span="12">
          <el-form-item prop="idImageFront">
            <el-upload
              class="idUploader"
              :action="' '"
              :show-file-list="false"
              :auto-upload="false"
              accept=".jpg, .jpeg, .png, .JPG, .JPEG, .bmp, .BMP"
              :on-change="(file, fileList) => {handleImgChange(file, fileList,'idImageFront')}"
            >
              <div v-if="!form.idImageFront" style="center">请上传身份证正面</div>
              <img v-if="form.idImageFront" :src="form.idImageFront" class="avatar" />
            </el-upload>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item prop="idImageBack">
            <el-upload
              class="idUploader"
              :action="' '"
              :show-file-list="false"
              :auto-upload="false"
              accept=".jpg, .jpeg, .png, .JPG, .JPEG, .bmp, .BMP"
              :on-change="(file, fileList) => {handleImgChange(file, fileList,'idImageBack')}"
            >
              <div>
                <img v-if="form.idImageBack" :src="form.idImageBack" class="avatar" />
                <div v-if="!form.idImageBack" class="center">请上传身份证反面</div>
              </div>
            </el-upload>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item class="center">
        <button
          type="button"
          class="roundBtn"
          @click="submitVerification('form')"
          v-show="($store.state.info.isRealNameAuth !== 1 &&  isResubmit) || ($store.state.info.isRealNameAuth == -1 &&  isResubmit) || ($store.state.info.isRealNameAuth == 0)"
          :disabled="verificationDisabled"
        >提交审核</button>
      </el-form-item>
    </el-form>
    <div class="center" v-show="$store.state.info.isRealNameAuth == 1 ">
      <div class="authSucee">认证成功</div>
    </div>
    <div class="center" v-show="$store.state.info.isRealNameAuth == -1  && !isResubmit">
      <button type="button" class="authError" @click="isResubmit = true">认证失败，请重新提交</button>
    </div>
  </div>
</template>

<script>
import { getUserInfo } from "@/utils/comm.js";
export default {
  name: "userVerification",
  data() {
    return {
      form: {
        name: "",
        idCard: "",
        idImageBack: "",
        idImageFront: ""
      },
      formRules: {
        name: [{ required: true, message: "姓名不能为空", trigger: "blur" }],
        idCard: [
          { required: true, message: "身份证号不能为空", trigger: "blur" },
          {
            pattern: /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X)$)/,
            message: "身份证号格式错误",
            trigger: "blur"
          }
        ],
        idImageBack: [
          { required: true, message: "请上传身份证背面", trigger: "blur" }
        ],
        idImageFront: [
          { required: true, message: "请上传身份证正面", trigger: "blur" }
        ]
      },
      isResubmit: false,
      verificationDisabled: false
    };
  },
  methods: {
    // 图片上传回调
    handleImgChange(file, fileList, type) {
      const isImage =
        file.raw.type.indexOf("image") == 0 &&
        /\.(?:jpg|png|bmp)$/.test(file.name);
      const isLt4M = file.size / 1024 / 1024 < 4;
      if (!isImage) {
        this.$message.error("上传图片只能是JPG、PNG、BMP格式!");
        return false;
      }
      let reader = new FileReader();
      reader.readAsDataURL(file.raw);
      reader.onload = event => {
        var txt = event.target.result;
        if (!isLt4M) {
          let proportion = (3.8 * 1024 * 1024) / file.size;
          var img = document.createElement("img");
          img.src = txt;
          img.onload = () => {
            let data = this.compress(img, proportion);
            this.form[type] = data;
          };
        } else {
          this.form[type] = txt;
        }
      };
    },
    // 压缩图片
    compress(img, size) {
      let initSize = img.src.length;
      let width = img.width * size;
      let height = img.height * size;
      let canvas = document.createElement("canvas");
      let ctx = canvas.getContext("2d");
      canvas.width = width;
      canvas.height = height;
      ctx.fillStyle = "#fff";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0, width, height);
      let ndata = canvas.toDataURL("image/jpeg");
      return ndata;
    },
    // 认证提交
    submitVerification(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.verificationDisabled = true;
          this.$api
            .uerVerity({
              sessionId: localStorage.getItem("passport"),
              ...this.form
            })
            .then(res => {
              getUserInfo(isTrue => {
                if (isTrue) {
                  this.verificationDisabled = false;
                  if (res.data[0]) {
                    // 认证成功
                    this.isResubmit = true;
                    this.$refs[formName].resetFields();
                  } else {
                    this.$message.error("认证失败，请检查认证信息");
                    this.isResubmit = false;
                  }
                }
              });
            })
            .catch(err => {
              this.verificationDisabled = false;
              this.$message.error(err.message);
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
.userIdentityVerification {
  padding: 50px 25%;
}
.tips {
  color: rgba(52, 93, 204, 1);
  padding: 5px 0 30px 0;
}
.userIdentityVerification .el-form {
  width: 420px;
  margin: 0 auto;
}
.idUploader {
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  border: 2px solid rgba(240, 240, 240, 1);
  height: 131px;
  line-height: 131px;
  color: rgba(73, 150, 255, 1);
}
.idUploader:hover {
  border-color: rgba(73, 150, 255, 1);
}
.authSucee {
  color: rgba(73, 150, 255, 1);
}
.authError {
  border: none;
  border-bottom: 1px solid rgba(73, 150, 255, 1);
  color: rgba(73, 150, 255, 1);
  outline: none;
  background: transparent;
  cursor: pointer;
}
</style>
<style >
.el-upload {
  width: 100%;
  height: 100%;
}
.avatar {
  max-width: 100%;
}
</style>

