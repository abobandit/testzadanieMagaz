<template>

</template>
<script></script>
<!--<template>-->
<!--  <el-popover-->
<!--      :width="300"-->
<!--      popper-style="box-shadow: rgb(14 18 22 / 35%) 0px 10px 38px -10px, rgb(14 18 22 / 20%) 0px 10px 20px -15px; padding: 20px;"-->
<!--  >-->
<!--    <template #reference>-->
<!--      <el-icon>-->
<!--        <ChatDotRound/>-->
<!--      </el-icon>-->

<!--    </template>-->
<!--    <template #default>-->
<!--      <div-->
<!--          class="demo-rich-conent"-->
<!--          style="display: flex; flex-direction: column"-->
<!--          v-for="review of reviews"-->
<!--      >-->
<!--        <el-avatar-->
<!--            :size="60"-->
<!--            src="https://avatars.githubusercontent.com/u/72015883?v=4"-->
<!--            style="margin-bottom: 8px"-->
<!--        />-->
<!--        <div >-->

<!--           <img src="/src/assets/star.png" style="width:16px; height: 16px" v-for="star in review.rating"/>-->
<!--          <img src="/src/assets/star%20(1).png" style="width:16px; height: 16px" v-for="star in  (5 - review.rating)"   >-->
<!--        </div>-->

<!--        <div>-->
<!--          <p-->
<!--              class="demo-rich-content__name"-->
<!--              style="margin: 0; font-weight: 500"-->
<!--          >-->
<!--            {{ review.user.name }}-->
<!--          </p>-->
<!--          <p-->
<!--              class="demo-rich-content__mention"-->
<!--              style="margin: 0; font-size: 14px; color: var(&#45;&#45;el-color-info)"-->
<!--          >-->
<!--            {{ review.user.email }}-->

<!--          </p>-->
<!--        </div>-->

<!--        <p class="demo-rich-content__desc" style="margin: 0">-->
<!--          {{-->
<!--            review.comment-->
<!--          }}-->
<!--        </p>-->
<!--      </div>-->
<!--    </template>-->
<!--  </el-popover>-->
<!--</template>-->
<!--<script setup>-->
<!--import {ref, defineProps, watch,toRefs} from 'vue'-->

<!--import {-->
<!--  getReviews,-->
<!--  makeReview,-->
<!--  deleteReview-->
<!--} from "../requests/reviews.js";-->
<!--import {useUserStore} from "../store";-->
<!--import {appURL} from "../axios/axios.js";-->
<!--import {Star, StarFilled} from "@element-plus/icons-vue";-->
<!--const reviews = ref({})-->
<!--const props = defineProps({-->
<!--  product_id: Number,-->
<!--  modelValue: Number,-->
<!--})-->

<!--async function handleReviews(){-->
<!--  const data = await getReviews({-->
<!--    product_id: props.product_id-->
<!--  })-->
<!--  reviews.value = data.data.data-->
<!--  console.log(reviews.value)-->
<!--}-->
<!--handleReviews()-->
<!--</script>-->
<!--<style scoped>-->

<!--:deep(.el-card__footer) {-->
<!--  border: none;-->
<!--  margin-top: auto;-->
<!--}-->
<!--:deep(.el-image__inner) {-->
<!--  border-radius: var(&#45;&#45;el-border-radius-base);-->
<!--}-->
<!--:deep(.el-button + .el-button) {-->
<!--  margin-left: 0.5rem !important;-->
<!--}-->
<!--</style>-->