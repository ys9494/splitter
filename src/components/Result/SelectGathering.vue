<template>
  <div class="w-[400px] bg-white px-10 pb-10 pt-6 mx-3 flex flex-col rounded-xl">
    <div class="flex justify-end">
      <button
        @click.prevent="closePopup"
        class="text-gray-800 font-bold hover:opacity-60 transition-all duration-300"
      >
        <img class="h-5" src="@/assets/icons/xmark-solid.svg" alt="" />
      </button>
    </div>

    <div class="flex flex-col mb-8 items-center">
      <label for="gatheringSelect" class="font-bold mb-2"
        >항목을 추가 할 모임을 선택해 주세요</label
      >
      <select
        id="gatheringSelect"
        v-model="selectedGathering"
        name="gather"
        class="mt-3 p-1 block w-full border border-cyan-500 outline-none rounded-lg sm:text-sm"
      >
        <option value="null" disabled selected>모임을 선택해 주세요</option>

        <option v-for="gathering in gatheringList" :key="gathering.id" :value="gathering.id">
          {{ gathering.name }}
        </option>
      </select>
    </div>

    <div class="w-full flex justify-around">
      <button
        class="text-cyan-600 font-bold hover:opacity-60 transition-all duration-300"
        type="submit"
        @click.prevent="submitForm"
      >
        추가하기
      </button>
    </div>
  </div>
</template>

<style scoped></style>

<script setup>
import { ref, defineProps, defineEmits } from 'vue'
import { useSplitStore } from '../../stores/split'
import { useRouter } from 'vue-router'

const router = useRouter()

const store = useSplitStore()
const gatheringList = store.totalResult.gathering

const selectedGathering = ref(null)

defineProps({
  isOpen: Boolean
})

const emit = defineEmits(['closePopup'])

function closePopup() {
  emit('closePopup')
}

function submitForm() {
  if (selectedGathering.value !== null) {
    console.log('Selected Gathering:', selectedGathering.value)
    router.push({ name: 'add-item', params: { id: selectedGathering.value } })
  } else {
    alert('모임을 선택해주세요.')
  }
}
</script>
