import axios from "axios";

const Axios = axios.create({
    baseURL: 'https://hrm.jatpowerindo.co.id/api/mobile',
})

export default Axios