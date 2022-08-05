import {
    BASE_URL,
    GET_OPERATIONS    
} from './types.js';


export function getOperations() {
    return async function (dispatch) {
        try {
            return await fetch(`${BASE_URL}/operations/get`)
                .then((res) => res.json())
                .then((data) => {
                    dispatch({
                        type: GET_OPERATIONS,
                        payload: data
                    })
                })
        } catch (error) {
            console.log(error)
        }
    }
}

export function createOperation(inputValues) {
    return async function (dispatch) {
        try {
            await fetch(`${BASE_URL}/operations/create`, {
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

export function editOperation(operationEdited) {
    return async function (dispatch) {
        try {
            return await fetch(`${BASE_URL}/operations/edit`, {
                method: "PUT",
                body: operationEdited
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