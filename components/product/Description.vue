<template>
  <div v-if="item" class="">
    <div class="name">
      {{ item.name }}
    </div>
    <div class="description">
      {{ item.description }}
    </div>
    <div class="price">{{ item.price }} ฿</div>
    <hr />
    <div class="size">
      <div class="size-name">Size</div>
      <div class="size-wrapper">
        <div
          @click="() => onClickSize(size.size_id)"
          class="size-item"
          :class="{ active: size_id === size.size_id }"
          v-for="(size, idx) in item.sizes"
          :key="idx"
        >
          {{ size.label }}
        </div>
      </div>
    </div>
    <div class="colors-warpper">
      <div class="size-name">Color</div>
      <div class="colors">
        <div
          class="color-item"
          :class="{ active: color.color_id === color_id }"
          v-for="(color, cidx) in item.images"
          :key="cidx"
          :style="{
            'background-color': color.color,
            display: color.is_main ? 'block' : 'none',
          }"
          @click="() => onClickColor(color.color_id)"
        />
      </div>
    </div>
    <hr />
    <!-- <div class="flex-wrap">
      <a-row class="flex-wrap center" style="">
        <a-row class="flex-wrap">
          <div class="input-bt input-bt-add" style="" v-on:click="add()">+</div>
          <div class="input-bt input-bt-qty" type="text">
            <div class="count-text-cart">
              {{ qty }}
            </div>
          </div>
          <div class="input-bt input-bt-remove" style="" v-on:click="remove()">
            -
          </div>
          <button
            @click="addToCart"
            :disabled="!size_id || !color_id"
            class="button-add"
            v-if="isLoggedIn"
          >
            ADD TO CART
          </button>
          <div class="fav-item">
            <font-awesome-icon class="social-item" icon="fa-solid fa-heart" />
          </div>
        </a-row>
      </a-row>
    </div>
    <hr /> -->
    <div></div>
    <div>SKU: {{ item.sku }}</div>
    <div>Category: {{ item.category }}</div>
    <div>Tag: {{ getTag() }}</div>
    <hr />
    <a-collapse>
      <template #expandIcon="props">
        <a-icon type="caret-right" :rotate="props.isActive ? 90 : 0" />
      </template>
      <a-collapse-panel :showArrow="false" key="0" header="Size Guide">
        <div class="size-guide">
          <div class="button-row">
            <div
              class="inch"
              :class="{ active: unit === 'inch' }"
              @click="() => activeUnit('inch')"
            >
              INCH
            </div>
            <div
              class="cm"
              :class="{ active: unit === 'cm' }"
              @click="() => activeUnit('cm')"
            >
              CM
            </div>
          </div>
          <a-table
            :pagination="false"
            bordered
            row-key="size_id"
            :columns="columns"
            :data-source="item.size_guides"
          >
          </a-table>
        </div>
      </a-collapse-panel>
      <a-collapse-panel :showArrow="false" key="1" header="Product Detail">
        <p>{{ item.description }}</p>
      </a-collapse-panel>
      <a-collapse-panel
        :showArrow="false"
        key="2"
        header="Additional Information"
      >
        <p>{{ item.additional }}</p>
      </a-collapse-panel>
      <a-collapse-panel key="3" :showArrow="false" header="More information">
        <p>{{ item.moreinformation }}</p>
      </a-collapse-panel>
    </a-collapse>
    <!-- <div class="shared-main">
      <div class="shared">Shared</div>
      <a-row class="social-wrapper">
        <font-awesome-icon
          class="social-item"
          icon="fa-brands fa-sm fa-facebook-f"
        />
        <font-awesome-icon
          class="social-item"
          icon="fa-brands fa-sm fa-twitter"
        />
        <font-awesome-icon
          class="social-item"
          icon="fa-brands fa-sm fa-instagram"
        />
        <font-awesome-icon
          class="social-item"
          icon="fa-brands fa-sm fa-facebook-messenger"
        />
      </a-row>
    </div> -->
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

import ProductList from "../../components/productList";
import Gallery from "../../components/product/Gallery.vue";

export default {
  props: {
    item: {
      type: Object,
      default: () => {},
    },
    selectColor: {
      type: Function,
      default: () => {},
    },
  },
  components: {
    ProductList,
    Gallery,
  },
  data() {
    return {
      data: "",
      images: {},
      qty: 1,
      size_id: "",
      color_id: "",
      unit: "inch",
    };
  },
  computed: {
    columns() {
      return [
        {
          dataIndex: "size",
          key: "size",
          title: "Size",
        },
        {
          dataIndex: `chest_${this.unit}`,
          key: "chest_inch",
          title: "Chest",
        },
        {
          dataIndex: `length_${this.unit}`,
          key: "length_inch",
          title: "Length",
        },
      ];
    },
    ...mapGetters("product", ["product"]),
    ...mapGetters("auth", ["isLoggedIn"]),
  },
  methods: {
    activeUnit(_unit) {
      this.unit = _unit;
    },
    add() {
      this.qty = this.qty + 1;
    },
    remove() {
      if (this.qty > 1) this.qty = this.qty - 1;
    },
    getTag() {
      if (this.item.tags) return this.item.tags.toString();
    },
    onClickColor(_color_id) {
      this.color_id = _color_id;
      this.selectColor(_color_id);
    },
    onClickSize(_size_id) {
      this.size_id = _size_id;
    },
    async addToCart() {
      if (!this.size_id || !this.color_id) {
        return;
      }
      await this.addCartItem({
        amount: this.qty,
        product_id: this.item.id,
        size_id: this.size_id,
        color_id: this.color_id,
      });
      await this.getCartItems();
      this.setIsShowCart(true);
    },
    ...mapActions("common", ["setIsShowCart"]),
    ...mapActions("cart", ["addCartItem", "getCartItems"]),
  },
  watch: {
    product() {
      this.size_id =
        this.item &&
        this.item.sizes &&
        this.item.sizes.length &&
        this.item.sizes[0].size_id;
      this.color_id =
        this.item &&
        this.item.images &&
        this.item.images.length &&
        this.item.images[0].color_id;
    },
  },
};
</script>

