import { SAVE_JOB_REQUEST, SAVE_JOB_SUCCESS, SAVE_JOB_FAILURE } from "./actions"

const initState = {
    isSaving: true,
    isSaved: false,
    isError: false
}

export const saveReducer = (state = initState, { type, payload }) => {
    switch (type) {
        case SAVE_JOB_REQUEST: return {
            ...state,
            isSaving: true
        };
        case SAVE_JOB_SUCCESS: return {
            ...state,
            isSaving: false,
            isSaved: true
        };
        case SAVE_JOB_FAILURE: return {
            ...state,
            isSaving: false,
            isError: true
        }
        default: return state
    }
}