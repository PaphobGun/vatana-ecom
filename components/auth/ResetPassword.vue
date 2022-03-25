<template>
  <div class="reset-password">
    <div class="capped mx-auto">
      <h1 class="title">Reset Password</h1>
      <a-form
        id="create-new-password-form"
        :form="form"
        class="auth-form create-new-password-form"
        @submit="handleSubmit"
        :colon="false"
        hideRequiredMark
      >
        <a-form-item label="New Password" class="password mt-20">
          <a-input
            v-decorator="[
              'password',
              {
                rules: [
                  {
                    required: true,
                    message: 'Please input your new password!',
                  },
                  {
                    validator: validateToNextPassword,
                  },
                ],
              },
            ]"
            type="password"
            @input="onPasswordChange"
          />
          <a-form-item label="Confirm Password" class="password mt-10">
            <a-input
              v-decorator="[
                'confirmPassword',
                {
                  rules: [
                    {
                      required: true,
                      message: 'Please input your confirm password!',
                    },
                    {
                      validator: compareToFirstPassword,
                    },
                  ],
                },
              ]"
              type="password"
              @blur="handleConfirmBlur"
              @input="onPasswordChange"
            />
            <div v-if="passwordError" class="error">
              {{ passwordError }}
            </div>
          </a-form-item>
        </a-form-item>
        <a-button class="submit mt-20" html-type="submit" block
          >RESET PASSWORD</a-button
        >
      </a-form>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  beforeCreate() {
    this.form = this.$form.createForm(this, {
      name: "create-new-password-form",
    });
  },
  data() {
    return {
      confirmDirty: false,
      passwordError: "",
    };
  },
  methods: {
    onPasswordChange() {
      this.passwordError = "";
    },
    handleConfirmBlur(e) {
      const value = e.target.value;
      this.confirmDirty = this.confirmDirty || !!value;
    },
    validateToNextPassword(rule, value, callback) {
      const form = this.form;
      if (value && this.confirmDirty) {
        form.validateFields(["confirmPassword"], { force: true });
      }
      callback();
    },
    compareToFirstPassword(rule, value, callback) {
      const form = this.form;
      if (value && value !== form.getFieldValue("password")) {
        callback("Two passwords that you enter is inconsistent!");
      } else {
        callback();
      }
    },
    async handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields(async (err, { password }) => {
        if (!err) {
          const resetPasswordError = await this.resetPassword({
            oobCode: this.$route.query.oobCode,
            password,
          });
          if (!resetPasswordError) {
            this.$notification.success({
              message: "Password changed successfully!",
            });
            return this.$router.push({ path: "/" });
          }

          if (resetPasswordError.code === "auth/argument-error") {
            this.passwordError = resetPasswordError.message;
          }
        }
      });
    },
    ...mapActions("auth", ["resetPassword"]),
  },
};
</script>

<style lang="less" scoped>
.reset-password {
  .error {
    line-height: 1.3;
    margin-top: 10px;
    color: #ff4d4f;
  }
  .capped {
    margin-top: 40px;
    margin-bottom: 40px;
    max-width: 310px;

    .title {
      font-weight: 200;
      font-family: sans-serif;
    }
  }
}
</style>
