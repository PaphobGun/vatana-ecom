<template>
  <div class="pagination">
    <a-pagination
      :default-current="currentPage"
      :default-page-size="pageSize"
      :total="total"
      @change="onPageChange"
    />
  </div>
</template>

<script>
export default {
  props: {
    currentPage: {
      type: Number,
      default: 1,
    },
    pageSize: {
      type: Number,
      default: 10,
    },
    total: {
      type: Number,
      default: 0,
    },
  },
  methods: {
    onPageChange(current) {
      this.$emit("onPageChange", current);
    },
  },
};
</script>

<style lang="less" scoped>
.pagination {
  ::v-deep .ant-pagination-item {
    border-radius: 50px;

    &-active {
      border-color: #000;

      a {
        color: #000;
      }
    }
  }

  ::v-deep .ant-pagination-next .ant-pagination-item-link {
    border-radius: 50px;
    // border-color: #000;
    // color: #000;
  }

  ::v-deep .ant-pagination-prev .ant-pagination-item-link {
    border-radius: 50px;
    // border-color: #000;
    // color: #000;
  }
}
</style>
