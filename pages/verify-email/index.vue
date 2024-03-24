<template>
  <div class="verify-otp">
    <a-input v-model="userOtp" placeholder="Nhập mã OTP" class="mb-4" />
    <a-button type="primary" @click="submitOTP"> Xác nhận </a-button>
  </div>
</template>

<script>
import { Input, Button, message } from "ant-design-vue";
import { mapActions, mapState } from "vuex";

export default {
  components: {
    "a-input": Input,
    "a-button": Button,
  },
  data() {
    return {
      userOtp: "",
    };
  },
  computed: {
    ...mapState({
      userTemp: (state) => state.modules["auth"].userTemp,
      user: (state) => state.modules["auth"].user,
      genedOTP: (state) => state.modules["auth"].genedOTP,
    }),
  },
  mounted() {
    console.log(this.userTemp);
  },
  methods: {
    ...mapActions({
      signUp: "modules/auth/signUp",
    }),
    async submitOTP() {
      const response = await this.signUp({
        userData: this.userTemp,
        userOTP: this.userOtp,
        genedOTP: this.genedOTP,
      });
      if (typeof response !== "string") {
        message.success("Xác nhận OTP thành công!");
      } else {
        message.error(response);
      }
    },
  },
};
</script>

<style scoped>
.verify-otp {
  max-width: 300px;
  margin: 0 auto;
  padding: 20px;
}
</style>
