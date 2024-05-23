<template>
  <main class="w-full h-[calc(100vh-5rem)] flex flex-col flex-wrap justify-center items-center">
    <div>
      <h1 class="font-bold">404 | 페이지를 찾을 수 없습니다.</h1>

      <label for="gatheringSelect" class="font-bold mb-2">항목을 추가 할 모임을 선택하세요</label>
      <select
        id="gatheringSelect"
        name="gather"
        class="mt-3 p-1 block w-full border border-cyan-500 outline-none rounded-lg sm:text-sm"
      >
        <option value="" disabled selected>----- 선택하세요 -----</option>

        <option value="hh">hhh</option>
      </select>
    </div>
  </main>
</template>

<script setup></script>
