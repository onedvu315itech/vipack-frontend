import React, { useEffect, useState } from 'react';
import { Container, TextField, Button, Paper, Box, Typography, RadioGroup, FormControlLabel, Radio } from '@mui/material';
import { toast } from 'react-toastify';
import blogServices from 'services/blogServices';
import { useParams } from 'react-router-dom';
import MainCard from 'components/MainCard';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import FileUpload from 'components/FileUpload';
import BlogDesign from './design-details/BlogDesign';

const BlogView = () => {
    const { slug } = useParams();
    const [blog, setBlog] = useState({ title: '', content: '', status: '', createdAt: '' });
    const [isEditMode, setIsEditMode] = useState(false);
    const [imageInputType, setImageInputType] = useState('file');
    const [uploadedImageUrl, setUploadedImageUrl] = useState('');
    const [inputImageUrl, setInputImageUrl] = useState('');

    useEffect(() => {
        const getBlog = async () => {
            try {
                let resOfBlog = await blogServices.getBlogsById(slug);
                setBlog(resOfBlog.data);
            } catch (error) {
                toast.error('Blog này không còn tồn tại');
            }
        };

        getBlog();
    }, [slug]);

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

    const handleEditToggle = () => {
        setIsEditMode(prev => !prev);
    };

    const handleActivate = async (status) => {
        if (status === 'active') {
            toast.success('Ẩn Blog thành công');
        } else if (status === 'inactive') {
            toast.success('Kích hoạt Blog thành công');
        } else {
            toast.error('Lỗi không thao tác được');
        }
    };

    const handleContentChange = (content) => {
        setBlog(prev => ({ ...prev, content }));
    };

    const handleTitleChange = (event) => {
        setBlog(prev => ({ ...prev, title: event.target.value }));
    };

    const handleSave = async () => {
        try {
            let finalImageUrl = imageInputType === 'file' ? uploadedImageUrl : inputImageUrl;
            let finalBlog = { ...blog, imageUrl: finalImageUrl };
            console.log(finalBlog)
            await blogServices.updateBlog(slug, finalBlog);
            toast.success('Cập nhật thành công');
            setIsEditMode(false);
        } catch (error) {
            toast.error('Cập nhật thất bại');
        }
    };

    const handleCancel = () => {
        setIsEditMode(false);
    }

    const getBlogStatus = (status) => {
        if (status === 'active') {
            return { text: 'Đã kích hoạt', color: '#28a745' };
        }
        if (status === 'inactive') {
            return { text: 'Chưa kích hoạt', color: 'red' };
        }
        return { text: 'Trạng thái không xác định' };
    };

    if (!blog.title) {
        return <div>Loading...</div>;
    }

    const statusInfo = getBlogStatus(blog.status);

    return (
        <>
            <MainCard>
                <Container maxWidth="xl" style={{ marginTop: '20px' }}>
                    <Paper elevation={3} style={{ padding: '20px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                            <div>
                                <Typography variant="h6"
                                    sx={{
                                        color: statusInfo.color,
                                        fontWeight: 'bold',
                                        border: `1px solid ${statusInfo.color}`,
                                        borderRadius: '20px',
                                        padding: '8px 12px',
                                        display: 'inline-block',
                                        mb: 2
                                    }}>
                                    {statusInfo.text}
                                </Typography>
                                <TextField
                                    label="Ngày tạo"
                                    value={new Date(blog.createdAt).toLocaleDateString('en-GB')}
                                    disabled
                                    variant="outlined"
                                    style={{ marginBottom: '10px', width: '200px', display: 'block' }}
                                />
                            </div>
                            <Button
                                onClick={() => handleActivate(blog.status)}
                                color="secondary"
                                variant="contained"
                            >
                                {blog.status === 'active' ? 'Ẩn Blog' : 'Kích hoạt Blog'}
                            </Button>
                        </div>
                        <TextField
                            label="Tiêu đề"
                            value={blog.title}
                            onChange={handleTitleChange}
                            disabled={!isEditMode}
                            variant="outlined"
                            fullWidth
                            style={{ marginTop: '20px' }}
                        />
                        {isEditMode ? (
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
                                style={{ height: '300px', marginTop: '20px', marginBottom: '60px' }}
                            />
                        ) : (
                            <Box sx={{ border: '1px solid #000', borderRadius: '5px', p: 2, mt: 4 }}>
                                <div
                                    style={{ marginTop: '20px' }}
                                    dangerouslySetInnerHTML={{ __html: blog.content }}
                                />
                            </Box>
                        )}

                        {blog.imageUrl && (
                            <div style={{ marginBottom: '20px' }}>
                                <Typography variant="h6" gutterBottom fontWeight="bold">
                                    Hình ảnh:
                                </Typography>
                                <img
                                    src={blog.imageUrl}
                                    alt="Blog Image"
                                    style={{ width: '200px', height: '120px', objectFit: 'cover', borderRadius: '20px' }}
                                />
                            </div>
                        )}

                        {
                            isEditMode ? (
                                <div>
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
                                                style={{ width: '200px', height: '80px', marginBottom: '10px', objectFit: 'scale-down' }}
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
                                </div>
                            )
                                :
                                <div></div>
                        }

                        <div style={{ marginTop: '20px' }}>
                            {isEditMode ? (
                                <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'center', gap: '10px' }}>
                                    <Button
                                        onClick={handleSave}
                                        color="primary"
                                        variant="contained"
                                        style={{ backgroundColor: '#4caf50' }}
                                    >
                                        Lưu
                                    </Button>
                                    <Button
                                        onClick={handleCancel}
                                        color="secondary"
                                        variant="contained"
                                        style={{ backgroundColor: 'red' }}
                                    >
                                        Hủy
                                    </Button>
                                </div>
                            ) : (
                                <Button onClick={handleEditToggle} color="primary" variant="contained">Sửa</Button>
                            )}
                        </div>
                    </Paper>
                </Container>
            </MainCard>

            <BlogDesign blogId={slug} />
        </>
    );
};

export default BlogView;