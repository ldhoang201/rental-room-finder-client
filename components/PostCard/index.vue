<template>
  <div>
    <div>
      <div class="h-px bg-red-500 my-4"></div>
    </div>
    <div class="flex bg-white rounded-lg shadow-lg overflow-hidden h-60">
      <div class="w-2/5">
        <img
          :src="post.images[0]"
          alt="Room Image"
          class="w-full h-full object-cover rounded-lg cursor-pointer"
          @click="$router.push(`/${post.post_id}`)"
        />
      </div>
      <div class="w-3/5 p-4">
        <h2 class="text-xl font-bold mb-2">{{ post.title }}</h2>
        <div class="flex items-center mb-2">
          <a-icon
            type="star"
            theme="filled"
            class="text-yellow-500 mr-1"
            v-for="(index, star) in 5"
            :key="index"
            :style="{ color: index <= post.rating ? 'yellow' : 'gray' }"
          ></a-icon>
        </div>
        <span class="text-gray-700 text-base mb-2">{{ post.price }}/tháng</span>
        <span class="text-gray-700 text-base mb-2"
          >{{ post.area }} m<sup>2</sup></span
        >
        <!-- <span class="text-gray-700 text-base mb-2">{{ post.phone }}</span> -->
        <p class="text-gray-700 text-base mb-2">{{ post.description }}</p>
        <div class="flex items-center mb-2">
          <img
            :src="post.avatar"
            alt="Landlord Avatar"
            class="w-8 h-8 rounded-full mr-2"
          />
          <span
            >{{ post.user_name }}
            <span class="heart-icon">
              <i class="fa fa-heart text-base" aria-hidden="true"></i>
            </span>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Icon } from "ant-design-vue";

export default {
  mounted() {
    console.log(this.post);
  },
  components: {
    "a-icon": Icon,
  },
  props: {
    post: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style scoped>
.heart-icon {
  cursor: pointer;
}

.heart-icon i {
  color: inherit;
}

.heart-icon:hover i {
  color: #ff0000;
}
</style>
