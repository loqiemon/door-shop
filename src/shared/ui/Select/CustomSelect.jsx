import React, { Children } from 'react'
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';

function CustomSelect({
  onChange,
  value,
  options = [],
  label,
  children,
  ...props
}) {
  return (
    <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
      <InputLabel id="demo-simple-select-standard-label">{label}</InputLabel>
      <Select
        labelId="demo-simple-select-standard-label"
        id="demo-simple-select-standard"
        value={value}
        onChange={onChange}
        label="Type"
        {...props}
      >
        {options.map(option => (
          <MenuItem value={option.value}>{option.text}</MenuItem>
        ))}
        {children}
      </Select>
    </FormControl>
  )
}

export default CustomSelect