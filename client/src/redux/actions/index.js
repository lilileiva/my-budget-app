import {
    BASE_URL,
    GET_TRANSACTIONS    
} from './types.js';


export function getTransactions() {
    return async function (dispatch) {
        try {
            return await fetch(`${BASE_URL}/transactions/get`)
                .then((res) => res.json())
                .then((data) => {
                    dispatch({
                        type: GET_TRANSACTIONS,
                        payload: data
                    })
                })
        } catch (error) {
            console.log(error)
        }
    }
}

export function createTransaction(inputValues) {
    return async function (dispatch) {
        try {
            await fetch(`${BASE_URL}/transactions/create`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(inputValues)
            })
                .then((res) => res.json());
        } catch (error) {
            console.log(error)
        }
    }
}

export function editTransaction(transactionEdited) {
    return async function (dispatch) {
        try {
            return await fetch(`${BASE_URL}/transactions/edit`, {
                method: "PUT",
                body: transactionEdited
            })
                .then((res) => res.json());
        } catch (error) {
            console.log(error)
        }
    }
}


export function register(inputValues) {
    return async function (dispatch) {
        try {
            await fetch(`${BASE_URL}/users/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(inputValues)
            })
                .then((res) => res.json());                
        } catch (error) {
            console.log(error)
        }
    }
}