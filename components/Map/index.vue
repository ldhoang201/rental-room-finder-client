<template>
  <div ref="map" class="map-container"></div>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  props: {},
  data() {
    return {
      responseData: null,
      apiKey: process.env.API_KEY,
      mapKey: process.env.MAP_KEY,
      map: null,
      marker: null,
      lat: null,
      lng: null,
    };
  },
  async mounted() {
    const postId = this.$route.params.id;
    await this.fetchPostById(postId);
    if (this.post) {
      let payload = {
        apiKey: this.apiKey,
        address: this.post.location,
      };
      await this.getGeolocation(payload);
      this.lat = this.geolocation.location.lat;
      this.lng = this.geolocation.location.lng;

      const script = document.createElement("script");
      script.src =
        "https://cdn.jsdelivr.net/npm/@goongmaps/goong-js@1.0.9/dist/goong-js.js";
      script.async = true;
      document.head.appendChild(script);

      script.onload = () => {
        this.initializeMap();
      };
    }
  },
  computed: {
    ...mapState({
      geolocation: (state) => state.modules["post-detail"].geolocation,
      post: (state) => state.modules["post-detail"].post,
    }),
  },
  methods: {
    ...mapActions({
      getGeolocation: "modules/post-detail/getGeolocation",
      fetchPostById: "modules/post-detail/fetchPostById",
    }),
    initializeMap() {
      goongjs.accessToken = this.mapKey;

      this.map = new goongjs.Map({
        container: this.$refs.map,
        style: "https://tiles.goong.io/assets/goong_map_web.json",
        center: [this.lng, this.lat],
        zoom: 16,
      });

      this.marker = new goongjs.Marker({
        offset: [360, -410],
      })
        .setLngLat([this.lng, this.lat])
        .addTo(this.map);
    },
  },
};
</script>

<style scoped>
.map-container {
  border-radius: 50px;
  width: 100%;
  height: 400px;
}
</style>
