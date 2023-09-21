import * as React from 'react'
import OutlinedInput from '@mui/material/OutlinedInput'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import ListItemText from '@mui/material/ListItemText'
import Select from '@mui/material/Select'
import Checkbox from '@mui/material/Checkbox'
import { toyService } from '../services/toy.service'
import { useEffect, useState } from 'react'

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

const labels = toyService.getToyLabels()

export function MultiSelect({ selectedLabels, setSelectedLabels }) {
  const [personName, setPersonName] = useState(selectedLabels || [])

  const handleChange = (event) => {
    const {
      target: { value },
    } = event
    setPersonName(typeof value === 'string' ? value.split(',') : value)
  }

  useEffect(() => {
    setSelectedLabels(personName)
  }, [personName, setSelectedLabels])

  return (
    <div>
      <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id='demo-multiple-checkbox-label'>Tag</InputLabel>
        <Select
          labelId='demo-multiple-checkbox-label'
          id='demo-multiple-checkbox'
          multiple
          value={personName}
          onChange={handleChange}
          input={<OutlinedInput label='Tag' />}
          renderValue={(selected) => selected.join(', ')}
          MenuProps={MenuProps}
        >
          {labels.map((label) => (
            <MenuItem key={label} value={label}>
              <Checkbox checked={personName.indexOf(label) > -1} />
              <ListItemText primary={label} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  )
}
