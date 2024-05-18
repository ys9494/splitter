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
    <h1 class="font-bold text-center text-xl my-[2em]">인원 추가</h1>
    <form class="flex mb-10" @submit.prevent="handleAddName">
      <input
        class="flex-grow border border-[#D9D9D9] rounded-xl h-9 pl-3 focus:outline-none"
        type="text"
        v-model="nameInput"
        placeholder="이름을 입력하세요 (최대 20자)"
        maxlength="20"
        required
      />
      <button class="font-bold ml-3 hover:text-neutral-400 transition-all duration-200">
        추가
      </button>
    </form>

    <div
      class="w-full flex justify-between items-center my-6"
      v-for="(item, idx) in peopleList"
      :key="idx"
    >
      <span class="font-bold">{{ item.name }}</span>
      <button
        class="hover:opacity-40 transition-all duration-100"
        type="button"
        @click="handleDelete(idx)"
      >
        <img class="w-4" src="@/assets/icons/xmark-solid.svg" alt="delete" />
      </button>
    </div>

    <div class="mt-20 pb-12 flex flex-wrap justify-around font-bold">
      <button
        class="text-lg text-cyan-600 hover:opacity-60 transition-all duration-300"
        type="button"
        @click="handleSubmitNameList"
      >
        Done
      </button>
      <router-link
        class="opacity-60 hover:opacity-100 transition-all duration-300"
        :to="{ name: 'result' }"
      >
        <span class="text-lg">Cancel</span>
      </router-link>
    </div>
  </div>
</template>

<style scoped></style>

<script setup>
import { ref, onMounted } from 'vue'
import { useSplitStore } from '../../stores/split'
import { useRouter } from 'vue-router'

const router = useRouter()
const store = useSplitStore()

const peopleList = ref([])
const nameInput = ref('')

onMounted(() => {
  store.getResultFromLocalStorage()
})

function findName(list) {
  return list.find((i) => i.name === nameInput.value)
}

function handleAddName() {
  if (findName(peopleList.value) || findName(store.totalResult.people))
    return alert('이미 존재하는 이름이 있습니다.')

  peopleList.value = [...peopleList.value, { name: nameInput.value }]
  nameInput.value = ''
}

function handleDelete(idx) {
  peopleList.value.splice(idx, 1)
}

function handleSubmitNameList() {
  if (peopleList.value.length < 1) return alert('인원을 추가해주세요')
  store.addPeople(peopleList.value)

  if (confirm('모임을 추가하시겠습니까?')) {
    router.push({ name: 'add-gathering' })
  } else {
    router.push({ name: 'result' })
  }
}
</script>
