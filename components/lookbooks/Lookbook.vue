<template>
  <div class="lookbook">
    <carousel :images="lookbooks.map((l) => l.image_url)" />
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import Carousel from "@/components/common/Carousel.vue";
export default {
  components: {
    Carousel,
  },
  created() {
    this.getLookbooks(this.$route.params.id);
  },
  computed: {
    ...mapGetters("lookbook", ["lookbooks"]),
  },
  methods: {
    ...mapActions("lookbook", ["getLookbooks"]),
  },
};
</script>

<style lang="less" scoped></style>
