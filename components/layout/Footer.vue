<template>
  <div class="footer">
    <hr />
    <a-layout-footer>
      <div class="container">
        <a-row class="main-warpper">
          <a-col
            :gutter="{ lg: 16 }"
            :lg="{ span: 12 }"
            :md="{ span: 18 }"
            :sm="{ span: 18 }"
            :xs="24"
          >
            <a-row class="main-warpper">
              <a-col
                :lg="{ span: 8 }"
                :md="{ span: 8 }"
                :sm="{ span: 7 }"
                :xs="7"
              >
                <h3>About</h3>
                <a-col class="group-warpper">
                  <a href="#">Product</a>
                  <a href="#">Lookbook</a>
                  <a href="#">Policy</a>
                  <a href="#">Careers</a>
                </a-col>
              </a-col>
              <a-col
                :lg="{ span: 8 }"
                :md="{ span: 8 }"
                :sm="{ span: 7 }"
                :xs="7"
              >
                <h3>Help</h3>
                <div class="group-warpper">
                  <a href="#">Payment</a>
                  <a href="#">Shipping</a>
                  <a href="#">Exchange</a>
                  <a href="#">Returns</a>
                  <a href="#">FAQ</a>
                </div>
              </a-col>
              <a-col
                :lg="{ span: 8 }"
                :md="{ span: 8 }"
                :sm="{ span: 8 }"
                :xs="10"
              >
                <h3>Contact</h3>
                <div class="group-warpper">
                  <a
                    href="mailto:vatanaclothing.official@gmail.com"
                    target="_blank"
                    >vatanaclothing.official@gmail.com</a
                  >
                  <a href="tel:+66289745004">028-974-5004-5</a>
                  <a href="tel:+66615361666">061-536-1666</a>
                </div>
              </a-col>
            </a-row>
          </a-col>
          <a-col :lg="{ span: 12 }" :md="{ span: 6 }" :sm="{ span: 6 }">
            <a-row class="main-warpper">
              <a-col :lg="{ span: 8 }" class="follow-warpper-desktop">
                <h3>Follow Us</h3>
                <a-row class="main-warpper">
                  <a
                    href="https://web.facebook.com/vatana.official/?ref=page_internal"
                    target="_blank"
                  >
                    <font-awesome-icon
                      class="social-item"
                      icon="fa-brands fa-sm fa-facebook-f"
                    />
                  </a>
                  <a href=" https://lin.ee/OHxs7BA" target="_blank">
                    <img
                      src="~assets/images/line-brands.svg"
                      alt="Line"
                      class="social-line"
                    />
                  </a>
                  <a
                    href="https://instagram.com/vatana_official?utm_medium=copy_link"
                    target="_blank"
                  >
                    <font-awesome-icon
                      class="social-item"
                      icon="fa-brands fa-sm fa-instagram"
                    />
                  </a>
                </a-row>
              </a-col>
              <a-col :lg="{ span: 8 }">
                <h3>Payment</h3>
                <a-row class="main-warpper">
                  <a-col
                    class="img-warpper"
                    :lg="{ span: 5 }"
                    :xs="{ span: 7 }"
                  >
                    <img
                      class="payment-image"
                      src="@/assets/images/bank/visa.png"
                      alt=""
                    />
                  </a-col>
                  <a-col
                    class="img-warpper"
                    :lg="{ span: 5 }"
                    :xs="{ span: 7 }"
                  >
                    <img
                      class="payment-image"
                      src="@/assets/images/bank/jcb.png"
                      alt=""
                    />
                  </a-col>
                  <a-col
                    class="img-warpper"
                    :lg="{ span: 5 }"
                    :xs="{ span: 7 }"
                  >
                    <img
                      class="payment-image"
                      src="@/assets/images/bank/paypal.png"
                      alt=""
                    />
                  </a-col>
                  <a-col
                    class="img-warpper"
                    :lg="{ span: 5 }"
                    :xs="{ span: 7 }"
                  >
                    <img
                      class="payment-image"
                      src="@/assets/images/bank/promptpay.png"
                      alt=""
                    />
                  </a-col>
                  <a-col
                    class="img-warpper"
                    :lg="{ span: 5 }"
                    :xs="{ span: 7 }"
                  >
                    <img
                      class="payment-image"
                      src="@/assets/images/bank/kbank.png"
                      alt=""
                    />
                  </a-col>
                </a-row>
              </a-col>
            </a-row>
          </a-col>
        </a-row>
        <a-row class="main-warpper">
          <a-col :lg="12" :sm="10" class="letter-warpper">
            <a-col :lg="{ span: 8 }" class="follow-warpper-mobile">
              <h3>Follow Us</h3>
              <a-row class="main-warpper">
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
            </a-col>
          </a-col>
          <a-col :lg="12" :sm="14" class="letter-warpper">
            <h3>Newsletter</h3>
            <div>Sign up to receive information about new products</div>

            <a-input-search
              placeholder="Your email address"
              size="large"
              @search="onSearch"
            >
              <a-button slot="enterButton"> SUBSCRIBE </a-button>
            </a-input-search>
          </a-col>
        </a-row>
      </div>
    </a-layout-footer>
    <hr />
    <a-row
      class="copyright container mx-auto"
      type="flex"
      :justify="checkSize()"
    >
      <div>Copyright © 2022 Vattana, All rights reserved</div>
      <a-row class="main-warpprt termAndPrivacy">
        <a href="">Terms & Condition</a>
        <a class="privacy" href="">Privacy Policy</a>
      </a-row>
    </a-row>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  methods: {
    onSearch() {},
    checkSize() {
      if (this.isMobile) return "center";

      return "space-between";
    },
  },
  computed: {
    ...mapGetters("common", ["isMobile", "isTablet"]),
  },
};
</script>

