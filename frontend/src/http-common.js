import axios from "axios";

// var token = "";
// var user = JSON.parse(localStorage.getItem('user'));
// if (user && user.token) {
//     token = user.token;
// }
export default axios.create({
    baseURL: "http://localhost:3000/"
});