<template>
  <a-layout-header class="nav-header">
    <div class="left-menu">
      <div class="menu-item">PRODUCT</div>
      <div class="menu-item">PROMOTION</div>
      <div class="menu-item">LOOKBOOK</div>
    </div>
    <div class="center-menu">
      <div class="logo-title">LOGO</div>
    </div>
    <div class="right-menu">
      <a-icon class="menu-icon" type="search" />
      <a-icon class="menu-icon" type="heart" />
      <a-icon class="menu-icon" type="shopping" />
      <div class="menu-item">SIGN IN</div>
    </div>
  </a-layout-header>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
.nav-header {
  height: 95px;
  background-color: #fff;
  border-bottom: 1px solid #333;
  position: relative;
  display: flex;
  align-items: center;

  .left-menu {
    display: flex;

    .menu-item {
      margin-right: 10px;
      font-size: 16px;
      color: #000;
    }
  }

  .center-menu {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);

    .logo-title {
      font-size: 32px;
      color: #000;
    }
  }

  .right-menu {
    display: flex;
    margin-left: auto;
    align-items: center;

    .menu-icon {
      font-size: 16px;
      color: #000;
      margin-right: 15px;
    }

    .menu-icon:nth-child(3) {
      margin-right: 20px;
    }

    .menu-item {
      margin-right: 10px;
      font-size: 16px;
      color: #000;
    }
  }
}
</style>
