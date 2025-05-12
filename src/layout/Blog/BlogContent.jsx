import { Box } from "@mui/material";

const BlogContent = ({ content, imgURL }) => {
    return (
        <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            sx={{ width: '100%', maxWidth: '1200px', margin: '0 auto' }}
            p={4}
        >
            <img
                src={imgURL}
                alt="Blog"
                style={{
                    width: '100%',
                    height: 'auto',
                    marginBottom: '16px'
                }}
            />
            <Box
                component="div"
                sx={{ textAlign: 'left', width: '100%', fontSize: '1.5rem' }}
                dangerouslySetInnerHTML={{ __html: content }}
            />
        </Box>
    );
}

export default BlogContent;