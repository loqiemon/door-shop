import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'

import { addProduct, deleteProduct, editProduct, logoutFunc } from '../app/actionCreators'

import ProductsAdminPage from '../features/products/ProductsAdminPage'
import CategoriesAdminPage from '../features/categories/CategoriesAdminPage'


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
    vendorCode: ''
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleAdd = (product) => {
    dispatch(addProduct(product))
  }

  const handleEditConfirm = (prod) => {
    dispatch(editProduct(prod))
    setEditModal(false)
  }

  const handleEdit = (product) => {
    setEditModal(true)
    setProductEdit({...product, accessoryType: product.accessoryTypeId})
  }

  const handleDelete = (id) => {
    dispatch(deleteProduct(id))
  }

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
        </ProfileAside>
        <ProfileContent>
          {isCurrentContent('profile') && (
            <Content>
                Контент профиля
                <Button onClick={logout}>Выйти из аккаунта</Button>
            </Content>
          )}
          {isCurrentContent('products') && (
            <Content>
              <ProductsAdminPage
                handleClose={handleClose}
                handleAdd={handleAdd}
                addModal={addModal}
                editModal={editModal}
                productEdit={productEdit}
                setAddModal={setAddModal}
                handleEdit={handleEdit}
                handleDelete={handleDelete}
                handleEditConfirm={handleEditConfirm}
              />
            </Content>
          )}
          {isCurrentContent('categories') && (
            <Content>
                <CategoriesAdminPage
                  addModal={addModal}
                  handleClose={handleClose}
                  setAddModal={setAddModal}
                />
            </Content>
          )}
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
`
const Content = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: flex-start;
  padding-top: 10px;
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
