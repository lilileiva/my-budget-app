import {
    BASE_URL,
    GET_TRANSACTIONS,
    GET_CATEGORIES
} from './types.js';


export function getTransactions() {
    return async function (dispatch) {
        try {
            const http = new XMLHttpRequest();
            const url = `${BASE_URL}/transactions/get`

            http.open("GET", url);
            http.setRequestHeader("Accept", "application/json");
            http.setRequestHeader("Authorization", `Bearer ${localStorage.getItem("token")}`);

            http.onreadystatechange = function () {
                if (this.readyState === 4 && this.status === 200) {
                    dispatch({
                        type: GET_TRANSACTIONS,
                        payload: JSON.parse(this.responseText)
                    })
                }
            }

            http.send();
        } catch (error) {
            console.log(error)
        }
    }
}


export function createTransaction(inputValues) {
    return async function (dispatch) {
        try {
            await fetch(`${BASE_URL}/transactions/create`,
                {
                    method: "POST",
                    body: JSON.stringify(inputValues),
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${localStorage.getItem("token")}`
                    },
                }

            )
                .then((res) => res.json());
        } catch (error) {
            console.log(error)
        }
    }
}

export function editTransaction(inputValues, id) {
    return async function (dispatch) {
        try {
            await fetch(`${BASE_URL}/transactions/update/${id}`,
                {
                    method: "PUT",
                    body: JSON.stringify(inputValues),
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${localStorage.getItem("token")}`
                    }
                }
            )
                .then((res) => res.json());
        } catch (error) {
            console.log(error)
        }
    }
}

export function getCategories() {
    return async function (dispatch) {
        try {
            const http = new XMLHttpRequest();
            const url = `${BASE_URL}/categories/get`

            http.open("GET", url);

            http.setRequestHeader("Accept", "application/json");

            http.onreadystatechange = function () {
                if (this.readyState === 4 && this.status === 200) {
                    dispatch({
                        type: GET_CATEGORIES,
                        payload: JSON.parse(this.responseText)
                    })
                }
            }

            http.send();
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