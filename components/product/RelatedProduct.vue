<template>
  <div class="main-warpper">
    <div class="related">Related Products</div>
    <div  direction="vertical" class="pagination-product">
      <ProductCard
  
        v-for="(item, idx) in products"
        :key="idx"
        :item="item"
      />
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import ProductCard from "../productList/ProductCard.vue";

export default {
  props: {
    products: {
      type: Array,
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
  display: flex;
}

.related {
  font-size: 24px;
  color: #000000;
}

@media screen and (max-width: 600px) {
  ::v-deep .product-card .top .product-image {
    width: 100%;
  }

  .product-card {
    width: 43%;
  }
}
</style>
