<template>
  <div class="color-option" @click="onClick">
    <div
      class="color-box"
      :style="{ 'background-color': color }"
      :class="{ active: active }"
    />
    <div class="text" :class="{ active: active }">
      {{ text }}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    id: {
      type: Number,
    },
    text: {
      type: String,
      default: "",
    },
    color: {
      type: String,
      default: "#fff",
    },
    active: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    onClick() {
      this.$emit("clicked", this.id, this.text);
    },
  },
};
</script>

<style lang="less" scoped>
.color-option {
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;

  .color-box {
    border-radius: 4px;
    width: 16px;
    height: 16px;
    border: 1px solid #fff;

    &.active {
      border-color: #000;
      transition: all 200ms ease-in;
      transform: scale(1.5);
      box-shadow: 0px 0px 150px #000000;
    }
  }

  .text {
    font-size: 12px;

    &.active {
      transition: all 200ms ease-in;
      font-size: 14px;
      color: #212121;
    }
  }
}
</style>