<style lang="less" scoped>
.fa-heart {
  text-shadow: #000;
  color: #000;
}
.fav-item {
  border: 1px solid #000;
  border-radius: 2px;
  margin-right: 5px;
  width: 32px;
  height: 32px;
  text-align: center;
  cursor: pointer;

  font-size: 16px;
  display: inherit;
  justify-content: center;
  align-items: center;
  margin-left: 25px;
}

.input-bt {
  outline: none;
  cursor: pointer;
  border: 0;
  font-size: 0.885rem;
  font-weight: 400;
  line-height: 1;
  letter-spacing: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.1s cubic-bezier(0.4, 0, 0.6, 1);
  border: 1px solid #000;
  border-radius: 2px;
  background: transparent;
  color: #000;
  width: 33px;
  height: 33px;
}

.button-add {
  background-color: #212121;
  border: none;
  color: white;
  padding: 5px 40px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin-left: 25px;
  border-radius: 4px;
  cursor: pointer;
}

.input-bt-add {
  border-right-width: 0px;
  border-radius: 8px 0px 0px 8px;
}

.input-bt-remove {
  border-left-width: 0px;
  border-radius: 0px 8px 8px 0px;
}

.input-bt-qty {
  width: 80px;
}

.flex-wrap {
  display: flex;
  flex-wrap: wrap;
}

.center {
  align-items: center;
  justify-content: space-between;
}

.name {
  font-size: 32px;
  color: #000;
}

.description {
  font-size: 14px;
  letter-spacing: 0px;
  color: #000000;
}

.price {
  margin-top: 15px;
  font-size: 40px;
  letter-spacing: 0px;
  color: #000000;
}

.size-name {
  font-size: 20px;
  letter-spacing: 0px;
  color: #000000;
}

.size-wrapper {
  display: flex;
  flex-wrap: wrap;

  .size-item {
    border: 1px solid #000;
    border-radius: 2px;
    margin-right: 5px;
    // width: 32px;
    // height: 32px;
    padding: 3px;
    text-align: center;

    font-size: 16px;
    display: inherit;
    justify-content: center;
    align-items: center;
    cursor: pointer;

    &.active {
      background-color: #212121;
      color: #fff;
    }
  }
}

.size {
  margin-top: 15px;
}

.colors-warpper {
  margin-top: 15px;
  margin-bottom: 15px;
}

.social-wrapper {
  display: flex;
  flex-wrap: wrap;

  .social-item {
    border: 1px solid #000;
    border-radius: 2px;
    margin-right: 5px;
    width: 20px;
    height: 20px;
    text-align: center;

    font-size: 10px;
    display: inherit;
    justify-content: center;
    align-items: center;
    padding: 5px;
  }
}

.colors {
  bottom: 10px;
  left: 10px;
  display: flex;
  flex-wrap: wrap;

  .color-item {
    cursor: pointer;
    margin-right: 5px;
    width: 32px;
    height: 32px;
    box-shadow: 0px 3px 6px #00000029;
    border-radius: 4px;

    &.active {
      transition: all 200ms ease-in;
      transform: scale(1.2);
      box-shadow: 0px 0px 150px #000000;
    }
  }
}

.size-guide {
  .button-row {
    width: fit-content;
    display: flex;
    border: 1px solid #212121;
    border-radius: 8px;
    margin-bottom: 20px;
    cursor: pointer;

    .inch {
      padding: 5px;
      border-right: 1px solid #212121;
      border-top-left-radius: 8px;
      border-bottom-left-radius: 8px;

      &.active {
        background-color: #212121;
        color: #fff;
      }
    }

    .cm {
      padding: 5px;
      border-top-right-radius: 8px;
      border-bottom-right-radius: 8px;
      &.active {
        background-color: #212121;
        color: #fff;
      }
    }
  }
}

.shared {
  font-size: 24px;
  margin-top: 15px;
  color: #000;
}

::v-deep .ant-collapse {
  border: none;
  background: none;
}

::v-deep
  .ant-collapse
  > .ant-collapse-item.ant-collapse-no-arrow
  > .ant-collapse-header {
  padding-left: 0px;
}

::v-deep .ant-collapse-content > .ant-collapse-content-box {
  padding-left: 0px;
}

@media screen and (max-width: 600px) {
  .input-bt-qty {
    width: 40px;
  }

  .button-add {
    font-size: 12px;
    padding: 5px 15px;
    margin-left: 10px;
  }

  .fav-item {
    margin-left: 10px;
  }
}
</style>
