import {
    GET_TRANSACTIONS,
    GET_CATEGORIES
} from '../actions/types.js';

const initialState = {
    transactions: [],
    categories: []
}


function rootReducer(state = initialState, action) {
    switch(action.type) {
        case GET_TRANSACTIONS:
            return {
                ...state,
                transactions: action.payload
            }
        case GET_CATEGORIES:
            return {
                ...state,
                categories: action.payload
            }
        default: return { ...state }
    }
}


export default rootReducer;