import { ToyPreview } from './ToyPreview'

export function ToyList({ toys, onRemoveToy }) {
  return (
    <ul className='toys-list'>
      {toys.map((toy) => (
        <li key={toy._id}>
          <ToyPreview key={toy._id} toy={toy} onRemoveToy={onRemoveToy} />
        </li>
      ))}
    </ul>
  )
}
