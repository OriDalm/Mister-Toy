import { useNavigate, Link } from 'react-router-dom'

function generateLabelClass(label) {
  const labelColors = {
    'On wheels': 'on-wheels',
    'Box game': 'box-game',
    Art: 'art',
    Baby: 'baby',
    Doll: 'doll',
    Puzzle: 'puzzle',
    Outdoor: 'outdoor',
    'Battery Powered': 'battery-powered',
  }
  return labelColors[label]
}

export function ToyPreview({ toy, onRemoveToy }) {
  const navigate = useNavigate()

  const handleEditClick = (e) => {
    e.stopPropagation()
    navigate(`/toy/edit/${toy._id}`)
  }

  const handleDeleteClick = (e) => {
    e.stopPropagation()
    onRemoveToy(toy._id)
  }

  return (
    <article
      className='toy-preview'
      onClick={() => {
        navigate(`/toy/details/${toy._id}`)
      }}
    >
      <img src={`https://robohash.org/${toy.name}?set=set1`} alt='' />
      <div className='details-container'>
        <div className='name-container flex justify-between'>
          <h4 className='toy-name'>{toy.name}</h4>
          {toy.inStock ? <p className='toy-stock'>In Stock</p> : <p className='toy-stock'>Out of Stock</p>}
        </div>
        <p>
          <span>${toy.price.toLocaleString()}</span>
        </p>
        <div className='label-container'>
          {Array.isArray(toy.labels) &&
            toy.labels.map((label, index) => (
              <h5 key={index} className={`label ${generateLabelClass(label)}`}>
                {label}
              </h5>
            ))}
        </div>
        <div className='btn-container justify-between flex'>
          <button className='btn-edit' onClick={handleEditClick}>
            Edit
          </button>
          <button className='btn-remove' onClick={handleDeleteClick}>
            Delete
          </button>
        </div>
      </div>
    </article>
  )
}
