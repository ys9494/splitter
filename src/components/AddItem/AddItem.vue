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
    <h1 class="font-bold text-center text-xl my-[2em]">추가 할 내역</h1>

    <form class="flex flex-col">
      <label class="flex my-3 items-center">
        <span class="font-bold w-20">ITEM</span>
        <input
          class="py-1 flex-grow border-b text-right border-[#ddd] focus:outline-none"
          type="text"
          v-model="addedItem.name"
          placeholder="항목을 입력하세요"
          required
        />
      </label>

      <label class="flex mt-3 mb-10 items-center relative">
        <span class="font-bold w-20">Amount</span>
        <input
          class="flex-grow border-b border-[#ddd] focus:outline-none text-right pr-4"
          type="text"
          v-model="addedItem.amount"
          @input="handlePriceInput"
          placeholder="금액을 입력하세요"
          required
          max="10000"
        />
        <span class="font-[roboto] absolute right-0"> &#8361; </span>
      </label>

      <div class="flex flex-col mb-8">
        <label v-for="person in poepleList" :key="person.id">
          <input type="checkbox" name="check" :value="person" v-model="addedItem.people" />
          <span class="ml-3">{{ person.name }}</span>
        </label>
      </div>
      <button
        class="text-cyan-600 font-bold hover:opacity-60 transition-all duration-300"
        type="submit"
        @click="handleAddedItem"
      >
        Done
      </button>
    </form>
  </div>
</template>

<style scoped></style>

<script setup>
import { watch, reactive, onMounted, computed } from 'vue'
import { useSplitStore } from '../../stores/split'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const paramsId = route.params.id

const store = useSplitStore()
const gatheringList = store.totalResult.gathering
const poepleList = computed(() => gatheringList.find((i) => i.id == paramsId).people)
const maxAmount = computed(() => {
  const gathering = gatheringList.find((i) => i.id == paramsId)
  const totalItemAmount = gathering.addedItem
    ? gathering.addedItem.reduce((acc, cur) => acc + cur.amount, 0)
    : 0
  return gathering.amount - totalItemAmount
})

const addedItem = reactive({
  name: '',
  amount: '',
  people: []
})

onMounted(() => {
  if (paramsId && gatheringList.find((gathering) => gathering.id == paramsId)) {
    console.log('paramsId', paramsId)
  } else {
    console.log('일치하는 모임 없음')
    router.push({ name: 'result' })
  }
})

function handlePriceInput(event) {
  const inputValue = event.target.value
  const numericValue = inputValue.replace(/[^\d]/g, '')
  addedItem.amount = numericValue

  if (numericValue > maxAmount.value) {
    alert(`최대값(${maxAmount.value})을 초과했습니다.`)
    addedItem.amount = ''
  } else {
    addedItem.amount = numericValue.toLocaleString('ko-KR')
  }
}

watch(
  () => addedItem.amount,
  (newValue) => {
    const rawValue = String(newValue).replace(/,/g, '')
    addedItem.amount = rawValue ? Number(rawValue).toLocaleString('ko-KR') : ''
  }
)

function convertItemPriceToNumber(item) {
  const newItem = { ...item }
  newItem.amount = Number(newItem.amount.replace(/,/g, ''))
  return newItem
}

function handleAddedItem(e) {
  e.preventDefault()
  if (!addedItem.name) return alert('항목을 입력하세요')
  if (!addedItem.amount || addedItem.amount <= 0) return alert('금액을 입력하세요')
  if (addedItem.people?.length < 1) return alert('제외할 인원을 선택하세요')

  store.addItem(paramsId, convertItemPriceToNumber(addedItem))
  router.push({ name: 'result' })
}
</script>