<style lang="less" scoped>
.img-warpper {
  border: 1px solid #000000;
  padding: 5px 3px;
  border-radius: 5px;
  margin-right: 3px;
  margin-bottom: 3px;
  display: flex;
  justify-content: center;
  height: 27px;
}
.payment-image {
  width: 20px;
  height: auto;
}
.privacy {
  margin-left: 15px;
}
.footer {
  background: white;
  .container {
    margin: 0 auto;
  }
}
::v-deep .ant-layout-footer {
  background: white;
}
.copyright {
  margin: 15px;
  padding-bottom: 20px;
  display: flex;
  flex-wrap: wrap;
}
.follow-warpper-mobile {
  display: none;
}
.social-item {
  border: 1px solid #000;
  border-radius: 2px;
  margin-right: 5px;
  width: 15px;
  height: 15px;
  text-align: center;
  color: unset;

  font-size: 10px;
  display: inherit;
  justify-content: center;
  align-items: center;
  padding: 5px;
}

.social-line {
  width: 25px;
  margin-right: 5px;
}

.letter-warpper {
  margin-top: 15px;
}

.main-warpper {
  display: flex;
  flex-wrap: wrap;

  .group-warpper {
    flex-direction: column;
    display: flex;
    font-size: 12px;
  }
}

a:link {
  color: #000000;
  background-color: transparent;
  text-decoration: none;
}

a:visited {
  color: #000000;
  background-color: transparent;
  text-decoration: none;
}

a:hover {
  color: #000000;
  background-color: transparent;
  text-decoration: underline;
}

a:active {
  color: #000000;
  background-color: transparent;
  text-decoration: underline;
}

@media screen and (max-width: 768px) {
  .follow-warpper-desktop {
    display: none;
  }

  .follow-warpper-mobile {
    display: block;
  }
}

@media screen and (max-width: 480px) {
  .follow-warpper-desktop {
    display: block;
  }

  .follow-warpper-mobile {
    display: none;
  }

  .termAndPrivacy {
    display: none;
  }
}
</style>
