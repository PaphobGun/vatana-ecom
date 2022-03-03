<template>
  <div class="pagination-product">
    <a-row>
      <a-col v-if="!isMobile && !isTablet" class="group-list" :lg="{ span: 4 }" :md="{ span: 4 }">
        <div
          class=""
          v-for="(img, idx) in item.images"
          :key="idx"
          @click="() => selectImg(idx)"
        >
          <img class="group-item" :src="img.url" alt="" />
        </div>
      </a-col>
      <a-col :lg="{ span: 19 }" :md="{ span: 19 }" :offset="1">
        <img class="product-image" :src="image.url" alt="" />
      </a-col>
      <div v-if="isMobile || isTablet" :sm="{ span: 24 }" class="group-warpper">
        <a-row
          class=""
          v-for="(img, idx) in item.images"
          :key="idx"
          @click="() => selectImg(idx)"
        >
          <img class="group-item" :src="img.url" alt="" />
        </a-row>
      </div>
    </a-row>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  props: {
    item: {
      type: Object,
      default: () => {},
    },
  },
  components: {},
  data() {
    return {
      image: {
        url: "",
      },
    };
  },
  created() {
    // this.image = this.product.images[0];
  },
  methods: {
    selectImg(index) {
      this.image = this.item.images[index];
    },
  },
  computed: {
    ...mapGetters("product", ["product"]),
    ...mapGetters("common", ["isMobile", "dimension", "isTablet"]),
  },
  watch: {
    item: {
      handler: async function () {
        this.image = this.item.images[0];
      },
      deep: true,
    },
  },
};
</script>

<style lang="less" scoped>
.pagination-product {
  display: flex;
  flex-wrap: wrap;
}

.group-list {
  height: 500px;
  overflow: scroll;

  .group-item {
    height: auto;
    width: 100%;
    padding: 5px;
  }
}

.product-image {
  width: 100%;
  height: 500px;
}

@media screen and (max-width: 768px) {

  .group-warpper {
    display: flex;
    overflow: scroll;
    width: calc(100vw - 100px);
    margin-top: 15px;
  }
  .group-list {
    height: 50px;
  }

  .group-item {
    width: 80px;
    padding: 5px;
  }

  .product-image {
    width: calc(100vw - 100px);
    height: auto;
  }
}
</style>
