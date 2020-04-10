import axios from "axios"

export const ApiService = {
    getUserList(){
        console.log('api')
        return axios.
        get('https://skilldata.free.beeceptor.com/getskills')
        .then(response => {
            return response.data; // return list of users.
        })
        .catch(error => console.log(error));
    }
}
console.log(ApiService);