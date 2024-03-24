<template>
  <div class="filter-bar">
    <a-select v-model="selectedApartmentType" style="width: 200px" class="mr-3">
      <a-select-option value="all">Chọn loại căn hộ</a-select-option>
      <a-select-option
        v-for="type in roomTypes"
        :key="type.room_type_id"
        :value="type.room_type_id"
      >
        {{ type.room_type_name }}
      </a-select-option>
    </a-select>

    <a-cascader
      v-model="selectedLocation"
      style="width: 500px"
      class="mr-3"
      :options="locationOptions"
      @change="handleLocationChange"
      change-on-select
      placeholder="Chọn địa điểm"
    ></a-cascader>

    <a-button type="primary" @click="showPricePopup" class="mr-3">
      <template v-if="priceRange[0] !== 0 || priceRange[1] !== 5">
        {{ `${priceRange[0]}-${priceRange[1]} triệu` }}
        <a-button @click.stop="clearPriceRange"
          ><i class="fa fa-trash text-red-600" aria-hidden="true"></i>
        </a-button>
      </template>
      <template v-else> Chọn giá phòng </template>
    </a-button>

    <a-button type="primary" @click="showAreaPopup" class="mr-3">
      <template v-if="areaRange[0] !== 0 || areaRange[1] !== 200">
        {{ `${areaRange[0]}-${areaRange[1]} m` }}
        <a-button @click.stop="clearAreaRange"
          ><i class="fa fa-trash text-red-600" aria-hidden="true"></i
        ></a-button>
      </template>
      <template v-else> Chọn diện tích </template>
    </a-button>

    <a-button type="primary" @click="search"
      ><i class="fa fa-search" aria-hidden="true"></i> &nbsp;Tìm kiếm</a-button
    >

    <a-modal
      :footer="null"
      v-model:visible="priceModalVisible"
      title="Chọn giá phòng"
    >
      <span v-if="priceRange[0] !== 0 || priceRange[1] !== 5" class="mr-3">
        Giá phòng: {{ priceRange[0] }} triệu - {{ priceRange[1] }} triệu
      </span>
      <br />
      <a-slider v-model="priceRange" range :min="0" :max="5" :step="1" />
      <a-button @click="handleOk">Áp dụng</a-button>
    </a-modal>

    <a-modal
      :footer="null"
      v-model:visible="areaModalVisible"
      title="Chọn diện tích"
    >
      <span v-if="areaRange[0] !== 0 || areaRange[1] !== 200" class="mr-3">
        Diện tích: {{ areaRange[0] }} m<sup>2</sup> - {{ areaRange[1] }} m<sup
          >2</sup
        >
      </span>
      <br />
      <a-slider v-model="areaRange" range :min="0" :max="200" :step="1" />
      <a-button @click="handleOk" class="mx-auto">Áp dụng</a-button>
    </a-modal>
  </div>
</template>

<script>
import { Modal, Button, Cascader, Slider } from "ant-design-vue";
import { mapState, mapActions } from "vuex";

export default {
  components: {
    "a-button": Button,
    "a-cascader": Cascader,
    "a-slider": Slider,
  },
  data() {
    return {
      selectedApartmentType: "all",
      selectedLocation: [],
      priceRange: [0, 5],
      areaRange: [0, 200],
      priceModalVisible: false,
      areaModalVisible: false,
    };
  },
  async created() {
    const provincePromise = this.getProvinces();
    const districtPromise = provincePromise.then(() =>
      this.getDistricts(this.provinces[0].province_id)
    );
    const wardPromise = districtPromise.then(() =>
      this.getWards(this.districts[0].district_id)
    );
    const roomTypesPromise = wardPromise.then(() => this.fetchRoomTypes());

    await Promise.all([
      provincePromise,
      districtPromise,
      wardPromise,
      roomTypesPromise,
    ]);
    console.log(this.provinces);
  },

  computed: {
    ...mapState({
      provinces: (state) => state.modules["province"].provinces,
      districts: (state) => state.modules["province"].districts,
      wards: (state) => state.modules["province"].wards,
      postTypes: (state) => state.modules["post"].postTypes,
      roomTypes: (state) => state.modules["post"].roomTypes,
    }),
    locationOptions() {
      return this.provinces.map((province) => ({
        value: province.province_id,
        label: province.province_name,
        children: this.districts.map((district) => ({
          value: district.district_id,
          label: district.district_name,
          children: this.wards.map((ward) => ({
            value: ward.ward_id,
            label: ward.ward_name,
          })),
        })),
      }));
    },
  },
  methods: {
    ...mapActions({
      getProvinces: "modules/province/getProvinces",
      getDistricts: "modules/province/getDistricts",
      getWards: "modules/province/getWards",
      fetchPostTypes: "modules/post/fetchPostTypes",
      fetchRoomTypes: "modules/post/fetchRoomTypes",
    }),
    showPricePopup() {
      this.priceModalVisible = true;
    },
    showAreaPopup() {
      this.areaModalVisible = true;
    },
    handleOk() {
      this.priceModalVisible = false;
      this.areaModalVisible = false;
    },
    isBigCity(province_id) {
      const province = this.provinces.find(
        (prv) => prv.province_id === province_id
      );
      return province.province_type === "Thành phố Trung ương" ? true : false;
    },
    clearAreaRange() {
      this.areaRange = [0, 200];
    },
    clearPriceRange() {
      this.priceRange = [0, 5];
    },
    search() {
      console.log("Performing search...");
      console.log("Apartment Type:", this.selectedApartmentType);
      console.log("Location:", this.selectedLocation);
      console.log("Price Range:", this.priceRange);
      console.log("Area Range:", this.areaRange);
    },
    async handleLocationChange(value) {
      const [provinceId, districtId] = value;
      if (provinceId) {
        await this.getDistricts(provinceId);
      }
      if (districtId) {
        await this.getWards(districtId);
      }
    },
  },
};
</script>

<style>
.filter-bar a-select {
}
</style>
