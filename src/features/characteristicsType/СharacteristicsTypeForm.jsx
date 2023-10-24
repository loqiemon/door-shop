
import React, { useState } from 'react'
import styled from 'styled-components'
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

function СharacteristicsTypeForm({
    handleSend,
    defaulValues = {
        name: '',
        price: false
    }
}) {
  const [inputs, setInputs] = useState(defaulValues);

  const handleSubmit = () => {
    handleSend(inputs)
  }

  return (
    <Container>
        <Input
            value={inputs.name}
            onChange={e => setInputs(prev => ({...prev, name: e.target.value}))}
        />
        <FormControlLabel
            required
            control={<Checkbox 
                        checked={inputs.price}
                        onChange={(e) => (setInputs(prev => ({
                            ...prev,
                            price: e.target.checked
                        })))}
                    />}
            label="Required" 
        />
        <Button onClick={handleSubmit}>
            Сохранить
        </Button>
    </Container>
  )
}

export default СharacteristicsTypeForm

const Container = styled.div`
    width: 100%;
    padding: 10px 0;
`

const Input = styled.input`
    background-color: #f7f7f7;
    padding: 12px;
    border-radius: 15px;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
`
const Button = styled.button`
    padding: 12px;
    background-color: #f7f7f7;
    border-radius: 15px;
    transition: all .35s ease-in;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    margin-left: 15px;
    &:hover {
      background-color: #56195d;
      color: white;
    }
`