<template>
  <div class="border p-4 rounded-lg">
    <div>
      <span class="font-bold">{{ title }}</span>
    </div>
    <ul>
      <li v-for="(roomType, index) in roomTypes" :key="index">
        <nuxt-link
          :to="{ path: '/', query: { room_type_id: roomType.room_type_id } }"
          class="block py-2 px-4 text-blue-500 hover:bg-blue-200"
          >{{ roomType.room_type_name }}</nuxt-link
        >
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  props: {
    title: {
      type: String,
      required: true,
    },
  },
  computed: {
    ...mapState({
      roomTypes: (state) => state.modules["post"].roomTypes,
    }),
  },
};
</script>

<style scoped></style>
