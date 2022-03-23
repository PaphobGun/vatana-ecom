<template>
  <div class="filters-container">
    <div class="filter-title">Products</div>
    <div class="filter-top">
      <div class="filter-text">Filters</div>
      <div class="clear-text">Clear All</div>
    </div>
    <div class="filter-labels">
      <div
        class="filter-label-item"
        v-for="(item, idx) in filteredItems"
        :key="idx"
        @click="() => delFilter(item)"
      >
        <span class="name">{{ item.name }}</span
        ><span class="x">x</span>
      </div>
    </div>
    <div class="price">
      <div class="text">Price</div>
      <a-slider range :defaultValue="[100, 1000]" :min="0" :max="1200" />
    </div>
    <div class="checkbox-filters">
      <div class="text">Collections</div>
      <div class="checkbox-list">
        <a-checkbox
          class="checkbox-item"
          v-for="(item, index) in collections"
          :key="index"
          :checked="
            filteredItems.find(
              (_item) =>
                _item.type === 'collections' && _item.uuid === item.uuid
            )
              ? true
              : false
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
            filteredItems.find(
              (_item) => _item.type === 'categories' && _item.uuid === item.uuid
            )
              ? true
              : false
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
        <a-checkbox
          class="checkbox-item vertical-item"
          v-for="(item, index) in colors"
          :key="index"
          :checked="
            filteredItems.find(
              (_item) => _item.type === 'colors' && _item.uuid === item
            )
              ? true
              : false
          "
          @change="(_) => colorsChanged(item)"
        >
          {{ item }}
        </a-checkbox>
      </div>
    </div>
    <div class="checkbox-filters size-wrapper">
      <div class="text">Size</div>
      <div class="checkbox-list horizontal-list">
        <a-checkbox
          class="checkbox-item vertical-item size"
          v-for="(item, index) in size"
          :key="index"
          :checked="
            filteredItems.find(
              (_item) => _item.type === 'size' && _item.uuid === item
            )
              ? true
              : false
          "
          @change="(_) => sizeChanged(item)"
        >
          {{ item }}
        </a-checkbox>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
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
  },
  data() {
    return {
      filterItems: ["Men", "Black", "Red", "Summer"],
      colors: ["Black", "Green", "Orange", "Blue", "White"],
      size: ["S", "M", "L", "XL"],
    };
  },
  computed: {
    ...mapGetters("products", ["collections", "categories"]),
  },
  methods: {
    collectionsChanged(item) {
      this.onCollectionsChange(item);
    },
    categoriesChanged(item) {
      this.onCategoriesChange(item);
    },
    colorsChanged(item) {
      this.onColorsChange(item);
    },
    sizeChanged(item) {
      this.onSizeChange(item);
    },
    delFilter(item) {
      this.onDelFilter(item);
    },
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
