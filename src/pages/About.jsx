import React from 'react';
import { Container, Typography, Grid, Paper, Box } from '@mui/material';
import { CopyrightOutlined } from '@mui/icons-material';
import Header from 'layout/Home/Header';
import Footer from 'layout/Home/Footer';

const About = () => {
    return (
        <>
            <Header />
            <Container maxWidth="lg" sx={{ marginTop: 4 }}>
                <Grid container spacing={4}>
                    <Grid item xs={12}>
                        <Typography variant="h3" component="h1" align="center" gutterBottom>
                            Giới Thiệu Về Chúng Tôi
                        </Typography>
                    </Grid>

                    <Grid item xs={12}>
                        <Paper elevation={3}>
                            <img
                                src="https://firebasestorage.googleapis.com/v0/b/vipack-project.appspot.com/o/home-page%2FFINAL%20BST2.png?alt=media&token=415fe63b-f09e-4672-987a-4d1a30b2b257"
                                alt="VIPACK"
                                style={{ width: '100%', height: 'auto' }}
                            />
                        </Paper>
                    </Grid>

                    <Grid item xs={12}>
                        <Box p={3}>
                            <Typography variant="h6" paragraph>
                                <span style={{ fontWeight: 'bold' }}>VIPACK</span><span style={{ marginLeft: 4 }}>®</span> là nơi mỗi sản phẩm không chỉ là một món đồ mà còn là một câu chuyện. Chúng tôi chuyên cung cấp các sản phẩm mang đậm dấu ấn văn hóa và lịch sử Việt Nam, với mục tiêu giúp mọi người khám phá và cảm nhận sự phong phú của di sản văn hóa Việt qua từng chi tiết thiết kế.
                            </Typography>
                            <Typography variant="body1" paragraph>
                                Chúng tôi tin rằng mỗi sản phẩm không chỉ mang giá trị sử dụng mà còn là một cách để kể lại câu chuyện lịch sử, truyền thống và văn hóa lâu đời của dân tộc Việt Nam. Mỗi chi tiết, mỗi hoa văn, mỗi đường nét trên sản phẩm đều được chọn lọc kỹ càng, phản ánh một phần của nền văn hóa phong phú và đa dạng của đất nước chúng tôi.
                            </Typography>
                            <Typography variant="body1" paragraph>
                                Sứ mệnh của chúng tôi là mang lại cho khách hàng những trải nghiệm không chỉ là mua sắm, mà còn là khám phá và kết nối với văn hóa Việt Nam thông qua các sản phẩm. Chúng tôi hy vọng rằng, qua từng món đồ, bạn sẽ có thể cảm nhận được tình yêu và niềm tự hào về lịch sử đất nước mình.
                            </Typography>
                            <Typography variant="body1">
                                Hãy cùng chúng tôi lan tỏa câu chuyện Việt Nam đến với thế giới qua những sản phẩm tinh tế và ý nghĩa này.
                            </Typography>
                        </Box>
                    </Grid>
                </Grid>
            </Container>
            <Footer />
        </>
    );
};

export default About;