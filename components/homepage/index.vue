<template>
  <div class="homepage">
    <div class="container">
      <a-row class="homepage__banners" :gutter="[16, 16]">
        <a-col
          class="homepage__banners__item"
          v-for="(b, idx) in banner"
          :key="b.id"
          :xs="idx === 0 ? { span: 24 } : { span: 12 }"
          :lg="idx === 0 ? { span: 12 } : { span: 6 }"
        >
          <nuxt-link :to="`/products?collection=${b.id}`">
            <img
              :src="b.image_url"
              alt="img"
              class="homepage__banners__item__pic"
            />
          </nuxt-link>
        </a-col>
      </a-row>
      <div class="homepage__category__top">
        <h1 class="title">Shop by Categories</h1>
        <nuxt-link to="/products" class="link"> View all </nuxt-link>
      </div>
      <a-row class="homepage__category" :gutter="[16, 16]">
        <a-col
          class="homepage__category__item"
          v-for="c in category"
          :key="c.id"
          :xs="12"
          :lg="4"
        >
          <nuxt-link :to="`/products?category=${c.id}`">
            <img
              :src="c.image_url"
              alt="img"
              class="homepage__category__item__pic"
            />
          </nuxt-link>
        </a-col>
        <!-- <div class="homepage__category__carousel">
          <Carousel
            :slidesToShow="4"
            :images="category.items.map((c) => c.img)"
          />
        </div> -->
      </a-row>
      <div class="homepage__featured__top">
        <h1 class="title">Featured Products</h1>
        <nuxt-link to="/products" class="link"> View all </nuxt-link>
      </div>
      <a-row
        class="homepage__featured"
        v-if="featuredProduct.length"
        :gutter="[16, 16]"
      >
        <a-col
          v-for="p in featuredProduct"
          :key="p.id"
          class="homepage__featured__item"
          :xs="12"
          :lg="4"
        >
          <nuxt-link :to="`/product/${p.id}`">
            <img
              v-if="!_.isEmpty(p.image)"
              :src="p.image.url"
              atl="img"
              class="homepage__featured__item__pic"
            />
          </nuxt-link>
        </a-col>
      </a-row>
      <div class="homepage__sales__top">
        <h1 class="title">Sales Products</h1>
        <nuxt-link to="/products?is_discount=true" class="link">
          View all
        </nuxt-link>
      </div>
      <a-row class="homepage__sales" :gutter="[16, 16]">
        <a-col
          class="homepage__sales__item"
          v-for="s in salesProduct"
          :key="s.id"
          :xs="12"
          :lg="4"
        >
          <nuxt-link :to="`product/${s.id}`">
            <img
              v-if="!_.isEmpty(s.image)"
              :src="s.image.url"
              alt="img"
              class="homepage__sales__item__pic"
            />
          </nuxt-link>
          <div class="discount">{{ s.discount }} %</div>
        </a-col>
      </a-row>
      <div class="homepage__lookbook__top">
        <h1 class="title">Lookbooks</h1>
        <nuxt-link to="lookbooks" class="link"> View all </nuxt-link>
      </div>
      <a-row :gutter="[16, 16]">
        <a-col
          class="homepage__lookbook__item"
          v-for="l in lookbook"
          :key="l.id"
          :sm="12"
          :lg="8"
        >
          <nuxt-link :to="`/lookbooks/${l.id}`">
            <img
              :src="l.image_url"
              alt="img"
              class="homepage__lookbook__item__pic"
            />
          </nuxt-link>
        </a-col>
      </a-row>
    </div>
    <banner-modal
      :isShow="isShowBannerModal"
      :onClose="closeBannerModal"
      image="banner-line.png"
    />
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

import Carousel from "../common/Carousel.vue";
import BannerModal from "@/components/common/BannerModal.vue";

export default {
  components: {
    Carousel,
    BannerModal,
  },
  data() {
    return {
      isShowBannerModal: true,
    };
  },
  async created() {
    this.getHomepage();
  },
  computed: {
    ...mapGetters("homepage", [
      "banner",
      "category",
      "featuredProduct",
      "salesProduct",
      "lookbook",
    ]),
  },
  methods: {
    closeBannerModal() {
      this.isShowBannerModal = false;
    },
    ...mapActions("homepage", ["getHomepage"]),
  },
};
</script>

<style lang="less" scoped>
.homepage {
  padding-top: 30px;
  padding-bottom: 30px;

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

  .container {
    margin: 0 auto;
  }

  &__banners {
    &__item {
      cursor: pointer;

      &__pic {
        border-radius: 4px;
        width: 100%;
        // height: 260px;
      }
    }
  }

  &__category {
    &__top {
      margin-top: 40px;
      margin-block: 16px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    &__item {
      cursor: pointer;
      &__pic {
        border-radius: 4px;
        width: 100%;
        height: 160px;
      }
    }
  }

  &__featured {
    &__top {
      margin-top: 40px;
      margin-block: 16px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    &__item {
      cursor: pointer;
      &__pic {
        border-radius: 4px;
        width: 100%;
        max-height: 160px;
      }
    }
  }

  &__sales {
    &__top {
      margin-top: 40px;
      margin-block: 16px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    &__item {
      cursor: pointer;
      position: relative;
      &__pic {
        border-radius: 4px;
        width: 100%;
        max-height: 160px;
      }

      .discount {
        color: #fff;
        background-color: #ec4949;
        font-size: 14px;
        position: absolute;
        padding: 8px;
        top: 10%;
        left: -1%;
      }
    }
  }

  &__lookbook {
    &__top {
      margin-top: 40px;
      margin-block: 16px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    &__item {
      cursor: pointer;
      position: relative;
      &__pic {
        border-radius: 4px;
        width: 100%;
        max-height: 540px;
      }
    }
  }

  @media (max-width: 450px) {
    .title {
      font-size: 24px;
    }
  }
}
</style>
