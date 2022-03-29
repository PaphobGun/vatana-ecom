<template>
  <!-- <Homepage /> -->
  <div>Redirecting...</div>
</template>

<script>
import Homepage from "@/components/homepage";
export default {
  name: "IndexPage",
  components: {
    Homepage,
  },
  created() {
    this.$router.push({ path: "/products" });
  },
};
</script>
