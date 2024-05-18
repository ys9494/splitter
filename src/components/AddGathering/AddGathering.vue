<template>
  <div class="max-w-xl pb-10 mx-auto px-4">
    <nav class="flex flex-col mt-5 w-full">
      <router-link
        class="flex items-center hover:opacity-50 transition-all duration-200"
        to="#"
        @click="$router.go(-1)"
      >
        <img class="h-4" src="@/assets/icons/angle-left-solid.svg" alt="" />
        <span class="font-bold ml-2">Back</span>
      </router-link>
    </nav>

    <h1 class="font-bold text-center text-xl my-[3em]">모임 추가</h1>

    <form class="flex flex-col">
      <label class="flex my-3 items-center">
        <span class="font-bold w-20">NAME</span>
        <input
          class="py-1 flex-grow border-b text-right border-[#ddd] focus:outline-none"
          type="text"
          v-model="gathering.name"
          placeholder="모임 이름을 입력하세요 ex)1차 모임"
          required
        />
      </label>
      <label class="flex mt-3 mb-10 items-center relative">
        <span class="font-bold w-20">Amount</span>
        <input
          class="flex-grow border-b border-[#ddd] focus:outline-none text-right pr-4"
          type="text"
          v-model="gathering.amount"
          @input="handlePriceInput"
          placeholder="금액을 입력하세요"
          required
        />
        <span class="font-[roboto] absolute right-0"> &#8361; </span>
      </label>

      <div class="flex flex-col mb-8">
        <label class="my-2" v-for="person in totalResult.people" :key="person.id">
          <input type="checkbox" name="check" :value="person" v-model="gathering.people" />
          <span class="ml-3">{{ person.name }}</span>
        </label>
      </div>

      <div class="mt-20 pb-12 flex flex-wrap justify-around font-bold text-lg">
        <button
          class="text-cyan-600 hover:opacity-60 transition-all duration-300"
          type="submit"
          @click="handleAddGathering"
        >
          Add
        </button>

        <router-link
          class="opacity-60 hover:opacity-100 transition-all duration-300"
          :to="{ name: 'result' }"
        >
          <span>Cancel</span>
        </router-link>
      </div>
    </form>
  </div>
</template>

<style scoped></style>

<script setup>
import { reactive, onMounted, watch } from 'vue'
import { useSplitStore } from '../../stores/split'
import { useRouter } from 'vue-router'

const router = useRouter()

const store = useSplitStore()
const totalResult = store.totalResult

const gathering = reactive({
  name: '',
  amount: '',
  people: []
})

onMounted(() => {
  console.log('mounted')
  if (totalResult && totalResult.people.length < 1) router.replace({ name: 'add-people' })
})

function handlePriceInput(event) {
  const inputValue = event.target.value
  const numericValue = inputValue.replace(/[^\d]/g, '')
  gathering.amount = numericValue
}

watch(
  () => gathering.amount,
  (newValue) => {
    const rawValue = String(newValue).replace(/,/g, '')
    gathering.amount = rawValue ? Number(rawValue).toLocaleString('ko-KR') : ''
  }
)

function convertGatheringAmountToNumber(gathering) {
  const newGathering = { ...gathering }
  newGathering.amount = Number(newGathering.amount.replace(/,/g, ''))
  return newGathering
}

function handleAddGathering(e) {
  e.preventDefault()

  if (!gathering.name) return alert('항목을 입력하세요')
  if (gathering.amount <= 0 || !gathering.amount) return alert('금액을 입력하세요')
  if (gathering.people?.length < 1) return alert('인원을 선택하세요')

  // console.log('gathering', gathering)
  store.addGathering(convertGatheringAmountToNumber(gathering))

  gathering.name = ''
  gathering.amount = ''
  gathering.people = []

  router.push({ name: 'result' })
}
</script>
