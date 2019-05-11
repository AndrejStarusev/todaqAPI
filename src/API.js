import axios from "axios";
const APIkey = "60193b1f-bcf4-4a3e-9744-0418e0edc4a8";

class API {
    constructor() {
        const headers = {};
        headers["Content-Type"] = "application/json";
        headers["x-api-key"] = APIkey;

        this.settings = {
            headers,
            cache: "default",
            mode: "no-cors"
        };
    }

    get = (url, settings) => {
        return axios
            .get(url, { ...this.settings, ...(settings || {}) })
            .then(res => res.data)
            .catch(err => console.warn('error: ', err));
    };

    post = (url, data, settings) => {
        return axios
            .post(url, data, { ...this.settings, ...(settings || {}) })
            .then(res => res.body)
            .catch(err => console.warn('error: ', err));
    };
}

export default new API();
