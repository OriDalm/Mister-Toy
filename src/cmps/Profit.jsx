import profitImage from '../assets/img/profit.png'

export function Profit() {
  return (
    <div className='profit-container'>
      <h3 className='profit-title'>Profit</h3>
      <div className='profit-content'>
        <img className='profit-img' src={profitImage} alt='Profit' />
        <p className='profit-percent'>+25% Since last week</p>
        <p className='profit-amount'>$15,572.70</p>
      </div>
    </div>
  )
}
