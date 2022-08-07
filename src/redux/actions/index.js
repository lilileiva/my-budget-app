import {
    BASE_URL,
    GET_TRANSACTIONS,
    GET_CATEGORIES
} from './types.js';


// export function getTransactions() {
//     return async function (dispatch) {
//         try {
//             const http = new XMLHttpRequest();
//             const url = `${BASE_URL}/transactions/get`

//             http.open("GET", url);
//             http.setRequestHeader("Accept", "application/json");
//             http.setRequestHeader("Authorization", `Bearer ${localStorage.getItem("token")}`);

//             http.onreadystatechange = function () {
//                 if (this.readyState == 4 && this.status == 200) {
//                     dispatch({
//                         type: GET_TRANSACTIONS,
//                         payload: this.response
//                     })
//                 }
//             }

//             http.send();
//         } catch (error) {
//             console.log(error)
//         }
//     }
// }
export function getTransactions() {
    return async function (dispatch) {
        try {
            await fetch(`${BASE_URL}/transactions/get`, {
                headers: { "Authorization": `Bearer ${localStorage.getItem("token")}` }
            })
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
            await fetch(`${BASE_URL}/transactions/create`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${localStorage.getItem("token")}`
                    },
                    body: JSON.stringify(inputValues),
                }

            )
                .then((res) => res.json());
        } catch (error) {
            console.log(error)
        }
    }
}

export function editTransaction(transactionEdited, id) {
    return async function (dispatch) {
        try {
            await fetch(`${BASE_URL}/transactions/update/${id}`,
                {
                    method: "PUT",
                    body: transactionEdited,
                    headers: { "Authorization": `Bearer ${localStorage.getItem("token")}` }
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
            await fetch(`${BASE_URL}/categories/get`)
                .then((res) => res.json())
                .then((data) => {
                    dispatch({
                        type: GET_CATEGORIES,
                        payload: data
                    })
                })

            // const http = new XMLHttpRequest();
            // const url = `${BASE_URL}/categories/get`

            // http.open("GET", url);

            // http.setRequestHeader("Accept", "application/json");

            // http.onreadystatechange = function () {
            //     if (this.readyState == 4 && this.status == 200) {
            //         dispatch({
            //             type: GET_CATEGORIES,
            //             payload: this.responseText
            //         })
            //     }
            // }            

            // http.send();
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