<template>
  <header class="text-white py-4">
    <div class="container mx-auto flex justify-between items-center">
      <div>
        <router-link to="/">
          <img :src="appLogo" alt="Logo" class="h-20 w-50" />
        </router-link>
      </div>

      <div class="flex items-center space-x-4">
        <router-link
          to="/saved-post"
          class="text-base btn hover:underline hover:text-white"
        >
          <i class="fa fa-heart text-red-600" aria-hidden="true"></i> Yêu thích
        </router-link>
        <router-link
          v-if="!accessToken"
          to="/register"
          class="text-base btn hover:underline hover:text-white"
        >
          <i class="fa fa-sign-in" aria-hidden="true"></i> Đăng ký
        </router-link>
        <router-link
          v-if="!accessToken"
          to="/login"
          class="text-base btn hover:underline hover:text-white"
        >
          <i class="fa fa-user-plus" aria-hidden="true"></i> Đăng nhập
        </router-link>
        <div v-if="accessToken" class="flex items-center space-x-4">
          <div class="grid grid-cols-1 gap-2 text-white">
            <span>Xin chào, {{ user.userName }}</span>
            <span class="ml-2">Số dư: {{ user.balance }}</span>
          </div>

          <a-dropdown>
            <a-avatar :src="user.avatar" :size="48" style="cursor: pointer" />
            <a-menu slot="overlay">
              <a-menu-item key="manage">
                <router-link to="/manage">Trang quản lý</router-link>
              </a-menu-item>
              <a-menu-item key="logout" @click="handleLogout"
                >Đăng xuất</a-menu-item
              >
            </a-menu>
          </a-dropdown>
        </div>
        <router-link
          to="manage/new-post"
          class="btn bg-custom-pink border rounded border-solid border-gray-300 px-6 py-2 hover:underline hover:text-white"
        >
          Đăng tin mới <i class="fa fa-plus-circle" aria-hidden="true"></i>
        </router-link>
      </div>
    </div>

    <br />
    <nav class="bg-custom-blue mx-auto py-2 w-full">
      <ul class="flex justify-center space-x-4">
        <li>
          <router-link
            to="/"
            class="nav-link"
            @click="setActive('home')"
            :class="{ active: activeLink === 'home' }"
            >Trang chủ</router-link
          >
        </li>
        <li>
          <router-link
            to="/phongtro"
            class="nav-link"
            @click="setActive('phongtro')"
            :class="{ active: activeLink === 'phongtro' }"
            >Phòng trọ</router-link
          >
        </li>
        <li>
          <router-link
            to="/timoghep"
            class="nav-link"
            @click="setActive('timoghep')"
            :class="{ active: activeLink === 'timoghep' }"
            >Tìm ở ghép</router-link
          >
        </li>
        <li>
          <router-link
            to="/banggia"
            class="nav-link"
            @click="setActive('banggia')"
            :class="{ active: activeLink === 'banggia' }"
            >Bảng giá</router-link
          >
        </li>
        <li>
          <router-link
            to="/dichvu"
            class="nav-link"
            @click="setActive('dichvu')"
            :class="{ active: activeLink === 'dichvu' }"
            >Dịch vụ</router-link
          >
        </li>
      </ul>
    </nav>
  </header>
</template>

<script>
import appLogo from "../../../static/app-logo.png";
import { jwtDecode } from "jwt-decode";
import { mapState, mapMutations, mapActions } from "vuex";

export default {
  name: "Header",
  data() {
    return {
      activeLink: null,
      appLogo,
      accessToken: null,
      user: {
        userName: null,
        avatar: null,
        balance: null,
      },
    };
  },
  created() {
    if (process.browser) {
      this.accessToken = localStorage.getItem("accessToken");
      if (this.accessToken) {
        const decoded = jwtDecode(this.accessToken);
        this.user.userName = decoded.user.user_name;
        this.user.balance = decoded.user.balance;
        this.user.avatar = decoded.user.avatar;
      }
    }
  },
  methods: {
    ...mapActions({
      logout: "modules/auth/logout",
    }),
    async handleLogout() {
      await this.logout();
      this.$router.push("/");
      setTimeout(() => {
        location.reload();
      }, 10);
    },
    setActive(link) {
      this.activeLink = link;
    },
  },
};
</script>

<style>
.nav-link:hover {
  text-decoration: underline;
  color: white;
  background-color: #f24b5a;
  padding: 11px;
}

.nav-link.active {
  background-color: #f24b5a;
  padding: 11px;
}
</style>
