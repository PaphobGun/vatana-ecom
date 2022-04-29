<template>
  <div class="favourite">
    <div class="container mx-auto">
      <div class="mt-20">
        <a-row :gutter="[16, 16]">
          <a-col
            v-for="(item, idx) in favourites"
            :key="idx"
            :xs="12"
            :sm="12"
            :md="8"
            :lg="6"
          >
            <ProductCard :item="item.product" />
          </a-col>
        </a-row>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  async created() {
    await this.getFavourites();
  },
  computed: {
    ...mapGetters("favourite", ["favourites"]),
  },
  methods: {
    ...mapActions("favourite", ["getFavourites"]),
  },
};
</script>

<style lang="less" scoped></style>
