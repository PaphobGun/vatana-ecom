<template>
  <div class="promotion">
    <div class="container mx-auto">
      <a-row>
        <a-col :span="24">
          <div class="promotion__banner">
            <img :src="bannerImg" alt="" class="promotion__banner__img" />
          </div>
        </a-col>
      </a-row>
      <div class="mt-20 promotion__product">
        <h1 class="title">Products</h1>
        <nuxt-link to="/products" class="link"> View all </nuxt-link>
      </div>
      <div class="mt-20">
        <a-row :gutter="[16, 16]">
          <a-col
            v-for="(item, idx) in products"
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
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import ProductCard from "@/components/productList/ProductCard.vue";

export default {
  components: {
    ProductCard,
  },
  created() {
    this.getPromotion();
  },
  computed: {
    ...mapGetters("promotion", ["products", "bannerImg"]),
  },
  methods: {
    ...mapActions("promotion", ["getPromotion"]),
  },
};
</script>

<style lang="less" scoped>
.promotion {
  .container {
    padding-top: 40px;
    padding-bottom: 40px;
  }

  &__banner {
    &__img {
      width: 100%;
    }
  }

  &__product {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .title {
      font-size: 32px;
      font-weight: 300;
      line-height: 1;
      margin-bottom: 0;
    }

    .link {
      color: #000;
      text-decoration: underline;
      font-size: 16px;
      font-weight: 300;
    }
  }
}
</style>
