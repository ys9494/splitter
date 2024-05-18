<template>
  <div class="max-w-xl mx-auto px-4 pb-10 flex flex-col items-center">
    <nav class="flex justify-between w-full">
      <div class="flex flex-col mt-5 w-full">
        <router-link
          class="flex items-center hover:opacity-50 transition-all duration-200"
          to="#"
          @click="$router.go(-1)"
        >
          <img class="h-4" src="@/assets/icons/angle-left-solid.svg" alt="" />
          <span class="font-bold ml-2">Back</span>
        </router-link>
      </div>
    </nav>

    <h1 class="mt-4 text-lg font-bold text-center">정산결과</h1>
    <div class="flex flex-col items-end mt-6 w-full">
      <router-link
        class="mt-10 flex items-center hover:opacity-50 transition-all duration-200"
        :to="{ name: 'add-people' }"
      >
        <span class="bg-[#DCE8FF] rounded-full w-5 h-5 flex justify-center items-center"
          ><img class="h-3" src="@/assets/icons/plus-solid.svg" alt=""
        /></span>
        <span class="ml-2 font-bold text-[#7190CE]">인원 추가</span>
      </router-link>
    </div>

    <div class="w-full mt-10 mb-5 font-bold">
      <div class="flex flex-wrap justify-between text-lg border-b pb-2">
        <span>총 금액</span>
        <span>&#8361; {{ totalResult.amount.toLocaleString('ko-KR') }}</span>
      </div>
      <TotalResult :totalResult="totalResult.people" />
    </div>

    <div class="w-full mt-10">
      <div class="flex flex-col items-end">
        <router-link
          class="mb-2 flex items-center hover:opacity-50 transition-all duration-200"
          :to="{ name: 'add-gathering' }"
        >
          <span class="bg-[#DCE8FF] rounded-full w-5 h-5 flex justify-center items-center"
            ><img class="h-3" src="@/assets/icons/plus-solid.svg" alt=""
          /></span>
          <span class="ml-2 font-bold text-[#7190CE]">모임 추가</span>
        </router-link>

        <button
          @click="openPopup"
          class="mb-2 flex items-center hover:opacity-50 transition-all duration-200"
        >
          <span class="bg-[#DCE8FF] rounded-full w-5 h-5 flex justify-center items-center"
            ><img class="h-3" src="@/assets/icons/plus-solid.svg" alt=""
          /></span>
          <span class="ml-2 font-bold text-[#7190CE]">따로 주문한 항목 추가</span>
        </button>
      </div>
      <div class="border-b pb-4">
        <div>
          <span class="font-bold text-lg">모임 내역</span>
        </div>
      </div>
      <GatheringList :gatheringList="totalResult.gathering" />
    </div>

    <button
      class="font-black text-lg hover:opacity-50 transition-all duration-200"
      type="button"
      @click="resetStore"
    >
      Reset
    </button>

    <div
      v-if="isPopupOpen"
      class="fixed top-0 left-0 h-full w-full bg-black bg-opacity-50 flex justify-center items-center"
    >
      <SelectGathering :isOpen="isPopupOpen" @closePopup="closePopup" />
    </div>
  </div>
</template>

<style scoped></style>

<script setup>
import { useSplitStore } from '../../stores/split'
import GatheringList from './GatheringList.vue'
import TotalResult from './TotalResult.vue'
import SelectGathering from './SelectGathering.vue'
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const store = useSplitStore()

const totalResult = store.totalResult

const isPopupOpen = ref(false)

onMounted(() => {
  store.setResult()
})

function openPopup() {
  if (totalResult.gathering.length > 0) {
    isPopupOpen.value = true
  } else if (confirm('항목을 추가할 수 있는 모임이 없습니다. 모임을 추가하시겠습니까?')) {
    router.push({ name: 'add-gathering' })
  }
}

function closePopup() {
  isPopupOpen.value = false
}

function resetStore() {
  if (window.confirm('정말 초기화하시겠습니까?')) {
    store.resetResult()
  }
}
</script>
