<template>
  <div class="cart">
    <div class="content">
      <div class="cart-items">
        <a-row
          class="cart-item"
          v-for="i in cartItems"
          :key="i.id"
          :gutter="[24, 16]"
        >
          <a-col :span="6" class="img-wrapper">
            <img
              :src="getImg(i.color_id, i.product.images)"
              alt=""
              class="image"
            />
          </a-col>
          <a-col :span="12">
            <div class="name">
              {{ i.product.name }}
            </div>
            <div class="attr-row mt-10">
              <div class="size">
                {{ getSizeLabel(i.size_id, i.product.sizes) }}
              </div>
              <div
                class="color"
                :style="{
                  'background-color': getColorLabel(
                    i.color_id,
                    i.product.images
                  ),
                }"
              />
            </div>
            <div class="counter">
              <div @click="() => deductItem(i.id, i)" class="minus">-</div>
              <div class="count">{{ i.amount }}</div>
              <div @click="() => increaseItem(i.id, i)" class="add">+</div>
            </div>
          </a-col>
          <a-col :span="6" class="right-col">
            <div class="icon-row">
              <a-icon
                @click="() => onClickDeleteCartItem(i.id)"
                type="delete"
                class="delete"
              />
            </div>
          </a-col>
          <div class="price">฿ {{ i.product.price }}</div>
        </a-row>
      </div>
      <div class="total-price">
        <div class="text">Subtotal</div>
        <div class="total">฿ {{ totalPrice }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {
      counts: [],
      isLoading: false,
    };
  },
  computed: {
    ...mapGetters("cart", ["cartItems", "totalPrice"]),
  },
  methods: {
    getImg(cid, images) {
      return images.find((i) => i.color_id === cid).url;
    },
    getSizeLabel(sid, sizes) {
      return sizes.find((s) => s.size_id === sid).label;
    },
    getColorLabel(cid, images) {
      return images.find((i) => i.color_id === cid).color;
    },
    async deductItem(id, item) {
      if (this.isLoading || item.amount === 1) {
        return;
      }
      this.isLoading = true;
      await this.updateCartItem({
        amount: item.amount - 1,
        product_id: item.product.id,
        size_id: item.size_id,
        color_id: item.color_id,
        id,
      });
      await this.getCartItems();
      this.isLoading = false;
    },
    async increaseItem(id, item) {
      if (this.isLoading) {
        return;
      }
      this.isLoading = true;
      await this.updateCartItem({
        amount: item.amount + 1,
        product_id: item.product.id,
        size_id: item.size_id,
        color_id: item.color_id,
        id,
      });
      await this.getCartItems();
      this.isLoading = false;
    },
    async onClickDeleteCartItem(id) {
      await this.deleteCartItem(id);
      await this.getCartItems();
    },
    ...mapActions("cart", ["updateCartItem", "getCartItems", "deleteCartItem"]),
  },
};
</script>

<style lang="less" scoped>
.cart {
  .content {
    .cart-items {
      .cart-item {
        position: relative;
        border-bottom: 1px solid #e6e6e6;

        .img-wrapper {
          // width: 40px;
          .image {
            width: 100%;
          }
        }

        .name {
          font-size: 12px;
        }

        .attr-row {
          display: flex;
          align-items: center;
          column-gap: 10px;

          .size {
            border: 1px solid #212121;
            padding: 3px;
            border-radius: 8px;
            font-size: 12px;
            min-width: 24px;
            text-align: center;
          }

          .color {
            border-radius: 4px;
            width: 16px;
            height: 16px;
          }
        }

        .counter {
          margin-top: 10px;
          display: flex;
          border: 1px solid #212121;
          border-top-left-radius: 8px;
          border-bottom-left-radius: 8px;
          border-top-right-radius: 8px;
          border-bottom-right-radius: 8px;
          width: 70px;

          .minus {
            cursor: pointer;
            padding: 1px 5px;
            width: 15px;
          }
          .count {
            padding: 1px 5px;
            border-left: 1px solid #212121;
            border-right: 1px solid #212121;
            width: 40px;
            text-align: center;
          }

          .add {
            cursor: pointer;
            padding: 1px 5px;
            width: 15px;
          }
        }

        .right-col {
          text-align: right;

          .delete {
            cursor: pointer;
          }
        }
      }
    }

    .price {
      position: absolute;
      bottom: 5px;
      right: 15px;
    }

    .total-price {
      margin-top: 30px;
      // text-align: right;
      display: flex;
      justify-content: space-between;
      font-size: 20px;
      color: #212121;
    }
  }
}
</style>
