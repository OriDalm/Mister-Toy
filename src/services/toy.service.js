import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'

const STORAGE_KEY = 'toyDB'
_createToys()
const labels = ['On wheels', 'Box game', 'Art', 'Baby', 'Doll', 'Puzzle', 'Outdoor', 'Battery Powered']

export const toyService = {
  query,
  getById,
  remove,
  save,
  getEmptyToy,
  getToyLabels,
}

function query(filterBy = {}, sortBy) {
  return storageService.query(STORAGE_KEY).then((toys) => {
    let filteredToys = toys

    if (filterBy.name) {
      const regExp = new RegExp(filterBy.name, 'i')
      filteredToys = filteredToys.filter((toy) => regExp.test(toy.name))
    }

    if (filterBy.inStock !== '') {
      filteredToys = filteredToys.filter((toy) => (filterBy.inStock === 'true' ? toy.inStock : !toy.inStock))
    }

    if (filterBy.labels && filterBy.labels.length > 0) {
      console.log('labels')
      filteredToys = filteredToys.filter((toy) => filterBy.labels.every((label) => toy.labels.includes(label)))
    }
    filteredToys = utilService.getSortedToys(filteredToys, sortBy)
    return filteredToys
  })
}

function getById(toyId) {
  return storageService.get(STORAGE_KEY, toyId)
}

function remove(toyId) {
  return storageService.remove(STORAGE_KEY, toyId)
}

function save(toy) {
  if (toy._id) {
    return storageService.put(STORAGE_KEY, toy)
  } else {
    return storageService.post(STORAGE_KEY, toy)
  }
}

function getEmptyToy() {
  return {
    _id: '',
    name: '',
    price: '',
    labels: [],
    createdAt: Date.now(),
    inStock: true,
  }
}

function _createToys() {
  let toys = utilService.loadFromStorage(STORAGE_KEY)
  if (!toys || !toys.length) {
    toys = [
      {
        _id: 'n101',
        name: 'Talking Doll',
        price: 123,
        labels: ['Doll', 'Battery Powered', 'Baby'],
        createdAt: 1631031801011,
        inStock: true,
      },
    ]
    utilService.saveToStorage(STORAGE_KEY, toys)
  }
}

function getToyLabels() {
  return labels
}
