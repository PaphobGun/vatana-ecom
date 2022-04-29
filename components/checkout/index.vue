<template>
  <div class="checkout">
    <div class="container mt-20 mx-auto">
      <h1>CHECKOUT</h1>
      <a-divider />
      <div v-if="_.isEmpty(address)">
        <div>
          We do not have your address yet. Please add the address before proceed
          to the next step.
        </div>
        <nuxt-link to="profile">
          <a-button class="mt-20 profile-btn"> Profile Management </a-button>
        </nuxt-link>
      </div>
      <div v-else>
        <div class="address-detail">
          <a-descriptions title="Shipping Address">
            <a-descriptions-item label="Fullname">
              {{ address.firstname }} {{ address.lastname }}
            </a-descriptions-item>
            <a-descriptions-item label="Phone">
              {{ address.phone }}
            </a-descriptions-item>
            <a-descriptions-item label="Type">
              ที่อยู่อาศัย
            </a-descriptions-item>
            <a-descriptions-item label="Address">
              {{ address.address_line }} {{ address.subdistrict }},
              {{ address.district }}, {{ address.province }}
              {{ address.zipcode }}
            </a-descriptions-item>
          </a-descriptions>
          <nuxt-link to="profile">
            <a-button class="mt-20 profile-btn"> Edit Address </a-button>
          </nuxt-link>
        </div>
        <div>
          <a-divider />
          <h2>Order Detail</h2>
        </div>
        <div class="cart-detail mt-20">
          <div class="cart-items">
            <a-row
              class="cart-item"
              v-for="i in cartItems"
              :key="i.id"
              :gutter="[24, 16]"
            >
              <a-col :span="6" class="img-wrapper" v-if="i.product">
                <img
                  :src="getImg(i.color_id, i.product.images)"
                  alt=""
                  class="image"
                />
              </a-col>
              <a-col :span="18" v-if="i.product">
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
                <div class="amount">x {{ i.amount }}</div>
              </a-col>
              <div v-if="i.product" class="price">฿ {{ i.product.price }}</div>
            </a-row>
          </div>
          <div class="total-price">
            <div class="text">Total</div>
            <div class="total">฿ {{ totalPrice }}</div>
          </div>
        </div>
        <div class="mt-20 payment-wrapper">
          <a-divider />
          <h2>Payment Method</h2>
          <a-collapse v-model="activeKey">
            <a-collapse-panel key="1" header="QR Payment">
              <div class="qr-wrapper">
                <img src="~assets/images/sample_qr.png" class="qr" alt="" />
                <div class="bank-name">ธนาคาร กสิกรไทย</div>
                <div class="bank-account-name">นาย สุลต่าน จากดวงดาว</div>
                <div></div>
              </div>
              <div class="slip-wrapper mt-20">
                <h3>Upload Slip</h3>
                <a-upload
                  class="image-uploader"
                  list-type="picture-card"
                  :before-upload="beforeUpload"
                  @change="handleChange"
                  :show-upload-list="false"
                >
                  <img
                    class="display-image"
                    v-if="uploadQr"
                    :src="uploadQr"
                    alt="image"
                  />
                  <div v-else>
                    <a-icon :type="uploading ? 'loading' : 'plus'" />
                    <div class="ant-upload-text">Upload</div>
                  </div>
                </a-upload>
                <a-button
                  :disabled="!uploadQr || uploading"
                  class="mt-20 profile-btn"
                  @click="confirmOrder"
                >
                  Confirm Payment
                </a-button>
              </div>
            </a-collapse-panel>
          </a-collapse>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

import { getBase64 } from "@/utils/common";
import HttpClient from "@/utils/httpClient";

