<template>
  <a-carousel arrows :slidesToShow="slidesToShow">
    <!-- Left Arrow -->
    <div
      slot="prevArrow"
      slot-scope="props"
      class="custom-slick-arrow"
      style="left: 10px; z-index: 50"
    >
      <a-icon type="left-circle" />
    </div>

    <!-- Right Arrow -->
    <div
      slot="nextArrow"
      slot-scope="props"
      class="custom-slick-arrow"
      style="right: 10px"
    >
      <a-icon type="right-circle" />
    </div>

    <!-- If there's only one div the arrows disappear -->
    <div v-for="(i, idx) in images" :key="idx">
      <img class="image" :src="i" alt="" />
    </div>
    <!-- <div><h3>2</h3></div> -->
  </a-carousel>
</template>

<script>
export default {
  props: {
    slidesToShow: {
      type: Number,
      default: 1,
    },
    images: {
      type: Array,
      default: () => [],
    },
  },
};
</script>

<style lang="less" scoped>
.image {
  width: 100%;
  height: calc(100vh - 95px);
}
.ant-carousel ::v-deep .slick-slide {
  text-align: center;
  // height: 160px;
  // line-height: 160px;
  background: #212121;
  overflow: hidden;
}

.ant-carousel ::v-deep .custom-slick-arrow {
  width: 25px;
  height: 25px;
  font-size: 25px;
  color: #fff;
  opacity: 1;
}
.ant-carousel ::v-deep .custom-slick-arrow:before {
  display: none;
}
.ant-carousel ::v-deep .custom-slick-arrow:hover {
  // opacity: 0.5;
}

.ant-carousel ::v-deep .slick-slide h3 {
  color: #fff;
}
</style>
