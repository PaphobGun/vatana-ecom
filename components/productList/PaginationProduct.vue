<template>
  <div class="pagination-product">
    <a-row :gutter="[16, 16]">
      <a-col
        v-for="(item, idx) in myProds"
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
    myProds() {
      console.log(this.products);
      return this.products;
    },
    ...mapGetters("products", ["products"]),
  },
};
</script>

<style lang="less" scoped>
.pagination-product {
  // display: flex;
  // flex-wrap: wrap;

  @media only screen and (max-width: 576px) {
    justify-content: center;
  }
}
</style>
