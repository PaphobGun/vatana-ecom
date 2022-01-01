<template>
  <div class="product-list">
    <a-row>
      <a-col :lg="{ span: 4 }"><Filters /></a-col>
      <a-col :lg="{ span: 7, offset: 1 }">WORLD</a-col>
    </a-row>
  </div>
</template>

<script>
import Filters from "./Filters.vue";
export default {
  components: {
    Filters,
  },
};
</script>

<style lang="less" scoped>
.product-list {
  padding: 30px 0;
}
</style>
