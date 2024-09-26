<script setup lang="ts">
import { delay } from '@/utitls';
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { ElLoading } from 'element-plus';
import { useI18n } from 'vue-i18n';

const { query } = useRoute();
const { url } = query;
const { t: $t } = useI18n();

const bgLoading = ElLoading.service({
  lock: true,
  text: $t('common.loading'),
  background: '#f8f8ff',
});
onMounted(async () => {
  await delay(1000);
  setTimeout(() => {
    bgLoading.close();
  }, 500);
});

const handleRedirectURL = () => {
  if (!url || typeof url !== 'string') {
    return;
  }

  window.location.href = url;
};
</script>

<template>
  <div class="qrx-container m-auto overflow-hidden">
    <div class="text-center mt-3">
      <svg width="327" height="282" viewBox="0 0 187 152" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M88.8891 121.1C116.889 121.1 139.589 98.4 139.589 70.3C139.589 42.2 116.789 19.5 88.8891 19.5C60.8891 19.5 38.1891 42.2 38.1891 70.3C38.1891 98.4 60.8891 121.1 88.8891 121.1Z"
          fill="#EAEEF9" />
        <path
          d="M135.889 37.1C138.153 37.1 139.989 35.2644 139.989 33C139.989 30.7357 138.153 28.9 135.889 28.9C133.625 28.9 131.789 30.7357 131.789 33C131.789 35.2644 133.625 37.1 135.889 37.1Z"
          fill="#EAEEF9" />
        <path
          d="M141.889 21.1C143.436 21.1 144.689 19.8464 144.689 18.3C144.689 16.7536 143.436 15.5 141.889 15.5C140.343 15.5 139.089 16.7536 139.089 18.3C139.089 19.8464 140.343 21.1 141.889 21.1Z"
          fill="#EAEEF9" />
        <path
          d="M40.4891 37C42.0355 37 43.2891 35.7464 43.2891 34.2C43.2891 32.6536 42.0355 31.4 40.4891 31.4C38.9427 31.4 37.6891 32.6536 37.6891 34.2C37.6891 35.7464 38.9427 37 40.4891 37Z"
          fill="#EAEEF9" />
        <path
          d="M23.3891 91C26.2609 91 28.5891 88.6719 28.5891 85.8C28.5891 82.9281 26.2609 80.6 23.3891 80.6C20.5172 80.6 18.1891 82.9281 18.1891 85.8C18.1891 88.6719 20.5172 91 23.3891 91Z"
          fill="#EAEEF9" />
        <path
          d="M115.22 56.2196C114.674 58.5877 113.854 60.8648 112.852 62.9597C110.211 67.8782 106.294 71.8858 101.376 74.3451C96.2751 76.9865 90.2636 77.8973 84.1611 76.7132C69.9521 73.7075 60.7527 59.8629 63.7585 45.5629C66.7642 31.2628 80.5177 22.0635 94.8178 25.0692C99.9184 26.1622 104.381 28.6214 108.116 32.1737C114.309 38.5495 116.951 47.5667 115.22 56.2196Z"
          fill="url(#paint0_linear_3_138)" />
        <g filter="url(#filter0_d_3_138)">
          <path
            d="M83.3704 90.1329C83.3704 90.1329 79.0257 88.7816 78.0481 88.4394C77.1536 88.1263 77.3226 88.1855 78.0481 88.4394L75.6289 87.5927L79.4996 76.5852L71.0324 71.9887L73.8145 60.9813L62.2022 58.3202L66.073 49.2481L63.7747 46.8289L31.1153 61.828C26.8817 63.7634 24.9463 68.8438 27.0026 73.0774L45.3887 113.478C47.3241 117.712 52.4044 119.647 56.638 117.591L88.9346 102.834L90.8699 92.5521L83.3704 90.1329Z"
            fill="url(#paint1_linear_3_138)" />
        </g>
        <g filter="url(#filter1_d_3_138)">
          <path
            d="M149.545 107.18L157.499 63.3052C158.355 58.641 155.266 54.2466 150.657 53.4976L109.713 46.2079L110.246 49.609L101.931 54.8612L110.003 63.6242L101.284 70.9918L105.566 79.5357L96.0287 86.3734L97.6251 88.4076L99.4282 90.8294C98.9001 90.1201 98.9029 90.1237 99.4282 90.8294C99.0893 90.3741 101.38 93.324 100.985 92.7983L105.778 99.1713L98.356 106.413L139.682 113.914C144.346 114.77 148.796 111.789 149.545 107.18Z"
            fill="url(#paint2_linear_3_138)" />
        </g>
        <path
          d="M89.9674 35.8853C87.5082 35.8853 85.5955 37.9802 85.7776 40.4395L87.1439 55.1949C87.235 56.6522 88.5101 57.8363 89.9674 57.8363C91.4248 57.8363 92.6999 56.6522 92.791 55.1949L94.1573 40.4395C94.3394 37.8891 92.4267 35.8853 89.9674 35.8853Z"
          fill="white" />
        <path
          d="M89.9675 60.5688C88.1458 60.5688 86.6885 62.0261 86.6885 63.8477C86.6885 65.6694 88.1458 67.1267 89.9675 67.1267C91.7891 67.1267 93.2464 65.6694 93.2464 63.8477C93.2464 62.0261 91.7891 60.5688 89.9675 60.5688Z"
          fill="white" />
        <path d="M161.189 58.8979L170.443 55.7625" stroke="#989FB0" stroke-width="2" stroke-miterlimit="10" />
        <path d="M159.048 52.0646L168.602 40.6598" stroke="#989FB0" stroke-width="2" stroke-miterlimit="10" />
        <path d="M153.62 48.9375L154.85 40.5" stroke="#989FB0" stroke-width="2" stroke-miterlimit="10" />
        <path d="M26.5188 58.804L22.6481 49.8529" stroke="#989FB0" stroke-width="2" stroke-miterlimit="10" />
        <path d="M22.2851 63.0375L10.1891 54.4493" stroke="#989FB0" stroke-width="2" stroke-miterlimit="10" />
        <path d="M19.745 68.7227L11.1568 68.2389" stroke="#989FB0" stroke-width="2" stroke-miterlimit="10" />
        <path fill-rule="evenodd" clip-rule="evenodd"
              d="M52.3112 69.0705L56.4318 78.6576L66.0189 74.537L61.8983 64.9499L52.3112 69.0705ZM50.6819 66.9312C49.6891 67.3579 49.2302 68.5087 49.6569 69.5014L54.2925 80.2869C54.7192 81.2797 55.87 81.7386 56.8627 81.3119L67.6482 76.6762C68.641 76.2495 69.0999 75.0988 68.6732 74.106L64.0375 63.3206C63.6108 62.3278 62.4601 61.8689 61.4673 62.2956L50.6819 66.9312Z"
              fill="#D5DDEA" />
        <path fill-rule="evenodd" clip-rule="evenodd"
              d="M61.5825 90.6415L65.7031 100.229L75.2902 96.108L71.1696 86.5209L61.5825 90.6415ZM59.9532 88.5022C58.9604 88.9289 58.5015 90.0796 58.9282 91.0724L63.5638 101.858C63.9905 102.851 65.1413 103.31 66.134 102.883L76.9195 98.2472C77.9123 97.8205 78.3712 96.6698 77.9445 95.677L73.3088 84.8915C72.8821 83.8988 71.7314 83.4399 70.7386 83.8666L59.9532 88.5022Z"
              fill="#D5DDEA" />
        <path
          d="M66.1926 61.7419C65.9082 61.0801 66.2141 60.3129 66.8759 60.0285C67.5378 59.744 68.3049 60.0499 68.5894 60.7118L71.9228 68.6225L71.5104 70.0976L72.3536 70.8884L73.2619 71.6281L74.3196 74.0438C74.604 74.7057 74.2981 75.4728 73.6363 75.7573C72.9744 76.0418 72.2073 75.7358 71.9228 75.074L66.1926 61.7419Z"
          fill="#D5DDEA" />
        <path
          d="M58.3238 86.363C57.662 86.6474 56.8948 86.3415 56.6104 85.6797C56.3259 85.0178 56.6318 84.2507 57.2937 83.9662L69.2775 78.8155C69.9394 78.531 70.7065 78.8369 70.991 79.4988C71.2755 80.1606 70.9695 80.9278 70.3077 81.2123L58.3238 86.363Z"
          fill="#D5DDEA" />
        <path fill-rule="evenodd" clip-rule="evenodd"
              d="M113.514 59.9279L111.742 70.4463L122.26 72.2184L124.032 61.7L113.514 59.9279ZM113.299 57.1875C112.21 57.004 111.178 57.7382 110.995 58.8274L109.001 70.6607C108.818 71.7499 109.552 72.7816 110.641 72.9651L122.474 74.9588C123.564 75.1423 124.595 74.408 124.779 73.3188L126.772 61.4856C126.956 60.3964 126.222 59.3646 125.133 59.1811L113.299 57.1875Z"
              fill="#D5DDEA" />
        <path
          d="M114.357 78.9996C113.631 78.8773 113.141 78.1894 113.264 77.4633C113.386 76.7372 114.074 76.2477 114.8 76.37L122.689 77.6991C123.415 77.8214 123.904 78.5093 123.782 79.2354C123.66 79.9616 122.972 80.451 122.246 80.3287L114.357 78.9996Z"
          fill="#D5DDEA" />
        <path fill-rule="evenodd" clip-rule="evenodd"
              d="M104.292 80.446L101.619 82.3735L101.527 82.9227C101.404 83.6488 101.894 84.3366 102.62 84.459C103.346 84.5813 104.034 84.0918 104.156 83.3657L104.489 81.3935C104.546 81.0506 104.468 80.7163 104.292 80.446Z"
              fill="#D5DDEA" />
        <path fill-rule="evenodd" clip-rule="evenodd"
              d="M109.526 83.5943L108.862 87.5387L112.806 88.2033L113.471 84.2589L109.526 83.5943ZM109.312 80.854C108.223 80.6705 107.191 81.4047 107.008 82.4939L106.122 87.7531C105.938 88.8423 106.672 89.8741 107.761 90.0576L113.021 90.9436C114.11 91.1272 115.142 90.3929 115.325 89.3037L116.211 84.0445C116.395 82.9553 115.66 81.9235 114.571 81.74L109.312 80.854Z"
              fill="#D5DDEA" />
        <path fill-rule="evenodd" clip-rule="evenodd"
              d="M114.993 91.2759L114.328 95.2204L118.273 95.8849L118.937 91.9405L114.993 91.2759ZM114.779 88.5356C113.689 88.3521 112.658 89.0863 112.474 90.1755L111.588 95.4347C111.405 96.5239 112.139 97.5557 113.228 97.7392L118.487 98.6253C119.576 98.8088 120.608 98.0745 120.792 96.9853L121.678 91.7261C121.861 90.6369 121.127 89.6051 120.038 89.4216L114.779 88.5356Z"
              fill="#D5DDEA" />
        <path fill-rule="evenodd" clip-rule="evenodd"
              d="M77.887 81.1942L77.0063 83.6999L76.7177 83.1303C76.3849 82.4734 76.6476 81.6711 77.3045 81.3383C77.4916 81.2435 77.6905 81.197 77.887 81.1942Z"
              fill="#D5DDEA" />
        <path fill-rule="evenodd" clip-rule="evenodd"
              d="M102.265 94.5856C102.268 94.571 102.271 94.5563 102.273 94.5415L103.603 86.6527C103.725 85.9266 103.235 85.2387 102.509 85.1164C101.783 84.9941 101.095 85.4835 100.973 86.2097L100.058 91.6406L102.265 94.5856Z"
              fill="#D5DDEA" />
        <defs>
          <filter id="filter0_d_3_138" x="4.17654" y="35.8289" width="108.693" height="115.588"
                  filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
            <feFlood flood-opacity="0" result="BackgroundImageFix" />
            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                           result="hardAlpha" />
            <feOffset dy="11" />
            <feGaussianBlur stdDeviation="11" />
            <feColorMatrix type="matrix" values="0 0 0 0 0.397708 0 0 0 0 0.47749 0 0 0 0 0.575 0 0 0 0.27 0" />
            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_3_138" />
            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_3_138" result="shape" />
          </filter>
          <filter id="filter1_d_3_138" x="74.0287" y="35.2079" width="105.613" height="111.853"
                  filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
            <feFlood flood-opacity="0" result="BackgroundImageFix" />
            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                           result="hardAlpha" />
            <feOffset dy="11" />
            <feGaussianBlur stdDeviation="11" />
            <feColorMatrix type="matrix" values="0 0 0 0 0.397708 0 0 0 0 0.47749 0 0 0 0 0.575 0 0 0 0.27 0" />
            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_3_138" />
            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_3_138" result="shape" />
          </filter>
          <linearGradient id="paint0_linear_3_138" x1="63.1593" y1="50.8547" x2="115.723" y2="50.8547"
                          gradientUnits="userSpaceOnUse">
            <stop stop-color="#B0BACC" />
            <stop offset="1" stop-color="#969EAE" />
          </linearGradient>
          <linearGradient id="paint1_linear_3_138" x1="58.5022" y1="45.173" x2="58.5022" y2="119.189"
                          gradientUnits="userSpaceOnUse">
            <stop stop-color="#FDFEFF" />
            <stop offset="0.9964" stop-color="#ECF0F5" />
          </linearGradient>
          <linearGradient id="paint2_linear_3_138" x1="108.282" y1="44.9757" x2="144.246" y2="114.532"
                          gradientUnits="userSpaceOnUse">
            <stop stop-color="#FDFEFF" />
            <stop offset="0.9964" stop-color="#ECF0F5" />
          </linearGradient>
        </defs>
      </svg>
    </div>

    <div class="mb-3 px-3 text-[20px] text-center font-semibold">
      Mã QR này không phải do QRX phát hành
    </div>

    <div class="text-center text-[#574E4E] text-[12px] px-12 font-medium">Vui lòng kiểm tra và đảm bảo đường dẫn an toàn trước khi truy cập</div>

    <div v-if="url" class="text-[12px] mt-6 !mx-3" style="border: 1px solid #ED7F22; border-radius: 8px; min-height: 50px; max-height: 100px; overflow: auto;padding: 10px;word-wrap: break-word;">
      <span style="max-width: 96%;">{{url}}</span>
    </div>

    <!-- <div v-if="url" class="text-center mt-10">
      <el-button
        type="warning"
        class="mt-2 text-white hover:text-white !bg-[#ED7F22]"
        @click="handleRedirectURL"
      >
        Đi đến trang đích
      </el-button>
    </div> -->
  </div>

</template>

<style lang="css" scoped>
iframe {
  display: block; /* iframes are inline by default */
  height: 100vh; /* Set height to 100% of the viewport height */
  width: 100%; /* Set width to 100% of the viewport width */
  border: none; /* Remove default border */
  background: lightyellow; /* Just for styling */
}
</style>
