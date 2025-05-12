import React, { useEffect, useState } from 'react';
import { Box, Button, Typography, useMediaQuery, useTheme } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import shopServices from 'services/shopServices';

const formatPrice = (price) => {
    return price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
};

const NewArrivals = () => {
    const navigate = useNavigate();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            await getProducts();
        }

        fetchData();
    }, []);

    const getProducts = async () => {
        let resOfProducts = await shopServices.getAllProduct('', '671de6c39c6278fcbe330576');
        if (resOfProducts.data.products) {
            setProducts(resOfProducts.data.products);
        }
    }

    const handleGetProductDetail = (slug) => {
        navigate(`/shop/product/${slug}`);
    }

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                padding: isMobile ? 1 : 4,
                pt: 3,
                width: isMobile ? '90%' : '100%',
                maxWidth: '1125px',
                margin: '0 auto'
            }}
        >
            <Typography variant="h4" gutterBottom sx={{ fontWeight: 600, pb: 2 }}>
                SẢN PHẨM MỚI
            </Typography>
            <Box
                sx={{
                    display: 'grid',
                    gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(3, 1fr)',
                    gap: isMobile ? '3px' : 4,
                    width: '100%',
                    justifyItems: 'center'
                }}
            >
                {products && products.slice(0, 6).map((product) => (
                    <Box key={product._id} sx={{ textAlign: 'center', width: '100%', mb: 4 }}>
                        <img
                            src={product.image}
                            alt={product.name}
                            style={{
                                width: isMobile ? '160px' : '100%',
                                height: isMobile ? '220px' : '400px',
                                objectFit: 'cover', cursor: 'pointer'
                            }}
                            onClick={() => handleGetProductDetail(product._id)}
                        />
                        <Typography variant="body1" sx={{ fontWeight: 600 }}>{product.name}</Typography>
                        <Typography variant="body1" sx={{ display: 'inline', mr: 1, fontWeight: 600 }}>
                            {product.price && formatPrice(product.price)}
                        </Typography>
                    </Box>
                ))}
            </Box>
            <Box sx={{ textAlign: 'center', marginTop: 2 }}>
                <Button
                    variant="outlined"
                    component={Link}
                    to="/shop"
                    sx={{
                        bgcolor: 'unset',
                        color: '#000',
                        border: '1px solid #000'
                    }}
                >
                    Xem tất cả
                </Button>
            </Box>
        </Box>
    );
};

export default NewArrivals;
