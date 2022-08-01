import {
    BASE_URL,
    GET_OPERATIONS,
    CREATE_OPERATION,
    EDIT_OPERATION
} from './types.js';


export function getOperations() {
    return async function (dispatch) {
        try {
            return await fetch(`${BASE_URL}/operations`)
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

export function createOperation(operation) {
    return async function (dispatch) {
        try {
            return await fetch(`${BASE_URL}/operations`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(operation)
            })
                .then((res) => res.json())
                .then((data) => {
                    dispatch({
                        type: CREATE_OPERATION,
                        payload: data
                    })
                })
        } catch (error) {
            console.log(error)
        }
    }
}

export function editOperation(operationEdited) {
    return async function (dispatch) {
        try {
            return await fetch(`${BASE_URL}/operations`, {
                method: "PUT",
                body: operationEdited
            })
                .then((res) => res.json())
                .then((data) => {
                    dispatch({
                        type: EDIT_OPERATION,
                        payload: data
                    })
                })
        } catch (error) {
            console.log(error)
        }
    }
}