<template>
  <div class="orders">
    <div class="container mx-auto">
      <h1 class="mt-20">My Orders</h1>
      <a-divider />
      <div class="order-list">
        <a-row
          class="order-item"
          v-for="o in orders"
          :key="o.id"
          :gutter="[8, 8]"
        >
          <a-col :lg="{ span: 5 }">
            <span class="label">OrderNO:</span> {{ o.no }}
          </a-col>
          <a-col :lg="{ span: 10 }">
            <div v-for="p in o.products" :key="p.product_id">
              {{ p.product.name }}
            </div>
          </a-col>
          <a-col :lg="{ span: 4 }">
            <div><span class="label">Status:</span> {{ o.status }}</div>
            <div>
              <span class="label">TrackingNO:</span> {{ o.tracking_no }}
            </div>
          </a-col>
          <a-col :lg="{ span: 5 }">
            <div>
              {{ formatDate(o.createdAt) }}
            </div>
            <div>
              <span class="label">Total Price:</span>
              {{ formatCurrency(o.payments.amount) }}
            </div>
          </a-col>
        </a-row>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

import { formatCurrency, formatDate } from "@/utils/common";

export default {
  async created() {
    await this.getOrders();
  },
  computed: {
    ...mapGetters("order", ["orders"]),
  },
  methods: {
    formatCurrency,
    formatDate,
    ...mapActions("order", ["getOrders"]),
  },
};
</script>

<style lang="less" scoped>
.orders {
  .order-list {
    min-height: 400px;

    .order-item {
      &:nth-child(1) {
        padding-top: 0px;
      }

      padding-top: 20px;
      padding-bottom: 10px;
      border-bottom: 1px solid #e8e8e8;

      .label {
        font-weight: 600;
      }
    }
  }
}
</style>
