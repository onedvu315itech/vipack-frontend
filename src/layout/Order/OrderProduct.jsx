import React, { useEffect, useState } from 'react';
import { TextField, MenuItem, Select, Button, FormControl, InputLabel, Box, Grid, Dialog, DialogActions, DialogContent, DialogTitle, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Checkbox, IconButton, Typography } from '@mui/material';
import shopServices from 'services/shopServices';
import DeleteIcon from '@mui/icons-material/Delete';
import { toast } from 'react-toastify';
import orderServices from 'services/orderServices';
import { useNavigate } from 'react-router-dom';

const OrderProduct = () => {
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [selectedProducts, setSelectedProducts] = useState([]);
    const [formData, setFormData] = useState({
        staff: 'KH',
        products: [],
        shippingAddress: {
            name: '',
            age: '',
            address: '',
            phoneNumber: '',
        },
        paymentMethod: '',
        description: ''
    });

    const [openDialog, setOpenDialog] = useState(false);
    const [openSuccessDialog, setOpenSuccessDialog] = useState(false);
    const [isRedirecting, setIsRedirecting] = useState(false);

    useEffect(() => {
        const fetchData = () => {
            getProductsForSelling();
        };

        fetchData();
    }, []);

    const getProductsForSelling = async () => {
        let resOfProducts = await shopServices.getAllProduct('', '671de6c39c6278fcbe330576');
        if (resOfProducts.data.products) {
            setProducts(resOfProducts.data.products);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleQuantityChange = (index, action) => {
        let updatedProducts = [...formData.products];
        let currentProduct = updatedProducts[index];
        if (action === 'increase') {
            currentProduct.quantity += 1;
        } else if (action === 'decrease' && currentProduct.quantity > 1) {
            currentProduct.quantity -= 1;
        }
        currentProduct.total = currentProduct.quantity * currentProduct.price;
        setFormData({ ...formData, products: updatedProducts });
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            let resOfCreateOrder = await orderServices.createOrder(formData);
            let checkoutURL = resOfCreateOrder.data.paymentData.checkoutUrl;
            setFormData({
                staff: 'KH',
                products: [],
                shippingAddress: {
                    name: '',
                    age: '',
                    address: '',
                    phoneNumber: '',
                },
                paymentMethod: '',
                description: ''
            });
            toast.success('Đặt đơn hàng thành công');
            toast.warning('Đang chuyển hướng đến trang thanh toán!');
            if (formData.paymentMethod === 'Payos' && checkoutURL) {
                setIsRedirecting(true);
                setTimeout(() => {
                    window.location.href = checkoutURL;
                }, 5000);
            } else {
                setOpenSuccessDialog(true);
            }
        } catch (error) {
            console.log(error);
            toast.error('Có lỗi khi đặt đơn hàng!');
        }
    };

    const openProductDialog = () => {
        setOpenDialog(true);
    };

    const closeProductDialog = () => {
        setOpenDialog(false);
    };

    const handleSelectProduct = () => {
        let duplicateProducts = selectedProducts.filter((prod) =>
            formData.products.some((p) => p.productId === prod._id)
        );
        if (duplicateProducts.length > 0) {
            toast.error(`Có sản phẩm đã được chọn. Vui lòng kiểm tra lại!`);
        } else {
            let updatedProducts = selectedProducts.map((prod) => ({
                product: prod._id,
                image: prod.image,
                price: prod.price,
                quantity: 1,
                total: prod.price * 1,
            }));
            setFormData((prev) => ({
                ...prev,
                products: [...prev.products, ...updatedProducts],
            }));
            closeProductDialog();
        }
    };

    const handleCheckboxChange = (product) => {
        setSelectedProducts((prevSelected) => {
            let isSelected = prevSelected.some((p) => p._id === product._id);
            if (isSelected) {
                return prevSelected.filter((p) => p._id !== product._id);
            } else {
                return [...prevSelected, product];
            }
        });
    };

    const handleSelectAll = (event) => {
        if (event.target.checked) {
            setSelectedProducts(products);
        } else {
            setSelectedProducts([]);
        }
    };

    const handleDeleteProduct = (index) => {
        let updatedProducts = formData.products.filter((_, idx) => idx !== index);
        setFormData((prev) => ({
            ...prev,
            products: updatedProducts,
        }));
    };

    const formatPrice = (price) => {
        if (price) {
            return new Intl.NumberFormat('vi-VN', {
                currency: 'VND',
            }).format(price);
        } else {
            return 0;
        }
    };

    const closeSuccessDialog = () => {
        setOpenSuccessDialog(false);
    };

    const handleExploreProducts = () => {
        navigate('/shop');
        closeSuccessDialog();
    };

    const handleCheckOrder = () => {
        navigate('/order-tracking');
        closeSuccessDialog();
    };

    return (
        <Box component="form" onSubmit={handleSubmit} sx={{ p: 3, maxWidth: 1200, margin: 'auto' }}>
            <h2>Đặt Mua Sản Phẩm</h2>
            <Grid container spacing={3}>
                <Grid item xs={12} md={8}>
                    <Box sx={{ border: '1px solid #ccc', padding: 2, borderRadius: '8px' }}>
                        <h3>Sản phẩm đã chọn</h3>
                        {formData && formData.products.length > 0 ? (
                            <TableContainer>
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            {["Sản phẩm", "Số lượng", "Thành tiền", ""].map((header) => (
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
                                        {formData.products.map((product, index) => (
                                            <TableRow key={index}>
                                                <TableCell>
                                                    <Box sx={{
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                    }}>
                                                        <Box sx={{ marginRight: 2 }}>
                                                            <img src={product.image} alt={product.product} width={50} />
                                                        </Box>
                                                        <Box sx={{
                                                            display: 'flex',
                                                            flexDirection: 'column',
                                                            justifyContent: 'space-between',
                                                        }}>
                                                            <Typography variant="body2" sx={{ fontWeight: 'bold', marginBottom: 1 }}>
                                                                {product.product}
                                                            </Typography>
                                                            <Typography variant="body2" sx={{ color: 'black', fontWeight: 'bold' }}>
                                                                {formatPrice(product.price)} VND
                                                            </Typography>
                                                        </Box>
                                                    </Box>
                                                </TableCell>
                                                <TableCell>
                                                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                                        <IconButton
                                                            onClick={() => handleQuantityChange(index, 'decrease')}
                                                            size="small"
                                                            sx={{ padding: 0, minWidth: 24 }}
                                                        >
                                                            -
                                                        </IconButton>
                                                        <Typography sx={{ width: 40, textAlign: 'center' }}>
                                                            {product.quantity}
                                                        </Typography>
                                                        <IconButton
                                                            onClick={() => handleQuantityChange(index, 'increase')}
                                                            size="small"
                                                            sx={{ padding: 0, minWidth: 24 }}
                                                        >
                                                            +
                                                        </IconButton>
                                                    </Box>
                                                </TableCell>
                                                <TableCell sx={{ fontWeight: 'bold', color: 'red' }}>{formatPrice(product.total)} VND</TableCell>
                                                <TableCell>
                                                    <IconButton onClick={() => handleDeleteProduct(index)} color="error">
                                                        <DeleteIcon />
                                                    </IconButton>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        ) : (
                            <p>Chưa chọn sản phẩm nào</p>
                        )}
                        <Button variant="contained" onClick={openProductDialog} sx={{ marginTop: 2 }}>
                            Chọn sản phẩm
                        </Button>
                    </Box>
                </Grid>

                <Grid item xs={12} md={4}>
                    <Box sx={{ border: '1px solid #ccc', padding: 2, borderRadius: '8px', marginBottom: 2 }}>
                        <h3>Địa chỉ giao hàng</h3>
                        {
                            formData && (
                                <div>
                                    <TextField
                                        fullWidth
                                        label="Tên khách hàng"
                                        name="name"
                                        value={formData.shippingAddress.name}
                                        onChange={(e) => setFormData({ ...formData, shippingAddress: { ...formData.shippingAddress, name: e.target.value } })}
                                        sx={{ marginBottom: 2 }}
                                    />
                                    <TextField
                                        fullWidth
                                        label="Tuổi"
                                        type="number"
                                        name="age"
                                        value={formData.shippingAddress.age}
                                        onChange={(e) => setFormData({ ...formData, shippingAddress: { ...formData.shippingAddress, age: e.target.value } })}
                                        sx={{ marginBottom: 2 }}
                                    />
                                    <TextField
                                        fullWidth
                                        label="Địa chỉ"
                                        name="address"
                                        value={formData.shippingAddress.address}
                                        onChange={(e) => setFormData({ ...formData, shippingAddress: { ...formData.shippingAddress, address: e.target.value } })}
                                        sx={{ marginBottom: 2 }}
                                    />
                                    <TextField
                                        fullWidth
                                        label="Số điện thoại"
                                        name="phoneNumber"
                                        value={formData.shippingAddress.phoneNumber}
                                        onChange={(e) => setFormData({ ...formData, shippingAddress: { ...formData.shippingAddress, phoneNumber: e.target.value } })}
                                        sx={{ marginBottom: 2 }}
                                    />
                                </div>
                            )
                        }
                    </Box>

                    <Box sx={{ border: '1px solid #ccc', padding: 2, borderRadius: '8px' }}>
                        <h3>Phương thức thanh toán</h3>
                        {
                            formData && (
                                <div>
                                    <FormControl fullWidth sx={{ marginBottom: 2 }}>
                                        <InputLabel id="paymentMethod-label">Phương thức thanh toán</InputLabel>
                                        <Select
                                            labelId="paymentMethod-label"
                                            value={formData.paymentMethod}
                                            name="paymentMethod"
                                            onChange={handleInputChange}
                                        >
                                            <MenuItem value="COD">Thanh toán khi nhận hàng</MenuItem>
                                            <MenuItem value="Payos">Payos</MenuItem>
                                        </Select>
                                    </FormControl>
                                    <Button variant="contained" color="success" type="submit" sx={{ marginTop: 3 }}>
                                        Đặt hàng
                                    </Button>
                                </div>
                            )
                        }
                    </Box>
                </Grid>
            </Grid>

            {isRedirecting && (
                <Box sx={{ marginTop: 2, textAlign: 'center', color: 'green' }}>
                    <Typography variant="body1">
                        Đang chuyển hướng đến trang thanh toán, vui lòng đợi...
                    </Typography>
                </Box>
            )}

            <Dialog open={openDialog} onClose={closeProductDialog}>
                <DialogTitle>Chọn sản phẩm</DialogTitle>
                <DialogContent>
                    <TableContainer>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell
                                        sx={{
                                            backgroundColor: '#7850c4',
                                            color: '#ffffff',
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis',
                                            whiteSpace: 'nowrap',
                                            maxWidth: 150,
                                        }}
                                    >
                                        <Checkbox
                                            onChange={handleSelectAll}
                                            checked={selectedProducts.length === products.length}
                                            color='warning'
                                        />
                                    </TableCell>
                                    {["Sản phẩm", "Hình ảnh", "Giá", ""].map((header) => (
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
                                {products && products.map((prod) => (
                                    <TableRow key={prod._id}>
                                        <TableCell>
                                            <Checkbox
                                                checked={selectedProducts.some((p) => p._id === prod._id)}
                                                onChange={() => handleCheckboxChange(prod)}
                                                color='warning'
                                            />
                                        </TableCell>
                                        <TableCell>{prod.name}</TableCell>
                                        <TableCell>
                                            <img src={prod.image} alt={prod.name} width={50} />
                                        </TableCell>
                                        <TableCell>{formatPrice(prod.price)} VND</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </DialogContent>
                <DialogActions>
                    <Button onClick={closeProductDialog} color="primary">
                        Hủy
                    </Button>
                    <Button onClick={handleSelectProduct} color="primary">
                        Xác nhận
                    </Button>
                </DialogActions>
            </Dialog>

            <Dialog open={openSuccessDialog} onClose={closeSuccessDialog}>
                <DialogTitle>
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                        Cảm ơn bạn đã ủng hộ sản phẩm của VIPACK. Chúc bạn một ngày tốt lành! <span role="img" aria-label="smile">😊</span>
                    </Typography>
                </DialogTitle>
                <DialogContent>
                    <Typography variant="body2" color="textSecondary">
                        Bạn có thể khám phá thêm các sản phẩm hoặc kiểm tra tình trạng đơn hàng của bạn.
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleExploreProducts} color="primary">
                        Khám phá thêm các sản phẩm
                    </Button>
                    <Button onClick={handleCheckOrder} color="primary">
                        Kiểm tra đơn hàng của bạn
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default OrderProduct;