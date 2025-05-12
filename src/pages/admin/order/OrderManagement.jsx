import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import MainCard from "components/MainCard";
import { useEffect, useState } from "react";
import orderServices from "services/orderServices";
import MomoIcon from 'assets/images/momo.png';
import CodIcon from 'assets/images/cod.png';
import PayosIcon from 'assets/images/payos.png';
import DefaultIcon from 'assets/images/else.png';
import OrderDialog from "pages/admin/dialog/OrderDialog";
import { toast } from "react-toastify";

const OrderManagement = () => {
    const [orders, setOrders] = useState([]);
    const [openOrderDialog, setOpenOrderDialog] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

    useEffect(() => {
        const getOrders = async () => {
            let resOfOrders = await orderServices.getOrders();
            if (resOfOrders) {
                setOrders(resOfOrders.data);
            }
        };

        getOrders();
    }, []);

    const getOrderStatus = (isPaid, isDelivered) => {
        if (!isPaid && !isDelivered) {
            return { text: 'Đơn hàng mới', color: '#007bff' };
        }
        if (isPaid && !isDelivered) {
            return { text: 'Đã thanh toán', color: '#ffc107' };
        }
        if (isPaid && isDelivered) {
            return { text: 'Đã giao', color: '#28a745' };
        }
        return { text: 'Trạng thái không xác định', color: 'black' };
    };

    const formatPrice = (price) => {
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
    };

    const getPaymentMethod = (method) => {
        let iconStyle = { width: '30px', height: '30px', marginRight: '5px' };
        switch (method) {
            case 'Momo':
                return { icon: <img src={MomoIcon} alt="Momo" style={iconStyle} />, text: 'Momo' };
            case 'COD':
                return { icon: <img src={CodIcon} alt="COD" style={iconStyle} />, text: 'COD' };
            case 'Payos':
                return { icon: <img src={PayosIcon} alt="COD" style={iconStyle} />, text: 'Payos' };
            default:
                return { icon: <img src={DefaultIcon} alt="Khác" style={iconStyle} />, text: 'Khác' };
        }
    };

    const handleView = (orderId) => {
        let matchedOrder = orders.find(o => o._id === orderId);
        if (matchedOrder) {
            setSelectedOrder(matchedOrder);
            setOpenOrderDialog(true);
        } else {
            toast.error('Lỗi không tìm thấy đơn hàng');
        }
    };

    const handleDelete = (orderId) => {
        let matchedOrder = orders.find(o => o._id === orderId);
        if (matchedOrder) {
            setSelectedOrder(matchedOrder);
            setOpenDeleteDialog(true);
        } else {
            toast.error('Lỗi không tìm thấy đơn hàng');
        }
    };

    const confirmDelete = async () => {
        if (selectedOrder) {
            let resOfDelete = await orderServices.deleteOrder(selectedOrder._id);
            console.log(resOfDelete)
            if (resOfDelete) {
                toast.success('Đã hủy đơn hàng thành công');
                setOpenDeleteDialog(false);
            }
        } else {
            toast.error('Không tìm thấy dữ liệu đơn hàng');
        }
    };

    return (
        <MainCard>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            {["Khách hàng", "Địa chỉ giao hàng", "Thời gian tạo", "Người tư vấn", "Trạng thái", "Tổng giá", "Thanh toán"].map((header) => (
                                <TableCell
                                    sx={{
                                        backgroundColor: '#7850c4',
                                        color: '#ffffff',
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis',
                                        whiteSpace: 'nowrap',
                                        maxWidth: 150,
                                    }}
                                    key={header}
                                >
                                    <Typography variant="h6" sx={{ fontWeight: 600 }}>{header}</Typography>
                                </TableCell>
                            ))}
                            <TableCell sx={{ backgroundColor: '#7850c4' }}></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {orders && orders.map((order) => {
                            let status = getOrderStatus(order.isPaid, order.isDelivered);
                            let paymentMethod = getPaymentMethod(order.paymentMethod);
                            return (
                                <TableRow key={order._id}>
                                    <TableCell sx={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                        {order.shippingAddress.name}
                                    </TableCell>
                                    <TableCell sx={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{order.shippingAddress.address}</TableCell>
                                    <TableCell sx={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', textAlign: 'right' }}>
                                        {new Date(order.createdAt).toLocaleDateString('en-GB')}
                                    </TableCell>
                                    <TableCell sx={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{order.staff}</TableCell>
                                    <TableCell sx={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                        <span style={{ color: status.color, fontSize: '2rem', verticalAlign: 'middle' }}>
                                            •
                                        </span>
                                        <span style={{ marginLeft: '5px', color: status.color }}>{status.text}</span>
                                    </TableCell>
                                    <TableCell sx={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', textAlign: 'right' }}>
                                        {order.totalPrice && formatPrice(order.totalPrice)}
                                    </TableCell>
                                    <TableCell sx={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                        {paymentMethod.icon}{paymentMethod.text}
                                    </TableCell>
                                    <TableCell>
                                        <Box justifyContent='space-between' display="flex">
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                onClick={() => handleView(order._id)}
                                                style={{ background: '#7850c4' }}
                                            >
                                                Xem
                                            </Button>
                                            <Button
                                                variant="contained"
                                                onClick={() => handleDelete(order._id)}
                                                style={{ background: 'red' }}
                                            >
                                                Hủy
                                            </Button>
                                        </Box>
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>

            <Dialog open={openDeleteDialog} onClose={() => setOpenDeleteDialog(false)}>
                <DialogTitle>Xác nhận hủy đơn hàng</DialogTitle>
                <DialogContent>
                    <Typography>Bạn có chắc chắn muốn hủy đơn hàng này?</Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenDeleteDialog(false)} color="primary">Hủy</Button>
                    <Button onClick={confirmDelete} color="secondary">Xác nhận</Button>
                </DialogActions>
            </Dialog>

            <OrderDialog
                open={openOrderDialog}
                onClose={() => setOpenOrderDialog(false)}
                order={selectedOrder}
                mode="view"
            />
        </MainCard>
    );
};

export default OrderManagement;