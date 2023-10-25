import React, { useState } from 'react';
import styled from 'styled-components';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';


import { useGetOrdersQuery } from './orderApi';


function Orders() {

  const { data: orders, isLoading, isFetching, error} = useGetOrdersQuery();

  return (
    <Container>
      {orders && orders.map((order) => (
        <Order key={order.id}>
          <Span>{order.name}</Span>
          <Span>{order.adress}</Span>
          <Span>{order.phoneNumber}</Span>
          <Span>{order.mmail}</Span>
          <Span>{order.sum}</Span>
          <Span>{order.paymentType}</Span>
          <Span>{order.commentary}</Span>
          <Accordion>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1a-content"
                      id="panel1a-header"
                    >
                      <Typography>Товары</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      {order.accessories.map(item => 
                        <Typography key={item.id}>{item.name}</Typography>
                      )}
                    </AccordionDetails>
                  </Accordion>
        </Order>
      ))}
    </Container>
  )
}

export default Orders

const Container = styled.div`
  width: 100%;
  padding: 10px 0;
  display: flex;
  
`

const Order = styled.div`
  width: 100%;
  padding: 5px;
  display: flex;
  flex-direction: column;  
`

const Span = styled.span`
  font-size: 18px;
`