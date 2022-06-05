import axios from "axios";

export default axios.create({
    baseURL: "http://reqres.in/api/products"
})
