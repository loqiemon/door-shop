import React from 'react'
import { Radio as MyRadio } from '@mui/material';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
function Radio({
  formLabel,
  onChange,
  value,
  options,
  children,
  ...props
}) {
  return (
    <FormControl>
      <FormLabel id="demo-controlled-radio-buttons-group">{formLabel}</FormLabel>
      <RadioGroup
        aria-labelledby="demo-controlled-radio-buttons-group"
        name="controlled-radio-buttons-group"
        value={value}
        onChange={e => onChange(e.target.value)}
      >
        {options?.length > 0 &&
          options.map(option =>
            <FormControlLabel
              key={option.value}
              value={option.value}
              control={<MuiRadio />}
              label={`${option.text}`}
            />
          )}
        {children}
      </RadioGroup>
    </FormControl>
  )
}

export default Radio