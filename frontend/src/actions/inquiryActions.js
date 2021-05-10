import axios from 'axios'
import {
    INQUIRY_REQUEST,
    INQUIRY_SUCCESS,
    INQUIRY_FAIL,
    LIST_INQUIRY_REQUEST,
    LIST_INQUIRY_SUCCESS,
    LIST_INQUIRY_FAIL,
    UPDATE_INQUIRY_REQUEST,
    UPDATE_INQUIRY_SUCCESS,
    UPDATE_INQUIRY_FAIL,
    DELETE_INQUIRY_REQUEST,
    DELETE_INQUIRY_SUCCESS,
    DELETE_INQUIRY_FAIL,
    INQUIRY_DETAILS_REQUEST,
    INQUIRY_DETAILS_SUCCESS,
    INQUIRY_DETAILS_FAIL,
    CLEAR_ERRORS
} from '../constants/inquiryConstants'

//create new inquiry
export const createInquiry = ( inquiry ) => async (dispatch, getState) => {
    try {
        dispatch({
            type: INQUIRY_REQUEST
        })

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const { data } = await axios.post('/api/v1/inquiry/new', inquiry, config)

        dispatch({
            type: INQUIRY_SUCCESS,
            payload: data
        })
    }
    catch (error) {
        dispatch({
            type: INQUIRY_FAIL,
            payload: error.response.data.message
        })
    }
}

//Get all inquiries (ADMIN)
export const listInquiry = () => async (dispatch) => {
    try{
        dispatch({
            type: LIST_INQUIRY_REQUEST
        })

        const { data } = await axios.get('/api/v1/admin/inquiries')

        dispatch({
            type: LIST_INQUIRY_SUCCESS,
            payload: data
        })
    }
    catch(error){
        dispatch({
            type: LIST_INQUIRY_FAIL,
            payload: error.response.data.message
        })
    }
}

//Get inquiry details (ADMIN)
export const getInquiryDetails = (id) => async (dispatch) => {
    try{
        dispatch({
            type: INQUIRY_DETAILS_REQUEST
        })

        const { data } = await axios.get(`/api/v1/admin/inquiry/${id}`)

        dispatch({
            type: INQUIRY_DETAILS_SUCCESS,
            payload: data.inquiry
        })
    }
    catch(error){
        dispatch({
            type: INQUIRY_DETAILS_FAIL,
            payload: error.response.data.message
        })
    }
}

//update inquiry
export const updateInquiry = ( id, inquiryData ) => async (dispatch, getState) => {
    try {
        dispatch({
            type: UPDATE_INQUIRY_REQUEST
        })

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const { data } = await axios.put(`/api/v1/admin/inquiry/${id}`, inquiryData, config)

        dispatch({
            type: UPDATE_INQUIRY_SUCCESS,
            payload: data.success
        })
    }
    catch (error) {
        dispatch({
            type: UPDATE_INQUIRY_FAIL,
            payload: error.response.data.message
        })
    }
}

// Delete inquiry (ADMIN)
export const deleteInquiry = (id) => async(dispatch) => {
    try{
        dispatch({
            type: DELETE_INQUIRY_REQUEST
        })

        const { data } = await axios.delete(`/api/v1/admin/inquiry/${id}`)

        dispatch({
            type: DELETE_INQUIRY_SUCCESS,
            payload: data.success
        })
    }
    catch(error){
        dispatch({
            type: DELETE_INQUIRY_FAIL,
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