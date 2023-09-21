import React, {useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import door from '../../../public/images/doors/door.double.hinged.metal.png';
import useSearch from '../../hooks/useSearch'
import Loader from '../../components/Loader';
import { fetchCategories } from '../../app/actionCreators';


const CategoriesContainer = styled.div`
    width: 100%;
    /* height: 100%; */
    display: flex;
    flex-wrap: wrap;
    max-width: 1280px;
    margin: 0 auto;
    padding-top: 20px;

`

const CategoriesItem = styled(Link)`
    background-color: #fff;
    padding: 30px 0;
    display: flex;
    align-items: center;
    justify-content: fle;
    transition: all .3s ease-in;
    font-size: 20px;
    width: 20%;
    max-height: 150px;
    border: solid 1px #9c9898;
    gap: 10px;
    color: #000;

    &:hover {
        cursor: pointer;
        background-color: #0064fa;
        color: #fff;
        transform: scale(1.07);
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
    display: flex;
    justify-content: space-between;
`

const CategoriesTitle = styled.h2`
    font-size: 25px;
    font-weight: 700;
`

const CategoriesInput = styled.input`
    padding: 10px;
    background-color: #fff;
    border-radius: 5px;
`

const CategoriesSearchTitle = styled.h2`
    font-size: 25px;
    font-weight: 700;
    margin: 0 auto;
`


function Categories() {
  const { categories, isLoading, getCategoriesError } = useSelector(state => state.categories)
  const [searchText, setSearchText] = useState('');
  const { searchedArray } = useSearch(categories, searchText, 'Type')

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCategories())
  }, [])

  return (
    <>
        <CategoriesHeader>
            <CategoriesTitle>Каталог</CategoriesTitle>
            <CategoriesInput 
                placeholder='Поиск...'
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
            />
        </CategoriesHeader>
        {isLoading && <Loader/>}
        <CategoriesContainer>
            {searchedArray.length === 0 ? 
                <CategoriesSearchTitle>Таких категорий нет</CategoriesSearchTitle>: 
                <>
                    {searchedArray.map(category => 
                        <CategoriesItem to={`/catalog/${category.link}`} key={category.Type}>
                            <CategoriesImage src={door} />
                            <CategoriesText>{category.Type}</CategoriesText>
                        </CategoriesItem>
                    )}
                </>
            }
        </CategoriesContainer>
    </>
  )
}

export default Categories
