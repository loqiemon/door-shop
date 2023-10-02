
import React, { useState, useEffect } from 'react'
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import Carousel from 'react-material-ui-carousel'


import useSearch from '../../hooks/useSearch';
import useInput from '../../hooks/useInput';
import Modal from '../modal/Modal';
import Loader from '../../components/Loader'
import { deleteProduct, editProduct, fetchProducts, fetchCategories } from '../../app/actionCreators';


function ProductList2({handleEdit, handleDelete, children}) {
  const { products, isLoading, getProductsError, addProductsError } = useSelector(state => state.products);
  const { categories } = useSelector(state => state.categories);
  const { value: search, onChange: setSearch} = useInput();
  const [searchProp, setSearchProp] = useState('name');
  const { searchedArray } = useSearch(products, search, searchProp);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts())
    dispatch(fetchCategories())
  }, [])

  return (
        <>
            {isLoading && <MyLoader><Loader/></MyLoader>}
            {!isLoading && <Container>
                    <Body>
                        <Row style={{height: '40px', overflowX: 'hidden'}}>
                            <Name>Название</Name>
                            <HeaderItem>Бренд</HeaderItem>
                            <HeaderItem>Страна</HeaderItem>
                            {/* <HeaderItem>Вес</HeaderItem> */}
                            <Description >Описание</Description>
                            <HeaderItem>Доступность</HeaderItem>
                            <HeaderItem>Артикул</HeaderItem>
                            <HeaderItem>Розничная цена</HeaderItem>
                            <HeaderItem>Оптовая цена</HeaderItem>
                            <HeaderItem>Картинка</HeaderItem>
                            <HeaderItem>Тип</HeaderItem>
                            <HeaderItem>Действия</HeaderItem>
                        </Row>
                        {categories.length !== 0 && products.map(product => 
                            <Row key={product.id}>
                                <Name>{product.name}</Name>
                                <Item>{product.manufacturer}</Item>
                                <Item>{product.country}</Item>
                                {/* <Item>{product.weight}</Item> */}
                                <Description >{product.description}</Description>
                                <Item>{product.isAvaible}</Item>
                                <Item>{product.vendorCode} </Item>
                                <Item>{product.retailPrice} руб</Item>
                                <Item>{product.wholesalePrice} руб</Item>
                                <Image>
                                    <Carousel>
                                        {product.image.split(' ').map(imagePath => 
                                            <TableImage src={`${imagePath}`} alt="" key={imagePath}/>  
                                        )}
                                    </Carousel>
                                </Image>
                                <Item>{categories.filter(item => item.id === product.accessoryTypeId)[0].type}</Item>
                                <ItemAction>
                                    <EditButton onClick={() => handleEdit(product)}><i className="fa-regular fa-pen-to-square"></i></EditButton>
                                    <DeleteButton onClick={() => handleDelete(product.id)}><i className="fa-solid fa-trash-can"></i></DeleteButton>
                                </ItemAction>
                            </Row>
                        )}
                    </Body>
            </Container>
            }
        </>
  )
}

export default ProductList2

const MyLoader = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
`

const Container = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: 5px;
    /* overflow-x: scroll; */
`

const Row = styled.div`
    width: 100%;
    display: flex;
    height: 150px;
    overflow-y: hidden;
    /* justify-content: space-between; */
    margin-top: 10px;
    /* align-items: center; */
    border: 1px solid #7d7979;
    padding: 7px;
    gap: 15px;
    box-sizing: border-box;
    overflow-x: scroll;
`

const HeaderItem = styled.div`
    display: flex;
    justify-content: flex-start;
    text-align: left;
    text-overflow: ellipsis;
    overflow: hidden;
    /* width: 100px; */
`

const Item = styled(HeaderItem)`
    display: flex;
    height: 130px;
    overflow-y: auto;
    /* word-wrap: break-word;
    overflow-wrap: break-word;
    width: 150px; */
    white-space: nowrap;
    &::-webkit-scrollbar {
		width: 5px;           
	}
	  
    &::-webkit-scrollbar-track {
        background: rgba(0,0,0,0);      
    }
	  
	&::-webkit-scrollbar-thumb {
		background-color: #555;  
		border-radius: 20px;      
	}
	
	scrollbar-width: thin;
	scrollbar-color: #555 rgba(0,0,0,0);  
`

const ItemAction = styled(Item)`
    /* width: 80px; */
`

const Image = styled(Item)`
    /* width: 150px; */
`


const Name = styled(Item)`
    /* width: 130px; */
`

const Description = styled(Item)`
    /* width: 200px; */
`

const Body = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
`

const TableImage = styled.img`
  max-width: 100px;
  max-height: 100px;
`

const EditButtons = styled.button`
  color: #fff;
  border: none;
  padding: 5px 5px;
  cursor: pointer;
  width: 40px;
  height: 40px;
`

const EditButton = styled(EditButtons)`
  background-color: #3498db;
  margin-right: 5px;

  &:hover {
    background-color: #2980b9;
  }
`;

const DeleteButton = styled(EditButtons)`
  background-color: #e74c3c;

  &:hover {
    background-color: #c0392b;
  }
`;

