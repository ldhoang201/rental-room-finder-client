<template>
  <a-form-model
    :form="form"
    :layout="formLayout"
    @submit.prevent="handleLogin"
    class="max-w-md mx-auto mt-8 border p-4 rounded-lg w-full"
  >
    <p class="text-2xl font-bold">Đăng nhập</p>
    <br />
    <a-form-model-item label="Email" required>
      <a-input v-model="form.email" />
    </a-form-model-item>
    <a-form-model-item label="Mật Khẩu" required>
      <a-input type="password" v-model="form.password" />
    </a-form-model-item>
    <a-form-model-item>
      <a-button class="mx-auto block" type="primary" html-type="submit"
        >Đăng nhập
      </a-button>
    </a-form-model-item>
    <div>
      <router-link to="/forgot-password"> Bạn quên mật khẩu? </router-link>
      <router-link to="/register"> Tạo tài khoản mới </router-link>
    </div>
  </a-form-model>
</template>

<script>
import { mapMutations, mapActions } from "vuex";

export default {
  data() {
    return {
      formLayout: "vertical",
      form: {
        email: "",
        password: "",
      },
    };
  },
  methods: {
    ...mapActions({
      login: "modules/auth/login",
    }),
    async handleLogin() {
      const { message } = await this.login({
        email: this.form.email,
        password: this.form.password,
      });
      if (message) {
        console.log(message);
      } else {
        this.$router.push("/");
        setTimeout(() => {
          location.reload();
        }, 10);
      }
    },
  },
};
</script>

<style scoped></style>
