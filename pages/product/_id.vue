<template>
  <div class="main-warpper">
    <div class="container">
      <a-row v-if="product" :gutter="[8, 8]">
        <a-col :lg="{ span: 12 }" :xs="24" :sm="{ span: 24 }">
          <Gallery :item="customProduct" />
          <div class="related-top">
            <RelatedProduct :products="relatedProducts" />
          </div>
        </a-col>
        <a-col :lg="{ span: 12 }" :xs="24" :sm="24">
          <Description :item="product" :selectColor="selectColor" />
        </a-col>
      </a-row>
      <div class="related-bottom">
        <RelatedProduct :products="relatedProducts" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

import ProductList from "../../components/productList";
import Gallery from "../../components/product/Gallery.vue";
import Description from "../../components/product/Description.vue";
import RelatedProduct from "../../components/product/RelatedProduct.vue";

export default {
  components: {
    ProductList,
    Gallery,
    Description,
    RelatedProduct,
  },
  data() {
    return {
      data: "",
      images: [],
      customProduct: {},
    };
  },
  async created() {
    await Promise.all([
      this.getProduct(this.$route.params.id),
      this.getRelatedProducts(this.$route.params.id),
    ]);
    this.customProduct = {
      ...this._.cloneDeep(this.product),
      images: this.product.images.filter(
        (i) => i.color_id === this.product.images[0].color_id
      ),
    };
  },
  methods: {
    selectColor(color_id) {
      this.customProduct = {
        ...this.customProduct,
        images: this.product.images.filter((i) => i.color_id === color_id),
      };
    },
    ...mapActions("product", ["getProduct", "getRelatedProducts"]),
  },
  computed: {
    ...mapGetters("product", ["product", "relatedProducts"]),
    ...mapGetters("common", ["isMobile", "isTablet"]),
  },
};
</script>

<style lang="less" scoped>
.main-warpper {
  margin-top: 25px;

  .container {
    margin-left: auto;
    margin-right: auto;
  }

  .related-bottom {
    display: none;
  }

  @media (max-width: 991px) {
    .related-top {
      display: none;
    }

    .related-bottom {
      display: block;
    }
  }
}
</style>
