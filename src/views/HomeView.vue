<template>
  <main class="w-full h-[calc(100vh-5rem)] flex flex-col flex-wrap justify-center items-center">
    <div
      class="flex flex-col flex-wrap justify-center items-center my-10 bg-white cursor-pointer w-1/2 hover:opacity-50 transition-all duration-200"
      @click="goToAddPeople"
    >
      <img class="h-14 w-auto" src="@/assets/icons/calculator.svg" alt="logo" />
      <div class="flex flex-wrap justify-center mt-4 text-neutral-500 font-bold text-xl">
        <span class="mx-1">정산 하기</span>
      </div>
    </div>
    <div
      class="flex flex-col flex-wrap justify-center items-center my-20 bg-white cursor-pointer w-1/2 hover:opacity-50 transition-all duration-200"
      @click="goToResult"
    >
      <img class="h-14 w-auto" src="@/assets/icons/result.svg" alt="logo" />
      <div class="flex flex-wrap justify-center mt-4 text-neutral-500 font-bold text-xl">
        <span class="mx-1">정산결과 보기</span>
      </div>
    </div>
  </main>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useSplitStore } from '../stores/split'

const router = useRouter()
const store = useSplitStore()

const totalResult = store.totalResult

function goToAddPeople() {
  if (
    totalResult.people.length === 0 ||
    confirm('이전 정산 내역이 삭제됩니다. 새로 정산을 진행하시겠습니까?')
  ) {
    store.resetResult()
    router.push({ name: 'add-people' })
  } else {
    router.push({ name: 'result' })
  }
}

function goToResult() {
  if (totalResult.people.length > 0) {
    router.push({ name: 'result' })
  } else if (confirm('정산 내역이 없습니다. 정산을 진행하시겠습니까?')) {
    router.push({ name: 'add-people' })
  }
}
</script>
