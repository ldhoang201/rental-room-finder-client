<template>
  <div class="change-password-container">
    <h2 class="change-password-title">Đổi mật khẩu</h2>
    <a-input
      v-model="password"
      type="password"
      placeholder="Mật khẩu mới"
      class="mb-4 w-1/5"
    />
    <br />
    <a-input
      v-model="confirmPassword"
      type="password"
      placeholder="Nhập lại mật khẩu mới"
      class="mb-4 w-1/5"
    />
    <br />
    <a-button type="primary" @click="updatePassword"> Đổi mật khẩu </a-button>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import { message } from "ant-design-vue";

export default {
  layout: "manage",
  data() {
    return {
      password: "",
      confirmPassword: "",
    };
  },

  computed: {
    ...mapState({
      currentUser: (state) => state.modules["user"].currentUser,
    }),
  },
  mounted() {},
  methods: {
    ...mapActions({
      updateUserPassword: "modules/user/updateUserPassword",
    }),
    async updatePassword() {
      if (this.password !== this.confirmPassword) {
        message.error("Mật khẩu nhập lại không khớp!");
        return;
      }

      const userData = {
        user_id: this.currentUser.user_id,
        password: this.password,
      };

      await this.updateUserPassword(userData)
        .then(() => {
          message.success("Đổi mật khẩu thành công");
        })
        .catch((error) => {
          message.error("Đổi mật khẩu không thành công!");
        });
    },
  },
};
</script>

<style scoped>
.change-password-container {
  text-align: center;
}

.change-password-title {
  margin-bottom: 20px;
}
</style>
