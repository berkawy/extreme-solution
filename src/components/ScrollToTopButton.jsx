import React, { useState, useEffect } from "react";
import { IconButton } from "@mui/material";
import { ArrowUpward } from "@mui/icons-material";

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      {isVisible && (
        <IconButton
          onClick={handleScrollToTop}
          sx={{
            position: "fixed",
            bottom: "20px",
            right: "20px",
            backgroundColor: "primary.main",
            color: "white",
            "&:hover": {
              backgroundColor: "primary.dark",
            },
          }}
        >
          <ArrowUpward />
        </IconButton>
      )}
    </>
  );
};

export default ScrollToTopButton;
