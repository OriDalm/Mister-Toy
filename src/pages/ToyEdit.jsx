import { toyService } from '../services/toy.service.js'
import { showErrorMsg } from '../services/event-bus.service.js'

import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { MultiSelect } from '../cmps/MultiSelect.jsx'

export function ToyEdit() {
  const [toyToEdit, setToyToEdit] = useState(toyService.getEmptyToy())
  const [selectedLabels, setSelectedLabels] = useState([])
  const navigate = useNavigate()
  const params = useParams()

  useEffect(() => {
    if (params.toyId) loadToy()
  }, [])

  function loadToy() {
    toyService
      .getById(params.toyId)
      .then((toy) => {
        setToyToEdit(toy)
        setSelectedLabels(toy.labels || []) // Set selected labels
      })
      .catch((err) => {
        console.log('Had issued in toy edit:', err)
        navigate('/toy')
        showErrorMsg('Toy not found!')
      })
  }

  function onSetLabels(labels) {
    setToyToEdit({ ...toyToEdit, labels })
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setToyToEdit({
      ...toyToEdit,
      [name]: value,
    })
  }

  function onSaveToy(ev) {
    ev.preventDefault()
    toyService
      .save({
        ...toyToEdit,
        labels: selectedLabels, // Save selected labels
      })
      .then(() => navigate('/toy'))
      .catch((err) => {
        showErrorMsg('Cannot save toy', err)
      })
  }
  const { name, price } = toyToEdit

  return (
    <section className='toy-edit'>
      <form onSubmit={onSaveToy}>
        <label>Toy name</label>
        <input type='text' name='name' value={name} onChange={handleChange} />
        <label>Price</label>
        <input type='number' name='price' value={price} onChange={handleChange} />

        <MultiSelect selectedLabels={selectedLabels} setSelectedLabels={setSelectedLabels} />
        <button type='submit'>{params.toyId ? 'Update' : 'Add'} Toy</button>
      </form>
    </section>
  )
}
