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
        v-for="(item, idx) in filterItems"
        :key="idx"
      >
        <span class="name">{{ item }}</span
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
        >
          {{ item }}
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
        >
          {{ item }}
        </a-checkbox>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      filterItems: ["Men", "Black", "Red", "Summer"],
      collections: ["New Arrivals", "Summer", "Winter", "CNY 2021"],
      categories: ["Men", "Women", "Sport"],
    };
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

    .text {
      font-size: 16px;
      color: #000000;
    }

    .checkbox-list {
      margin-top: 10px;
      display: flex;
      flex-direction: column;
      align-items: flex-start;

      .checkbox-item {
        font-size: 12px;
        color: #000000;
        margin-left: 0;
        font-weight: 300;
      }
    }
  }
}
</style>
