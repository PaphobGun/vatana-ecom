<template>
  <div class="pagination-product">
    <a-row>
      <a-col class="group-list" :span="4">
        <div
          class=""
          v-for="(img, idx) in item.images"
          :key="idx"
          @click="() => selectImg(idx)"
        >
          <img class="group-item" :src="img.url" alt="" />
        </div>
      </a-col>
      <a-col :span="19" :offset="1" >
        <img class="product-image" :src="image.url" alt="" />
      </a-col>
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
  },
  watch: {
    item: {
      handler: async function () {
        console.log("==  item =======", this.item);
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
</style>
