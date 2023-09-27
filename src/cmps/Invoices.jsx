import { utilService } from '../services/util.service'

export function Invoices() {
  return (
    <section className='invoices-container'>
      <h3 className='invoices-title'>Invoices</h3>
      <table className='invoices-table'>
        <thead>
          <tr>
            <th>Customer name</th>
            <th>Date</th>
            <th>Amount</th>
            <th>Product ID</th>
            <th>Status</th>
            <th>Option</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Borivoje Kok</td>
            <td>2023-09-28</td>
            <td>${utilService.getRandomIntInclusive(20, 400)}</td>
            <td>{utilService.makeId(6)}</td>
            <td>Paid</td>
            <td className='more'>More</td>
          </tr>
          <tr>
            <td>Clifford Rodney</td>
            <td>2023-09-27</td>
            <td>${utilService.getRandomIntInclusive(20, 400)}</td>
            <td>{utilService.makeId(6)}</td>
            <td>Paid</td>
            <td className='more'>More</td>
          </tr>
          <tr>
            <td>Emmeline Mortensen</td>
            <td>2023-09-27</td>
            <td>${utilService.getRandomIntInclusive(20, 400)}</td>
            <td>{utilService.makeId(6)}</td>
            <td>Pending</td>
            <td className='more'>More</td>
          </tr>
          <tr>
            <td>Timothea Brant</td>
            <td>2023-09-27</td>
            <td>${utilService.getRandomIntInclusive(20, 400)}</td>
            <td>{utilService.makeId(6)}</td>
            <td>Paid</td>
            <td className='more'>More</td>
          </tr>
          <tr>
            <td>Winston Swango</td>
            <td>2023-09-27</td>
            <td>${utilService.getRandomIntInclusive(20, 400)}</td>
            <td>{utilService.makeId(6)}</td>
            <td>Pending</td>
            <td className='more'>More</td>
          </tr>
        </tbody>
      </table>
    </section>
  )
}
