import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button } from '@mui/material';

const ProductDialog = ({ open, onClose, onConfirm, productName }) => {
    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogContent>
                <p>Bạn có chắc chắn muốn ẩn sản phẩm: <strong>{productName}</strong>?</p>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary">
                    Hủy
                </Button>
                <Button
                    onClick={onConfirm}
                    color="success"
                    variant="contained"
                >
                    Xác nhận
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ProductDialog;
