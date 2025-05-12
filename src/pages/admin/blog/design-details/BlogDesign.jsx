import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Paper, Box, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import MainCard from "components/MainCard";
import { useEffect, useState } from "react";
import designServices from "services/designServices";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const BlogDesign = ({ blogId }) => {
    const navigate = useNavigate();
    const [designs, setDesigns] = useState([]);
    const [openDialog, setOpenDialog] = useState(false);
    const [designIdToDelete, setDesignIdToDelete] = useState(null);

    useEffect(() => {
        const fetchData = () => {
            getDesignByBlogId();
        };

        fetchData();
    }, [blogId]);

    const getDesignByBlogId = async () => {
        try {
            let resOfDesign = await designServices.getDetailByBlogId(blogId);
            if (resOfDesign && resOfDesign.data) {
                setDesigns(resOfDesign.data);
            }
        } catch (error) {
            toast.error("Không thể tải chi tiết  thiết kế!");
            console.error(error);
        }
    };

    const handleView = (designId) => {
        navigate(`/admin/blogs/${blogId}/design-details/${designId}`);
    };

    const handleDeleteDialogOpen = (designId) => {
        setDesignIdToDelete(designId);
        setOpenDialog(true);
    };

    const handleDialogClose = () => {
        setOpenDialog(false);
        setDesignIdToDelete(null);
    };

    const handleDelete = async () => {
        if (designIdToDelete) {
            try {
                await designServices.deleteDetail(designIdToDelete);
                toast.success("Xóa chi tiết thiết kế thành công!");
                getDesignByBlogId();
                handleDialogClose();
            } catch (error) {
                toast.error("Xóa chi tiết thiết kế thất bại!");
                handleDialogClose();
            }
        }
    };

    return (
        <MainCard sx={{ mt: 4 }}>
            <Box sx={{ marginTop: '20px' }}>
                <Typography variant="h6" sx={{ fontWeight: '600', marginBottom: '16px' }}>
                    Danh sách chi tiết thiết kế cho Blog:
                </Typography>
                <Button
                    variant="contained"
                    color="success"
                    onClick={() => navigate(`/admin/blogs/${blogId}/design-details/create-design-detail`)}
                    sx={{ mb: 4 }}
                >
                    Tạo Chi Tiết Thiết Kế
                </Button>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                {["ID", "Tiêu đề", "Hình ảnh", "Ngày tạo", ""].map((header) => (
                                    <TableCell
                                        key={header}
                                        sx={{
                                            backgroundColor: '#7850c4',
                                            color: '#ffffff',
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis',
                                            whiteSpace: 'nowrap',
                                        }}
                                    >
                                        <Typography variant="h6" sx={{ fontWeight: 600 }}>
                                            {header}
                                        </Typography>
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {designs && designs.map((design) => {
                                return (
                                    <TableRow key={design._id}>
                                        <TableCell>{design._id}</TableCell>
                                        <TableCell>{design.title}</TableCell>
                                        <TableCell>
                                            {design.image ? (
                                                <img
                                                    src={design.image}
                                                    alt="Design"
                                                    style={{
                                                        width: '50px',
                                                        height: '50px',
                                                        objectFit: 'cover',
                                                        borderRadius: '5px',
                                                    }}
                                                />
                                            ) : (
                                                <Typography variant="body2" color="textSecondary">Chưa có hình ảnh</Typography>
                                            )}
                                        </TableCell>
                                        <TableCell>{new Date(design.createdAt).toLocaleDateString('en-GB')}</TableCell>
                                        <TableCell>
                                            <Box display="flex" gap={1}>
                                                <Button
                                                    variant="contained"
                                                    color="primary"
                                                    onClick={() => handleView(design._id)}
                                                    style={{ background: '#7850c4' }}
                                                >
                                                    Xem
                                                </Button>
                                                <Button
                                                    variant="contained"
                                                    onClick={() => handleDeleteDialogOpen(design._id)}
                                                    style={{ background: 'red' }}
                                                >
                                                    Xóa
                                                </Button>
                                            </Box>
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>

            <Dialog
                open={openDialog}
                onClose={handleDialogClose}
                aria-labelledby="delete-confirmation-dialog"
            >
                <DialogTitle id="delete-confirmation-dialog">
                    Xác nhận xóa
                </DialogTitle>
                <DialogContent>
                    <Typography variant="body1">
                        Bạn có chắc chắn muốn xóa thiết kế này không?
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDialogClose} color="primary">
                        Hủy
                    </Button>
                    <Button onClick={handleDelete} color="secondary">
                        Xóa
                    </Button>
                </DialogActions>
            </Dialog>
        </MainCard>
    );
};

export default BlogDesign;