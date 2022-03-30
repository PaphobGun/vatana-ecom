<template>
  <a-modal :visible="isShow" @cancel="closeModal" :footer="null">
    <div class="banner-modal">
      <img :src="imageURL" alt="" class="image" />
    </div>
  </a-modal>
</template>

<script>
export default {
  props: {
    isShow: {
      type: Boolean,
      default: false,
    },
    onClose: {
      type: Function,
      default: () => {},
    },
    image: {
      type: String,
    },
  },
  computed: {
    imageURL() {
      return require(`../../assets/images/${this.image}`);
    },
  },
  methods: {
    closeModal() {
      this.onClose();
    },
  },
};
</script>

<style lang="less" scoped>
::v-deep .ant-modal {
  width: 900px !important;
  @media (max-width: 950px) {
    width: 520px !important;
  }
}
::v-deep .ant-modal-close-x {
  font-size: 20px;
  color: #000;
}

::v-deep .ant-modal-body {
  // padding: 24px 32px;
}

.banner-modal {
  img {
    width: 100%;
  }
}
</style>
