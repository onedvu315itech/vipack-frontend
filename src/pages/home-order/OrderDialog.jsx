import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography, Box, Grid, TableContainer, Table, TableHead, TableCell, TableRow, TableBody, Paper } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { Person2Outlined as PersonIcon, PaymentOutlined as PaymentIcon, LocalShippingOutlined as ShipmentIcon } from '@mui/icons-material';
import MomoIcon from 'assets/images/momo.png';
import CodIcon from 'assets/images/cod.png';
import PayosIcon from 'assets/images/payos.png';
import DefaultIcon from 'assets/images/else.png';
import shopServices from "services/shopServices";

const OrderDialog = ({ open, onClose, order }) => {
    const firstButtonRef = useRef(null);
    const [products, setProducts] = useState([]);

    useEffect(() => {
        if (open && firstButtonRef.current) {
            firstButtonRef.current.focus();
        }
    }, [open]);

    useEffect(() => {
        if (open) {
            fetchData();
        }
    }, [open]);

    const fetchData = async () => {
        let resOfProducts = await shopServices.getAllProduct('', '');
        if (resOfProducts.data.products) {
            let matchedProducts = order.products.map(orderProduct => {
                let product = resOfProducts.data.products.find(p => p._id === orderProduct.product._id);
                return {
                    ...orderProduct,
                    product: {
                        ...product,
                        quantity: orderProduct.quantity
                    }
                };
            });
            setProducts(matchedProducts);
        }
    };

    if (!order) return null;

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

    const handleConfirm = async () => {

    }

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

    const status = getOrderStatus(order.isPaid, order.isDelivered);
    const paymentMethod = getPaymentMethod(order.paymentMethod);

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="lg">
            <DialogTitle>Chi tiết đơn hàng</DialogTitle>
            <DialogContent>
                <Grid container spacing={4}>
                    <Grid item xs={12} mb={4}>
                        <Typography variant="h6" fontWeight="bold">Mã đơn hàng: {order._id}</Typography>
                        <Typography variant="h6" fontWeight="bold"><span style={{ color: 'gray' }}>{new Date(order.createdAt).toLocaleDateString('en-GB')}</span></Typography>
                        <Typography variant="h6"
                            sx={{
                                color: status.color,
                                fontWeight: 'bold',
                                border: `1px solid ${status.color}`,
                                borderRadius: '20px',
                                padding: '8px 12px',
                                display: 'inline-block',
                            }}>
                            {status.text}
                        </Typography>
                    </Grid>

                    <Grid container spacing={4} ml={0}>
                        <Grid item xs={12} md={4}>
                            <Box display="flex" alignItems="center">
                                <Box
                                    sx={{
                                        width: 60,
                                        height: 60,
                                        borderRadius: '50%',
                                        backgroundColor: '#E0E0E0',
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        marginRight: 2,
                                    }}
                                >
                                    <PersonIcon sx={{ width: 30, height: 30 }} />
                                </Box>
                                <Box>
                                    <Typography variant="h5" fontWeight="bold">Thông tin khách hàng</Typography>
                                    <Typography sx={{ color: 'gray' }}>Họ tên: <strong>{order.shippingAddress.name}</strong></Typography>
                                    <Typography sx={{ color: 'gray' }}>Tuổi: <strong>{order.shippingAddress.age}</strong></Typography>
                                    <Typography sx={{ color: 'gray' }}>Số điện thoại: <strong>{order.shippingAddress.phoneNumber}</strong></Typography>
                                </Box>
                            </Box>
                        </Grid>

                        <Grid item xs={12} md={4}>
                            <Box display="flex" alignItems="center">
                                <Box
                                    sx={{
                                        width: 60,
                                        height: 60,
                                        borderRadius: '50%',
                                        backgroundColor: '#E0E0E0',
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        marginRight: 2,
                                    }}
                                >
                                    <PaymentIcon sx={{ width: 30, height: 30 }} />
                                </Box>
                                <Box>
                                    <Typography variant="h5" fontWeight="bold">Thông tin thanh toán</Typography>
                                    <Box display="flex" alignItems="center">
                                        {paymentMethod.icon}{paymentMethod.text}
                                    </Box>
                                    <Typography sx={{ color: 'gray' }}>Tổng giá: <strong>{formatPrice(order.totalPrice)}</strong></Typography>
                                </Box>
                            </Box>
                        </Grid>

                        <Grid item xs={12} md={4}>
                            <Box display="flex" alignItems="center">
                                <Box
                                    sx={{
                                        width: 60,
                                        height: 60,
                                        borderRadius: '50%',
                                        backgroundColor: '#E0E0E0',
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        marginRight: 2,
                                    }}
                                >
                                    <ShipmentIcon sx={{ width: 30, height: 30 }} />
                                </Box>
                                <Box>
                                    <Typography variant="h5" fontWeight="bold">Thông tin giao hàng</Typography>
                                    <Typography sx={{ color: 'gray' }}>Địa chỉ giao: <strong>{order.shippingAddress.address}</strong></Typography>
                                    <Typography sx={{ color: 'gray' }}>Giao hàng: <strong>{order.isDelivered ? 'Đã giao' : 'Chưa giao'}</strong></Typography>
                                </Box>
                            </Box>
                        </Grid>
                    </Grid>

                    <Grid item xs={12}>
                        <Typography variant="h5" fontWeight="bold" mt={2} mb={4}>Sản phẩm đặt mua</Typography>
                        <TableContainer component={Paper}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        {["Tên sản phẩm", "Hình ảnh", "Số lượng", "Đơn giá"].map((header) => (
                                            <TableCell
                                                sx={{
                                                    backgroundColor: '#7850c4',
                                                    color: '#ffffff',
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
                                    {products.map((productItem) => (
                                        <TableRow key={productItem._id}>
                                            <TableCell
                                                sx={{
                                                    overflow: 'hidden',
                                                    textOverflow: 'ellipsis',
                                                    whiteSpace: 'nowrap',
                                                }}
                                            >{productItem.product.name}</TableCell>
                                            <TableCell>
                                                <img src={productItem.product.image} alt={productItem.product.name} style={{ width: '50px', height: '50px' }} />
                                            </TableCell>
                                            <TableCell>{productItem.quantity}</TableCell>
                                            <TableCell>{formatPrice(productItem.price)}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button ref={firstButtonRef} onClick={onClose} color="primary">Đóng</Button>
                <Button variant="contained" color="secondary" onClick={() => handleConfirm()}>Xác nhận giao hàng</Button>
            </DialogActions>
        </Dialog>
    );
};

export default OrderDialog;