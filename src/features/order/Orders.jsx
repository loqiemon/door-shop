import React, { useState } from 'react';
import styled from 'styled-components';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';


import { useDeleteOrderMutation, useGetOrdersQuery, usePutOrderMutation } from './orderApi';
import Loader from '../../components/Loader';
import Pagination from '../../components/Pagination';
import OrderFillters from './OrderFillters';


function Orders() {
  const [filters, setFilters] = useState({
    search: '',
    searchParameter: 'name',
    page: 1,
    sortBy: 'date',
    sortType: 'asc',
  });
  const [acceptFilters, setAcceptFilters] = useState({});
  const [page, setPage] = useState(1);

  const { data, isLoading, isFetching, error } = useGetOrdersQuery(acceptFilters);
  const { orders, totalCount } = data || { orders: [], totalCount: 0 };

  const [deleteOrder] = useDeleteOrderMutation();
  const [putOrder] = usePutOrderMutation();

  const goToPage = (pageNumber) => {
    let pageNumberToSet = 1;

    if (filters.search === acceptFilters.search &&
      filters.searchParameter === acceptFilters.searchParameter &&
      filters.sortBy === acceptFilters.sortBy &&
      filters.sortType === acceptFilters.sortType
    ) {

      setPage(pageNumber)
      pageNumberToSet = pageNumber
    } else {
      setPage(1)
      pageNumberToSet = 1
    }
    setAcceptFilters(prev => ({
      ...prev,
      ...filters,
      page: pageNumberToSet,
    }))
  };

  return (
    <Container style={{ height: (isFetching || isLoading) ? '50vh' : 'auto' }}>
      {(isFetching || isLoading) ?
        <LoaderFlex><Loader /></LoaderFlex> :
        <>
          <OrderFillters setFilters={setFilters} goToPage={goToPage} filters={filters} page={page} />
          <Container2>
            {orders && orders.length === 0 && <Bold>Заказов нет</Bold>}
            {orders && orders.map((order) => (
              <Order key={order.id}>
                <Span><Bold>Имя: </Bold>{order.name}</Span>
                <Span><Bold>Адрес: </Bold>{order.adress}</Span>
                <Span><Bold>Номер: </Bold>{order.phoneNumber}</Span>
                <Span><Bold>Почта: </Bold>{order.mail}</Span>
                <Span><Bold>Статус заказа: </Bold>{order.status}</Span>
                <Span><Bold>Дата заказа: </Bold>{new Date(order.date).toLocaleDateString()}</Span>
                <Span><Bold>Сумма заказа: </Bold>{order.sum} руб</Span>
                <Span><Bold>Тип оплаты: </Bold>{order.paymentType}</Span>
                <Span><Bold>Комментарий: </Bold>{order.commentary}</Span>
                <Accordion>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <Typography style={{ fontWeight: 'bold', fontSize: '20px' }}>Товары</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    {order.accessories.map(item =>
                      <Product key={item.id}>
                        <Span><Bold>Наименование: </Bold>{item.name}</Span>
                        <Span><Bold>Артикул: </Bold>{item.vendorCode}</Span>
                        <Span><Bold>Кол-во: </Bold>{item.count}</Span>
                        <Span><Bold>Сумма: </Bold>{item.retailPrice * item.count}</Span>
                      </Product>
                    )}
                  </AccordionDetails>
                </Accordion>
                {/* <Span
                  style={{ color: 'red', cursor: 'pointer', marginTop: '10px' }}
                  onClick={() => deleteOrder(order.id)}
                >
                  Удалить
                </Span> */}
                <Bold
                  style={{ cursor: 'pointer', marginTop: '10px' }}
                // onClick={() => putOrder(order)}
                >
                  Редактировать
                </Bold>
              </Order>
            ))}
          </Container2>
          <Pagination
            totalCount={totalCount}
            page={page}
            goToPage={goToPage}
            pageSize={10}
          />
        </>
      }
    </Container>
  )
}

export default Orders

const Container = styled.div`
  width: 100%;
  /* height: 100%; */
  min-height: 200px;
  padding: 10px 0;
  display: flex;
  position: relative;
  gap: 15px;
  flex-direction: column;
  align-items: center;
  
`

const Container2 = styled.div`
  width: 100%;
  display: flex;
  position: relative;
  flex-wrap: wrap;
  gap: 15px;
  max-height: 500px;
  overflow-y: auto;
`



const Order = styled.div`
  /* width: 100%; */
  width: 45%;
  padding: 10px;
  display: flex;
  flex-direction: column;  
  background-color: #fff;
  text-align: left;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  border-radius: 15px;
  @media (max-width: 767px) {
    width: 100%;
  }
`

const Span = styled.span`
  font-size: 18px;
`

const Bold = styled.span`
  font-weight: 600;
  font-size: 20px;
`

const Product = styled.div`
  width: 100%;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  gap: 5px;
  padding: 10px;
`

const LoaderFlex = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`

