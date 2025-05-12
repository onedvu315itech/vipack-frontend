import React, { useEffect, useState } from 'react';
import { Box, Typography, TextField, Grid, Card, CardContent, CardMedia, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Footer from "layout/Home/Footer";
import Header from "layout/Home/Header";
import blogServices from "services/blogServices";

const BlogPage = () => {
    const navigate = useNavigate();
    const [blogs, setBlogs] = useState([]);

    useEffect(() => {
        const getAllBlogs = async () => {
            let resOfBlogs = await blogServices.getAllBlogs();
            if (resOfBlogs) {
                setBlogs(resOfBlogs.data);
            }
        };

        getAllBlogs();
    }, []);

    const handleViewDetail = (slug) => {
        navigate(`/blogs/${slug}`);
    };

    return (
        <>
            <Header />
            <Box sx={{ padding: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
                    <Container>
                        <Grid container spacing={2} alignItems="center" sx={{ marginBottom: 4 }} justifyContent="center">
                            <Typography variant="h4">Việt Nam Sử Thư Đình</Typography>
                        </Grid>
                    </Container>
                </Box>

                <Grid container spacing={2} p={4}>
                    {blogs.map((blog) => (
                        <Grid item xs={12} sm={6} md={4} key={blog._id}>
                            <Card onClick={() => handleViewDetail(blog._id)} sx={{ cursor: 'pointer' }}>
                                <CardMedia
                                    component="img"
                                    height="300"
                                    image={blog.imageUrl}
                                    alt={blog.title}
                                />
                                <CardContent>
                                    <Typography variant="h6"
                                        sx={{
                                            overflow: 'hidden',
                                            whiteSpace: 'nowrap',
                                            textOverflow: 'ellipsis'
                                        }}
                                    >{blog.title}</Typography>
                                    <Typography color="textSecondary">
                                        {new Date(blog.createdAt).toLocaleDateString('en-GB')}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Box>
            <Footer />
        </>
    );
};

export default BlogPage;