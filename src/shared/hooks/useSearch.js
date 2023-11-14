import { useState, useEffect } from 'react';

export function useSearch(array, searchText, prop) {
    const [searchedArray, setSearchedArray] = useState([]);

    useEffect(() => {
        if (searchText.length !== 0) {
            setSearchedArray(array.filter(item => item[prop].toLowerCase().includes(searchText.toLowerCase())))
        } else {
            setSearchedArray(array)
        }
    }, [searchText, array, prop]);

    return {
        searchedArray
    }
} 