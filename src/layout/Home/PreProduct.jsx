import React, { useEffect, useState } from 'react';
import { Box, Typography, useMediaQuery, useTheme } from '@mui/material';
import shopServices from 'services/shopServices';
import { useNavigate } from 'react-router-dom';

const PreProduct = () => {
    const navigate = useNavigate();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const [preProducts, setPreProducts] = useState([]);

    useEffect(() => {
        const fetchData = () => {
            getPreProducts();
        };

        fetchData();
    }, []);

    const getPreProducts = async () => {
        let resOfPreProducts = await shopServices.getAllProduct('', '6728e7303fe9e28a1ea1dc23');
        if (resOfPreProducts.data.products) {
            setPreProducts(resOfPreProducts.data.products);
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
                SẢN PHẨM SẮP RA MẮT
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
                {preProducts && preProducts.slice(0, 6).map((product) => (
                    <Box key={product.id} sx={{ textAlign: 'center', width: '100%', mb: 4 }}>
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
                    </Box>
                ))}
            </Box>
        </Box>
    );
};

export default PreProduct;
