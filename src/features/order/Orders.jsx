import React, { useState } from 'react';
import styled from 'styled-components';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CheckIcon from '@mui/icons-material/Check';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import BackpackIcon from '@mui/icons-material/Backpack';
import CloseIcon from '@mui/icons-material/Close';


import { useDeleteOrderMutation, useGetOrdersQuery, usePutOrderMutation } from './orderApi';
import Loader from '../../components/Loader';
import Pagination from '../../components/Pagination';
import OrderFillters from './OrderFillters';
import Modal from '../modal/Modal';
import OrderForm from './OrderForm';



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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState({});

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

  const handleEdit = (order) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
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
                <Span><Bold>Статус заказа: </Bold>
                  {order.status === 'Не обработан' && <span style={{ color: '#b1980f91' }}>Не обработан</span>}
                  {order.status === 'В обработке' && <><AccessTimeIcon />В обработке</>}
                  {order.status === 'Собран' && <><BackpackIcon />Собран</>}
                  {order.status === 'Доставлен' && <><CheckMark />Доставлен</>}
                  {order.status === 'Отменен' && <><CloseIcon style={{ color: 'red' }} />Отменен</>}
                </Span>
                <Span><Bold>Дата заказа: </Bold>{new Date(order.date).toLocaleDateString()} {new Date(order.date).toLocaleTimeString()}</Span>
                <Span><Bold>Сумма заказа: </Bold>{order.sum} руб</Span>
                <Span>
                  <Bold>Тип оплаты: </Bold>
                  {order.paymentType === 'cash' ? 'Наличными' : 'Картой'}
                </Span>
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
                <Container2>
                  <Button
                    style={{ color: 'red', cursor: 'pointer', marginTop: '10px' }}
                    onClick={() => {
                      const confirmDelete = window.confirm('Are you sure you want to delete this order?');
                      if (confirmDelete) {
                        deleteOrder(order.id);
                      }
                    }}
                  >
                    Удалить
                  </Button>
                  {/* <Span
                  style={{ color: 'red', cursor: 'pointer', marginTop: '10px' }}
                  onClick={() => deleteOrder(order.id)}
                >
                  Удалить
                </Span> */}
                  <Button
                    style={{ cursor: 'pointer', marginTop: '10px' }}
                    onClick={() => handleEdit(order)}
                  >
                    Редактировать
                  </Button>
                </Container2>
              </Order>
            ))}
          </Container2>
          <Pagination
            totalCount={totalCount}
            page={page}
            goToPage={goToPage}
            pageSize={10}
          />
          {isModalOpen &&
            <Modal onClose={() => setIsModalOpen(false)} >
              <OrderForm
                setIsModalOpen={setIsModalOpen}
                totalPrice={selectedOrder.sum}
                accessories={selectedOrder.accessories}
                orderProp={selectedOrder}
                formType='edit'
              />
            </Modal>
          }
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

const CheckMark = styled(CheckIcon)`
  color: green;
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
  display: flex;
  align-items: center;
  gap: 10px;
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

const Button = styled.button`
    padding: 12px;
    max-width: 250px;
    background-color: #f7f7f7;
    border-radius: 15px;
    transition: all .35s ease-in;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    max-height: 60px;
    margin: 0 auto;
    &:hover {
      /* background-color: #56195d; */
      background-color: #FFD700;
      color: #000;
    }
    margin-bottom: 10px;
`