<template>
  <div
    class="w-full flex flex-wrap justify-between items-start my-10"
    v-for="(gathering, idx) in gatheringList"
    v-bind:key="gathering.id"
  >
    <div class="flex-grow">
      <div class="flex justify-between font-bold mb-3 border-b">
        <span class="text-lg">
          {{ idx + 1 }}. {{ gathering.name }} ({{ gathering.people.length }}명)
        </span>
        <div class="text-lg">
          <span class="font-[roboto]"> &#8361; </span>
          <span>{{ gathering.amount?.toLocaleString('ko-KR') }}</span>
        </div>
      </div>
      <div class="bg-[#F4F6F8]">
        <div
          class="py-2 flex flex-wrap justify-between px-3"
          v-for="(person, idx) in gathering.people"
          :key="idx"
        >
          <span class="font-bold">{{ person.name }}</span>
          <span class="font-bold">&#8361; {{ person.amount.toLocaleString('ko-KR') }}</span>
        </div>
      </div>
      <div class="py-2 text-sm" v-if="gathering.addedItem">
        <h3 class="font-bold text-gray-600 mt-4 mb-2">따로 주문한 항목</h3>
        <div class="border px-3">
          <div class="my-3" v-for="(item, idx) in gathering.addedItem" :key="idx">
            <div class="flex flex-wrap justify-between items-center mb-2">
              <span class="font-bold flex-grow-0">{{ item.name }} </span>
              <span class="h-[1px] flex-grow mx-2 bg-[#d6d6d6]"></span>
              <span class="font-bold flex-grow-0"
                >&#8361; {{ item.amount.toLocaleString('ko-KR') }}
              </span>
            </div>
            <div class="flex justify-between">
              <div class="flex items-center justify-start ml-1">
                <div class="text-[#686868]" v-for="(person, idx) in item.people" :key="idx">
                  <div v-if="idx !== item.people?.length - 1" class="flex items-center">
                    <span>{{ person.name }}</span>
                    <div class="bg-[#686868] w-[2px] h-[2px] rounded mx-1"></div>
                  </div>
                  <div v-else>
                    <span>{{ person.name }}</span>
                  </div>
                </div>
              </div>

              <div class="text-xs">
                (각 &#8361;{{
                  Math.floor(item.amount / item.people.length).toLocaleString('ko-KR')
                }})
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="mt-2 flex items-center justify-end">
      <button
        class="flex items-center ml-6 hover:opacity-50"
        @click="deleteGathering(gathering.id)"
      >
        <img class="h-4" src="@/assets/icons/trash-solid.svg" alt="" />
        <span class="font-bold pl-1 text-[#808080]">삭제</span>
      </button>
    </div>
  </div>
</template>

<style scoped></style>

<script setup>
import { useRouter } from 'vue-router'
import { useSplitStore } from '../../stores/split'

const router = useRouter()
const store = useSplitStore()

const props = defineProps({
  gatheringList: Array
})

function deleteGathering(id) {
  if (confirm('모임을 삭제하시겠습니까?')) store.deleteGathering(id)
}

function goToAddItem(gatheringId) {
  console.log('add', gatheringId)
  router.push({ name: 'add-item', params: { id: gatheringId } })
}
</script>
