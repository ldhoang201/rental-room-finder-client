<template>
  <div>
    <div class="border p-4 rounded-lg" v-if="post">
      <div>
        <div>
          <div>
            <ImageSlider :images="post.images" />
          </div>
        </div>
        <div>
          <a-icon
            type="star"
            theme="filled"
            class="text-yellow-500 mr-1 text-3xl"
            v-for="(index, star) in 5"
            :key="index"
            :style="'yellow'"
          ></a-icon>
          <span class="text-red-600 text-3xl">
            {{ post.title }}
          </span>
        </div>
        <div>Địa chỉ :{{ post.location }}</div>
        <div>
          <span>
            <i class="fa fa-money text-xl" aria-hidden="true"></i>
            {{ post.price }} / Thang
          </span>
          <span class="ml-3">
            <i class="fa fa-crop" aria-hidden="true"></i>
            {{ post.area }} m<sup>2</sup></span
          >
        </div>

        <div>
          <span class="font-bold text-2xl">Thông tin mô tả</span>
          <br />
          <span>
            {{ post.description }}
          </span>
        </div>

        <div>
          <span class="font-bold text-2xl">Đối tượng</span>
          <br />
          <span>Phòng dành cho :{{ post.gender === "M" ? "Nam" : "Nữ" }}</span>
        </div>

        <div>
          <span class="font-bold text-2xl">Tiện ích</span>
          <div class="amenities-container rounded-lg border p-4">
            <div class="amenities-list">
              <ul>
                <li v-for="(amenity, index) in post.amenities" :key="index">
                  <i class="fa fa-dot-circle-o" aria-hidden="true"></i>
                  {{ amenity }}
                </li>
              </ul>
            </div>
          </div>
        </div>

        <br />

        <div>
          <span class="font-bold text-2xl">Thông tin liên hệ</span>
          <a-table
            class="rounded-table"
            bordered
            :columns="landlordColumns"
            :data-source="landLordData"
          >
            <template slot="icon" slot-scope="text">
              <i :class="text" aria-hidden="true"></i>
            </template>
            <template slot="info" slot-scope="text">
              {{ text }}
            </template>
          </a-table>
        </div>

        <div>
          <span class="font-bold text-2xl"> Vị trí</span>
          <!-- <Map /> -->
          <br /><br /><br />
        </div>
        <div>
          <span class="font-bold text-2xl"> Bình luận</span>
          <CommentFrame />
        </div>
      </div>
    </div>
    <div v-else><a-spin></a-spin></div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import LandlordInfo from "../LandlordInfo/index.vue";
import ImageSlider from "../ImageSlider/index.vue";
import Map from "../Map/index.vue";
import CommentFrame from "../CommentFrame/index.vue";
import { landlordColumns } from "./const";

export default {
  name: "PostDetail",
  props: {
    post: {
      type: Object,
      required: true,
    },
  },
  components: {
    LandlordInfo,
    ImageSlider,
    Map,
    CommentFrame,
  },
  computed: {
    landLordData() {
      return [
        { icon: "fa fa-user", text: `${this.post.user_name}` },
        { icon: "fa fa-phone", text: `${this.post.phone}` },
      ];
    },
  },
  data() {
    return {
      landlordColumns,
    };
  },
  mounted() {
    // console.log(this.$route.params.id);
  },
};
</script>

<style scoped>
.rounded-table {
  border-radius: 20px;
}

.ant-table-thead {
  display: none;
}
.amenities-container {
  margin-top: 10px;
}

.amenities-list {
  list-style: none;
  padding-left: 0;
}

.amenities-list li {
  display: inline-block;
  margin-right: 20px;
  margin-bottom: 10px;
}

.fa-dot-circle-o {
  color: #000;
}
</style>
