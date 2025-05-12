import React from 'react';
import { Box, Grid, Typography, Link } from '@mui/material';
import { EmailOutlined, LocationOnOutlined, PhoneEnabledOutlined } from '@mui/icons-material';
import logo from 'assets/images/logo.png';

const Footer = () => {
    return (
        <Box sx={{ backgroundColor: '#f8f8f8', padding: '20px', marginTop: '20px' }}>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Typography variant="h6" align="center">
                        <img height={100} src={logo} alt="vipack" />
                    </Typography>
                </Grid>

                <Grid container item xs={12} justifyContent="center" spacing={2}>
                    <Grid item xs={12} sm={4}>
                        <Typography variant="h6" align="center" sx={{ mb: 1, fontWeight: 600 }}>Chính sách</Typography>
                        <Link href="#" variant="body2" display="block" sx={{ mb: 1, textDecoration: 'none' }} align="center">Điều khoản sử dụng</Link>
                        <Link href="#" variant="body2" display="block" sx={{ mb: 1, textDecoration: 'none' }} align="center">Chính sách bảo mật thông tin cá nhân</Link>
                        <Link href="#" variant="body2" display="block" sx={{ mb: 1, textDecoration: 'none' }} align="center">Chính sách bảo mật thanh toán</Link>
                    </Grid>

                    <Grid item xs={12} sm={4}>
                        <Typography variant="h6" align="center" sx={{ mb: 1, fontWeight: 600 }}>Hỗ trợ</Typography>
                        <Link href="#" variant="body2" display="block" sx={{ mb: 1, textDecoration: 'none' }} align="center">Chính sách bảo hành</Link>
                        <Link href="#" variant="body2" display="block" sx={{ mb: 1, textDecoration: 'none' }} align="center">Chính sách vận chuyển</Link>
                        <Link href="#" variant="body2" display="block" sx={{ mb: 1, textDecoration: 'none' }} align="center">Phương thức thanh toán</Link>
                    </Grid>

                    <Grid item xs={12} sm={4}>
                        <Typography variant="h6" align="center" sx={{ mb: 1, fontWeight: 600 }}>Liên hệ</Typography>
                        <Typography variant="body2" align="left" sx={{ mb: 1 }}>
                            <LocationOnOutlined /> Hiện tại chúng tôi đang chạy các nền tảng Online
                        </Typography>
                        <Typography variant="body2" align="left" sx={{ mb: 1 }}>
                            <EmailOutlined /> vipack.suviet@gmail.com
                        </Typography>
                        <Typography variant="body2" align="left">
                            <PhoneEnabledOutlined /> 032 952 0048
                        </Typography>
                    </Grid>
                </Grid>
            </Grid>
        </Box>
    );
};

export default Footer;