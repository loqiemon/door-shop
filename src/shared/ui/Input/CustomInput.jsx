import React from 'react'
import styled from 'styled-components'
import TextField from '@mui/material/TextField';


import { colors } from '../../colors';


function CustomInput({
  onChange,
  value,
  ...props
}) {
  return (
    <MyInput
      onChange={onChange}
      value={value}
      {...props}
    />
  )
}

export default CustomInput


const MyInput = styled(TextField)`
  & .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline {
    border-radius: 15px; 
    border-color: ${colors.purple};
  }

  & .MuiInputLabel-root.Mui-focused {
    color: ${colors.purple}; 
  }

  & .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline {
    border-radius: 15px;
  }
    width: 100%;
    max-width: 450px;
    background-color: ${colors.gray};
    padding: 12px;
    border-radius: 15px;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
`