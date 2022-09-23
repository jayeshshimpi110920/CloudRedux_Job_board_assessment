import { FETCH_COMPANY_REQUEST, FETCH_COMPANY_SUCCESS, FETCH_COMPANY_FAILURE, FETCH_COMPANY_DETAILS } from "./actionsConstants";

const initState = {
    isSearching: false,
    isLoading: true,
    error: false,
    data: [],
    currentCompany: []
}

const CompanyReducer = (state = initState, {type, payload}) => {
    switch(type) {
        case FETCH_COMPANY_REQUEST: 
            return {
                ...state,
                isSearching: true,
                isLoading: true,
                error: false
            }
        case FETCH_COMPANY_SUCCESS: 
            return {
                ...state,
                isSearching: false,
                isLoading: false,
                data: payload
            }
        case FETCH_COMPANY_FAILURE: 
            return {
                ...state,
                isSearching: false,
                isLoading: false,
                error: true
            }
        case FETCH_COMPANY_DETAILS:
            return {
                ...state,
                currentCompany: payload
            }
        default:
            return state;    
    }
}

export { CompanyReducer }