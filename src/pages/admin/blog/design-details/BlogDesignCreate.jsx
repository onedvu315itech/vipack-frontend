import React, { useState, useEffect } from 'react';
import { Container, TextField, Button, Paper, Typography, Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import { toast } from 'react-toastify';
import designServices from 'services/designServices';
import blogServices from 'services/blogServices';
import { useNavigate } from 'react-router-dom';
import FileUpload from 'components/FileUpload';

const BlogDesignCreate = () => {
    const navigate = useNavigate();
    const [design, setDesign] = useState({ title: '', description: '', blogId: '' });
    const [uploadedImageUrl, setUploadedImageUrl] = useState('');
    const [blogs, setBlogs] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchBlogs = async () => {
            setIsLoading(true);
            try {
                let res = await blogServices.getAllBlogs();
                setBlogs(res.data);
            } catch (error) {
                toast.error('Lỗi khi tải danh sách blog');
            } finally {
                setIsLoading(false);
            }
        };

        fetchBlogs();
    }, []);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setDesign(prev => ({ ...prev, [name]: value }));
    };

    const handleImageUpload = (url) => {
        setUploadedImageUrl(url);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        let finalDesign = { ...design, image: uploadedImageUrl };
        try {
            let resOfCreate = await designServices.createDetail(finalDesign);
            if (resOfCreate.data) {
                navigate(`/admin/blogs/${resOfCreate.data.blogId}`);
                toast.success('Thiết kế đã được tạo thành công');
            }
        } catch (error) {
            toast.error('Lỗi khi tạo thiết kế');
        }
    };

    return (
        <Container maxWidth="sm" style={{ marginTop: '20px' }}>
            <Paper elevation={3} style={{ padding: '20px' }}>
                <Typography variant="h4" gutterBottom fontWeight="bold">
                    Tạo Chi Tiết Thiết Kế Mới
                </Typography>
                <form onSubmit={handleSubmit}>
                    <FormControl fullWidth style={{ marginBottom: '20px' }} required>
                        <InputLabel id="blog-select-label">Chọn Blog</InputLabel>
                        <Select
                            labelId="blog-select-label"
                            id="blogId"
                            name="blogId"
                            value={design.blogId}
                            onChange={handleChange}
                            label="Chọn Blog"
                        >
                            {isLoading ? (
                                <MenuItem disabled>Đang tải...</MenuItem>
                            ) : (
                                blogs.map((blog) => (
                                    <MenuItem key={blog._id} value={blog._id}>
                                        {blog.title}
                                    </MenuItem>
                                ))
                            )}
                        </Select>
                    </FormControl>

                    <TextField
                        label="Tiêu đề chi tiết thiết kế"
                        name="title"
                        value={design.title}
                        onChange={handleChange}
                        variant="outlined"
                        fullWidth
                        required
                        style={{ marginBottom: '20px' }}
                    />

                    <TextField
                        label="Mô tả chi tiết thiết kế"
                        name="description"
                        value={design.description}
                        onChange={handleChange}
                        variant="outlined"
                        fullWidth
                        multiline
                        rows={4}
                        style={{ marginBottom: '20px' }}
                    />

                    <Typography variant="h6" gutterBottom fontWeight="bold">
                        Thêm hình ảnh chi tiết thiết kế:
                    </Typography>
                    <FileUpload
                        storageLocation="design-details-image"
                        getFile={handleImageUpload}
                    />

                    <Button
                        type="submit"
                        variant="contained"
                        color="success"
                        style={{ marginTop: '10px' }}
                    >
                        Tạo Chi Tiết Thiết Kế
                    </Button>
                </form>
            </Paper>
        </Container>
    );
};

export default BlogDesignCreate;