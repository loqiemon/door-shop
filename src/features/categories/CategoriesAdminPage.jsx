import React from 'react'
import styled from 'styled-components'

import Modal from '../modal/Modal'
import CategoryForm from './CategoryForm'
import CategoryList from './CategoryList'

function CategoriesAdminPage({
    addModal,
    handleClose,
    setAddModal
}) {
  return (
    <>
        {addModal && <Modal onClose={handleClose}><CategoryForm/></Modal>}
        <CategoryList>
            <Button onClick={() => setAddModal(true)}>Добавить категорию</Button>
        </CategoryList>
    </>
  )
}

export default CategoriesAdminPage

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