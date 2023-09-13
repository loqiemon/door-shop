import React, {
    useEffect,
    useState
} from 'react';
import styled from 'styled-components';


import useInput from '../hooks/useInput';


const AsideList = styled.aside`
  width: 20%;
  min-width: 200px;
  padding: 10px;
  display: flex;
  flex-direction: column;
  gap:15px;
`

const AsideItem = styled.div`
    width: 100%;
    padding: 10px;
    display: flex;
    flex-direction: column;
    border-radius: 15px;
    background-color: #fff;
    gap: 8px;
`

const Search =styled.input`
  width: 100%;
  padding: 5px;
  
`

const Category =styled.span`
  width: 100%;
  font-size: 18px;
  cursor: pointer;
  transition: all .3s ease-in;

  &:hover {
    background-color: #f7f7f7;
    transform: scale(1.1);
    font-weight: 700;
    color: #5065f6;
  }

  &.active {
    background-color: #f7f7f7;
    font-weight: 700;
    color: #5065f6;
  }
`

const AsideButton = styled.button`
    width: 100%;
    padding: 10px;
    background-color: #fff;
    border-radius: 15px;
    font-weight: 500;
    font-size: 20px;
    transition: all .3s ease-in;
    &:hover {
        background-color: #5065f6;
        font-weight: 700;
        color: #fff;
    }

`

const categories = [
    {name: 'Не очень двери', id: 1},
    {name: 'Двери', id: 2},
    {name: 'Крутые двери', id: 3},
    {name: 'Деревянные двери', id: 4},
    {name: 'Каменные двери', id: 5},
    {name: 'Железные двери', id: 6},
    {name: 'Армор двери', id: 7}
  ]

function Aside() {
  const search = useInput();
  const [selectedCategory, setSelectedCategory] = useState(1);

  const handleClick = () => {
    console.log('clicked');
  }

  return (
    <AsideList>
        <AsideItem>
            <Search 
                placeholder='Поиск'
                {...search}
            />
        </AsideItem>
        <AsideItem>
            {categories.map(category => 
                <Category
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={category.id == selectedCategory ? 'active' : ''}
                >
                    {category.name}  
                </Category>
            )}
        </AsideItem>
        <AsideButton
            onClick={handleClick}
        >
            Применить
        </AsideButton>
    </AsideList>
  )
}

export default Aside
