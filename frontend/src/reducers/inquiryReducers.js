import {
    INQUIRY_REQUEST,
    INQUIRY_SUCCESS,
    INQUIRY_FAIL,
    INQUIRY_RESET,
    LIST_INQUIRY_REQUEST,
    LIST_INQUIRY_SUCCESS,
    LIST_INQUIRY_FAIL,
    INQUIRY_DETAILS_REQUEST,
    INQUIRY_DETAILS_SUCCESS,
    INQUIRY_DETAILS_FAIL,
    UPDATE_INQUIRY_REQUEST,
    UPDATE_INQUIRY_SUCCESS,
    UPDATE_INQUIRY_RESET,
    UPDATE_INQUIRY_FAIL,
    DELETE_INQUIRY_REQUEST,
    DELETE_INQUIRY_SUCCESS,
    DELETE_INQUIRY_FAIL,
    DELETE_INQUIRY_RESET,
    CLEAR_ERRORS
} from '../constants/inquiryConstants'

//create new inquiry
export const newInquiryReducer = (state = {}, action) => {
    switch(action.type){
        
        case INQUIRY_REQUEST:
            return {
                loading: true
            }

        case INQUIRY_SUCCESS:
            return {
                ...state,
                loading: false,
                success: action.payload
            }

        case INQUIRY_FAIL:
            return {
                ...state,
                loading: false,
                error: true,
                success: false
            }

        case INQUIRY_RESET:
            return {
                ...state,
                success: false
            }

        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }
        
        default:
            return state
    }
}

//get single inquiry details
export const inquiryDetailsReducer = (state = { inquiry: {} }, action) => {
    switch(action.type) {

        case INQUIRY_DETAILS_REQUEST:
            return {
                ...state,
                loading: true
            }

        case INQUIRY_DETAILS_SUCCESS:
            return {
                loading: false,
                inquiry: action.payload
            }

        case INQUIRY_DETAILS_FAIL:
            return {
                ...state,
                error: action.payload
            }
        
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }
            
        default:
            return state
    }
}

//list inquiry
export const listInquiryReducer = (state = { inquiries: [] }, action) => {
    switch (action.type) {

        case LIST_INQUIRY_REQUEST:
            return {
                loading: true,
            }

        case LIST_INQUIRY_SUCCESS:
            return{
                loading: false,
                inquiries: action.payload.inquiries,
                inquiryCount: action.payload.inquiryCount,
                appointmentCount: action.payload.appointmentCount,
                otherCount: action.payload.otherCount
            }

        case LIST_INQUIRY_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
                //error: undefined
            }
        
        default:
            return state
    }
}

// UPDATE INQUIRY 
export const inquiryReducer = (state = {}, action) => {
    switch(action.type){

        case DELETE_INQUIRY_REQUEST:
        case UPDATE_INQUIRY_REQUEST:
            return {
                ...state,
                loading: true
            }

        case DELETE_INQUIRY_SUCCESS:
            return {
                ...state,
                loading: false,
                isDeleted: action.payload
            }

        case UPDATE_INQUIRY_SUCCESS:
            return {
                ...state,
                loading: false,
                isUpdated: action.payload
            }

        case DELETE_INQUIRY_FAIL:    
        case UPDATE_INQUIRY_FAIL:
            return {
                ...state,
                error: action.payload
            }

        case DELETE_INQUIRY_RESET:
            return {
                ...state,
                isDeleted: false
            }

        case UPDATE_INQUIRY_RESET:
            return {
                ...state,
                isUpdated: false
            }
            
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }
            
        default:
            return state
    }
}