import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    ACCESS_REQUEST,
    ACCESS_SUCCESS,
    ACCESS_FAIL,
    REGISTER_USER_REQUEST,
    REGISTER_USER_SUCCESS,
    REGISTER_USER_FAIL,
    REGISTER_USER_RESET,
    LOAD_USER_REQUEST,
    LOAD_USER_SUCCESS,
    LOAD_USER_FAIL,
    LOGOUT_SUCCESS,
    LOGOUT_FAIL,
    UPDATE_PROFILE_REQUEST,
    UPDATE_PROFILE_SUCCESS,
    UPDATE_PROFILE_FAIL,
    UPDATE_PROFILE_RESET,
    UPDATE_PASSWORD_REQUEST,
    UPDATE_PASSWORD_SUCCESS,
    UPDATE_PASSWORD_RESET,
    UPDATE_PASSWORD_FAIL,
    FORGOT_PASSWORD_REQUEST,
    FORGOT_PASSWORD_SUCCESS,
    FORGOT_PASSWORD_FAIL,
    FORGOT_PASSWORD_RESET,
    NEW_PASSWORD_REQUEST,
    NEW_PASSWORD_SUCCESS,
    NEW_PASSWORD_FAIL,
    NEW_PASSWORD_RESET,
    ALL_USERS_REQUEST,
    ALL_USERS_SUCCESS,
    ALL_USERS_FAIL,
    GET_USER_REQUEST,
    GET_USER_SUCCESS,
    GET_USER_FAIL,
    UPDATE_USER_REQUEST,
    UPDATE_USER_SUCCESS,
    UPDATE_USER_FAIL,
    UPDATE_USER_RESET,
    DELETE_USER_REQUEST,
    DELETE_USER_SUCCESS,
    DELETE_USER_RESET,
    DELETE_USER_FAIL,
    CLEAR_ERRORS
} from '../constants/userConstants'

//get single user details
export const userDetailsReducer = (state = { user: {} }, action ) => {
    switch(action.type) {
        
        case GET_USER_REQUEST:
            return {
                ...state,
                loading: true
            }

        case GET_USER_SUCCESS:
            return {
                loading: false,
                user: action.payload
            }

        case GET_USER_FAIL:
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

// update and delete user
export const updateUserReducer = (state = {}, action) => {
    switch(action.type){

        case DELETE_USER_REQUEST:
        case UPDATE_USER_REQUEST:
            return {
                ...state,
                loading: true
            }

        case DELETE_USER_SUCCESS:
            return {
                ...state,
                loading: false,
                isDeleted: action.payload
            }
        
        case UPDATE_USER_SUCCESS:
            return {
                ...state,
                loading: false,
                isUpdated: action.payload
            }

        case DELETE_USER_FAIL:
        case UPDATE_USER_FAIL:
            return {
                ...state,
                error: action.payload,
                loading: false
            }

        case DELETE_USER_RESET:
            return {
                ...state,
                isDeleted: false
            }

        case UPDATE_USER_RESET:
            return {
                ...state,
                isUpdated: false,
                loading: false
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

//get list of users
export const getUsersReducer = (state = { users: []}, action) => {
    switch(action.type){
        case ALL_USERS_REQUEST:
            return {
                loading: true,
                users: []
            }

        case ALL_USERS_SUCCESS:
            return {
                loading: false,
                users: action.payload.users,
                superadminCount: action.payload.superadminCount,
                adminCount: action.payload.adminCount
            }

        case ALL_USERS_FAIL:
            return {
                loading: false,
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

//create user
export const registerReducer = ( state = { }, action ) => {
    switch(action.type){
        case REGISTER_USER_REQUEST:
            return {
                ...state,
                loading: true,
                isCreated: false
            }

        case REGISTER_USER_SUCCESS:
            return {
                loading: false,
                isCreated: true,
                success: action.payload
            }

        case REGISTER_USER_FAIL:
            return {
                ...state,
                loading: false,
                isCreated: false,
                error: action.payload
            }

        case REGISTER_USER_RESET:
            return {
                ...state,
                loading: false,
                success: false,
                isCreated: false,
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

//retrieve access code
export const accessReducer = ( state = {}, action ) => {
    switch(action.type){
        case ACCESS_REQUEST:
            return {
                loading: true
            }

        case ACCESS_SUCCESS:
            return {
                loading: false,
                accessCode: action.payload
            }

        case ACCESS_FAIL:
            return {
                loading: false
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


//login and get currently logged in
export const authReducer = ( state = { user: {} }, action) => {
    switch(action.type){
        case LOGIN_REQUEST:
        case LOAD_USER_REQUEST:
            return {
                loading: true, 
                isAuthenticated: false
            }

        case LOGIN_SUCCESS:
        case LOAD_USER_SUCCESS:
            return {
                ...state,
                loading: false,
                isAuthenticated: true,
                user: action.payload,
                success: action.payload
            }

        case LOGOUT_SUCCESS:
            return {
                loading: false,
                isAuthenticated: false,
                user: null
            }

        case LOAD_USER_FAIL:
            return {
                loading: false,
                isAuthenticated: false,
                user: null,
                loadError: action.payload //changed 
            }

        case LOGOUT_FAIL:
            return {
                ...state,
                error: action.payload
            }

        case LOGIN_FAIL:
            return {
                ...state,
                loading: false,
                isAuthenticated: false,
                user: null,
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

//update user details and password
export const userReducer = (state = {}, action) => {
    switch(action.type){

        case UPDATE_PROFILE_REQUEST:
        case UPDATE_PASSWORD_REQUEST:
            return {
                ...state,
                loading: true
            }

        case UPDATE_PROFILE_SUCCESS:
        case UPDATE_PASSWORD_SUCCESS:
            return {
                ...state,
                loading: false,
                isUpdated: action.payload
            }

        case UPDATE_PROFILE_RESET:
        case UPDATE_PASSWORD_RESET:
            return {
                ...state,
                isUpdated: false,
                loading: false
            }
            
        case UPDATE_PROFILE_FAIL:
        case UPDATE_PASSWORD_FAIL:
            return {
                ...state,
                loading: false,
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

//set new password
export const forgotPasswordReducer = (state = {}, action) => {
    switch(action.type){

        case FORGOT_PASSWORD_REQUEST:
        case NEW_PASSWORD_REQUEST:
            return {
                ...state,
                loading: true,
                error: null
            }

        case FORGOT_PASSWORD_SUCCESS:
            return {
                ...state,
                loading: false,
                message: action.payload
            }

        case NEW_PASSWORD_SUCCESS:
            return {   
                ...state,
                success: action.payload
            }

        case FORGOT_PASSWORD_FAIL:
        case NEW_PASSWORD_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        
        case FORGOT_PASSWORD_RESET:
        case NEW_PASSWORD_RESET:
            return {
                ...state,
                loading: false
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