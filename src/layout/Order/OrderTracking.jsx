import React, { useEffect, useState } from 'react';
import { Box, TextField, Button, Typography, CircularProgress, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { toast } from 'react-toastify';
import CodIcon from 'assets/images/cod.png';
import PayosIcon from 'assets/images/payos.png';
import DefaultIcon from 'assets/images/else.png';
import orderServices from 'services/orderServices';
import OrderDialog from 'pages/home-order/OrderDialog';

const OrderTracking = () => {
    const [phoneNumber, setPhoneNumber] = useState('');

    const [orders, setOrders] = useState([]);
    const [ordersByPhone, setOrdersByPhone] = useState([]);
    const [selectedOrder, setSelectedOrder] = useState(null);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [openOrderDialog, setOpenOrderDialog] = useState(false);

    useEffect(() => {
        const fetchData = () => {
            getAllOrders();
        };

        fetchData();
    }, []);

    const getAllOrders = async () => {
        try {
            setLoading(true);
            const resOfOrders = await orderServices.getOrders();
            if (resOfOrders.data) {
                setOrders(resOfOrders.data);
            }
        } catch (error) {
            setError('Có lỗi khi lấy dữ liệu đơn hàng!');
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (e) => {
        setPhoneNumber(e.target.value);
    };

    const handleFindOrder = () => {
        const userOrders = orders.filter(order => order.shippingAddress.phoneNumber === phoneNumber);
        if (userOrders.length > 0) {
            setOrdersByPhone(userOrders);
        } else {
            toast.error('Không tìm thấy đơn hàng với số điện thoại này!');
            setOrdersByPhone([]);
        }
    };

    const getOrderStatus = (isPaid, isDelivered) => {
        if (isPaid && isDelivered) {
            return { color: 'green', text: 'Đã hoàn thành' };
        }
        if (!isPaid) {
            return { color: 'red', text: 'Chưa thanh toán' };
        }
        if (!isDelivered) {
            return { color: 'orange', text: 'Đang vận chuyển' };
        }
        return { color: 'gray', text: 'Chưa xử lý' };
    };

    const getPaymentMethod = (method) => {
        let iconStyle = { width: '30px', height: '30px', marginRight: '5px' };
        switch (method) {
            case 'COD':
                return { icon: <img src={CodIcon} alt="COD" style={iconStyle} />, text: 'Thanh toán khi nhận hàng' };
            case 'Payos':
                return { icon: <img src={PayosIcon} alt="COD" style={iconStyle} />, text: 'Payos' };
            default:
                return { icon: <img src={DefaultIcon} alt="Khác" style={iconStyle} />, text: 'Khác' };
        }
    };

    const formatPrice = (price) => {
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND'
        }).format(price);
    };

    const handleView = (orderId) => {
        let matchedOrder = ordersByPhone.find(o => o._id === orderId);
        if (matchedOrder) {
            setSelectedOrder(matchedOrder);
            setOpenOrderDialog(true);
        } else {
            toast.error('Lỗi không tìm thấy đơn hàng');
        }
    };

    return (
        <>
            <Box sx={{ padding: 3, maxWidth: 1200, margin: 'auto' }}>
                <Typography variant="h4" sx={{ marginBottom: 3, textAlign: 'center' }}>
                    Kiểm Tra Đơn Hàng
                </Typography>
                <TextField
                    label="Số điện thoại"
                    fullWidth
                    value={phoneNumber}
                    onChange={handleInputChange}
                    sx={{ marginBottom: 2 }}
                    placeholder="Nhập số điện thoại"
                    type="tel"
                />
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleFindOrder}
                    disabled={loading}
                    sx={{ width: '100%', marginBottom: 3 }}
                >
                    {loading ? <CircularProgress size={24} /> : 'Kiểm tra'}
                </Button>
                {error && (
                    <Typography variant="body1" color="error" sx={{ marginBottom: 2 }}>
                        {error}
                    </Typography>
                )}
                {ordersByPhone.length > 0 ? (
                    <TableContainer component={Paper} sx={{ maxHeight: 500 }}>
                        <Table aria-label="Order table">
                            <TableHead>
                                <TableRow>
                                    {["Tên", "Thời gian tạo", "Trạng thái", "Tổng giá", "Thanh toán", ""].map((header) => (
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
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {ordersByPhone.map((order) => {
                                    let status = getOrderStatus(order.isPaid, order.isDelivered);
                                    let paymentMethod = getPaymentMethod(order.paymentMethod);
                                    return (
                                        <TableRow key={order._id}>
                                            <TableCell sx={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                                {order.shippingAddress.name}
                                            </TableCell>
                                            <TableCell sx={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', textAlign: 'right' }}>
                                                {new Date(order.createdAt).toLocaleDateString('en-GB')}
                                            </TableCell>
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
                                                <Box display="flex" justifyContent="space-between">
                                                    <Button
                                                        variant="contained"
                                                        color="primary"
                                                        onClick={() => handleView(order._id)}
                                                        sx={{ backgroundColor: '#7850c4' }}
                                                    >
                                                        Xem
                                                    </Button>
                                                </Box>
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                ) : (
                    phoneNumber && !loading && (
                        <Typography variant="body1" color="textSecondary" sx={{ textAlign: 'center' }}>
                            Không có đơn hàng với số điện thoại này.
                        </Typography>
                    )
                )}
            </Box>
            <OrderDialog
                open={openOrderDialog}
                onClose={() => setOpenOrderDialog(false)}
                order={selectedOrder}
                mode="view"
            />
        </>
    );
};

export default OrderTracking;