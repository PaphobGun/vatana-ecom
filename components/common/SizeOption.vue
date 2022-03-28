<template>
  <div class="size-option" @click="onClick" :class="{ active: active }">
    {{ item.size }}
  </div>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      default: () => {},
    },
    active: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    onClick() {
      this.$emit("clicked", this.item);
    },
  },
};
</script>

<style lang="less" scoped>
.size-option {
  cursor: pointer;
  border: 1px solid #000;
  padding: 3px;
  border-radius: 4px;

  &.active {
    background: #212121;
    color: #fff;
  }
}
</style>
