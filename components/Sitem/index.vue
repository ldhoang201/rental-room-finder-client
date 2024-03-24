<template>
  <div class="w-full flex items-center gap-2 py-2 border-b border-gray-300">
    <img
      :src="image"
      alt="anh"
      class="w-[65px] h-[65px] object-cover flex-none rounded-md"
    />
    <div class="w-full flex-auto flex flex-col justify-between gap-1">
      <h4 class="text-blue-600 text-[14px]">{{ truncatedTitle }}</h4>
      <div class="flex items-center justify-between w-full">
        <span class="text-sm font-medium text-green-500">{{ price }}</span>
        <span class="text-sm text-gray-300">{{ formattedTime }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import "moment/locale/vi";

export default {
  props: {
    title: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    createdAt: {
      type: String,
      required: true,
    },
  },
  computed: {
    truncatedTitle() {
      return this.title.slice(0, 45) + "...";
    },
    formattedTime() {
      return moment(this.createdAt).fromNow();
    },
  },
};
</script>

<style scoped></style>
