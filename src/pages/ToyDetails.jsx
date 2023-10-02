import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { toyService } from '../services/toy.service.js'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service.js'
import { utilService } from '../services/util.service.js'
import { reviewService } from '../services/review.service.js'
import { useSelector } from 'react-redux'

export function ToyDetails() {
  const [msg, setMsg] = useState(utilService.getEmptyMsg())
  const [review, setReview] = useState(utilService.getEmptyReview())
  const [toy, setToy] = useState(null)
  const user = useSelector((storeState) => storeState.userModule.loggedinUser)
  const { toyId } = useParams()
  const navigate = useNavigate()
  const [reviews, setReviews] = useState([])

  useEffect(() => {
    loadToys()
    loadReviews()
  }, [toyId])

  function handleMsgChange(ev) {
    const field = ev.target.name
    const value = ev.target.value
    setMsg((msg) => ({ ...msg, [field]: value }))
  }

  async function onSaveMsg(ev) {
    ev.preventDefault()
    const savedMsg = await toyService.addMsg(toy._id, msg.txt)
    setToy((prevToy) => ({
      ...prevToy,
      msgs: [...(prevToy.msgs || []), savedMsg],
    }))
    setMsg(utilService.getEmptyMsg())
    showSuccessMsg('Msg saved!')
  }

  async function onRemoveMsg(msgId) {
    const removedMsgId = await toyService.removeMsg(toy._id, msgId)
    setToy((prevToy) => ({
      ...prevToy,
      msgs: prevToy.msgs.filter((msg) => removedMsgId !== msg.id),
    }))
    showSuccessMsg('Msg removed!')
  }

  function handleReviewChange(ev) {
    const field = ev.target.name
    const value = ev.target.value
    setReview((review) => ({ ...review, [field]: value }))
  }

  async function onSaveReview(ev) {
    ev.preventDefault()
    const savedReview = await reviewService.add({ txt: review.txt, aboutToyId: toy._id })
    console.log('savedReview', savedReview)
    setToy((prevToy) => ({
      ...prevToy,
      reviews: [...(prevToy.reviews || []), savedReview],
    }))

    console.log(toy)
    setReview(utilService.getEmptyReview())
    showSuccessMsg('Review saved!')
  }

  async function onRemoveReview(reviewId) {
    const removedReviewId = await reviewService.remove(reviewId)
    setToy((prevToy) => ({
      ...prevToy,
      reviews: prevToy.reviews.filter((review) => removedReviewId !== review.id),
    }))
    showSuccessMsg('Review removed!')
  }

  async function loadToys() {
    try {
      const toy = await toyService.getById(toyId)
      setToy(toy)
    } catch {
      console.log('Had issues in toy details', err)
      showErrorMsg('Cannot load toys')
      navigate('/toy')
    }
  }

  async function loadReviews() {
    try {
      const filter = { name: 'exampleFilter', sort: 'exampleSort' }

      const reviews = await reviewService.query({ aboutToyId: toyId })
      setReviews(reviews)
    } catch (err) {
      console.log('Had issues loading reviews', err)
      showErrorMsg('Cannot load reviews')
    }
  }

  const { txtMessage } = msg
  const { txtReview } = review

  if (!toy) return <div>Loading...</div>
  return (
    <section className='toy-details'>
      <ul>
        {toy.msgs &&
          toy.msgs.map((msg) => (
            <li key={msg.id}>
              By: {msg.by ? msg.by.fullname : 'Unknown User'}, {msg.txt}
              <button type='button' onClick={() => onRemoveMsg(msg.id)}>
                Remove
              </button>
            </li>
          ))}
      </ul>

      <form className='login-form' onSubmit={onSaveMsg}>
        <input type='text' name='txt' value={txtMessage} placeholder='Enter Your Message' onChange={handleMsgChange} required autoFocus />
        <button>Send</button>
      </form>
      <h1>Toy: {toy.name} </h1>
      <h3>price: {toy.price}</h3>
      <h5>{Array.isArray(toy.labels) ? toy.labels.join(', ') : toy.labels}</h5>
      <h3>{toy.inStock}</h3>

      <ul>
        {reviews.map((review) => (
          <li key={review.id}>
            By: {user?.fullname}, {review.txt}
            <button type='button' onClick={() => onRemoveReview(review.id)}>
              Remove
            </button>
          </li>
        ))}
      </ul>

      <form className='login-form' onSubmit={onSaveReview}>
        <input type='text' name='txt' value={txtReview} placeholder='Write a Review' onChange={handleReviewChange} required />
        <button>Submit Review</button>
      </form>

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
