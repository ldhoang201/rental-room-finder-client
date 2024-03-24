<template>
  <div v-if="post" class="grid grid-cols-4 gap-4 ml-[400px]">
    <div class="col-span-2">
      <PostDetail :post="post" />
      <br />
      <br />
      <!-- <div class="border p-4 rounded-lg">
        <PostCard :room="roomData" />
        <div class="h-px bg-red-500 my-4"></div>
        <PostCard :room="roomData" />
        <div class="h-px bg-red-500 my-4"></div>
        <PostCard :room="roomData" />
      </div> -->
    </div>
    <!-- <div class="col-span-1">
      <LandlordInfo
        :avatar="post.avatar"
        :user-name="post.user_name"
        :phone="post.phone"
      />
      <br />
      <RelatedPost :posts="posts" type="hot" />
      <br />
      <RelatedPost :posts="posts" type="recent" />
      <br> 
    </div> -->
  </div>
</template>

<script>
import PostDetail from "../../components/PostDetail/index.vue";
import RelatedPost from "../../components/RelatedPost/index.vue";
import LandlordInfo from "../../components/LandlordInfo/index.vue";
import PostCard from "../../components/PostCard/index.vue";
import Categories from "../../components/Categories/index.vue";

import { mapActions, mapState } from "vuex";

export default {
  components: {
    PostDetail,
    RelatedPost,
    LandlordInfo,
    PostCard,
  },
  async created() {
    const postId = this.$route.params.id;
    await this.fetchPostById(postId);
  },
  data() {
    return {};
  },
  computed: {
    ...mapState({
      post: (state) => state.modules["post-detail"].post,
    }),
  },
  methods: {
    ...mapActions({
      fetchPostById: "modules/post-detail/fetchPostById",
    }),
  },
};
</script>
