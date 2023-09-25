import { Link } from 'react-router-dom'

export function ToyPreview({ toy }) {
  return (
    <article className='toy-preview'>
      <h4>{toy.name}</h4>
      <p>
        Price: <span>${toy.price.toLocaleString()}</span>
      </p>
      <h5>{toy.labels}</h5>
      <hr />
      <Link to={`/toy/details/${toy._id}`}>Details</Link>
      <Link to={`/toy/edit/${toy._id}`}>Edit</Link>
    </article>
  )
}
