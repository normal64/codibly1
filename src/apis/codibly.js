import axios from "axios";

export default axios.create({
    method: 'POST',
    headers: {
        'Accept': 'application/json, text/plain, */*',
         'Content-Type': 'application/json'
        },

    baseURL: "https://reqres.in/api/products"
})
