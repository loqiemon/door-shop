import React from 'react'
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import styled from 'styled-components';


function MyAccordion({
  label,
  text,
  children
}) {
  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography>{label}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Typography>
          <Name>{text}</Name>
        </Typography>
        {children}
      </AccordionDetails>
    </Accordion>
  )
}

export default MyAccordion

const Name = styled.span`
  font-weight: 600;
  margin-left: 10px;
`