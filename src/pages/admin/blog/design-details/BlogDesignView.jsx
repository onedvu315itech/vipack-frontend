import React, { useEffect, useState } from 'react';
import { Container, TextField, Button, Paper, Box, Typography } from '@mui/material';
import { toast } from 'react-toastify';
import designServices from 'services/designServices';
import { useParams } from 'react-router-dom';
import MainCard from 'components/MainCard';
import FileUpload from 'components/FileUpload';

const BlogDesignView = () => {
    const { slug } = useParams();
    const [design, setDesign] = useState({ title: '', description: '', image: '', blogId: '' });
    const [isEditMode, setIsEditMode] = useState(false);
    const [uploadedImageUrl, setUploadedImageUrl] = useState('');

    useEffect(() => {
        const getDesignDetails = async () => {
            try {
                let res = await designServices.getDetailById(slug);
                setDesign(res.data);
            } catch (error) {
                toast.error('Không thể tải thông tin chi tiết thiết kế');
            }
        };

        getDesignDetails();
    }, [slug]);

    const handleImageUpload = (url) => {
        setUploadedImageUrl(url);
    };

    const handleEditToggle = () => {
        setIsEditMode(prev => !prev);
    };

    const handleContentChange = (event) => {
        setDesign(prev => ({ ...prev, description: event.target.value }));
    };

    const handleTitleChange = (event) => {
        setDesign(prev => ({ ...prev, title: event.target.value }));
    };

    const handleSave = async () => {
        try {
            let finalDesign = {
                blogId: design.blogId,
                title: design.title,
                description: design.description,
                image: uploadedImageUrl || design.image,
            };
            await designServices.updateDetail(slug, finalDesign);
            toast.success('Cập nhật chi tiết thiết kế thành công');
            setIsEditMode(false);
        } catch (error) {
            toast.error('Cập nhật chi tiết thiết kế thất bại');
            console.log(error);
        }
    };

    const handleCancel = () => {
        setIsEditMode(false);
    };

    return (
        <MainCard>
            <Container maxWidth="xl" style={{ marginTop: '20px' }}>
                <Paper elevation={3} style={{ padding: '20px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <div>
                            <TextField
                                label="Ngày tạo"
                                value={new Date(design.createdAt).toLocaleDateString('en-GB')}
                                disabled
                                variant="outlined"
                                style={{ marginBottom: '10px', width: '200px', display: 'block' }}
                            />
                        </div>
                    </div>

                    <TextField
                        label="Tiêu đề chi tiết thiết kế"
                        value={design.title}
                        onChange={handleTitleChange}
                        disabled={!isEditMode}
                        variant="outlined"
                        fullWidth
                        style={{ marginTop: '20px' }}
                    />

                    <TextField
                        label="Mô tả chi tiết thiết kế"
                        value={design.description}
                        onChange={handleContentChange}
                        disabled={!isEditMode}
                        variant="outlined"
                        fullWidth
                        multiline
                        rows={4}
                        style={{ marginTop: '20px', marginBottom: '20px' }}
                    />

                    <div style={{ marginBottom: '20px', marginTop: '20px' }}>
                        <Typography variant="h6" gutterBottom fontWeight="bold">
                            Hình ảnh chi tiết thiết kế:
                        </Typography>
                        {uploadedImageUrl ? (
                            <img
                                src={uploadedImageUrl}
                                alt="Hình ảnh đã chọn"
                                style={{ width: '200px', height: '200px', objectFit: 'cover', borderRadius: '30px' }}
                            />
                        ) : (
                            design.image && (
                                <img
                                    src={design.image}
                                    alt="Design Image"
                                    style={{ width: '200px', height: '200px', objectFit: 'cover', borderRadius: '30px' }}
                                />
                            )
                        )}
                    </div>

                    {isEditMode && (
                        <div style={{ marginBottom: '20px' }}>
                            <FileUpload
                                storageLocation="design-details-image"
                                getFile={handleImageUpload}
                            />
                        </div>
                    )}

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
                            <Button onClick={handleEditToggle} color="success" variant="contained">Sửa</Button>
                        )}
                    </div>
                </Paper>
            </Container>
        </MainCard>
    );
};

export default BlogDesignView;