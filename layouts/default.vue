<template>
  <client-only>
    <div class="default-layout">
      <a-layout>
        <Navbar />
        <a-layout-content class="default-layout-content"
          ><Nuxt
        /></a-layout-content>
        <Footer />
      </a-layout>
    </div>
  </client-only>
</template>

<script>
import Navbar from "../components/layout/Navbar.vue";
import Footer from "../components/layout/Footer.vue";

export default {
  components: {
    Navbar,
    Footer,
  },
  methods: {
    resize() {
      this.$store.dispatch("common/setDimension");
    },
  },
  mounted() {
    window.addEventListener("resize", this.resize);
    window.onNuxtReady?.((app) => {
      this.resize();
    });
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.resize);
  },
};
</script>

<style lang="less" scoped>
.default-layout {
  .default-layout-content {
    padding: 0 50px;
    background-color: #fff;
  }

  @media only screen and (max-width: 576px) {
    .default-layout-content {
      padding: 0 30px;
    }
  }
}
</style>
