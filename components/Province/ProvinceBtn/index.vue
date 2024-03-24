<template>
  <div
    :class="'border shadow-md  text-blue-700 rounded-lg cursor-pointer hover:text-orange-600'"
  >
    <img
      :src="image"
      :alt="name"
      class="w-[190px] h-[110px] object-cover rounded-tl-md rounded-tr-md"
    />
    <div class="font-medium p-2 text-center">
      <nuxt-link
        :to="{ path: '/', query: { province_id: provinceId } }"
        class="block py-2 px-4 text-blue-500"
        >Phòng trọ {{ name }}</nuxt-link
      >
    </div>
  </div>
</template>

<script>
export default {
  name: "ProvinceBtn",
  props: {
    name: String,
    image: String,
    provinceId: String,
  },
};
</script>

<style scoped></style>
