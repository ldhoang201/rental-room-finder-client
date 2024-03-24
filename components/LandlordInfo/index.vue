<template>
  <div
    class="text-center border border-gray-300 rounded-lg p-4 flex flex-col items-center w-full"
  >
    <img
      :src="avatar"
      alt="Landlord Avatar"
      class="w-16 h-16 rounded-full mb-2"
    />
    <p class="text-lg font-semibold">{{ userName }}</p>
    <div class="mt-1">
      <div>
        <button class="contact-button phone">
          <i class="fa fa-phone" aria-hidden="true"></i>
          {{ phone }}
        </button>
      </div>
      <div class="mt-3">
        <button class="contact-button zalo">
          {{ phone }}
        </button>
      </div>
      <div class="mt-3">
        <button @click="toggleFavorite" class="favorite-button">
          {{ isFavorite ? "Đã Thích" : "Yêu Thích" }}
        </button>
      </div>
      <div class="mt-3">
        <button @click="showDatePicker" class="view-request-button">
          View Request
        </button>
        <a-modal v-model:visible="modalVisible" title="Chọn Ngày và Thời Gian">
          <a-date-picker
            v-model="selectedDate"
            show-time
            format="YYYY-MM-DD HH:mm:ss"
          />
          <template #footer>
            <a-button @click="hideDatePicker">Cancel</a-button>
            <a-button type="primary" @click="hideDatePicker">OK</a-button>
          </template>
        </a-modal>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "LandlordInfo",
  props: {
    avatar: {
      type: String,
      required: true,
    },
    userName: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      isFavorite: false,
      modalVisible: false,
      selectedDate: null,
    };
  },
  methods: {
    toggleFavorite() {
      this.isFavorite = !this.isFavorite;
    },
    showDatePicker() {
      this.modalVisible = true;
    },
    hideDatePicker() {
      this.modalVisible = false;
    },
  },
};
</script>

<style scoped>
.contact-button {
  padding: 0.5rem 1rem;
  border-radius: 0.25rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.contact-button.phone {
  background-color: #3498db;
  color: white;
}

.contact-button.zalo {
  background-color: #2ecc71;
  color: white;
}

.favorite-button {
  padding: 0.5rem 1rem;
  border-radius: 0.25rem;
  cursor: pointer;
  transition: background-color 0.3s ease, color 0.3s ease;
}

.favorite-button:hover {
  opacity: 0.8;
}

.favorite-button:focus {
  outline: none;
}

.favorite-button:focus-visible {
  outline: none;
}

.favorite-button:hover {
  opacity: 0.8;
}

.favorite-button {
  background-color: #e74c3c;
  color: white;
}

.view-request-button {
  padding: 0.5rem 1rem;
  border-radius: 0.25rem;
  cursor: pointer;
  transition: background-color 0.3s ease, color 0.3s ease;
  background-color: #9b59b6;
  color: white;
}

.view-request-button:hover {
  opacity: 0.8;
}

.view-request-button:focus {
  outline: none;
}

.view-request-button:focus-visible {
  outline: none;
}
</style>
