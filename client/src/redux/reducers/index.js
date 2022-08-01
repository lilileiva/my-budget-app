import {
    GET_OPERATIONS
} from '../actions/types.js';

const initialState = {
    operations: ""
}


function rootReducer(state = initialState, action) {
    switch(action.type) {
        case GET_OPERATIONS:
            return {
                ...state,
                operations: []
            }
        default: return { ...state }
    }
}


export default rootReducer;