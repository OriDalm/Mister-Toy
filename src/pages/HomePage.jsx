import logoUrl from '../assets/img/toy.jpg'

export function HomePage() {
  return (
    <section>
      <h1>Welcome To My Toy Exhibition</h1>
      <img className='toy-img' src={logoUrl} />
    </section>
  )
}
