
import { POST_JOB_REQUEST, POST_JOB_SUCCESS, POST_JOB_FAILURE } from "./actionType"

const initSate = {
    isPosting:false,
    postSuccess:false,
    postJobError:false
}

export const postJobReducer = (state=initSate,{type,payload})=>{
    switch(type){
        case POST_JOB_REQUEST:return {
            ...state,
            isPosting:true
        };
        case POST_JOB_SUCCESS:return {
            ...state,
            postSuccess:true,
            isPosting:false
        }
        case POST_JOB_FAILURE:return {
            ...state,
            postJobError:true,
            isPosting:false
        }
        default:return state
    }
}