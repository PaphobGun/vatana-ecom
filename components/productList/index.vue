<template>
  <div class="product-list container mx-auto">
    <a-row>
      <a-col :lg="{ span: 6 }" :xs="{ span: 0 }"
        ><Filters
          :onCollectionsChange="onCollectionsChange"
          :onCategoriesChange="onCategoriesChange"
          :filteredItems="filteredItems"
          :onColorsChange="onColorsChange"
          :onSizeChange="onSizeChange"
          :onDelFilter="onDelFilter"
      /></a-col>
      <a-col :lg="{ span: 17, offset: 1 }" :xs="{ span: 24 }">
        <div class="sort-wrapper">
          <div class="count">{{ totalItems }} items</div>
          <div class="sort">
            <div class="text">Sorting</div>
            <img src="~assets/images/sorting-order.png" alt="" class="icon" />
          </div>
        </div>
        <div class="product-list-wrapper">
          <PaginationProduct />
        </div>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

import Filters from "./Filters.vue";
import PaginationProduct from "./PaginationProduct.vue";

export default {
  components: {
    Filters,
    PaginationProduct,
  },
  data() {
    return {
      criteria: {
        minPrice: 100,
        maxPrice: 1000,
        collections: [],
        categories: [],
        colors: [],
        size: [],
      },
      page: 1,
      sort: "asc",
    };
  },
  async created() {
    await Promise.all(
      [this.getCollections(), this.getCategories()],
      this.getProducts({
        criteria: this.criteria,
        page: this.page,
        sort: this.sort,
      })
    );
  },
  computed: {
    filteredItems() {
      const { collections, categories, colors, size } = this.criteria;

      const collectionsMap = collections.map((i) => ({
        ...i,
        type: "collections",
      }));
      const categoriesMap = categories.map((i) => ({
        ...i,
        type: "categories",
      }));
      const colorsMap = colors.map((i) => ({ ...i, type: "colors" }));
      const sizeMap = size.map((i) => ({ ...i, type: "size" }));

      return [...collectionsMap, ...categoriesMap, ...colorsMap, ...sizeMap];
    },
    ...mapGetters("products", ["totalItems"]),
  },
  methods: {
    onCollectionsChange(item) {
      const target = this.criteria.collections.find(
        (_item) => _item.uuid === item.uuid
      );
      if (target) {
        this.criteria.collections = this.criteria.collections.filter(
          (__item) => __item.uuid !== item.uuid
        );
      } else {
        this.criteria.collections = [...this.criteria.collections, item];
      }

      console.log(this.criteria.collections);
    },
    onCategoriesChange(item) {
      const target = this.criteria.categories.find(
        (_item) => _item.uuid === item.uuid
      );
      if (target) {
        this.criteria.categories = this.criteria.categories.filter(
          (__item) => __item.uuid !== item.uuid
        );
      } else {
        this.criteria.categories = [...this.criteria.categories, item];
      }

      console.log(this.criteria.categories);
    },
    onColorsChange(item) {
      const target = this.criteria.colors.find((_item) => _item.name === item);
      if (target) {
        this.criteria.colors = this.criteria.colors.filter(
          (__item) => __item.name !== item
        );
      } else {
        this.criteria.colors = [
          ...this.criteria.colors,
          { name: item, uuid: item },
        ];
      }

      console.log(this.criteria.colors);
    },
    onSizeChange(item) {
      const target = this.criteria.size.find((_item) => _item.name === item);
      if (target) {
        this.criteria.size = this.criteria.size.filter(
          (__item) => __item.name !== item
        );
      } else {
        this.criteria.size = [
          ...this.criteria.size,
          { name: item, uuid: item },
        ];
      }

      console.log(this.criteria.size);
    },
    onDelFilter(item) {
      this.criteria[item.type] = this.criteria[item.type].filter(
        (_item) => _item.uuid !== item.uuid
      );
    },
    ...mapActions("products", [
      "getCollections",
      "getCategories",
      "getProducts",
    ]),
  },
  watch: {
    criteria: {
      handler: async function () {
        console.log(
          JSON.parse(
            JSON.stringify({
              criteria: this.criteria,
              page: this.page,
              sort: this.sort,
            })
          )
        );

        await this.getProducts({
          criteria: this.criteria,
          page: this.page,
          sort: this.sort,
        });
      },
      deep: true,
    },
  },
};
</script>

<style lang="less" scoped>
.product-list {
  padding: 30px 0;

  .sort-wrapper {
    display: flex;
    align-items: center;
    justify-content: space-between;

    .sort {
      display: flex;
      align-items: center;
      border: 1px solid #000;
      border-radius: 4px;
      padding: 5px 10px;
      cursor: pointer;

      .text {
        margin-right: 5px;
      }

      .icon {
        width: 15px;
      }
    }
  }

  .product-list-wrapper {
    margin-top: 20px;
  }
}
</style>
