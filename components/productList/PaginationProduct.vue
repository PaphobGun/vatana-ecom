<template>
  <div class="pagination-product">
    <ProductCard v-for="(item, idx) in products" :key="idx" :item="item" />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import ProductCard from "./ProductCard.vue";

export default {
  components: {
    ProductCard,
  },
  data() {
    return {};
  },
  computed: {
    ...mapGetters("products", ["products"]),
  },
};
</script>

<style lang="less" scoped>
.pagination-product {
  display: flex;
  flex-wrap: wrap;

  @media only screen and (max-width: 576px) {
    justify-content: center;
  }
}
</style>
