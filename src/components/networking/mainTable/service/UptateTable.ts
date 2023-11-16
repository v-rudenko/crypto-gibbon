import axios from "axios";

const API = "https://api.coincap.io/v2/assets"

const UpdateTable = async () => {
    const response = await axios.get(API)
    return response.data.data

}

export default UpdateTable

