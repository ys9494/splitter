<template>
  <div class="w-[400px] bg-white p-10 mx-3 flex flex-col rounded-xl">
    <form class="flex flex-col mt-5">
      <div class="flex flex-col mb-8">
        <!-- <label v-for="gathering in gatheringList" :key="gathering.id">
          <input type="radio" name="radio" :value="gathering.id" v-model="selectedGathering" />
          <span class="ml-3 font-bold">{{ gathering.name }}</span>
        </label> -->
        <label for="gatheringSelect" class="font-bold">항목을 추가 할 모임을 선택하세요</label>
        <select
          id="gatheringSelect"
          v-model="selectedGathering"
          class="mt-3 p-1 block w-full border border-cyan-500 outline-none rounded-lg sm:text-sm"
        >
          <option disabled value="">모임을 선택하세요</option>
          <option v-for="gathering in gatheringList" :key="gathering.id" :value="gathering.id">
            {{ gathering.name }}
          </option>
        </select>
      </div>
    </form>
    <div class="w-full flex justify-around">
      <button
        class="text-cyan-600 font-bold hover:opacity-60 transition-all duration-300"
        type="submit"
        @click.prevent="submitForm"
      >
        Done
      </button>
      <button
        @click="closePopup"
        class="text-gray-400 font-bold hover:opacity-60 transition-all duration-300"
      >
        Cancel
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

const props = defineProps({
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
