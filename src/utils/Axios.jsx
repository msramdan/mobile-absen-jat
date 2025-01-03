import axios from "axios";

const Axios = axios.create({
    baseURL: 'https://hrm.evdigi.id/api/mobile',
})

export default Axios