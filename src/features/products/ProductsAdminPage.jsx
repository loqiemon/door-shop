import React from 'react'
import ProductsForm from './ProductsForm'
import ProductList from './ProductList'
import styled from 'styled-components'


import Modal from '../modal/Modal'

function ProductsAdminPage({
    handleClose,
    handleAdd,
    addModal,
    editModal,
    productEdit,
    setAddModal,
    handleEdit,
    handleDelete,
    handleEditConfirm
}) {
  return (
    <>
        {addModal &&
            <Modal onClose={handleClose}>
                <ProductsForm
                handleSubmit={handleAdd}
                inputValues={{}}
                />
            </Modal>
        }
        {editModal &&
            <Modal onClose={handleClose} >
                <ProductsForm
                    title='Редактирование товара'
                    btnText='Сохранить'
                    handleSubmit={(prod) => handleEditConfirm(prod)}
                    inputValues = {{...productEdit, image: productEdit.image.split(' ')}}
                />
            </Modal>
        }
        <ProductList
            handleEdit={handleEdit}
            handleDelete={handleDelete}
        >
            <Button onClick={() => setAddModal(true)}>Добавить товар</Button>
        </ProductList>
    </>
  )
}

export default ProductsAdminPage

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