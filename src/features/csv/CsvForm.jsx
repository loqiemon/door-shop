import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';

import { fetchCategories } from '../../app/actionCreators';
import { usePostCsvMutation } from './csvApi';
import Loader from '../../components/Loader';
import CustomInput from '../../shared/ui/Input/CustomInput';
import CustomSelect from '../../shared/ui/Select/CustomSelect';
import Button from '../../shared/ui/Button/Button';

function CsvForm() {
  const [csv, setCsv] = useState();
  const [accessoryTypeId, setAccessoryTypeId] = useState();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCategories());
  }, [])


  const categories = useSelector(state => state.categories.categories);
  const [postCsv, { isLoading, error }] = usePostCsvMutation();


  const handleSubmit = (e) => {
    e.preventDefault();
    if (accessoryTypeId && csv) {
      postCsv({
        file: csv,
        accessoryTypeId
      }).then((response) => {
        console.log(response)
        alert(response.error.data);
      }).catch((error) => {
        alert("Ошибка");
      })
    }
  }

  const handleChange = (e) => {
    setAccessoryTypeId(e.target.value);
  }

  return (
    <Container>
      {isLoading && <LoaderDiv><Loader /></LoaderDiv>}
      {!isLoading && (
        <>
          <CustomInput
            placeholder='CSV'
            type='file'
            name="file"
            accept=".csv"
            onChange={(e) => setCsv(e.target.files[0])}
          />
          <CustomSelect
            label="Тип товара"
            value={accessoryTypeId || ''}
            onChange={handleChange}
            options={categories.map((category) => ({
              value: category.id,
              text: category.type
            }))}
          />
          <Button
            onClick={handleSubmit}
            text={'Загрузить'}
          />
        </>
      )}
    </Container>
  )
}

export default CsvForm

const Container = styled.div`
  width: 100%;
  padding: 20px 0;
  height: 50vh;
  display: flex;
  @media (max-width: 767px) {
    flex-direction: column;
    gap: 10px;
  }
`

const LoaderDiv = styled.div`
  position: absolute;
  top: 45%;
  left: 50%;
`

