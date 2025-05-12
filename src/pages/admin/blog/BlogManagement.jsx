import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Paper, Box } from "@mui/material";
import MainCard from "components/MainCard";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import blogServices from "services/blogServices";

const BlogManagement = () => {
    const navigate = useNavigate();
    const [blogs, setBlogs] = useState([]);

    useEffect(() => {
        getAllBlogs();
    }, []);

    const getAllBlogs = async () => {
        try {
            let resOfBlogs = await blogServices.getAllBlogs();
            if (resOfBlogs) {
                setBlogs(resOfBlogs.data);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const getBlogStatus = (status) => {
        if (status === 'active') {
            return { text: 'Đã kích hoạt', color: '#28a745' };
        }
        if (status === 'inactive') {
            return { text: 'Chưa kích hoạt', color: 'red' };
        }
        return { text: 'Trạng thái không xác định', color: 'black' };
    };

    const handleView = (slug) => {
        navigate(`${slug}`);
    };

    const handleDelete = async (blog) => {
        const confirmDelete = window.confirm("Bạn có chắc chắn muốn ẩn blog này?");
        if (confirmDelete) {
            let resOfDelete = await blogServices.deleteBlog(blog._id);
            if (resOfDelete) {
                toast.success('Bạn đã ẩn blog thành công');
                getAllBlogs();
            }
        }
    };

    const handleCreateBlog = () => {
        navigate('/admin/blogs/create-blog');
    };

    return (
        <>
            <Button
                variant="contained"
                color="success"
                onClick={handleCreateBlog}
                sx={{ mb: 4 }}
            >
                Tạo Blog
            </Button>
            <MainCard>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                {["ID", "Chủ đề", "Thời gian tạo", "Trạng thái", ""].map((header) => (
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
                            {blogs.map((blog) => {
                                let status = getBlogStatus(blog.status);
                                return (
                                    <TableRow key={blog._id}>
                                        <TableCell>{blog._id}</TableCell>
                                        <TableCell>{blog.title}</TableCell>
                                        <TableCell>{new Date(blog.createdAt).toLocaleDateString('en-GB')}</TableCell>
                                        <TableCell>
                                            <span style={{ color: status.color, fontSize: '2rem', verticalAlign: 'middle' }}>
                                                •
                                            </span>
                                            <span style={{ marginLeft: '5px', color: status.color }}>{status.text}</span>
                                        </TableCell>
                                        <TableCell>
                                            <Box display="flex" gap={1}>
                                                <Button
                                                    variant="contained"
                                                    color="primary"
                                                    onClick={() => handleView(blog._id)}
                                                    style={{ background: '#7850c4' }}
                                                >
                                                    Xem
                                                </Button>
                                                <Button
                                                    variant="contained"
                                                    onClick={() => handleDelete(blog)}
                                                    style={{ background: 'red' }}
                                                >
                                                    Ẩn
                                                </Button>
                                            </Box>
                                        </TableCell>
                                    </TableRow>
                                )
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
            </MainCard>
        </>
    );
};

export default BlogManagement;