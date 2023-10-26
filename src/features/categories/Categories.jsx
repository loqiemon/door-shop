import React, {useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import useSearch from '../../hooks/useSearch'
import Loader from '../../components/Loader';
import { fetchCategories } from '../../app/actionCreators';


function Categories() {
  const { categories, isLoading, getCategoriesError } = useSelector(state => state.categories)
  const [searchText, setSearchText] = useState('');
  const { searchedArray } = useSearch(categories, searchText, 'type')

  const dispatch = useDispatch();

  useEffect(() => {
    if (categories.length === 0) {
        dispatch(fetchCategories())
    }
  }, [])

  return (
    <Container>
        <CategoriesHeader>
            <CategoriesTitle>Каталог</CategoriesTitle>
            <CategoriesInput 
                placeholder='Поиск...'
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
            />
        </CategoriesHeader>
        {isLoading && <Loader/>}
        {!isLoading && 
            <CategoriesContainer>
                {searchedArray.length === 0 ? 
                    <CategoriesSearchTitle>Таких категорий нет</CategoriesSearchTitle>: 
                    <>
                        {searchedArray.map(category => 
                            <CategoriesItem
                                to={`/catalog/${category.id}/1`}
                                key={category.type}
                                className='categories_item'
                            >
                                {category.image && <CategoriesImage src={category.image} />}
                                <CategoriesText>{category.type}</CategoriesText>
                            </CategoriesItem>
                        )}
                    </>
                }
            </CategoriesContainer>
        }
    </Container>
  )
}

export default Categories


const CategoriesContainer = styled.div`
    /* margin-top: 20px; */
    width: 100%;
    height: 100%;
    display: flex;
    flex-wrap: wrap;
    max-width: 1280px;
    margin: 0 auto;
    /* padding-top: 20px; */
    
    margin-bottom: 80px;
    @media (max-width: 1200px) {
        padding: 15px;
        padding-bottom: 40px;
        justify-content: space-between;
    }
    overflow-y: scroll;
`

const Container = styled.div`
    width: 100%;
    /* height: 100%;    */
    padding: 20px 0 60px 0;
    /* @media (max-width: 767px) {
        height: 2000px;
    } */
`

const CategoriesItem = styled(Link)`
    background-color: #fff;
    padding: 30px 5px;
    display: flex;
    align-items: center;
    transition: all .3s ease-in;
    font-size: 20px;
    width: 20%;
    min-width: 230px;
    max-height: 150px;
    border: solid 1px #9c9898;
    gap: 10px;
    color: #000;

    &:hover {
        cursor: pointer;
        /* background-color: #0064fa; */
        /* background-color: #56195d; */
        background-color: #FFD700;
        color: #000;
        /* transform: scale(1.07); */
    }

    @media (max-width: 1200px) {
        width: 33%;
    }
    @media (max-width: 767px) {
        width: 50%;
    }
    @media (max-width: 576px) {
        width: 100%;
    }
`

const CategoriesImage = styled.img`
    width: 50px;
    height: 50px;
`

const CategoriesText = styled.div`
    display: flex;
    align-items: flex-start;
    justify-content: start;
    text-align: left;
    flex-wrap: wrap; 
`

const CategoriesHeader = styled.div`
    width: 100%;
    max-width: 1280px;
    margin: 0 auto;
    margin-top: 20px;
    margin-bottom: 20px;
    display: flex;
    justify-content: space-between;
`

const CategoriesTitle = styled.h2`
    font-size: 25px;
    font-weight: 700;
    color: #000;
`

const CategoriesInput = styled.input`
    padding: 10px;
    background-color: #fff;
    border-radius: 5px;
    box-shadow: rgba(0, 0, 0, 0.35) 5px 5px 5px 5px;
`

const CategoriesSearchTitle = styled.h2`
    font-size: 25px;
    font-weight: 700;
    margin: 0 auto;
`

