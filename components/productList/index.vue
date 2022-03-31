<template>
  <div class="product-list container mx-auto">
    <div class="loading-wrapper" v-if="isLoading">
      <a-icon type="loading" />
    </div>
    <div class="mobile-title-row">
      <h1 class="mobile-title">Products</h1>
      <div class="total">{{ totalItems }} items</div>
    </div>
    <div class="mobile-sorting-row">
      <div @click="showFilter" class="filter">
        <a-icon type="filter" class="icon" />
        <div class="text">Filter</div>
      </div>
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
        <div class="sort-wrapper desktop">
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
    <banner-modal
      :isShow="isShowBannerModal"
      :onClose="closeBannerModal"
      image="banner-line.png"
    />
    <a-drawer
      :visible="isShowFilter"
      @close="closeFilter"
      placement="left"
      title="Filters"
    >
      <Filters
        :onCollectionsChange="onCollectionsChange"
        :onCategoriesChange="onCategoriesChange"
        :filteredItems="filteredItems"
        :onColorsChange="onColorsChange"
        :onSizeChange="onSizeChange"
        :onDelFilter="onDelFilter"
        :onPriceChange="onPriceChange"
        @clearFilter="clearFilter"
      />
    </a-drawer>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

import Filters from "./Filters.vue";
import PaginationProduct from "./PaginationProduct.vue";
import Pagination from "../common/Pagination.vue";
import BannerModal from "@/components/common/BannerModal.vue";

export default {
  components: {
    Filters,
    PaginationProduct,
    Pagination,
    BannerModal,
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
      isLoading: false,
      isShowBannerModal: true,
      isShowFilter: false,
    };
  },
  async created() {
    await Promise.all([
      this.getPriceFilter(),
      this.getCollections(),
      this.getCategories(),
    ]);

    const [min, max] = this.priceFilter;
    this.criteria.minPrice = min;
    this.criteria.maxPrice = max;

    this.fetchProducts(
      { ...this.criteria, q: this.$route.query.q },
      this.page,
      this.sort
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
    ...mapGetters("products", ["totalItems", "priceFilter"]),
  },
  methods: {
    showFilter() {
      this.isShowFilter = true;
    },
    closeFilter() {
      this.isShowFilter = false;
    },
    closeBannerModal() {
      this.isShowBannerModal = false;
    },
    clearFilter() {
      const [min, max] = this.priceFilter;
      this.page = 1;
      this.criteria = {
        minPrice: min,
        maxPrice: max,
        collections: [],
        categories: [],
        colors: [],
        size: [],
      };

      this.fetchProducts(this.criteria, this.page, this.sort);
    },
    onClickSort(_sort) {
      this.sort = _sort.key;
      this.page = 1;
      this.fetchProducts(this.criteria, this.page, this.sort);
    },
    async onPageChange(_page) {
      this.page = _page;
      this.fetchProducts(this.criteria, this.page, this.sort);
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

      this.fetchProducts(this.criteria, this.page, this.sort);
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
      this.fetchProducts(this.criteria, this.page, this.sort);
    },
    onColorsChange(cid, name) {
      const target = this.criteria.colors.find((c) => c.id === cid);
      if (target) {
        this.criteria.colors = this.criteria.colors.filter((c) => c.id !== cid);
      } else {
        this.criteria.colors = [...this.criteria.colors, { id: cid, name }];
      }

      this.fetchProducts(this.criteria, this.page, this.sort);
    },
    onSizeChange(s) {
      const target = this.criteria.size.find((_s) => _s.id === s.id);
      if (target) {
        this.criteria.size = this.criteria.size.filter((_s) => _s.id !== s.id);
      } else {
        this.criteria.size = [...this.criteria.size, s];
      }

      this.fetchProducts(this.criteria, this.page, this.sort);
    },
    onDelFilter(item) {
      this.criteria[item.type] = this.criteria[item.type].filter(
        (_item) => _item.id !== item.id
      );

      this.fetchProducts(this.criteria, this.page, this.sort);
    },
    onPriceChange(value) {
      const [min, max] = value;
      this.criteria.minPrice = min;
      this.criteria.maxPrice = max;

      this.fetchProducts(this.criteria, this.page, this.sort);
    },
    async fetchProducts(criteria, page, sort) {
      this.isLoading = true;
      await this.getProducts({
        criteria,
        page,
        sort,
      });
      this.isLoading = false;
    },
    ...mapActions("products", [
      "getCollections",
      "getCategories",
      "getProducts",
      "getPriceFilter",
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

        // await this.fetchProducts(this.criteria, this.page, this.sort);
      },
      deep: true,
    },
  },
};
</script>

<style lang="less" scoped>
.product-list {
  padding: 30px 0;
  position: relative;

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

  .loading-wrapper {
    position: absolute;
    width: 100vw;
    max-width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    z-index: 50;
    background-color: rgba(0, 0, 0, 0.1);

    i {
      margin-top: 150px;
      font-size: 92px;
    }
  }

  .sort-wrapper {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .content {
    .product-list-wrapper {
      margin-top: 20px;
    }

    .pagination-wrapper {
      margin-top: 20px;
    }
  }

  .mobile-title-row {
    display: none;
  }

  .mobile-sorting-row {
    display: none;
  }

  @media (max-width: 768px) {
    .mobile-title-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .sort-wrapper {
      &.desktop {
        display: none;
      }
    }

    .mobile-sorting-row {
      display: flex;
      justify-content: space-between;

      .filter {
        display: flex;
        align-items: center;
        border: 1px solid #000;
        border-radius: 4px;
        padding: 5px 10px;
        cursor: pointer;

        .text {
          margin-left: 5px;
        }

        .icon {
          width: 15px;
        }
      }
    }
  }
}
</style>
