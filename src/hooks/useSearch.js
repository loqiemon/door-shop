import { useState, useEffect } from 'react';

export default function useSearch(array, searchText) {
    const [searchedArray, setSearchedArray] = useState([]);

    useEffect(() => {
        if (searchText.length !== 0) {
            setSearchedArray(array.filter(item => item.name.toLowerCase().includes(searchText.toLowerCase())))
        }else {
            setSearchedArray(array)
        }
    }, [searchText, array]); 

    return {
        searchedArray
    }
} 