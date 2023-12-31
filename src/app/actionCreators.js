import axios from "axios";
import { cartSlice } from '../features/cart/cartSlice';
import { categoriesSlice } from '../features/categories/categoriesSlice';
import { API_URL } from "../services/constants";
import { authSlice } from "../features/auth/authSlice";
import AuthService from '../services/AuthService'
import { modalSlice } from "../features/modal/modalSlice";
import { productsSlice } from "../features/products/productsSlice";
import { filtersSlice } from "../features/filters/filtersSlice";
// import { addOrder, addOrderError, addOrderSuccess } from '../features/order/orderSlice'
import $api from "../services/axiosConfig";



//КАТЕГОРИИ
export const fetchCategories = () => async (dispatch) => {
    try {
        dispatch(categoriesSlice.actions.categoriesFetching())
        const response = await axios.get(API_URL + "AccessoryTypes");
        dispatch(categoriesSlice.actions.categoriesFetchingSuccess(response.data))
    } catch (e) {
        if (e) {
            dispatch(categoriesSlice.actions.categoriesFetchingError(e.message))
        }
    }
}

export const addCategory = (category) => async (dispatch) => {
    try {
        const response = await $api.post(API_URL + "AccessoryTypes", category);
        dispatch(categoriesSlice.actions.addCategorySuccess(response.data))
    } catch (e) {
        if (e) {
            dispatch(categoriesSlice.actions.addCategoryError(e.message))
        }
    }
}

export const deleteCategory = (id) => async (dispatch) => {
    try {
        await $api.delete(API_URL + `AccessoryTypes/${id}`);
        dispatch(categoriesSlice.actions.deleteCategorySuccess(id))
    } catch (e) {
        if (e) {
            dispatch(categoriesSlice.actions.deleteCategoryError(e.message))
        }
    }
}

export const editCategory = (category) => async (dispatch) => {
    try {
        await $api.put(API_URL + `AccessoryTypes/${category.id}`, { ...category });
        dispatch(categoriesSlice.actions.editCategorySuccess(category))
    } catch (e) {
        if (e) {
            dispatch(categoriesSlice.actions.editCategoryError(e.message))
        }
    }
}
//КАТЕГОРИИ



//АВТОРИЗАЦИЯ
export const loginFunc = (login, password) => async (dispatch) => {
    try {
        dispatch(authSlice.actions.login());
        const response = await axios.post(API_URL + "Auth/login", { email: login, password });
        // const response = await AuthService.login(login, password);
        localStorage.setItem('accessToken', response.data.accessToken);
        localStorage.setItem('refreshToken', response.data.refreshToken);
        localStorage.setItem('user', JSON.stringify({ email: response.data.email, role: response.data.role }));
        dispatch(authSlice.actions.loginSuccess(response.data));
        dispatch(modalSlice.actions.close())
    } catch (e) {
        if (e) {
            dispatch(authSlice.actions.loginError(e.message))
        }
    }
}

