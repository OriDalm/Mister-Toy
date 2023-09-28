import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { toyService } from '../services/toy.service.js'
import { showErrorMsg } from '../services/event-bus.service.js'

export function ToyDetails() {
  const [toy, setToys] = useState(null)
  const { toyId } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    loadToys()
  }, [toyId])

  async function loadToys() {
    try {
      const toy = await toyService.getById(toyId)
      setToys(toy)
    } catch {
      console.log('Had issues in toy details', err)
      showErrorMsg('Cannot load toys')
      navigate('/toy')
    }
  }

  if (!toy) return <div>Loading...</div>
  return (
    <section className='toy-details'>
      <h1>Toy: {toy.name} </h1>
      <h3>price: {toy.price}</h3>
      <h5>{Array.isArray(toy.labels) ? toy.labels.join(', ') : toy.labels}</h5>
      <h3>{toy.inStock}</h3>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi voluptas cumque tempore, aperiam sed dolorum rem! Nemo quidem, placeat
        perferendis tempora aspernatur sit, explicabo veritatis corrupti perspiciatis repellat, enim quibusdam!
      </p>
      <button
        onClick={() => {
          navigate('/toy')
        }}
      >
        Back
      </button>
    </section>
  )
}
