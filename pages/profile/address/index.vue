<template>
  <div>
    <address-form />
  </div>
</template>

<script>
import AddressForm from "@/components/profile/AddressForm.vue";
export default {
  components: {
    AddressForm,
  },
  middleware: "authenMiddleware",
};
</script>

<style lang="less" scoped></style>
