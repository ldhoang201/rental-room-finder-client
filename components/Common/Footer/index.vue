<template>
  <footer class="w-full bg-black mx-auto p-4 rounded-lg py-4 text-center">
    <div>
      <div>
        <div class="text-center text-xl">
          <span class="font-bold"> Tại sao lại chọn rentalapp123.com? </span>
        </div>
        <br />
        <p class="text-center">
          Chúng tôi biết bạn có rất nhiều lựa chọn, nhưng Phongtro123.com tự hào
          là trang web đứng top google về các từ khóa: cho thuê phòng trọ, nhà
          trọ, thuê nhà nguyên căn, cho thuê căn hộ, tìm người ở ghép, cho thuê
          mặt bằng...Vì vậy tin của bạn đăng trên website sẽ tiếp cận được với
          nhiều khách hàng hơn, do đó giao dịch nhanh hơn, tiết kiệm chi phí hơn
        </p>
      </div>
      <br />
      <div class="grid grid-cols-4 gap-4 text-center">
        <div class="">
          <span class="font-bold">116.998+</span>
          <br />
          <span> Thành viên</span>
        </div>
        <div class="">
          <span class="font-bold">116.998+</span>
          <br />
          <span> Thành viên</span>
        </div>
        <div class="">
          <span class="font-bold">116.998+</span>
          <br />
          <span> Thành viên</span>
        </div>
        <div class="">
          <span class="font-bold">116.998+</span>
          <br />
          <span> Thành viên</span>
        </div>
      </div>
      <br />
      <div class="text-base">
        <span class="font-bold"> Chi phí thấp, hiệu quả tối đa </span>
        <br />
        <div>
          <a-icon
            type="star"
            theme="filled"
            class="text-yellow-500 mr-1"
            v-for="(index, star) in 5"
            :key="index"
            :style="{ color: 'yellow' }"
          ></a-icon>
        </div>
      </div>
      <br />
      <div>
        <p>
          "Trước khi biết website phongtro123, mình phải tốn nhiều công sức và
          chi phí cho việc đăng tin cho thuê: từ việc phát tờ rơi, dán giấy, và
          đăng lên các website khác nhưng hiệu quả không cao. Từ khi biết
          website phongtro123.com, mình đã thử đăng tin lên và đánh giá hiệu quả
          khá cao trong khi chi phí khá thấp, không còn tình trạng phòng trống
          kéo dài."
        </p>
        <span>Anh Khánh (chủ hệ thống phòng trọ tại Tp.HCM)</span>
      </div>
      <br />
      <!-- <div>
        <a-button
          @click="$router.push('/new-post')"
          style="background-color: #f24b5a"
          >Đăng tin ngay</a-button
        >
      </div> -->
    </div>
  </footer>
</template>
