<template>
  <div class="contactUsComp">
    <img src="/static/image/advantage3.png" width="40" class="contactUsIcon" />
    <img src="/static/image/poolUser.png" width="124" class="contactUsQr" />
  </div>
</template>

<script>
export default {
  name: "contactUsComp"
};
</script>
<style scoped>
.contactUsComp {
  position: fixed;
  right: 0;
  top: 70%;
  transform: translateY(-70%);
  background: rgba(244, 249, 252, 1);
  width: 73px;
  height: 80px;
  line-height: 80px;
  vertical-align: middle;
  text-align: center;
  cursor: pointer;
}
.contactUsQr {
  position: absolute;
  top: 50%;
  right: 70px;
  transform: translateY(-50%);
  display: none;
  margin: 0;
}
.contactUsComp:hover .contactUsQr {
  display: block;
}
</style>

