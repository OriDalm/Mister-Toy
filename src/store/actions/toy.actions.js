import { toyService } from '../../services/toy.service.js'
import { ADD_TOY, TOY_UNDO, SET_FILTER_BY, REMOVE_TOY, SET_TOYS, SET_IS_LOADING, UPDATE_TOY } from '../reducers/toy.reducer.js'
import { store } from '../store.js'

export async function loadToys(filterBy, sortBy) {
  console.log('heyyyy', sortBy)
  store.dispatch({ type: SET_IS_LOADING, isLoading: true })
  try {
    const toys = await toyService.query(filterBy, sortBy)
    store.dispatch({ type: SET_TOYS, toys })
    return toys
  } catch {
    console.log('toy action -> Cannot load toys', err)
    throw err
  }
}

export async function removeToy(toyId) {
  try {
    const res = toyService.remove(toyId)
    store.dispatch({ type: REMOVE_TOY, toyId })
  } catch (err) {
    console.log('toy action -> Cannot remove toy', err)
    throw err
  }
}

export function removeToyOptimistic(toyId) {
  store.dispatch({ type: REMOVE_TOY, toyId })
  return toyService.remove(toyId).catch((err) => {
    store.dispatch({ type: TOY_UNDO })
    console.log('toy action -> Cannot remove toy', err)
    throw err
  })
}

export async function saveToy(toy) {
  try {
    const type = toy._id ? UPDATE_TOY : ADD_TOY
    const toyToSave = await toyService.save(toy)
    store.dispatch({ type, toy: toyToSave })
    return toyToSave
  } catch (err) {
    console.log('toy action -> Cannot save toy', err)
    throw err
  }
}

export function setFilterBy(filterBy) {
  store.dispatch({ type: SET_FILTER_BY, filterBy: filterBy })
}
