<template>
  <div class="profile">
    <div class="container mx-auto">
      <div class="loading-wrapper" v-if="isLoading">
        <a-icon type="loading" />
      </div>
      <div v-else>
        <h1 class="title mt-20 mb-20">User Profile</h1>
        <div class="address mb-20">
          <div class="address-empty" v-if="!address">
            <h1 class="address-title">Address</h1>
            <div class="info mb-10">No Address found..</div>
            <nuxt-link to="/profile/address">
              <a-button> Add Address </a-button>
            </nuxt-link>
          </div>
          <div class="address-info" v-else>
            <a-descriptions title="Address">
              <a-descriptions-item label="Fullname">
                {{ address.firstname }} {{ address.lastname }}
              </a-descriptions-item>
              <a-descriptions-item label="Phone">
                {{ address.phone }}
              </a-descriptions-item>
              <a-descriptions-item label="Type">
                ที่อยู่อาศัย
              </a-descriptions-item>
              <a-descriptions-item label="Address" span="2">
                {{ address.address_line }} {{ address.subdistrict }},
                {{ address.district }}, {{ address.province }}
                {{ address.zipcode }}
              </a-descriptions-item>
            </a-descriptions>
            <nuxt-link to="/profile/address">
              <a-button> Edit Address </a-button>
            </nuxt-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {
      isLoading: true,
    };
  },
  async created() {
    await this.getAddress();
    this.isLoading = false;
  },
  computed: {
    ...mapGetters("profile", ["address"]),
  },
  methods: {
    ...mapActions("profile", ["getAddress"]),
  },
};
</script>

<style lang="less" scoped>
.profile {
  .loading-wrapper {
    text-align: center;
    height: calc(100vh - 95px);
    font-size: 92px;
  }
  .title {
    font-size: 32px;
    font-weight: 300;
    line-height: 1;
  }

  .ant-btn {
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
}
</style>
