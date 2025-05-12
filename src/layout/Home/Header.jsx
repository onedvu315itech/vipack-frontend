import React, { useState } from 'react';
import { AccountCircleOutlined, Menu } from '@mui/icons-material';
import { AppBar, Button, Drawer, IconButton, Toolbar, TextField, useMediaQuery } from '@mui/material';
import logo from 'assets/images/logo.png';

const Header = () => {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const isMobile = useMediaQuery('(max-width:600px)');

    const toggleDrawer = (open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setDrawerOpen(open);
    };

    return (
        <>
            <AppBar position="static"
                sx={{
                    background: '#fff', color: '#000', boxShadow: 0,
                    margin: '0 auto'
                }}
            >
                <Toolbar sx={{ display: 'flex', alignItems: 'center' }}>
                    {!isMobile ? (
                        <>
                            <div className='col-3' style={{ display: 'flex' }}>
                                <Button href="/shop" sx={{ fontWeight: 600, color: '#000' }}>CỬA HÀNG</Button>
                                <Button href="/about" sx={{ fontWeight: 600, color: '#000' }}>GIỚI THIỆU</Button>
                                <Button href="/contact" sx={{ fontWeight: 600, color: '#000' }}>LIÊN HỆ</Button>
                            </div>
                            <div className='col-6' style={{ flexGrow: 1, display: 'flex', justifyContent: 'center' }}>
                                <a href="/" style={{ display: 'flex', alignItems: 'center' }}>
                                    <img src={logo} alt="Logo" style={{ height: '50px' }} />
                                </a>
                            </div>
                            <div className='col-3' style={{ display: 'flex', justifyContent: 'end' }}>
                                <IconButton href='/login' color="inherit"><AccountCircleOutlined /></IconButton>
                            </div>
                        </>
                    ) : (
                        <>
                            <div style={{ flexGrow: 1 }}>
                                <a href="/" style={{ display: 'flex', alignItems: 'center' }}>
                                    <img src={logo} alt="Logo" style={{ height: '40px' }} />
                                </a>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <IconButton color="inherit"><AccountCircleOutlined /></IconButton>
                            </div>
                        </>
                    )}
                </Toolbar>
                <Toolbar sx={{ minHeight: { xs: '40px', sm: '40px' }, display: 'flex', alignItems: 'center' }}>
                    {isMobile && (
                        <IconButton edge="start" color="inherit" onClick={toggleDrawer(true)}>
                            <Menu />
                        </IconButton>
                    )}

                    {!isMobile ? (
                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                            <Button href='/order-product' sx={{ color: '#000', fontSize: '.725rem' }}>Đặt hàng</Button>
                            <Button href='/order-tracking' sx={{ color: '#000', fontSize: '.725rem' }}>Kiểm tra đơn hàng</Button>
                            <Button href='/#new-arrivals' sx={{ color: '#000', fontSize: '.725rem' }}>Sản phẩm mới</Button>
                            <Button href='/#pre-products' sx={{ color: '#000', fontSize: '.725rem' }}>Sản phẩm sắp ra mắt</Button>
                            <Button href='/blogs' sx={{ color: '#000', fontSize: '.725rem' }}>Blogs</Button>
                        </div>
                    ) : (
                        <div style={{ flexGrow: 1 }} />
                    )}
                </Toolbar>
            </AppBar>

            <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
                <div style={{ width: 300 }}>
                    <Button href='/order-product' onClick={toggleDrawer(false)} sx={{ color: '#000', fontSize: '.725rem' }}>Đặt hàng</Button>
                    <Button href='/order-tracking' onClick={toggleDrawer(false)} sx={{ color: '#000', fontSize: '.725rem' }}>Kiểm tra đơn hàng</Button>
                    <Button href='/#new-arrivals' onClick={toggleDrawer(false)} sx={{ color: '#000', fontSize: '.725rem' }}>Sản phẩm mới</Button>
                    <Button href='/#pre-products' onClick={toggleDrawer(false)} sx={{ color: '#000', fontSize: '.725rem' }}>Sản phẩm sắp ra mắt</Button>
                    <Button href='/blogs' onClick={toggleDrawer(false)} sx={{ color: '#000', fontSize: '.725rem' }}>Blogs</Button>
                </div>
            </Drawer>
        </>
    );
};

export default Header;