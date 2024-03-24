<template>
  <div class="border p-4 rounded-lg">
    <div>
      <span class="text-2xl font-bold">Tin đã lưu</span>
    </div>
    <br />
    <div>
      <PostCard :room="roomData" />
      <div class="h-px bg-gray-500 my-4"></div>
      <PostCard :room="roomData" />
      <div class="h-px bg-gray-500 my-4"></div>
      <PostCard :room="roomData" />
    </div>
  </div>
</template>

<script>
import PostCard from "../../components/PostCard/index.vue";

export default {
  components: {
    PostCard,
  },
  data() {
    return {
      roomData: {
        image: "https://via.placeholder.com/300",
        title: "Phòng cho thuê",
        rating: 4,
        price: "2 triệu",
        area: 30,
        address: "123 Đường ABC, Quận XYZ, Thành phố HCM",
        description: "Phòng rộng rãi, thoáng mát, view đẹp",
        landlord: {
          name: "Anh/Chị Chủ nhà",
          avatar: "https://via.placeholder.com/50",
          contacts: {
            phone: "0123 456 789",
            zalo: "zaloID123",
          },
        },
      },
    };
  },
};
</script>
