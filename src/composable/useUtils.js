export const useUtils = () => {
  function generateUniqueId() {
    const timestamp = Date.now().toString(36) // 현재 시간의 36진수 표현
    const randomChars = Math.random().toString(36).substring(2, 11) // 랜덤한 9자리 문자열

    return timestamp + randomChars
  }

  return {
    generateUniqueId
  }
}
