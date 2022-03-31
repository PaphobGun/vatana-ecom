<template>
  <div>
    <profile />
  </div>
</template>

<script>
import Profile from "@/components/profile";
export default {
  components: {
    Profile,
  },
  middleware: "authenMiddleware",
};
</script>

<style lang="less" scoped></style>
