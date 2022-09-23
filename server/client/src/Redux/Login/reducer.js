import { LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS, LOGOUT } from "./actionTypes"
import { logout } from './actions';

const initState = {
    isAuth:false,
    isLoading:false,
    isError:false,
    errorMsg:"",
    loggedUser:null
}

export const loginReducer = (state=initState,{type,payload})=>{
    switch (type){
        case LOGIN_REQUEST: return {
            ...state,
            isLoading:true
        };
        case LOGIN_SUCCESS: return {
            ...state,
            isAuth:true,
            isLoading:false,
            loggedUser:payload //here
        };
        case LOGIN_FAILURE: return {
            ...state,
            isError:true,
            isLoading:false,
            errorMsg:payload
        };
        case LOGOUT: return {
            ...state,
            isAuth:false,
            isError:false
        }
        default: return state
    }
}

