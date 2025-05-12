import React, { useEffect, useState } from 'react';
import { Container, TextField, Button, Paper, Box, Typography, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';
import MainCard from 'components/MainCard';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import productServices from 'services/productServices';
import categoryServices from 'services/categoryServices';
import FileUpload from 'components/FileUpload';

const ProductView = () => {
    const { slug } = useParams();
    const [product, setProduct] = useState({
        name: '',
        brand: '',
        description: '',
        price: 0,
        quantity: 0,
        category: '',
        image: ''
    });
    const [categories, setCategories] = useState([]);
    const [isEditMode, setIsEditMode] = useState(false);
    const [uploadedImageUrl, setUploadedImageUrl] = useState('');

    useEffect(() => {
        const getProduct = async () => {
            try {
                const resOfProduct = await productServices.getProductById(slug);
                setProduct(resOfProduct.data);
                setUploadedImageUrl(resOfProduct.data.image);
            } catch (error) {
                toast.error('Sản phẩm này không còn tồn tại');
            }
        };

        const getCategories = async () => {
            try {
                const resOfCategory = await categoryServices.getCategory();
                setCategories(resOfCategory.data);
            } catch (error) {
                toast.error('Lỗi khi lấy danh mục');
            }
        };

        getProduct();
        getCategories();
    }, [slug]);

    const handleEditToggle = () => {
        setIsEditMode((prev) => !prev);
    };

    const handleContentChange = (content) => {
        setProduct((prev) => ({ ...prev, description: content }));
    };

    const handleFieldChange = (event) => {
        const { name, value } = event.target;
        setProduct((prev) => ({ ...prev, [name]: value }));
    };

    const handleCategoryChange = (event) => {
        setProduct((prev) => ({ ...prev, category: event.target.value }));
    };

    const handleImageUpload = (url) => {
        setUploadedImageUrl(url);
    };

    const handleSave = async () => {
        try {
            let updatedProduct = {
                ...product,
                image: uploadedImageUrl || product.image
            };

            console.log(updatedProduct)

            await productServices.updateProduct(slug, updatedProduct);
            toast.success('Cập nhật thành công');
            setIsEditMode(false);
        } catch (error) {
            toast.error('Cập nhật thất bại');
        }
    };


    const handleCancel = () => {
        setIsEditMode(false);
    };

    if (!product.name) {
        return <div>Loading...</div>;
    }

    return (
        <MainCard>
            <Container maxWidth="xl" style={{ marginTop: '20px' }}>
                <Paper elevation={3} style={{ padding: '20px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <div>
                            <TextField
                                label="Tên sản phẩm"
                                value={product.name}
                                onChange={handleFieldChange}
                                name="name"
                                disabled={!isEditMode}
                                variant="outlined"
                                fullWidth
                                style={{ marginTop: '20px' }}
                            />
                            <TextField
                                label="Thương hiệu"
                                value={product.brand}
                                onChange={handleFieldChange}
                                name="brand"
                                disabled={!isEditMode}
                                variant="outlined"
                                fullWidth
                                style={{ marginTop: '20px' }}
                            />
                            <Typography variant="h6" style={{ marginTop: '20px' }}>Mô tả:</Typography>
                            {isEditMode ? (
                                <ReactQuill
                                    value={product.description}
                                    onChange={handleContentChange}
                                    modules={{
                                        toolbar: [
                                            [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
                                            ['bold', 'italic', 'underline'],
                                            ['clean'],
                                        ],
                                    }}
                                    style={{ height: '300px', marginTop: '10px', marginBottom: '60px' }}
                                />
                            ) : (
                                <Box sx={{ border: '1px solid #000', borderRadius: '5px', p: 2, mt: 2 }}>
                                    <div
                                        style={{ marginTop: '20px' }}
                                        dangerouslySetInnerHTML={{ __html: product.description }}
                                    />
                                </Box>
                            )}
                            <TextField
                                label="Giá"
                                value={product.price}
                                onChange={handleFieldChange}
                                name="price"
                                disabled={!isEditMode}
                                variant="outlined"
                                fullWidth
                                type="number"
                                style={{ marginTop: '20px' }}
                            />
                            <TextField
                                label="Số lượng"
                                value={product.quantity}
                                onChange={handleFieldChange}
                                name="quantity"
                                disabled={!isEditMode}
                                variant="outlined"
                                fullWidth
                                type="number"
                                style={{ marginTop: '20px' }}
                            />
                            <FormControl variant="outlined" fullWidth required style={{ marginTop: '20px' }}>
                                <InputLabel id="category-label">Danh mục</InputLabel>
                                <Select
                                    labelId="category-label"
                                    name="category"
                                    value={product.category}
                                    onChange={handleCategoryChange}
                                    disabled={!isEditMode}
                                    label="Danh mục"
                                >
                                    {categories.map((category) => (
                                        <MenuItem key={category._id} value={category._id}>
                                            {category.name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            <div style={{ marginTop: '20px', display: 'flex', alignItems: 'flex-start', borderRadius: '5px' }}>
                                {uploadedImageUrl || product.image ? (
                                    <div style={{ flex: '0 0 auto', marginBottom: '20px' }}>
                                        <img
                                            src={uploadedImageUrl || product.image}
                                            alt="Product"
                                            style={{
                                                width: '100px',
                                                height: 'auto',
                                                maxHeight: '100px',
                                                objectFit: 'contain',
                                                borderRadius: '10px',
                                            }}
                                        />
                                    </div>
                                ) : null}
                            </div>
                            {
                                isEditMode ? (
                                    <div style={{ flex: 1 }}>
                                        <FileUpload
                                            storageLocation="products-image"
                                            getFile={handleImageUpload}
                                            initialImage={uploadedImageUrl}
                                        />
                                    </div>
                                )
                                    :
                                    <div></div>
                            }

                        </div>
                    </div>

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
                            <Button onClick={handleEditToggle} color="primary" variant="contained">
                                Sửa
                            </Button>
                        )}
                    </div>
                </Paper>
            </Container>
        </MainCard>
    );
};

export default ProductView;