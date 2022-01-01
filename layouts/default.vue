<template>
  <div class="default-layout">
    <a-layout>
      <Navbar />
      <a-layout-content class="default-layout-content"
        ><Nuxt
      /></a-layout-content>
      <a-layout-footer>Footer</a-layout-footer>
    </a-layout>
  </div>
</template>

<script>
import Navbar from "../components/layout/Navbar.vue";

export default {
  components: {
    Navbar,
  },
};
</script>

<style lang="less" scoped>
.default-layout {
  .default-layout-content {
    padding: 0 50px;
    background-color: #fff;
  }
}
</style>
