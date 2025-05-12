import { Card, CardMedia, CardContent, Typography, Grid, useMediaQuery, useTheme } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import shopServices from 'services/shopServices';

const formatPrice = (price) => {
    return price.toLocaleString('vi-VN');
};

const Products = ({ filterCategory }) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const navigate = useNavigate();

    const [listOfProduct, setListOfProduct] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            await getAllProduct();
        };

        fetchData();
    }, [filterCategory]);

    const getAllProduct = async () => {
        let res;

        if (filterCategory === "all") {
            res = await shopServices.getAllProduct('', '');
        } else {
            res = await shopServices.getAllProduct('', filterCategory);
            console.log(filterCategory)
        }

        if (res) {
            setListOfProduct(res.data.products);
        }
    };

    const handleImageClick = (id) => {
        navigate(`/shop/product/${id}`);
    };

    return (
        <Grid container spacing={isMobile ? 2 : 3} justifyContent="center" mt={4} sx={{ paddingX: 2 }}>
            {listOfProduct && listOfProduct.map((product) => (
                <Grid item xs={12} sm={6} md={4} lg={4} key={product._id} sx={{ display: 'flex', justifyContent: 'center', marginBottom: 3 }}>
                    <Card sx={{ width: '450px', height: '100%', boxShadow: 3, borderRadius: 2 }}>
                        <CardMedia
                            component="img"
                            image={product.image}
                            alt={product.name}
                            sx={{
                                width: '100%',
                                height: 400,
                                objectFit: 'contain',
                                cursor: 'pointer',
                            }}
                            onClick={() => handleImageClick(product._id)}
                        />
                        <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                            <Typography variant="h6" sx={{ fontWeight: 600, marginBottom: 1 }}>
                                {product.name}
                            </Typography>
                            {
                                product.price !== 0 ? (
                                    <Typography variant="body1" sx={{ fontWeight: 500, fontWeight: 600, color: 'red' }}>
                                        {product.price && `${formatPrice(product.price)} VND`}
                                    </Typography>
                                )
                                    :
                                    (<Typography variant="body1" sx={{ fontWeight: 500, fontWeight: 600, color: 'red' }}>
                                        {product.category}
                                    </Typography>)
                            }
                        </CardContent>
                    </Card>
                </Grid>
            ))}
        </Grid>
    );
};

export default Products;