export default {
  data() {
    return {
      activeKey: ["1"],
      uploadQr: "",
      uploading: false,
    };
  },
  async created() {
    this.setIsShowCart(false);
    await Promise.all([this.getAddress(), this.getCartItems()]);
  },
  computed: {
    ...mapGetters("cart", ["cartItems", "totalPrice"]),
    ...mapGetters("profile", ["address"]),
  },
  methods: {
    handleChange(info) {
      if (info.file.status === "uploading") {
        this.uploading = true;
        return;
      }
      if (info.file.status === "done") {
        getBase64(info.file.originFileObj, async (base64) => {
          const { url } = await HttpClient.call({
            url: "/upload",
            method: "POST",
            data: {
              base64,
              module: "order",
              filename: info.file.originFileObj.name,
            },
          });

          this.uploadQr = url;
          this.uploading = false;
        });
      }
    },
    beforeUpload(file) {
      const isJpgOrPng =
        file.type === "image/jpeg" || file.type === "image/png";
      if (!isJpgOrPng) {
        this.$message.error("You can only upload JPG or PNG file!");
      }
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        this.$message.error("Image must smaller than 2MB!");
      }
      return isJpgOrPng && isLt2M;
    },
    getImg(cid, images) {
      return images.find((i) => i.color_id === cid).url;
    },
    getSizeLabel(sid, sizes) {
      return sizes.find((s) => s.size_id === sid).label;
    },
    getColorLabel(cid, images) {
      return images.find((i) => i.color_id === cid).color;
    },
    async confirmOrder() {
      this.createOrder(this.uploadQr);
      await this.getCartItems();
      this.$notification.success({
        message: "Order Created!",
      });
      this.$router.push("/orders");
    },
    ...mapActions("common", ["setIsShowCart"]),
    ...mapActions("cart", ["getCartItems"]),
    ...mapActions("order", ["createOrder"]),
    ...mapActions("profile", ["getAddress"]),
  },
};
</script>

<style lang="less" scoped>
.checkout {
  @media only screen and (max-width: 576px) {
    padding: 0 30px;
  }

  .profile-btn {
    &[disabled] {
      color: rgba(0, 0, 0, 0.25);
      background-color: #f5f5f5;
    }

    height: 40px;
    font-family: sans-serif;
    background-color: #212121;
    font-size: 16px;
    font-weight: 200;
    color: #fff;

    &:hover,
    &:focus {
      border-color: unset;
    }
  }

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
        font-size: 16px;
      }

      .attr-row {
        display: flex;
        align-items: center;
        column-gap: 10px;

        .size {
          border: 1px solid #212121;
          padding: 3px 8px;
          border-radius: 8px;
          font-size: 16px;
          min-width: 24px;
          text-align: center;
        }

        .color {
          border-radius: 4px;
          width: 32px;
          height: 32px;
        }
      }

      .right-col {
        text-align: right;

        .delete {
          cursor: pointer;
        }
      }

      .amount {
        margin-top: 20px;
        font-size: 16px;
      }
    }
  }

  .price {
    position: absolute;
    bottom: 5px;
    right: 15px;
    font-size: 16px;
  }

  .total-price {
    margin-top: 30px;
    // text-align: right;
    display: flex;
    justify-content: space-between;
    font-size: 20px;
    color: #212121;
  }

  .payment-wrapper {
    padding-bottom: 40px;

    .qr-wrapper {
      display: flex;
      flex-direction: column;
      align-items: center;
      .qr {
        width: 250px;
      }

      font-size: 20px;

      .bank-name {
        margin-top: 10px;
      }
    }

    .slip-wrapper {
      display: flex;
      flex-direction: column;
      align-items: center;
    }
  }

  .image-uploader > ::v-deep .ant-upload {
    width: 128px;
    height: 128px;
  }

  ::v-deep .ant-upload-picture-card-wrapper {
    width: unset;
  }

  ::v-deep .ant-upload-select-picture-card i {
    font-size: 32px;
    color: #999;
  }

  ::v-deep .ant-upload-select-picture-card .ant-upload-text {
    margin-top: 8px;
    color: #666;
  }

  .display-image {
    max-width: 200px;
  }
}
</style>
