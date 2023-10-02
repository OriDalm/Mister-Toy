import { ToyPreview } from './ToyPreview'

export function ToyList({ toys, onRemoveToy, user }) {
  return (
    <ul className='toys-list'>
      {toys.map((toy) => (
        <li className='toy' key={toy._id}>
          <ToyPreview user={user} toy={toy} onRemoveToy={onRemoveToy} />
        </li>
      ))}
    </ul>
  )
}
