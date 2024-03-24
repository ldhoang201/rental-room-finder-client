<template>
  <div
    class="slider-container w-full"
    @mouseover="showNavigation = true"
    @mouseleave="showNavigation = false"
  >
    <transition-group name="fade" tag="div" class="slider-transition">
      <div
        v-for="(image, index) in images"
        :key="index"
        v-show="index === currentIndex"
        class="slider-item"
      >
        <img :src="image" class="slider-image" />
      </div>
    </transition-group>
    <a class="prev" @click="prev" v-show="showNavigation">&#10094;</a>
    <a class="next" @click="next" v-show="showNavigation">&#10095;</a>
    <div class="slider-counter" v-show="showNavigation">
      {{ currentIndex + 1 }} / {{ images && images.length }}
    </div>
  </div>
</template>

<script>
export default {
  name: "Slider",
  props: {
    images: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      currentIndex: 0,
      showNavigation: false,
    };
  },
  methods: {
    next() {
      if (this.images) {
        this.$el
          .querySelectorAll(".slider-item")
          [this.currentIndex].classList.remove("active");

        this.currentIndex = (this.currentIndex + 1) % this.images.length;

        this.$el
          .querySelectorAll(".slider-item")
          [this.currentIndex].classList.add("active");
      }
    },
    prev() {
      if (this.images) {
        this.$el
          .querySelectorAll(".slider-item")
          [this.currentIndex].classList.remove("active");

        this.currentIndex =
          (this.currentIndex - 1 + this.images.length) % this.images.length;

        this.$el
          .querySelectorAll(".slider-item")
          [this.currentIndex].classList.add("active");
      }
    },
  },
};
</script>

<style>
.slider-container {
  position: relative;
  width: 700px;
  height: 350px;
  overflow: hidden;
  border-radius: 6px;
  border: 1px solid;
}

.slider-transition-enter-active,
.slider-transition-leave-active {
  transition: opacity 0.5s ease;
}

.slider-item {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.slider-item.active {
  opacity: 1;
}

.slider-image {
  width: 500px;
  height: 300px;
  border-radius: 6px;
}

.prev,
.next {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 40px;
  height: 40px;
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  font-size: 24px;
  text-align: center;
  line-height: 40px;
  border-radius: 50%;
  cursor: pointer;
  z-index: 1;
  text-decoration: none;
}

.prev {
  left: 10px;
}

.next {
  right: 10px;
}

.prev:hover,
.next:hover {
  background-color: rgba(0, 0, 0, 0.7);
}

.slider-counter {
  position: absolute;
  bottom: 10px;
  right: 10px;
  color: white;
  font-size: 14px;
  padding: 6px 10px;
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 4px;
}

.slider-counter,
.prev,
.next {
  transition: opacity 0.3s ease;
  opacity: 0;
}

.slider-container:hover .slider-counter,
.slider-container:hover .prev,
.slider-container:hover .next {
  opacity: 1;
}
</style>
