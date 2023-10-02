import { useEffect, useState } from 'react'

export function ToySort({ handleChange, sortBy }) {
  // function handleChange({ target }) {
  //   const field = target.name
  //   const value = target.type === 'number' ? +target.value : target.value
  //   console.log('field', field)
  //   console.log('value', value)
  //   if (field === 'desc')
  //     setSortByToEdit((prevSort) => ({
  //       ...prevSort,
  //       desc: -prevSort.desc,
  //     }))
  //   else
  //     setSortByToEdit((prevSort) => ({
  //       ...prevSort,
  //       [field]: value,
  //     }))
  // }

  return (
    <form className='toy-sort'>
      <select name='sortBy' value={sortBy} onChange={handleChange}>
        <option value='default'>Sort by</option>
        <option value='name'>Name</option>
        <option value='price'>Price</option>
        <option value='createdAt'>Date</option>
      </select>
      <label>
        <input type='checkbox' name='desc' onChange={handleChange} />
        Descending
      </label>
    </form>
  )
}
