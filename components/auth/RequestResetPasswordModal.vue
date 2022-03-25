<template>
  <a-modal :visible="isShow" @cancel="closeModal" :footer="null">
    <div class="request-reset-password-modal">
      <div class="logo-row">
        <img src="~assets/images/vatana-no-bg.png" alt="" class="logo-icon" />
      </div>
      <div class="info mt-20">
        Please enter your email address. You will receive a link to create a new
        password via email.
      </div>
      <a-form
        id="reset-password-form"
        :form="form"
        class="auth-form reset-password-form"
        @submit="handleSubmit"
        :colon="false"
        hideRequiredMark
      >
        <a-form-item label="Email" class="email mt-20">
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
              },
            ]"
            @input="onEmailChange"
          />
          <div v-if="emailError" class="error">
            {{ emailError }}
          </div>
        </a-form-item>
        <a-button class="submit mt-20" html-type="submit" block
          >RESET PASSWORD</a-button
        >
      </a-form>
      <div class="separator mt-10">
        <div class="line" />
        <h2 class="text">OR</h2>
        <div class="line" />
      </div>
      <div class="signup-row mt-20">
        <span> Already have and account? </span>
        <span @click="openSigninModal"> Sign In </span>
      </div>
    </div>
  </a-modal>
</template>

<script>
import { mapActions } from "vuex";

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
    this.form = this.$form.createForm(this, { name: "reset-password-form" });
  },
  data() {
    return {
      emailError: "",
    };
  },
  methods: {
    onEmailChange() {
      this.emailError = "";
    },
    openSigninModal() {
      this.closeModal();
      this.$emit("openSigninModal");
    },
    closeModal() {
      this.onClose();
      this.emailError = "";
      this.form.resetFields();
    },
    async handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields(async (err, { email }) => {
        if (!err) {
          const resetPasswordError = await this.requestResetPassword(email);

          console.log(resetPasswordError);

          if (!resetPasswordError) {
            this.$notification.success({
              message: "Password reset email send!",
            });
            return this.closeModal();
          }

          if (resetPasswordError.code === "auth/user-not-found") {
            this.emailError = resetPasswordError.message;
          }
        }
      });
    },
    ...mapActions("auth", ["requestResetPassword"]),
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
.request-reset-password-modal {
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

  .info {
    text-align: center;
    padding: 0 30px;
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
