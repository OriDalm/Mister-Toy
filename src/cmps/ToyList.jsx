import { ToyPreview } from './ToyPreview'

export function ToyList({ toys, onRemoveToy }) {
  return (
    <ul className='toys-list'>
      {toys.map((toy) => (
        <li className='toy' key={toy._id}>
          <ToyPreview key={toy._id} toy={toy} />
          <button onClick={() => onRemoveToy(toy._id)}>Delete</button>
        </li>
      ))}
    </ul>
  )
}
