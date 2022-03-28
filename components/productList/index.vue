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
          :onPriceChange="onPriceChange"
          @clearFilter="clearFilter"
      /></a-col>
      <a-col :lg="{ span: 17, offset: 1 }" :xs="{ span: 24 }" class="content">
        <div class="sort-wrapper">
          <div class="count">{{ totalItems }} items</div>
          <a-dropdown class="sort">
            <div>
              <div class="text">Sorting</div>
              <img src="~assets/images/sorting-order.png" alt="" class="icon" />
            </div>
            <a-menu slot="overlay" @click="onClickSort">
              <a-menu-item key="asc"> Price Low-High </a-menu-item>
              <a-menu-item key="desc"> Price High-Low </a-menu-item>
            </a-menu>
          </a-dropdown>
        </div>
        <div class="product-list-wrapper">
          <PaginationProduct />
        </div>
        <div class="pagination-wrapper">
          <Pagination
            :currentPage="page"
            :pageSize="12"
            :total="totalItems"
            @onPageChange="onPageChange"
          />
        </div>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

import Filters from "./Filters.vue";
import PaginationProduct from "./PaginationProduct.vue";
import Pagination from "../common/Pagination.vue";

export default {
  components: {
    Filters,
    PaginationProduct,
    Pagination,
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
    clearFilter() {
      this.page = 1;
      this.criteria = {
        minPrice: 100,
        maxPrice: 1000,
        collections: [],
        categories: [],
        colors: [],
        size: [],
      };
    },
    onClickSort(_sort) {
      this.sort = _sort.key;
      this.page = 1;
      this.getProducts({
        criteria: this.criteria,
        page: this.page,
        sort: this.sort,
      });
    },
    async onPageChange(_page) {
      this.page = _page;
      await this.getProducts({
        criteria: this.criteria,
        page: this.page,
        sort: this.sort,
      });
    },
    onCollectionsChange(item) {
      const target = this.criteria.collections.find(
        (_item) => _item.id === item.id
      );
      if (target) {
        this.criteria.collections = this.criteria.collections.filter(
          (__item) => __item.id !== item.id
        );
      } else {
        this.criteria.collections = [...this.criteria.collections, item];
      }

      console.log(this.criteria.collections);
    },
    onCategoriesChange(item) {
      const target = this.criteria.categories.find(
        (_item) => _item.id === item.id
      );
      if (target) {
        this.criteria.categories = this.criteria.categories.filter(
          (__item) => __item.id !== item.id
        );
      } else {
        this.criteria.categories = [...this.criteria.categories, item];
      }

      console.log(this.criteria.categories);
    },
    onColorsChange(cid, name) {
      const target = this.criteria.colors.find((c) => c.id === cid);
      if (target) {
        this.criteria.colors = this.criteria.colors.filter((c) => c.id !== cid);
      } else {
        this.criteria.colors = [...this.criteria.colors, { id: cid, name }];
      }

      console.log(this.criteria.colors);
    },
    onSizeChange(s) {
      const target = this.criteria.size.find((_s) => _s.id === s.id);
      if (target) {
        this.criteria.size = this.criteria.size.filter((_s) => _s.id !== s.id);
      } else {
        this.criteria.size = [...this.criteria.size, s];
      }

      console.log(this.criteria.size);
    },
    onDelFilter(item) {
      this.criteria[item.type] = this.criteria[item.type].filter(
        (_item) => _item.id !== item.id
      );
    },
    onPriceChange(value) {
      const [min, max] = value;
      this.criteria.minPrice = min;
      this.criteria.maxPrice = max;
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

  .content {
    .product-list-wrapper {
      margin-top: 20px;
    }

    .pagination-wrapper {
      margin-top: 20px;
    }
  }
}
</style>
