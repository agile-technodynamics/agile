import {
    INSIDE_DASHBOARD_TRUE,
    INSIDE_DASHBOARD_FALSE
} from '../constants/dashboardConstants'

//specify if user in dashboard or not
export const dashboardReducer = (state = {}, action) => {
    switch(action.type){
        case INSIDE_DASHBOARD_TRUE:
            return {
                isDashboard: true
            }

        case INSIDE_DASHBOARD_FALSE:
            return {
                isDashboard: false
            }
        
        default:
            return state
    }
}