import axios from "axios";

export default class LangService {

    static async fetchLangEn() {
        try {
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/en`);
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    static async fetchLangFr() {
        try {
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/fr`);
            return response.data;
        } catch (error) {
            throw error;
        }
    }
}