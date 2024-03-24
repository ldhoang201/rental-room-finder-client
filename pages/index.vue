<template>
  <div>
    <div class="text-center">
      <FilterBar />
    </div>
    <br />
    <div class="text-center">
      <span class="font-bold text-3xl"> Tìm kiếm chỗ thuê ưng ý </span>
      <br />
      <p>
        Kênh thông tin Phòng trọ số 1 Việt Nam - Website đăng tin cho thuê phòng
        trọ, nhà nguyên căn, căn hộ, ở ghép nhanh, hiệu quả với 100.000+ tin
        đăng và 2.500.000 lượt xem mỗi tháng.
      </p>
    </div>
    <br />
    <div style="display: flex; justify-content: center">
      <Province />
    </div>
    <br />
    <div class="grid grid-cols-4 gap-4 ml-[400px]">
      <div class="border p-4 rounded-lg col-span-2">
        <div>
          <div>
            <span>Sap xep:</span>
          </div>
          <PostCard v-for="post in posts" :key="post.id" :post="post" />
        </div>
      </div>
      <div class="col-span-1 h-1/2">
        <Categories title="Danh mục cho thuê" />
        <br />
        <Categories title="Danh mục cho thuê" />
        <br />
        <RelatedPost :posts="latestPosts" type="recent" />
      </div>
    </div>
  </div>
</template>

<script>
import PostCard from "../components/PostCard/index.vue";
import Province from "../components/Province/index.vue";
import RelatedPost from "../components/RelatedPost/index.vue";
import FilterBar from "../components/FilterBar/index.vue";
import Categories from "../components/Categories/index.vue";
import { mapActions, mapState } from "vuex";

export default {
  components: {
    PostCard,
    Province,
    RelatedPost,
    FilterBar,
    Categories,
  },
  async created() {
    await Promise.all([this.fetchAllPosts(), this.fetchLatestPosts()]);
  },
  computed: {
    ...mapState({
      posts: (state) => state.modules["post"].posts,
      latestPosts: (state) => state.modules["post"].latestPosts,
    }),
  },
  methods: {
    ...mapActions({
      fetchAllPosts: "modules/post/fetchAllPosts",
      fetchLatestPosts: "modules/post/fetchLatestPosts",
    }),
  },
  data() {
    return {
      // categoryList: [
      //   { name: "Category 1", slug: "category-1" },
      //   { name: "Category 2", slug: "category-2" },
      //   { name: "Category 3", slug: "category-3" },
      // ],
    };
  },
};
</script>
