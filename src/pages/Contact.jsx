import React from 'react';
import { Container, Typography, Grid, Box, Link } from '@mui/material';
import { CopyrightOutlined } from '@mui/icons-material';
import Header from 'layout/Home/Header';
import Footer from 'layout/Home/Footer';

const Contact = () => {
    return (
        <>
            <Header />
            <Container maxWidth="lg" sx={{ marginTop: 4 }}>
                <Grid container spacing={4}>
                    <Grid item xs={12}>
                        <Typography variant="h3" component="h1" align="center" gutterBottom>
                            Liên Hệ Với Chúng Tôi
                        </Typography>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <Box
                            p={3}
                            sx={{
                                backgroundColor: '#f5f5f5',
                                borderRadius: 2,
                                height: '200px',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'flex-start'
                            }}
                        >
                            <Typography variant="h6" gutterBottom>
                                <strong>Email Hỗ Trợ:</strong>
                            </Typography>
                            <Typography>
                                Để được hỗ trợ tốt nhất, vui lòng gửi email tới:
                                <br />
                                <Link href="mailto:vipack.suviet@gmail.com">vipack.suviet@gmail.com</Link>
                            </Typography>
                        </Box>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <Box
                            p={3}
                            sx={{
                                backgroundColor: '#f5f5f5',
                                borderRadius: 2,
                                height: '200px',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'flex-start'
                            }}
                        >
                            <Typography variant="h6" gutterBottom>
                                <strong>Hỗ Trợ Thanh Toán:</strong>
                            </Typography>
                            <Typography>
                                Hiện tại, trên website <strong>vipack.vercel.app</strong> chỉ hỗ trợ thanh toán qua Payos.
                            </Typography>
                            <Typography>
                                Để sử dụng các phương thức thanh toán khác, vui lòng liên hệ trực tiếp qua fanpage:{' '}
                                <Link href="https://www.facebook.com/Vipack.suviet" target="_blank">VIPACK</Link>
                            </Typography>
                        </Box>
                    </Grid>

                    <Grid item xs={12}>
                        <Box
                            p={3}
                            sx={{
                                backgroundColor: '#f5f5f5',
                                height: '200px',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'flex-start'
                            }}
                        >
                            <Typography variant="h6" gutterBottom>
                                <strong>Các Địa Chỉ Hỗ Trợ Gần Bạn:</strong>
                            </Typography>
                            <Typography>
                                Nếu bạn ở gần các địa điểm dưới đây, chúng tôi có thể hỗ trợ bạn nhanh chóng:
                            </Typography>
                            <ul>
                                <li>Đại học FPT HCM</li>
                                <li>Nhà văn hóa sinh viên tại Làng Đại học Quốc gia TP.HCM</li>
                                <li>Vinhomes Grand Park, Quận 9</li>
                            </ul>
                        </Box>
                    </Grid>

                    <Grid item xs={12}>
                        <Box p={3} sx={{ textAlign: 'center', backgroundColor: '#f5f5f5', borderRadius: 2 }}>
                            <Typography variant="body2">
                                <CopyrightOutlined /> 2024 VIPACK. Tất cả quyền lợi được bảo lưu.
                            </Typography>
                        </Box>
                    </Grid>
                </Grid>
            </Container>
            <Footer />
        </>
    );
};

export default Contact;