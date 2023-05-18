import React, { useState, useEffect } from "react";
import { useMediaQuery, Grid, Box, Button } from "@mui/material";
import images from "../../data";

const CatalogViewer = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const currentImage = images[currentIndex];

  const isMobile = useMediaQuery("(max-width:600px)");

  useEffect(() => {
    let intervalId;

    if (isPlaying) {
      intervalId = setInterval(() => {
        setCurrentIndex((prevIndex) =>
          prevIndex === images.length - 1 ? 0 : prevIndex + 1
        );
      }, 3000);
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [isPlaying]);

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handleThumbnailClick = (index) => {
    setCurrentIndex(index);
  };

  const togglePlay = () => {
    setIsPlaying((prevState) => !prevState);
  };

  return (
    <Box bgcolor="#ffffff" p={3}>
      <Grid container spacing={isMobile ? 2 : 4}>
        <Grid item xs={12} md={8}>
          <Box textAlign="center">
            <img
              src={currentImage.url}
              alt={currentImage.id}
              style={{ width: "100%" }}
            />
            <Box mt={2} color="#333333">
              {currentImage.details}
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} md={4}>
          <Box display="flex" justifyContent="center" mt={2}>
            <Button onClick={handlePrevious}>Previous</Button>
            <Button onClick={handleNext}>Next</Button>
          </Box>
          <Box display="flex" justifyContent="center" mt={2}>
            {images.map((image, index) => (
              <img
                key={image.id}
                src={image.url}
                alt={image.id}
                onClick={() => handleThumbnailClick(index)}
                style={{
                  width: isMobile ? "40px" : "60px",
                  height: isMobile ? "40px" : "60px",
                  margin: "0 4px",
                  borderRadius: "50%",
                  border:
                    index === currentIndex
                      ? "2px solid #2196f3"
                      : "2px solid #cccccc",
                  filter: index === currentIndex ? "none" : "grayscale(100%)",
                  cursor: "pointer",
                }}
              />
            ))}
          </Box>
          <Box display="flex" justifyContent="center" mt={2}>
            <Button variant="contained" color="secondary" onClick={togglePlay}>
              {isPlaying ? "Pause" : "Play"}
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CatalogViewer;
