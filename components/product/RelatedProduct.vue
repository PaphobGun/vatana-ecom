<template>
  <div class="main-warpper">
    <div class="related">Related Products</div>
    <div direction="vertical" class="pagination-product">
      <a-row :gutter="[16, 16]">
        <a-col
          v-for="(item, idx) in customProducts"
          :key="idx"
          :xs="12"
          :sm="12"
          :md="8"
          :lg="6"
        >
          <ProductCard :item="item" />
        </a-col>
      </a-row>
    </div>
  </div>
</template>

<script>
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
  computed: {
    customProducts() {
      return this.products.map((p) => ({
        ...p,
        images: p.img,
      }));
    },
  },
};
</script>

<style lang="less" scoped>
.main-warpper {
  margin-top: 15px;
}
.pagination-product {
  // flex-wrap: wrap;
  // flex-direction: row;
  // display: flex;
}

.related {
  font-size: 24px;
  color: #000000;
}

@media screen and (max-width: 600px) {
  ::v-deep .product-card .top .product-image {
    width: 100%;
  }
}
</style>
