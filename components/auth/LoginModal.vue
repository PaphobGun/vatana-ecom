<template>
  <a-modal :visible="isShow" @cancel="closeModal" :footer="null">
    <div class="login-modal">
      <div class="logo-row">
        <img src="~assets/images/vatana-no-bg.png" class="logo-icon" />
      </div>
      <a-form
        id="login-password-form"
        :form="form"
        class="auth-form login-form"
        @submit="handleSubmit"
        :colon="false"
        hideRequiredMark
      >
        <a-form-item label="Email" class="email">
          <a-input
            v-decorator="[
              'email',
              {
                rules: [
                  { required: true, message: 'Please input your email!' },
                  {
                    type: 'email',
                    message: 'The input is not valid E-mail!',
                  },
                ],
                initialValue: emailInput,
              },
            ]"
            @input="onEmailChange"
          />
          <div v-if="emailError" class="error">
            {{ emailError }}
          </div>
        </a-form-item>
        <a-form-item label="Password" class="password">
          <a-input
            v-decorator="[
              'password',
              {
                rules: [
                  { required: true, message: 'Please input your password!' },
                ],
              },
            ]"
            type="password"
            @input="onPasswordChange"
          />
          <div v-if="passwordError" class="error">
            {{ passwordError }}
          </div>
        </a-form-item>
        <div class="remember-row">
          <div class="remember">
            <a-checkbox v-model="isRemember"> Remember me </a-checkbox>
          </div>
          <div @click="onClickForgotPassword" class="forgot">
            Forgot Password?
          </div>
        </div>
        <a-button class="submit" html-type="submit" block> SIGN IN </a-button>
      </a-form>
      <div class="separator mt-10">
        <div class="line" />
        <h2 class="text">OR</h2>
        <div class="line" />
      </div>
      <a-button block class="social-btn mt-20">
        <img
          src="~assets/images/facebook-icon.svg"
          alt=""
          class="social-btn-icon"
        />
        <span> Continue with Facebook </span>
      </a-button>
      <a-button block class="social-btn mt-10" @click="onClickSigninGoogle">
        <img
          src="~assets/images/google-icon.svg"
          alt=""
          class="social-btn-icon"
        />
        <span> Continue with Google </span>
      </a-button>
      <div class="signup-row mt-20">
        <span> Don't have any account? </span>
        <span @click="openSignupModal"> Sign Up </span>
      </div>
    </div>
  </a-modal>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  props: {
    isShow: {
      type: Boolean,
      default: false,
    },
    onClose: {
      type: Function,
      default: () => {},
    },
  },
  beforeCreate() {
    this.form = this.$form.createForm(this, { name: "login-form" });
  },
  data() {
    return {
      emailError: "",
      passwordError: "",
      isRemember: false,
    };
  },
  computed: {
    ...mapGetters("auth", ["emailInput"]),
  },
  methods: {
    async handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields(async (err, { email, password }) => {
        if (!err) {
          const loginError = await this.loginWithEmailAndPassword({
            email,
            password,
            isRemember: this.isRemember,
          });

          if (!loginError) {
            return this.closeModal();
          }

          if (loginError.code === "auth/user-not-found") {
            this.emailError = loginError.message;
          }

          if (loginError.code === "auth/wrong-password") {
            this.passwordError = loginError.message;
          }
        }
      });
    },
    async onClickSigninGoogle() {
      const error = await this.signInWithGoogle();
      if (!error) {
        this.closeModal();
      }
    },
    onEmailChange() {
      this.emailError = "";
    },
    onPasswordChange() {
      this.passwordError = "";
    },
    onClickForgotPassword() {
      this.closeModal();
      this.$emit("openRequestResetPasswordModal");
    },
    openSignupModal() {
      this.closeModal();
      this.$emit("openSignupModal");
    },
    closeModal() {
      this.onClose();
      this.emailError = "";
      this.passwordError = "";
      this.form.resetFields();
    },
    ...mapActions("auth", ["loginWithEmailAndPassword", "signInWithGoogle"]),
  },
};
</script>

<style lang="less" scoped>
::v-deep .ant-modal-close-x {
  font-size: 20px;
  color: #000;
}

::v-deep .ant-modal-body {
  padding: 24px 32px;
}

.login-modal {
  .error {
    line-height: 1.3;
    margin-top: 10px;
    color: #ff4d4f;
  }
  .logo-row {
    display: flex;
    justify-content: center;
    .logo-icon {
      width: 150px;
    }
  }
  .login-form {
    .remember-row {
      display: flex;
      justify-content: space-between;
      align-items: center;

      font-weight: 200;
      font-size: 16px;
      color: #000000d9;

      ::v-deep .ant-checkbox-wrapper {
        span:nth-child(2) {
          font-size: 16px;
          color: #000000d9;
        }
      }

      .forgot {
        text-decoration: underline;
      }
    }

    .submit {
      margin-top: 20px;
    }
  }

  .social-btn {
    height: 48px;
    color: #000;
    font-size: 18px;
    font-family: sans-serif;
    border-color: #fff;
    box-shadow: 0px 3px 12px #00000029;

    &:hover,
    &:focus {
      border-color: #fff;
    }

    &-icon {
      width: 20px;
      margin-right: 5px;
    }
  }

  .signup-row {
    display: flex;
    justify-content: space-between;
    align-items: center;

    span:nth-child(2) {
      text-decoration: underline;
      font-size: 18px;
      color: #000;
      cursor: pointer;
    }
  }
}
</style>
