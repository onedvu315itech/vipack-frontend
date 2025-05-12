import aixos from "api/aixos";
import { toast } from "react-toastify";

const isAdmin = sessionStorage.getItem('isAdmin');

const createOrder = async (createdData) => {
    return await aixos.post(`/api/orders`, createdData);
}

const getOrders = async () => {
    return await aixos.get('/api/orders');
}

const getOrderById = async (orderId) => {
    if (isAdmin) {
        return await aixos.get(`/api/orders/${orderId}/pay`);
    } else {
        toast.error('Tài khoản này không cho phép lấy dữ liệu');
    }
}

const updateStatusToBePaid = async (orderId) => {
    if (isAdmin) {
        return await aixos.put(`/api/orders/${orderId}`);
    } else {
        toast.error('Tài khoản này không cho phép lấy dữ liệu');
    }
}

const updateStatusToBeDeliveried = async (orderId) => {
    if (isAdmin) {
        return await aixos.put(`/api/orders/${orderId}/deliver`);
    } else {
        toast.error('Tài khoản này không cho phép lấy dữ liệu');
    }
}

const deleteOrder = async (orderId) => {
    if (isAdmin) {
        return await aixos.delete(`/api/orders/${orderId}`);
    } else {
        toast.error('Tài khoản này không cho phép lấy dữ liệu');
    }
}

export default {
    createOrder,
    getOrders,
    getOrderById,
    updateStatusToBePaid,
    updateStatusToBeDeliveried,
    deleteOrder
}