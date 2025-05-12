import { Container, Typography, Grid } from "@mui/material";
import Footer from "layout/Home/Footer";
import Header from "layout/Home/Header";
import Filter from "layout/Shop/Filter";
import Products from "layout/Shop/Products";
import { useState } from "react";

const ShopPage = () => {
    const [filterCategory, setFilterCategory] = useState("671de6c39c6278fcbe330576");

    const handleFilterChange = (category) => {
        setFilterCategory(category);
    };

    return (
        <>
            <Header />
            <div style={{ backgroundColor: "rgb(250, 250, 251)", marginTop: "1.5rem" }}>
                <Container>
                    <Grid container spacing={2} alignItems="center" sx={{ marginBottom: 4 }} justifyContent="center">
                        <Grid item xs={12} sm={6} textAlign={{ xs: "center", sm: "left" }}>
                            <Typography variant="h4">Chào mừng tới Shop VIPACK</Typography>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Filter onFilterChange={handleFilterChange} />
                        </Grid>
                    </Grid>
                    <Products filterCategory={filterCategory} />
                </Container>
            </div>
            <Footer />
        </>
    );
};

export default ShopPage;