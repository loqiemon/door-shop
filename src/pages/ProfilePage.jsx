import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'
import СharacteristicsType from '../features/characteristicsType/СharacteristicsType'

import { logoutFunc } from '../app/actionCreators'

import ProductsAdminPage from '../features/products/ProductsAdminPage'
import CategoriesAdminPage from '../features/categories/CategoriesAdminPage'
import { useDeleteProductMutation, usePostProductMutation, usePutProductMutation } from '../features/products/productApi'
import CsvForm from '../features/csv/CsvForm'
import Orders from '../features/order/Orders'


function ProfilePage() {
  const [currentContent, setCurrentContent] = useState('profile');
  const user = useSelector(state => state.auth.user);
  const [addModal, setAddModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [productEdit, setProductEdit] = useState({
    id: '',
    name: '',
    manufacturer: '',
    country: '',
    weight: '',
    description: '',
    retailPrice: '',
    wholesalePrice: '',
    accessoryTypeId: '',
    isAvaible: '',
    image: [],
    vendorCode: '',
    searchParameter: '',
    characteristics: []
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [addPost, { isLoading }] = usePostProductMutation()
  const [putProduct] = usePutProductMutation()


  const handleAdd = (product) => {
    addPost(product)
  }

  const handleEditConfirm = (prod) => {
    // dispatch(editProduct(prod))
    putProduct(prod)
    setEditModal(false)
  }

  const handleEdit = (product) => {
    setEditModal(true)
    setProductEdit({
      ...product,
      accessoryType: product.accessoryTypeId,
      characteristics: product.characteristic 
    })
  }

  const [deleteProduct, { isLoading: isDeleting }] = useDeleteProductMutation();


  const handleClose = () => {
    setAddModal(false)
    setEditModal(false)
  }

  const logout = () => {
    dispatch(logoutFunc());
    navigate('/')
  }

  const isHaveRole = (role) => {
    return user.role === role
  }

  const isCurrentContent = (content) => {
    return currentContent === content
  }


  return (
    <ProfileContainer>
      <ProfileTitle>Настройки</ProfileTitle>
        <ProfileAside>
          <ContentButton 
            name='profile'
            text='Профиль' 
            currentContent={currentContent}
            setCurrentContent={setCurrentContent}
          />
          {isHaveRole('admin') && 
            <ContentButton 
              name='products'
              text='Товары' 
              currentContent={currentContent}
              setCurrentContent={setCurrentContent}
            />
          }
          {isHaveRole('admin') && 
            <ContentButton 
              name='categories'
              text='Категории' 
              currentContent={currentContent}
              setCurrentContent={setCurrentContent}
            />
          }
          {isHaveRole('admin') && 
            <ContentButton 
              name='orders'
              text='Заказы' 
              currentContent={currentContent}
              setCurrentContent={setCurrentContent}
            />
          }
          {/* {isHaveRole('admin') && 
            <ContentButton 
              name='characteristictsTypes'
              text='Типы хар-к' 
              currentContent={currentContent}
              setCurrentContent={setCurrentContent}
            />
          } */}
          {isHaveRole('admin') && 
            <ContentButton 
              name='csv'
              text='CSV' 
              currentContent={currentContent}
              setCurrentContent={setCurrentContent}
            />
          }
        </ProfileAside>
        <ProfileContent>
          <Content>
          {isCurrentContent('profile') && (
            <>
                Контент профиля
                <Button onClick={logout}>Выйти из аккаунта</Button>
            </>
          )}
          {isCurrentContent('products') && (
            <ProductsAdminPage
              handleClose={handleClose}
              handleAdd={handleAdd}
              addModal={addModal}
              editModal={editModal}
              productEdit={productEdit}
              setAddModal={setAddModal}
              handleEdit={handleEdit}
              handleDelete={deleteProduct}
              handleEditConfirm={handleEditConfirm}
            />
          )}
          {isCurrentContent('categories') && (
            <CategoriesAdminPage
              addModal={addModal}
              handleClose={handleClose}
              setAddModal={setAddModal}
            />
          )}
          {isCurrentContent('characteristictsTypes') && (
              <СharacteristicsType/>
          )}
          {isCurrentContent('csv') && (
              <CsvForm/>
          )}
          {isCurrentContent('orders') && (
              <Orders/>
          )}
          </Content>
        </ProfileContent>
    </ProfileContainer>
  )
}

export default ProfilePage


function ContentButton ({ currentContent, name, text, setCurrentContent }) {
  return (
    currentContent === name ? (
      <ActiveMenuItem onClick={() => setCurrentContent(name)}>{text}</ActiveMenuItem>
    ) : (
      <ProfileAsideItem onClick={() => setCurrentContent(name)}>{text}</ProfileAsideItem>
    )
  )
}

const ProfileContainer = styled.div`
    max-width: 1280px;
    height: 100%;
    display: flex;
    flex-direction: column;
    margin: 0 auto;
    padding-top: 20px;

    @media (max-width: 576px) {
      height: 1000px;
    }
`

const ProfileTitle = styled.h1`
    font-size: 35px;
    font-weight: 700;
    text-align: left;
`

const ProfileAside = styled.div`
  padding: 20px;
  display: flex;
  background-color: #fff;
  gap: 10px;
  border-radius: 15px;
  @media (max-width: 767px) {
    flex-wrap: wrap;
  }
`

const ProfileAsideItem = styled(Link)`
  max-height: 50px;
  width: 100%;
  display: flex;
  justify-content: center;
  gap: 20px;
  font-size: 20px;
  font-weight: 600;
  color: #000;
  padding: 10px;
  border-radius: 15px;
  transition: all .35s ease-in;
  background-color: #f7f7f7;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 5px;

  &:hover {
    /* background-color: #56195d; */
    background-color: #FFD700;
    color: #000;
  }
`

const ProfileContent = styled.div`
  width: 100%;
  padding: 0 5px;
  overflow-y: hidden;
  /* height: 100%; */
`
const Content = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: flex-start;
  padding: 10px 0;
  height: 100%;
`

const Button = styled.button`
    padding: 12px;
    background-color: #f7f7f7;
    border-radius: 15px;
    transition: all .35s ease-in;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;

    &:hover {
      /* background-color: #56195d; */
      background-color: #FFD700;
      color: #000;
    }
`

const ActiveMenuItem = styled(ProfileAsideItem)`
  /* background-color: #56195d; */
  background-color: #FFD700;
  color: #000;
`;
