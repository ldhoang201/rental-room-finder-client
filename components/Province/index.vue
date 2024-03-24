<template>
  <div class="flex-row flex gap-6">
    <ProvinceBtn
      v-for="item in locationData"
      :key="item.id"
      :image="item.image"
      :name="item.name"
      :province-id="item.province_id"
    />
  </div>
</template>

<script>
import ProvinceBtn from "./ProvinceBtn/index.vue";
import { location as locationData } from "./const";

export default {
  components: {
    ProvinceBtn,
  },
  mounted() {
    console.log(process.env.FIREBASE_STORAGE_URL);
  },
  data() {
    return {
      locationData: locationData,
    };
  },
};
</script>

<style scoped></style>
