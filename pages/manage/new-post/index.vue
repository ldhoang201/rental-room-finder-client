<template>
  <div>
    <h1 class="text-3xl">Đăng tin mới</h1>
    <div class="border-t border-gray-300 my-4"></div>
    <h2 class="text-2xl">Địa chỉ cho thuê</h2>
    <br />
    <a-form-model :model="form" @submit.prevent="handleSubmit">
      <div class="grid grid-cols-4 gap-4">
        <div>
          <span>Tỉnh/Thành phố </span>
          <br />
          <a-select
            v-model="selectedProvince"
            style="width: 200px"
            class="mr-3"
          >
            <a-select-option value="">Chọn tỉnh thành</a-select-option>
            <a-select-option
              v-for="province in provinces"
              :value="province.province_id"
              :key="province.province_id"
              >{{ province.province_name }}</a-select-option
            >
          </a-select>
        </div>
        <div>
          <span>Quận/Huyện</span>
          <br />
          <a-select
            v-model="selectedDistrict"
            style="width: 200px"
            class="mr-3"
          >
            <a-select-option value="">Chọn quận/huyện</a-select-option>
            <a-select-option
              v-for="district in districts"
              :value="district.district_id"
              :key="district.district_id"
              >{{ district.district_name }}</a-select-option
            >
          </a-select>
        </div>
        <div>
          <span>Phường/Xã</span>
          <br />
          <a-select v-model="selectedWard" style="width: 200px" class="mr-3">
            <a-select-option value="">Chọn phường/xã</a-select-option>
            <a-select-option
              v-for="ward in wards"
              :value="ward.ward_id"
              :key="ward.ward_id"
              >{{ ward.ward_name }}</a-select-option
            >
          </a-select>
        </div>
        <div></div>
        <div>
          <a-form-model-item>
            <span>Địa chỉ cụ thể</span>
            <a-input v-model="detailAddress" />
          </a-form-model-item>
          <a-form-model-item>
            <div class="w-[500px]">
              <span>Địa chỉ chính xác</span>
              <a-input :value="accurateAddress" disabled />
            </div>
          </a-form-model-item>
        </div>
      </div>
      <br />
      <h2 class="text-2xl">Thông tin mô tả</h2>
      <div>
        <a-form-model-item>
          <div>
            <span>Loại chuyên mục </span>
            <br />
            <a-select style="width: 200px" v-model="form.selectedPostType">
              <a-select-option
                v-for="postType in postTypes"
                :value="postType.post_type_id"
                :key="postType.post_type_id"
                >{{ postType.post_type_name }}</a-select-option
              >
            </a-select>
          </div>
        </a-form-model-item>
        <a-form-model-item>
          <div>
            <span>Loại phòng </span>
            <br />
            <a-select style="width: 200px" v-model="form.selectedRoomType">
              <a-select-option
                v-for="roomType in roomTypes"
                :value="roomType.room_type_id"
                :key="roomType.room_type_id"
                >{{ roomType.room_type_name }}</a-select-option
              >
            </a-select>
          </div>
        </a-form-model-item>
        <a-form-model-item>
          <span> Tiêu đề </span>
          <br />
          <a-input class="w-1/2" v-model="form.title"></a-input>
        </a-form-model-item>
        <a-form-model-item>
          <span>Nội dung mô tả</span>
          <br />
          <a-textarea
            :auto-size="{ minRows: 10, maxRows: 20 }"
            class="w-1/2"
            allow-clear
            v-model="form.description"
          />
        </a-form-model-item>
        <a-form-model-item>
          <span>Số người</span>
          <br />
          <a-input type="number" class="w-1/5" v-model="form.capacity" />
        </a-form-model-item>
        <a-form-model-item>
          <span>Tiện ích</span>
          <br />
          <a-button
            @click="amenitiesModalVisible = true"
            type="primary"
            class="w-1/5"
          >
            Thêm tiện ích
          </a-button>
          <!-- <div v-if="form.selectedAmenities.length > 0" class="mt-4">
            <h3 class="text-lg font-semibold mb-2">Các lựa chọn đã chọn:</h3>
            <ul class="list-disc list-inside">
              <li
                v-for="(option, index) in form.selectedAmenities"
                :key="index"
                class="text-gray-700"
              >
                {{ option.amenities_name }}
              </li>
            </ul>
          </div> -->
        </a-form-model-item>
        <div>
          <span> Thông tin liên hệ</span>
          <br />
          <a-input disabled class="w-1/5" :value="userName"></a-input>
        </div>
        <div>
          <span> Điện thoại</span>
          <br />
          <a-input disabled class="w-1/5" :value="phone"></a-input>
        </div>
        <a-form-model-item>
          <span>Giá cho thuê</span>
          <br />
          <a-input
            addon-after="đồng/tháng"
            class="w-1/5"
            v-model="form.price"
          ></a-input>
        </a-form-model-item>
        <a-form-model-item>
          <span>Diện tích</span>
          <br />
          <a-input addon-after="m2" class="w-1/5" v-model="form.area"></a-input>
        </a-form-model-item>
        <a-form-model-item>
          <div>
            <span>Đối tượng cho thuê </span>
            <br />
            <a-select style="width: 200px" v-model="form.gender">
              <a-select-option
                v-for="gender in genders"
                :value="gender.key"
                :key="gender.key"
                >{{ gender.name }}</a-select-option
              >
            </a-select>
          </div>
        </a-form-model-item>
        <br />
      </div>
      <h2 class="text-2xl">Hình ảnh</h2>
      <div>
        <a-form-model-item>
          <div>
            <a-upload
              :multiple="true"
              :show-upload-list="false"
              :before-upload="handleUpload"
            >
              <a-button icon="upload">Tải ảnh lên</a-button>
            </a-upload>
            <br />
            <div v-if="form.imageList.length > 0">
              <h3>Danh sách ảnh đã tải lên:</h3>
              <br />
              <ul class="image-list">
                <li v-for="(image, index) in displayedImages" :key="index">
                  <div>
                    <span class="remove-btn" @click="removeImage(index)"
                      ><i
                        class="text-red-600 fa fa-trash"
                        aria-hidden="true"
                      ></i>
                    </span>
                  </div>
                  <img :src="image" class="uploaded-image" />
                </li>
                <li v-if="form.imageList.length > 3">
                  <a-button
                    @click="showPopup = true"
                    icon="plus"
                    shape="circle"
                    title="Xem thêm ảnh"
                  ></a-button>
                </li>
              </ul>
            </div>
            <a-modal
              v-model:visible="showPopup"
              :footer="null"
              title="Danh sách ảnh"
              width="1000px"
            >
              <ul class="image-list">
                <li v-for="(image, index) in remainingImages" :key="index">
                  <span class="remove-btn" @click="removeImage(index + 3)"
                    ><i class="text-red-600 fa fa-trash" aria-hidden="true"></i
                  ></span>
                  <img :src="image" class="modal-uploaded-image" />
                </li>
              </ul>
            </a-modal>
          </div>
        </a-form-model-item>
      </div>
      <a-modal
        v-model:visible="amenitiesModalVisible"
        :footer="null"
        title="Danh sách tiện ích"
        width="600px"
      >
        <div
          class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
        >
          <div v-for="(option, index) in amenities" :key="index">
            <label class="flex items-center cursor-pointer">
              <input
                type="checkbox"
                :value="option.amenities_id"
                v-model="form.selectedAmenities"
                class="form-checkbox h-5 w-5 text-indigo-600"
              />
              <span class="ml-2 text-gray-700">{{ option.amenity_name }}</span>
            </label>
          </div>
        </div>
        <a-button type="primary" class="mt-4" @click="confirmSelection"
          >Xác nhận</a-button
        >
      </a-modal>
      <a-form-model-item class="text-center">
        <a-button html-type="submit" type="primary">Đăng tin</a-button>
      </a-form-model-item>
    </a-form-model>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import { genders } from "./const";

