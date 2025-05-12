import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Paper, Box } from "@mui/material";
import MainCard from "components/MainCard";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import shopServices from "services/shopServices";
import productServices from "services/productServices";
import ProductDialog from "pages/admin/dialog/ProductDialog";

const ProductManagement = () => {
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
    const [productToDelete, setProductToDelete] = useState(null);

    useEffect(() => {
        getAllProducts();
    }, []);

    const getAllProducts = async () => {
        try {
            let resOfProducts = await shopServices.getAllProduct('', '');
            if (resOfProducts) {
                setProducts(resOfProducts.data.products);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleView = (slug) => {
        navigate(`/admin/products/${slug}`);
    };

    const handleDeleteDialogOpen = (product) => {
        setProductToDelete(product);
        setOpenDeleteDialog(true);
    };

    const handleDelete = async () => {
        if (productToDelete) {
            let resOfDelete = await productServices.deleteProduct(productToDelete._id);
            if (resOfDelete) {
                toast.success('Bạn đã ẩn sản phẩm thành công');
                setOpenDeleteDialog(false);
                getAllProducts();
                navigate('/admin/products');
            }
        }
    };

    const handleCreateProduct = () => {
        navigate('/admin/products/create-product');
    };

    return (
        <>
            <Button
                variant="contained"
                color="success"
                onClick={handleCreateProduct}
                sx={{ mb: 4 }}
            >
                Tạo Sản Phẩm
            </Button>
            <MainCard>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                {["ID", "Tên", "Loại sản phẩm", "Số lượng", "Giá", ""].map((header) => (
                                    <TableCell
                                        sx={{
                                            backgroundColor: '#7850c4',
                                            color: '#ffffff',
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis',
                                            whiteSpace: 'nowrap',
                                            maxWidth: 150,
                                        }}
                                        key={header}
                                    >
                                        <Typography variant="h6" sx={{ fontWeight: 600 }}>{header}</Typography>
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {products && products.map((product) => (
                                <TableRow key={product._id}>
                                    <TableCell>{product._id}</TableCell>
                                    <TableCell>{product.name}</TableCell>
                                    <TableCell>{product.category}</TableCell>
                                    <TableCell>{product.quantity}</TableCell>
                                    <TableCell>{`${product.price.toLocaleString('vi-VN')} VND`}</TableCell>
                                    <TableCell>
                                        <Box display="flex" gap={1}>
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                onClick={() => handleView(product._id)}
                                                style={{ background: '#7850c4' }}
                                            >
                                                Xem
                                            </Button>
                                            <Button
                                                variant="contained"
                                                onClick={() => handleDeleteDialogOpen(product)}
                                                style={{ background: 'red' }}
                                            >
                                                Ẩn
                                            </Button>
                                        </Box>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </MainCard>

            <ProductDialog
                open={openDeleteDialog}
                onClose={() => setOpenDeleteDialog(false)}
                onConfirm={handleDelete}
                productName={productToDelete?.name}
            />
        </>
    );
};

export default ProductManagement;