export const registerFunc = (user) => async (dispatch) => {
    try {
        // dispatch(authSlice.actions.login());
        // const response = await AuthService.register(login, password);
        const response = await axios.post(
            API_URL + "Auth/",
            { ...user },
            { headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` } }
        );
        console.log(e)
        // localStorage.setItem('accessToken', response.data.accessToken);
        // localStorage.setItem('refreshToken', response.data.refreshToken);
        // dispatch(authSlice.actions.loginSuccess(response.data.user));
    } catch (e) {
        if (e) {
            console.log(e)
            // dispatch(authSlice.actions.loginError(e.message))
        }
    }
}

export const logoutFunc = () => async (dispatch) => {
    try {
        // const response = await AuthService.logout();
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('user')
        dispatch(authSlice.actions.logout())
    } catch (e) {
        if (e) {
            dispatch(authSlice.actions.loginError(e.message))
        }
    }
}

export const checkAuth = () => async (dispatch) => {
    try {
        const response = await axios.post(`${API_URL}Auth/refreshtoken`, {
            refreshToken: localStorage.getItem('refreshToken'),
            accessToken: localStorage.getItem('accessToken')
        })
        localStorage.setItem('accessToken', response.data.accessToken);
        localStorage.setItem('refreshToken', response.data.refreshToken);
        localStorage.setItem('user', JSON.stringify({ email: response.data.email, role: response.data.role }));
        dispatch(authSlice.actions.checkAuth({ isAuth: true, user: response.data }))
    } catch (e) {
        if (e) {
            dispatch(authSlice.actions.checkAuth({ isAuth: false, user: {} }))
        }
    }
}
//АВТОРИЗАЦИЯ


//Товары
export const fetchProducts = ({
    categoryId,
    pageNumber,
    PageSize,
    minPrice,
    maxPrice,
    searchByName,
    searchByVendorCode,
    country,
    manufacturer
}) => async (dispatch) => {
    try {
        dispatch(productsSlice.actions.productsFetching())
        const requestParams = new URLSearchParams()
        categoryId && requestParams.append("typeId", categoryId);
        pageNumber && requestParams.append("PageNumber", pageNumber);
        PageSize && requestParams.append("PageSize", PageSize);
        minPrice && requestParams.append("minRetailPrice", parseFloat(minPrice));
        maxPrice && requestParams.append("maxRetailPrice", parseFloat(maxPrice));
        searchByName && requestParams.append("searchByName", searchByName);
        searchByVendorCode && requestParams.append("searchByVendorCode", searchByVendorCode);
        country && requestParams.append("country", country);
        manufacturer && requestParams.append("manufacturer", manufacturer);
        const apiUrl = `${API_URL}Accessories?${requestParams}`;
        const response = await axios.get(apiUrl);
        dispatch(productsSlice.actions.productsFetchingSuccess(response.data));

    } catch (e) {
        if (e) {
            dispatch(productsSlice.actions.productsFetchingError(e.message))
        }
    }
}

export const fetchProduct = async (productId) => {
    try {
        const apiUrl = `${API_URL}Accessories/${productId}`;
        const response = await axios.get(apiUrl);
        return response.data
    } catch (e) {
        if (e) {
            return (e.message)
        }
    }
}


export const addProduct = (product) => async (dispatch) => {
    try {
        const { id, ...product1 } = product;
        dispatch(productsSlice.actions.addProduct());
        const response = await $api.post(API_URL + "Accessories", { ...product1, image: product1.image.join(' ') });

        dispatch(productsSlice.actions.addProductSuccess(response.data))

        setTimeout(() => {
            dispatch(productsSlice.actions.deleteAlert())
        }, 5000)
    } catch (e) {
        if (e) {
            dispatch(productsSlice.actions.addProductError(e.message))
            setTimeout(() => {
                dispatch(productsSlice.actions.deleteAlert())
            }, 5000)
        }
    }
}

export const deleteProduct = (id) => async (dispatch) => {
    try {
        await $api.delete(API_URL + `Accessories/${id}`);
        dispatch(productsSlice.actions.deleteProductSuccess(id))
        setTimeout(() => {
            dispatch(productsSlice.actions.deleteAlert())
        }, 5000)
    } catch (e) {
        if (e) {
            dispatch(productsSlice.actions.deleteProductError(e.message))
            setTimeout(() => {
                dispatch(productsSlice.actions.deleteAlert())
            }, 5000)
        }
    }
}

export const editProduct = (product) => async (dispatch) => {
    try {
        const response = await $api.put(API_URL + `Accessories/${product.id}`, { ...product, image: product.image.join(' ') });
        dispatch(productsSlice.actions.editProductSuccess({ ...product, image: product.image.join(' ') }))
        setTimeout(() => {
            dispatch(productsSlice.actions.deleteAlert())
        }, 5000)
    } catch (e) {
        if (e) {
            dispatch(productsSlice.actions.editProductError(e.message))
            setTimeout(() => {
                dispatch(productsSlice.actions.deleteAlert())
            }, 5000)
        }
    }
}

//Товары

//Фильтры
export const fetchFilters = (accessoryTypeId) => async (dispatch) => {
    try {
        dispatch(filtersSlice.actions.fetchFilters());
        const url = `${API_URL}Accessories/unique-countries-and-manufacturers?accessoryTypeId=${accessoryTypeId}`;
        const response = await axios.get(url);
        dispatch(filtersSlice.actions.fetchFiltersSuccess(response.data));
    } catch (error) {
        dispatch(filtersSlice.actions.fetchFiltersError(error.message));
    }
}



// export const fetchFilters = (accessoryTypeId) => async (dispatch) => {
//     try {
//         console.log(accessoryTypeId, 'accessoryTypeId')
//         dispatch(filtersSlice.actions.fetchFilters())
//         const response = await axios.get(`${API_URL}Accessories/unique-countries-and-manufacturers?accessoryTypeId=${accessoryTypeId}`);
//         dispatch(filtersSlice.actions.fetchFiltersSuccess(response.data))
//     } catch (e) {
//         dispatch(filtersSlice.actions.fetchFiltersError(e.message))
//     }
// }

//Фильтры


//Заказы

// export const addOrderRequest = (order) => async (dispatch) => {
//     try {
//         dispatch(addOrder());
//         const response = await axios.post(`${API_URL}Orders`, order)
//         dispatch(addOrderSuccess(response.data))
//     } catch (e) {
//         dispatch(addOrderError(e.message))
//     }
// }

// export const editOrderRequest = (order) => async (dispatch) => {
//     try {
//         dispatch(addOrder());
//         const response = await axios.put(`${API_URL}Orders`, order)
//         dispatch(addOrderSuccess(response.data))
//     } catch (e) {
//         dispatch(addOrderError(e.message))
//     }
// }


// export const deleteOrderRequest = (id) => async (dispatch) => {
//     try {
//         dispatch(addOrder());
//         await axios.post(`${API_URL}Orders`, id)
//         dispatch(addOrderSuccess(id))
//     } catch (e) {
//         dispatch(addOrderError(e.message))
//     }
// }


// export const fetchOrderRequest = (order) => async (dispatch) => {
//     try {
//         dispatch(addOrder());
//         const response = await axios.post(`${API_URL}Orders`, order)
//         dispatch(addOrderSuccess(response.data))
//     } catch (e) {
//         dispatch(addOrderError(e.message))
//     }
// }

// export const fetchOrdersRequest = (order) => async (dispatch) => {
//     try {
//         dispatch(addOrder());
//         const response = await axios.post(`${API_URL}Orders`, order)
//         dispatch(addOrderSuccess(response.data))
//     } catch (e) {
//         dispatch(addOrderError(e.message))
//     }
// }


//Заказы