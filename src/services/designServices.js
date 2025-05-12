import axios from "api/aixos"
import { toast } from "react-toastify";

const isAdmin = sessionStorage.getItem('isAdmin');

const createDetail = async (createdData) => {
    if (isAdmin) {
        return await axios.post(`/api/design-details`, createdData);
    } else {
        toast.error('Tài khoản này không cho phép tạo dữ liệu');
    }
}

const getAllDetail = async () => {
    return await axios.get(`/api/design-details`);
}

const getDetailById = async (detailId) => {
    return await axios.get(`/api/design-details/${detailId}`);
}

const getDetailByBlogId = async (blogId) => {
    return await axios.get(`/api/design-details/blogs/${blogId}`);
}

const updateDetail = async (detailId, updatedData) => {
    if (isAdmin) {
        return await axios.put(`/api/design-details/${detailId}`, updatedData);
    } else {
        toast.error('Tài khoản này không cho phép cập nhật dữ liệu');
    }
}

const deleteDetail = async (detailId) => {
    if (isAdmin) {
        return await axios.delete(`/api/design-details/${detailId}`);
    } else {
        toast.error('Tài khoản này không cho phép xóa dữ liệu');
    }
}

export default {
    createDetail,
    getAllDetail,
    getDetailById,
    getDetailByBlogId,
    updateDetail,
    deleteDetail
}