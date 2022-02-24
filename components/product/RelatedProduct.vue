<template>
  <div class="main-warpper">
    <div class="related">Related Products</div>
    <a-space direction="vertical" class="pagination-product">
      <ProductCard v-for="(item, idx) in products" :key="idx" :item="item" />
    </a-space>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import ProductCard from "../productList/ProductCard.vue";

export default {
  props: {
    products: {
      type: Object,
      default: () => [],
    },
  },
  components: {
    ProductCard,
  },
  data() {
    return {};
  },
  computed: {},
};
</script>

<style lang="less" scoped>
.main-warpper {
  margin-top: 15px;
}
.pagination-product {
  flex-wrap: wrap;
  flex-direction: row;
}

.related {
  font-size: 24px;
  color: #000000;
}
</style>
