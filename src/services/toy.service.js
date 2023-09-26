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
  getLabelCounts,
}

function query(filterBy, sort) {
  return httpService.get('toy', { params: { filterBy, sort } })
}

function getById(toyId) {
  return httpService.get(`toy/${toyId}`)
}

function remove(toyId) {
  return httpService.delete(`toy/${toyId}`)
}

function save(toy) {
  if (toy._id) {
    return httpService.put(`toy/${toy._id}`, toy)
  } else {
    return httpService.post('toy', toy)
  }
}

function getEmptyToy() {
  console.log()
  return {
    _id: '',
    name: '',
    price: '',
    labels: [],
    createdAt: Date.now(),
    inStock: true,
  }
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

function getLabelCounts() {
  return httpService.get('toy', { params: { filterBy, sort } }).then((toys) => {
    const labelCounts = {}

    toys.forEach((toy) => {
      toy.labels.forEach((label) => {
        if (labelCounts[label]) {
          labelCounts[label]++
        } else {
          labelCounts[label] = 1
        }
      })
    })

    const labelCountArray = Object.entries(labelCounts).map(([label, count]) => ({
      label,
      count,
    }))

    return labelCountArray
  })
}
