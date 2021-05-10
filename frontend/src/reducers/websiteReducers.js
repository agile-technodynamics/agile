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
    UPDATE_HOME_RESET,
    ABOUT_DETAILS_REQUEST,
    ABOUT_DETAILS_SUCCESS,
    ABOUT_DETAILS_FAIL,
    ALL_ABOUT_DETAILS_REQUEST,
    ALL_ABOUT_DETAILS_SUCCESS,
    ALL_ABOUT_DETAILS_FAIL,
    UPDATE_ABOUT_REQUEST,
    UPDATE_ABOUT_SUCCESS,
    UPDATE_ABOUT_FAIL,
    UPDATE_ABOUT_RESET,
    FOOTER_DETAILS_REQUEST,
    FOOTER_DETAILS_SUCCESS,
    FOOTER_DETAILS_FAIL,
    UPDATE_FOOTER_REQUEST,
    UPDATE_FOOTER_SUCCESS,
    UPDATE_FOOTER_FAIL,
    UPDATE_FOOTER_RESET,
    ALL_SERVICES_REQUEST,
    ALL_SERVICES_SUCCESS,
    ALL_SERVICES_FAIL,
    SERVICES_DETAILS_REQUEST,
    SERVICES_DETAILS_SUCCESS,
    SERVICES_DETAILS_FAIL,
    UPDATE_SERVICES_REQUEST,
    UPDATE_SERVICES_SUCCESS,
    UPDATE_SERVICES_FAIL,
    UPDATE_SERVICES_RESET,
    CLEAR_ERRORS
} from '../constants/websiteConstants'

//get ALL home details
export const homeReducers = (state = { homes: [] }, action) => {
    switch(action.type){

        case ALL_HOME_REQUEST:
            return {
                ...state,
                loading: true
            }
        
        case ALL_HOME_SUCCESS:
            return {
                loading: false,
                homes: action.payload.homes,
                productsDescription: action.payload.productsDescription,
                servicesDescription: action.payload.servicesDescription,
                productImageLeft: action.payload.productImageLeft,
                productImageRight: action.payload.productImageRight,
                titleBackground: action.payload.titleBackground,
                servicesBackground: action.payload.servicesBackground,
            }

        case ALL_HOME_FAIL:
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

//get single home details
export const homeDetailsReducer = (state = { home: {} }, action ) => {
    switch(action.type) {
        
        case HOME_DETAILS_REQUEST:
            return {
                ...state,
                loading: true
            }

        case HOME_DETAILS_SUCCESS:
            return {
                loading: false,
                home: action.payload
            }

        case HOME_DETAILS_FAIL:
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

//get single about details
export const aboutDetailsReducer = (state = { about: {} }, action) => {
    switch(action.type){

        case ABOUT_DETAILS_REQUEST:
            return {
                ...state,
                loading: true
            }
    
        case ABOUT_DETAILS_SUCCESS:
            return {
                loading: false,
                about: action.payload
            }

        case ABOUT_DETAILS_FAIL:
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

//get all about details
export const allAboutDetailsReducer = (state = { abouts: [] }, action) => {
    switch(action.type){

        case ALL_ABOUT_DETAILS_REQUEST:
            return {
                loading: true,
                abouts: []
            }
    
        case ALL_ABOUT_DETAILS_SUCCESS:
            return {
                loading: false,
                abouts: action.payload.abouts,
                aboutCompany_title: action.payload.aboutCompany_title,
                aboutCompany_description: action.payload.aboutCompany_description,
                aboutScope_title: action.payload.aboutScope_title,
                aboutScope_description: action.payload.aboutScope_description,
                aboutObjectives_title: action.payload.aboutObjectives_title,
                aboutObjectives_description: action.payload.aboutObjectives_description,
                aboutMission_title: action.payload.aboutMission_title,
                aboutMission_description: action.payload.aboutMission_description,
                aboutVision_title: action.payload.aboutVision_title,
                aboutVision_description: action.payload.aboutVision_description,
                aboutHistory_title: action.payload.aboutHistory_title,
                aboutHistory_description: action.payload.aboutHistory_description,
            }

        case ALL_ABOUT_DETAILS_FAIL:
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

//get ALL services details
export const servicesReducers = (state = { services: [] }, action) => {
    switch(action.type){

        case ALL_SERVICES_REQUEST:
            return {
                ...state,
                loading: true
            }
        
        case ALL_SERVICES_SUCCESS:
            return {
                loading: false,
                services: action.payload.services,
                it1_subtitle: action.payload.it1_subtitle,
                it2_subtitle: action.payload.it2_subtitle,
                etd1_subtitle: action.payload.etd1_subtitle,
                etd2_subtitle: action.payload.etd2_subtitle,
                it1_desc: action.payload.it1_desc,
                it2_desc: action.payload.it2_desc,
                etd1_desc: action.payload.etd1_desc,
                etd2_desc: action.payload.etd2_desc,
                it1_icon: action.payload.it1_icon,
                it2_icon: action.payload.it2_icon,
                etd1_icon: action.payload.etd1_icon,
                etd2_icon: action.payload.etd2_icon,
                it1_iconBg: action.payload.it1_iconBg,
                it2_iconBg: action.payload.it2_iconBg,
                etd1_iconBg: action.payload.etd1_iconBg,
                etd2_iconBg: action.payload.etd2_iconBg,
            }

        case ALL_SERVICES_FAIL:
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

//get single services details
export const servicesDetailsReducer = (state = { service: {} }, action ) => {
    switch(action.type) {
        
        case SERVICES_DETAILS_REQUEST:
            return {
                ...state,
                loading: true
            }

        case SERVICES_DETAILS_SUCCESS:
            return {
                loading: false,
                service: action.payload
                // name: action.payload.name,
                // description: action.payload.description,
                // image: action.payload.image
            }

        case SERVICES_DETAILS_FAIL:
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

//get footer details
export const footerDetailsReducer = (state = { footerInfo: {} }, action) => {
    switch(action.type){

        case FOOTER_DETAILS_REQUEST:
            return {
                ...state,
                loading: true
            }
        
        case FOOTER_DETAILS_SUCCESS:
            return {
                loading: false,
                footerInfo: action.payload
            }

        case FOOTER_DETAILS_FAIL:
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

//update website
export const websiteUpdateReducer = (state = {}, action) => {
    switch(action.type){
        case UPDATE_HOME_REQUEST:
        case UPDATE_ABOUT_REQUEST:
        case UPDATE_FOOTER_REQUEST:
        case UPDATE_SERVICES_REQUEST:
            return {
                ...state,
                loading: true
            }
        
        case UPDATE_HOME_SUCCESS:
        case UPDATE_ABOUT_SUCCESS:
        case UPDATE_FOOTER_SUCCESS:
        case UPDATE_SERVICES_SUCCESS:
            return {
                ...state,
                loading: false,
                isUpdated: action.payload
            }

        case UPDATE_HOME_FAIL:
        case UPDATE_ABOUT_FAIL:
        case UPDATE_FOOTER_FAIL:
        case UPDATE_SERVICES_FAIL:
            return {
                ...state,
                error: action.payload,
                loading: false
            }

        case UPDATE_HOME_RESET:
        case UPDATE_ABOUT_RESET:
        case UPDATE_FOOTER_RESET:
        case UPDATE_SERVICES_RESET:
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