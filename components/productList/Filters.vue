<template>
  <div class="filters-container">
    <div class="filter-title">Products</div>
    <div class="filter-top">
      <div class="filter-text">Filters</div>
      <div @click="clearFilter" class="clear-text">Clear All</div>
    </div>
    <div class="filter-labels">
      <div
        class="filter-label-item"
        v-for="(item, idx) in filteredItems"
        :key="idx"
        @click="() => delFilter(item)"
      >
        <span class="name">{{ item.name || item.size }}</span
        ><span class="x">x</span>
      </div>
    </div>
    <div class="price">
      <div class="text">Price</div>
      <a-slider
        cancelable
        @afterChange="priceChanged"
        v-model="prices"
        range
        :min="priceFilter[0]"
        :max="priceFilter[1]"
      />
    </div>
    <div class="checkbox-filters">
      <div class="text">Collections</div>
      <div class="checkbox-list">
        <a-checkbox
          class="checkbox-item"
          v-for="(item, index) in collections"
          :key="index"
          :checked="
            !!filteredItems.find(
              (_item) =>
                _item.type === 'collections' && _item.uuid === item.uuid
            )
          "
          @change="(_) => collectionsChanged(item)"
        >
          {{ item.name }}
        </a-checkbox>
      </div>
    </div>
    <div class="checkbox-filters">
      <div class="text">Categories</div>
      <div class="checkbox-list">
        <a-checkbox
          class="checkbox-item"
          v-for="(item, index) in categories"
          :key="index"
          :checked="
            !!filteredItems.find(
              (_item) => _item.type === 'categories' && _item.uuid === item.uuid
            )
          "
          @change="(_) => categoriesChanged(item)"
        >
          {{ item.name }}
        </a-checkbox>
      </div>
    </div>
    <div class="checkbox-filters">
      <div class="text">Colors</div>
      <div class="checkbox-list horizontal-list">
        <color-option
          v-for="(c, idx) in colors"
          :key="idx"
          :text="c.name"
          :color="c.code"
          :id="c.id"
          @clicked="colorsChanged"
          :active="
            !!filteredItems.find((_c) => _c.type === 'colors' && _c.id === c.id)
          "
        />
      </div>
    </div>
    <div class="checkbox-filters size-wrapper">
      <div class="text">Size</div>
      <div class="checkbox-list horizontal-list">
        <size-option
          v-for="(s, idx) in sizes"
          :key="idx"
          :item="s"
          @clicked="sizeChanged"
          :active="
            !!filteredItems.find((_s) => _s.type === 'size' && _s.id === s.id)
          "
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import ColorOption from "@/components/common/ColorOption.vue";
import SizeOption from "@/components/common/SizeOption.vue";

export default {
  components: {
    ColorOption,
    SizeOption,
  },
  props: {
    onCollectionsChange: {
      type: Function,
      default: () => {},
    },
    onCategoriesChange: {
      type: Function,
      default: () => {},
    },
    onSizeChange: {
      type: Function,
      default: () => {},
    },
    onColorsChange: {
      type: Function,
      default: () => {},
    },
    filteredItems: {
      type: Array,
      default: () => [],
    },
    onDelFilter: {
      type: Function,
      default: () => {},
    },
    onPriceChange: {
      type: Function,
      default: () => {},
    },
  },
  data() {
    return {
      filterItems: [],
      prices: [100, 1000],
    };
  },
  async created() {
    await Promise.all([this.getSizes(), this.getColors()]);
    const [min, max] = this.priceFilter;
    this.prices = [min, max];
  },
  computed: {
    ...mapGetters("products", [
      "collections",
      "categories",
      "priceFilter",
      "sizes",
      "colors",
    ]),
  },
  methods: {
    clearFilter() {
      this.$emit("clearFilter");
      const [min, max] = this.priceFilter;
      this.prices = [min, max];
    },
    priceChanged(value) {
      this.onPriceChange(value);
    },
    collectionsChanged(item) {
      this.onCollectionsChange(item);
    },
    categoriesChanged(item) {
      this.onCategoriesChange(item);
    },
    colorsChanged(cid, name) {
      this.onColorsChange(cid, name);
    },
    sizeChanged(item) {
      console.log(item);
      this.onSizeChange(item);
    },
    delFilter(item) {
      this.onDelFilter(item);
    },
    ...mapActions("products", ["getSizes", "getColors"]),
  },
};
</script>

<style lang="less" scoped>
.filters-container {
  .filter-title {
    color: #212121;
    font-size: 32px;
    margin-bottom: 24px;
  }

  .filter-top {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .filter-text {
      color: #212121;
      font-size: 16px;
    }

    .clear-text {
      color: #212121;
      cursor: pointer;
      text-decoration: underline;
      font-size: 10px;
      font-weight: 300;
    }
  }

  .filter-labels {
    border-bottom: 1px solid #e6e6e6;
    padding-top: 20px;
    padding-bottom: 10px;
    display: flex;
    flex-wrap: wrap;

    .filter-label-item {
      margin-right: 10px;
      margin-bottom: 10px;
      border: 1px solid #000000;
      border-radius: 4px;
      width: fit-content;
      padding: 3px 8px;
      font-size: 10px;
      color: #000000;
      cursor: pointer;

      .name {
      }

      .x {
        margin-left: 10px;
      }
    }
  }

  .price {
    ::v-deep .ant-slider-track {
      background-color: #000;
    }

    ::v-deep .ant-slider-handle {
      border-color: #000;
    }
    ::v-deep .ant-slider-handle.ant-tooltip-open {
      border-color: #000;
    }

    border-bottom: 1px solid #e6e6e6;
    padding: 20px 0;

    .text {
      font-size: 16px;
      color: #000000;
    }
  }

  .checkbox-filters {
    border-bottom: 1px solid #e6e6e6;
    padding: 20px 0;

    &.size-wrapper {
      border-bottom: none;
    }

    .text {
      font-size: 16px;
      color: #000000;
    }

    .checkbox-list {
      margin-top: 10px;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      column-gap: 5px;

      &.horizontal-list {
        flex-direction: row;
        flex-wrap: wrap;
      }

      .checkbox-item {
        font-size: 12px;
        color: #000000;
        margin-left: 0;
        font-weight: 300;

        ::v-deep .ant-checkbox-inner {
          border-color: #000;
        }

        &.vertical-item {
          display: flex;
          flex-direction: column;
          align-items: center;

          &.size {
            position: relative;
            margin-right: 10px;

            ::v-deep
              .ant-checkbox.ant-checkbox-checked
              .ant-checkbox-inner::after {
              opacity: 0;
            }

            ::v-deep .ant-checkbox.ant-checkbox-checked + span {
              color: #fff;
            }

            ::v-deep .ant-checkbox + span {
              position: absolute;
              font-size: 10px;
            }
          }

          ::v-deep .ant-checkbox + span {
            font-size: 8px;
            padding-right: 4px;
            padding-left: 4px;
          }
        }
      }
    }
  }
}
</style>
