import React, { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { AnimatePresence, motion } from "framer-motion";

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

    return (): void =>
      document.removeEventListener("click", handleBackgroundClick);
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
          <FontAwesomeIcon
            icon={faChevronLeft}
            onClick={handlePrevClick}
            className="chevron-left"
          />
          <motion.img
            className="lightbox--image"
            src={selectedImage}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            exit={{ opacity: 0, y: 50 }}
          />
          <FontAwesomeIcon
            icon={faChevronRight}
            onClick={handleNextClick}
            className="chevron-right"
          />
          <FontAwesomeIcon
            icon={faTimes}
            onClick={handleCloseClick}
            className="close"
          />
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
    const index = images.map((i) => selectedImage!.includes(i)).indexOf(true);
    const match = index > -1;

    if (match) {
      const nextIndex = index + 1 >= images.length ? 0 : index + 1;
      setSelectedImage(images[nextIndex]);
    }
  }

  function handlePrevClick(): void {
    const index = images.map((i) => selectedImage!.includes(i)).indexOf(true);
    const match = index > -1;

    if (match) {
      const prevIndex = index - 1 < 0 ? images.length - 1 : index - 1;
      setSelectedImage(images[prevIndex]);
    }
  }

  function handleCloseClick(): void {
    setSelectedImage(null);
  }
};

export default LightBox;
