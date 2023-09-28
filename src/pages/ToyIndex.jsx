import { useDispatch, useSelector } from 'react-redux'
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'
import { loadToys, removeToyOptimistic, setFilterBy } from '../store/actions/toy.actions.js'
import { useEffect, useState } from 'react'
import { ToyList } from '../cmps/ToyList.jsx'
import { Link } from 'react-router-dom'
import { ToyFilter } from '../cmps/ToyFilter.jsx'
import { ToySort } from '../cmps/ToySort.jsx'

export function ToyIndex() {
  const dispatch = useDispatch()
  const toys = useSelector((storeState) => storeState.toyModule.toys)
  const filterBy = useSelector((storeState) => storeState.toyModule.filterBy)
  const isLoading = useSelector((storeState) => storeState.toyModule.isLoading)
  const [sortBy, setSortBy] = useState({ type: '', desc: -1 })

  useEffect(() => {
    loadToys(sortBy).catch((err) => {
      console.log('err:', err)
      showErrorMsg('Cannot load toys')
    })
  }, [filterBy, sortBy])

  async function onRemoveToy(toyId) {
    try {
      const res = await removeToyOptimistic(toyId)
      showSuccessMsg('Toy removed')
    } catch (err) {
      console.log(err)
      showErrorMsg('Cannot remove toy')
    }
  }

  function onSetFilter(filterBy) {
    setFilterBy(filterBy)
  }

  return (
    <div>
      <main>
        <div className='filter-sort-container'>
          <ToyFilter filterBy={filterBy} onSetFilter={onSetFilter} />
          <ToySort sortBy={sortBy} setSortBy={setSortBy} />
        </div>
        <Link className='add-toy' to='/toy/edit'>
          Add Toy
        </Link>
        <ToyList toys={toys} onRemoveToy={onRemoveToy} />
      </main>
    </div>
  )
}
