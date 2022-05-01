<template>
  <div class="lookbooks">
    <div class="container mx-auto">
      <h1 class="title mt-20 mb-20">Lookbooks</h1>
      <a-row class="lookbooks-row" :gutter="[16, 16]">
        <a-col
          class="lookbooks-item"
          :xs="24"
          :sm="24"
          :md="8"
          v-for="l in lookbooksPage"
          :key="l.id"
        >
          <nuxt-link :to="`/lookbooks/${l.id}`">
            <img class="image" alt="lookbook" :src="l.image_url" />
          </nuxt-link>
        </a-col>
      </a-row>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  async created() {
    await this.getLookbooksPage();
  },
  methods: {
    ...mapActions("lookbook", ["getLookbooksPage"]),
  },
  computed: {
    ...mapGetters("lookbook", ["lookbooksPage"]),
  },
};
</script>

<style lang="less" scoped>
.lookbooks {
  .title {
    font-size: 32px;
    font-weight: 300;
    line-height: 1;
  }

  .lookbooks-row {
    .lookbooks-item {
      img {
        cursor: pointer;
        width: 100%;
        height: 350px;
      }
    }
  }
}
</style>
