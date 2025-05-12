import { FormControl, Grid, MenuItem, Select } from "@mui/material";
import { useState } from "react";

const Filter = ({ onFilterChange }) => {
    const [filter, setFilter] = useState("671de6c39c6278fcbe330576");

    const handleChange = (event) => {
        setFilter(event.target.value);
        onFilterChange(event.target.value);
    };

    return (
        <Grid
            item
            xs={12}
            sm={12}
            sx={{
                display: "flex",
                justifyContent: { xs: "center", sm: "flex-end" },
                marginTop: { xs: 2, sm: 0 },
            }}
        >
            <FormControl fullWidth sx={{ width: "50%" }}>
                <Select value={filter} onChange={handleChange} displayEmpty>
                    <MenuItem value="" disabled>
                        Chọn sản phẩm mong muốn
                    </MenuItem>
                    <MenuItem value="all">Tất cả sản phẩm</MenuItem>
                    <MenuItem value="671de6c39c6278fcbe330576">Sản phẩm mới nhất</MenuItem>
                    <MenuItem value="6728e7303fe9e28a1ea1dc23">Sản phẩm sắp ra mắt</MenuItem>
                </Select>
            </FormControl>
        </Grid>
    );
};

export default Filter;