export default {
  layout: "manage",
  data() {
    return {
      selectedProvince: "",
      selectedDistrict: "",
      selectedWard: "",
      showPopup: false,
      amenitiesModalVisible: false,
      detailAddress: "",
      userName: "",
      phone: "",
      genders,
      tempFiles: [],
      form: {
        title: "",
        description: "",
        price: null,
        area: null,
        selectedAmenities: [],
        selectedRoomType: null,
        selectedPostType: null,
        capacity:null,
        userId: null,
        accurateAddress: "",
        locationCodes: [],
        gender: null,
        imageList: [],
      },
    };
  },
  async mounted() {
    await Promise.all([
      this.getProvinces(),
      this.fetchAmenities(),
      this.fetchPostTypes(),
      this.fetchRoomTypes(),
    ]);

    this.form.userId = this.currentUser.user_id;
    this.userName = this.currentUser.user_name;
    this.phone = this.currentUser.phone;
  },
  computed: {
    ...mapState({
      provinces: (state) => state.modules["province"].provinces,
      districts: (state) => state.modules["province"].districts,
      wards: (state) => state.modules["province"].wards,
      currentUser: (state) => state.modules["user"].currentUser,
      postTypes: (state) => state.modules["post"].postTypes,
      roomTypes: (state) => state.modules["post"].roomTypes,
      amenities: (state) => state.modules["post"].amenities,
    }),
    displayedImages() {
      return this.form.imageList.slice(0, 3);
    },
    remainingImages() {
      return this.form.imageList.slice(3);
    },
    accurateAddress() {
      let address = "";
      if (this.detailAddress) {
        address += this.detailAddress + ", ";
      }
      if (this.selectedWard !== "") {
        const ward = this.wards.find(
          (ward) => ward.ward_id === this.selectedWard
        );
        address += ward.ward_name + ", ";
      }
      if (this.selectedDistrict !== "") {
        const district = this.districts.find(
          (district) => district.district_id === this.selectedDistrict
        );
        address += district.district_name + ", ";
      }
      if (this.selectedProvince !== "") {
        const province = this.provinces.find(
          (province) => province.province_id === this.selectedProvince
        );
        address += province.province_name;
      }
      this.form.accurateAddress = address;
      return address;
    },
  },
  methods: {
    ...mapActions({
      getProvinces: "modules/province/getProvinces",
      getDistricts: "modules/province/getDistricts",
      getWards: "modules/province/getWards",
      uploadImage: "modules/upload-image/uploadImage",
      fetchPostTypes: "modules/post/fetchPostTypes",
      fetchRoomTypes: "modules/post/fetchRoomTypes",
      fetchRoomTypes: "modules/post/fetchRoomTypes",
      fetchAmenities: "modules/post/fetchAmenities",
      createPost: "modules/post/createPost",
    }),
    confirmSelection() {
      console.log("Options selected:", this.selectedOptions);
      this.amenitiesModalVisible = false;
    },
    async handleSubmit() {
      try {
        this.form.locationCodes = [
          this.selectedProvince,
          this.selectedDistrict,
          this.selectedWard,
        ];
        const imageUrls = await Promise.all(
          this.tempFiles.map(async (image) => {
            const imageUrl = await this.uploadImage(image);
            return imageUrl;
          })
        );
        const postData = {
          title: this.form.title,
          description: this.form.description,
          price: this.form.price,
          location: this.form.accurateAddress,
          available: true,
          room_type_id: this.form.selectedRoomType,
          capacity: this.form.capacity,
          area: this.form.area,
          amenitiesIds: this.form.selectedAmenities,
          imageUrls: imageUrls,
          user_id: this.form.userId,
          location_codes: this.form.locationCodes,
          post_type_id: this.form.selectedPostType,
          expired_in: new Date(),
        };

        console.log(postData);
        const response = await this.createPost(postData);
        console.log(response);
      } catch (error) {
        console.error("Error creating post:", error);
      }
    },
    handleUpload(file) {
      if (file) {
        try {
          this.tempFiles.push(file);
          this.form.imageList.push(URL.createObjectURL(file));
        } catch (error) {
          console.error("Error creating object URL:", error);
        }
      } else {
        console.error("Invalid file object:", file);
      }
      return false;
    },
    removeImage(index) {
      this.form.imageList.splice(index, 1);
    },
  },
  watch: {
    async selectedProvince(newValue, oldValue) {
      if (newValue !== oldValue) {
        await this.getDistricts(newValue);
        this.selectedDistrict = "";
        this.selectedWard = "";
      }
    },
    async selectedDistrict(newValue, oldValue) {
      if (newValue !== oldValue) {
        await this.getWards(newValue);
        this.selectedWard = "";
      }
    },
  },
};
</script>

<style scoped>
.image-list {
  list-style: none;
  display: flex;
  flex-wrap: wrap;
}

.uploaded-image {
  width: 300px;
  height: 200px;
  object-fit: cover;
  margin-right: 30px;
}

.modal-uploaded-image {
  width: 200px;
  height: 100px;
  object-fit: cover;
  margin-right: 30px;
}

.remove-btn {
  cursor: pointer;
}
</style>
