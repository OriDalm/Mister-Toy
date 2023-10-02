import { storageService } from './async-storage.service.js'
import { httpService } from './http.service.js'
import { utilService } from './util.service.js'

// const STORAGE_KEY = 'toyDB'
// _createToys()
const labels = ['On wheels', 'Box game', 'Art', 'Baby', 'Doll', 'Puzzle', 'Outdoor', 'Battery Powered']

export const toyService = {
  query,
  getById,
  remove,
  save,
  getEmptyToy,
  getToyLabels,
  getDefaultFilter,
  addMsg,
  removeMsg,
}

function query(filterBy = {}) {
  return httpService.get('toy', filterBy)
}

function getById(toyId) {
  return httpService.get(`toy/${toyId}`)
}

function remove(toyId) {
  return httpService.delete(`toy/${toyId}`)
}

async function addMsg(toyId, txt) {
  // console.log('toyId',toyId , txt)
  const savedMsg = await httpService.post(`toy/${toyId}/msg`, { txt })
  return savedMsg
}

async function removeMsg(toyId, msgId) {
  const removedId = await httpService.delete(`toy/${toyId}/msg/${msgId}`)
  return removedId
}

function save(toy) {
  console.log(toy)
  if (toy._id) {
    return httpService.put(`toy/${toy._id}`, toy)
  } else {
    return httpService.post('toy', toy)
  }
}

function getEmptyToy() {
  return {
    name: '',
    price: '',
    labels: [],
    createdAt: Date.now(),
    inStock: true,
  }
}

function getDefaultFilter() {
  return { byName: '', inStock: '', byLable: [], sortBy: {} }
}

// function _createToys() {
//   let toys = utilService.loadFromStorage(STORAGE_KEY)
//   if (!toys || !toys.length) {
//     toys = [
//       {
//         _id: 'n101',
//         name: 'Talking Doll',
//         price: 123,
//         labels: ['Doll', 'Battery Powered', 'Baby'],
//         createdAt: 1631031801011,
//         inStock: true,
//       },
//     ]
//     utilService.saveToStorage(STORAGE_KEY, toys)
//   }
// }

function getToyLabels() {
  return labels
}
