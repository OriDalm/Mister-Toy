import { useDispatch, useSelector } from 'react-redux'
// import { ToyFilter } from '../cmps/ToyFilter.jsx'
// import { ToyList } from '../cmps/ToyList.jsx'
import { toyService } from '../services/toy.service.js'
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'
import { loadToys, removeToy, removeToyOptimistic, saveToy, setFilterBy } from '../store/actions/toy.actions.js'
import { SET_FILTER_BY } from '../store/reducers/toy.reducer.js'
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

  function onRemoveToy(toyId) {
    // removeToy(toyId)
    removeToyOptimistic(toyId)
      .then(() => {
        showSuccessMsg('Toy removed')
      })
      .catch((err) => {
        console.log('Cannot remove toy', err)
        showErrorMsg('Cannot remove toy')
      })
  }

  function onSetFilter(filterBy) {
    setFilterBy(filterBy)
  }

  return (
    <div>
      <h3>Toys App</h3>
      <main>
        <ToyFilter filterBy={filterBy} onSetFilter={onSetFilter} />
        <ToySort sortBy={sortBy} setSortBy={setSortBy} />
        <Link className='add-toy' to='/toy/edit'>
          Add Toy
        </Link>
        <ToyList toys={toys} onRemoveToy={onRemoveToy} />
      </main>
    </div>
  )
}
