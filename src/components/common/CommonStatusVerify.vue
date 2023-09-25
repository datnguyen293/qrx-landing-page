<script setup lang="ts">
import {STATUS_VERIFY} from '@/constants';

defineProps({
  status: { type: String, required: true },
})

</script>

<template>
  <template v-if="status === STATUS_VERIFY.SUCCESS">
    <div class="bg-[#00994D] p-3">
      <div class="logo-success flex justify-center mb-3">
        <svg width="100" height="81" viewBox="0 0 100 81" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="86.2869" cy="9.83962" r="3.0276" fill="#FCFCFC"/>
          <circle cx="16.2734" cy="9.46117" r="2.64915" fill="#FCFCFC"/>
          <circle cx="85.9083" cy="70.7701" r="1.13535" fill="#FCFCFC"/>
          <circle cx="40.8729" cy="80.2315" r="0.756901" fill="#FCFCFC"/>
          <circle cx="15.895" cy="68.121" r="2.2707" fill="#FCFCFC"/>
          <circle cx="6.81211" cy="27.2484" r="6.81211" fill="#FCFCFC"/>
          <circle cx="93.8559" cy="53.74" r="5.29831" fill="#FCFCFC"/>
          <path fill-rule="evenodd" clip-rule="evenodd" d="M49.1989 70.2027C65.8154 70.2027 79.2857 56.7324 79.2857 40.1159C79.2857 23.4994 65.8154 10.0291 49.1989 10.0291C32.5824 10.0291 19.1121 23.4994 19.1121 40.1159C19.1121 56.7324 32.5824 70.2027 49.1989 70.2027ZM65.139 32.2269C66.3209 30.8086 66.1293 28.7006 64.7109 27.5187C63.2926 26.3367 61.1846 26.5283 60.0027 27.9467L47.9748 42.3802C46.8157 43.771 46.1641 44.5411 45.6439 45.0143L45.624 45.0323L45.6026 45.0161C45.0416 44.592 44.323 43.8841 43.0428 42.6039L38.1908 37.7519C36.8853 36.4464 34.7686 36.4464 33.4631 37.7519C32.1576 39.0574 32.1576 41.1741 33.4631 42.4796L38.3151 47.3316L38.4515 47.4681L38.4516 47.4681C39.543 48.56 40.593 49.6104 41.57 50.3491C42.6644 51.1766 44.0976 51.9548 45.9342 51.8715C47.7709 51.7881 49.1278 50.8834 50.1427 49.9602C51.0488 49.1361 51.9993 47.995 52.9874 46.8088L52.9875 46.8087L53.1111 46.6604L65.139 32.2269Z" fill="#FCFCFC"/>
        </svg>
      </div>

      <div class="text-center text-[#FCFCFC]">Chúc mừng bạn! Đây là sản phẩm chính hãng. Được phân phối độc quyền bởi Công ty TNHH Dược Vitalife Pharma. Xin cảm ơn quý khách!</div>
    </div>
  </template>

  <template v-if="status === STATUS_VERIFY.WARRING">
    <div class="bg-[#F38020] p-3">
      <div class="logo-success flex justify-center mb-3">
        <svg width="100" height="81" viewBox="0 0 100 81" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="86.2869" cy="9.84011" r="3.0276" fill="#FCFCFC"/>
          <circle cx="16.2734" cy="9.46165" r="2.64915" fill="#FCFCFC"/>
          <circle cx="85.9083" cy="70.7701" r="1.13535" fill="#FCFCFC"/>
          <circle cx="40.8729" cy="80.2315" r="0.756901" fill="#FCFCFC"/>
          <circle cx="15.895" cy="68.1213" r="2.2707" fill="#FCFCFC"/>
          <circle cx="6.81211" cy="27.2486" r="6.81211" fill="#FCFCFC"/>
          <circle cx="93.8559" cy="53.7397" r="5.29831" fill="#FCFCFC"/>
          <path d="M79 39.75C79 56.4566 65.4566 70 48.75 70C32.0434 70 18.5 56.4566 18.5 39.75C18.5 23.0434 32.0434 9.5 48.75 9.5C65.4566 9.5 79 23.0434 79 39.75Z" fill="#FCFCFC"/>
          <path d="M48.9363 21.377C51.4083 21.377 53.3828 23.4356 53.2797 25.9055L52.637 41.2985C52.5542 43.2823 50.9218 44.848 48.9363 44.848C46.9508 44.848 45.3184 43.2823 45.2356 41.2985L44.5929 25.9055C44.4897 23.4356 46.4642 21.377 48.9363 21.377ZM49.0588 57.392C47.5888 57.392 46.3801 56.9673 45.4328 56.118C44.5181 55.236 44.0608 54.158 44.0608 52.884C44.0608 51.5773 44.5181 50.483 45.4328 49.601C46.3801 48.719 47.5888 48.278 49.0588 48.278C50.4961 48.278 51.6721 48.719 52.5868 49.601C53.5341 50.483 54.0078 51.5773 54.0078 52.884C54.0078 54.158 53.5341 55.236 52.5868 56.118C51.6721 56.9673 50.4961 57.392 49.0588 57.392Z" fill="#F38020"/>
        </svg>
      </div>

      <div class="text-center text-[#FCFCFC]">Sản phẩm đã được xác thực trước đó. Vui lòng kiểm tra lại hoặc liên hệ với người bán để được hỗ trợ!</div>
    </div>
  </template>

  <template v-if="status === STATUS_VERIFY.FAIL">
    <div class="bg-[#B61212] p-3">
      <div class="logo-success flex justify-center mb-3">
        <svg width="100" height="81" viewBox="0 0 100 81" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="86.2869" cy="9.83962" r="3.0276" fill="#FCFCFC"/>
          <circle cx="16.2734" cy="9.46117" r="2.64915" fill="#FCFCFC"/>
          <circle cx="85.9083" cy="70.7701" r="1.13535" fill="#FCFCFC"/>
          <circle cx="40.8729" cy="80.2315" r="0.756901" fill="#FCFCFC"/>
          <circle cx="15.895" cy="68.1213" r="2.2707" fill="#FCFCFC"/>
          <circle cx="6.81211" cy="27.2486" r="6.81211" fill="#FCFCFC"/>
          <circle cx="93.8559" cy="53.7397" r="5.29831" fill="#FCFCFC"/>
          <path fill-rule="evenodd" clip-rule="evenodd" d="M79 39.75C79 56.4566 65.4566 70 48.75 70C32.0434 70 18.5 56.4566 18.5 39.75C18.5 23.0434 32.0434 9.5 48.75 9.5C65.4566 9.5 79 23.0434 79 39.75ZM32.9289 55.5711C31.6163 54.2585 31.6163 52.1304 32.9289 50.8178L43.9967 39.75L32.9289 28.6822C31.6163 27.3696 31.6163 25.2415 32.9289 23.9289C34.2415 22.6163 36.3696 22.6163 37.6822 23.9289L48.75 34.9967L59.8178 23.9289C61.1304 22.6163 63.2585 22.6163 64.5711 23.9289C65.8837 25.2415 65.8837 27.3696 64.5711 28.6822L53.5033 39.75L64.5711 50.8178C65.8837 52.1304 65.8837 54.2585 64.5711 55.5711C63.2585 56.8837 61.1304 56.8837 59.8178 55.5711L48.75 44.5033L37.6822 55.5711C36.3696 56.8837 34.2415 56.8837 32.9289 55.5711Z" fill="#FCFCFC"/>
        </svg>
      </div>

      <div class="text-center text-[#FCFCFC]">Có lỗi đã xảy ra, xin hãy thử lại hoặc liên hệ với đội ngũ hỗ trợ!</div>
    </div>
  </template>
</template>
