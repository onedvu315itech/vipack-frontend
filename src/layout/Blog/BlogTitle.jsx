import { Typography } from "@mui/material";

const BlogTitle = ({ title }) => {
    return (
        <Typography
            variant="h4"
            gutterBottom
            sx={{
                textAlign: 'center',
                fontWeight: 600
            }}
        >
            {title}
        </Typography>
    );
}

export default BlogTitle;