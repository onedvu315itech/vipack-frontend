import React, { useEffect, useState } from 'react';
import { Container, TextField, Button, Paper, Typography, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { toast } from 'react-toastify';
import productServices from 'services/productServices';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import FileUpload from 'components/FileUpload';
import categoryServices from 'services/categoryServices';
import { useNavigate } from 'react-router-dom';

const ProductCreate = () => {
    const navigate = useNavigate();
    const [product, setProduct] = useState({ name: '', brand: '', description: '', price: '', category: '', quantity: '' });
    const [categories, setCategories] = useState([]);
    const [uploadedImageUrl, setUploadedImageUrl] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            await getCategory();
        };
        fetchData();
    }, []);

    const getCategory = async () => {
        let resOfCategory = await categoryServices.getCategory();
        if (resOfCategory.data) {
            setCategories(resOfCategory.data)
        }
    }

    const handleChange = (event) => {
        const { name, value } = event.target;
        setProduct(prev => ({ ...prev, [name]: value }));
    };

    const handleContentChange = (content) => {
        setProduct(prev => ({ ...prev, description: content }));
    };

    const handleImageUpload = (url) => {
        setUploadedImageUrl(url);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const finalProduct = { ...product, image: uploadedImageUrl };
        try {
            await productServices.createProduct(finalProduct);
            navigate('/admin/products');
            toast.success('Sản phẩm đã được tạo thành công');
        } catch (error) {
            toast.error('Lỗi khi tạo sản phẩm');
        }
    };

    return (
        <Container maxWidth="sm" style={{ marginTop: '20px' }}>
            <Paper elevation={3} style={{ padding: '20px' }}>
                <Typography variant="h4" gutterBottom fontWeight='bold'>
                    Tạo Sản Phẩm Mới
                </Typography>
                <form onSubmit={handleSubmit}>
                    <TextField
                        label="Tên sản phẩm"
                        name="name"
                        value={product.name}
                        onChange={handleChange}
                        variant="outlined"
                        fullWidth
                        required
                        style={{ marginBottom: '20px' }}
                    />
                    <TextField
                        label="Thương hiệu"
                        name="brand"
                        value={product.brand}
                        onChange={handleChange}
                        variant="outlined"
                        fullWidth
                        required
                        style={{ marginBottom: '20px' }}
                    />
                    <FormControl variant="outlined" fullWidth required style={{ marginBottom: '20px' }}>
                        <InputLabel id="category-label">Danh mục</InputLabel>
                        <Select
                            labelId="category-label"
                            name="category"
                            value={product.category}
                            onChange={handleChange}
                            label="Danh mục"
                        >
                            {categories && categories.map(category => (
                                <MenuItem key={category._id} value={category._id}>
                                    {category.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <TextField
                        label="Số lượng"
                        name="quantity"
                        value={product.quantity}
                        onChange={handleChange}
                        variant="outlined"
                        fullWidth
                        required
                        type="number"
                        style={{ marginBottom: '20px' }}
                    />
                    <TextField
                        label="Giá sản phẩm"
                        name="price"
                        value={product.price}
                        onChange={handleChange}
                        variant="outlined"
                        fullWidth
                        required
                        type="number"
                        style={{ marginBottom: '20px' }}
                    />
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
                        style={{ height: '300px', marginBottom: '60px' }}
                    />
                    <FileUpload
                        storageLocation='products-image'
                        getFile={handleImageUpload}
                    />
                    <Button
                        type="submit"
                        variant="contained"
                        color="success"
                        style={{ marginTop: '10px' }}
                    >
                        Tạo Sản Phẩm
                    </Button>
                </form>
            </Paper>
        </Container>
    );
};

export default ProductCreate;