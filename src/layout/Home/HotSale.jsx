import React from 'react';
import { Box, Typography, useTheme, useMediaQuery } from '@mui/material';
import { styled } from '@mui/system';
import { Link } from 'react-router-dom';

const ImageContainer = styled(Box)(({ theme }) => ({
    width: '555px',
    height: '800px',
    overflow: 'hidden',
    position: 'relative',
    [theme.breakpoints.down('sm')]: {
        width: '350px',
        height: '500px',
        marginBottom: '5px'
    },
}));

const ZoomImage = styled('img')({
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    transition: 'transform 3s ease',
    position: 'absolute',
    top: 0,
    left: 0,
    '&:hover': {
        transform: 'scale(1.1)',
    },
});

const HotSale = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    return (
        <Box textAlign="center" sx={{ padding: isMobile ? 1 : 4, pb: 0 }}>
            <Typography variant="h4" gutterBottom sx={{ fontWeight: 600 }}>
                SẢN PHẨM TỐT NHẤT TẠI WEB
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
                Duy nhất tại website vipack.vercel.app mọi sản phẩm được đảm bảo giá trị về hình ảnh và câu chuyện
            </Typography>
            <Box
                sx={{
                    display: isMobile ? 'block' : 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: 2,
                }}
            >
                <Link to="/shop">
                    <ImageContainer>
                        <ZoomImage src="https://firebasestorage.googleapis.com/v0/b/vipack-project.appspot.com/o/home-page%2FIMG_0032.jpg?alt=media&token=7585b5ea-497d-43dc-9786-590da10b7a5b" alt="Product 1" />
                    </ImageContainer>
                </Link>
                <Link to="/shop">
                    <ImageContainer>
                        <ZoomImage src="https://firebasestorage.googleapis.com/v0/b/vipack-project.appspot.com/o/home-page%2FIMG_0068.jpg?alt=media&token=7b1c949b-bb61-400e-8d4b-138a0dc7f0ed" alt="Product 2" />
                    </ImageContainer>
                </Link>
            </Box>
        </Box>
    );
};

export default HotSale;