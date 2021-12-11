import React, { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";

import ChevronRight from '../../icons/ChevronRight';
import ChevronLeft from '../../icons/ChevronLeft';
import Close from '../../icons/Close'

import "./LightBox.css";

type LightBoxProps = {
  selectedImage: string | null;
  setSelectedImage: Function;
  images: Array<string>;
};

const LightBox: React.FC<LightBoxProps> = ({
  selectedImage,
  setSelectedImage,
  images,
}) => {
  useEffect(() => {
    const body = document.body;

    if (selectedImage) {
      body.style.overflow = "hidden";
    } else {
      body.style.overflow = "auto";
    }

    document.addEventListener("click", handleBackgroundClick);
    document.addEventListener("keydown", handleKeyDown);

    return (): void => {
      document.removeEventListener("click", handleBackgroundClick);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedImage]);

  return (
    <AnimatePresence>
      {selectedImage !== null && (
        <motion.div
          className="lightbox--overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
          exit={{ opacity: 0 }}
        >
          <button className="chevron-left" onClick={handlePrevClick}>
            <ChevronLeft />
          </button>
          <motion.img
            className="lightbox--image"
            src={selectedImage}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            exit={{ opacity: 0, y: 50 }}
          />
          <button className="chevron-right" onClick={handleNextClick}>
            <ChevronRight />
          </button>
          <button
            onClick={handleCloseClick}
            className="close"
          >
            <Close />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );

  function handleBackgroundClick(event: any): void {
    const { target } = event;

    if (target && target.classList.contains("lightbox--overlay")) {
      setSelectedImage(null);
    }
  }

  function handleNextClick(): void {
    if (!selectedImage) {
      return;
    }

    const index = images.map((i) => selectedImage!.includes(i)).indexOf(true);
    const match = index > -1;

    if (match) {
      const nextIndex = index + 1 >= images.length ? 0 : index + 1;
      setSelectedImage(images[nextIndex]);
    }
  }

  function handlePrevClick(): void {
    if (!selectedImage) {
      return;
    }

    const index = images.map((i) => selectedImage!.includes(i)).indexOf(true);
    const match = index > -1;

    if (match) {
      const prevIndex = index - 1 < 0 ? images.length - 1 : index - 1;
      setSelectedImage(images[prevIndex]);
    }
  }

  function handleKeyDown(event: any): void {
    console.log(selectedImage);
    const { key } = event;

    if (key === "ArrowRight") {
      handleNextClick();
    } else if (key === "ArrowLeft") {
      handlePrevClick();
    } else if (key === "Escape") {
      setSelectedImage(null);
    }
  }

  function handleCloseClick(): void {
    setSelectedImage(null);
  }
};

export default LightBox;
