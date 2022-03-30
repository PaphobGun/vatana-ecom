<template>
  <a-layout-header class="nav-header">
    <div class="container">
      <section class="top-nav">
        <input id="menu-toggle" type="checkbox" />
        <label class="menu-button-container" for="menu-toggle">
          <div class="menu-button"></div>
        </label>
        <ul class="menu">
          <li class="menu-dis">
            <nuxt-link to="/products"> PRODUCT </nuxt-link>
          </li>
          <li class="menu-dis">
            <nuxt-link to="/new-arrival"> NEW ARRIVAL </nuxt-link>
          </li>
          <li class="menu-dis">
            <nuxt-link to="/lookbooks">LOOKBOOK </nuxt-link>
          </li>
        </ul>
      </section>
      <div class="center-menu">
        <nuxt-link to="/">
          <img src="~assets/images/vatana-no-bg.png" alt="" class="logo-icon" />
        </nuxt-link>
      </div>
      <div class="right-menu">
        <a-icon class="menu-icon" type="search" />
        <a-icon v-if="!isMobile" class="menu-icon" type="heart" />
        <a-icon @click="onClickCart" class="menu-icon" type="shopping" />
        <a-icon v-if="isTablet" class="menu-icon" type="user" />
        <a-dropdown class="menu-item">
          <a-icon type="user" />
          <a-menu slot="overlay" @click="onClickAuthMenu">
            <a-menu-item key="profile" v-if="isLoggedIn">
              <nuxt-link to="/profile"> Profile </nuxt-link>
            </a-menu-item>
            <a-menu-item key="in" v-if="!isLoggedIn"> Sign in </a-menu-item>
            <a-menu-item key="out" v-else> Sign out </a-menu-item>
          </a-menu>
        </a-dropdown>
      </div>
    </div>
    <LoginModal
      :isShow="isShowLoginModal"
      :onClose="closeLoginModal"
      @openSignupModal="showRegisterModal"
      @openRequestResetPasswordModal="showRequestResetPasswordModal"
    />
    <RegisterModal
      :isShow="isShowRegisterModal"
      :onClose="closeRegisterModal"
      @openSigninModal="showLoginModal"
    />
    <RequestResetPasswordModal
      :isShow="isShowRequestResetPasswordModal"
      :onClose="closeRequestResetPasswordModal"
    />
    <a-drawer
      :title="`Shopping Cart (${totalAmount})`"
      placement="right"
      :visible="isShowCart"
      @close="closeCart"
      class="cart-drawer"
    >
      <cart />
    </a-drawer>
  </a-layout-header>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import LoginModal from "../auth/LoginModal.vue";
import RegisterModal from "../auth/RegisterModal.vue";
import RequestResetPasswordModal from "../auth/RequestResetPasswordModal.vue";
import Cart from "@/components/Cart";

export default {
  components: {
    LoginModal,
    RegisterModal,
    RequestResetPasswordModal,
    Cart,
  },
  data() {
    return {
      isShowLoginModal: false,
      isShowRegisterModal: false,
      isShowRequestResetPasswordModal: false,
    };
  },
  methods: {
    async onClickCart() {
      await this.getCartItems();
      this.setIsShowCart(true);
    },
    closeCart() {
      this.setIsShowCart(false);
    },
    onClickAuthMenu(menu) {
      if (menu.key === "in") {
        this.showLoginModal();
      } else if (menu.key === "out") {
        this.signOut();
      }
    },
    showLoginModal() {
      this.isShowLoginModal = true;
    },
    closeLoginModal() {
      this.isShowLoginModal = false;
    },
    showRegisterModal() {
      this.isShowRegisterModal = true;
    },
    closeRegisterModal() {
      this.isShowRegisterModal = false;
    },
    showRequestResetPasswordModal() {
      this.isShowRequestResetPasswordModal = true;
    },
    closeRequestResetPasswordModal() {
      this.isShowRequestResetPasswordModal = false;
    },
    ...mapActions("common", ["setIsShowCart"]),
    ...mapActions("auth", ["signOut"]),
    ...mapActions("cart", ["getCartItems"]),
  },
  computed: {
    ...mapGetters("common", ["isMobile", "isTablet", "isShowCart"]),
    ...mapGetters("auth", ["isLoggedIn"]),
    ...mapGetters("cart", ["totalAmount"]),
  },
};
</script>

<style lang="less" scoped>
h2 {
  vertical-align: center;
  text-align: center;
}

html,
body {
  margin: 0;
  height: 100%;
}

* {
  font-family: "Raleway";
  box-sizing: border-box;
}

.container {
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.top-nav {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  color: #000;
  height: 95px;
}

.menu {
  display: flex;
  flex-direction: row;
  list-style-type: none;
  margin: 0;
  padding: 0;
}

.menu > li {
  margin-right: 1rem;
  line-height: initial;
}

.menu {
  a {
    color: #000;
  }
}

.menu-button-container {
  display: none;
  height: 100%;
  width: 30px;
  cursor: pointer;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

#menu-toggle {
  display: none;
}

.menu-button,
.menu-button::before,
.menu-button::after {
  display: block;
  background-color: #000;
  position: absolute;
  height: 4px;
  width: 30px;
  transition: transform 400ms cubic-bezier(0.23, 1, 0.32, 1);
  border-radius: 2px;
}

.menu-button::before {
  content: "";
  margin-top: -8px;
}

.menu-button::after {
  content: "";
  margin-top: 8px;
}

#menu-toggle:checked + .menu-button-container .menu-button::before {
  margin-top: 0px;
  transform: rotate(405deg);
}

#menu-toggle:checked + .menu-button-container .menu-button {
  background: rgba(255, 255, 255, 0);
}

#menu-toggle:checked + .menu-button-container .menu-button::after {
  margin-top: 0px;
  transform: rotate(-405deg);
}

@media (max-width: 768px) {
  .menu-button-container {
    display: flex;
  }
  .menu {
    position: absolute;
    top: 0;
    margin-top: 95px;
    left: 0;
    flex-direction: column;
    width: 100%;
    justify-content: center;
    align-items: center;
    z-index: 20;
  }
  #menu-toggle ~ .menu li {
    height: 0;
    margin: 0;
    padding: 0;
    border: 0;
    transition: height 400ms cubic-bezier(0.23, 1, 0.32, 1);
  }

  #menu-toggle ~ .menu .menu-dis {
    display: none;
  }
  #menu-toggle:checked ~ .menu li {
    border: 1px solid #333;
    height: 2.5em;
    padding: 0.5em;
    transition: height 400ms cubic-bezier(0.23, 1, 0.32, 1);
  }

  #menu-toggle:checked ~ .menu .menu-dis {
    display: block;
  }
  .menu > li {
    display: flex;
    justify-content: center;
    margin: 0;
    padding: 0.5em 0;
    width: 100%;
    color: #000;
    background-color: #fff;
  }
  .menu > li:not(:last-child) {
    border-bottom: 1px solid #444;
  }
}

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

  .burger-menu {
    display: none;
  }

  .center-menu {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);

    .logo-icon {
      width: 150px;
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
      cursor: pointer;
    }

    .menu-item {
      cursor: pointer;
      font-size: 16px;
      color: #000;
    }
  }

  @media only screen and (max-width: 576px) {
    .left-menu {
      display: none;
    }

    .burger-menu {
      display: block;
    }
  }
}
</style>
