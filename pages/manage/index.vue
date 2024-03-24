<template>
  <div>
    <h1 class="text-center text-2xl font-bold mb-4">Trang quản lý</h1>
    <nav class="space-y-2">
      <ul class="">
        <li class="flex items-center justify-center">
          <router-link
            to="/manage/new-post"
            class="btn bg-custom-pink border rounded border-solid border-gray-300 px-6 py-2 hover:underline hover:text-white"
          >
            <span class="mr-2">Đăng tin mới</span>
            <i class="fa fa-plus-circle" aria-hidden="true"></i>
          </router-link>
        </li>
        <br />
        <li class="flex items-center justify-center">
          <router-link
            to="/manage/posts"
            class="text-base font-medium text-gray-700 py-2 px-4 block whitespace-nowrap"
          >
            <i class="fa fa-file-text-o mr-2"></i> Quản lý tin đăng
          </router-link>
        </li>
        <li class="flex items-center justify-center">
          <router-link
            to="/manage/edit-profile"
            class="text-base font-medium text-gray-700 py-2 px-4 block whitespace-nowrap"
          >
            <i class="fa fa-user mr-2"></i> Sửa thông tin cá nhân
          </router-link>
        </li>
        <li class="flex items-center justify-center">
          <router-link
            to="/manage/deposit"
            class="text-base font-medium text-gray-700 py-2 px-4 block whitespace-nowrap"
          >
            <i class="fa fa-money mr-2"></i> Nạp tiền vào tài khoản
          </router-link>
        </li>
        <li class="flex items-center justify-center">
          <router-link
            to="/manage/payment-history"
            class="text-base font-medium text-gray-700 py-2 px-4 block whitespace-nowrap"
          >
            <i class="fa fa-history mr-2"></i> Lịch sử thanh toán
          </router-link>
        </li>
        <li class="flex items-center justify-center">
          <router-link
            to="/manage/pricing"
            class="text-base font-medium text-gray-700 py-2 px-4 block whitespace-nowrap"
          >
            <i class="fa fa-money mr-2"></i> Bảng giá dịch vụ
          </router-link>
        </li>
        <li class="flex items-center justify-center">
          <router-link
            to="/manage/contact"
            class="text-base font-medium text-gray-700 py-2 px-4 block whitespace-nowrap"
          >
            <i class="fa fa-phone mr-2"></i> Liên hệ
          </router-link>
        </li>
        <li class="flex items-center justify-center">
          <router-link
            to="/logout"
            class="text-red-500 hover:text-red-700 cursor-pointer text-base font-medium py-2 px-4 block whitespace-nowrap"
            ><i class="fa fa-sign-out mr-2" />Thoát</router-link
          >
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
export default {
  layout: "manage",
  methods: {
    logout() {
    },
  },
};
</script>

<style scoped>
.space-y-2 > ul > li > a:hover {
  @apply bg-gray-100 text-gray-900;
}
</style>
