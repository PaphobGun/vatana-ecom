<template>
  <div class="address-form">
    <div class="container mx-auto">
      <div class="loading-wrapper" v-if="isLoading">
        <a-icon type="loading" />
      </div>
      <div class="content mt-20 mt-20" v-else>
        <h1 class="title mb-20">{{ address ? "Edit" : "Add" }} Address</h1>
        <a-form
          id="address-form"
          :form="form"
          class="address-form"
          @submit="handleSubmit"
          :colon="false"
        >
          <a-row :gutter="16">
            <a-col :sm="12">
              <a-form-item label="Firstname" class="name">
                <a-input
                  v-decorator="[
                    'firstname',
                    {
                      rules: [
                        {
                          required: true,
                          message: 'Please input your firstname',
                        },
                      ],
                      initialValue: address && address.firstname,
                    },
                  ]"
                />
              </a-form-item>
            </a-col>
            <a-col :sm="12">
              <a-form-item label="Lastname" class="name">
                <a-input
                  v-decorator="[
                    'lastname',
                    {
                      rules: [
                        {
                          required: true,
                          message: 'Please input your lastname',
                        },
                      ],
                      initialValue: address && address.lastname,
                    },
                  ]"
                />
              </a-form-item>
            </a-col>
          </a-row>
          <a-row :gutter="16">
            <a-col :sm="12">
              <a-form-item label="Phone" class="phone">
                <a-input
                  v-decorator="[
                    'phone',
                    {
                      rules: [
                        {
                          required: true,
                          message: 'Please input your phone',
                        },
                      ],
                      initialValue: address && address.phone,
                    },
                  ]"
                />
              </a-form-item>
            </a-col>
            <a-col :sm="12">
              <a-form-item label="Address" class="address-line">
                <a-input
                  v-decorator="[
                    'address_line',
                    {
                      rules: [
                        {
                          required: true,
                          message: 'Please input your address',
                        },
                      ],
                      initialValue: address && address.address_line,
                    },
                  ]"
                />
              </a-form-item>
            </a-col>
          </a-row>
          <a-row :gutter="16">
            <a-col :sm="12">
              <a-form-item label="Subdistrict" class="subdistrict">
                <a-input
                  v-decorator="[
                    'subdistrict',
                    {
                      rules: [
                        {
                          required: true,
                          message: 'Please input your subdistrict',
                        },
                      ],
                      initialValue: address && address.subdistrict,
                    },
                  ]"
                />
              </a-form-item>
            </a-col>
            <a-col :sm="12">
              <a-form-item label="District" class="district">
                <a-input
                  v-decorator="[
                    'district',
                    {
                      rules: [
                        {
                          required: true,
                          message: 'Please input your district',
                        },
                      ],
                      initialValue: address && address.district,
                    },
                  ]"
                />
              </a-form-item>
            </a-col>
          </a-row>
          <a-row :gutter="16">
            <a-col :span="12">
              <a-form-item label="Province" class="province">
                <a-input
                  v-decorator="[
                    'province',
                    {
                      rules: [
                        {
                          required: true,
                          message: 'Please input your province',
                        },
                      ],
                      initialValue: address && address.province,
                    },
                  ]"
                />
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item label="Zipcode" class="zipcode">
                <a-input
                  v-decorator="[
                    'zipcode',
                    {
                      rules: [
                        {
                          required: true,
                          message: 'Please input your zipcode',
                        },
                      ],
                      initialValue: address && address.zipcode,
                    },
                  ]"
                />
              </a-form-item>
            </a-col>
          </a-row>
          <a-button class="submit" html-type="submit"> Submit </a-button>
        </a-form>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  beforeCreate() {
    this.form = this.$form.createForm(this, { name: "address-form" });
  },
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
    async handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields(
        async (
          err,
          {
            firstname,
            lastname,
            phone,
            address_line,
            subdistrict,
            district,
            province,
            zipcode,
          }
        ) => {
          if (!err) {
            if (this.address) {
              await this.editAddress({
                firstname,
                lastname,
                phone,
                address_line,
                subdistrict,
                district,
                province,
                zipcode,
              });
            } else {
              await this.addAddress({
                firstname,
                lastname,
                phone,
                address_line,
                subdistrict,
                district,
                province,
                zipcode,
              });
            }

            this.$notification.success({
              message: "Address Submitted !",
            });

            this.$router.push({ path: "/profile" });
          }
        }
      );
    },
    ...mapActions("profile", ["getAddress", "addAddress", "editAddress"]),
  },
};
</script>

<style lang="less" scoped>
.address-form {
  .loading-wrapper {
    text-align: center;
    height: calc(100vh - 95px);
    font-size: 92px;
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
