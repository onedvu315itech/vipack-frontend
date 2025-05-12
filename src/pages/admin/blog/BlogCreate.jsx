import React, { useState } from 'react';
import { Container, TextField, Button, Paper, Typography, Radio, RadioGroup, FormControlLabel } from '@mui/material';
import { toast } from 'react-toastify';
import blogServices from 'services/blogServices';
import { useNavigate } from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import FileUpload from 'components/FileUpload';

const BlogCreate = () => {
    const navigate = useNavigate();
    const [blog, setBlog] = useState({ title: '', content: '' });
    const [imageInputType, setImageInputType] = useState('file');
    const [uploadedImageUrl, setUploadedImageUrl] = useState('');
    const [inputImageUrl, setInputImageUrl] = useState('');

    const handleChange = (event) => {
        const { name, value } = event.target;
        setBlog(prev => ({ ...prev, [name]: value }));
    };

    const handleContentChange = (content) => {
        setBlog(prev => ({ ...prev, content }));
    };

    const handleImageInputTypeChange = (event) => {
        setImageInputType(event.target.value);
    };

    const handleImageUpload = (url) => {
        setUploadedImageUrl(url);
        setInputImageUrl(url);
    };

    const handleInputImageUrlChange = (event) => {
        setInputImageUrl(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        let finalImageUrl = imageInputType === 'file' ? uploadedImageUrl : inputImageUrl;
        let finalBlog = { ...blog, imageUrl: finalImageUrl };
        try {
            let resOfCreate = await blogServices.createNewBlog(finalBlog);
            if (resOfCreate.data) {
                navigate('/admin/blogs');
                toast.success('Blog đã được tạo thành công');
            }
        } catch (error) {
            toast.error('Lỗi khi tạo blog');
        }
    };

    return (
        <Container maxWidth="sm" style={{ marginTop: '20px' }}>
            <Paper elevation={3} style={{ padding: '20px' }}>
                <Typography variant="h4" gutterBottom fontWeight='bold'>
                    Tạo Blog Mới
                </Typography>
                <form onSubmit={handleSubmit}>
                    <TextField
                        label="Tiêu đề"
                        name="title"
                        value={blog.title}
                        onChange={handleChange}
                        variant="outlined"
                        fullWidth
                        required
                        style={{ marginBottom: '20px' }}
                    />
                    <ReactQuill
                        value={blog.content}
                        onChange={handleContentChange}
                        modules={{
                            toolbar: [
                                [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
                                ['bold', 'italic', 'underline'],
                                ['clean'],
                            ],
                        }}
                        style={{ height: '300px', marginBottom: '60px' }}
                    />

                    <Typography variant="h6" gutterBottom fontWeight='bold'>
                        Thêm hình ảnh:
                    </Typography>
                    <RadioGroup
                        row
                        value={imageInputType}
                        onChange={handleImageInputTypeChange}
                    >
                        <FormControlLabel value="file" control={<Radio />} label="Tải lên tệp" />
                        <FormControlLabel value="url" control={<Radio />} label="Nhập URL" />
                    </RadioGroup>

                    {imageInputType === 'file' && uploadedImageUrl && (
                        <div style={{ marginBottom: '20px' }}>
                            <img
                                src={uploadedImageUrl}
                                alt="Hình ảnh đã chọn"
                                style={{ width: '200px', height: '80px', marginBottom: '10px', objectFit: 'scale-down', borderRadius: '20px' }}
                            />
                        </div>
                    )}

                    {imageInputType === 'file' ? (
                        <FileUpload
                            storageLocation='blogs-image1'
                            getFile={handleImageUpload}
                        />
                    ) : (
                        <TextField
                            label="URL hình ảnh"
                            name="imageUrl"
                            value={inputImageUrl}
                            onChange={handleInputImageUrlChange}
                            variant="outlined"
                            fullWidth
                        />
                    )}

                    <Button
                        type="submit"
                        variant="contained"
                        color="success"
                        style={{ marginTop: '10px' }}
                    >
                        Tạo Blog
                    </Button>
                </form>
            </Paper>
        </Container>
    );
};

export default BlogCreate;