import axios from "api/aixos";
import { toast } from "react-toastify";

const isAdmin = sessionStorage.getItem('isAdmin');

const getCategory = async () => {
    if (isAdmin) {
        return await axios.get('/api/category/categories');
    } else {
        toast.error('Tài khoản này không cho phép lấy dữ liệu');
    }
}

export default {
    getCategory
}