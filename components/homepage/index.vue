<template>
  <div class="homepage">
    <div class="container">
      <a-row class="homepage__banners" :gutter="[16, 16]">
        <a-col
          class="homepage__banners__item"
          v-for="(b, idx) in banner.items"
          :key="b.uuid"
          :xs="idx === 0 ? { span: 24 } : { span: 12 }"
          :lg="idx === 0 ? { span: 12 } : { span: 6 }"
        >
          <img :src="b.img" alt="img" class="homepage__banners__item__pic" />
        </a-col>
      </a-row>
      <div class="homepage__category__top">
        <h1 class="title">Shop by Categories</h1>
        <nuxt-link to="" class="link"> View all </nuxt-link>
      </div>
      <a-row class="homepage__category" :gutter="[16, 16]">
        <a-col
          class="homepage__category__item"
          v-for="c in category.items"
          :key="c.uuid"
          :xs="12"
          :lg="4"
        >
          <img :src="c.img" alt="img" class="homepage__category__item__pic" />
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
        <nuxt-link to="" class="link"> View all </nuxt-link>
      </div>
      <a-row
        class="homepage__featured"
        v-if="featuredProduct.items.length"
        :gutter="[16, 16]"
      >
        <a-col class="homepage__featured__item" :xs="24" :lg="12">
          <img
            :src="featuredProduct.items[0].img"
            atl="img"
            class="homepage__featured__item__pic"
          />
        </a-col>
        <a-col :xs="24" :lg="12">
          <a-row :gutter="[16, 16]">
            <a-col class="homepage__featured__item" :span="12">
              <img
                :src="featuredProduct.items[1].img"
                atl="img"
                class="homepage__featured__item__pic"
              />
            </a-col>
            <a-col class="homepage__featured__item" :span="12">
              <img
                :src="featuredProduct.items[2].img"
                atl="img"
                class="homepage__featured__item__pic"
              />
            </a-col>
          </a-row>
          <a-row :gutter="[16, 16]">
            <a-col class="homepage__featured__item" :span="12">
              <img
                :src="featuredProduct.items[3].img"
                atl="img"
                class="homepage__featured__item__pic"
              />
            </a-col>
            <a-col class="homepage__featured__item" :span="12">
              <img
                :src="featuredProduct.items[4].img"
                atl="img"
                class="homepage__featured__item__pic"
              />
            </a-col>
          </a-row>
        </a-col>
      </a-row>
      <div class="homepage__sales__top">
        <h1 class="title">Sales Products</h1>
        <nuxt-link to="" class="link"> View all </nuxt-link>
      </div>
      <a-row class="homepage__sales" :gutter="[16, 16]">
        <a-col
          class="homepage__sales__item"
          v-for="s in salesProduct.items"
          :key="s.uuid"
          :sm="12"
          :lg="8"
        >
          <img :src="s.img" alt="img" class="homepage__sales__item__pic" />
          <div class="discount">{{ s.discount }} %</div>
        </a-col>
      </a-row>
      <div class="homepage__lookbook__top">
        <h1 class="title">Lookbooks</h1>
        <nuxt-link to="" class="link"> View all </nuxt-link>
      </div>
      <a-col
        class="homepage__lookbook__item"
        v-for="l in lookbook.items"
        :key="l.uuid"
        :sm="12"
        :lg="8"
      >
        <img :src="l.img" alt="img" class="homepage__lookbook__item__pic" />
      </a-col>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import Carousel from "../common/Carousel.vue";

export default {
  components: {
    Carousel,
  },
  created() {
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
        height: 260px;
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
