<template>
  <div class="grid grid-cols-5 h-screen">
    <!-- Sidebar -->
    <div class="col-span-1 bg-gray-200 p-6">
      <!-- User Info -->
      <div class="flex items-center mb-6">
        <a-avatar
          :src="user.avatar"
          v-if="user.avatar"
          :size="60"
          :class="{ 'border-blue-500': user.avatar }"
          :style="{
            'border-width': user.avatar ? '2px' : '0',
            'margin-right': '20px',
          }"
        />
        <a-avatar icon="user" v-else :size="60" />
        <div>
          <div class="font-bold">{{ user.name }}</div>
          <div>{{ user.phone }}</div>
          <div>Tài khoản: {{ user.balance }}</div>
        </div>
      </div>
      <!-- Sidebar Menu -->
      <nav>
        <ul class="space-y-2">
          <li>
            <router-link
              :to="{ path: '/manage' }"
              :class="{ 'text-blue-500': $route.path === '/manage' }"
              ><i class="fa fa-home" aria-hidden="true"></i> Trang quản
              lý</router-link
            >
          </li>
          <li>
            <router-link
              :to="{ path: '/manage/posts' }"
              :class="{ 'text-blue-500': $route.path === '/manage/posts' }"
              ><i class="fa fa-file-text-o mr-2"></i>Quản lý tin
              đăng</router-link
            >
          </li>
          <li>
            <router-link
              :to="{ path: '/manage/edit-profile' }"
              :class="{
                'text-blue-500': $route.path === '/manage/edit-profile',
              }"
              ><i class="fa fa-user mr-2"></i>Sửa thông tin cá nhân</router-link
            >
          </li>
          <li>
            <router-link
              :to="{ path: '/manage/deposit' }"
              :class="{ 'text-blue-500': $route.path === '/manage/deposit' }"
              ><i class="fa fa-money mr-2"></i>Nạp tiền vào tài
              khoản</router-link
            >
          </li>
          <li>
            <router-link
              :to="{ path: '/manage/payment-history' }"
              :class="{
                'text-blue-500': $route.path === '/manage/payment-history',
              }"
              ><i class="fa fa-history mr-2"></i>Lịch sử thanh toán</router-link
            >
          </li>
          <li>
            <router-link
              :to="{ path: '/manage/pricing' }"
              :class="{ 'text-blue-500': $route.path === '/manage/pricing' }"
              ><i class="fa fa-money mr-2"></i>Bảng giá dịch vụ</router-link
            >
          </li>
          <li>
            <router-link
              :to="{ path: '/manage/contact' }"
              :class="{ 'text-blue-500': $route.path === '/manage/contact' }"
              ><i class="fa fa-phone mr-2"></i>Liên hệ</router-link
            >
          </li>
          <li>
            <a
              @click="logout"
              class="text-red-500 hover:text-red-700 cursor-pointer"
              ><i class="fa fa-sign-out mr-2"></i>Thoát</a
            >
          </li>
        </ul>
      </nav>
    </div>
    <div class="col-span-4 p-6">
      <Nuxt />
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import { jwtDecode } from "jwt-decode";

export default {
  data() {
    return {
      user: {
        name: null,
        phone: null,
        balance: null,
        avatar: null,
      },
    };
  },
  async created() {
    if (process.browser) {
      const token = localStorage.getItem("accessToken");
      const decoded = jwtDecode(token);
      await this.fetchUserById(decoded.user.user_id);
      console.log(this.currentUser);
      this.user = {
        name: this.currentUser.user_name,
        phone: this.currentUser.phone,
        balance: this.currentUser.balance,
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
    }),
    logout() {
    },
  },
};
</script>

<style scoped>

</style>
