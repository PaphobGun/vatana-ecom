<template>
  <div class="main-warpper">
    <a-row v-if="product">
      <a-col :lg="{ span: 12 }">
        <Gallery :item="images" /> 
        <RelatedProduct :products="relatedProducts" />
      </a-col>
      <a-col :lg="{ span: 11, offset: 1 }">
        <Description :item="product" :selectColor="selectColor" />
      </a-col>
    </a-row>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

import ProductList from "../../components/productList";
import Gallery from "../../components/product/Gallery.vue";
import Description from "../../components/product/Description.vue";
import RelatedProduct from '../../components/product/RelatedProduct.vue'

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
      this.getProduct({
        id: this.$route.params,
      }),
      this.getRelatedProducts({
        id: this.$route.params,
      }),
    ]).then((item) => {
      console.log('item', item);
      this.images = item[0].img[0];
    });
  },
  methods: {
    selectColor(index) {
      this.images = this.product.img[index];
    },
    ...mapActions("product", ["getProduct", "getRelatedProducts"]),
  },
  computed: {
    ...mapGetters("product", ["product", "relatedProducts"]),
  },
  watch: {
    getProduct: {
      handler: async function () {
        this.image = this.item.images[0];
      },
      deep: true,
    },
  },
};
</script>

<style lang="less" scoped>
.main-warpper {
  margin-top: 25px;
}
</style>
