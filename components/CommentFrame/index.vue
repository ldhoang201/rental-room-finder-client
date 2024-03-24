<template>
  <a-card class="bg-gray-100">
    <div class="w-full max-w-md my-8">
      <div class="bg-white p-6 rounded-lg shadow-md">
        <div class="mb-4">
          <div v-if="paginatedComments.length" class="space-y-4">
            <div
              v-for="(comment, index) in paginatedComments"
              :key="index"
              class="flex items-center space-x-4"
            >
              <img
                :src="comment.avatar"
                alt="Avatar"
                class="w-8 h-8 rounded-full"
              />
              <div>
                <p class="font-semibold">{{ comment.user_name }}</p>
                <p>{{ comment.content }}</p>
                <div class="flex items-center">
                  <template v-for="(star, index) in Math.ceil(comment.rating)">
                    <a-icon
                      type="star"
                      theme="filled"
                      class="text-yellow-500"
                      :key="`${comment.user}-${index}`"
                    />
                  </template>
                </div>
              </div>
            </div>
          </div>
          <p v-else class="text-gray-500">Chưa có bình luận nào.</p>
        </div>
        <a-pagination
          v-if="comments.length > 0"
          :total="3"
          :page-size="pageSize"
          @change="handlePageChange"
          class="mb-4"
        />

        <div>
          <h3 class="text-lg font-semibold mb-2">Thêm bình luận mới</h3>
          <a-rate v-model="newRating" class="mb-2" />
          <a-input
            v-model="newCommentText"
            placeholder="Nhập bình luận của bạn..."
            class="mb-2"
            @pressEnter="addComment"
          />
          <a-button type="primary" @click="addComment">Gửi bình luận</a-button>
        </div>
      </div>
    </div>
  </a-card>
</template>

<script>
import { mapActions, mapState } from "vuex";
import { jwtDecode } from "jwt-decode";
export default {
  computed: {
    ...mapState({
      comments: (state) => state.modules["comment"].comments,
      post: (state) => state.modules["post-detail"].post,
      currentUser: (state) => state.modules["user"].currentUser,
    }),
    paginatedComments() {
      const startIndex = (this.currentPage - 1) * this.pageSize;
      const endIndex = startIndex + this.pageSize;
      return this.comments.slice(startIndex, endIndex);
    },
  },
  data() {
    return {
      newCommentText: "",
      newRating: 0,
      currentPage: 1,
      pageSize: 3,
    };
  },
  methods: {
    ...mapActions({
      getCommentsByPostId: "modules/comment/getCommentsByPostId",
      createComment: "modules/comment/createComment",
      fetchPostById: "modules/post-detail/fetchPostById",
      fetchUserById: "modules/user/fetchUserById",
    }),
    async addComment() {
      if (this.newCommentText.trim() !== "") {
        const payload = {
          user_id: this.currentUser.user_id,
          post_id: this.post.post_id,
          content: this.newCommentText,
          rating: this.newRating,
        };
        await this.createComment(payload)
          .then(async () => {
            this.newCommentText = "";
            this.newRating = 0;
            await this.getCommentsByPostId(this.post.post_id);
          })
          .catch((error) => {
            console.error("Error creating comment", error);
          });
      }
    },
    handlePageChange(page) {
      this.currentPage = page;
      this.getCommentsByPostId(this.post.post_id);
    },
  },
  async mounted() {
    const postId = this.$route.params.id;
    await this.fetchPostById(postId);
    await this.getCommentsByPostId(this.post.post_id);
    if (process.browser) {
      const token = localStorage.getItem("accessToken");
      const decoded = jwtDecode(token);
      await this.fetchUserById(decoded.user.user_id);
    }
    console.log(this.comments);
  },
};
</script>

<style scoped>
/* Add custom scoped styles if needed */
</style>
