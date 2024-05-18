<template>
  <div
    class="w-full flex flex-wrap justify-between my-6"
    v-for="person in totalResult"
    v-bind:key="person.id"
  >
    <span>
      {{ person.name }}
    </span>
    <span>&#8361; {{ person.amount.toLocaleString('ko-KR') }}</span>
  </div>
</template>

<style scoped></style>

<script setup>
const props = defineProps({
  totalResult: Array
})
</script>
