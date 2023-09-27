import { useEffect, useRef, useState } from 'react'
import { utilService } from '../services/util.service.js'
import { toyService } from '../services/toy.service.js'
import * as React from 'react'
import OutlinedInput from '@mui/material/OutlinedInput'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import ListItemText from '@mui/material/ListItemText'
// import Select from '@mui/material/Select'
import Checkbox from '@mui/material/Checkbox'
import { Formik, Form, Field } from 'formik'
import { TextField } from '@mui/material'
import Select from '@mui/material/Select'
import Box from '@mui/material/Box'

function CustomInput(props) {
  return <TextField {...props} id='outlined-basic' variant='outlined' />
}

export function ToyFilter({ filterBy, onSetFilter }) {
  const [filterByToEdit, setFilterByToEdit] = useState({ name: '', inStock: '', labels: [], ...filterBy })
  const toyLabels = toyService.getToyLabels()

  const ITEM_HEIGHT = 48
  const ITEM_PADDING_TOP = 8
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  }

  onSetFilter = useRef(utilService.debounce(onSetFilter))

  useEffect(() => {
    onSetFilter.current(filterByToEdit)
  }, [filterByToEdit])

  function handleChange({ target }) {
    const field = target.name
    let value = target.value

    switch (target.type) {
      case 'number':
      case 'range':
        value = +value || ''
        break

      case 'checkbox':
        value = target.checked
        break

      case 'select-multiple':
        const selectedOptions = Array.from(target.selectedOptions, (option) => option.value)
        value = selectedOptions
        break

      default:
        break
    }
    setFilterByToEdit((prevFilter) => ({ ...prevFilter, [field]: value }))
  }

  function onSubmitFilter(ev) {
    ev.preventDefault()
    onSetFilter(filterByToEdit)
  }
  const { name, inStock, labels } = filterByToEdit

  return (
    <section className='toy-filter'>
      <FormControl as={CustomInput} type='text' name='name' id='name' placeholder='By name' value={name} onChange={handleChange}></FormControl>
      <Box sx={{ minWidth: 120 }}>
        <FormControl fullWidth>
          <InputLabel id='demo-simple-select-label'>Stock</InputLabel>
          <Select labelId='demo-simple-select-label' id='demo-simple-select' value={inStock} label='Stock' name='inStock' onChange={handleChange}>
            <MenuItem value=''>All</MenuItem>
            <MenuItem value='true'>In stock</MenuItem>
            <MenuItem value='false'>Not in stock</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id='demo-multiple-checkbox-label'>Tag</InputLabel>
        <Select
          labelId='demo-multiple-checkbox-label'
          id='demo-multiple-checkbox'
          multiple
          name='labels'
          value={labels}
          onChange={handleChange}
          input={<OutlinedInput label='Tag' />}
          renderValue={(selected) => selected.join(', ')}
          MenuProps={MenuProps}
        >
          {toyLabels.map((toyLabel) => (
            <MenuItem key={toyLabel} value={toyLabel}>
              <Checkbox checked={labels.indexOf(toyLabel) > -1} />
              <ListItemText primary={toyLabel} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </section>
  )
}
