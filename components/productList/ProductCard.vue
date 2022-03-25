<template>
  <div class="product-card">
    <div class="top">
      <nuxt-link :to="`/product/${item.id}`">
        <img class="product-image" :src="selectedColor.url" alt="" />
      </nuxt-link>
      <div class="colors">
        <div
          class="color-item"
          v-for="(color, cidx) in item.images"
          :key="cidx"
          :style="{ 'background-color': color.color }"
          @click="() => selectColor(color)"
        />
      </div>
    </div>
    <div class="bottom">
      <div class="name">
        {{ item.name }}
      </div>
      <div class="size-wrapper">
        <div class="size-item" v-for="(size, idx) in item.sizes" :key="idx">
          {{ size }}
        </div>
      </div>
      <div class="price">{{ item.price }} ฿</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      selectedColor: {},
    };
  },
  created() {
    console.log(this.item);
    this.selectedColor = this.item.images[0];
  },
  methods: {
    selectColor(color) {
      this.selectedColor = color;
    },
  },
};
</script>

<style lang="less" scoped>
.product-card {
  border-radius: 4px;
  border: 1px solid #f1f1f1;
  margin-right: 16px;
  margin-bottom: 16px;
  width: 190px;

  .top {
    position: relative;
    .product-image {
      width: 100%;
    }

    .colors {
      position: absolute;
      bottom: 10px;
      left: 10px;
      display: flex;
      flex-wrap: wrap;

      .color-item {
        cursor: pointer;
        margin-right: 5px;
        width: 20px;
        height: 20px;
        box-shadow: 0px 3px 6px #00000029;
        border-radius: 4px;
      }
    }
  }

  .bottom {
    padding: 10px;

    .name {
      font-size: 16px;
      color: #000;
      margin-bottom: 10px;
      font-weight: 300;
    }

    .size-wrapper {
      display: flex;
      flex-wrap: wrap;

      .size-item {
        border: 1px solid #000;
        border-radius: 2px;
        margin-right: 5px;
        padding: 3px;
        text-align: center;
        font-size: 10px;
      }
    }

    .price {
      margin-top: 10px;
      font-size: 16px;
      color: #000;
    }
  }

  @media only screen and (max-width: 576px) {
    max-width: 135px;

    .top {
      .product-image {
        width: 100%;
      }
    }

    .bottom {
      .name {
        font-size: 14px;
      }
    }
  }
}
</style>
