import { useEffect, useState } from 'react';
import {
    Box,
    Typography,
    Grid,
    Paper,
    Container,
    Button,
} from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import shopServices from 'services/shopServices';
import Star from '@mui/icons-material/Star';
import StarHalf from '@mui/icons-material/StarHalf';
import StarOutline from '@mui/icons-material/StarOutline';

const formatPrice = (price) => {
    return price.toLocaleString('vi-VN');
};

const renderStarRating = (rating, fontSize) => {
    let numOfStars = Math.floor(rating);
    let hasHalfStar = rating % 1 !== 0;
    let stars = [];
    for (let i = 0; i < numOfStars; i++) {
        stars.push(<Star fontSize='small' key={i} sx={{ color: 'rgb(255, 187, 82)', fontSize: fontSize }} />);
    }
    if (hasHalfStar) {
        stars.push(<StarHalf fontSize='small' key={numOfStars} sx={{ color: 'rgb(255, 187, 82)', fontSize: fontSize }} />);
        numOfStars++;
    }
    for (let i = numOfStars; i < 5; i++) {
        stars.push(<StarOutline fontSize='small' key={i} sx={{ color: 'rgb(255, 187, 82)', fontSize: fontSize }} />);
    }
    return stars;
};

const ProductDetail = () => {
    const { slug } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState({});
    const [relatedProducts, setRelatedProducts] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const itemsPerPage = 5;

    useEffect(() => {
        const fetchData = async () => {
            await getProductById();
            await getRelatedProducts();
        };

        fetchData();
    }, [slug]);

    const getProductById = async () => {
        let resOfProduct = await shopServices.getAllProduct('', '');
        if (resOfProduct.data) {
            let matchedProduct = resOfProduct.data.products.find(product => product._id === slug);
            if (matchedProduct) {
                setProduct(matchedProduct);
            }
        }
    };

    const getRelatedProducts = async () => {
        let resOfRelatedProducts = await shopServices.getAllProduct('', '');
        if (resOfRelatedProducts.data) {
            setRelatedProducts(resOfRelatedProducts.data.products);
        }
    };

    const handleNext = () => {
        if (currentIndex + itemsPerPage < relatedProducts.length) {
            setCurrentIndex(currentIndex + itemsPerPage);
        }
    };

    const handlePrev = () => {
        if (currentIndex - itemsPerPage >= 0) {
            setCurrentIndex(currentIndex - itemsPerPage);
        }
    };

    return (
        <Container maxWidth="lg">
            <Grid container spacing={2}>
                <Grid item xs={12} md={5} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Paper sx={{
                        display: 'flex', flexDirection: 'column',
                        justifyContent: 'center', height: '100%',
                        position: 'relative',
                        overflow: 'hidden',
                        backgroundSize: 'cover',
                    }}>
                        <img
                            src={product.image}
                            alt={product.name}
                            style={{
                                width: '100%',
                                maxWidth: '450px',
                                height: 'auto',
                                maxHeight: '500px',
                                objectFit: 'contain',
                                margin: 'auto',
                            }}
                        />
                    </Paper>
                </Grid>
                <Grid item xs={12} md={7} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%' }}>
                    <Box padding={2} border={1} borderColor="grey.300" borderRadius={2} sx={{ flexGrow: 1 }}>
                        <Typography variant="h4" sx={{ color: 'black', fontWeight: 'bold' }}>
                            {product.name}
                        </Typography>
                        <Typography variant="h6">
                            Thương hiệu: <span style={{ fontWeight: 'bold', color: 'black' }}>{product.brand}</span>
                        </Typography>
                        <Typography variant="h6">
                            Xuất xứ: <span style={{ fontWeight: 'bold', color: 'black' }}>Việt Nam</span>
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
                    </Box>
                    <Box padding={2} border={1} borderColor="grey.300" borderRadius={2} marginTop={2} sx={{ flexGrow: 1 }}>
                        <Typography variant="h6" sx={{ color: 'black', fontWeight: 'bold' }}>
                            Thông tin giao hàng
                        </Typography>
                        <Typography variant="body1">
                            Thời gian giao hàng: <span style={{ fontWeight: 'bold' }}>2-3 ngày</span>
                        </Typography>
                        <Typography variant="body1">
                            Tại địa điểm:{' '}
                            <span style={{ fontWeight: 'bold' }}>
                                Trường Đại học FPT ở TP.HCM, Nhà văn hóa sinh viên Đại học Quốc gia và các trường trong khối Đại học Quốc gia ở TP.HCM
                            </span>
                        </Typography>
                        <br />
                        <Typography variant="body1">
                            Nếu có mong muốn nhận tại các địa điểm khác ngoài các địa điểm trên vui lòng liên hệ chúng tôi qua Facebook.
                        </Typography>
                    </Box>
                    <Box padding={2} border={1} borderColor="grey.300" borderRadius={2} marginTop={2} sx={{ flexGrow: 1 }}>
                        <Typography variant="h6" sx={{ color: 'black', fontWeight: 'bold' }}>
                            Mô tả sản phẩm
                        </Typography>
                        <Box
                            component="div"
                            sx={{ textAlign: 'left', width: '100%' }}
                            dangerouslySetInnerHTML={{ __html: product.description }}
                        />
                    </Box>
                </Grid>
            </Grid>

            <Box padding={2} marginTop={4} position="relative" border={1} borderColor="grey.300" borderRadius={2} height="447.61px">
                <Typography variant="h5" sx={{ fontWeight: 'bold', marginBottom: 2 }}>
                    Tìm hiểu thêm các sản phẩm khác của chúng tôi
                </Typography>

                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '366px' }}>
                    <Box
                        onClick={handlePrev}
                        disabled={currentIndex === 0}
                        sx={{
                            position: 'absolute',
                            left: '-20px',
                            zIndex: 1,
                            borderRadius: '50%',
                            height: '40px',
                            width: '40px',
                            fontWeight: 'bold',
                            fontSize: '1.5rem',
                            bgcolor: 'white',
                            boxShadow: 2,
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'baseline',
                            justifyContent: 'center',
                            '&:hover': {
                                bgcolor: 'grey.200',
                            },
                        }}
                    >
                        {'<'}
                    </Box>
                    <Box
                        sx={{
                            display: 'flex',
                            transition: 'transform 0.5s ease',
                            transform: `translateX(-${(currentIndex / itemsPerPage) * 100}%)`,
                            justifyContent: 'center',
                            overflow: 'hidden',
                        }}
                    >
                        {relatedProducts
                            .filter(relatedProduct => relatedProduct._id !== slug)
                            .slice(currentIndex, currentIndex + itemsPerPage)
                            .map((relatedProduct) => (
                                <Box
                                    key={relatedProduct._id}
                                    sx={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        width: '20%',
                                        padding: 1,
                                    }}
                                    onClick={() => navigate(`/shop/product/${relatedProduct._id}`)}
                                >
                                    <Paper elevation={3} sx={{ height: '350px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                                        <img
                                            src={relatedProduct.image}
                                            alt={relatedProduct.name}
                                            style={{
                                                width: '100%',
                                                height: '200px',
                                                objectFit: 'contain',
                                            }}
                                        />
                                        <Box sx={{ padding: 1, flexGrow: 1 }}>
                                            <Typography
                                                variant="body1"
                                                sx={{
                                                    color: 'black',
                                                    fontWeight: 'bold',
                                                    textAlign: 'center',
                                                    display: '-webkit-box',
                                                    WebkitBoxOrient: 'vertical',
                                                    overflow: 'hidden',
                                                    WebkitLineClamp: 2,
                                                    textOverflow: 'ellipsis',
                                                    justifyContent: 'flex-start',
                                                    minHeight: '48px',
                                                }}
                                            >
                                                {relatedProduct.name}
                                            </Typography>
                                            {relatedProduct.price !== 0 ? (
                                                <Typography variant="body1" sx={{ fontWeight: 500, fontWeight: 600, color: 'red', textAlign: 'center' }}>
                                                    {relatedProduct.price && `${formatPrice(relatedProduct.price)} VND`}
                                                </Typography>
                                            ) : (
                                                <Typography variant="body1" sx={{ fontWeight: 500, fontWeight: 600, color: 'red', textAlign: 'center' }}>
                                                    {relatedProduct.category}
                                                </Typography>
                                            )}
                                            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                {renderStarRating(relatedProduct.rating, 'small')}
                                            </Box>
                                        </Box>
                                    </Paper>
                                </Box>
                            ))}
                    </Box>

                    <Box
                        onClick={handleNext}
                        disabled={currentIndex + itemsPerPage >= relatedProducts.length}
                        sx={{
                            position: 'absolute',
                            right: '-20px',
                            zIndex: 1,
                            borderRadius: '50%',
                            height: '40px',
                            width: '40px',
                            fontWeight: 'bold',
                            fontSize: '1.5rem',
                            bgcolor: 'white',
                            boxShadow: 2,
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'baseline',
                            justifyContent: 'center',
                            '&:hover': {
                                bgcolor: 'grey.200',
                            },
                        }}
                    >
                        {'>'}
                    </Box>
                </Box>
            </Box>

            <Box padding={2} border={1} borderColor="grey.300" borderRadius={2} marginTop={2} width="100%">
                <Typography variant="h6" sx={{ color: 'black', fontWeight: 'bold' }}>
                    Đánh giá
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    {renderStarRating(product.rating, 'large')}
                    <Typography variant="body1" sx={{ marginLeft: 1, color: 'text.secondary' }}>
                        ({product.numReviews} đánh giá)
                    </Typography>
                </Box>
            </Box>
        </Container>
    );
};

export default ProductDetail;