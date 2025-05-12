import { Box } from '@mui/material';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const slides = [
    {
        title: 'Slide 1',
        imgSrc: 'https://firebasestorage.googleapis.com/v0/b/vipack-project.appspot.com/o/home-page%2FFINAL%20BST2.png?alt=media&token=415fe63b-f09e-4672-987a-4d1a30b2b257'
    },
    {
        title: 'Slide 2',
        imgSrc: 'https://firebasestorage.googleapis.com/v0/b/vipack-project.appspot.com/o/home-page%2FIMG_0016.jpg?alt=media&token=a693e965-0305-424d-a770-e6c0a2c22d8b'
    }
];

const SlideShow = () => {
    const navigate = useNavigate();
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
        }, 7000);

        return () => clearInterval(interval);
    }, []);

    const handleSlideClick = () => {
        navigate('/shop');
    }

    return (
        <Box sx={{ position: 'relative', width: '100%', overflow: 'hidden' }}>
            <Box
                sx={{
                    display: 'flex',
                    transition: 'transform 0.5s ease-in-out',
                    transform: `translateX(-${currentIndex * 100}%)`
                }}
            >
                {slides.map((slide, index) => (
                    <img
                        key={index}
                        src={slide.imgSrc}
                        alt={slide.title}
                        style={{ width: '100%', height: '60%', cursor: 'pointer' }}
                        onClick={handleSlideClick}
                    />
                ))}
            </Box>
            <Box sx={{ position: 'absolute', bottom: '5%', left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: 1 }}>
                {slides.map((_, index) => (
                    <Box
                        key={index}
                        onClick={() => setCurrentIndex(index)}
                        sx={{
                            width: 15,
                            height: 15,
                            borderRadius: '50%',
                            backgroundColor: currentIndex === index ? 'white' : 'transparent',
                            border: `2px solid ${currentIndex === index ? 'white' : 'rgba(255, 255, 255, 0.5)'}`,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer',
                            transition: 'background-color 0.3s, border-color 0.3s',
                        }}
                    />
                ))}
            </Box>
        </Box >
    );
};

export default SlideShow;