<template>
  <div class="main-warpper">
    <div class="container">
      <a-row v-if="product">
        <a-col :lg="{ span: 12 }" :xs="24" :sm="{ span: 24 }">
          <Gallery :item="images" />
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
      images: {},
    };
  },
  async created() {
    await Promise.all([
      this.getProduct(this.$route.params.id),
      this.getRelatedProducts({
        id: this.$route.params,
      }),
    ]);
    this.images = this.product;
  },
  methods: {
    selectColor(index) {
      // this.images = this.product.img[index];
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
