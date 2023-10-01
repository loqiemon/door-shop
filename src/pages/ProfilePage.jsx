import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import CategoryForm from '../features/categories/CategoryForm'
import { useDispatch, useSelector } from 'react-redux'
import CategoryList from '../features/categories/CategoryList'
import ProductsForm from '../features/products/ProductsForm'
import { addProduct, deleteProduct, editProduct } from '../app/actionCreators'
import Modal from '../features/modal/Modal'
import ProductList from '../features/products/ProductList'
import ProductList2 from '../features/products/ProductList2'
import ProductList3 from '../features/products/ProductList3'


function ProfilePage() {
  const [currentContent, setCurrentContent] = useState('profile');
  const user = useSelector(state => state.auth.user);
  const [addModal, setAddModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [product1, setProduct1] = useState({
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

  const handleAdd = (product) => {
    dispatch(addProduct(product))
    
  }

  const handleEditConfirm = (prod) => {
    dispatch(editProduct(prod))
    setEditModal(false)
  }

  const handleEdit = (product) => {
    setEditModal(true)
    setProduct1({...product, accessoryType: product.accessoryTypeId})
  }

  const handleDelete = (id) => {
    dispatch(deleteProduct(id))
  }

  const handleClose = () => {
    setAddModal(false)
    setEditModal(false)
  }

  return (
    <ProfileContainer>
      <ProfileTitle>Настройки</ProfileTitle>
      {/* <ProfileMain> */}
        <ProfileAside>
        {currentContent === 'profile' ? 
          <ActiveMenuItem onClick={() => setCurrentContent('profile')}>Профиль</ActiveMenuItem>:
          <ProfileAsideItem onClick={() => setCurrentContent('profile')}>Профиль</ProfileAsideItem>
        }
        {user.role === 'admin' && (
          currentContent === 'products' ? (
            <ActiveMenuItem onClick={() => setCurrentContent('products')}>Товары</ActiveMenuItem>
          ) : (
            <ProfileAsideItem onClick={() => setCurrentContent('products')}>Товары</ProfileAsideItem>
          )
        )}
        {user.role === 'admin' && (
          currentContent === 'categories' ? (
            <ActiveMenuItem onClick={() => setCurrentContent('categories')}>Категории</ActiveMenuItem>
          ) : (
            <ProfileAsideItem onClick={() => setCurrentContent('categories')}>Категории</ProfileAsideItem>
          )
        )}
        </ProfileAside>
        <ProfileContent>
          {currentContent === 'profile' && (
            <div>Контент профиля</div>
          )}
          {currentContent === 'products' && (
            <Content>
              {addModal &&
                <Modal onClose={handleClose} children={<ProductsForm handleSubmit={handleAdd}/>} />
              }
              {editModal &&
                <Modal 
                  onClose={handleClose}
                  children={
                    <ProductsForm
                      title='Редактирование товара'
                      btnText='Сохранить'
                      handleSubmit={(prod) => handleEditConfirm(prod)}
                      inputValues = {{
                        id: product1.id,
                        name: product1.name,
                        manufacturer: product1.manufacturer,
                        country: product1.country,
                        weight: product1.weight,
                        description: product1.description,
                        retailPrice: product1.retailPrice,
                        wholesalePrice: product1.wholesalePrice,
                        accessoryType: product1.accessoryTypeId,
                        vendorCode: product1.vendorCode,
                        isAvaible: product1.isAvaible,
                        image: product1.image.split(' ')
                      }}
                    />
                  } 
                />
              }
              <ProductList3
                children={<Button onClick={() => setAddModal(true)}>Добавить товар</Button>}
                handleEdit={handleEdit}
                handleDelete={handleDelete}
              />
            </Content>
          )}
          {currentContent === 'categories' && (
            <Content>
                {addModal && <Modal onClose={handleClose} children={<CategoryForm/>} />}
                <CategoryList>
                  <Button onClick={() => setAddModal(true)}>Добавить категорию</Button>
                </CategoryList>
            </Content>
          )}
        </ProfileContent>
      {/* </ProfileMain> */}
    </ProfileContainer>
  )
}

export default ProfilePage

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
  /* width: 200px;  */
  padding: 20px;
  /* max-height: 190px; */
  display: flex;
  /* flex-direction: column; */
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

const ProfileMain = styled.div`
  width: 100%;
  display: flex;
  padding: 20px 0;
`

const ProfileContent = styled.div`
  width: 100%;
  padding: 0 5px;
  /* overflow-y: scroll; */
  /* max-height: 70%; */
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
