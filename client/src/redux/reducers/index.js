import {
    GET_TRANSACTIONS
} from '../actions/types.js';

const initialState = {
    transactions: ""
}


function rootReducer(state = initialState, action) {
    switch(action.type) {
        case GET_TRANSACTIONS:
            return {
                ...state,
                transactions: []
            }
        default: return { ...state }
    }
}


export default rootReducer;