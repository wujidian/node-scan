<template>
  <div>
    <el-dialog
      :visible.sync="visible"
      width="400px"
      :close-on-click-modal="false"
      @close="$emit('update:show', false)"
      class="dialogTitle"
    >
      <div slot="title" class="header-title">
        <span class="title-age">提示</span>
      </div>
      <span>{{text}}</span>
      <span slot="footer" class="dialog-footer">
        <button type="button" class="roundBtn rimBtn" @click="visible = false;">取 消</button>
        <button type="button" class="roundBtn" @click="visible = false;$router.push(path)">确 定</button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "verifiedDiglog",
  props: {
    show: {
      type: Boolean,
      default: false
    },
    text: {
      type: String,
      default: ""
    },
    path: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      visible: this.show
    };
  },
  watch: {
    show() {
      this.visible = this.show;
    }
  }
};
</script>
