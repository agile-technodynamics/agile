import axios from 'axios'
import { 
    ALL_HOME_REQUEST,
    ALL_HOME_SUCCESS,
    ALL_HOME_FAIL,
    HOME_DETAILS_REQUEST,
    HOME_DETAILS_SUCCESS,
    HOME_DETAILS_FAIL,
    UPDATE_HOME_REQUEST,
    UPDATE_HOME_SUCCESS,
    UPDATE_HOME_FAIL,
    ALL_SERVICES_REQUEST,
    ALL_SERVICES_SUCCESS,
    ALL_SERVICES_FAIL,
    SERVICES_DETAILS_REQUEST,
    SERVICES_DETAILS_SUCCESS,
    SERVICES_DETAILS_FAIL,
    UPDATE_SERVICES_REQUEST,
    UPDATE_SERVICES_SUCCESS,
    UPDATE_SERVICES_FAIL,
    ABOUT_DETAILS_REQUEST,
    ABOUT_DETAILS_SUCCESS,
    ABOUT_DETAILS_FAIL,
    UPDATE_ABOUT_REQUEST,
    UPDATE_ABOUT_SUCCESS,
    UPDATE_ABOUT_FAIL,
    ALL_ABOUT_DETAILS_REQUEST,
    ALL_ABOUT_DETAILS_SUCCESS,
    ALL_ABOUT_DETAILS_FAIL,
    FOOTER_DETAILS_REQUEST,
    FOOTER_DETAILS_SUCCESS,
    FOOTER_DETAILS_FAIL,
    UPDATE_FOOTER_REQUEST,
    UPDATE_FOOTER_SUCCESS,
    UPDATE_FOOTER_FAIL,
    CLEAR_ERRORS
} from '../constants/websiteConstants'

// Get home details
export const getHomes = () => async(dispatch) => {
    try{
        dispatch({
            type: ALL_HOME_REQUEST
        })

        const { data } = await axios.get('/api/v1/homes')

        dispatch({
            type: ALL_HOME_SUCCESS,
            payload: data
        })

    }
    catch(error){
        dispatch(
            {
                type: ALL_HOME_FAIL,
                payload: error.response.data.message
            }
        )
    }
}

//Get single home details
export const getHomeDetails = (id) => async(dispatch) => {
    try{
        dispatch({
            type: HOME_DETAILS_REQUEST
        })

        const { data } = await axios.get(`/api/v1/home/${id}`)

        dispatch({
            type: HOME_DETAILS_SUCCESS,
            payload: data.home
        })
    }
    catch(error){
        dispatch({
            type: HOME_DETAILS_FAIL,
            payload: error.response.data.message
            }
        )
    }
}

// Update home (ADMIN)
export const updateHome = (id, homeData) => async(dispatch) => {
    try{
        dispatch({
            type: UPDATE_HOME_REQUEST
        })

        const config = {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }
        const { data } = await axios.put(`/api/v1/admin/home/${id}`, homeData, config)

        dispatch({
            type: UPDATE_HOME_SUCCESS,
            payload: data.success
        })
    }
    catch(error){
        dispatch({
            type: UPDATE_HOME_FAIL,
            payload: error.response.data.message
            }
        )
    }
}

// Get about us details
export const getAboutDetails = () => async(dispatch) => {
    try{
        dispatch({
            type: ALL_ABOUT_DETAILS_REQUEST
        })

        const { data } = await axios.get('/api/v1/abouts')

        dispatch({
            type: ALL_ABOUT_DETAILS_SUCCESS,
            payload: data
        })

    }
    catch(error){
        dispatch(
            {
                type: ALL_ABOUT_DETAILS_FAIL,
                payload: error.response.data.message
            }
        )
    }
}

//Get single about us detail
export const getSingleAbout = (id) => async(dispatch) => {
    try{
        dispatch({
            type: ABOUT_DETAILS_REQUEST
        })

        const { data } = await axios.get(`/api/v1/about/${id}`)

        dispatch({
            type: ABOUT_DETAILS_SUCCESS,
            payload: data.about
        })
    }
    catch(error){
        dispatch({
            type: ABOUT_DETAILS_FAIL,
            payload: error.response.data.message
            }
        )
    }
}

// Update about (ADMIN)
export const updateAbout = (id, aboutData) => async(dispatch) => {
    try{
        dispatch({
            type: UPDATE_ABOUT_REQUEST
        })

        const config = {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }
        const { data } = await axios.put(`/api/v1/admin/about/${id}`, aboutData, config)

        dispatch({
            type: UPDATE_ABOUT_SUCCESS,
            payload: data.success
        })
    }
    catch(error){
        dispatch({
            type: UPDATE_ABOUT_FAIL,
            payload: error.response.data.message
            }
        )
    }
}

// Get services details
export const getServices = () => async(dispatch) => {
    try{
        dispatch({
            type: ALL_SERVICES_REQUEST
        })

        const { data } = await axios.get('/api/v1/services')

        dispatch({
            type: ALL_SERVICES_SUCCESS,
            payload: data
        })

    }
    catch(error){
        dispatch(
            {
                type: ALL_SERVICES_FAIL,
                payload: error.response.data.message
            }
        )
    }
}

//Get single service details
export const getServiceDetails = (id) => async(dispatch) => {
    try{
        dispatch({
            type: SERVICES_DETAILS_REQUEST
        })

        const { data } = await axios.get(`/api/v1/service/${id}`)

        dispatch({
            type: SERVICES_DETAILS_SUCCESS,
            payload: data.service
        })
    }
    catch(error){
        dispatch({
            type: SERVICES_DETAILS_FAIL,
            payload: error.response.data.message
            }
        )
    }
}

// Update services (ADMIN)
export const updateServices = (id, serviceData) => async(dispatch) => {
    try{
        dispatch({
            type: UPDATE_SERVICES_REQUEST
        })

        const config = {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }
        const { data } = await axios.put(`/api/v1/admin/service/${id}`, serviceData, config)

        dispatch({
            type: UPDATE_SERVICES_SUCCESS,
            payload: data.success
        })
    }
    catch(error){
        dispatch({
            type: UPDATE_SERVICES_FAIL,
            payload: error.response.data.message
            }
        )
    }
}

// Get footer details
export const getFooterDetails = () => async(dispatch) => {
    try{
        dispatch({
            type: FOOTER_DETAILS_REQUEST
        })

        const { data } = await axios.get('/api/v1/footerinfo')

        dispatch({
            type: FOOTER_DETAILS_SUCCESS,
            payload: data.footerInfo
        })

    }
    catch(error){
        dispatch(
            {
                type: FOOTER_DETAILS_FAIL,
                payload: error.response.data.message
            }
        )
    }
}

// Update footer (ADMIN)
export const updateFooter = (footerData) => async(dispatch) => {
    try{
        dispatch({
            type: UPDATE_FOOTER_REQUEST
        })

        const config = {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }
        const { data } = await axios.put(`/api/v1/admin/updatefooterinfo`, footerData, config)

        dispatch({
            type: UPDATE_FOOTER_SUCCESS,
            payload: data.success
        })
    }
    catch(error){
        dispatch({
            type: UPDATE_FOOTER_FAIL,
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