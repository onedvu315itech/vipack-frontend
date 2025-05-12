import axios from "api/aixos";
import { toast } from "react-toastify";

const isAdmin = sessionStorage.getItem('isAdmin');

const createProduct = async (productData) => {
    if (isAdmin) {
        return await axios.post(`/api/products`, productData);
    } else {
        toast.error('Tài khoản này không cho phép thực hiện thao tác này');
    }
}

const getAllProducts = async () => {
    if (isAdmin) {
        return await axios.get('/api/products/allproducts');
    } else {
        toast.error('Tài khoản này không cho phép lấy dữ liệu');
    }
}

const getProductById = async (productId) => {
    if (isAdmin) {
        return await axios.get(`/api/products/${productId}`);
    } else {
        toast.error('Tài khoản này không cho phép lấy dữ liệu');
    }
}

const updateProduct = async (productId, productData) => {
    if (isAdmin) {
        return await axios.put(`/api/products/${productId}`, productData);
    } else {
        toast.error('Tài khoản này không cho phép thực hiện thao tác này');
    }
}

const deleteProduct = async (productId) => {
    if (isAdmin) {
        return await axios.delete(`/api/products/${productId}`);
    } else {
        toast.error('Tài khoản này không cho phép thực hiện thao tác này');
    }
}

export default {
    createProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct
}