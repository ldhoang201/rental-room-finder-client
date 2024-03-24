<template>
  <a-form-model
    :form="form"
    :layout="formLayout"
    @submit.prevent="handleSubmit"
    class="max-w-md mx-auto mt-8 border p-4 rounded-lg w-full"
  >
    <p class="text-2xl font-bold">Tạo tài khoản mới</p>
    <br />
    <a-form-model-item label="Họ Tên" required>
      <a-input v-model="form.userName" />
    </a-form-model-item>
    <a-form-model-item label="Email" required>
      <a-input v-model="form.email" />
    </a-form-model-item>
    <a-form-model-item label="Số Điện Thoại" required>
      <a-input v-model="form.phone" />
    </a-form-model-item>
    <a-form-model-item label="Mật Khẩu" required>
      <a-input type="password" v-model="form.password" />
    </a-form-model-item>
    <a-form-model-item label="Loại Tài Khoản">
      <a-radio-group v-model="form.accountType">
        <a-radio value="landlord">Chủ trọ</a-radio>
        <a-radio value="tenant">Tìm kiếm</a-radio>
      </a-radio-group>
    </a-form-model-item>
    <a-form-model-item>
      <a-button class="mx-auto block" type="primary" html-type="submit"
        >Tạo Tài Khoản</a-button
      >
    </a-form-model-item>
  </a-form-model>
</template>

<script>
import { mapMutations, mapActions } from "vuex";

export default {
  data() {
    return {
      formLayout: "vertical",
      form: {
        userName: "",
        phone: "",
        email: "",
        password: "",
        accountType: "landlord",
      },
    };
  },
  methods: {
    ...mapMutations({
      SET_USER_TEMP: "modules/auth/SET_USER_TEMP",
    }),
    ...mapActions({
      sendOTP: "modules/auth/sendOTP",
    }),
    async handleSubmit() {
      const roleId = this.form.accountType === "landlord" ? 2 : 3;
      delete this.form.accountType;
      this.form.roleId = roleId;
      this.SET_USER_TEMP(this.form);
      await this.sendOTP(this.form.email);
      this.$router.push("/verify-email");

      console.log("Form submitted:", this.form);
    },
  },
};
</script>

<style scoped></style>
