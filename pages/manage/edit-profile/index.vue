<template>
  <div v-if="currentUser">
    <h1 class="text-3xl font-semibold mb-8">Cập nhật thông tin cá nhân</h1>
    <a-form-model
      ref="userForm"
      :model="form"
      :rules="rules"
      @submit.prevent="handleUpdateUser"
      class="max-w-md mx-auto"
    >
      <a-form-item label="Mã thành viên">
        <a-input v-model="form.user_id" disabled />
      </a-form-item>

      <a-form-item label="Họ tên" required>
        <a-input v-model="form.user_name" />
      </a-form-item>

      <a-form-item label="Email">
        <a-input :value="form.email" type="email" disabled />
        <br />
        <router-link to="manage/change-email">Đổi email</router-link>
      </a-form-item>

      <a-form-item label="Số điện thoại" required>
        <a-input v-model="form.phone" />
      </a-form-item>

      <a-form-item label="Mật khẩu">
        <a-input disabled type="password" />
        <router-link to="change-password">Đổi mật khẩu</router-link>
      </a-form-item>

      <a-form-item label="Ảnh đại diện">
        <a-upload :show-upload-list="false" :before-upload="handleFileUpload">
          <a-avatar
            :src="form.avatar"
            v-if="form.avatar"
            :size="100"
            class="cursor-pointer"
            :class="{ 'border-blue-500': form.avatar }"
            :style="{ 'border-width': form.avatar ? '2px' : '0' }"
          />
          <a-avatar icon="user" v-else :size="100" class="cursor-pointer" />
        </a-upload>
      </a-form-item>

      <a-form-item>
        <a-button :loading="loading" type="primary" html-type="submit"
          >Cập nhật</a-button
        >
      </a-form-item>
    </a-form-model>
  </div>
</template>

<script>
import { FormModel, Input, Button, message } from "ant-design-vue";
import { mapActions, mapState } from "vuex";
import { jwtDecode } from "jwt-decode";

export default {
  layout: "manage",
  components: {
    "a-form-model": FormModel,
    "a-form-item": FormModel.Item,
    "a-input": Input,
    "a-button": Button,
  },
  data() {
    return {
      rules: {
        username: [
          {
            required: true,
            message: "Please input your username",
            trigger: "blur",
          },
        ],
        email: [
          {
            required: true,
            message: "Please input your email",
            trigger: "blur",
          },
          {
            type: "email",
            message: "Invalid email",
            trigger: ["blur", "change"],
          },
        ],
        password: [
          {
            required: true,
            message: "Please input your password",
            trigger: "blur",
          },
        ],
      },
      form: {
        user_id: null,
        user_name: null,
        email: null,
        phone: null,
        avatar: null,
      },
      loading: false,
      tempFile: null,
    };
  },
  async created() {
    if (process.browser) {
      const token = localStorage.getItem("accessToken");
      const decoded = jwtDecode(token);
      await this.fetchUserById(decoded.user.user_id);
      this.form = {
        user_id: this.currentUser.user_id,
        user_name: this.currentUser.user_name,
        phone: this.currentUser.phone,
        email: this.currentUser.email,
        avatar: this.currentUser.avatar,
      };
    }
  },
  computed: {
    ...mapState({
      currentUser: (state) => state.modules["user"].currentUser,
    }),
  },
  methods: {
    ...mapActions({
      fetchUserById: "modules/user/fetchUserById",
      uploadImage: "modules/upload-image/uploadImage",
      updateUser: "modules/user/updateUser",
    }),
    async handleFileUpload(file) {
      try {
        this.tempFile = file;
        this.form.avatar = URL.createObjectURL(file);
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    },
    async handleUpdateUser() {
      this.loading = true;
      try {
        if (this.tempFile) {
          this.form.avatar = await this.uploadImage(this.tempFile);
        }
        await this.updateUser(this.form);
        message.success("Cập nhật thành công");
      } catch (error) {
        message.error("Cập nhật thất bại");
      }
    },
  },
};
</script>
