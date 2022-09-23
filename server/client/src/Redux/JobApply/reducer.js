import { APPLY_JOB_REQUEST,APPLY_JOB_SUCCESS,APPLY_JOB_FAILURE } from "./actionType"

const initState = {
    isSaving:true,
    isSaved:false,
    isError:false
}



export const applyReducer = (state=initState,{type,payload})=>{
    switch(type){
        case APPLY_JOB_REQUEST:return {
            ...state,
            isSaving:true
        };
        case APPLY_JOB_SUCCESS:return {
            ...state,
            isSaving:false,
            isSaved:true
        };
        case APPLY_JOB_FAILURE:return {
            ...state,
            isSaving:false,
            isError:true
        }
        default:return state
    }
}