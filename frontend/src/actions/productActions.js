import axios from 'axios'
import { 
    ALL_PRODUCTS_REQUEST,
    ALL_PRODUCTS_SUCCESS,
    ALL_PRODUCTS_FAIL,
    ADMIN_PRODUCTS_REQUEST,
    ADMIN_PRODUCTS_SUCCESS,
    ADMIN_PRODUCTS_FAIL,
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_FAIL,
    NEW_PRODUCT_REQUEST,
    NEW_PRODUCT_SUCCESS,
    NEW_PRODUCT_FAIL,
    DELETE_PRODUCT_REQUEST,
    DELETE_PRODUCT_SUCCESS,
    DELETE_PRODUCT_FAIL,
    UPDATE_PRODUCT_REQUEST,
    UPDATE_PRODUCT_SUCCESS,
    UPDATE_PRODUCT_FAIL,
    CLEAR_ERRORS
} from '../constants/productConstants'

//get all products
export const getProducts = (currentPage, category, subcategory) => async(dispatch) => {
    try{
        dispatch({
            type: ALL_PRODUCTS_REQUEST
        })

        let link = `/api/v1/products?page=${currentPage}`
        
        if(category && subcategory) {
            link = `/api/v1/products?page=${currentPage}&category=${category}&subcategory=${subcategory}`
        } else if (category) {
            link = `/api/v1/products?page=${currentPage}&category=${category}`
        } else {
            link = `/api/v1/products?page=${currentPage}`
        }
        
        const { data } = await axios.get(link)

        dispatch({
            type: ALL_PRODUCTS_SUCCESS,
            payload: data
        })
    }
    catch(error){
        dispatch({
            type: ALL_PRODUCTS_FAIL,
            payload: error.response.data.message
            }
        )
    }
}

//Get single product details
export const getProductDetails = (id) => async(dispatch) => {
    try{
        dispatch({
            type: PRODUCT_DETAILS_REQUEST
        })

        const { data } = await axios.get(`/api/v1/product/${id}`)

        dispatch({
            type: PRODUCT_DETAILS_SUCCESS,
            payload: data.product
        })
    }
    catch(error){
        dispatch({
            type: PRODUCT_DETAILS_FAIL,
            payload: error.response.data.message
            }
        )
    }
}

// Get list of products (ADMIN)
export const getAdminProducts = () => async(dispatch) => {
    try{
        dispatch({
            type: ADMIN_PRODUCTS_REQUEST
        })

        const { data } = await axios.get(`/api/v1/admin/products`)

        dispatch({
            type: ADMIN_PRODUCTS_SUCCESS,
            payload: data.products
        })
    }
    catch(error){
        dispatch({
            type: ADMIN_PRODUCTS_FAIL,
            payload: error.response.data.message
            }
        )
    }
}

// Create new product (ADMIN)
export const newProduct = (productData) => async(dispatch) => {
    try{
        dispatch({
            type: NEW_PRODUCT_REQUEST
        })

        const config = {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }
        const { data } = await axios.post(`/api/v1/admin/product/new`, productData, config)

        dispatch({
            type: NEW_PRODUCT_SUCCESS,
            payload: data
        })
    }
    catch(error){
        dispatch({
            type: NEW_PRODUCT_FAIL,
            payload: error.response.data.message
            }
        )
    }
}

// Delete product (ADMIN)
export const deleteProduct = (id) => async(dispatch) => {
    try{
        dispatch({
            type: DELETE_PRODUCT_REQUEST
        })

        const { data } = await axios.delete(`/api/v1/admin/product/${id}`)

        dispatch({
            type: DELETE_PRODUCT_SUCCESS,
            payload: data.success
        })
    }
    catch(error){
        dispatch({
            type: DELETE_PRODUCT_FAIL,
            payload: error.response.data.message
            }
        )
    }
}

// Update product (ADMIN)
export const updateProduct = (id, productData) => async(dispatch) => {
    try{
        dispatch({
            type: UPDATE_PRODUCT_REQUEST
        })

        const config = {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }
        const { data } = await axios.put(`/api/v1/admin/product/${id}`, productData, config)

        dispatch({
            type: UPDATE_PRODUCT_SUCCESS,
            payload: data.success
        })
    }
    catch(error){
        dispatch({
            type: UPDATE_PRODUCT_FAIL,
            payload: error.response.data.message
            }
        )
    }
}

//clear errors
export const clearErrors = () => async(dispatch) => {
    dispatch({
        type: CLEAR_ERRORS
    })
}