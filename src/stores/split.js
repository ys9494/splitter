import { ref } from 'vue'
import { defineStore } from 'pinia'
import { useUtils } from '../composable/useUtils'

const defaultTotalResult = () => ({
  amount: 0,
  people: [],
  gathering: []
})

// people
// [{ id: 'string', name: 'string', amount: 'number' }]

// gathering
// [
//   {
//     id: 'string',
//     name: 'string',
//     amount: 'number',
//     people: [{id, amount}],
//     addedItem: [{ id: 'string', name: 'string', amount: 'number', people: [] }]
//   }
// ]

export const useSplitStore = defineStore('split', () => {
  const totalResult = ref(defaultTotalResult())

  const utils = useUtils()

  function getResultFromLocalStorage() {
    const totalList = localStorage.getItem('totalResult')

    totalResult.value = totalList ? JSON.parse(totalList) : defaultTotalResult()
  }

  function resetResult() {
    totalResult.value.amount = 0
    totalResult.value.people.splice(0, totalResult.value.people.length)
    totalResult.value.gathering.splice(0, totalResult.value.gathering.length)

    localStorage.setItem('totalResult', JSON.stringify(totalResult.value))
  }

  function addPeople(nameList) {
    const newPeople = nameList.map((person) => {
      return {
        id: utils.generateUniqueId(),
        name: person.name,
        amount: 0
      }
    })

    totalResult.value.people = totalResult.value.people.concat(newPeople)
    localStorage.setItem('totalResult', JSON.stringify(totalResult.value))
  }

  function addGathering(newGathering) {
    totalResult.value.amount += newGathering.amount

    const gatheringId = utils.generateUniqueId()
    const perAmount = Math.floor(Number(newGathering.amount) / newGathering.people?.length)

    const people = newGathering.people.map((person) => ({
      ...person,
      amount: perAmount
    }))

    const gathering = { id: gatheringId, ...newGathering, people }

    totalResult.value.gathering.push(gathering)

    setResult()
  }

  function deleteGathering(gatheringId) {
    const gatheringIdx = totalResult.value.gathering.findIndex((i) => i.id === gatheringId)
    if (gatheringIdx === -1) return console.log('존재하지 않는 모임입니다..')

    totalResult.value.gathering.splice(gatheringId, 1)

    setResult()
  }

  function addItem(gatheringId, item) {
    const itemId = utils.generateUniqueId()
    const gathering = totalResult.value.gathering.find((gathering) => gathering.id == gatheringId)

    if (!gathering.addedItem) {
      gathering.addedItem = []
    }
    gathering.addedItem.push({ id: itemId, ...item })

    const excludingAmount = Math.floor(Number(item.amount) / gathering.people.length)

    const addingAmount = Math.floor(Number(item.amount) / item.people.length)

    console.log('amount', excludingAmount, addingAmount)

    gathering.people.forEach((person) => {
      if (item.people.find((p) => person.id == p.id)) {
        person.amount = person.amount + addingAmount - excludingAmount
      } else {
        person.amount -= excludingAmount
      }
    })

    setResult()
  }

  function setResult() {
    // totalResult.value.people.forEach((person) => {
    //   person.amount = 0
    //   totalResult.value.gathering.forEach((gather) => {
    //     gather.people.forEach((p) => {
    //       if (person.id === p.id) person.amount += p.amount
    //     })
    //   })
    // })

    // // gather의 모든 사람들의 수량을 매핑하여 사람 ID를 키로 하는 객체를 생성합니다.
    // const gatheringMap = {}
    // totalResult.value.gathering.forEach((gather) => {
    //   gather.people.forEach((p) => {
    //     if (!gatheringMap[p.id]) {
    //       gatheringMap[p.id] = 0
    //     }
    //     gatheringMap[p.id] += p.amount
    //   })
    // })

    // // 각 사람의 총 수량을 계산합니다.
    // totalResult.value.people.forEach((person) => {
    //   person.amount = gatheringMap[person.id] || 0
    // })

    totalResult.value.amount = totalResult.value.gathering.reduce((acc, cur) => acc + cur.amount, 0)

    // gather의 모든 사람들의 수량을 매핑하여 사람 ID를 키로 하는 객체를 생성합니다.
    const gatheringMap = totalResult.value.gathering.reduce((acc, gather) => {
      gather.people.forEach((p) => {
        acc[p.id] = (acc[p.id] || 0) + p.amount
      })
      return acc
    }, {})

    // 각 사람의 총 수량을 계산합니다.
    totalResult.value.people.forEach((person) => {
      person.amount = gatheringMap[person.id] || 0
    })

    localStorage.setItem('totalResult', JSON.stringify(totalResult.value))
  }

  getResultFromLocalStorage()

  return {
    totalResult,
    getResultFromLocalStorage,
    resetResult,
    addPeople,
    addGathering,
    deleteGathering,
    addItem,
    setResult
  }
})
